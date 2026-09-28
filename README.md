# Antigravity Skin & Themes Suite

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Python: 3.9+](https://img.shields.io/badge/Python-3.9%2B-brightgreen.svg)](pyproject.toml)
[![Node: 18+](https://img.shields.io/badge/Node.js-18%2B-green.svg)](package.json)
[![Code Style: Google](https://img.shields.io/badge/Code%20Style-Google-orange.svg)](https://google.github.io/styleguide/pyguide.html)

专为 **Google Antigravity** 与 **BetterGravity** 打造的成品桌面美化套件。集合了**梦幻星海主题（Dream Starlight Theme）**、**Chat / Work 双模态独立切换插件**、**哆啦A梦 3D 拟态桌面宠物**以及**2K 图像超分辨率与高调光影调优管线**。

---

## 🌟 核心特性

1. **梦幻星海高调浅色主题（Dream Starlight Theme）**
   - **2K 超清内嵌壁纸**：经 Lanczos 超分辨率与非线性伽马曲线提亮，消除暗部沉重感，保留星海纯净通透感。
   - **晶莹拟态毛玻璃**：精细调校的 `backdrop-filter` 滤镜与多层高光渐变遮罩，既保证文字高对比度可读性，又完美透出背景角色。
   - **雅致墨韵字体**：融合华文行楷与 Times New Roman 墨韵排版，标题与正文舒展清秀。
2. **Chat / Work 双模态独立隔离切换插件（Chat Work Switcher）**
   - **严格作用域隔离（CSS Scoping）**：通过 `html[data-experience="chat"]` 与 `html:not([data-experience="chat"])` 将两种模式彻底解耦。
   - **Work 模式**：560px 宽度限制与左对齐，留出右侧展示高清立绘与工作台小组件。
   - **Chat 模式**：1:1 复刻 Claude 极简沉浸式对话体验（768px 居中等宽输入流、暖象牙白纯净背景、极简侧栏）。
3. **哆啦A梦 3D 拟态桌面宠物（Doraemon Desktop Pet）**
   - 遵循 Codex V2 规范的 8×11 状态机精灵图（1536×2288 px），支持平滑呼吸、眨眼、跑步、欢呼、思考与方向注视状态。
   - 包含纯前端动画控制器 `DoraemonPet.js` 与自动化图集构建脚本 `generate_atlas.py`。
4. **图像处理与运维工具流**
   - 包含超分辨率、局部去水印补全、高调自适应调光（`wallpaper_processor.py`）。
   - 提供一键部署至 BetterGravity 运行环境的自动化脚本（`deploy.py`）。

---

## 📂 项目架构

```text
Antigravity-skin/
├── .gitignore                      # 排除敏感配置、环境变量(.env*)、开发缓存与测试截屏
├── LICENSE                         # MIT 开源许可证
├── README.md                       # 项目完整中文/技术说明文档
├── pyproject.toml                  # 现代标准 Python 构建配置 (PEP 517/518/621)
├── requirements.txt                # 传统 pip 环境依赖清单
├── package.json                    # Node.js 构建脚本与元数据
├── assets/                         # 核心高保真图像资源
│   ├── dream-celestial-light-2k.jpg# 2K 梦幻星海成品壁纸
│   ├── doraemon_standee.png        # 桌面宠物立绘素材
│   └── doraemon_3d_clean.png       # 3D 渲染原图素材
├── themes/                         # 桌面主题模块
│   └── dream-starlight/
│       ├── theme.css               # 编译后的单文件成品样式表 (内嵌 Base64 2K 壁纸)
│       └── build_theme.js          # 主题编译与 Base64 注入构建脚本 (Google 风格注释)
├── plugins/                        # BetterGravity 运行时插件
│   ├── chat-work-switcher/         # Chat / Work 双模态独立路由与样式切换插件
│   │   ├── index.js
│   │   ├── switcher.css
│   │   └── plugin.json
│   └── mode-switcher/              # 顶栏原生模式切换插件
│       ├── index.js
│       ├── switcher.css
│       └── plugin.json
├── pet/                            # 桌面宠物动画与引擎
│   ├── DoraemonPet.js              # 状态机动画控制器
│   ├── doraemon-pet.css            # 悬浮与拟态阴影样式
│   ├── pet.json                    # 宠物清单元数据
│   ├── state-machine.json          # 状态机动作定义
│   ├── spritesheet.webp            # 编译后的图集
│   └── generate_atlas.py           # 自动化图集生成工具 (Google 风格注释)
└── tools/                          # 运维与图像处理工程化工具 (全部遵循 Google Python 规范)
    ├── __init__.py
    ├── wallpaper_processor.py      # 壁纸超分辨率、去水印与色调提亮工具
    ├── deploy.py                   # 一键同步部署至本机 BetterGravity 目录
    └── cdp_inspector.py            # 基于 Chrome DevTools Protocol 的实时状态检测
```

---

## 🛠️ 环境准备与安装

本项目同时支持现代 Python 打包体系与传统 `requirements.txt`：

### 1. Python 环境配置（二选一）

#### 方式 A：采用现代 `pyproject.toml`（推荐）
```bash
# 以可编辑模式安装核心依赖
pip install -e .

# 如需包含 CDP 调试依赖与开发测试工具
pip install -e ".[cdp,dev]"
```

#### 方式 B：采用传统 `requirements.txt`
```bash
pip install -r requirements.txt
```

### 2. Node.js 构建环境（可选，用于重编主题）
```bash
npm install
```

---

## 🚀 快速使用指南

### 1. 一键部署到本地 BetterGravity
运行自带的部署工具，将主题、双模态切换插件与桌面宠物直接同步安装至本机 `AppData/Roaming/BetterGravity`：
```bash
python tools/deploy.py
```
若仅需更新部分组件，可添加过滤参数：
```bash
# 仅更新主题样式表
python tools/deploy.py --theme-only

# 仅更新插件
python tools/deploy.py --plugins-only

# 仅更新桌面宠物
python tools/deploy.py --pets-only
```

### 2. 重新编译生成主题
当您替换了 `assets/` 中的壁纸或修改了 CSS 规则后，执行构建脚本重新内嵌 Base64 并编译：
```bash
npm run build:theme
# 或直接运行
node themes/dream-starlight/build_theme.js
```

### 3. 壁纸光影提亮与超分辨率处理
如果您希望使用自己的动漫立绘作为壁纸，可以使用处理工具将其转化为适合玻璃拟态界面的浅色高调壁纸：
```bash
python tools/wallpaper_processor.py \
    --input your_raw_image.jpg \
    --output assets/custom_wallpaper.jpg \
    --width 2560 \
    --gamma 0.46 \
    --quality 93
```

### 4. 重新构建桌宠精灵图（Spritesheet）
```bash
python pet/generate_atlas.py
```

---

## 🔒 规范与安全承诺

1. **凭证隔离**：`.gitignore` 已全局严密配置，坚决排除 `.env`, `.env.*`, `*token*`, `*.key` 等任何环境变量或敏感凭据。
2. **代码风格规范**：所有 Python 代码函数与模块严格遵守 **Google Python Style Guide**（含 `Args`, `Returns`, `Raises`, `Example`）；JavaScript 脚本遵循标准 JSDoc 规范。
3. **跨平台兼容**：路径解析统一基于 `pathlib` 与 `os.path` 相对路径动态推导，支持 Windows / Linux / macOS。
