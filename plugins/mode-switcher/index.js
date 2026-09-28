/**
 * @fileoverview BetterGravity Title-Bar Mode Switcher Plugin.
 *
 * Integrates directly into BetterGravity's top-left title menu bar to toggle
 * between Antigravity (Dream Celestial Theme) and Gemini (Claude 1:1 Replica)
 * via dynamic IPC bridge settings manipulation.
 *
 * @author sylzhenshuai
 * @license MIT
 */

(function initModeSwitcher() {
  /**
   * Checks whether the current UI is in Gemini mode.
   *
   * @returns {boolean} True if Gemini app mode is active.
   */
  function isGeminiMode() {
    return document.documentElement.getAttribute("data-gemini-app") === "true";
  }

  /**
   * Switches the active BetterGravity plugin configuration via IPC bridge.
   *
   * @param {"gemini"|"antigravity"} targetMode Target mode identifier.
   * @returns {Promise<void>}
   */
  async function switchToMode(targetMode) {
    try {
      const bridge = window.__betterGravityBridge || 
                     (window.BetterGravity && window.BetterGravity.getState ? window.BetterGravity : null);
      if (!bridge) {
        console.warn("[Mode Switcher] BetterGravity bridge not available.");
        return;
      }
      const state = await bridge.getState();
      const currentEnabled = state.settings?.plugins?.enabled || [];
      let newEnabled;
      if (targetMode === "gemini") {
        newEnabled = Array.from(new Set([...currentEnabled, "gemini-app", "mode-switcher"]));
      } else {
        newEnabled = currentEnabled.filter((p) => p !== "gemini-app");
        if (!newEnabled.includes("mode-switcher")) newEnabled.push("mode-switcher");
      }

      await bridge.setSettings({
        ...state.settings,
        plugins: {
          ...state.settings?.plugins,
          developerMode: true,
          enabled: newEnabled
        }
      });
    } catch (err) {
      console.error("[Mode Switcher] Error toggling mode settings:", err);
    }
  }

  /**
   * Updates title bar dropdown trigger button label and tooltip.
   *
   * @returns {void}
   */
  function updateTitleButton() {
    const isGemini = isGeminiMode();
    const btn = Array.from(document.querySelectorAll('button[data-testid="title-menu-bar-item"]')).find(
      (b) => b.innerText.includes("Antigravity") || b.innerText.includes("Gemini")
    );
    if (!btn) return;

    const expectedText = isGemini ? "🪐 Gemini ▾" : "✨ Antigravity ▾";
    if (btn.innerText.trim() !== expectedText && btn.textContent.trim() !== expectedText) {
      btn.innerHTML = `<span>${expectedText}</span>`;
      btn.title = isGemini ? "当前模式：Gemini (Claude 1:1 复刻) - 点击切换" : "当前模式：Antigravity (梦幻星海主题) - 点击切换";
    }
  }

  /**
   * Injects quick mode toggle items into the title bar dropdown menu.
   *
   * @returns {void}
   */
  function injectDropdownSwitcher() {
    const isGemini = isGeminiMode();
    const dropdowns = Array.from(
      document.querySelectorAll('div.absolute.top-full.left-0.mt-1[class*="bg-sidebar"]')
    );

    for (const dropdown of dropdowns) {
      if (dropdown.querySelector(".mode-switcher-item")) continue;

      const firstBtn = dropdown.querySelector('button[role="menuitem"]');
      if (!firstBtn) continue;

      const switchItem = document.createElement("div");
      switchItem.className = "mode-switcher-item";
      switchItem.style.cssText = `
        padding: 6px 10px;
        margin: 4px;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.15);
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        font-size: 12px;
        user-select: none;
        transition: all 0.2s ease;
      `;

      switchItem.innerHTML = `
        <div style="display: flex; align-items: center; gap: 6px;">
          <span>${isGemini ? "🪐" : "✨"}</span>
          <span style="font-weight: 500;">模式切换</span>
        </div>
        <div style="
          padding: 2px 6px;
          border-radius: 4px;
          background: ${isGemini ? "#7C3AED" : "#3B82F6"};
          color: white;
          font-weight: 600;
          font-size: 11px;
        ">
          ${isGemini ? "Gemini" : "Antigravity"}
        </div>
      `;

      switchItem.addEventListener("mouseenter", () => {
        switchItem.style.background = "rgba(255, 255, 255, 0.16)";
      });
      switchItem.addEventListener("mouseleave", () => {
        switchItem.style.background = "rgba(255, 255, 255, 0.08)";
      });

      switchItem.addEventListener("click", async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const target = isGemini ? "antigravity" : "gemini";
        await switchToMode(target);
      });

      dropdown.prepend(switchItem);
    }
  }

  // Periodic polling & DOM observation
  setInterval(() => {
    updateTitleButton();
    injectDropdownSwitcher();
  }, 400);

  const observer = new MutationObserver(() => {
    updateTitleButton();
    injectDropdownSwitcher();
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();
