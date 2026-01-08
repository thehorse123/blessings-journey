// Cinematic, immersive snow effect for Blessing Journey
// Uses snowballs.png and snowflakes.png from phase-1-media/

const SNOWBALL_SRC = 'phase-1-media/snowballs.webp';
const SNOWFLAKE_SRC = 'site-asse-voices/snowflakes.webp';
const SNOW_DENSITY = 8; // 15% less dense snow (was 9, reduced by 15%)
const SNOW_LAYERS = [
  { selector: 'body', zIndex: 1 }, // Above background, below interactive elements
  { selector: '.wheel-section-bg, .blessing-banner, .card, #pwyw, #addSB', zIndex: 0 } // background snow
];

class SnowParticle {
  constructor(type, width, height) {
    // Only allow snowballs
    this.type = 'ball';
    this.img = new Image();
    this.img.src = SNOWBALL_SRC;
    // Snowballs: reduce size for less overpowering look
  // Reduce max size of big snowballs
  this.size = Math.random() * 6 + 6; // px (smaller max size)
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.speed = Math.random() * 1.2 + 0.6; // px/frame
  // Give each snowball a unique sway amplitude and oscillation phase for natural movement
  this.swayAmplitude = Math.random() * 1.2 + 0.3; // px, always positive
  this.swaySpeed = Math.random() * 0.7 + 0.3; // radians per second
  this.swayPhase = Math.random() * Math.PI * 2; // unique phase offset
    this.opacity = Math.random() * 0.5 + 0.5;
    this.depth = Math.random(); // 0 = far, 1 = close
    this.twinkle = Math.random() < 0.12; // 12% twinkle
    this.twinklePhase = Math.random() * Math.PI * 2;
  }
  update(width, height) {
    this.y += this.speed * (0.7 + this.depth * 0.6);
    // More natural sway: each snowball has its own oscillation
    const t = Date.now() / 1000;
    this.x += Math.sin(t * this.swaySpeed + this.swayPhase) * this.swayAmplitude;
    if (this.y > height + 24) {
      this.y = -24;
      this.x = Math.random() * width;
      // Reset sway for new snowball
      this.swayAmplitude = Math.random() * 1.2 + 0.3;
      this.swaySpeed = Math.random() * 0.7 + 0.3;
      this.swayPhase = Math.random() * Math.PI * 2;
    }
    if (this.x < -24) this.x = width + 24;
    if (this.x > width + 24) this.x = -24;
    if (this.twinkle) {
      this.opacity = 0.5 + 0.5 * Math.abs(Math.sin(Date.now() / 400 + this.twinklePhase));
    }
  }
  draw(ctx) {
    ctx.globalAlpha = this.opacity * (0.7 + this.depth * 0.7);
    ctx.drawImage(this.img, this.x, this.y, this.size * (0.7 + this.depth * 0.7), this.size * (0.7 + this.depth * 0.7));
    ctx.globalAlpha = 1;
  }
}

function createSnowCanvas(zIndex) {
  const canvas = document.createElement('canvas');
  canvas.className = 'snow-canvas';
  canvas.style.position = 'fixed';
  canvas.style.left = '0';
  canvas.style.top = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = zIndex;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  return canvas;
}


function randomStarProps(width, height) {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 9 + 8, // half the previous size
    glow: Math.random() * 0.6 + 0.7,
    duration: Math.random() * 800 + 700, // ms
    appearTime: Date.now(),
  };
}

function drawStar(ctx, x, y, size, glow, opacity) {
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    ctx.lineTo(
      x + size * Math.cos((18 + i * 72) * Math.PI / 180),
      y - size * Math.sin((18 + i * 72) * Math.PI / 180)
    );
    ctx.lineTo(
      x + (size / 2.2) * Math.cos((54 + i * 72) * Math.PI / 180),
      y - (size / 2.2) * Math.sin((54 + i * 72) * Math.PI / 180)
    );
  }
  ctx.closePath();
  // Detect if Phase 2 is active for green stars
  let isPhase2 = false;
  const p2 = document.getElementById('p2');
  if (p2 && p2.classList.contains('active')) {
    isPhase2 = true;
  }
  let grad = ctx.createRadialGradient(x, y, size * 0.2, x, y, size);
  if (isPhase2) {
    grad.addColorStop(0, 'rgba(255,255,255,1)'); // bright white center
    grad.addColorStop(0.5, 'rgba(255,255,255,0.9)'); // white glow
    grad.addColorStop(1, 'rgba(255,255,255,0.7)'); // white edge
    ctx.shadowColor = '#fff';
  } else {
    grad.addColorStop(0, 'rgba(255,255,230,1)'); // soft white
    grad.addColorStop(0.5, 'rgba(230,230,255,0.8)'); // pale blue-white glow
    grad.addColorStop(1, 'rgba(255,255,255,0.7)'); // white edge
    ctx.shadowColor = '#e0e0ff';
  }
  ctx.shadowBlur = size * glow;
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.restore();
}


function randomShootingStar(width, height) {
  // Shooting star starts off-screen, moves diagonally
  const startX = Math.random() < 0.5 ? -80 : width + 80;
  const endX = startX < 0 ? width + 80 : -80;
  const startY = Math.random() * (height * 0.5);
  const endY = startY + Math.random() * (height * 0.4) + 80;
  return {
    x: startX,
    y: startY,
    endX,
    endY,
    progress: 0,
    speed: Math.random() * 0.012 + 0.008, // px/ms
    length: Math.random() * 80 + 60,
    width: Math.random() * 2.5 + 1.5,
    color: 'rgba(255,255,180,0.85)',
    glow: Math.random() * 18 + 12,
    born: Date.now(),
    duration: Math.random() * 600 + 700 // ms
  };
}

function drawShootingStar(ctx, star) {
  const t = star.progress;
  const x = star.x + (star.endX - star.x) * t;
  const y = star.y + (star.endY - star.y) * t;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x - star.length * t, y - star.length * t * 0.5);
  ctx.strokeStyle = star.color;
  ctx.lineWidth = star.width;
  ctx.shadowColor = '#fffbe6';
  ctx.shadowBlur = star.glow;
  ctx.globalAlpha = 0.7 * (1 - t);
  ctx.stroke();
  ctx.restore();
}


function startSnow() {
  // Only show snow in Phase 1 and Phase 3
  var p1 = document.getElementById('p1');
  var p3 = document.getElementById('p3');
  var showSnow = (p1 && p1.classList.contains('active')) || (p3 && p3.classList.contains('active'));
  // Remove all snow canvases if present
  var canvases = document.querySelectorAll('.snow-canvas');
  if (!showSnow) {
    canvases.forEach(function(canvas) {
      canvas.parentNode.removeChild(canvas);
    });
    return;
  }
  // If snow already exists, don't add more
  if (canvases.length > 0) return;
  SNOW_LAYERS.forEach(layer => {
    const canvas = createSnowCanvas(layer.zIndex);
    let particles = [];
    for (let i = 0; i < SNOW_DENSITY; i++) {
      const type = i % 2 === 0 ? 'ball' : 'flake';
      particles.push(new SnowParticle(type, canvas.width, canvas.height));
    }
    function animate() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update(canvas.width, canvas.height);
        p.draw(ctx);
      });
      requestAnimationFrame(animate);
    }
    animate();
  });
}

// Brand Snowball Overlay - Snowballs falling over the .brand div
function createBrandSnowballOverlay() {
  function updateBrandSnow() {
    var p1 = document.getElementById('p1');
    var p3 = document.getElementById('p3');
    var showSnow = (p1 && p1.classList.contains('active')) || (p3 && p3.classList.contains('active'));
    // Remove all brand snowball canvases if present
    var canvases = document.querySelectorAll('.brand-snowball-canvas');
    if (!showSnow) {
      canvases.forEach(function(canvas) {
        canvas.parentNode.removeChild(canvas);
      });
      return;
    }
    // If already exists, don't add more
    if (canvases.length > 0) return;
    const brandEl = document.querySelector('.brand');
    if (!brandEl) return;
    // Create a dedicated canvas for brand snowballs
    const canvas = document.createElement('canvas');
    canvas.className = 'brand-snowball-canvas';
    canvas.style.position = 'fixed';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '35'; // Above header content
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    class BrandSnowball {
      constructor(width, height) {
        this.img = new Image();
        this.img.src = SNOWBALL_SRC;
        this.size = Math.random() * 4 + 3; // Smaller snowballs for header
        this.x = Math.random() * width;
        this.y = -20; // Start from top
        this.speed = Math.random() * 1.5 + 0.8; // px/frame
        this.swayAmplitude = Math.random() * 1.5 + 0.4;
        this.swaySpeed = Math.random() * 0.8 + 0.4;
        this.swayPhase = Math.random() * Math.PI * 2;
        this.opacity = Math.random() * 0.6 + 0.4;
        this.depth = Math.random();
      }
      update(width, height) {
        this.y += this.speed * (0.7 + this.depth * 0.6);
        const t = Date.now() / 1000;
        this.x += Math.sin(t * this.swaySpeed + this.swayPhase) * this.swayAmplitude;
        if (this.x < -24) this.x = width + 24;
        if (this.x > width + 24) this.x = -24;
        return this.y > height + 24;
      }
      draw(ctx) {
        ctx.globalAlpha = this.opacity * (0.6 + this.depth * 0.6);
        ctx.drawImage(
          this.img, 
          this.x, 
          this.y, 
          this.size * (0.6 + this.depth * 0.6), 
          this.size * (0.6 + this.depth * 0.6)
        );
        ctx.globalAlpha = 1;
      }
    }
    let snowballs = [];
    for (let i = 0; i < 12; i++) {
      snowballs.push(new BrandSnowball(canvas.width, canvas.height));
    }
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = snowballs.length - 1; i >= 0; i--) {
        if (snowballs[i].update(canvas.width, canvas.height)) {
          snowballs[i] = new BrandSnowball(canvas.width, canvas.height);
        }
        snowballs[i].draw(ctx);
      }
      requestAnimationFrame(animate);
    }
    animate();
    window.addEventListener('resize', function() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }
  document.addEventListener('DOMContentLoaded', updateBrandSnow);
  // Listen for phase changes and re-run brand snow logic
  document.querySelectorAll('.screen').forEach(function(el) {
    var obs = new MutationObserver(function() {
      updateBrandSnow();
    });
    obs.observe(el, { attributes: true });
  });
}

createBrandSnowballOverlay();

window.addEventListener('DOMContentLoaded', startSnow);

// Listen for phase changes and re-run snow logic
document.querySelectorAll('.screen').forEach(function(el) {
  var obs = new MutationObserver(function() {
    startSnow();
  });
  obs.observe(el, { attributes: true });
});
