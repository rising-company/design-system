# Usage: python3 tools/logo-from-master.py  (needs Pillow + numpy)
# Regenerates branding/rising-logo-transparent.png and rising-logo-dark.png
# from the white-ground master, branding/rising-logo-white.png.
# Rebuild the logo's transparency from the white-ground master (colour-to-alpha
# against white), then derive a dark-ground variant with light lettering.
import numpy as np
from PIL import Image
import pathlib
B = str(pathlib.Path(__file__).resolve().parent.parent / "branding") + "/"
src = np.asarray(Image.open(B + "rising-logo-white.png").convert("RGB")).astype(np.float64)
inv = 255.0 - src
a = inv.max(axis=2) / 255.0                       # alpha = how far the pixel is from white
a[a < 0.06] = 0.0                                 # drop the master's faint off-white noise
safe = np.where(a > 0, a, 1.0)[..., None]
rgb = np.clip((src - 255.0 * (1 - a[..., None])) / safe, 0, 255)
rgba = np.dstack([rgb, a * 255.0]).astype(np.uint8)
im = Image.fromarray(rgba, "RGBA")
im = im.crop(im.getchannel("A").point(lambda v: 255 if v > 20 else 0).getbbox())
pad = 24; canvas = Image.new("RGBA", (im.width + 2 * pad, im.height + 2 * pad), (0, 0, 0, 0)); canvas.paste(im, (pad, pad))
canvas = canvas.resize((1200, round(canvas.height * 1200 / canvas.width)), Image.LANCZOS)
canvas.save(B + "rising-logo-transparent.png", optimize=True)
# Dark ground: the arrow keeps its gradient; the lettering (right of the arrow) turns
# --text-heading so it reads on --bg-base.
d = np.asarray(canvas).copy()
arr_alpha = d[..., 3] > 20
cols = np.where(arr_alpha.any(axis=0))[0]
gaps = np.where(np.diff(cols) > 20)[0]           # first empty run separates arrow from words
split = cols[gaps[0]] + 1 if len(gaps) else int(d.shape[1] * 0.33)
d[:, split:, 0], d[:, split:, 1], d[:, split:, 2] = 0xe8, 0xf4, 0xff
# The arrow is a pale tint mixed with white in the master, so colour-to-alpha leaves
# its body half transparent and it goes muddy on a dark ground. Use the master's
# white-composited colour, opaque, with only the edge kept soft.
c = np.asarray(canvas).astype(np.float64)
on_white = c[..., :3] * (c[..., 3:] / 255.0) + 255.0 * (1 - c[..., 3:] / 255.0)
edge = np.clip(c[..., 3] / 255.0 / 0.35, 0, 1)
d[:, :split, :3] = on_white[:, :split].astype(np.uint8)
d[:, :split, 3] = (edge[:, :split] * 255).astype(np.uint8)
Image.fromarray(d, "RGBA").save(B + "rising-logo-dark.png", optimize=True)
print("split at", split, "size", canvas.size)
