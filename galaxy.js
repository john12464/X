// Galaxy WebGL Background Component
class Galaxy {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      focal: [0.5, 0.5],
      rotation: [1.0, 0.0],
      starSpeed: 0.5,
      density: 1,
      hueShift: 140,
      disableAnimation: false,
      speed: 1.0,
      mouseInteraction: true,
      glowIntensity: 0.3,
      saturation: 0.0,
      mouseRepulsion: true,
      repulsionStrength: 2,
      twinkleIntensity: 0.3,
      rotationSpeed: 0.1,
      autoCenterRepulsion: 0,
      transparent: true,
      ...options
    };

    this.targetMousePos = { x: 0.5, y: 0.5 };
    this.smoothMousePos = { x: 0.5, y: 0.5 };
    this.targetMouseActive = 0.0;
    this.smoothMouseActive = 0.0;

    this.vertexShader = `
      attribute vec2 uv;
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0, 1);
      }
    `;

    this.fragmentShader = `
      precision highp float;
      uniform float uTime;
      uniform vec3 uResolution;
      uniform vec2 uFocal;
      uniform vec2 uRotation;
      uniform float uStarSpeed;
      uniform float uDensity;
      uniform float uHueShift;
      uniform float uSpeed;
      uniform vec2 uMouse;
      uniform float uGlowIntensity;
      uniform float uSaturation;
      uniform bool uMouseRepulsion;
      uniform float uTwinkleIntensity;
      uniform float uRotationSpeed;
      uniform float uRepulsionStrength;
      uniform float uMouseActiveFactor;
      uniform float uAutoCenterRepulsion;
      uniform bool uTransparent;
      varying vec2 vUv;

      #define NUM_LAYER 4.0
      #define STAR_COLOR_CUTOFF 0.2
      #define MAT45 mat2(0.7071, -0.7071, 0.7071, 0.7071)
      #define PERIOD 3.0

      float Hash21(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }

      float tri(float x) {
        return abs(fract(x) * 2.0 - 1.0);
      }

      float tris(float x) {
        float t = fract(x);
        return 1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0));
      }

      float trisn(float x) {
        float t = fract(x);
        return 2.0 * (1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0))) - 1.0;
      }

      vec3 hsv2rgb(vec3 c) {
        vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
      }

      float Star(vec2 uv, float flare) {
        float d = length(uv);
        float m = (0.05 * uGlowIntensity) / d;
        float rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
        m += rays * flare * uGlowIntensity;
        uv *= MAT45;
        rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
        m += rays * 0.3 * flare * uGlowIntensity;
        m *= smoothstep(1.0, 0.2, d);
        return m;
      }

      vec3 StarLayer(vec2 uv) {
        vec3 col = vec3(0.0);
        vec2 gv = fract(uv) - 0.5; 
        vec2 id = floor(uv);

        for (int y = -1; y <= 1; y++) {
          for (int x = -1; x <= 1; x++) {
            vec2 offset = vec2(float(x), float(y));
            vec2 si = id + vec2(float(x), float(y));
            float seed = Hash21(si);
            float size = fract(seed * 345.32);
            float glossLocal = tri(uStarSpeed / (PERIOD * seed + 1.0));
            float flareSize = smoothstep(0.9, 1.0, size) * glossLocal;

            float red = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 1.0)) + STAR_COLOR_CUTOFF;
            float blu = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 3.0)) + STAR_COLOR_CUTOFF;
            float grn = min(red, blu) * seed;
            vec3 base = vec3(red, grn, blu);
            
            float hue = atan(base.g - base.r, base.b - base.r) / (2.0 * 3.14159) + 0.5;
            hue = fract(hue + uHueShift / 360.0);
            float sat = length(base - vec3(dot(base, vec3(0.299, 0.587, 0.114)))) * uSaturation;
            float val = max(max(base.r, base.g), base.b);
            base = hsv2rgb(vec3(hue, sat, val));

            vec2 pad = vec2(tris(seed * 34.0 + uTime * uSpeed / 10.0), tris(seed * 38.0 + uTime * uSpeed / 30.0)) - 0.5;

            float star = Star(gv - offset - pad, flareSize);
            vec3 color = base;

            float twinkle = trisn(uTime * uSpeed + seed * 6.2831) * 0.5 + 1.0;
            twinkle = mix(1.0, twinkle, uTwinkleIntensity);
            star *= twinkle;
            
            col += star * size * color;
          }
        }

        return col;
      }

      void main() {
        vec2 focalPx = uFocal * uResolution.xy;
        vec2 uv = (vUv * uResolution.xy - focalPx) / uResolution.y;

        vec2 mouseNorm = uMouse - vec2(0.5);
        
        if (uAutoCenterRepulsion > 0.0) {
          vec2 centerUV = vec2(0.0, 0.0);
          float centerDist = length(uv - centerUV);
          vec2 repulsion = normalize(uv - centerUV) * (uAutoCenterRepulsion / (centerDist + 0.1));
          uv += repulsion * 0.05;
        } else if (uMouseRepulsion) {
          vec2 mousePosUV = (uMouse * uResolution.xy - focalPx) / uResolution.y;
          float mouseDist = length(uv - mousePosUV);
          vec2 repulsion = normalize(uv - mousePosUV) * (uRepulsionStrength / (mouseDist + 0.1));
          uv += repulsion * 0.05 * uMouseActiveFactor;
        } else {
          vec2 mouseOffset = mouseNorm * 0.1 * uMouseActiveFactor;
          uv += mouseOffset;
        }

        float autoRotAngle = uTime * uRotationSpeed;
        mat2 autoRot = mat2(cos(autoRotAngle), -sin(autoRotAngle), sin(autoRotAngle), cos(autoRotAngle));
        uv = autoRot * uv;

        uv = mat2(uRotation.x, -uRotation.y, uRotation.y, uRotation.x) * uv;

        vec3 col = vec3(0.0);

        for (float i = 0.0; i < 1.0; i += 1.0 / NUM_LAYER) {
          float depth = fract(i + uStarSpeed * uSpeed);
          float scale = mix(20.0 * uDensity, 0.5 * uDensity, depth);
          float fade = depth * smoothstep(1.0, 0.9, depth);
          col += StarLayer(uv * scale + i * 453.32) * fade;
        }

        if (uTransparent) {
          float alpha = length(col);
          alpha = smoothstep(0.0, 0.3, alpha);
          alpha = min(alpha, 1.0);
          gl_FragColor = vec4(col, alpha);
        } else {
          gl_FragColor = vec4(col, 1.0);
        }
      }
    `;

    this.init();
  }

  init() {
    // Create canvas
    this.canvas = document.createElement('canvas');
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.zIndex = '-1';
    this.container.appendChild(this.canvas);

    // Get WebGL context
    this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
    if (!this.gl) {
      console.error('WebGL not supported');
      return;
    }

    // Setup WebGL
    this.setupWebGL();
    this.setupGeometry();
    this.setupShaders();
    this.setupUniforms();

    // Setup event listeners
    if (this.options.mouseInteraction) {
      this.container.addEventListener('mousemove', this.handleMouseMove.bind(this));
      this.container.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    }

    // Setup resize handler
    window.addEventListener('resize', this.resize.bind(this));
    this.resize();

    // Start animation
    this.animate();
  }

  setupWebGL() {
    const gl = this.gl;
    
    if (this.options.transparent) {
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.clearColor(0, 0, 0, 0);
    } else {
      gl.clearColor(0, 0, 0, 1);
    }
  }

  setupGeometry() {
    const gl = this.gl;
    
    // Create triangle vertices
    const vertices = new Float32Array([
      -1, -1, 0, 0,
      3, -1, 2, 0,
      -1, 3, 0, 2
    ]);

    this.vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  }

  setupShaders() {
    const gl = this.gl;

    // Create vertex shader
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, this.vertexShader);
    gl.compileShader(vertexShader);

    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      console.error('Vertex shader error:', gl.getShaderInfoLog(vertexShader));
      return;
    }

    // Create fragment shader
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, this.fragmentShader);
    gl.compileShader(fragmentShader);

    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      console.error('Fragment shader error:', gl.getShaderInfoLog(fragmentShader));
      return;
    }

    // Create program
    this.program = gl.createProgram();
    gl.attachShader(this.program, vertexShader);
    gl.attachShader(this.program, fragmentShader);
    gl.linkProgram(this.program);

    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(this.program));
      return;
    }

    gl.useProgram(this.program);

    // Get attribute locations
    this.positionLocation = gl.getAttribLocation(this.program, 'position');
    this.uvLocation = gl.getAttribLocation(this.program, 'uv');
  }

  setupUniforms() {
    const gl = this.gl;

    this.uniforms = {
      uTime: gl.getUniformLocation(this.program, 'uTime'),
      uResolution: gl.getUniformLocation(this.program, 'uResolution'),
      uFocal: gl.getUniformLocation(this.program, 'uFocal'),
      uRotation: gl.getUniformLocation(this.program, 'uRotation'),
      uStarSpeed: gl.getUniformLocation(this.program, 'uStarSpeed'),
      uDensity: gl.getUniformLocation(this.program, 'uDensity'),
      uHueShift: gl.getUniformLocation(this.program, 'uHueShift'),
      uSpeed: gl.getUniformLocation(this.program, 'uSpeed'),
      uMouse: gl.getUniformLocation(this.program, 'uMouse'),
      uGlowIntensity: gl.getUniformLocation(this.program, 'uGlowIntensity'),
      uSaturation: gl.getUniformLocation(this.program, 'uSaturation'),
      uMouseRepulsion: gl.getUniformLocation(this.program, 'uMouseRepulsion'),
      uTwinkleIntensity: gl.getUniformLocation(this.program, 'uTwinkleIntensity'),
      uRotationSpeed: gl.getUniformLocation(this.program, 'uRotationSpeed'),
      uRepulsionStrength: gl.getUniformLocation(this.program, 'uRepulsionStrength'),
      uMouseActiveFactor: gl.getUniformLocation(this.program, 'uMouseActiveFactor'),
      uAutoCenterRepulsion: gl.getUniformLocation(this.program, 'uAutoCenterRepulsion'),
      uTransparent: gl.getUniformLocation(this.program, 'uTransparent')
    };

    // Set initial uniform values
    gl.uniform2fv(this.uniforms.uFocal, this.options.focal);
    gl.uniform2fv(this.uniforms.uRotation, this.options.rotation);
    gl.uniform1f(this.uniforms.uStarSpeed, this.options.starSpeed);
    gl.uniform1f(this.uniforms.uDensity, this.options.density);
    gl.uniform1f(this.uniforms.uHueShift, this.options.hueShift);
    gl.uniform1f(this.uniforms.uSpeed, this.options.speed);
    gl.uniform1f(this.uniforms.uGlowIntensity, this.options.glowIntensity);
    gl.uniform1f(this.uniforms.uSaturation, this.options.saturation);
    gl.uniform1i(this.uniforms.uMouseRepulsion, this.options.mouseRepulsion);
    gl.uniform1f(this.uniforms.uTwinkleIntensity, this.options.twinkleIntensity);
    gl.uniform1f(this.uniforms.uRotationSpeed, this.options.rotationSpeed);
    gl.uniform1f(this.uniforms.uRepulsionStrength, this.options.repulsionStrength);
    gl.uniform1f(this.uniforms.uAutoCenterRepulsion, this.options.autoCenterRepulsion);
    gl.uniform1i(this.uniforms.uTransparent, this.options.transparent);
  }

  resize() {
    const gl = this.gl;
    const scale = window.devicePixelRatio || 1;
    
    this.canvas.width = this.container.offsetWidth * scale;
    this.canvas.height = this.container.offsetHeight * scale;
    
    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    
    if (this.uniforms.uResolution) {
      gl.uniform3f(this.uniforms.uResolution, 
        this.canvas.width, 
        this.canvas.height, 
        this.canvas.width / this.canvas.height
      );
    }
  }

  handleMouseMove(e) {
    const rect = this.container.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1.0 - (e.clientY - rect.top) / rect.height;
    this.targetMousePos = { x, y };
    this.targetMouseActive = 1.0;
  }

  handleMouseLeave() {
    this.targetMouseActive = 0.0;
  }

  animate() {
    const gl = this.gl;
    
    if (!this.options.disableAnimation) {
      const time = performance.now() * 0.001;
      gl.uniform1f(this.uniforms.uTime, time);
      gl.uniform1f(this.uniforms.uStarSpeed, (time * this.options.starSpeed) / 10.0);
    }

    // Smooth mouse interpolation
    const lerpFactor = 0.05;
    this.smoothMousePos.x += (this.targetMousePos.x - this.smoothMousePos.x) * lerpFactor;
    this.smoothMousePos.y += (this.targetMousePos.y - this.smoothMousePos.y) * lerpFactor;
    this.smoothMouseActive += (this.targetMouseActive - this.smoothMouseActive) * lerpFactor;

    gl.uniform2f(this.uniforms.uMouse, this.smoothMousePos.x, this.smoothMousePos.y);
    gl.uniform1f(this.uniforms.uMouseActiveFactor, this.smoothMouseActive);

    // Clear and draw
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    // Setup vertex attributes
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.enableVertexAttribArray(this.positionLocation);
    gl.enableVertexAttribArray(this.uvLocation);
    gl.vertexAttribPointer(this.positionLocation, 2, gl.FLOAT, false, 16, 0);
    gl.vertexAttribPointer(this.uvLocation, 2, gl.FLOAT, false, 16, 8);

    // Draw triangle
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.canvas && this.container.contains(this.canvas)) {
      this.container.removeChild(this.canvas);
    }
    
    if (this.options.mouseInteraction) {
      this.container.removeEventListener('mousemove', this.handleMouseMove);
      this.container.removeEventListener('mouseleave', this.handleMouseLeave);
    }
    
    window.removeEventListener('resize', this.resize);
    
    if (this.gl) {
      const ext = this.gl.getExtension('WEBGL_lose_context');
      if (ext) ext.loseContext();
    }
  }
}

// Export for use in other files
window.Galaxy = Galaxy;