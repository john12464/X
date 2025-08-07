// Cubes Animation Component
class Cubes {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      gridSize: 10,
      cubeSize: null,
      maxAngle: 45,
      radius: 3,
      easing: "power3.out",
      duration: { enter: 0.3, leave: 0.6 },
      cellGap: null,
      borderStyle: "1px solid #fff",
      faceColor: "#060010",
      shadow: false,
      autoAnimate: true,
      rippleOnClick: true,
      rippleColor: "#fff",
      rippleSpeed: 2,
      ...options
    };

    // State management
    this.rafRef = null;
    this.idleTimerRef = null;
    this.userActiveRef = false;
    this.simPosRef = { x: 0, y: 0 };
    this.simTargetRef = { x: 0, y: 0 };
    this.simRAFRef = null;

    this.init();
  }

  init() {
    this.createScene();
    this.bindEvents();
    if (this.options.autoAnimate) {
      this.startAutoAnimation();
    }
  }

  createScene() {
    const { gridSize, cubeSize, cellGap, borderStyle, faceColor, shadow } = this.options;

    // Calculate gaps
    const colGap = typeof cellGap === "number" 
      ? `${cellGap}px` 
      : cellGap?.col !== undefined 
        ? `${cellGap.col}px` 
        : "5%";
    
    const rowGap = typeof cellGap === "number" 
      ? `${cellGap}px` 
      : cellGap?.row !== undefined 
        ? `${cellGap.row}px` 
        : "5%";

    // Create wrapper
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'default-animation desktop-only';
    
    // Create scene
    this.scene = document.createElement('div');
    this.scene.className = 'default-animation--scene';
    
    // Set styles
    const wrapperStyle = {
      '--cube-face-border': borderStyle,
      '--cube-face-bg': faceColor,
      '--cube-face-shadow': shadow === true ? '0 0 6px rgba(0,0,0,.5)' : shadow || 'none'
    };

    if (cubeSize) {
      wrapperStyle.width = `${gridSize * cubeSize}px`;
      wrapperStyle.height = `${gridSize * cubeSize}px`;
    }

    Object.assign(this.wrapper.style, wrapperStyle);

    const sceneStyle = {
      gridTemplateColumns: cubeSize 
        ? `repeat(${gridSize}, ${cubeSize}px)` 
        : `repeat(${gridSize}, 1fr)`,
      gridTemplateRows: cubeSize 
        ? `repeat(${gridSize}, ${cubeSize}px)` 
        : `repeat(${gridSize}, 1fr)`,
      columnGap: colGap,
      rowGap: rowGap
    };

    Object.assign(this.scene.style, sceneStyle);

    // Create cubes
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        const cube = document.createElement('div');
        cube.className = 'cube';
        cube.dataset.row = r;
        cube.dataset.col = c;

        // Create faces
        const faces = ['top', 'bottom', 'left', 'right', 'front', 'back'];
        faces.forEach(face => {
          const faceEl = document.createElement('div');
          faceEl.className = `cube-face cube-face--${face}`;
          cube.appendChild(faceEl);
        });

        this.scene.appendChild(cube);
      }
    }

    this.wrapper.appendChild(this.scene);
    this.container.appendChild(this.wrapper);
  }

  tiltAt(rowCenter, colCenter) {
    const { radius, maxAngle, duration, easing } = this.options;
    const enterDur = duration.enter;
    const leaveDur = duration.leave;

    this.scene.querySelectorAll('.cube').forEach(cube => {
      const r = +cube.dataset.row;
      const c = +cube.dataset.col;
      const dist = Math.hypot(r - rowCenter, c - colCenter);
      
      if (dist <= radius) {
        const pct = 1 - dist / radius;
        const angle = pct * maxAngle;
        gsap.to(cube, {
          duration: enterDur,
          ease: easing,
          overwrite: true,
          rotateX: -angle,
          rotateY: angle,
        });
      } else {
        gsap.to(cube, {
          duration: leaveDur,
          ease: "power3.out",
          overwrite: true,
          rotateX: 0,
          rotateY: 0,
        });
      }
    });
  }

  onPointerMove = (e) => {
    this.userActiveRef = true;
    if (this.idleTimerRef) clearTimeout(this.idleTimerRef);

    const rect = this.scene.getBoundingClientRect();
    const cellW = rect.width / this.options.gridSize;
    const cellH = rect.height / this.options.gridSize;
    const colCenter = (e.clientX - rect.left) / cellW;
    const rowCenter = (e.clientY - rect.top) / cellH;

    if (this.rafRef) cancelAnimationFrame(this.rafRef);
    this.rafRef = requestAnimationFrame(() =>
      this.tiltAt(rowCenter, colCenter)
    );

    this.idleTimerRef = setTimeout(() => {
      this.userActiveRef = false;
    }, 3000);
  }

  resetAll = () => {
    this.scene.querySelectorAll('.cube').forEach(cube =>
      gsap.to(cube, {
        duration: this.options.duration.leave,
        rotateX: 0,
        rotateY: 0,
        ease: "power3.out",
      })
    );
  }

  onClick = (e) => {
    if (!this.options.rippleOnClick) return;
    
    const rect = this.scene.getBoundingClientRect();
    const cellW = rect.width / this.options.gridSize;
    const cellH = rect.height / this.options.gridSize;
    const colHit = Math.floor((e.clientX - rect.left) / cellW);
    const rowHit = Math.floor((e.clientY - rect.top) / cellH);

    const baseRingDelay = 0.15;
    const baseAnimDur = 0.3;
    const baseHold = 0.6;

    const spreadDelay = baseRingDelay / this.options.rippleSpeed;
    const animDuration = baseAnimDur / this.options.rippleSpeed;
    const holdTime = baseHold / this.options.rippleSpeed;

    const rings = {};
    this.scene.querySelectorAll('.cube').forEach(cube => {
      const r = +cube.dataset.row;
      const c = +cube.dataset.col;
      const dist = Math.hypot(r - rowHit, c - colHit);
      const ring = Math.round(dist);
      if (!rings[ring]) rings[ring] = [];
      rings[ring].push(cube);
    });

    Object.keys(rings)
      .map(Number)
      .sort((a, b) => a - b)
      .forEach(ring => {
        const delay = ring * spreadDelay;
        const faces = rings[ring].flatMap(cube =>
          Array.from(cube.querySelectorAll('.cube-face'))
        );

        gsap.to(faces, {
          backgroundColor: this.options.rippleColor,
          duration: animDuration,
          delay,
          ease: "power3.out",
        });
        gsap.to(faces, {
          backgroundColor: this.options.faceColor,
          duration: animDuration,
          delay: delay + animDuration + holdTime,
          ease: "power3.out",
        });
      });
  }

  startAutoAnimation() {
    this.simPosRef = {
      x: Math.random() * this.options.gridSize,
      y: Math.random() * this.options.gridSize,
    };
    this.simTargetRef = {
      x: Math.random() * this.options.gridSize,
      y: Math.random() * this.options.gridSize,
    };
    
    const speed = 0.02;
    const loop = () => {
      if (!this.userActiveRef) {
        const pos = this.simPosRef;
        const tgt = this.simTargetRef;
        pos.x += (tgt.x - pos.x) * speed;
        pos.y += (tgt.y - pos.y) * speed;
        this.tiltAt(pos.y, pos.x);
        if (Math.hypot(pos.x - tgt.x, pos.y - tgt.y) < 0.1) {
          this.simTargetRef = {
            x: Math.random() * this.options.gridSize,
            y: Math.random() * this.options.gridSize,
          };
        }
      }
      this.simRAFRef = requestAnimationFrame(loop);
    };
    this.simRAFRef = requestAnimationFrame(loop);
  }

  bindEvents() {
    this.scene.addEventListener('pointermove', this.onPointerMove);
    this.scene.addEventListener('pointerleave', this.resetAll);
    this.scene.addEventListener('click', this.onClick);
  }

  destroy() {
    // Clean up event listeners
    this.scene.removeEventListener('pointermove', this.onPointerMove);
    this.scene.removeEventListener('pointerleave', this.resetAll);
    this.scene.removeEventListener('click', this.onClick);

    // Clean up animations
    if (this.rafRef) cancelAnimationFrame(this.rafRef);
    if (this.idleTimerRef) clearTimeout(this.idleTimerRef);
    if (this.simRAFRef) cancelAnimationFrame(this.simRAFRef);

    // Remove DOM elements
    if (this.wrapper && this.container.contains(this.wrapper)) {
      this.container.removeChild(this.wrapper);
    }
  }
}

// Export for use in other files
window.Cubes = Cubes;