// Falling Leaves Animation for Blessing Journey — Phase 5 only
// Uses leaf1.png to leaf9.png from site-asse-voices/

const LEAF_IMAGES = [
  'site-asse-voices/leaf1.webp',
  'site-asse-voices/leaf2.webp',
  'site-asse-voices/leaf3.webp',
  'site-asse-voices/leaf4.webp',
  'site-asse-voices/leaf5.webp',
  'site-asse-voices/leaf6.webp',
  'site-asse-voices/leaf7.webp',
  'site-asse-voices/leaf8.webp',
  'site-asse-voices/leaf9.webp'
];

const LEAF_COUNT = 18; // Gentle, not too dense
const LEAF_MIN_SIZE = 32;
const LEAF_MAX_SIZE = 56;
const LEAF_MIN_OPACITY = 0.8;
const LEAF_MAX_OPACITY = 1.0;
const BREEZE_INTERVAL = 9000 + Math.random() * 6000;
const BREEZE_DURATION = 2200 + Math.random() * 1200;

let leaves = [];
let leafImages = [];
let leavesCanvas = null;
let leavesCtx = null;
let phase5Active = false;
let breezeActive = false;
let breezeTimer = null;
let breezeTimeout = null;

function preloadLeafImages(callback) {
  let loaded = 0;
  for (let src of LEAF_IMAGES) {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      loaded++;
      if (loaded === LEAF_IMAGES.length) callback();
    };
    leafImages.push(img);
  }
}

function randomLeafProps() {
  const size = Math.random() * (LEAF_MAX_SIZE - LEAF_MIN_SIZE) + LEAF_MIN_SIZE;
  return {
    x: Math.random() * window.innerWidth,
    y: -size - Math.random() * 80,
    size,
    img: leafImages[Math.floor(Math.random() * leafImages.length)],
    speed: 0.7 + Math.random() * 1.2,
    sway: 18 + Math.random() * 22,
    swaySpeed: 0.7 + Math.random() * 0.7,
    swayPhase: Math.random() * Math.PI * 2,
    rot: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.012,
    opacity: Math.random() * (LEAF_MAX_OPACITY - LEAF_MIN_OPACITY) + LEAF_MIN_OPACITY,
    fade: 1,
    respawnDelay: 0,
  };
}

function spawnLeaves() {
  leaves = [];
  for (let i = 0; i < LEAF_COUNT; i++) {
    leaves.push(randomLeafProps());
  }
}

function drawLeaves() {
  leavesCtx.clearRect(0, 0, leavesCanvas.width, leavesCanvas.height);
  for (let leaf of leaves) {
    if (leaf.fade <= 0) continue;
    leavesCtx.save();
    leavesCtx.globalAlpha = leaf.opacity * leaf.fade;
    leavesCtx.translate(leaf.x, leaf.y);
    leavesCtx.rotate(leaf.rot);
    leavesCtx.drawImage(leaf.img, -leaf.size/2, -leaf.size/2, leaf.size, leaf.size);
    leavesCtx.restore();
  }
}

function updateLeaves() {
  for (let leaf of leaves) {
    if (leaf.respawnDelay > 0) {
      leaf.respawnDelay -= 16;
      if (leaf.respawnDelay <= 0) {
        Object.assign(leaf, randomLeafProps());
      }
      continue;
    }
    // Sway
    let swayAmount = leaf.sway * (breezeActive ? 1.7 : 1);
    leaf.x += Math.sin(leaf.swayPhase + leaf.y * 0.012) * swayAmount * 0.012;
    leaf.swayPhase += leaf.swaySpeed * 0.016;
    // Fall
    leaf.y += leaf.speed;
    // Rotate
    leaf.rot += leaf.rotSpeed;
    // Fade out at bottom
    if (leaf.y > window.innerHeight + leaf.size/2) {
      leaf.fade -= 0.04;
      if (leaf.fade <= 0) {
        leaf.respawnDelay = 400 + Math.random() * 600;
      }
    }
  }
}

function breezeEffect() {
  breezeActive = true;
  if (breezeTimeout) clearTimeout(breezeTimeout);
  breezeTimeout = setTimeout(() => {
    breezeActive = false;
    scheduleBreeze();
  }, BREEZE_DURATION);
}

function scheduleBreeze() {
  if (breezeTimer) clearTimeout(breezeTimer);
  breezeTimer = setTimeout(breezeEffect, BREEZE_INTERVAL + Math.random() * 3000);
}

function leavesLoop() {
  if (!phase5Active) return;
  updateLeaves();
  drawLeaves();
  requestAnimationFrame(leavesLoop);
}

function startLeaves() {
  if (leavesCanvas) return;
  leavesCanvas = document.createElement('canvas');
  leavesCanvas.className = 'leaves-canvas';
  leavesCanvas.style.position = 'fixed';
  leavesCanvas.style.left = '0';
  leavesCanvas.style.top = '0';
  leavesCanvas.style.width = '100vw';
  leavesCanvas.style.height = '100vh';
  leavesCanvas.style.pointerEvents = 'none';
  leavesCanvas.style.zIndex = 9998;
  leavesCanvas.width = window.innerWidth;
  leavesCanvas.height = window.innerHeight;
  document.body.appendChild(leavesCanvas);
  leavesCtx = leavesCanvas.getContext('2d');
  spawnLeaves();
  scheduleBreeze();
  leavesLoop();
}

function stopLeaves() {
  phase5Active = false;
  if (leavesCanvas) {
    leavesCanvas.remove();
    leavesCanvas = null;
    leavesCtx = null;
  }
  leaves = [];
  if (breezeTimer) clearTimeout(breezeTimer);
  if (breezeTimeout) clearTimeout(breezeTimeout);
}

function handlePhase5Leaves() {
  const p5 = document.getElementById('p5');
  if (p5 && p5.classList.contains('active')) {
    if (!phase5Active) {
      phase5Active = true;
      if (leafImages.length === 0) {
        preloadLeafImages(startLeaves);
      } else {
        startLeaves();
      }
    }
  } else {
    stopLeaves();
  }
}

window.addEventListener('DOMContentLoaded', handlePhase5Leaves);
document.addEventListener('transitionend', handlePhase5Leaves);
document.addEventListener('click', handlePhase5Leaves);

// Optional: expose start/stop for manual control
window.startLeaves = startLeaves;
window.stopLeaves = stopLeaves;
