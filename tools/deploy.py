"""Deployment script for Antigravity-skin.

Synchronizes themes, dual-mode switcher plugins, and animated desktop pets
from this repository into the local BetterGravity environment.

Usage:
    $ python tools/deploy.py
    $ python tools/deploy.py --theme-only
    $ python tools/deploy.py --plugins-only
"""

import argparse
import os
import shutil
import sys
from typing import Optional, Sequence


def get_bettergravity_root() -> str:
    """Detects and returns the local BetterGravity roaming data directory.

    Returns:
        The absolute path to the local BetterGravity root directory.

    Raises:
        RuntimeError: If APPDATA or USERPROFILE cannot be determined.
    """
    appdata = os.environ.get("APPDATA")
    if not appdata:
        user_profile = os.environ.get("USERPROFILE")
        if user_profile:
            appdata = os.path.join(user_profile, "AppData", "Roaming")
        else:
            raise RuntimeError("Cannot determine APPDATA or USERPROFILE environment variable.")

    return os.path.join(appdata, "BetterGravity")


def deploy_themes(repo_root: str, bg_root: str) -> None:
    """Deploys compiled CSS stylesheets into BetterGravity themes directory.

    Args:
        repo_root: Path to the root of the antigravity-skin repository.
        bg_root: Path to the local BetterGravity roaming directory.
    """
    themes_target_dir = os.path.join(bg_root, "themes")
    os.makedirs(themes_target_dir, exist_ok=True)

    theme_src = os.path.join(repo_root, "themes", "dream-starlight", "theme.css")
    if not os.path.exists(theme_src):
        print(f"[Warning] theme.css not found at {theme_src}. Run build:theme first.")
        return

    # Deploy as single-file theme
    single_dest = os.path.join(themes_target_dir, "doraemon.theme.css")
    shutil.copy2(theme_src, single_dest)
    print(f"[Deployed] Single theme file: {single_dest}")

    # Deploy as modular package theme
    package_dir = os.path.join(themes_target_dir, "doraemon-dream")
    os.makedirs(package_dir, exist_ok=True)
    pkg_dest = os.path.join(package_dir, "theme.css")
    shutil.copy2(theme_src, pkg_dest)
    print(f"[Deployed] Package theme file: {pkg_dest}")


def deploy_plugins(repo_root: str, bg_root: str) -> None:
    """Copies switcher plugins into BetterGravity plugins directory.

    Args:
        repo_root: Path to the root of the antigravity-skin repository.
        bg_root: Path to the local BetterGravity roaming directory.
    """
    plugins_src_dir = os.path.join(repo_root, "plugins")
    plugins_target_dir = os.path.join(bg_root, "plugins")
    os.makedirs(plugins_target_dir, exist_ok=True)

    for plugin_name in ["chat-work-switcher", "mode-switcher"]:
        src_path = os.path.join(plugins_src_dir, plugin_name)
        if os.path.exists(src_path):
            dst_path = os.path.join(plugins_target_dir, plugin_name)
            os.makedirs(dst_path, exist_ok=True)
            for item in os.listdir(src_path):
                s = os.path.join(src_path, item)
                d = os.path.join(dst_path, item)
                if os.path.isfile(s):
                    shutil.copy2(s, d)
            print(f"[Deployed] Plugin: {plugin_name} -> {dst_path}")


def deploy_pets(repo_root: str, bg_root: str) -> None:
    """Deploys desktop pet manifests and spritesheets into BetterGravity pets directory.

    Args:
        repo_root: Path to the root of the antigravity-skin repository.
        bg_root: Path to the local BetterGravity roaming directory.
    """
    pet_src_dir = os.path.join(repo_root, "pet")
    pet_target_dir = os.path.join(bg_root, "pets", "doraemon")
    os.makedirs(pet_target_dir, exist_ok=True)

    for fname in ["spritesheet.webp", "preview.png", "pet.json", "state-machine.json", "doraemon-pet.css"]:
        src = os.path.join(pet_src_dir, fname)
        if os.path.exists(src):
            dst = os.path.join(pet_target_dir, fname)
            shutil.copy2(src, dst)
            print(f"[Deployed] Pet asset: {fname} -> {dst}")


def main(argv: Optional[Sequence[str]] = None) -> int:
    """CLI entrypoint for deploy tool.

    Args:
        argv: Optional arguments list. Defaults to sys.argv[1:].

    Returns:
        0 on success, non-zero on error.
    """
    parser = argparse.ArgumentParser(
        description="Deploy Antigravity-skin themes, plugins, and pets into local BetterGravity."
    )
    parser.add_argument("--theme-only", action="store_true", help="Only deploy themes.")
    parser.add_argument("--plugins-only", action="store_true", help="Only deploy plugins.")
    parser.add_argument("--pets-only", action="store_true", help="Only deploy desktop pets.")

    args = parser.parse_args(argv)

    repo_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    try:
        bg_root = get_bettergravity_root()
    except RuntimeError as err:
        print(f"[Error] {err}", file=sys.stderr)
        return 1

    print(f"Target BetterGravity Directory: {bg_root}")

    deploy_all = not (args.theme_only or args.plugins_only or args.pets_only)

    if deploy_all or args.theme_only:
        deploy_themes(repo_root, bg_root)
    if deploy_all or args.plugins_only:
        deploy_plugins(repo_root, bg_root)
    if deploy_all or args.pets_only:
        deploy_pets(repo_root, bg_root)

    print("\n[Complete] Deployment finished successfully.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
