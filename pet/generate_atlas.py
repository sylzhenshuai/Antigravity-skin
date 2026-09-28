"""Sprite sheet atlas generator for Doraemon desktop pet.

This module procedurally creates multi-frame animation states (idle, breathing,
running, jumping, waving, thinking, eye gaze directions) from a canonical
character standee image and outputs a WebP spritesheet complying with
the Codex V2 animated desktop pet specification.

Example:
    To generate the spritesheet and install to local BetterGravity library:
        $ python pet/generate_atlas.py
"""

import math
import os
from typing import Optional, Tuple
from PIL import Image, ImageDraw


def paste_cell(
    atlas: Image.Image,
    img: Image.Image,
    col: int,
    row: int,
    cell_w: int = 192,
    cell_h: int = 208,
    offset_x: int = 0,
    offset_y: int = 0,
    scale: float = 1.0,
    rotate: float = 0.0,
) -> None:
    """Pastes an image frame into a designated grid cell of the atlas.

    Args:
        atlas: The target RGBA PIL Image representing the complete atlas.
        img: Source frame Image to paste into the grid cell.
        col: 0-indexed column position in the spritesheet grid.
        row: 0-indexed row position in the spritesheet grid.
        cell_w: Width of a single cell in pixels. Defaults to 192.
        cell_h: Height of a single cell in pixels. Defaults to 208.
        offset_x: Horizontal displacement offset in pixels. Defaults to 0.
        offset_y: Vertical displacement offset in pixels. Defaults to 0.
        scale: Scaling multiplier for the frame. Defaults to 1.0.
        rotate: Rotation angle in degrees (clockwise). Defaults to 0.0.
    """
    frame = img
    if scale != 1.0:
        fw = max(1, int(frame.width * scale))
        fh = max(1, int(frame.height * scale))
        frame = frame.resize((fw, fh), Image.Resampling.LANCZOS)
    if rotate != 0.0:
        frame = frame.rotate(rotate, resample=Image.Resampling.BICUBIC, expand=True)

    x = col * cell_w + (cell_w - frame.width) // 2 + offset_x
    y = row * cell_h + (cell_h - frame.height) // 2 + offset_y
    atlas.paste(frame, (x, y), frame)


def create_doraemon_atlas(
    base_image_path: Optional[str] = None,
    output_dir: Optional[str] = None,
    install_to_bettergravity: bool = True,
) -> str:
    """Generates the animated sprite sheet atlas for Doraemon pet.

    Processes the base standee image, renders sinusoidal breathing cycles,
    blinking eye arcs, locomotion tilts, waving sparkles, and directional
    gaze frames across an 8x11 grid (1536x2288 px).

    Args:
        base_image_path: Path to the clean transparent character standee PNG.
            If None, resolves relative to repository assets directory.
        output_dir: Target directory where spritesheet.webp and preview.png
            will be saved. If None, saves in current script directory.
        install_to_bettergravity: Whether to copy the generated assets to
            local AppData BetterGravity pets library directory.

    Returns:
        The absolute file path of the generated spritesheet.webp.

    Raises:
        FileNotFoundError: If the base character standee image does not exist.
    """
    repo_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    if base_image_path is None:
        base_image_path = os.path.join(repo_root, "assets", "doraemon_standee.png")

    if not os.path.exists(base_image_path):
        raise FileNotFoundError(f"Base character image not found: {base_image_path}")

    if output_dir is None:
        output_dir = os.path.dirname(os.path.abspath(__file__))
    os.makedirs(output_dir, exist_ok=True)

    base_img = Image.open(base_image_path).convert("RGBA")

    # Clean transparent pixels to avoid alpha-edge halos
    data = base_img.getdata()
    cleaned = [(r, g, b, a) if a > 0 else (0, 0, 0, 0) for (r, g, b, a) in data]
    base_img.putdata(cleaned)

    cell_w, cell_h = 192, 208
    cols, rows = 8, 11
    atlas_w, atlas_h = cols * cell_w, rows * cell_h  # 1536 x 2288

    atlas = Image.new("RGBA", (atlas_w, atlas_h), (0, 0, 0, 0))

    target_h = 145
    target_w = int(base_img.width * (target_h / base_img.height))
    dora_base = base_img.resize((target_w, target_h), Image.Resampling.LANCZOS)

    # Helper lambda to bind atlas and cell dimensions
    def paste(frame_img, c, r, ox=0, oy=0, sc=1.0, rot=0.0):
        paste_cell(atlas, frame_img, c, r, cell_w, cell_h, ox, oy, sc, rot)

    # -------------------------------------------------------------
    # Row 0: Idle (6 frames) + Neutral Look Frame (Column 6)
    # -------------------------------------------------------------
    for col in range(6):
        breath_y = int(math.sin(col * math.pi / 2.5) * 3)
        scale_y = 1.0 + (math.sin(col * math.pi / 2.5) * 0.02)
        frame = dora_base.copy()

        # Blink on frame 2 & 3
        if col in (2, 3):
            draw = ImageDraw.Draw(frame)
            eye_cx1, eye_cx2 = frame.width // 2 - 12, frame.width // 2 + 12
            eye_cy = frame.height // 3
            draw.arc(
                [eye_cx1 - 10, eye_cy - 6, eye_cx1 + 10, eye_cy + 6],
                start=0,
                end=180,
                fill=(0, 0, 0, 255),
                width=3,
            )
            draw.arc(
                [eye_cx2 - 10, eye_cy - 6, eye_cx2 + 10, eye_cy + 6],
                start=0,
                end=180,
                fill=(0, 0, 0, 255),
                width=3,
            )

        paste(frame, col, 0, oy=breath_y, sc=scale_y)

    # Column 6 in row 0: Neutral gaze frame
    paste(dora_base, 6, 0)

    # -------------------------------------------------------------
    # Row 1: Running Right (8 frames)
    # -------------------------------------------------------------
    for col in range(8):
        tilt = -4 + math.sin(col * math.pi / 2) * 5
        bob = int(abs(math.sin(col * math.pi / 2)) * 6)
        paste(dora_base, col, 1, ox=2, oy=-bob, rot=tilt)

    # -------------------------------------------------------------
    # Row 2: Running Left (8 frames)
    # -------------------------------------------------------------
    dora_flipped = dora_base.transpose(Image.Transpose.FLIP_LEFT_RIGHT)
    for col in range(8):
        tilt = 4 - math.sin(col * math.pi / 2) * 5
        bob = int(abs(math.sin(col * math.pi / 2)) * 6)
        paste(dora_flipped, col, 2, ox=-2, oy=-bob, rot=tilt)

    # -------------------------------------------------------------
    # Row 3: Waving / Anywhere Door (4 frames)
    # -------------------------------------------------------------
    for col in range(4):
        wave_tilt = -3 + col * 2
        frame = dora_base.copy()
        draw = ImageDraw.Draw(frame)
        sx = frame.width - 25 + int(math.sin(col) * 5)
        sy = frame.height // 2 - int(col * 4)
        draw.line([sx - 6, sy, sx + 6, sy], fill=(255, 208, 0, 240), width=2)
        draw.line([sx, sy - 6, sx, sy + 6], fill=(255, 208, 0, 240), width=2)
        paste(frame, col, 3, rot=wave_tilt)

    # -------------------------------------------------------------
    # Row 4: Jumping / Success (5 frames)
    # -------------------------------------------------------------
    jump_offsets = [0, -8, -16, -6, 2]
    for col in range(5):
        frame = dora_base.copy()
        draw = ImageDraw.Draw(frame)
        sparkle_x = frame.width // 2 + (col - 2) * 12
        sparkle_y = 15 - abs(col - 2) * 4
        draw.line(
            [sparkle_x - 5, sparkle_y, sparkle_x + 5, sparkle_y],
            fill=(255, 220, 50, 255),
            width=2,
        )
        draw.line(
            [sparkle_x, sparkle_y - 5, sparkle_x, sparkle_y + 5],
            fill=(255, 220, 50, 255),
            width=2,
        )
        paste(frame, col, 4, oy=jump_offsets[col], sc=1.0 + (col % 2) * 0.03)

    # -------------------------------------------------------------
    # Rows 5 & 6: Action / Error States
    # -------------------------------------------------------------
    for col in range(8):
        jitter = (col % 2) * 3 - 1
        paste(dora_base, col, 5, ox=jitter)

    for col in range(6):
        paste(dora_base, col, 6, oy=-2 + (col % 3))

    # -------------------------------------------------------------
    # Rows 7-10: Gaze & Interaction States (Thinking, Attention)
    # -------------------------------------------------------------
    gaze_offsets = {
        7: (-4, 0),   # Left
        8: (4, 0),    # Right
        9: (0, -4),   # Up
        10: (0, 4),   # Down
    }
    for row, (eye_ox, eye_oy) in gaze_offsets.items():
        for col in range(cols):
            frame = dora_base.copy()
            draw = ImageDraw.Draw(frame)
            cx1 = frame.width // 2 - 12
            cx2 = frame.width // 2 + 12
            cy = frame.height // 3
            draw.ellipse(
                [cx1 + eye_ox - 3, cy + eye_oy - 4, cx1 + eye_ox + 3, cy + eye_oy + 4],
                fill=(0, 0, 0, 255),
            )
            draw.ellipse(
                [cx2 + eye_ox - 3, cy + eye_oy - 4, cx2 + eye_ox + 3, cy + eye_oy + 4],
                fill=(0, 0, 0, 255),
            )
            paste(frame, col, row)

    # Clean transparent pixel residues across entire canvas
    pixels = atlas.getdata()
    cleaned_atlas = [(r, g, b, a) if a > 0 else (0, 0, 0, 0) for (r, g, b, a) in pixels]
    atlas.putdata(cleaned_atlas)

    # Save spritesheet and preview
    sheet_webp_path = os.path.join(output_dir, "spritesheet.webp")
    atlas.save(sheet_webp_path, "WEBP", quality=95, method=6, lossless=True)
    print(f"[Success] Generated atlas: {sheet_webp_path} ({os.path.getsize(sheet_webp_path)} bytes)")

    preview_img = atlas.crop((0, 0, cell_w, cell_h))
    preview_path = os.path.join(output_dir, "preview.png")
    preview_img.save(preview_path, "PNG")
    print(f"[Success] Generated preview: {preview_path}")

    # Optionally install to BetterGravity roaming pets library
    if install_to_bettergravity:
        appdata = os.environ.get("APPDATA")
        if appdata:
            bg_pet_dir = os.path.join(appdata, "BetterGravity", "pets", "doraemon")
            try:
                os.makedirs(bg_pet_dir, exist_ok=True)
                atlas.save(
                    os.path.join(bg_pet_dir, "spritesheet.webp"),
                    "WEBP",
                    quality=95,
                    method=6,
                    lossless=True,
                )
                preview_img.save(os.path.join(bg_pet_dir, "preview.png"), "PNG")
                pet_manifest_src = os.path.join(output_dir, "pet.json")
                if os.path.exists(pet_manifest_src):
                    with open(pet_manifest_src, "r", encoding="utf-8") as rf:
                        manifest_data = rf.read()
                    with open(
                        os.path.join(bg_pet_dir, "pet.json"), "w", encoding="utf-8"
                    ) as wf:
                        wf.write(manifest_data)
                print(f"[Deployed] Installed to BetterGravity pets: {bg_pet_dir}")
            except OSError as err:
                print(f"[Warning] Failed to deploy to BetterGravity pets: {err}")

    return sheet_webp_path


if __name__ == "__main__":
    create_doraemon_atlas()
