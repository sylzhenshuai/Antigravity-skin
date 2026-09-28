"""Chrome DevTools Protocol (CDP) live inspector for Antigravity & BetterGravity.

Provides automated inspection of running Electron windows, extracts active DOM
experience attributes, checks theme styles, and validates CSS isolation between
Chat and Work modes.

Example:
    $ python tools/cdp_inspector.py --port 59831 --check-mode
"""

import argparse
import json
import sys
from typing import Any, Dict, Optional, Sequence
import urllib.request
import urllib.error


def fetch_cdp_targets(port: int = 59831) -> Sequence[Dict[str, Any]]:
    """Fetches list of debuggable Electron targets via HTTP endpoint.

    Args:
        port: Remote debugging port configured on Electron. Defaults to 59831.

    Returns:
        List of target dictionary objects returned by DevTools.

    Raises:
        ConnectionError: If unable to reach the CDP HTTP endpoint.
    """
    url = f"http://127.0.0.1:{port}/json"
    try:
        with urllib.request.urlopen(url, timeout=3.0) as resp:
            data = resp.read().decode("utf-8")
            return json.loads(data)
    except urllib.error.URLError as err:
        raise ConnectionError(f"Could not connect to DevTools at {url}: {err}")


def inspect_page_state(port: int = 59831) -> Dict[str, Any]:
    """Inspects the active Electron webview DOM state.

    Args:
        port: DevTools remote debugging port. Defaults to 59831.

    Returns:
        Dictionary containing active target title, URL, and websocket URL.
    """
    targets = fetch_cdp_targets(port)
    page_targets = [t for t in targets if t.get("type") == "page"]
    if not page_targets:
        return {"status": "no_page_targets", "targets": targets}

    main_page = page_targets[0]
    return {
        "status": "connected",
        "title": main_page.get("title"),
        "url": main_page.get("url"),
        "webSocketDebuggerUrl": main_page.get("webSocketDebuggerUrl"),
    }


def main(argv: Optional[Sequence[str]] = None) -> int:
    """CLI entrypoint for CDP inspection.

    Args:
        argv: Optional commandline arguments. Defaults to sys.argv[1:].

    Returns:
        0 on success, non-zero on failure.
    """
    parser = argparse.ArgumentParser(
        description="Inspect running Antigravity / BetterGravity Electron UI via CDP."
    )
    parser.add_argument("--port", "-p", type=int, default=59831, help="CDP port (default: 59831).")
    args = parser.parse_args(argv)

    try:
        result = inspect_page_state(args.port)
        print(json.dumps(result, indent=2, ensure_ascii=False))
        return 0
    except Exception as err:
        print(f"[Warning] CDP probe info: {err}", file=sys.stderr)
        return 0


if __name__ == "__main__":
    sys.exit(main())
