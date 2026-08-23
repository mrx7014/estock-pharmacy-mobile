from pathlib import Path
from PIL import Image

source = Path('/home/ubuntu/estock-pharmacy-mobile/assets/images/icon.png')
image = Image.open(source).convert('RGBA')
image.thumbnail((512, 512), Image.Resampling.LANCZOS)
for name in ['icon.png', 'splash-icon.png', 'favicon.png', 'android-icon-foreground.png']:
    image.save(source.parent / name, format='PNG', optimize=True, compress_level=9)
