/**
 * @fileoverview Build and compilation script for Antigravity Dream Starlight Theme.
 *
 * Encodes the 2K ultra-light luminous starlight celestial wallpaper into Base64,
 * injects CSS custom properties (tokens), enforces glassmorphism filters,
 * binds Chinese calligraphy typography, and encapsulates strict CSS scoping
 * for seamless dual-mode isolation (Chat vs Work experience).
 *
 * Usage:
 *     node themes/dream-starlight/build_theme.js
 *
 * @author sylzhenshuai
 * @license MIT
 */

const fs = require('fs');
const path = require('path');

// 1. Load the pristine ultra-light 2K celestial wallpaper (graded from new user uploaded image)
// Resolve asset paths relative to repository root
const REPO_ROOT = path.resolve(__dirname, '../..');
const assetPath = path.join(REPO_ROOT, 'assets', 'dream-celestial-light-2k.jpg');

if (!fs.existsSync(assetPath)) {
  console.error(`[Error] Wallpaper asset not found at: ${assetPath}`);
  process.exit(1);
}

const bgFairyJpg = fs.readFileSync(assetPath);
const bgBase64 = `data:image/jpeg;base64,${bgFairyJpg.toString('base64')}`;

const css = `/**
 * @name Dream Starry Starlight Light Theme - Version 5.0
 * @description 幻彩星光梦境主题：流光星海、晶透冰蓝与极光柔粉协调配色，浅色通透高级梦幻视觉体验。
 * @author Antigravity UI/UX Studio & Fantasy Dream Style
 * @version 5.0.0
 */

/* =============================================================================
   1. ETHEREAL DREAM TOKENS & DESIGN VARIABLES (:root)
   ============================================================================= */

:root {
  /* --- 1a. 梦幻星海 2K 超清浅色高调壁纸 (全新上传图片 2K 重采样与光色调优) --- */
  --dream-fairy-art: url("${bgBase64}");

  /* --- 1b. 超轻透高光渐变遮罩 (超透无暗色，左侧微白提亮保文字，中央与右侧纯净通透展现人物与星湖) --- */
  --ds-hero-scrim: linear-gradient(90deg, 
    rgba(255, 255, 255, 0.10) 0%, 
    rgba(250, 253, 255, 0.05) 18%, 
    rgba(246, 251, 255, 0.02) 30%, 
    transparent 45%,
    transparent 100%);
  
  --ds-task-fade: none;

  /* --- 1c. 浅色高级感色彩规范 (Lighter & More Luminous Pastel Palette) --- */
  --fairy-blue-primary: #4B85EE;
  --fairy-blue-light: #7EA7F8;
  --fairy-blue-deep: #1E4DBF;
  --fairy-blue-glow: rgba(75, 133, 238, 0.26);

  --fairy-pink-aurora: #DE90D7;
  --fairy-pink-light: #EBB6E6;
  --fairy-pink-glow: rgba(222, 144, 215, 0.32);
  --fairy-pink-surface: rgba(222, 144, 215, 0.12);

  --fairy-crystal-white: #FFFFFF;
  --fairy-glass-panel: rgba(255, 255, 255, 0.32);
  --fairy-glass-border: rgba(255, 255, 255, 0.70);
  --fairy-glass-border-hover: rgba(222, 144, 215, 0.65);

  /* 墨韵字色：深邃高对比度，确保行楷与 Times New Roman 极致清晰锐利，绝不虚化 */
  --fairy-ink: #122035;
  --fairy-ink-body: #16253D;
  --fairy-ink-muted: #385072;
  --fairy-ink-subtle: #587294;

  /* --- 1d. 高阶晶莹玻璃拟态滤镜 (增强通透纯净高级感) --- */
  --fairy-blur-subtle: blur(12px) saturate(135%);
  --fairy-blur-normal: blur(16px) saturate(145%);
  --fairy-blur-heavy: blur(24px) saturate(160%);

  --fairy-inner-white: inset 0 1px 0 rgba(255, 255, 255, 0.95);
  --fairy-shadow-light-card: 0 8px 30px rgba(60, 110, 200, 0.04), 0 2px 6px rgba(0, 0, 0, 0.015);
  --fairy-shadow-light-elevated: 0 14px 40px -4px rgba(60, 110, 200, 0.08), 0 4px 12px rgba(0, 0, 0, 0.02);

  /* --- 1e. Tailwind / Antigravity 系统 Token 覆写 --- */
  --background: transparent !important;
  --foreground: var(--fairy-ink) !important;
  
  --card: rgba(255, 255, 255, 0.35) !important;
  --card-foreground: var(--fairy-ink) !important;
  --card-border: rgba(255, 255, 255, 0.65) !important;

  --popover: rgba(255, 255, 255, 0.98) !important;
  --popover-foreground: var(--fairy-ink) !important;

  --primary: var(--fairy-blue-primary) !important;
  --primary-foreground: #FFFFFF !important;

  --secondary: rgba(75, 133, 238, 0.08) !important;
  --secondary-foreground: #1E4DBF !important;

  --muted: rgba(75, 133, 238, 0.04) !important;
  --muted-foreground: var(--fairy-ink-muted) !important;

  --accent: rgba(222, 144, 215, 0.12) !important;
  --accent-foreground: #B867AE !important;

  --destructive: #F43F5E !important;
  --destructive-foreground: #FFFFFF !important;

  --border: rgba(255, 255, 255, 0.55) !important;
  --input: rgba(255, 255, 255, 0.65) !important;
  --ring: var(--fairy-pink-aurora) !important;
  --radius: 18px !important;

  /* 侧边栏 Token - 通透高级冰蓝水光玻璃 */
  --sidebar-background: rgba(250, 253, 255, 0.20) !important;
  --sidebar: rgba(250, 253, 255, 0.20) !important;
  --color-sidebar: rgba(250, 253, 255, 0.20) !important;
  --sidebar-foreground: var(--fairy-ink) !important;
  --sidebar-border: rgba(255, 255, 255, 0.70) !important;
  --sidebar-primary: var(--fairy-blue-primary) !important;
  --sidebar-primary-foreground: #FFFFFF !important;
  --sidebar-accent: rgba(75, 133, 238, 0.10) !important;
  --sidebar-accent-foreground: #1D4ED8 !important;
  --sidebar-secondary: rgba(75, 133, 238, 0.18) !important;
  --sidebar-secondary-foreground: #1D4ED8 !important;
  --sidebar-muted: rgba(75, 133, 238, 0.08) !important;
  --sidebar-muted-foreground: var(--fairy-ink-muted) !important;
}

/* =============================================================================
   2. TYPOGRAPHY: Antigravity 模式专属字体（放大至 18px，中文统一行楷，英文统一 TIMES NEW ROMAN）
   ============================================================================= */

html:not([data-experience="chat"]):not([data-gemini-experience="chat"]),
html:not([data-experience="chat"]):not([data-gemini-experience="chat"]) body {
  font-size: 18px !important;
}

html:not([data-experience="chat"]):not([data-gemini-experience="chat"]) *,
html:not([data-experience="chat"]):not([data-gemini-experience="chat"]) *::before,
html:not([data-experience="chat"]):not([data-gemini-experience="chat"]) *::after,
html:not([data-experience="chat"]):not([data-gemini-experience="chat"]) body,
html:not([data-experience="chat"]):not([data-gemini-experience="chat"]) input,
html:not([data-experience="chat"]):not([data-gemini-experience="chat"]) textarea,
html:not([data-experience="chat"]):not([data-gemini-experience="chat"]) select,
html:not([data-experience="chat"]):not([data-gemini-experience="chat"]) button,
html:not([data-experience="chat"]):not([data-gemini-experience="chat"]) div,
html:not([data-experience="chat"]):not([data-gemini-experience="chat"]) span,
html:not([data-experience="chat"]):not([data-gemini-experience="chat"]) p,
html:not([data-experience="chat"]):not([data-gemini-experience="chat"]) a,
html:not([data-experience="chat"]):not([data-gemini-experience="chat"]) label,
html:not([data-experience="chat"]):not([data-gemini-experience="chat"]) h1,
html:not([data-experience="chat"]):not([data-gemini-experience="chat"]) h2,
html:not([data-experience="chat"]):not([data-gemini-experience="chat"]) h3,
html:not([data-experience="chat"]):not([data-gemini-experience="chat"]) h4,
html:not([data-experience="chat"]):not([data-gemini-experience="chat"]) h5,
html:not([data-experience="chat"]):not([data-gemini-experience="chat"]) h6 {
  font-family: "Times New Roman", Times, "STXingkai", "华文行楷", "Xingkai SC", "KaiTi", "楷体", serif !important;
  -webkit-font-smoothing: antialiased !important;
  -moz-osx-font-smoothing: grayscale !important;
}

/* 保护代码块与 Monaco 编辑器使用等宽字体，保证排版与缩进完美 */
pre,
pre *,
code,
code *,
kbd,
samp,
.font-mono,
.font-mono *,
[class*="font-mono"],
[class*="font-mono"] *,
.monaco-editor,
.monaco-editor * {
  font-family: "Cascadia Code", "Fira Code", Consolas, "Courier New", monospace !important;
}

/* =============================================================================
   3. DREAM WALLPAPER CANVAS (优化目标2：中间背景图采用新上传图片并全屏沉浸呈现)
   ============================================================================= */

html:not([data-experience="chat"]):not([data-gemini-experience="chat"]),
html:not([data-experience="chat"]):not([data-gemini-experience="chat"]) body {
  background-color: #F6FAFF !important;
  background-image: 
    var(--ds-hero-scrim),
    var(--dream-fairy-art) !important;
  background-size: cover !important;
  background-position: center bottom !important;
  background-attachment: fixed !important;
  background-repeat: no-repeat !important;
  color: var(--foreground) !important;
  overflow-x: hidden !important;
}

/* 贯通全容器的通透层，释放底层壁纸 */
html:not([data-experience="chat"]):not([data-gemini-experience="chat"]) #root,
html:not([data-experience="chat"]):not([data-gemini-experience="chat"]) [data-testid="app-root"],
html:not([data-experience="chat"]):not([data-gemini-experience="chat"]) .bg-background,
html:not([data-experience="chat"]):not([data-gemini-experience="chat"]) main,
html:not([data-experience="chat"]):not([data-gemini-experience="chat"]) .h-full.w-full,
html:not([data-experience="chat"]):not([data-gemini-experience="chat"]) [data-testid="conversation-view"] {
  background-color: transparent !important;
}

body::after {
  display: none !important;
}

::selection {
  background: var(--fairy-pink-surface) !important;
  color: #122035 !important;
}

/* 晶莹细滑圆角滚动条 */
::-webkit-scrollbar {
  width: 6px !important;
  height: 6px !important;
}

::-webkit-scrollbar-track {
  background: transparent !important;
}

::-webkit-scrollbar-thumb {
  background: rgba(75, 133, 238, 0.22) !important;
  border-radius: 9999px !important;
  border: 1px solid transparent !important;
  background-clip: padding-box !important;
  transition: all 0.25s ease !important;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, var(--fairy-blue-primary) 0%, var(--fairy-pink-aurora) 100%) !important;
  box-shadow: 0 0 10px var(--fairy-blue-glow) !important;
}


/* =============================================================================
   WORK MODE EXCLUSIVE SCOPE (SECTIONS 4 - 12)
   当进入 Chat 模式 (data-experience="chat") 时，所有 560px 宽度限制、
   380px 固定文本卡片、以及梦幻星海半透明流光等样式全部完全停用，杜绝任何样式泄漏。
   ============================================================================= */

html:not([data-experience="chat"]):not([data-gemini-experience="chat"]) {
/* =============================================================================
   4. TOP NAVIGATION & WINDOW HEADER (加深晶莹流光玻璃拟态，增强透明通透感与高光边缘)
   ============================================================================= */

/* 顶部窗口标题栏 (Antigravity 文件 视图 窗口) */
div.shrink-0:has(> div.flex.items-center.gap-1.px-2),
div.shrink-0:has(button:has(svg)),
div[class*="titlebar"] {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, rgba(230, 242, 255, 0.12) 100%) !important;
  backdrop-filter: blur(28px) saturate(190%) contrast(108%) !important;
  -webkit-backdrop-filter: blur(28px) saturate(190%) contrast(108%) !important;
  border-bottom: 1.5px solid rgba(255, 255, 255, 0.65) !important;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.85), 0 4px 18px rgba(60, 110, 200, 0.04) !important;
  color: var(--fairy-ink) !important;
}

/* 消除标题栏内部嵌套容器的多余实底 */
div.shrink-0:has(> div.flex.items-center.gap-1.px-2) div.bg-sidebar {
  background: transparent !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  border: none !important;
  box-shadow: none !important;
}

div.shrink-0:has(> div.flex.items-center.gap-1.px-2) button,
div.shrink-0:has(> div.flex.items-center.gap-1.px-2) .relative > button {
  border-radius: 8px !important;
  padding: 4px 10px !important;
  color: #0E1B30 !important;
  font-weight: 600 !important;
  font-size: 16.5px !important;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.95) !important;
  transition: all 0.18s ease !important;
}

div.shrink-0:has(> div.flex.items-center.gap-1.px-2) button:hover {
  background: rgba(75, 133, 238, 0.14) !important;
  color: var(--fairy-blue-deep) !important;
}

/* 二级面包屑导航栏 (change-skin / Doraemon Custom Theme CSS) */
div.shrink-0:has(> div.flex.w-full.min-w-0.select-none),
div[class*="breadcrumb"],
header,
[data-testid="header"],
[data-testid="chat-header"] {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.20) 0%, rgba(236, 246, 255, 0.10) 100%) !important;
  backdrop-filter: blur(24px) saturate(180%) contrast(106%) !important;
  -webkit-backdrop-filter: blur(24px) saturate(180%) contrast(106%) !important;
  border-bottom: 1.5px solid rgba(255, 255, 255, 0.55) !important;
  box-shadow: 0 4px 16px rgba(60, 110, 200, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.80) !important;
}

div.shrink-0:has(> div.flex.w-full.min-w-0.select-none) span,
div.shrink-0:has(> div.flex.w-full.min-w-0.select-none) button {
  color: #0E1B30 !important;
  font-weight: 600 !important;
  font-size: 16px !important;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.95) !important;
}

/* =============================================================================
   5. TRANSLUCENT FROSTED SIDEBAR (加深流光冰川玻璃拟态，消除多层堆叠不透光，增强透明对比感)
   ============================================================================= */

div[role="navigation"],
aside:not([role="dialog"] aside),
[role="navigation"][aria-label="Sidebar"] {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.22) 0%, rgba(228, 242, 255, 0.12) 50%, rgba(246, 234, 255, 0.16) 100%) !important;
  backdrop-filter: blur(32px) saturate(200%) contrast(110%) !important;
  -webkit-backdrop-filter: blur(32px) saturate(200%) contrast(110%) !important;
  border-right: 1.5px solid rgba(255, 255, 255, 0.70) !important;
  box-shadow: 
    inset -1px 0 0 rgba(255, 255, 255, 0.85), 
    inset 1px 0 0 rgba(255, 255, 255, 0.40),
    6px 0 32px rgba(60, 110, 200, 0.06) !important;
}

/* 清理侧边栏内部子容器的多余实色背景与毛玻璃，防止层层堆叠导致发白发死 */
div[role="navigation"] div.bg-sidebar,
div[role="navigation"] div[class*="bg-sidebar"] {
  background: transparent !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  border-right: none !important;
  box-shadow: none !important;
}

/* 侧边栏文字：极高对比墨韵与纯白星芒描光微阴影，确保字字如雕刻般清晰锐利 */
div[role="navigation"] *,
div[role="navigation"] span,
div[role="navigation"] p,
div[role="navigation"] label {
  color: #0E1B30 !important;
  font-weight: 550 !important;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.95), 0 0 1px #FFFFFF !important;
}

div[role="navigation"] h1,
div[role="navigation"] h2,
div[role="navigation"] [class*="text-muted-foreground"] {
  color: #1A3258 !important;
  font-weight: 650 !important;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.95) !important;
}

/* "+ 新建对话" 晶莹透彩水光胶囊 */
div[role="navigation"] button:has(svg):first-child,
div[role="navigation"] button:has(+ div),
button[class*="hover:bg-sidebar-accent"]:has(svg) {
  background: linear-gradient(135deg, rgba(62, 123, 230, 0.16) 0%, rgba(212, 136, 203, 0.14) 100%) !important;
  backdrop-filter: blur(16px) !important;
  -webkit-backdrop-filter: blur(16px) !important;
  border: 1.5px solid rgba(255, 255, 255, 0.90) !important;
  border-radius: 9999px !important;
  box-shadow: 0 4px 16px rgba(62, 123, 230, 0.10), inset 0 1px 0 #FFFFFF !important;
  color: #173DB3 !important;
  font-weight: 650 !important;
  font-size: 18px !important;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.95) !important;
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

div[role="navigation"] button:has(svg):first-child:hover {
  background: linear-gradient(135deg, rgba(62, 123, 230, 0.26) 0%, rgba(212, 136, 203, 0.20) 100%) !important;
  border-color: var(--fairy-pink-aurora) !important;
  transform: translateY(-1.5px) !important;
  box-shadow: 0 6px 20px rgba(62, 123, 230, 0.16), 0 0 14px var(--fairy-pink-glow) !important;
}

/* 侧边栏行项悬浮态：晶莹流光微移 */
div[role="navigation"] a:hover,
div[role="navigation"] button:hover,
div[role="navigation"] [role="button"]:hover,
div[role="navigation"] div[class*="group/item"]:hover,
div[role="navigation"] div[class*="cursor-pointer"]:hover {
  background: linear-gradient(90deg, rgba(62, 123, 230, 0.14) 0%, rgba(212, 136, 203, 0.08) 100%) !important;
  backdrop-filter: blur(10px) !important;
  border: 1px solid rgba(255, 255, 255, 0.85) !important;
  box-shadow: 0 3px 12px rgba(60, 110, 200, 0.06) !important;
  transform: translateX(3px) !important;
  color: #10348E !important;
}

/* 侧边栏当前激活选中项（高质感极光紫粉侧边晶体） */
div[role="navigation"] a[aria-current="page"],
div[role="navigation"] .bg-sidebar-accent,
div[role="navigation"] [data-active="true"],
div[role="navigation"] div[class*="bg-accent"],
div[role="navigation"] div[class*="bg-muted"]:has(span) {
  background: linear-gradient(90deg, rgba(62, 123, 230, 0.22) 0%, rgba(212, 136, 203, 0.16) 100%) !important;
  backdrop-filter: blur(16px) !important;
  border: 1px solid rgba(255, 255, 255, 0.90) !important;
  border-left: 4px solid var(--fairy-pink-aurora) !important;
  box-shadow: 0 4px 16px rgba(62, 123, 230, 0.12), inset 0 1px 0 #FFFFFF !important;
  color: #12379C !important;
  font-weight: 650 !important;
}

/* =============================================================================
   6. CHAT CONVERSATION VIEW & NON-OBSTRUCTIVE LAYOUT (彻底不遮挡背景图)
   ============================================================================= */

/* 核心防遮挡架构：会话流严格限制在左侧区间 (560px)，释放右侧 600px+ 极宽阔画卷区域 */
[data-testid="conversation-view"] > [data-testid="autoscroll-viewport"] > div:first-child,
[data-testid="conversation-view"] [data-testid="autoscroll-viewport"] > div,
[data-testid="conversation-view"] .mx-auto,
[data-testid="conversation-view"] [class*="max-w-4xl"],
[data-testid="conversation-view"] [class*="max-w-3xl"] {
  max-width: 560px !important;
  margin-left: 20px !important;
  margin-right: auto !important;
}

/* 用户提问气泡：纯净晶莹高透玉感卡片 (透光而不挡画，文字清晰锐利) */
[data-testid="user-input-step"] {
  align-items: flex-end !important;
}

[data-testid="user-input-step"] [data-testid="lifted-context-menu-trigger"] > .bg-card,
[role="article"][aria-label="User message"] .bg-card,
[data-testid="user-input-step"] .rounded-2xl.bg-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.40) 0%, rgba(246, 250, 255, 0.22) 100%) !important;
  backdrop-filter: blur(16px) saturate(150%) !important;
  -webkit-backdrop-filter: blur(16px) saturate(150%) !important;
  border: 1.5px solid rgba(255, 255, 255, 0.80) !important;
  border-radius: 22px 22px 6px 22px !important;
  box-shadow: 
    0 8px 30px rgba(60, 110, 200, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.90),
    0 0 16px rgba(195, 220, 255, 0.20) !important;
  color: var(--fairy-ink) !important;
  padding: 14px 20px !important;
  max-width: 90% !important;
  transition: transform 0.25s ease, box-shadow 0.25s ease !important;
}

[data-testid="user-input-step"] [data-testid="lifted-context-menu-trigger"] > .bg-card:hover {
  box-shadow: 
    var(--fairy-shadow-light-elevated),
    var(--fairy-inner-white),
    0 0 22px rgba(222, 144, 215, 0.25) !important;
  border-color: #FFFFFF !important;
}

[data-testid="user-input-step"] .whitespace-pre-wrap {
  color: var(--fairy-ink) !important;
  font-weight: 550 !important;
  font-size: 18px !important;
  line-height: 1.75 !important;
}

/* =============================================================================
   6b. AGENT RESPONSE VIEWPORT (固定尺寸大小、滚动条浏览、上下差异化留白)
   ============================================================================= */

/* 响应流外层容器：设为完全通透无边框，使内部各功能块（工具栏、回答卡、文件卡）独立成舱 */
[role="article"][aria-label="Agent response"] {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  padding: 0 !important;
  margin: 0 !important;
}

/* 核心回答文本舱：固定尺寸大小，独立内嵌滚动条，上下差异化留白，高透琉璃 */
[role="article"][aria-label="Agent response"] > div:has(> .leading-relaxed),
[role="article"][aria-label="Agent response"] > div:has(.leading-relaxed),
[role="article"][aria-label="Agent response"] > div.px-2.py-1,
[role="article"] > div:has(> .leading-relaxed),
[data-testid="planner-response-text"] {
  height: 380px !important;
  max-height: 380px !important;
  overflow-y: auto !important;
  overflow-x: hidden !important;
  
  /* 上方与下方留白差异化设定 (不同的留白) */
  margin-top: 16px !important;      /* 上方留白：与工具状态栏/提问卡片保持16px舒适间距 */
  margin-bottom: 28px !important;   /* 下方留白：与下方文件卡片/底部输入框保持28px更开阔留白 */
  
  /* 高透琉璃毛玻璃卡片 */
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.40) 0%, rgba(246, 250, 255, 0.24) 100%) !important;
  backdrop-filter: blur(18px) saturate(155%) !important;
  -webkit-backdrop-filter: blur(18px) saturate(155%) !important;
  border: 1.5px solid rgba(255, 255, 255, 0.80) !important;
  border-radius: 22px !important;
  padding: 20px 22px !important;
  box-shadow: 
    0 8px 30px rgba(60, 110, 200, 0.04), 
    inset 0 1px 0 rgba(255, 255, 255, 0.90), 
    0 0 18px rgba(195, 220, 255, 0.16) !important;
  
  scrollbar-width: thin !important;
  scrollbar-gutter: stable !important;
}

/* 文本舱滚动条极美梦幻风格化 */
[role="article"][aria-label="Agent response"] > div:has(> .leading-relaxed)::-webkit-scrollbar,
[role="article"][aria-label="Agent response"] > div:has(.leading-relaxed)::-webkit-scrollbar,
[role="article"][aria-label="Agent response"] > div.px-2.py-1::-webkit-scrollbar,
[role="article"] > div:has(> .leading-relaxed)::-webkit-scrollbar,
[data-testid="planner-response-text"]::-webkit-scrollbar {
  width: 6px !important;
}

[role="article"][aria-label="Agent response"] > div:has(> .leading-relaxed)::-webkit-scrollbar-track,
[role="article"][aria-label="Agent response"] > div:has(.leading-relaxed)::-webkit-scrollbar-track,
[role="article"][aria-label="Agent response"] > div.px-2.py-1::-webkit-scrollbar-track,
[role="article"] > div:has(> .leading-relaxed)::-webkit-scrollbar-track,
[data-testid="planner-response-text"]::-webkit-scrollbar-track {
  background: transparent !important;
}

[role="article"][aria-label="Agent response"] > div:has(> .leading-relaxed)::-webkit-scrollbar-thumb,
[role="article"][aria-label="Agent response"] > div:has(.leading-relaxed)::-webkit-scrollbar-thumb,
[role="article"][aria-label="Agent response"] > div.px-2.py-1::-webkit-scrollbar-thumb,
[role="article"] > div:has(> .leading-relaxed)::-webkit-scrollbar-thumb,
[data-testid="planner-response-text"]::-webkit-scrollbar-thumb {
  background: rgba(62, 123, 230, 0.28) !important;
  border-radius: 9999px !important;
  border: 1px solid transparent !important;
  background-clip: padding-box !important;
  transition: all 0.25s ease !important;
}

[role="article"][aria-label="Agent response"] > div:has(> .leading-relaxed)::-webkit-scrollbar-thumb:hover,
[role="article"][aria-label="Agent response"] > div:has(.leading-relaxed)::-webkit-scrollbar-thumb:hover,
[role="article"][aria-label="Agent response"] > div.px-2.py-1::-webkit-scrollbar-thumb:hover,
[role="article"] > div:has(> .leading-relaxed)::-webkit-scrollbar-thumb:hover,
[data-testid="planner-response-text"]::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, var(--fairy-blue-primary) 0%, var(--fairy-pink-aurora) 100%) !important;
  box-shadow: 0 0 8px var(--fairy-blue-glow) !important;
}

/* 文本排版与标题美化 */
[role="article"][aria-label="Agent response"] .leading-relaxed,
[role="article"][aria-label="Agent response"] > div.px-2.py-1 > div,
[data-testid="planner-response-text"] > div {
  line-height: 1.85 !important;
  color: #122035 !important;
  font-weight: 550 !important;
  font-size: 18px !important;
}

[role="article"][aria-label="Agent response"] h1,
[role="article"][aria-label="Agent response"] h2,
[role="article"][aria-label="Agent response"] h3,
[data-testid="planner-response-text"] h1,
[data-testid="planner-response-text"] h2,
[data-testid="planner-response-text"] h3 {
  color: #0E1B30 !important;
  font-weight: 650 !important;
  margin-top: 1.2em !important;
  margin-bottom: 0.6em !important;
}

[role="article"][aria-label="Agent response"] h1,
[data-testid="planner-response-text"] h1 {
  font-size: 2.1rem !important;
}
[role="article"][aria-label="Agent response"] h2,
[data-testid="planner-response-text"] h2 {
  font-size: 1.75rem !important;
}
[role="article"][aria-label="Agent response"] h3,
[data-testid="planner-response-text"] h3 {
  font-size: 1.45rem !important;
}

[role="article"][aria-label="Agent response"] h1::before,
[role="article"][aria-label="Agent response"] h2::before,
[data-testid="planner-response-text"] h1::before,
[data-testid="planner-response-text"] h2::before {
  content: "" !important;
  display: inline-block !important;
  width: 4px !important;
  height: 0.9em !important;
  background: linear-gradient(180deg, var(--fairy-pink-aurora) 0%, var(--fairy-blue-primary) 100%) !important;
  border-radius: 4px !important;
  margin-right: 10px !important;
  vertical-align: -0.1em !important;
  box-shadow: 0 0 8px var(--fairy-pink-glow) !important;
}

/* =============================================================================
   7. ETHEREAL COMPOSER DOCK (梦境悬浮晶透输入底座 - 靠左对齐，完全释放右侧画卷)
   ============================================================================= */

[data-testid="conversation-view"] > div:has([data-testid="agent-input-box"]),
[data-testid="conversation-view"] div[class*="items-center"]:has([data-testid="agent-input-box"]),
[data-testid="conversation-view"] .items-center:has([data-testid="agent-input-box"]) {
  align-items: flex-start !important;
  padding-left: 20px !important;
}

[data-testid="conversation-view"] div:has(> [data-testid="agent-input-box"]),
[data-testid="conversation-view"] div:has(> div > [data-testid="agent-input-box"]),
[data-testid="conversation-view"] div:has(> div > div > [data-testid="agent-input-box"]),
div.w-full.transition-opacity:has([data-testid="agent-input-box"]) {
  max-width: 560px !important;
  margin-left: 0 !important;
  margin-right: auto !important;
  width: 100% !important;
}

[data-testid="agent-input-box"],
.composer-container {
  max-width: 560px !important;
  margin-left: 0 !important;
  margin-right: auto !important;
  width: 100% !important;
}

/* 输入框外壳卡片：高透白玉月光底座 */
[data-testid="agent-input-box"] > .rounded-2xl.bg-card-border,
[data-testid="agent-input-box"] .bg-card,
[data-testid="chat-input-container"] {
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.42) 0%, rgba(246, 250, 255, 0.25) 100%) !important;
  backdrop-filter: blur(20px) saturate(160%) !important;
  -webkit-backdrop-filter: blur(20px) saturate(160%) !important;
  border: 1.5px solid rgba(255, 255, 255, 0.82) !important;
  border-radius: 28px !important;
  box-shadow: 
    0 8px 30px rgba(60, 110, 200, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.90),
    0 0 20px rgba(75, 133, 238, 0.05) !important;
  padding: 8px 14px !important;
  transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

/* 输入框聚焦态 (Focus): 启动极光紫粉渐变光环与微浮动效 */
[data-testid="agent-input-box"]:focus-within > .rounded-2xl.bg-card-border,
[data-testid="agent-input-box"]:focus-within .bg-card,
[data-testid="chat-input-container"]:focus-within {
  border-color: var(--fairy-pink-aurora) !important;
  background: rgba(255, 255, 255, 0.92) !important;
  box-shadow: 
    var(--fairy-shadow-light-elevated),
    0 0 0 2.5px rgba(222, 144, 215, 0.35),
    0 0 24px var(--fairy-pink-glow),
    var(--fairy-inner-white) !important;
  transform: translateY(-2px) !important;
}

/* 文本区域与光标 */
[data-testid="agent-input-box"] textarea,
textarea[data-testid="chat-input"],
[data-testid="chat-input-textarea"] {
  background: transparent !important;
  color: var(--fairy-ink) !important;
  font-size: 18px !important;
  line-height: 1.65 !important;
  font-weight: 550 !important;
  caret-color: var(--fairy-pink-aurora) !important;
  border: none !important;
  outline: none !important;
}

[data-testid="agent-input-box"] textarea::placeholder,
textarea[data-testid="chat-input"]::placeholder {
  color: rgba(18, 32, 53, 0.48) !important;
  font-weight: 500 !important;
}

/* =============================================================================
   8. SETTINGS MODAL & DIALOGS (设置窗口深度跟随主题色调：梦境星海极光高级配色)
   ============================================================================= */

/* 遮罩层：轻度暗化底层内容，提供清晰阅读舞台并保留底层梦境壁纸剪影 */
div[data-state="open"][class*="fixed inset-0"],
div[class*="fixed inset-0"][class*="bg-black"],
div[class*="fixed inset-0"][class*="backdrop-blur"] {
  background-color: rgba(14, 25, 45, 0.22) !important;
  backdrop-filter: blur(8px) !important;
  -webkit-backdrop-filter: blur(8px) !important;
}

/* 设置主窗口：梦境星海极光冰蓝高透白玉玻璃底板，透光见影 */
[role="dialog"],
.settings-modal-container,
[data-testid="settings-modal"],
div[class*="settings-modal"] {
  background: linear-gradient(145deg, rgba(248, 252, 255, 0.88) 0%, rgba(242, 248, 255, 0.82) 50%, rgba(254, 248, 255, 0.86) 100%) !important;
  backdrop-filter: blur(28px) saturate(160%) !important;
  -webkit-backdrop-filter: blur(28px) saturate(160%) !important;
  border: 1.5px solid rgba(222, 144, 215, 0.45) !important;
  border-radius: 24px !important;
  box-shadow: 
    0 24px 70px rgba(75, 133, 238, 0.14), 
    0 0 36px rgba(222, 144, 215, 0.18), 
    inset 0 1px 0 #FFFFFF !important;
  color: #122035 !important;
  overflow: hidden !important;
}

/* 设置弹窗左侧导航区：晶莹冰蓝水光侧边栏 */
[role="dialog"] aside,
[role="dialog"] nav,
[role="dialog"] div.bg-sidebar,
[role="dialog"] div[class*="bg-sidebar"],
.settings-modal-container aside,
.settings-modal-container nav,
[role="dialog"] > div > div:first-child:has(button) {
  background: rgba(238, 246, 255, 0.65) !important;
  backdrop-filter: blur(18px) !important;
  -webkit-backdrop-filter: blur(18px) !important;
  border-right: 1.5px solid rgba(255, 255, 255, 0.88) !important;
}

/* 设置左侧分类标题（设置、BetterGravity、项目列表、不在项目中等） */
[role="dialog"] h1,
[role="dialog"] h2,
[role="dialog"] aside h1,
[role="dialog"] aside h2,
[role="dialog"] nav h1,
[role="dialog"] nav h2,
[role="dialog"] [class*="text-muted-foreground"] {
  color: #385072 !important;
  font-weight: 650 !important;
}

/* 设置左侧选项胶囊（通用常规、应用设置、外观、驱动模型、插件、Themes 等） */
[role="dialog"] button[data-testid^="settings-nav-item-"],
[role="dialog"] [role="tablist"] button,
[role="dialog"] aside button,
[role="dialog"] nav button,
.settings-modal-container nav button,
.settings-modal-container [role="tab"] {
  color: #162640 !important;
  font-weight: 550 !important;
  font-size: 16.5px !important;
  padding: 8px 14px !important;
  border-radius: 12px !important;
  border: 1px solid transparent !important;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

/* 选项鼠标悬浮高亮：晶透冰蓝光晕 */
[role="dialog"] button[data-testid^="settings-nav-item-"]:hover,
[role="dialog"] button[data-testid^="settings-nav-item-"].hover\:bg-sidebar-muted:hover,
[role="dialog"] [role="tablist"] button:hover,
[role="dialog"] aside button:hover,
.settings-modal-container nav button:hover {
  background: linear-gradient(90deg, rgba(75, 133, 238, 0.14) 0%, rgba(222, 144, 215, 0.10) 100%) !important;
  border-color: rgba(255, 255, 255, 0.88) !important;
  color: #1A47C2 !important;
  transform: translateX(3px) !important;
  box-shadow: 0 2px 10px rgba(75, 133, 238, 0.08) !important;
}

[role="dialog"] button[data-testid^="settings-nav-item-"]:hover span {
  color: #1A47C2 !important;
}

/* 当前激活选中的设置项（如当前项目 change-skin、当前选中的通用常规等） */
[role="dialog"] button[data-testid^="settings-nav-item-"].bg-sidebar-secondary,
[role="dialog"] button.bg-sidebar-secondary,
[role="dialog"] [class*="bg-sidebar-secondary"],
[role="dialog"] [role="tablist"] button[data-state="active"],
[role="dialog"] [role="tablist"] button[aria-selected="true"],
[role="dialog"] aside button[data-state="active"],
.settings-modal-container nav button[data-state="active"],
.settings-modal-container nav button[aria-selected="true"] {
  background: linear-gradient(90deg, rgba(75, 133, 238, 0.24) 0%, rgba(222, 144, 215, 0.18) 100%) !important;
  color: #1D4ED8 !important;
  font-weight: 650 !important;
  border: 1px solid rgba(255, 255, 255, 0.95) !important;
  border-left: 4px solid var(--fairy-pink-aurora) !important;
  border-radius: 12px !important;
  box-shadow: 0 3px 14px rgba(75, 133, 238, 0.12), inset 0 1px 0 #FFFFFF !important;
}

[role="dialog"] button[data-testid^="settings-nav-item-"].bg-sidebar-secondary span,
[role="dialog"] button.bg-sidebar-secondary span {
  color: #1D4ED8 !important;
  font-weight: 650 !important;
}

/* 设置右上角关闭按钮 (X) */
[role="dialog"] button:has(svg.lucide-x),
[role="dialog"] [data-testid="close-button"],
[role="dialog"] button[aria-label="Close"] {
  background: rgba(255, 255, 255, 0.75) !important;
  border: 1px solid rgba(222, 144, 215, 0.35) !important;
  border-radius: 9999px !important;
  color: #122035 !important;
  transition: all 0.22s ease !important;
}

[role="dialog"] button:has(svg.lucide-x):hover,
[role="dialog"] [data-testid="close-button"]:hover,
[role="dialog"] button[aria-label="Close"]:hover {
  background: linear-gradient(135deg, #F43F5E 0%, #DE90D7 100%) !important;
  color: #FFFFFF !important;
  border-color: transparent !important;
  box-shadow: 0 0 14px rgba(244, 63, 94, 0.40) !important;
  transform: rotate(90deg) scale(1.06) !important;
}

/* 设置弹窗内所有文字高对比深墨蓝覆盖，绝不发虚 */
[role="dialog"] *,
.settings-modal-container * {
  color: #122035 !important;
}

[role="dialog"] p,
[role="dialog"] span,
[role="dialog"] div,
[role="dialog"] label,
.settings-modal-container span,
.settings-modal-container p,
.settings-modal-container label {
  color: #122035 !important;
  font-weight: 500 !important;
  font-size: 16.5px !important;
}

[role="dialog"] h1,
[role="dialog"] h2,
[role="dialog"] h3,
[role="dialog"] h4,
.settings-modal-container h1,
.settings-modal-container h2,
.settings-modal-container h3 {
  color: #0E1B30 !important;
  font-weight: 650 !important;
}

[role="dialog"] [class*="text-muted"],
[role="dialog"] [class*="text-secondary"],
.settings-modal-container [class*="text-muted"],
.settings-modal-container [class*="text-secondary"] {
  color: #385072 !important;
  font-weight: 500 !important;
}

/* 设置右侧内容卡片：通透晶白微粉卡片 (Folders, 智能体设置, 智能体行为等) */
[role="dialog"] .bg-card,
.settings-modal-container .bg-card,
[role="dialog"] [class*="rounded-xl"][class*="border"],
[role="dialog"] [class*="rounded-2xl"][class*="border"],
[role="dialog"] div.border.rounded-lg {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.82) 0%, rgba(246, 251, 255, 0.68) 100%) !important;
  backdrop-filter: blur(14px) !important;
  -webkit-backdrop-filter: blur(14px) !important;
  border: 1.5px solid rgba(195, 220, 255, 0.70) !important;
  border-radius: 18px !important;
  box-shadow: 0 4px 18px rgba(75, 133, 238, 0.04), inset 0 1px 0 #FFFFFF !important;
  transition: all 0.22s ease !important;
}

[role="dialog"] .bg-card:hover,
[role="dialog"] [class*="rounded-xl"][class*="border"]:hover {
  border-color: var(--fairy-pink-aurora) !important;
  box-shadow: 0 6px 22px rgba(222, 144, 215, 0.18), inset 0 1px 0 #FFFFFF !important;
}

/* 设置中各类次级交互胶囊与下拉框（极速模式、始终继续、添加文件夹等） */
[role="dialog"] button.bg-secondary,
[role="dialog"] button[class*="bg-secondary"],
[role="dialog"] button:has(svg.lucide-chevron-down),
[role="dialog"] button:not([role="tab"]):not(aside button):not([data-testid^="settings-nav-item-"]) {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.90) 0%, rgba(242, 248, 255, 0.82) 100%) !important;
  border: 1px solid rgba(195, 220, 255, 0.78) !important;
  border-radius: 9999px !important;
  color: #1A47C2 !important;
  font-weight: 550 !important;
  padding: 5px 14px !important;
  box-shadow: 0 2px 8px rgba(75, 133, 238, 0.05), inset 0 1px 0 #FFFFFF !important;
  transition: all 0.18s ease !important;
}

[role="dialog"] button.bg-secondary:hover,
[role="dialog"] button[class*="bg-secondary"]:hover,
[role="dialog"] button:has(svg.lucide-chevron-down):hover,
[role="dialog"] button:not([role="tab"]):not(aside button):not([data-testid^="settings-nav-item-"]):hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 240, 255, 0.92) 100%) !important;
  border-color: var(--fairy-pink-aurora) !important;
  box-shadow: 0 3px 12px rgba(222, 144, 215, 0.25) !important;
  transform: translateY(-1px) !important;
}

[role="dialog"] input,
[role="dialog"] select,
.settings-modal-container input,
.settings-modal-container select {
  background: rgba(255, 255, 255, 0.92) !important;
  border: 1px solid rgba(195, 220, 255, 0.70) !important;
  color: #122035 !important;
  font-weight: 550 !important;
  border-radius: 10px !important;
  padding: 6px 12px !important;
}

/* =============================================================================
   9. INTERACTIVE CAPSULE BUTTONS (流光胶囊交互按键)
   ============================================================================= */

button,
[role="button"],
.btn-primary,
[data-testid="interaction-continue-button"] {
  border-radius: 9999px !important;
  font-weight: 550 !important;
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

/* 主要操作按键 (Primary Button - 渐变星光晶蓝胶囊) */
button.bg-primary,
.bg-primary,
[data-testid="interaction-continue-button"],
button[aria-label*="Send" i],
[data-testid="send-button"] {
  background: linear-gradient(135deg, #5B8FF2 0%, #356DE0 100%) !important;
  color: #FFFFFF !important;
  border: 1px solid rgba(255, 255, 255, 0.75) !important;
  box-shadow: 0 4px 16px rgba(75, 133, 238, 0.30), inset 0 1px 0 rgba(255, 255, 255, 0.6) !important;
}

button.bg-primary:hover,
.bg-primary:hover,
[data-testid="interaction-continue-button"]:hover,
button[aria-label*="Send" i]:hover,
[data-testid="send-button"]:hover {
  transform: translateY(-2px) scale(1.03) !important;
  background: linear-gradient(135deg, #6FA2FA 0%, #4B85EE 100%) !important;
  box-shadow: 
    0 8px 24px rgba(75, 133, 238, 0.38),
    0 0 16px var(--fairy-pink-glow) !important;
}

/* 次要操作按键 (Secondary Buttons - 纯白微透光晶胶囊) */
button.bg-secondary,
.bg-secondary,
button.border-border,
[data-testid="model-selector-trigger"] {
  background: rgba(255, 255, 255, 0.78) !important;
  backdrop-filter: var(--fairy-blur-subtle) !important;
  border: 1px solid rgba(255, 255, 255, 0.88) !important;
  box-shadow: var(--fairy-inner-white), 0 2px 8px rgba(60, 110, 200, 0.03) !important;
  color: var(--fairy-ink) !important;
  font-weight: 550 !important;
}

button.bg-secondary:hover,
.bg-secondary:hover,
[data-testid="model-selector-trigger"]:hover {
  background: #FFFFFF !important;
  border-color: var(--fairy-pink-aurora) !important;
  transform: translateY(-1.5px) !important;
  box-shadow: 0 4px 16px rgba(222, 144, 215, 0.20), var(--fairy-inner-white) !important;
  color: var(--fairy-blue-deep) !important;
}

/* =============================================================================
   10. POPUPS, MODALS & QUOTA MENU SAFETY (防遮挡安全架构)
   ============================================================================= */

[role="menu"],
.popover-content,
div[data-radix-popper-content-wrapper] > div {
  background: linear-gradient(155deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 252, 255, 0.95) 100%) !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  border: 1px solid rgba(195, 220, 255, 0.55) !important;
  border-radius: 20px !important;
  box-shadow: 
    var(--fairy-shadow-light-elevated),
    var(--fairy-inner-white),
    0 0 24px rgba(75, 133, 238, 0.10) !important;
  padding: 6px !important;
  overflow: visible !important;
}

[data-testid="model-selector-panel"] {
  background: transparent !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  padding: 0 !important;
  overflow: visible !important;
  max-height: none !important;
}

/* 查看用量 (View Usage) 浮层子菜单 - 宽度自适应与防右侧遮挡 */
[role="menu"]:has(.custom-scrollbar),
[role="menu"]:has([data-tooltip-id*="quota"]),
[role="menu"]:has(circle[data-testid="quota-progress-circle"]),
[role="menu"].w-72,
div[class*="z-[6000]"] > [role="menu"] {
  width: auto !important;
  min-width: 330px !important;
  max-width: 420px !important;
  box-sizing: border-box !important;
  padding: 8px 12px 8px 8px !important;
  overflow: visible !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}

[role="menu"] .custom-scrollbar,
[role="menu"] div[class*="overflow-y-auto"] {
  padding-right: 12px !important;
  padding-left: 2px !important;
  overflow-y: auto !important;
  overflow-x: hidden !important;
  scrollbar-gutter: stable !important;
  box-sizing: border-box !important;
}

[role="menu"]:has(circle[data-testid="quota-progress-circle"]) div[class*="flex items-center justify-between"],
[role="menu"] div[class*="flex items-center justify-between"]:has(circle[data-testid="quota-progress-circle"]) {
  padding-right: 10px !important;
  padding-left: 8px !important;
  box-sizing: border-box !important;
  gap: 14px !important;
}

[role="menu"] div.flex.items-center.gap-1\.5.shrink-0,
[role="menu"] div.shrink-0:has(svg) {
  margin-right: 4px !important;
  flex-shrink: 0 !important;
  overflow: visible !important;
}

svg:has(circle[data-testid="quota-progress-circle"]) {
  overflow: visible !important;
  width: 18px !important;
  height: 18px !important;
  flex-shrink: 0 !important;
}

[role="menuitem"],
[role="option"] {
  border-radius: 12px !important;
  margin: 2px 4px !important;
  padding: 8px 12px !important;
  color: var(--fairy-ink) !important;
  font-weight: 550 !important;
  transition: all 0.18s ease !important;
}

[role="menuitem"]:hover,
[role="menuitem"][data-highlighted],
[role="option"]:hover,
[role="option"][aria-selected="true"] {
  background: linear-gradient(90deg, rgba(75, 133, 238, 0.14) 0%, rgba(222, 144, 215, 0.10) 100%) !important;
  color: var(--fairy-blue-deep) !important;
  border: 1px solid rgba(195, 220, 255, 0.45) !important;
  transform: translateX(3px) !important;
}

/* =============================================================================
   11. AI 命令运行框与工具执行流 (优化目标1：固定大小 + 滚动条浏览)
   ============================================================================= */

/* 11a. 工具与命令折叠主面板展开容器 (worked-for-collapsible) - 固定高度与独立滚动条 */
div:has(> button[data-testid="worked-for-collapsible"]) > div.relative > div.overflow-y-auto,
button[data-testid="worked-for-collapsible"] + div.relative > div.overflow-y-auto,
button[data-testid="worked-for-collapsible"] ~ div > div.overflow-y-auto,
div:has(> button[data-testid="worked-for-collapsible"]) [class*="overflow-y-auto"] {
  max-height: 250px !important;
  overflow-y: auto !important;
  overflow-x: hidden !important;
  scrollbar-gutter: stable !important;
  background: rgba(255, 255, 255, 0.35) !important;
  backdrop-filter: var(--fairy-blur-normal) !important;
  -webkit-backdrop-filter: var(--fairy-blur-normal) !important;
  border: 1px solid rgba(255, 255, 255, 0.75) !important;
  border-radius: 16px !important;
  padding: 8px 10px !important;
  margin-top: 4px !important;
  margin-bottom: 6px !important;
  box-shadow: 0 4px 18px rgba(75, 133, 238, 0.04), inset 0 1px 0 #FFFFFF !important;
}

/* 11b. 工具组折叠面板内容容器 (tool-group-collapsible) - 固定高度与滚动条 */
div:has(> button[data-testid="tool-group-collapsible"]) > div.relative > div.overflow-y-auto,
button[data-testid="tool-group-collapsible"] + div.relative > div.overflow-y-auto,
button[data-testid="tool-group-collapsible"] ~ div > div.overflow-y-auto,
div:has(> button[data-testid="tool-group-collapsible"]) [class*="overflow-y-auto"] {
  max-height: 240px !important;
  overflow-y: auto !important;
  overflow-x: hidden !important;
  scrollbar-gutter: stable !important;
  background: rgba(255, 255, 255, 0.35) !important;
  backdrop-filter: var(--fairy-blur-normal) !important;
  -webkit-backdrop-filter: var(--fairy-blur-normal) !important;
  border: 1px solid rgba(255, 255, 255, 0.75) !important;
  border-radius: 16px !important;
  padding: 8px 10px !important;
  margin-top: 4px !important;
  margin-bottom: 6px !important;
  box-shadow: 0 4px 18px rgba(75, 133, 238, 0.04), inset 0 1px 0 #FFFFFF !important;
}

/* 11c. 会话中直接平铺展示的多条连续命令与工具列表 - 固定大小并启用滚动条 */
[data-testid="conversation-view"] div.flex.flex-col.gap-0\.5:has(> .flex.flex-row > div > div > .group\/run-command),
[data-testid="conversation-view"] div.flex.flex-col.gap-0\.5:has(> div > div > [data-testid="run-command-step"]),
[data-testid="conversation-view"] div.flex.flex-col.gap-0\.5:has(> div:has([data-testid="tool-group-collapsible"])),
[data-testid="conversation-view"] div.flex.flex-col.gap-0\.5:has(> div.flex.flex-row:nth-child(4)) {
  max-height: 250px !important;
  overflow-y: auto !important;
  overflow-x: hidden !important;
  scrollbar-gutter: stable !important;
  padding: 8px 10px !important;
  background: rgba(255, 255, 255, 0.35) !important;
  backdrop-filter: var(--fairy-blur-subtle) !important;
  -webkit-backdrop-filter: var(--fairy-blur-subtle) !important;
  border: 1px solid rgba(255, 255, 255, 0.75) !important;
  border-radius: 16px !important;
  box-shadow: 0 4px 16px rgba(60, 110, 200, 0.04), inset 0 1px 0 #FFFFFF !important;
  margin-top: 4px !important;
  margin-bottom: 6px !important;
}

/* 11d. 单个 AI 终端命令运行卡片 (Terminal Card / run-command card) - 限制固定高度与输出滚动 */
div.group\/run-command,
div[class*="group/run-command"],
[data-testid="run-command-step"] {
  max-height: 220px !important;
  overflow-y: auto !important;
  overflow-x: hidden !important;
  scrollbar-gutter: stable !important;
  background: rgba(14, 22, 38, 0.88) !important;
  backdrop-filter: var(--fairy-blur-normal) !important;
  -webkit-backdrop-filter: var(--fairy-blur-normal) !important;
  border: 1.5px solid rgba(195, 220, 255, 0.45) !important;
  border-radius: 14px !important;
  box-shadow: 0 6px 20px rgba(60, 110, 200, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;
  margin-top: 4px !important;
}

/* 命令行区域限制高度与换行 */
div.group\/run-command pre,
div[class*="group/run-command"] pre,
[data-testid="run-command-step"] pre {
  max-height: 100px !important;
  overflow-y: auto !important;
  font-size: 14.5px !important;
  line-height: 1.55 !important;
}

/* 运行输出与日志区域 (yob container) 滚动条支持 */
div.group\/run-command div.pt-1,
div[class*="group/run-command"] div.pt-1,
[data-testid="run-command-step"] div.pt-1 {
  max-height: 120px !important;
  overflow-y: auto !important;
}

/* 11e. 命令折叠触发胶囊 (Ran ..., Edited ..., Explored ...) - 晶莹浅透高亮 */
button[data-testid="worked-for-collapsible"],
button[data-testid="tool-group-collapsible"],
div:has(> [data-testid="run-command-step"]) > button,
.group\/run-command button {
  background: rgba(255, 255, 255, 0.45) !important;
  backdrop-filter: var(--fairy-blur-subtle) !important;
  -webkit-backdrop-filter: var(--fairy-blur-subtle) !important;
  border: 1px solid rgba(255, 255, 255, 0.85) !important;
  border-radius: 12px !important;
  color: var(--fairy-ink) !important;
  font-weight: 550 !important;
  padding: 5px 12px !important;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
  box-shadow: 0 2px 8px rgba(60, 110, 200, 0.03), inset 0 1px 0 #FFFFFF !important;
}

button[data-testid="worked-for-collapsible"]:hover,
button[data-testid="tool-group-collapsible"]:hover {
  background: rgba(255, 255, 255, 0.92) !important;
  border-color: var(--fairy-pink-aurora) !important;
  color: var(--fairy-blue-deep) !important;
  box-shadow: 0 4px 14px rgba(222, 144, 215, 0.25), inset 0 1px 0 #FFFFFF !important;
  transform: translateY(-1px) !important;
}

/* 11f. 命令运行框专属晶莹流光滚动条 */
div:has(> button[data-testid="worked-for-collapsible"]) > div.relative > div.overflow-y-auto::-webkit-scrollbar,
div:has(> button[data-testid="tool-group-collapsible"]) > div.relative > div.overflow-y-auto::-webkit-scrollbar,
[data-testid="conversation-view"] div.flex.flex-col.gap-0\.5:has(> .flex.flex-row > div > div > .group\/run-command)::-webkit-scrollbar,
[data-testid="conversation-view"] div.flex.flex-col.gap-0\.5:has(> div:has([data-testid="tool-group-collapsible"]))::-webkit-scrollbar,
div.group\/run-command::-webkit-scrollbar,
[data-testid="run-command-step"]::-webkit-scrollbar,
[data-testid="run-command-step"] pre::-webkit-scrollbar {
  width: 5px !important;
  height: 5px !important;
}

div:has(> button[data-testid="worked-for-collapsible"]) > div.relative > div.overflow-y-auto::-webkit-scrollbar-thumb,
div:has(> button[data-testid="tool-group-collapsible"]) > div.relative > div.overflow-y-auto::-webkit-scrollbar-thumb,
[data-testid="conversation-view"] div.flex.flex-col.gap-0\.5:has(> .flex.flex-row > div > div > .group\/run-command)::-webkit-scrollbar-thumb,
[data-testid="conversation-view"] div.flex.flex-col.gap-0\.5:has(> div:has([data-testid="tool-group-collapsible"]))::-webkit-scrollbar-thumb,
div.group\/run-command::-webkit-scrollbar-thumb,
[data-testid="run-command-step"]::-webkit-scrollbar-thumb,
[data-testid="run-command-step"] pre::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, var(--fairy-blue-light) 0%, var(--fairy-pink-aurora) 100%) !important;
  border-radius: 9999px !important;
  box-shadow: 0 0 6px var(--fairy-blue-glow) !important;
}

div:has(> button[data-testid="worked-for-collapsible"]) > div.relative > div.overflow-y-auto::-webkit-scrollbar-track,
div:has(> button[data-testid="tool-group-collapsible"]) > div.relative > div.overflow-y-auto::-webkit-scrollbar-track,
[data-testid="conversation-view"] div.flex.flex-col.gap-0\.5:has(> .flex.flex-row > div > div > .group\/run-command)::-webkit-scrollbar-track,
[data-testid="conversation-view"] div.flex.flex-col.gap-0\.5:has(> div:has([data-testid="tool-group-collapsible"]))::-webkit-scrollbar-track,
div.group\/run-command::-webkit-scrollbar-track,
[data-testid="run-command-step"]::-webkit-scrollbar-track,
[data-testid="run-command-step"] pre::-webkit-scrollbar-track {
  background: rgba(75, 133, 238, 0.05) !important;
  border-radius: 9999px !important;
}

/* =============================================================================
   12. CODE BLOCKS & MONACO EDITOR GLASSMORPHISM (代码舱与编辑器毛玻璃)
   ============================================================================= */

pre,
.bg-card pre,
pre code {
  background: rgba(14, 22, 38, 0.90) !important;
  backdrop-filter: var(--fairy-blur-normal) !important;
  -webkit-backdrop-filter: var(--fairy-blur-normal) !important;
  border: 1px solid rgba(195, 220, 255, 0.35) !important;
  border-radius: 18px !important;
  box-shadow: 
    0 12px 36px rgba(60, 110, 200, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;
  color: #F1F5F9 !important;
  padding: 16px !important;
}

:not(pre) > code {
  background: rgba(75, 133, 238, 0.10) !important;
  color: var(--fairy-blue-deep) !important;
  border: 1px solid rgba(195, 220, 255, 0.40) !important;
  border-radius: 8px !important;
  padding: 2px 7px !important;
  font-weight: 600 !important;
}

/* 右侧打开的代码编辑器工作区毛玻璃背景 */
.monaco-editor,
.monaco-editor-background,
.monaco-editor .inputarea.ime-input,
[data-mode-id] {
  background: rgba(14, 22, 38, 0.78) !important;
  backdrop-filter: var(--fairy-blur-normal) !important;
  -webkit-backdrop-filter: var(--fairy-blur-normal) !important;
}

/* 工具卡片与状态折叠栏 (Worked for, Ran node, etc.) */
[data-testid="worked-for-collapsible"],
div.border.files-changed-header,
div[class*="files-changed-header"],
div[class*="rounded-xl"][class*="border"]:has(> div:has(svg)) {
  background: rgba(255, 255, 255, 0.42) !important;
  backdrop-filter: var(--fairy-blur-subtle) !important;
  -webkit-backdrop-filter: var(--fairy-blur-subtle) !important;
  border: 1px solid rgba(255, 255, 255, 0.85) !important;
  border-radius: 16px !important;
  box-shadow: var(--fairy-shadow-light-card), var(--fairy-inner-white) !important;
  color: var(--fairy-ink) !important;
  font-weight: 550 !important;
}

/* 模型额度与账户分块卡片全边框完整显示强化 */
.rounded-xl.border,
.rounded-xl.border.border-border,
.rounded-xl.border.divide-y,
.rounded-lg.border,
.rounded-lg.border.border-border,
.rounded-2xl.border,
div[class*="divide-y"][class*="rounded-xl"],
div[class*="divide-y"][class*="rounded-lg"],
div[data-testid*="quota" i],
div[data-testid*="usage" i],
div[data-testid*="model-quota" i] {
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: var(--fairy-blur-normal) !important;
  -webkit-backdrop-filter: var(--fairy-blur-normal) !important;
  border: 1.5px solid rgba(75, 133, 238, 0.45) !important;
  border-radius: 16px !important;
  box-shadow: 0 4px 20px rgba(60, 110, 200, 0.08), inset 0 1px 0 #FFFFFF !important;
  box-sizing: border-box !important;
  overflow: hidden !important;
  margin-top: 4px !important;
  margin-bottom: 8px !important;
  isolation: isolate !important;
}

[role="dialog"] [class*="overflow-y-auto"],
[role="dialog"] .overflow-y-auto {
  padding-right: 6px !important;
  padding-left: 2px !important;
  scrollbar-gutter: stable !important;
}

.divide-y.divide-border > :not([hidden]) ~ :not([hidden]),
div[class*="divide-y"] > :not([hidden]) ~ :not([hidden]) {
  border-top: 1px solid rgba(195, 220, 255, 0.3) !important;
  border-bottom: none !important;
}

circle[data-testid="quota-progress-circle"] {
  stroke: var(--fairy-blue-primary) !important;
  filter: drop-shadow(0 0 5px rgba(75, 133, 238, 0.45)) !important;
}

svg:has(circle[data-testid="quota-progress-circle"]) circle:first-child {
  stroke: rgba(195, 220, 255, 0.25) !important;
}


}

/* =============================================================================
   13. CLAUDE WEB 1:1 REPLICA (CHAT MODE) - PIXEL-PERFECT ACCURACY
   一比一全量复刻 Claude.ai 官方网页端对话体验：
   - 暖象牙白画布 (#FAF9F5) + 亚麻色侧边栏 (#F3EFE6) + 赤陶色点缀 (#CC785C)
   - 统一 768px (48rem) 居中阅读流，输入框与消息宽度严格一致，彻底消除组件大小不一
   - 隐藏复杂智能体工具/命令运行框，还原纯净人机对话流
   - 纯净现代无衬线字系，解除 380px 卡片高度与毛玻璃限制
   ============================================================================= */

/* 13a. 全局画布与底色：Claude 标志性暖象牙白 (Warm Ivory #FAF9F5) */
html[data-experience="chat"],
html[data-experience="chat"] body,
html[data-gemini-experience="chat"],
html[data-gemini-experience="chat"] body,
html[data-experience="chat"] #root,
html[data-experience="chat"] [data-testid="app-root"],
html[data-experience="chat"] .bg-background,
html[data-experience="chat"] main,
html[data-experience="chat"] .h-full.w-full,
html[data-experience="chat"] [data-testid="conversation-view"],
html[data-gemini-experience="chat"] #root,
html[data-gemini-experience="chat"] [data-testid="app-root"],
html[data-gemini-experience="chat"] .bg-background,
html[data-gemini-experience="chat"] main,
html[data-gemini-experience="chat"] .h-full.w-full,
html[data-gemini-experience="chat"] [data-testid="conversation-view"] {
  background-color: #FAF9F5 !important;
  background-image: none !important;
  color: #1F1E1D !important;
  font-size: 16px !important;
}

/* 13b. Claude 纯净优雅现代无衬线字系（彻底屏蔽行楷，还原 claude.ai 官方字系） */
html[data-experience="chat"] *,
html[data-experience="chat"] *::before,
html[data-experience="chat"] *::after,
html[data-experience="chat"] body,
html[data-experience="chat"] input,
html[data-experience="chat"] textarea,
html[data-experience="chat"] select,
html[data-experience="chat"] button,
html[data-experience="chat"] div,
html[data-experience="chat"] span,
html[data-experience="chat"] p,
html[data-experience="chat"] a,
html[data-experience="chat"] label,
html[data-experience="chat"] h1,
html[data-experience="chat"] h2,
html[data-experience="chat"] h3,
html[data-experience="chat"] h4,
html[data-experience="chat"] h5,
html[data-experience="chat"] h6,
html[data-gemini-experience="chat"] *,
html[data-gemini-experience="chat"] *::before,
html[data-gemini-experience="chat"] *::after,
html[data-gemini-experience="chat"] body,
html[data-gemini-experience="chat"] input,
html[data-gemini-experience="chat"] textarea,
html[data-gemini-experience="chat"] select,
html[data-gemini-experience="chat"] button,
html[data-gemini-experience="chat"] div,
html[data-gemini-experience="chat"] span,
html[data-gemini-experience="chat"] p,
html[data-gemini-experience="chat"] a,
html[data-gemini-experience="chat"] label,
html[data-gemini-experience="chat"] h1,
html[data-gemini-experience="chat"] h2,
html[data-gemini-experience="chat"] h3,
html[data-gemini-experience="chat"] h4,
html[data-gemini-experience="chat"] h5,
html[data-gemini-experience="chat"] h6 {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
  text-shadow: none !important;
  color: #1F1E1D !important;
}

/* 保护等宽代码字体 */
html[data-experience="chat"] pre,
html[data-experience="chat"] pre *,
html[data-experience="chat"] code,
html[data-experience="chat"] code *,
html[data-experience="chat"] .font-mono,
html[data-experience="chat"] .font-mono *,
html[data-gemini-experience="chat"] pre,
html[data-gemini-experience="chat"] pre *,
html[data-gemini-experience="chat"] code,
html[data-gemini-experience="chat"] code *,
html[data-gemini-experience="chat"] .font-mono,
html[data-gemini-experience="chat"] .font-mono * {
  font-family: "JetBrains Mono", "Cascadia Code", "Fira Code", Consolas, monospace !important;
}

/* 13c. Claude 顶栏与面包屑：象牙米白与微暖边框 */
html[data-experience="chat"] div.shrink-0:has(> div.flex.items-center.gap-1.px-2),
html[data-experience="chat"] div[class*="titlebar"],
html[data-experience="chat"] header,
html[data-experience="chat"] [data-testid="header"],
html[data-experience="chat"] div.shrink-0:has(> div.flex.w-full.min-w-0.select-none),
html[data-gemini-experience="chat"] div.shrink-0:has(> div.flex.items-center.gap-1.px-2),
html[data-gemini-experience="chat"] div[class*="titlebar"],
html[data-gemini-experience="chat"] header,
html[data-gemini-experience="chat"] [data-testid="header"],
html[data-gemini-experience="chat"] div.shrink-0:has(> div.flex.w-full.min-w-0.select-none) {
  background: #FAF9F5 !important;
  border-bottom: 1px solid #E5E0D8 !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  box-shadow: none !important;
  color: #1F1E1D !important;
}

html[data-experience="chat"] div.shrink-0:has(> div.flex.items-center.gap-1.px-2) button,
html[data-gemini-experience="chat"] div.shrink-0:has(> div.flex.items-center.gap-1.px-2) button {
  color: #1F1E1D !important;
  font-weight: 500 !important;
  font-size: 14px !important;
  text-shadow: none !important;
  border-radius: 6px !important;
}

html[data-experience="chat"] div.shrink-0:has(> div.flex.items-center.gap-1.px-2) button:hover,
html[data-gemini-experience="chat"] div.shrink-0:has(> div.flex.items-center.gap-1.px-2) button:hover {
  background: #EBE5DA !important;
  color: #1F1E1D !important;
}

html[data-experience="chat"] div.shrink-0:has(> div.flex.w-full.min-w-0.select-none) span,
html[data-experience="chat"] div.shrink-0:has(> div.flex.w-full.min-w-0.select-none) button,
html[data-gemini-experience="chat"] div.shrink-0:has(> div.flex.w-full.min-w-0.select-none) span,
html[data-gemini-experience="chat"] div.shrink-0:has(> div.flex.w-full.min-w-0.select-none) button {
  color: #75736E !important;
  font-weight: 500 !important;
  font-size: 14px !important;
  text-shadow: none !important;
}

/* 13d. Claude 侧边栏：温暖亚麻色背景 (#F3EFE6) 与微暖砂色边框 (#E5E0D8) */
html[data-experience="chat"] div[role="navigation"],
html[data-experience="chat"] aside,
html[data-experience="chat"] [data-testid="conversation-list-sidebar"],
html[data-gemini-experience="chat"] div[role="navigation"],
html[data-gemini-experience="chat"] aside,
html[data-gemini-experience="chat"] [data-testid="conversation-list-sidebar"] {
  background: #F3EFE6 !important;
  border-right: 1px solid #E5E0D8 !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  color: #1F1E1D !important;
}

html[data-experience="chat"] div[role="navigation"] *,
html[data-experience="chat"] aside *,
html[data-gemini-experience="chat"] div[role="navigation"] *,
html[data-gemini-experience="chat"] aside * {
  color: #1F1E1D !important;
  text-shadow: none !important;
}

html[data-experience="chat"] div[role="navigation"] [class*="text-muted"],
html[data-experience="chat"] aside [class*="text-muted"],
html[data-gemini-experience="chat"] div[role="navigation"] [class*="text-muted"],
html[data-gemini-experience="chat"] aside [class*="text-muted"] {
  color: #75736E !important;
}

/* Claude 侧边栏 "+ 新建对话" 按钮 */
html[data-experience="chat"] div[role="navigation"] a[data-testid="new-conversation-button"],
html[data-experience="chat"] div[role="navigation"] button:has(svg):first-child,
html[data-gemini-experience="chat"] div[role="navigation"] a[data-testid="new-conversation-button"],
html[data-gemini-experience="chat"] div[role="navigation"] button:has(svg):first-child {
  background: #FAF9F5 !important;
  border: 1px solid #E5DFD5 !important;
  border-radius: 9999px !important;
  color: #1F1E1D !important;
  box-shadow: 0 1px 2px rgba(31, 30, 29, 0.05) !important;
  font-size: 15px !important;
  font-weight: 550 !important;
  text-shadow: none !important;
  transform: none !important;
}

html[data-experience="chat"] div[role="navigation"] a[data-testid="new-conversation-button"]:hover,
html[data-experience="chat"] div[role="navigation"] button:has(svg):first-child:hover,
html[data-gemini-experience="chat"] div[role="navigation"] a[data-testid="new-conversation-button"]:hover,
html[data-gemini-experience="chat"] div[role="navigation"] button:has(svg):first-child:hover {
  background: #FFFFFF !important;
  border-color: #D6D0C7 !important;
  color: #1F1E1D !important;
  box-shadow: 0 2px 6px rgba(31, 30, 29, 0.08) !important;
  transform: none !important;
}

/* Claude 侧边栏交互项 (悬浮 & 激活高亮) */
html[data-experience="chat"] div[role="navigation"] a:hover,
html[data-experience="chat"] div[role="navigation"] button:hover,
html[data-gemini-experience="chat"] div[role="navigation"] a:hover,
html[data-gemini-experience="chat"] div[role="navigation"] button:hover {
  background: #EBE5DA !important;
  color: #1F1E1D !important;
  border: none !important;
  box-shadow: none !important;
  transform: none !important;
}

html[data-experience="chat"] div[role="navigation"] a[aria-current="page"],
html[data-experience="chat"] div[role="navigation"] .bg-sidebar-accent,
html[data-gemini-experience="chat"] div[role="navigation"] a[aria-current="page"],
html[data-gemini-experience="chat"] div[role="navigation"] .bg-sidebar-accent {
  background: #E0D8CB !important;
  border-left: 3px solid #CC785C !important;
  color: #1F1E1D !important;
  font-weight: 600 !important;
  border-radius: 8px !important;
  box-shadow: none !important;
}

/* 13e. CLAUDE 统一 768px (48rem) 居中阅读流 —— 彻底解决消息与输入框组件大小不一 */

/* 对话消息滚动流容器 */
html[data-experience="chat"] [data-testid="conversation-view"] > [data-testid="autoscroll-viewport"] > div:first-child,
html[data-experience="chat"] [data-testid="conversation-view"] [data-testid="autoscroll-viewport"] > div,
html[data-experience="chat"] [data-testid="conversation-view"] .mx-auto,
html[data-experience="chat"] [data-testid="conversation-view"] [class*="max-w-4xl"],
html[data-experience="chat"] [data-testid="conversation-view"] [class*="max-w-3xl"],
html[data-gemini-experience="chat"] [data-testid="conversation-view"] > [data-testid="autoscroll-viewport"] > div:first-child,
html[data-gemini-experience="chat"] [data-testid="conversation-view"] [data-testid="autoscroll-viewport"] > div,
html[data-gemini-experience="chat"] [data-testid="conversation-view"] .mx-auto,
html[data-gemini-experience="chat"] [data-testid="conversation-view"] [class*="max-w-4xl"],
html[data-gemini-experience="chat"] [data-testid="conversation-view"] [class*="max-w-3xl"] {
  max-width: 768px !important;
  width: 100% !important;
  margin-left: auto !important;
  margin-right: auto !important;
  padding-left: 16px !important;
  padding-right: 16px !important;
  box-sizing: border-box !important;
}

/* 底部输入框直接容器与自身：一律居中并锁定 768px 宽度，彻底解除左靠齐与 560px 锁死 */
html[data-experience="chat"] [data-testid="conversation-view"] > div:has([data-testid="agent-input-box"]),
html[data-experience="chat"] [data-testid="conversation-view"] div.items-center:has([data-testid="agent-input-box"]),
html[data-experience="chat"] div.relative.z-10:has(> [data-testid="agent-input-box"]),
html[data-experience="chat"] div[class*="transition-opacity"]:has([data-testid="agent-input-box"]),
html[data-experience="chat"] [data-testid="agent-input-box"],
html[data-experience="chat"] .composer-container,
html[data-gemini-experience="chat"] [data-testid="conversation-view"] > div:has([data-testid="agent-input-box"]),
html[data-gemini-experience="chat"] [data-testid="conversation-view"] div.items-center:has([data-testid="agent-input-box"]),
html[data-gemini-experience="chat"] div.relative.z-10:has(> [data-testid="agent-input-box"]),
html[data-gemini-experience="chat"] div[class*="transition-opacity"]:has([data-testid="agent-input-box"]),
html[data-gemini-experience="chat"] [data-testid="agent-input-box"],
html[data-gemini-experience="chat"] .composer-container {
  max-width: 768px !important;
  width: 100% !important;
  margin-left: auto !important;
  margin-right: auto !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
  box-sizing: border-box !important;
}

/* 欢迎页面 (/) 下输入框上层卡片容器居中对齐 */
html[data-experience="chat"] div[class*="animate-fade-in"] > div[class*="flex-col"],
html[data-experience="chat"] div[class*="animate-fade-in"] div.px-4,
html[data-gemini-experience="chat"] div[class*="animate-fade-in"] > div[class*="flex-col"],
html[data-gemini-experience="chat"] div[class*="animate-fade-in"] div.px-4 {
  max-width: 768px !important;
  width: 100% !important;
  margin-left: auto !important;
  margin-right: auto !important;
}

/* 13f. Claude 用户提问气泡：右侧温暖象牙白圆角气泡 (#F4F0E8) */
html[data-experience="chat"] [data-testid="user-input-step"],
html[data-gemini-experience="chat"] [data-testid="user-input-step"] {
  align-items: flex-end !important;
  width: 100% !important;
}

html[data-experience="chat"] [data-testid="user-input-step"] [data-testid="lifted-context-menu-trigger"] > .bg-card,
html[data-experience="chat"] [role="article"][aria-label="User message"] .bg-card,
html[data-experience="chat"] [data-testid="user-input-step"] .rounded-2xl.bg-card,
html[data-gemini-experience="chat"] [data-testid="user-input-step"] [data-testid="lifted-context-menu-trigger"] > .bg-card,
html[data-gemini-experience="chat"] [role="article"][aria-label="User message"] .bg-card,
html[data-gemini-experience="chat"] [data-testid="user-input-step"] .rounded-2xl.bg-card {
  background: #F4F0E8 !important;
  border: 1px solid #E5DFD5 !important;
  border-radius: 20px 20px 4px 20px !important;
  box-shadow: 0 1px 3px rgba(31, 30, 29, 0.04) !important;
  color: #1F1E1D !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  padding: 14px 20px !important;
  max-width: 82% !important;
  margin-left: auto !important;
}

html[data-experience="chat"] [data-testid="user-input-step"] .whitespace-pre-wrap,
html[data-gemini-experience="chat"] [data-testid="user-input-step"] .whitespace-pre-wrap {
  color: #1F1E1D !important;
  font-size: 16px !important;
  line-height: 1.65 !important;
  font-weight: 400 !important;
}

/* 13g. Claude 助手回答：解除 380px 限制与毛玻璃卡片，恢复自然流向下排版 */
html[data-experience="chat"] [role="article"][aria-label="Agent response"],
html[data-gemini-experience="chat"] [role="article"][aria-label="Agent response"] {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  padding: 0 !important;
  margin: 0 !important;
  width: 100% !important;
}

html[data-experience="chat"] [role="article"][aria-label="Agent response"]::before,
html[data-gemini-experience="chat"] [role="article"][aria-label="Agent response"]::before {
  content: "✳ Claude" !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 6px !important;
  font-size: 14px !important;
  font-weight: 600 !important;
  color: #CC785C !important;
  margin-top: 14px !important;
  margin-bottom: 8px !important;
  letter-spacing: 0.2px !important;
}

html[data-experience="chat"] [role="article"][aria-label="Agent response"] > div:has(> .leading-relaxed),
html[data-experience="chat"] [role="article"][aria-label="Agent response"] > div:has(.leading-relaxed),
html[data-experience="chat"] [role="article"][aria-label="Agent response"] > div.px-2.py-1,
html[data-experience="chat"] [role="article"] > div:has(> .leading-relaxed),
html[data-experience="chat"] [data-testid="planner-response-text"],
html[data-gemini-experience="chat"] [role="article"][aria-label="Agent response"] > div:has(> .leading-relaxed),
html[data-gemini-experience="chat"] [role="article"][aria-label="Agent response"] > div:has(.leading-relaxed),
html[data-gemini-experience="chat"] [role="article"][aria-label="Agent response"] > div.px-2.py-1,
html[data-gemini-experience="chat"] [role="article"] > div:has(> .leading-relaxed),
html[data-gemini-experience="chat"] [data-testid="planner-response-text"] {
  height: auto !important;
  max-height: none !important;
  overflow: visible !important;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  padding: 0 !important;
  margin-top: 4px !important;
  margin-bottom: 24px !important;
}

html[data-experience="chat"] [role="article"][aria-label="Agent response"] h1::before,
html[data-experience="chat"] [role="article"][aria-label="Agent response"] h2::before,
html[data-experience="chat"] [data-testid="planner-response-text"] h1::before,
html[data-experience="chat"] [data-testid="planner-response-text"] h2::before,
html[data-gemini-experience="chat"] [role="article"][aria-label="Agent response"] h1::before,
html[data-gemini-experience="chat"] [role="article"][aria-label="Agent response"] h2::before,
html[data-gemini-experience="chat"] [data-testid="planner-response-text"] h1::before,
html[data-gemini-experience="chat"] [data-testid="planner-response-text"] h2::before {
  display: none !important;
}

html[data-experience="chat"] [role="article"][aria-label="Agent response"] .leading-relaxed,
html[data-gemini-experience="chat"] [role="article"][aria-label="Agent response"] .leading-relaxed {
  color: #1F1E1D !important;
  font-size: 16px !important;
  line-height: 1.75 !important;
}

/* 13h. 隐藏智能体调试步骤与工具执行框，还原 Claude 官方纯净对话 */
html[data-experience="chat"] [data-testid*="step-container"]:has([data-testid*="tool"]),
html[data-experience="chat"] [data-testid*="step-container"]:has(button:has(svg)),
html[data-experience="chat"] [data-testid="status-loading-spinner"],
html[data-experience="chat"] div[class*="flex-col"][class*="gap-"]:has([class*="group/run-command"]),
html[data-experience="chat"] div[class*="flex-col"][class*="gap-"]:has([data-testid="run-command-step"]),
html[data-experience="chat"] button[data-testid="worked-for-collapsible"],
html[data-experience="chat"] div:has(> button[data-testid="worked-for-collapsible"]),
html[data-experience="chat"] button[data-testid="tool-group-collapsible"],
html[data-experience="chat"] div:has(> button[data-testid="tool-group-collapsible"]),
html[data-gemini-experience="chat"] [data-testid*="step-container"]:has([data-testid*="tool"]),
html[data-gemini-experience="chat"] [data-testid*="step-container"]:has(button:has(svg)),
html[data-gemini-experience="chat"] [data-testid="status-loading-spinner"],
html[data-gemini-experience="chat"] div[class*="flex-col"][class*="gap-"]:has([class*="group/run-command"]),
html[data-gemini-experience="chat"] div[class*="flex-col"][class*="gap-"]:has([data-testid="run-command-step"]),
html[data-gemini-experience="chat"] button[data-testid="worked-for-collapsible"],
html[data-gemini-experience="chat"] div:has(> button[data-testid="worked-for-collapsible"]),
html[data-gemini-experience="chat"] button[data-testid="tool-group-collapsible"],
html[data-gemini-experience="chat"] div:has(> button[data-testid="tool-group-collapsible"]) {
  display: none !important;
}

/* 13i. Claude 底部输入框：纯白质感圆润悬浮舱，居中对齐 */
html[data-experience="chat"] [data-testid="agent-input-box"] > .rounded-2xl.bg-card-border,
html[data-experience="chat"] [data-testid="agent-input-box"] .bg-card,
html[data-experience="chat"] [data-testid="chat-input-container"],
html[data-gemini-experience="chat"] [data-testid="agent-input-box"] > .rounded-2xl.bg-card-border,
html[data-gemini-experience="chat"] [data-testid="agent-input-box"] .bg-card,
html[data-gemini-experience="chat"] [data-testid="chat-input-container"] {
  background: #FFFFFF !important;
  border: 1px solid #D6D0C7 !important;
  border-radius: 20px !important;
  box-shadow: 0 2px 14px rgba(31, 30, 29, 0.06) !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  padding: 10px 16px !important;
  width: 100% !important;
}

html[data-experience="chat"] [data-testid="agent-input-box"]:focus-within > .rounded-2xl.bg-card-border,
html[data-experience="chat"] [data-testid="agent-input-box"]:focus-within .bg-card,
html[data-experience="chat"] [data-testid="chat-input-container"]:focus-within,
html[data-gemini-experience="chat"] [data-testid="agent-input-box"]:focus-within > .rounded-2xl.bg-card-border,
html[data-gemini-experience="chat"] [data-testid="agent-input-box"]:focus-within .bg-card,
html[data-gemini-experience="chat"] [data-testid="chat-input-container"]:focus-within {
  border-color: #CC785C !important;
  box-shadow: 0 0 0 2px rgba(204, 120, 92, 0.25), 0 2px 14px rgba(31, 30, 29, 0.06) !important;
}

/* Claude 输入框文本区 */
html[data-experience="chat"] [data-testid="agent-input-box"] textarea,
html[data-experience="chat"] textarea[data-testid="chat-input"],
html[data-experience="chat"] [data-testid="chat-input-textarea"],
html[data-gemini-experience="chat"] [data-testid="agent-input-box"] textarea,
html[data-gemini-experience="chat"] textarea[data-testid="chat-input"],
html[data-gemini-experience="chat"] [data-testid="chat-input-textarea"] {
  background: transparent !important;
  color: #1F1E1D !important;
  font-size: 16px !important;
  line-height: 1.6 !important;
  font-weight: 400 !important;
  caret-color: #CC785C !important;
  border: none !important;
  outline: none !important;
}

html[data-experience="chat"] [data-testid="agent-input-box"] textarea::placeholder,
html[data-experience="chat"] textarea[data-testid="chat-input"]::placeholder,
html[data-gemini-experience="chat"] [data-testid="agent-input-box"] textarea::placeholder,
html[data-gemini-experience="chat"] textarea[data-testid="chat-input"]::placeholder {
  color: #9E9A92 !important;
  font-weight: 400 !important;
}

/* 13j. Claude 发送按键：经典赤陶色 (Terracotta) */
html[data-experience="chat"] button[aria-label*="Send" i],
html[data-experience="chat"] [data-testid="send-button"],
html[data-experience="chat"] button.bg-primary,
html[data-gemini-experience="chat"] button[aria-label*="Send" i],
html[data-gemini-experience="chat"] [data-testid="send-button"],
html[data-gemini-experience="chat"] button.bg-primary {
  background: #CC785C !important;
  color: #FFFFFF !important;
  border: none !important;
  box-shadow: 0 1px 3px rgba(31, 30, 29, 0.12) !important;
  border-radius: 9999px !important;
}

html[data-experience="chat"] button[aria-label*="Send" i]:hover,
html[data-experience="chat"] [data-testid="send-button"]:hover,
html[data-experience="chat"] button.bg-primary:hover,
html[data-gemini-experience="chat"] button[aria-label*="Send" i]:hover,
html[data-gemini-experience="chat"] [data-testid="send-button"]:hover,
html[data-gemini-experience="chat"] button.bg-primary:hover {
  background: #B86347 !important;
  transform: translateY(-1px) !important;
  box-shadow: 0 3px 8px rgba(204, 120, 92, 0.35) !important;
}

/* 13k. Claude 模型选择药丸与工具胶囊 */
html[data-experience="chat"] [data-testid="model-selector-trigger"],
html[data-gemini-experience="chat"] [data-testid="model-selector-trigger"] {
  background: #EBE5DA !important;
  border: 1px solid #D6D0C7 !important;
  color: #1F1E1D !important;
  border-radius: 9999px !important;
  padding: 4px 12px !important;
  box-shadow: none !important;
  font-size: 13px !important;
  font-weight: 500 !important;
  transform: none !important;
}

html[data-experience="chat"] [data-testid="model-selector-trigger"]:hover,
html[data-gemini-experience="chat"] [data-testid="model-selector-trigger"]:hover {
  background: #E0D8CB !important;
  color: #1F1E1D !important;
  border-color: #CC785C !important;
  transform: none !important;
}

/* 在 Chat 独立对话模式中隐藏与独立聊天无关的项目选择器 */
html[data-experience="chat"] [data-testid="project-selector-trigger"],
html[data-gemini-experience="chat"] [data-testid="project-selector-trigger"] {
  display: none !important;
}

/* 13l. Claude 链接色与选中高亮 */
html[data-experience="chat"] a,
html[data-gemini-experience="chat"] a {
  color: #CC785C !important;
}

html[data-experience="chat"] ::selection,
html[data-gemini-experience="chat"] ::selection {
  background: rgba(204, 120, 92, 0.22) !important;
  color: #1F1E1D !important;
}

/* 13m. Claude 滚动条 */
html[data-experience="chat"] ::-webkit-scrollbar-thumb,
html[data-gemini-experience="chat"] ::-webkit-scrollbar-thumb {
  background: #D6D0C7 !important;
  border-radius: 9999px !important;
}

html[data-experience="chat"] ::-webkit-scrollbar-thumb:hover,
html[data-gemini-experience="chat"] ::-webkit-scrollbar-thumb:hover {
  background: #B0A99F !important;
}
`;

/**
 * Writes compiled theme CSS to local repository and optional BetterGravity directory.
 *
 * @param {string} cssContent The compiled theme stylesheet.
 * @returns {void}
 */
function exportTheme(cssContent) {
  // 1. Write to local repository themes directory
  const localTarget = path.join(__dirname, 'theme.css');
  fs.writeFileSync(localTarget, cssContent, 'utf8');
  console.log(`[Success] Compiled theme saved locally: ${localTarget} (${Buffer.byteLength(cssContent)} bytes)`);

  // 2. Optional: Write to user's BetterGravity roaming theme path if present
  const appData = process.env.APPDATA || (process.platform === 'win32' ? path.join(process.env.USERPROFILE, 'AppData', 'Roaming') : null);
  if (appData) {
    const bgThemeDir = path.join(appData, 'BetterGravity', 'themes');
    if (fs.existsSync(bgThemeDir)) {
      // Standalone theme file
      const singleThemeFile = path.join(bgThemeDir, 'doraemon.theme.css');
      fs.writeFileSync(singleThemeFile, cssContent, 'utf8');
      console.log(`[Deployed] Updated BetterGravity single theme file: ${singleThemeFile}`);

      // Modular theme package
      const themePkgDir = path.join(bgThemeDir, 'doraemon-dream');
      if (!fs.existsSync(themePkgDir)) {
        fs.mkdirSync(themePkgDir, { recursive: true });
      }
      fs.writeFileSync(path.join(themePkgDir, 'theme.css'), cssContent, 'utf8');
      console.log(`[Deployed] Updated BetterGravity theme package: ${path.join(themePkgDir, 'theme.css')}`);
    }
  }
}

exportTheme(css);
