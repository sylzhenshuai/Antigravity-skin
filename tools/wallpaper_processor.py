"""Wallpaper processing and color grading pipeline for Antigravity-skin.

This module provides high-fidelity 2K/4K upscaling, high-key starlight tone
grading, shadow floor lifting, and optional watermark inpainting to convert
raw anime/character illustrations into luminous, legible desktop backgrounds
compatible with glassmorphic workspace themes.

Example:
    Basic usage from CLI:
        $ python tools/wallpaper_processor.py --input raw.jpg --output assets/dream.jpg
"""

import argparse
import os
import sys
from typing import Optional, Sequence, Tuple
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter

try:
    import cv2
    HAS_OPENCV = True
except ImportError:
    HAS_OPENCV = False


def grade_celestial_wallpaper(
    input_path: str,
    output_path: str,
    target_width: int = 2560,
    gamma: float = 0.46,
    shadow_floor: Sequence[float] = (0.28, 0.34, 0.46),
    color_enhancement: float = 1.08,
    contrast_enhancement: float = 1.01,
    unsharp_radius: float = 1.1,
    unsharp_percent: int = 135,
    quality: int = 93,
) -> str:
    """Processes an image into a luminous 2K celestial wallpaper.

    Performs Lanczos super-resolution resizing, non-linear gamma curve shadow
    lifting, shadow floor tinting (preventing muddy black under glass cards),
    and multi-pass edge-directed unsharp masking.

    Args:
        input_path: File path of the source image.
        output_path: File path where the graded wallpaper will be written.
        target_width: Target resolution width in pixels. Defaults to 2560.
        gamma: Gamma exponent for shadow expansion (<1.0 lifts shadows).
            Defaults to 0.46.
        shadow_floor: Normalized RGB floor values applied to shadows.
            Defaults to (0.28, 0.34, 0.46).
        color_enhancement: Factor for Pillow ImageEnhance.Color. Defaults to 1.08.
        contrast_enhancement: Factor for Pillow ImageEnhance.Contrast. Defaults to 1.01.
        unsharp_radius: Radius for fine edge sharpening filter. Defaults to 1.1.
        unsharp_percent: Percent intensity for fine edge sharpening. Defaults to 135.
        quality: JPEG compression quality (1-100). Defaults to 93.

    Returns:
        The absolute path to the generated wallpaper file.

    Raises:
        FileNotFoundError: If the input file does not exist.
        ValueError: If gamma is non-positive or shadow_floor length is invalid.
    """
    if not os.path.exists(input_path):
        raise FileNotFoundError(f"Input image not found: {input_path}")
    if gamma <= 0:
        raise ValueError(f"Gamma must be positive, got {gamma}")
    if len(shadow_floor) != 3:
        raise ValueError("shadow_floor must contain exactly 3 RGB normalized floats.")

    os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)

    img = Image.open(input_path).convert("RGB")
    orig_w, orig_h = img.size

    target_h = int(round(target_width * (orig_h / orig_w)))
    upscaled = img.resize((target_width, target_h), Image.Resampling.LANCZOS)

    arr = np.array(upscaled, dtype=np.float32) / 255.0

    # 1. Non-linear gamma expansion to lift dark shadows into airy midtones
    arr_lifted = np.power(arr, gamma)

    # 2. Shadow floor tinting to infuse starlight cyan/ice-blue into dark tones
    floor_vec = np.array(shadow_floor, dtype=np.float32)
    arr_graded = arr_lifted * (1.0 - floor_vec) + floor_vec
    arr_graded = np.clip(arr_graded * 255.0, 0.0, 255.0).astype(np.uint8)

    res_img = Image.fromarray(arr_graded)

    # 3. Vibrance and contrast calibration
    res_img = ImageEnhance.Color(res_img).enhance(color_enhancement)
    res_img = ImageEnhance.Contrast(res_img).enhance(contrast_enhancement)

    # 4. Multi-pass unsharp masking
    res_img = res_img.filter(
        ImageFilter.UnsharpMask(radius=unsharp_radius, percent=unsharp_percent, threshold=1)
    )
    res_img = res_img.filter(
        ImageFilter.UnsharpMask(radius=2.5, percent=35, threshold=2)
    )

    res_img.save(output_path, "JPEG", quality=quality, subsampling=0)
    print(f"[Success] Graded wallpaper saved: {output_path} ({os.path.getsize(output_path)/1024:.1f} KB)")
    return os.path.abspath(output_path)


def inpaint_watermark(
    image_path: str,
    output_path: str,
    mask_box: Tuple[int, int, int, int],
    inpaint_radius: int = 4,
) -> str:
    """Removes localized watermarks or logos using Telea inpainting.

    Args:
        image_path: Path to the image with a localized watermark.
        output_path: Path to save the inpainted image.
        mask_box: 4-tuple of (x_min, y_min, x_max, y_max) defining the region.
        inpaint_radius: Pixel radius for OpenCV inpaint filter. Defaults to 4.

    Returns:
        The path of the inpainted output image.

    Raises:
        ImportError: If opencv-python is not installed.
        FileNotFoundError: If the input image cannot be read.
    """
    if not HAS_OPENCV:
        raise ImportError(
            "opencv-python is required for inpainting. Install via: pip install opencv-python"
        )

    img = cv2.imread(image_path)
    if img is None:
        raise FileNotFoundError(f"Failed to read image with cv2: {image_path}")

    mask = np.zeros(img.shape[:2], dtype=np.uint8)
    x1, y1, x2, y2 = mask_box
    mask[y1:y2, x1:x2] = 255

    inpainted = cv2.inpaint(img, mask, inpaint_radius, cv2.INPAINT_TELEA)
    os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)
    cv2.imwrite(output_path, inpainted)
    print(f"[Success] Watermark inpainted and saved: {output_path}")
    return output_path


def main(argv: Optional[Sequence[str]] = None) -> int:
    """CLI entrypoint for wallpaper grading.

    Args:
        argv: Optional commandline argument list. Defaults to sys.argv[1:].

    Returns:
        0 on success, non-zero on error.
    """
    parser = argparse.ArgumentParser(
        description="Process illustrations into luminous 2K celestial wallpapers for Antigravity themes."
    )
    parser.add_argument("--input", "-i", required=True, help="Path to input illustration.")
    parser.add_argument("--output", "-o", required=True, help="Destination wallpaper path.")
    parser.add_argument("--width", "-w", type=int, default=2560, help="Target width (default: 2560).")
    parser.add_argument("--gamma", "-g", type=float, default=0.46, help="Gamma lift factor (default: 0.46).")
    parser.add_argument("--quality", "-q", type=int, default=93, help="JPEG quality 1-100 (default: 93).")

    args = parser.parse_args(argv)

    try:
        grade_celestial_wallpaper(
            input_path=args.input,
            output_path=args.output,
            target_width=args.width,
            gamma=args.gamma,
            quality=args.quality,
        )
        return 0
    except Exception as err:
        print(f"[Error] Failed to process wallpaper: {err}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
