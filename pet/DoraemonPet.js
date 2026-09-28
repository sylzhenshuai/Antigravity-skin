/**
 * Doraemon 3D Desktop Pet Component & Animation State Machine
 * 哆啦A梦 3D 桌宠引擎 - 空间透视拟态、光标动态 3D 倾角与 Antigravity Agent 事件流接驳
 * 
 * @author Antigravity UI/UX Studio
 * @version 3.0.0
 */

class DoraemonPetController {
  constructor(options = {}) {
    this.container = options.container || document.body;
    this.spritesheetUrl = options.spritesheetUrl || './spritesheet.webp';
    this.scale = options.scale || 0.65; // 默认缩放尺寸
    this.currentState = 'idle';
    this.currentFrame = 0;
    this.frameTimer = null;
    this.isDragging = false;
    this.dragOffset = { x: 0, y: 0 };
    this.position = { x: options.initialX || window.innerWidth - 180, y: options.initialY || window.innerHeight - 210 };

    // 状态机配置 (Codex V2 标准)
    this.states = {
      idle: {
        row: 0,
        frameCount: 6,
        durations: [280, 110, 110, 140, 140, 320],
        loop: true,
        nextState: null
      },
      thinking: {
        row: 8,
        frameCount: 6,
        durations: [140, 140, 140, 140, 140, 260],
        loop: true,
        nextState: null,
        className: 'dora-state-thinking'
      },
      running: {
        row: 7,
        frameCount: 6,
        durations: [120, 120, 120, 120, 120, 220],
        loop: true,
        nextState: null,
        className: 'dora-state-running'
      },
      success: {
        row: 4,
        frameCount: 5,
        durations: [140, 140, 140, 140, 280],
        loop: false,
        nextState: 'idle',
        className: 'dora-state-success'
      },
      error: {
        row: 5,
        frameCount: 8,
        durations: [130, 130, 130, 130, 130, 130, 130, 240],
        loop: false,
        nextState: 'idle',
        className: 'dora-state-error'
      },
      click_interaction: {
        row: 3,
        frameCount: 4,
        durations: [140, 140, 140, 280],
        loop: false,
        nextState: 'idle',
        className: 'dora-state-click'
      }
    };

    // 精灵图切片规范 (Codex V2 规范: 1536x2288, 8列x11行, 192x208单帧)
    this.spriteConfig = {
      frameWidth: 192,
      frameHeight: 208,
      columns: 8,
      rows: 11
    };

    this.initDOM();
    this.bindEvents();
    this.transitionTo('idle');
  }

  initDOM() {
    this.el = document.createElement('div');
    this.el.className = 'bettergravity-doraemon-pet';
    this.el.style.left = `${this.position.x}px`;
    this.el.style.top = `${this.position.y}px`;

    // 3D 地表柔和软阴影
    this.groundShadow = document.createElement('div');
    this.groundShadow.className = 'dora-ground-shadow';
    this.groundShadow.style.width = `${76 * this.scale * 1.5}px`;
    this.groundShadow.style.height = `${26 * this.scale * 1.5}px`;

    // 3D 核心精灵画框
    this.spriteBox = document.createElement('div');
    this.spriteBox.className = 'dora-sprite-canvas';
    this.spriteBox.style.width = `${this.spriteConfig.frameWidth * this.scale}px`;
    this.spriteBox.style.height = `${this.spriteConfig.frameHeight * this.scale}px`;
    this.spriteBox.style.backgroundImage = `url("${this.spritesheetUrl}")`;
    this.spriteBox.style.backgroundSize = `${1536 * this.scale}px ${2288 * this.scale}px`;

    // 动态道具与粒子特效挂载层
    this.fxLayer = document.createElement('div');
    this.fxLayer.className = 'dora-fx-layer';

    // 状态提示微气泡
    this.statusBadge = document.createElement('div');
    this.statusBadge.className = 'dora-status-badge';
    this.statusBadge.style.display = 'none';

    this.el.appendChild(this.groundShadow);
    this.el.appendChild(this.fxLayer);
    this.el.appendChild(this.spriteBox);
    this.el.appendChild(this.statusBadge);
    this.container.appendChild(this.el);
  }

  bindEvents() {
    // 1. 拖拽逻辑 (Drag & Drop)
    this.el.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.hasMoved = false;
      this.dragOffset.x = e.clientX - this.el.offsetLeft;
      this.dragOffset.y = e.clientY - this.el.offsetTop;
      this.el.classList.add('dora-dragging');
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      this.hasMoved = true;
      let newX = Math.max(0, Math.min(window.innerWidth - (this.spriteConfig.frameWidth * this.scale), e.clientX - this.dragOffset.x));
      let newY = Math.max(0, Math.min(window.innerHeight - (this.spriteConfig.frameHeight * this.scale), e.clientY - this.dragOffset.y));
      this.position.x = newX;
      this.position.y = newY;
      this.el.style.left = `${newX}px`;
      this.el.style.top = `${newY}px`;
    });

    window.addEventListener('mouseup', () => {
      if (this.isDragging) {
        this.isDragging = false;
        this.el.classList.remove('dora-dragging');
      }
    });

    // 2. 点击 3D Q弹反馈与微交互
    this.el.addEventListener('click', () => {
      if (this.hasMoved) return;
      this.triggerClickInteraction();
    });

    // 3. 动态 3D 倾角视差与 16 方向眼神追踪
    window.addEventListener('mousemove', (e) => {
      if (this.isDragging) return;
      this.update3DTiltAndLook(e.clientX, e.clientY);
    });
  }

  /** 状态切换 */
  transitionTo(stateName) {
    if (!this.states[stateName]) return;
    this.currentState = stateName;
    this.currentFrame = 0;
    
    // 清除上一个状态的类
    Object.values(this.states).forEach(st => {
      if (st.className) this.el.classList.remove(st.className);
    });
    if (this.states[stateName].className) {
      this.el.classList.add(this.states[stateName].className);
    }

    // 重置 3D 姿态
    if (stateName !== 'idle') {
      this.spriteBox.style.transform = '';
    }

    this.updateStatusBadge(stateName);
    this.tickFrame();
  }

  /** 状态帧步进 */
  tickFrame() {
    clearTimeout(this.frameTimer);
    const state = this.states[this.currentState];
    if (!state) return;

    // 计算当前精灵图偏移坐标
    const col = this.currentFrame;
    const row = state.row;
    const posX = -(col * this.spriteConfig.frameWidth * this.scale);
    const posY = -(row * this.spriteConfig.frameHeight * this.scale);
    this.spriteBox.style.backgroundPosition = `${posX}px ${posY}px`;

    // 触发单帧特定的道具动效
    this.handleFrameVFX(this.currentState, this.currentFrame);

    // 计算当前帧停留时间
    const duration = Array.isArray(state.durations) 
      ? (state.durations[this.currentFrame] || 140) 
      : 140;

    this.frameTimer = setTimeout(() => {
      this.currentFrame++;
      if (this.currentFrame >= state.frameCount) {
        if (state.loop) {
          this.currentFrame = 0;
          this.tickFrame();
        } else {
          this.transitionTo(state.nextState || 'idle');
        }
      } else {
        this.tickFrame();
      }
    }, duration);
  }

  /** 3D 空间倾角与 16 方向视线动态追踪 */
  update3DTiltAndLook(targetX, targetY) {
    const rect = this.el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = targetX - centerX;
    const dy = targetY - centerY;
    const dist = Math.hypot(dx, dy);

    // 1. 动态 3D 倾角视差 (Dynamic 3D Tilt)
    if (this.currentState === 'idle') {
      const normX = Math.max(-1, Math.min(1, dx / (window.innerWidth * 0.4)));
      const normY = Math.max(-1, Math.min(1, dy / (window.innerHeight * 0.4)));
      const tiltX = -normY * 12; // 上下倾角
      const tiltY = normX * 15;  // 左右旋转角
      this.spriteBox.style.transform = `perspective(700px) rotateX(${tiltX.toFixed(1)}deg) rotateY(${tiltY.toFixed(1)}deg)`;
    }

    // 2. 16 方向眼神追踪 (在待机时跟随鼠标)
    if (this.currentState !== 'idle') return;
    if (dist < 70) return; // 盲区保持正面

    let deg = (Math.atan2(dy, dx) * 180 / Math.PI) + 90;
    if (deg < 0) deg += 360;

    const sector = Math.round(deg / 22.5) % 16;
    const isRowB = sector >= 8;
    const row = isRowB ? 10 : 9;
    const col = isRowB ? (sector - 8) : sector;

    const posX = -(col * this.spriteConfig.frameWidth * this.scale);
    const posY = -(row * this.spriteConfig.frameHeight * this.scale);
    this.spriteBox.style.backgroundPosition = `${posX}px ${posY}px`;
  }

  /** 点击微交互：3D Q弹反馈与欢快动作 */
  triggerClickInteraction() {
    this.spriteBox.classList.add('dora-click-bounce');
    setTimeout(() => this.spriteBox.classList.remove('dora-click-bounce'), 450);
    this.spawnParticle('heart');
    this.transitionTo('click_interaction');
  }

  /** 外部 Agent 状态事件接驳 */
  setAgentState(agentState) {
    switch (agentState) {
      case 'thinking':
        this.transitionTo('thinking');
        break;
      case 'tool_call':
      case 'running':
      case 'executing':
        this.transitionTo('running');
        break;
      case 'success':
      case 'done':
        this.transitionTo('success');
        break;
      case 'error':
      case 'aborted':
        this.transitionTo('error');
        break;
      case 'idle':
      default:
        this.transitionTo('idle');
        break;
    }
  }

  /** 动效与粒子反馈 */
  handleFrameVFX(state, frame) {
    if (state === 'running' && frame === 2) {
      this.spawnParticle('sparkle');
    }
    if (state === 'success' && frame === 2) {
      this.spawnParticle('dorayaki');
    }
  }

  /** 拟态气泡提示 */
  updateStatusBadge(state) {
    const labels = {
      thinking: '💭 思考中 · 竹蜻蜓悬浮',
      running: '⚡ 掏百宝袋 · 空间共鸣',
      success: '🎉 任务完成 · 铜锣烧奖励',
      error: '😵 异常报错 · 晕乎乎',
      click_interaction: '💖 很高兴见到你~'
    };
    if (labels[state]) {
      this.statusBadge.textContent = labels[state];
      this.statusBadge.style.display = 'block';
    } else {
      this.statusBadge.style.display = 'none';
    }
  }

  /** 粒子特效生成 */
  spawnParticle(type) {
    const p = document.createElement('div');
    p.className = `dora-particle dora-particle-${type}`;
    if (type === 'heart') p.textContent = '💖';
    if (type === 'dorayaki') p.textContent = '🥞';
    if (type === 'sparkle') p.textContent = '✨';

    p.style.left = `${(this.spriteConfig.frameWidth * this.scale) / 2}px`;
    p.style.top = '10px';
    this.fxLayer.appendChild(p);

    setTimeout(() => p.remove(), 1200);
  }

  destroy() {
    clearTimeout(this.frameTimer);
    this.el.remove();
  }
}

// 导出或注册到全局
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DoraemonPetController;
}
if (typeof window !== 'undefined') {
  window.DoraemonPetController = DoraemonPetController;
}
