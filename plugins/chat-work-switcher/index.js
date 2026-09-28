/**
 * @fileoverview Chat / Work Dual-Experience Switcher Plugin for Antigravity & BetterGravity.
 *
 * Provides an elegant dual-tab pill in the sidebar to toggle seamlessly between:
 * 1. Chat Experience: 1:1 Claude-inspired clean conversational reading flow.
 * 2. Work Experience: Dream Starlight glassmorphism workspace with custom wallpaper.
 *
 * Persists the selected mode across page refreshes and observes dynamic sidebar mutations.
 *
 * @author sylzhenshuai
 * @license MIT
 */

(function initChatWorkSwitcher() {
  /**
   * Key for persisting active mode in browser localStorage.
   * @const {string}
   */
  const STORAGE_KEY = "antigravity-active-mode";

  /**
   * Retrieves the currently active mode from localStorage.
   *
   * @returns {"chat"|"work"} Current mode, defaulting to "work".
   */
  function getActiveMode() {
    try {
      const val = localStorage.getItem(STORAGE_KEY);
      if (val === "chat" || val === "work") {
        return val;
      }
    } catch (err) {
      console.warn("[ChatWorkSwitcher] Failed to access localStorage:", err);
    }
    return "work";
  }

  /**
   * Applies the selected experience mode to the root document.
   *
   * @param {"chat"|"work"} mode Target mode to apply.
   * @returns {void}
   */
  function applyMode(mode) {
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch (err) {
      console.warn("[ChatWorkSwitcher] Failed to write to localStorage:", err);
    }

    document.documentElement.setAttribute("data-experience", mode);
    if (mode === "chat") {
      document.documentElement.setAttribute("data-gemini-experience", "chat");
    } else {
      document.documentElement.removeAttribute("data-gemini-experience");
    }
    updatePillState();
  }

  /**
   * Synchronizes visual active classes on switch tabs based on active mode.
   *
   * @returns {void}
   */
  function updatePillState() {
    const mode = getActiveMode();
    const pills = document.querySelectorAll(".chat-work-switch-container");
    for (const pill of pills) {
      const tabChat = pill.querySelector('[data-tab="chat"]');
      const tabWork = pill.querySelector('[data-tab="work"]');
      if (tabChat && tabWork) {
        tabChat.classList.toggle("active", mode === "chat");
        tabWork.classList.toggle("active", mode === "work");
        tabChat.setAttribute("aria-pressed", String(mode === "chat"));
        tabWork.setAttribute("aria-pressed", String(mode === "work"));
      }
    }
  }

  /**
   * Injects the dual-tab pill component into the sidebar if not already present.
   *
   * @returns {void}
   */
  function ensurePill() {
    const sidebar = document.querySelector('[role="navigation"][aria-label="Sidebar"]') ||
                    document.querySelector('[role="navigation"]') ||
                    document.querySelector('aside');
    if (!sidebar) return;

    let container = sidebar.querySelector(".chat-work-switch-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "chat-work-switch-container";
      container.innerHTML = `
        <div class="chat-work-switch-track" role="tablist" aria-label="Mode Selection">
          <button type="button" class="chat-work-tab" data-tab="chat" role="tab" title="切换至 Claude 极简对话模式">
            <span class="tab-icon">💬</span>
            <span class="tab-label">Chat</span>
          </button>
          <button type="button" class="chat-work-tab" data-tab="work" role="tab" title="切换至 梦幻星海主题工作台">
            <span class="tab-icon">⚡</span>
            <span class="tab-label">Work</span>
          </button>
        </div>
      `;

      const tabChat = container.querySelector('[data-tab="chat"]');
      const tabWork = container.querySelector('[data-tab="work"]');

      tabChat.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        applyMode("chat");
      });

      tabWork.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        applyMode("work");
      });

      // Insert right below the top header logo/action container
      const topHeader = sidebar.querySelector(':scope > div.shrink-0') || sidebar.firstElementChild;
      if (topHeader && topHeader.nextElementSibling) {
        topHeader.after(container);
      } else {
        sidebar.prepend(container);
      }
    }

    updatePillState();
  }

  // Initial execution & state synchronization
  const initialMode = getActiveMode();
  document.documentElement.setAttribute("data-experience", initialMode);
  if (initialMode === "chat") {
    document.documentElement.setAttribute("data-gemini-experience", "chat");
  }

  // Observe DOM for asynchronous sidebar rendering & route changes
  const observer = new MutationObserver(() => {
    ensurePill();
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  ensurePill();
})();
