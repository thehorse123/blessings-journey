
/* ========================================
   BROWSER DETECTION & OPTIMIZATION
   Optimize for Chrome and Safari
   ======================================== */

window.browserOptimizations = {
  isChrome: /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor),
  isSafari: /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent),
  isWebKit: /WebKit/.test(navigator.userAgent),
  isMobile: window.innerWidth < 768 || /iPhone|iPad|Android|Mobile/.test(navigator.userAgent),
  
  // Network detection
  getNetworkType: () => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    return connection?.effectiveType || '4g';
  },
  
  isSlowNetwork: () => {
    const networkType = window.browserOptimizations.getNetworkType();
    return networkType === '3g' || networkType === '2g';
  },
  
  shouldReduceAnimations: () => {
    return matchMedia('(prefers-reduced-motion: reduce)').matches ||
           (navigator.deviceMemory && navigator.deviceMemory < 4) ||
           window.browserOptimizations.isSlowNetwork();
  },
  
  enableGPUAcceleration: () => {
    // Only enable GPU acceleration on fast networks and desktop
    if (window.browserOptimizations.isSlowNetwork()) {
      return; // Skip GPU acceleration on slow networks to save battery
    }
    
    const root = document.documentElement;
    root.style.WebkitFontSmoothing = 'antialiased';
    root.style.WebkitBackfaceVisibility = 'hidden';
    root.style.perspective = '1000px';
  }
};

// Log device info for debugging
console.log('📱 Device Info:', {
  isMobile: window.browserOptimizations.isMobile,
  networkType: window.browserOptimizations.getNetworkType(),
  isSlowNetwork: window.browserOptimizations.isSlowNetwork(),
  deviceMemory: navigator.deviceMemory || 'unknown'
});

// Initialize optimizations on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.browserOptimizations.enableGPUAcceleration();
    // Apply mobile-specific styles
    if (window.browserOptimizations.isMobile) {
      document.documentElement.classList.add('mobile-device');
    }
    if (window.browserOptimizations.isSlowNetwork()) {
      document.documentElement.classList.add('slow-network');
    }
  });
} else {
  window.browserOptimizations.enableGPUAcceleration();
  if (window.browserOptimizations.isMobile) {
    document.documentElement.classList.add('mobile-device');
  }
  if (window.browserOptimizations.isSlowNetwork()) {
    document.documentElement.classList.add('slow-network');
  }
}

/* ========================================
   PHASE 2 DYNAMIC ASSET LOADER
   Loads all non-critical assets when user clicks Continue
   ======================================== */

const Phase2Loader = {
  isLoaded: false,
  isLoading: false,

  async loadPhase2Assets() {
    if (this.isLoaded || this.isLoading) return;
    this.isLoading = true;
    console.log('🚀 Phase 2: Starting dynamic asset loading...');

    try {
      await Promise.all([
        this.loadPhase2Media(),
        this.loadPhase2Audio(),
        this.loadPhase2Scripts()
      ]);
      
      this.isLoaded = true;
      console.log('✅ Phase 2: All assets loaded successfully!');
      window.dispatchEvent(new Event('phase2-assets-loaded'));
    } catch (error) {
      console.error('❌ Phase 2 loading error:', error);
    } finally {
      this.isLoading = false;
    }
  },

  async loadPhase2Media() {
    const phase2Images = [
      'site-asse-voices/Bat1.gif', 'site-asse-voices/Bat2.gif',
      'site-asse-voices/dance3.gif', 'site-asse-voices/datewheel.webp',
      'site-asse-voices/dcbg.gif', 'site-asse-voices/eyelogo.gif',
      'site-asse-voices/firesurface.gif', 'site-asse-voices/greenpill.webp',
      'site-asse-voices/leaf1.webp', 'site-asse-voices/leaf2.webp',
      'site-asse-voices/leaf3.webp', 'site-asse-voices/leaf4.webp',
      'site-asse-voices/leaf5.webp', 'site-asse-voices/leaf6.webp',
      'site-asse-voices/leaf7.webp', 'site-asse-voices/leaf8.webp',
      'site-asse-voices/leaf9.webp', 'site-asse-voices/pillsbg.webp',
      'site-asse-voices/redpill.webp', 'site-asse-voices/rope.webp',
      'site-asse-voices/skelton.gif', 'phase-1-media/snowsurface.webp',
      'site-asse-voices/spark1.webp', 'site-asse-voices/spark2.webp',
      'site-asse-voices/spark3.webp', 'site-asse-voices/spark4.webp',
      'site-asse-voices/usbg.webp', 'site-asse-voices/woodencard.webp',
      'site-asse-voices/whbg1.mp4',
      'site-asse-voices/matrixbg.mp4', 'site-asse-voices/Portal1.mp4',
      'site-asse-voices/portal2.mp4', 'site-asse-voices/ph3s.mp4',
      'site-asse-voices/ph5surface.mp4', 'site-asse-voices/eyelogo.mp4',
      'site-asse-voices/skelton.mp4', 'site-asse-voices/bat1.mp4'
    ];

    return Promise.all(phase2Images.map(src => 
      new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = src;
      })
    )).then(() => console.log('📸 Phase 2 images & videos loaded'));
  },

  async loadPhase2Audio() {
    const phase2Audio = [
      'site-asse-voices/v4A.mp3', 'site-asse-voices/v4B.mp3',
      'site-asse-voices/v5.mp3', 'site-asse-voices/v6.mp3',
      'site-asse-voices/v7.mp3', 'site-asse-voices/v8.mp3',
      'site-asse-voices/ph1bgb.mp3', 'site-asse-voices/wheelbackground.mp3',
      'site-asse-voices/batsound.mp3', 'site-asse-voices/batgroup.mp3'
    ];

    return Promise.all(phase2Audio.map(src =>
      new Promise((resolve) => {
        const audio = new Audio();
        audio.preload = 'auto';
        audio.onloadstart = () => resolve();
        audio.onerror = () => resolve();
        audio.src = src;
      })
    )).then(() => console.log('🎵 Phase 2 audio loaded'));
  },

  async loadPhase2Scripts() {
    const phase2Scripts = [
      './audio-manager-optimized.js',
      './payment-tracker.js',
      './leaves.js',
      './snow.js'
    ];

    return Promise.all(phase2Scripts.map(src =>
      new Promise((resolve) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => resolve();
        document.body.appendChild(script);
      })
    )).then(() => console.log('📜 Phase 2 scripts loaded'));
  }
};

// Make Phase2Loader globally available
window.Phase2Loader = Phase2Loader;

// Example global portal activation hooks
  window.showPortal1 = function() {
    if (window.playPortal1Sound) window.playPortal1Sound();
    // ...existing portal1 logic...
  };
  window.showPortal2 = function() {
    if (window.playPortal2Sound) window.playPortal2Sound();
    // ...existing portal2 logic...
  };

/* ========================================
   REUSABLE MODAL OVERLAY SYSTEM
   ======================================== */

const ModalSystem = {
  overlay: null,
  container: null,
  iframeWrapper: null,
  isOpen: false,

  init() {
    if (this.overlay) return; // Already initialized
    
    // Create overlay
    this.overlay = document.createElement('div');
    this.overlay.className = 'modal-overlay';
    
    // Create modal container
    this.container = document.createElement('div');
    this.container.className = 'modal-container';
    
    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal-close-btn';
    closeBtn.innerHTML = '?';
    closeBtn.setAttribute('aria-label', 'Close modal');
    closeBtn.addEventListener('click', () => this.close());
    
    // Create iframe wrapper
    this.iframeWrapper = document.createElement('div');
    this.iframeWrapper.className = 'modal-iframe-wrapper';
    
    // Assemble modal
    this.container.appendChild(closeBtn);
    this.container.appendChild(this.iframeWrapper);
    this.overlay.appendChild(this.container);
    document.body.appendChild(this.overlay);
    
    // Close on overlay background click (but not on container click)
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.close();
      }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  },

  open(iframeSrc) {
    if (!this.overlay) {
      this.init();
    }
    
    document.body.style.overflow = 'hidden';
    this.iframeWrapper.innerHTML = '';
    
    console.log('Opening checkout modal...');
    
    // Try to open PayPal checkout in a popup window
    const paymentWindow = window.open(
      iframeSrc, 
      'PayHip_Checkout',
      'width=900,height=700,scrollbars=yes,resizable=yes,menubar=no,toolbar=no,location=no,status=no'
    );
    
    // Check if popup was successfully opened
    if (!paymentWindow || paymentWindow.closed) {
      console.warn('Popup blocked or closed, showing PayHip embedded form');
      // Popup was blocked, show embedded form instead
      this.showEmbeddedForm(iframeSrc);
    } else {
      // Popup opened successfully
      console.log('PayPal checkout popup opened successfully');
      paymentWindow.focus();
      
      // Show info in modal while popup is open
      const infoDiv = document.createElement('div');
      infoDiv.style.cssText = `
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        gap: 20px;
        padding: 40px;
        text-align: center;
        background: linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%);
      `;
      
      const icon = document.createElement('div');
      icon.style.cssText = `
        font-size: 48px;
        animation: pulse 2s ease-in-out infinite;
      `;
      icon.textContent = '🪟';
      
      const title = document.createElement('p');
      title.textContent = 'PayPal Checkout Window Opened';
      title.style.cssText = 'font-size: 18px; font-weight: 600; margin: 0; color: #333;';
      
      const desc = document.createElement('p');
      desc.textContent = 'Your secure PayPal checkout has opened in a new window. Complete your payment there to finish the transaction.';
      desc.style.cssText = 'font-size: 14px; color: #666; margin: 0; max-width: 400px; line-height: 1.6;';
      
      const note = document.createElement('p');
      note.textContent = 'If the window didn\'t open, please check your browser\'s popup blocker settings.';
      note.style.cssText = 'font-size: 12px; color: #999; margin: 10px 0 0 0; font-style: italic;';
      
      const closeBtn = document.createElement('button');
      closeBtn.textContent = 'Close This Modal';
      closeBtn.style.cssText = `
        margin-top: 20px;
        padding: 10px 24px;
        background: #0066cc;
        color: white;
        border: none;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
        font-size: 14px;
      `;
      closeBtn.addEventListener('click', () => this.close());
      closeBtn.addEventListener('mouseover', function() {
        this.style.background = '#0052a3';
      });
      closeBtn.addEventListener('mouseout', function() {
        this.style.background = '#0066cc';
      });
      
      infoDiv.appendChild(icon);
      infoDiv.appendChild(title);
      infoDiv.appendChild(desc);
      infoDiv.appendChild(note);
      infoDiv.appendChild(closeBtn);
      
      this.iframeWrapper.appendChild(infoDiv);
      
      // Add pulse animation
      if (!document.getElementById('modal-pulse-style')) {
        const style = document.createElement('style');
        style.id = 'modal-pulse-style';
        style.textContent = '@keyframes pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.1); opacity: 0.8; } }';
        document.head.appendChild(style);
      }
      
      // Monitor if popup is closed
      const checkPopup = setInterval(() => {
        try {
          if (paymentWindow.closed) {
            clearInterval(checkPopup);
            console.log('PayPal checkout window was closed');
            // Auto-close modal when user closes the payment window
            this.close();
          }
        } catch (e) {
          clearInterval(checkPopup);
        }
      }, 1000);
    }
    
    this.overlay.classList.add('active');
    this.isOpen = true;
  },

  showEmbeddedForm(checkoutUrl) {
    // Use PayHip's official embed page as fallback
    // This loads the product checkout form directly in the modal
    
    console.log('Loading PayHip embedded product page...');
    
    this.iframeWrapper.innerHTML = '';
    
    // IMPORTANT: Create embed container in modal IMMEDIATELY
    // PayHip script needs to find this div when it initializes
    const embedContainer = document.createElement('div');
    embedContainer.className = 'payhip-embed-page';
    embedContainer.setAttribute('data-key', '0H7Gw');
    embedContainer.style.cssText = `
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f9f9f9;
    `;
    
    // Show loading spinner while waiting for PayHip
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'payhip-loading';
    loadingDiv.style.cssText = `
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 15px;
      font-size: 14px;
      color: #666;
    `;
    
    const spinner = document.createElement('div');
    spinner.style.cssText = 'width: 40px; height: 40px; border: 4px solid #e0e0e0; border-top: 4px solid #003087; border-radius: 50%; animation: spin 1s linear infinite;';
    
    const text = document.createElement('p');
    text.textContent = 'Loading secure checkout...';
    text.style.cssText = 'margin: 0; white-space: nowrap;';
    
    loadingDiv.appendChild(spinner);
    loadingDiv.appendChild(text);
    embedContainer.appendChild(loadingDiv);
    
    // Add loading state to modal immediately
    this.iframeWrapper.appendChild(embedContainer);
    
    // Add spinner animation if not exists
    if (!document.getElementById('modal-spinner-style')) {
      const style = document.createElement('style');
      style.id = 'modal-spinner-style';
      style.textContent = '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }';
      document.head.appendChild(style);
    }
    
    // Now load PayHip's embed page script
    // This script will look for divs with class "payhip-embed-page" and render the form
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://payhip.com/embed-page.js';
    script.async = true;
    
    script.onload = () => {
      console.log('PayHip embed script loaded successfully');
      
      // PayHip script should auto-initialize and find our embed container
      // Give it time to render the form
      setTimeout(() => {
        console.log('PayHip embed should now be rendered');
        
        // Check if PayHip rendered anything
        const formElements = embedContainer.querySelectorAll('form, input, iframe');
        if (formElements.length > 0) {
          console.log('PayHip form detected, removing loading indicator');
          const loading = embedContainer.querySelector('#payhip-loading');
          if (loading) {
            loading.style.display = 'none';
          }
        } else {
          console.log('PayHip form not yet detected, may still be initializing');
        }
      }, 1000);
    };
    
    script.onerror = () => {
      console.error('Failed to load PayHip embed script, falling back to direct link');
      this.showDirectLink(checkoutUrl);
    };
    
    // Append script to trigger loading
    document.head.appendChild(script);
    
    console.log('PayHip embed initialized in modal');
  },

  showDirectLink(checkoutUrl) {
    // Final fallback - show direct link button
    this.iframeWrapper.innerHTML = '';
    
    const container = document.createElement('div');
    container.style.cssText = `
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      gap: 15px;
      padding: 30px;
      text-align: center;
      background: #f5f5f5;
    `;
    
    const title = document.createElement('p');
    title.textContent = 'PayPal Checkout';
    title.style.cssText = 'color: #333; font-size: 18px; margin: 0; font-weight: 600;';
    
    const desc = document.createElement('p');
    desc.textContent = 'Click the button below to proceed to the secure PayPal checkout page.';
    desc.style.cssText = 'color: #666; font-size: 14px; margin: 0; max-width: 450px; line-height: 1.6;';
    
    const button = document.createElement('a');
    button.href = checkoutUrl;
    button.target = '_blank';
    button.rel = 'noopener noreferrer';
    button.textContent = '💳 Proceed to PayPal';
    button.style.cssText = `
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 14px 32px;
      background: linear-gradient(135deg, #003087 0%, #009cde 100%);
      color: #fff;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 700;
      border: none;
      cursor: pointer;
      font-size: 15px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      transition: transform 0.2s, box-shadow 0.2s;
    `;
    
    button.addEventListener('mouseover', function() {
      this.style.transform = 'translateY(-2px)';
      this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
    });
    
    button.addEventListener('mouseout', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2)';
    });
    
    const footer = document.createElement('p');
    footer.textContent = 'A new window will open. Your checkout will be secure.';
    footer.style.cssText = 'color: #999; font-size: 12px; margin-top: 10px; margin-bottom: 0;';
    
    container.appendChild(title);
    container.appendChild(desc);
    container.appendChild(button);
    container.appendChild(footer);
    
    this.iframeWrapper.appendChild(container);
  },

  close() {
    if (!this.overlay) return;
    
    document.body.style.overflow = '';
    this.overlay.classList.remove('active');
    this.iframeWrapper.innerHTML = '';
    
    this.isOpen = false;
  }
};

// Auto-initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    ModalSystem.init();
  });
} else {
  ModalSystem.init();
}

// Remove developer asset diagnostic overlay if present (cleans up UI on production)
(function removeBatDiag(){
  try {
    if (typeof window === 'undefined') return;
    window.addEventListener('DOMContentLoaded', function(){
      try {
        const d = document.getElementById('bat-asset-diag');
        if (d && d.parentNode) {
          d.parentNode.removeChild(d);
          console.log('✅ Removed bat diagnostics overlay');
        }
      } catch(e) {
        console.warn('⚠️ Failed to remove bat diagnostics:', e.message);
      }
    });
  } catch (e) {
    console.error('❌ removeBatDiag error:', e.message);
  }
})();

// --- Phase 4: Occasionally show Bat1 and Bat2 at random positions ---
document.addEventListener('DOMContentLoaded', function() {
  // Enable audio playback on first user interaction
  let audioEnabled = false;
  function enableAudio() {
    if (!audioEnabled) {
      audioEnabled = true;
      console.log('Audio enabled');
    }
  }
  document.addEventListener('click', enableAudio);
  document.addEventListener('touchstart', enableAudio);
  
  // Audio pool for batsound so each bat gets its own instance
  let batsoundSrc = 'site-asse-voices/batsound.mp3';
  const batsoundPool = [];
  const BATSOUND_POOL_SIZE = 8;
  for (let i = 0; i < BATSOUND_POOL_SIZE; i++) {
    let audio = new Audio(batsoundSrc);
    audio.volume = 0.5;
    batsoundPool.push(audio);
  }
  function getBatsoundAudio() {
    for (let i = 0; i < batsoundPool.length; i++) {
      if (batsoundPool[i].paused || batsoundPool[i].ended) {
        batsoundPool[i].currentTime = 0;
        return batsoundPool[i];
      }
    }
    // If all are in use, create a new one (fallback)
    let audio = new Audio(batsoundSrc);
    audio.volume = 0.5;
    batsoundPool.push(audio);
    return audio;
  }
    // reuse the top-level batImgs and preloadedBatImages
    const batImgs = [
      'site-asse-voices/bat1.gif',
      'site-asse-voices/bat2.gif'
    ];

  // Preload bat images and capture load/error for debugging on servers
  const preloadedBatImages = [];
  batImgs.forEach((s) => {
    try {
      const im = new Image();
      im.src = s;
      im.onload = () => console.log('[BATS] loaded:', s);
      im.onerror = () => console.error('[BATS] failed to load:', s);
      preloadedBatImages.push(im);
    } catch (e) {
      console.error('[BATS] preload exception for', s, e);
    }
  });

  // Diagnostic: verify HTTP status for each bat image and display small overlay
  (function checkBatAssets() {
    try {
      if (!window.fetch) {
        console.warn('⚠️ Fetch API not available, skipping bat asset check');
        return;
      }
      const diag = document.createElement('div');
      diag.id = 'bat-asset-diag';
      diag.style.position = 'fixed';
      diag.style.right = '8px';
      diag.style.bottom = '8px';
      diag.style.zIndex = 999999;
      diag.style.background = 'rgba(0,0,0,0.6)';
      diag.style.color = '#fff';
      diag.style.fontSize = '12px';
      diag.style.padding = '6px 8px';
      diag.style.borderRadius = '6px';
      diag.style.maxWidth = '220px';
      diag.style.fontFamily = 'sans-serif';
      diag.innerText = 'Bats: checking...';
      document.body.appendChild(diag);
      Promise.all(batImgs.map(url => 
        fetch(url, { method: 'HEAD' })
          .then(r => ({ url, ok: r.ok, status: r.status }))
          .catch(e => ({ url, ok: false, status: e.message }))
      )).then(results => {
        diag.innerHTML = results.map(r => `${r.ok ? '✔' : '✖'} ${r.url} (${r.status})`).join('<br>');
        console.log('✅ Bat assets checked:', results);
        setTimeout(() => {
          try {
            diag.remove();
          } catch(e) {
            console.warn('⚠️ Failed to remove diagnostic:', e.message);
          }
        }, 15000);
      }).catch(err => {
        console.error('❌ Bat asset check failed:', err.message);
      });
    } catch(e) {
      console.error('❌ checkBatAssets error:', e.message);
    }
  })();
  let batInterval = null;
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function showRandomBat() {
    const p4 = document.getElementById('p4');
    if (!p4 || !p4.classList.contains('active')) return;
    // Only show a bat 40% of the time
    if (Math.random() > 0.4) return;
    const bat = document.createElement('img');
    const idx = Math.floor(Math.random() * batImgs.length);
    // Prefer preloaded src when available (helps debugging and avoids race conditions)
    bat.src = (preloadedBatImages[idx] && preloadedBatImages[idx].src) ? preloadedBatImages[idx].src : batImgs[idx];
    bat.onerror = function() {
      console.error('[BATS] image load error for', this.src);
      // remove/don't show broken image
      this.remove();
    };
    bat.alt = 'Bat';
    bat.style.position = 'fixed';
    bat.style.width = '3cm';
    bat.style.height = '3cm';
    bat.style.opacity = '1';
    bat.style.pointerEvents = 'none';
    bat.style.zIndex = 1201;
    bat.style.transition = 'opacity 0.7s';
    // Play batsound for each single bat, and stop it when bat disappears
    let batsoundAudio = getBatsoundAudio();
    let playPromise = batsoundAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
    // Start position
    const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    const startX = Math.random() * (vw - 90);
    const startY = Math.random() * (vh - 90);
    bat.style.left = startX + 'px';
    bat.style.top = startY + 'px';
    document.body.appendChild(bat);
    // Animate to a new random position
    const endX = Math.random() * (vw - 90);
    const endY = Math.random() * (vh - 90);
    const duration = 1200 + Math.random() * 1400;
    bat.animate([
      { left: startX + 'px', top: startY + 'px' },
      { left: endX + 'px', top: endY + 'px' }
    ], {
      duration: duration,
      easing: 'ease-in-out',
      fill: 'forwards'
    });
    // Actually move the element for final position
    setTimeout(() => {
      bat.style.left = endX + 'px';
      bat.style.top = endY + 'px';
      bat.style.opacity = '0';
      // Stop the sound when bat disappears
      if (batsoundAudio) {
        batsoundAudio.pause();
        batsoundAudio.currentTime = 0;
      }
      setTimeout(() => bat.remove(), 900);
    }, duration);
  }
  function startBatsPhase4() {
    if (batInterval) clearInterval(batInterval);
    batInterval = setInterval(() => {
      const p4 = document.getElementById('p4');
      if (p4 && p4.classList.contains('active')) {
        showRandomBat();
      }
    }, 1800);
  }
  function stopBatsPhase4() {
    if (batInterval) clearInterval(batInterval);
    batInterval = null;
  }
  // Monitor phase changes
  function checkPhase4Bats() {
    const p4 = document.getElementById('p4');
    if (p4 && p4.classList.contains('active')) {
      // Only erupt bats the first time phase 4 becomes active
      if (!p4._batsErupted) {
        eruptBatsCrowd();
        p4._batsErupted = true;
      }
      startBatsPhase4();
    } else {
      stopBatsPhase4();
      if (p4) p4._batsErupted = false;
    }
  // Erupt a crowd of bats when entering phase 4
  function eruptBatsCrowd() {
  // Dramatic darkness overlay flash
  let overlay = document.createElement('div');
  overlay.id = 'bat-erupt-overlay';
  overlay.style.position = 'fixed';
  overlay.style.left = '0';
  overlay.style.top = '0';
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.background = 'rgba(0,0,0,0.7)';
  overlay.style.zIndex = '2000';
  overlay.style.pointerEvents = 'none';
  overlay.style.transition = 'opacity 0.7s';
  overlay.style.opacity = '0';
  document.body.appendChild(overlay);
  setTimeout(() => { overlay.style.opacity = '1'; }, 10);
  setTimeout(() => { overlay.style.opacity = '0'; }, 1200);
  setTimeout(() => { if (overlay.parentNode) overlay.parentNode.removeChild(overlay); }, 2000);

  // Play batgroup and wind sound at medium volume
  let batgroupAudio = new Audio('site-asse-voices/batgroup.mp3');
  batgroupAudio.volume = 0.5;
  batgroupAudio.play();
    const batImgs = [
      'site-asse-voices/Bat1.gif',
      'site-asse-voices/Bat2.gif'
    ];
    const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    const centerX = vw / 2;
    const centerY = vh / 2 + 60; // slightly lower for effect
    // Two groups: first erupts, second lingers then erupts
    const group1 = 8 + Math.floor(Math.random() * 4); // 8-11 bats
    const group2 = 7 + Math.floor(Math.random() * 4); // 7-10 bats
    function eruptGroup(num, delay) {
      for (let i = 0; i < num; i++) {
        const bat = document.createElement('img');
        bat.src = batImgs[Math.floor(Math.random() * batImgs.length)];
        bat.alt = 'Bat';
        bat.style.position = 'fixed';
  // Randomize bat size and rotation
  const batSize = 2.2 + Math.random() * 1.3; // 2.2cm to 3.5cm
  bat.style.width = batSize + 'cm';
  bat.style.height = batSize + 'cm';
  bat.style.transform = `rotate(${Math.random() * 60 - 30}deg)`;
        bat.style.opacity = '1';
        bat.style.pointerEvents = 'none';
        bat.style.zIndex = 1202;
        // Slightly staggered start positions for realism
        const spread = 60;
        const offsetX = centerX + (Math.random() - 0.5) * spread;
        const offsetY = centerY + (Math.random() - 0.5) * spread;
        bat.style.left = offsetX + 'px';
        bat.style.top = offsetY + 'px';
        document.body.appendChild(bat);
        // Random angle and distance
        const angle = Math.random() * Math.PI * 2;
        const distance = 220 + Math.random() * 380;
        const endX = offsetX + Math.cos(angle) * distance;
        const endY = offsetY + Math.sin(angle) * distance;
        const duration = 2500;
        setTimeout(() => {
          bat.animate([
            { left: offsetX + 'px', top: offsetY + 'px', opacity: 1 },
            { left: endX + 'px', top: endY + 'px', opacity: 0 }
          ], {
            duration: duration,
            easing: 'ease-in',
            fill: 'forwards'
          });
          setTimeout(() => {
            bat.style.left = endX + 'px';
            bat.style.top = endY + 'px';
            bat.style.opacity = '0';
            setTimeout(() => bat.remove(), 400);
          }, duration);
        }, delay);
      }
    }
    // First group erupts immediately
    eruptGroup(group1, 0);
    // Second group lingers for 1 second, then erupts
    eruptGroup(group2, 1000);
  }
  }
  document.addEventListener('click', checkPhase4Bats);
  window.addEventListener('hashchange', checkPhase4Bats);
  const obsBat = new MutationObserver(checkPhase4Bats);
  const p4 = document.getElementById('p4');
  if (p4) obsBat.observe(p4, { attributes: true });
  checkPhase4Bats();
});
// Hide snow effect in Phase 4 only
document.addEventListener('DOMContentLoaded', function() {
  // Try to detect Phase 4 container (adjust selector if needed)
  var phase4 = document.querySelector('.wheel-wrap');
  var snow = document.getElementById('snow-canvas');
  if (phase4 && snow) {
    snow.style.display = 'none';
  }
});
// === Phase 5 Signup/Referral Transition Logic ===
document.addEventListener('DOMContentLoaded', function() {
  const signupBtn = document.getElementById('signup');
  const usernameInput = document.getElementById('username');
  const emailInput = document.getElementById('email');
  const walletInput = document.getElementById('wallet');
  const signupSection = document.getElementById('signupSection');
  const referralSection = document.getElementById('referralSection');
  const refLinkInput = document.getElementById('refLink');
  const copyBtn = document.getElementById('copyLink');
  const inviteSlots = Array.from({length:5}, (_,i) => document.getElementById('inviteSlot'+i));

  let referralLink = '';
  let joinedUsers = [];

  // Function to calculate and update TB amount
  function updateTBAmount() {
    const bpElement = document.getElementById('bp');
    const pbElement = document.getElementById('sb');
    const tbAmountElement = document.getElementById('tbAmount');
    
    if (!tbAmountElement) return;
    
    let bpValue = 0;
    let pbValue = 0;
    
    // Get BP percentage value (remove % sign and convert to decimal)
    if (bpElement && bpElement.textContent) {
      const bpText = bpElement.textContent.trim().replace('%', '');
      bpValue = parseFloat(bpText) / 100 || 0; // Convert 70% to 0.7
    }
    
    // Get PB amount (remove $ sign and convert to number)
    if (pbElement && pbElement.textContent) {
      const pbText = pbElement.textContent.trim().replace('$', '');
      pbValue = parseFloat(pbText) || 0;
    }
    
    // Calculate TB: (100% + BP% + 50%) * PB = TB
    // Formula: (1.0 + bpValue + 0.5) * pbValue
    const bonusMultiplier = 1.0 + bpValue + 0.5; // Base 100% + BP% + 50%
    const tbValue = bonusMultiplier * pbValue;
    
    // Display the calculated amount
    tbAmountElement.textContent = '$' + tbValue.toFixed(2);
  }

  function fadeOutIn(outEl, inEl) {
    const profileHint = document.getElementById('profileHint');
    const walletBoxes = document.getElementById('walletBoxes');
    outEl.classList.remove('fade-in');
    outEl.classList.add('fade-out');
    setTimeout(() => {
      outEl.style.display = 'none';
      inEl.style.display = '';
      inEl.classList.add('fade-in');
      // Hide the hint when referral section appears
      if (profileHint && inEl.id === 'referralSection') {
        profileHint.style.display = 'none';
      }
      // Show wallet boxes ONLY when referral section appears in Phase 5
      if (walletBoxes && inEl.id === 'referralSection' && S.phase === 5) {
        walletBoxes.style.display = 'flex';
        console.log('💰 Phase 5: Showing wallet boxes on referral section');
      }
      // Hide wallet boxes when signup section appears or if not in phase 5
      if (walletBoxes && outEl.id === 'referralSection') {
        walletBoxes.style.display = 'none';
        console.log('🔐 Phase 5: Hiding wallet boxes on signup section');
      }
    }, 700);
  }

  function validateFields() {
    let valid = true;
    
    // Validate username
    if (!usernameInput.value.trim()) {
      usernameInput.style.boxShadow = '0 0 0 2px #ff6b81';
      valid = false;
    } else {
      usernameInput.style.boxShadow = '';
    }
    
    // Validate email - must be a proper email format
    const emailValue = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailValue) {
      emailInput.style.boxShadow = '0 0 0 2px #ff6b81';
      valid = false;
    } else if (!emailRegex.test(emailValue)) {
      // Invalid email format
      emailInput.style.boxShadow = '0 0 0 2px #ff6b81';
      valid = false;
      
      // Show error message
      const errorMsg = document.createElement('div');
      errorMsg.className = 'email-error-toast';
      errorMsg.textContent = '❌ Please enter a valid email address';
      errorMsg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 107, 129, 0.95);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        font-weight: 600;
        font-size: 0.95em;
        z-index: 10000;
        animation: slideDown 0.3s ease-out;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
      `;
      document.body.appendChild(errorMsg);
      setTimeout(() => {
        errorMsg.style.animation = 'slideUp 0.3s ease-in';
        setTimeout(() => errorMsg.remove(), 300);
      }, 2000);
    } else {
      emailInput.style.boxShadow = '';
    }
    
    return valid;
  }

  function generateReferralLink() {
    // Simple mock: use username and random string
    const uname = encodeURIComponent(usernameInput.value.trim());
    referralLink = window.location.origin + '/invite?user=' + uname + '&ref=' + Math.random().toString(36).slice(2,8);
    refLinkInput.value = referralLink;
  }

  if (signupBtn) {
    signupBtn.addEventListener('click', function() {
      if (!validateFields()) return;
      generateReferralLink();
      fadeOutIn(signupSection, referralSection);
      // Update TB calculation when referral section appears
      setTimeout(() => {
        updateTBAmount();
      }, 700);
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', function() {
      if (refLinkInput.value) {
        navigator.clipboard.writeText(refLinkInput.value);
        copyBtn.textContent = 'Copied!';
        setTimeout(() => { copyBtn.textContent = 'Copy'; }, 1200);
        
        // Trigger V8 voice when link is copied
        if (window.audioManager && window.audioManager.onCopyReferralLink) {
          setTimeout(() => {
            window.audioManager.onCopyReferralLink();
          }, 100);
        }
      }
    });
  }

  // Simulate join for testing: click invite slot to trigger join
  inviteSlots.forEach((slot, idx) => {
    slot.addEventListener('click', function() {
      if (!slot.classList.contains('joined') && joinedUsers.length < 5) {
        slot.classList.add('joined');
        slot.textContent = 'User'+(idx+1);
        joinedUsers.push('User'+(idx+1));
        // Blessing Points animation
        const bpAnim = document.createElement('div');
        bpAnim.className = 'bp-anim';
  bpAnim.textContent = '+20%';
        slot.appendChild(bpAnim);
        setTimeout(() => { bpAnim.remove(); }, 1100);
        // Update TB amount when invite is clicked
        updateTBAmount();
      }
    });
  });

  // Set up observer to watch for BP and PB value changes
  const bpElement = document.getElementById('bp');
  const pbElement = document.getElementById('sb');
  
  if (bpElement) {
    const bpObserver = new MutationObserver(() => {
      updateTBAmount();
    });
    bpObserver.observe(bpElement, { childList: true, characterData: true, subtree: true });
  }
  
  if (pbElement) {
    const pbObserver = new MutationObserver(() => {
      updateTBAmount();
    });
    pbObserver.observe(pbElement, { childList: true, characterData: true, subtree: true });
  }
});
// Occasional glowing runes/stars for Oracle's Trial (Phase 3)
function spawnOracleRune() {
  const p3 = document.getElementById('p3');
  if (!p3 || !p3.classList.contains('active')) return;
  const rune = document.createElement('div');
  rune.className = 'oracle-rune';
  // Random position within Phase 3
  rune.style.left = Math.random() * (p3.offsetWidth - 32) + 'px';
  rune.style.top = (60 + Math.random() * (p3.offsetHeight - 120)) + 'px';
  // SVG star or rune
    // Array of golden glowing rune SVGs
    const oracleRuneSVGs = [
      `<svg width="32" height="32" viewBox="0 0 32 32">
        <defs>
          <linearGradient id="cg1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#f6e7b0"/>
            <stop offset="40%" stop-color="#ffd36e"/>
            <stop offset="70%" stop-color="#bfae5e"/>
            <stop offset="100%" stop-color
          </linearGradient>
        </defs>
        <path d="M8 28 L24 4 M8 4 L24 28" stroke="url(#cg1)" stroke-width="2.5" fill="url(#cg1)"/>
      </svg>`,
      `<svg width="32" height="32" viewBox="0 0 32 32">
        <defs>
          <linearGradient id="cg2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#f6e7b0"/>
            <stop offset="40%" stop-color="#ffd36e"/>
            <stop offset="70%" stop-color="#bfae5e"/>
            <stop offset="100%" stop-color="#b87333"/>
          </linearGradient>
        </defs>
            <stop offset="0%" stop-color="#d26b0aff"/>
            <stop offset="60%" stop-color="#FFD700"/>
          </linearGradient>
        </defs>
        <path d="M16 4 L16 28 M8 16 L24 16" stroke="url(#cg2)" stroke-width="2.5" fill="url(#cg2)"/>
      </svg>`,
      `<svg width="32" height="32" viewBox="0 0 32 32">
        <defs>
          <linearGradient id="cg3" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#f6e7b0"/>
            <stop offset="40%" stop-color="#ffd36e"/>
            <stop offset="70%" stop-color="#bfae5e"/>
            <stop offset="100%" stop-color="#b87333"/>
          </linearGradient>
        </defs>
        <path d="M8 8 L24 24 M24 8 L8 24" stroke="url(#cg3)" stroke-width="2.5" fill="url(#cg3)"/>
      </svg>`,
      `<svg width="32" height="32" viewBox="0 0 32 32">
        <defs>
          <linearGradient id="cg4" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#f6e7b0"/>
            <stop offset="40%" stop-color="#ffd36e"/>
            <stop offset="70%" stop-color="#bfae5e"/>
            <stop offset="100%" stop-color="#b87333"/>
          </linearGradient>
        </defs>
        <path d="M8 28 L24 4 M16 4 L16 28" stroke="url(#cg4)" stroke-width="2.5" fill="url(#cg4)"/>
      </svg>`,
      `<svg width="32" height="32" viewBox="0 0 32 32">
        <defs>
          <linearGradient id="cg5" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#f6e7b0"/>
            <stop offset="40%" stop-color="#ffd36e"/>
            <stop offset="70%" stop-color="#bfae5e"/>
            <stop offset="100%" stop-color="#b87333"/>
          </linearGradient>
        </defs>
        <path d="M8 8 L24 8 L8 24 L24 24" stroke="url(#cg5)" stroke-width="2.5" fill="url(#cg5)"/>
      </svg>`,
      `<svg width="32" height="32" viewBox="0 0 32 32">
        <defs>
          <linearGradient id="cg6" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#f6e7b0"/>
            <stop offset="40%" stop-color="#ffd36e"/>
            <stop offset="70%" stop-color="#bfae5e"/>
            <stop offset="100%" stop-color="#b87333"/>
          </linearGradient>
        </defs>
        <path d="M8 16 L24 4 L24 28 Z" stroke="url(#cg6)" stroke-width="2.5" fill="url(#cg6)"/>
      </svg>`,
      `<svg width="32" height="32" viewBox="0 0 32 32">
        <defs>
          <linearGradient id="cg7" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#f6e7b0"/>
            <stop offset="40%" stop-color="#ffd36e"/>
            <stop offset="70%" stop-color="#bfae5e"/>
            <stop offset="100%" stop-color="#b87333"/>
          </linearGradient>
        </defs>
        <path d="M8 8 L24 24 M8 24 L24 8 M16 4 L16 28" stroke="url(#cg7)" stroke-width="2.5" fill="url(#cg7)"/>
      </svg>`,
    ];
    rune.innerHTML = oracleRuneSVGs[Math.floor(Math.random() * oracleRuneSVGs.length)];
  p3.appendChild(rune);
  setTimeout(() => { rune.remove(); }, 2800);
}

function startOracleRuneEffect() {
  setInterval(() => {
    spawnOracleRune();
  }, 450 + Math.random() * 350); // Doubled rune flow
}

document.addEventListener('DOMContentLoaded', startOracleRuneEffect);

// === INTELLIGENT AUDIO LOADING SYSTEM ===
// Load audio ON-DEMAND by phase to minimize initial load
// Only load what user needs NOW + preload what they'll need NEXT

// Phase 1: ph1bga (100KB), v1
let bgMusic = null;
let bgMusicB = null;  // ph1bgb - Phases 2-5
let voiceV1 = null;

// Phase 1 Spin Results (V2_60-V2_100)
let voiceV2_60 = null;
let voiceV2_70 = null;
let voiceV2_80 = null;
let voiceV2_90 = null;
let voiceV2_100 = null;

// Phase 1 Payment (V3)
let voiceV3 = null;

// Phase 2: V4A/V4B
let voiceV4A = null;
let voiceV4B = null;

// Phase 3: V5
let voiceV5 = null;

// Phase 4: V6, V7
let voiceV6 = null;
let voiceV7 = null;

// Phase 5: V8
let voiceV8 = null;

// === AUDIO LOADING SCHEDULER ===
const audioLoader = {
  loadedAudio: {},
  
  // Determine correct folder for audio file
  getAudioPath(src) {
    // Phase 1 audio files
    const phase1Audio = ['v1.mp3', 'v260.mp3', 'v270.mp3', 'v280.mp3', 'v290.mp3', 'v2100.mp3', 'ph1bga.mp3', 'bublesound.mp3', 'wheelbackground.mp3'];
    
    if (phase1Audio.includes(src)) {
      return 'phase-1-media/' + src;
    }
    
    // Default to site-asse-voices (Phase 2+ and other assets)
    return 'site-asse-voices/' + src;
  },
  
  // Load audio file efficiently
  createAudio(src, id) {
    if (this.loadedAudio[id]) {
      console.log('✅ Audio already loaded:', id);
      return this.loadedAudio[id];
    }
    console.log('📥 Loading audio:', id);
    const audio = new Audio(this.getAudioPath(src));
    audio.preload = 'none';
    this.loadedAudio[id] = audio;
    return audio;
  },
  
  // Load Phase 1 audio (on music permission)
  loadPhase1() {
    console.log('📦 Loading Phase 1 audio...');
    bgMusic = this.createAudio('ph1bga.mp3', 'bgMusic');
    bgMusic.loop = true;
    bgMusic.volume = 0.24;
    
    voiceV1 = this.createAudio('v1.mp3', 'voiceV1');
    
    console.log('✅ Phase 1 audio loaded (100KB)');
    
    // REMOVED: Do NOT preload Phase 2 audio in background
    // Phase 2 audio loads ONLY when user clicks Continue button
    // (See Phase2Loader.loadPhase2Audio() in script.js)
  },
  
  // REMOVED: preloadPhase2() - Phase 2 now loads on explicit user intent (Continue button)
  
  // Load Phase 1 Spin (v2_60-v2_100) - on first spin click
  loadPhase1Spin() {
    if (voiceV2_60) return; // Already loaded
    console.log('📦 Loading Phase 1 Spin audio...');
    voiceV2_60 = this.createAudio('v260.mp3', 'voiceV2_60');
    voiceV2_70 = this.createAudio('v270.mp3', 'voiceV2_70');
    voiceV2_80 = this.createAudio('v280.mp3', 'voiceV2_80');
    voiceV2_90 = this.createAudio('v290.mp3', 'voiceV2_90');
    voiceV2_100 = this.createAudio('v2100.mp3', 'voiceV2_100');
    console.log('✅ Phase 1 Spin audio loaded');
  },
  
  // Load Phase 1 Payment (v3) - on purchase button click
  loadPhase1Payment() {
    if (voiceV3) return; // Already loaded
    console.log('📦 Loading Phase 1 Payment audio...');
    voiceV3 = this.createAudio('v3.mp3', 'voiceV3');
    console.log('✅ Phase 1 Payment audio loaded');
  },
  
  // Load Phase 3 (v5) - on quiz complete
  loadPhase3() {
    if (voiceV5) return;
    console.log('📦 Loading Phase 3 audio...');
    voiceV5 = this.createAudio('v5.mp3', 'voiceV5');
    console.log('✅ Phase 3 audio loaded');
  },
  
  // Load Phase 4 (v6, v7) - when user enters Phase 4
  loadPhase4() {
    if (voiceV6) return;
    console.log('📦 Loading Phase 4 audio...');
    voiceV6 = this.createAudio('v6.mp3', 'voiceV6');
    voiceV7 = this.createAudio('v7.mp3', 'voiceV7');
    
    // Load bgMusicB (ph1bgb) - rest of music for phases 2-5
    bgMusicB = this.createAudio('ph1bgb.mp3', 'bgMusicB');
    bgMusicB.loop = true;
    bgMusicB.volume = 0.24;
    
    console.log('✅ Phase 4 audio loaded');
  },
  
  // Load Phase 5 (v8) - when user enters Phase 5
  loadPhase5() {
    if (voiceV8) return;
    console.log('📦 Loading Phase 5 audio...');
    voiceV8 = this.createAudio('v8.mp3', 'voiceV8');
    console.log('✅ Phase 5 audio loaded');
  }
};

// === Music Permission Overlay Logic ===
document.addEventListener('DOMContentLoaded', function() {
  const overlay = document.getElementById('music-permission-overlay');
  const btn = document.getElementById('allow-music-btn');
  if (btn && overlay) {
    btn.addEventListener('click', function() {
      overlay.style.display = 'none';
      
      // Load Phase 1 audio when user grants permission
      audioLoader.loadPhase1();
      
      // Show wallet tooltips
      setTimeout(() => {
        showWalletTooltipHeadingsOnly(6000);
      }, 2000);
      
      // Start Phase 1 background music
      if (bgMusic) {
        bgMusic.currentTime = 0;
        bgMusic.volume = 0.14;
        bgMusic.play().then(() => {
          console.log('✅ Background music started');
        }).catch(e => {
          console.error('🔴 Background music failed:', e.name, e.message);
        });
      }
      
      // Play V1 welcome voice
      setTimeout(() => {
        if (voiceV1) {
          voiceV1.currentTime = 0;
          voiceV1.play().then(() => {
            console.log('✅ V1 voice started');
          }).catch(e => {
            console.error('🔴 V1 voice failed:', e.name, e.message);
          });
        }
      }, 500);
    });
  }
});

// === Wallet Explainer Tooltips Function ===
function showWalletTooltips(duration = 4000) {
  const tooltips = [
    document.getElementById('pb-tooltip'),
    document.getElementById('wb-tooltip'),
    document.getElementById('tb-tooltip')
  ];
  
  if (!tooltips[0]) return;
  
  // Show all tooltips
  tooltips.forEach(tooltip => {
    if (tooltip) {
      tooltip.style.display = 'flex';
      tooltip.classList.remove('fade-out');
    }
  });
  
  // Hide after duration
  setTimeout(() => {
    tooltips.forEach(tooltip => {
      if (tooltip) {
        tooltip.classList.add('fade-out');
      }
    });
    setTimeout(() => {
      tooltips.forEach(tooltip => {
        if (tooltip) {
          tooltip.style.display = 'none';
          tooltip.classList.remove('fade-out');
        }
      });
    }, 400); // Wait for fade-out animation
  }, duration);
}

// Show only wallet tooltip headings (names)
function showWalletTooltipHeadingsOnly(duration = 4000) {
  const tooltips = [
    document.getElementById('pb-tooltip'),
    document.getElementById('wb-tooltip'),
    document.getElementById('tb-tooltip')
  ];
  
  if (!tooltips[0]) return;
  
  // Hide descriptions and show only names
  tooltips.forEach(tooltip => {
    if (tooltip) {
      const description = tooltip.querySelector('.tooltip-description');
      if (description) {
        description.style.display = 'none';
      }
      tooltip.style.display = 'flex';
      tooltip.classList.remove('fade-out');
    }
  });
  
  // Hide after duration
  setTimeout(() => {
    tooltips.forEach(tooltip => {
      if (tooltip) {
        tooltip.classList.add('fade-out');
      }
    });
    setTimeout(() => {
      tooltips.forEach(tooltip => {
        if (tooltip) {
          tooltip.style.display = 'none';
          tooltip.classList.remove('fade-out');
          // Restore description visibility for next use
          const description = tooltip.querySelector('.tooltip-description');
          if (description) {
            description.style.display = '';
          }
        }
      });
    }, 400); // Wait for fade-out animation
  }, duration);
}

// Show only wallet tooltip descriptions (with adjusted positioning for longer text)
function showWalletTooltipDescriptionsOnly(duration = 3000) {
  const tooltips = [
    document.getElementById('pb-tooltip'),
    document.getElementById('wb-tooltip'),
    document.getElementById('tb-tooltip')
  ];
  
  if (!tooltips[0]) return;
  
  // Hide names and show only descriptions with description-specific positioning
  tooltips.forEach(tooltip => {
    if (tooltip) {
      const name = tooltip.querySelector('.tooltip-name');
      if (name) {
        name.style.display = 'none';
      }
      // Add description-mode class for adjusted positioning and wider max-width
      tooltip.classList.add('description-mode');
      tooltip.style.display = 'flex';
      tooltip.classList.remove('fade-out');
    }
  });
  
  // Hide after duration
  setTimeout(() => {
    tooltips.forEach(tooltip => {
      if (tooltip) {
        tooltip.classList.add('fade-out');
      }
    });
    setTimeout(() => {
      tooltips.forEach(tooltip => {
        if (tooltip) {
          tooltip.style.display = 'none';
          tooltip.classList.remove('fade-out');
          tooltip.classList.remove('description-mode'); // Remove description mode
          // Restore name visibility for next use
          const name = tooltip.querySelector('.tooltip-name');
          if (name) {
            name.style.display = '';
          }
        }
      });
    }, 400); // Wait for fade-out animation
  }, duration);
}

// Show example amounts tooltip (appears over Piggy Bank when v2 voice starts)
function showExampleAmountsTooltip(duration = 3000) {
  const tooltip = document.getElementById('example-amounts-tooltip');
  if (!tooltip) return;
  
  // Show tooltip with fade-in animation
  tooltip.style.display = 'flex';
  tooltip.classList.remove('fade-out');
  
  // Hide after duration
  setTimeout(() => {
    tooltip.classList.add('fade-out');
    setTimeout(() => {
      tooltip.style.display = 'none';
      tooltip.classList.remove('fade-out');
    }, 200); // Wait for fade-out animation (0.2s)
  }, duration);
}

// Show your turn tooltip (appears after 15 seconds when dummy is removed)
function showYourTurnTooltip(duration = 3000) {
  const tooltip = document.getElementById('your-turn-tooltip');
  if (!tooltip) return;
  
  // Show tooltip with fade-in animation
  tooltip.style.display = 'flex';
  tooltip.classList.remove('fade-out');
  
  // Hide after duration
  setTimeout(() => {
    tooltip.classList.add('fade-out');
    setTimeout(() => {
      tooltip.style.display = 'none';
      tooltip.classList.remove('fade-out');
    }, 200); // Wait for fade-out animation (0.2s)
  }, duration);
}

document.addEventListener('DOMContentLoaded', function() {
  const sparkleOverlay = document.getElementById('sparkle-overlay');
  const bulbs = document.querySelectorAll('.string-lights-header .bulb-interactive');
  // Bulb positions (SVG coordinates, extended for 14 bulbs)
  const bulbPos = [
    {x:20, y:16}, {x:60, y:10}, {x:100, y:8}, {x:140, y:14}, {x:180, y:22}, {x:220, y:30}, {x:260, y:24}, {x:300, y:14}, {x:330, y:8},
    {x:370, y:12}, {x:410, y:18}, {x:450, y:10}, {x:490, y:16}, {x:530, y:8}
  ];
  function sparkleAt(idx) {
    if (!sparkleOverlay) return;
    const pos = bulbPos[idx];
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = (pos.x-9) + 'px';
    sparkle.style.top = (pos.y-9) + 'px';
    sparkle.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 18 18">
        <g>
          <polygon points="9,1 10,7 17,9 10,11 9,17 8,11 1,9 8,7" fill="#fffbe6" stroke="#ffe066" stroke-width="0.7"/>
        </g>
      </svg>`;
    sparkleOverlay.appendChild(sparkle);
    setTimeout(() => {
      sparkle.remove();
    }, 700);
  }
  // Random sparkle every 1.2-2.2s
  function sparkleLoop() {
    const idx = Math.floor(Math.random() * bulbs.length);
    sparkleAt(idx);
    setTimeout(sparkleLoop, 1200 + Math.random()*1000);
  }
  if (sparkleOverlay && bulbs.length) sparkleLoop();
});
// === Interactive Colorful Bulbs for String Lights ===
document.addEventListener('DOMContentLoaded', function() {
  const colors = [
    '#fffbe6', // warm white
    '#ffe066', // yellow
    '#ffb347', // orange
    '#ff6b81', // red
    '#4efc8d', // green
    '#79a6ff', // blue
    '#b97aff', // purple
    '#facc15', // gold
    '#fff',    // pure white
  ];
  const bulbs = document.querySelectorAll('.string-lights-header .bulb-interactive');
  bulbs.forEach((bulb, i) => {
    let colorIdx = 0;
    // Twinkle/flicker is CSS, color is JS
    bulb.addEventListener('mouseenter', () => {
      colorIdx = (colorIdx + 1) % colors.length;
      bulb.setAttribute('fill', colors[colorIdx]);
    });
    bulb.addEventListener('click', () => {
      colorIdx = (colorIdx + 1) % colors.length;
      bulb.setAttribute('fill', colors[colorIdx]);
    });
    bulb.addEventListener('mouseleave', () => {
      setTimeout(() => {
        bulb.setAttribute('fill', colors[0]);
      }, 400);
    });
  });
});
// === Snow/Particle Effect for String Lights ===
let snowAnimId = null;
function startSnow() {
  const snow = document.getElementById('snow-canvas');
  if (!snow) return;
  const ctx = snow.getContext('2d');
  const W = snow.width, H = snow.height;
  const flakes = [];
  const FLAKE_COUNT = 22;
  for (let i = 0; i < FLAKE_COUNT; i++) {
    flakes.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 1.2 + Math.random() * 2.2,
      d: 0.5 + Math.random() * 1.2,
      o: 0.5 + Math.random() * 0.5,
      drift: (Math.random() - 0.5) * 0.6
    });
  }
  function drawSnow() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < FLAKE_COUNT; i++) {
      const f = flakes[i];
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, false);
      ctx.fillStyle = `rgba(255,255,255,${f.o})`;
      ctx.shadowColor = '#fffbe6';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    updateSnow();
    snowAnimId = requestAnimationFrame(drawSnow);
  }
  function updateSnow() {
    for (let i = 0; i < FLAKE_COUNT; i++) {
      const f = flakes[i];
      f.y += f.d;
      f.x += f.drift;
      if (f.y > H + 4) {
        f.y = -4;
        f.x = Math.random() * W;
      }
      if (f.x < 0) f.x = W;
      if (f.x > W) f.x = 0;
    }
  }
  drawSnow();
}
function stopSnow() {
  if (snowAnimId) {
    cancelAnimationFrame(snowAnimId);
    snowAnimId = null;
  }
  const snow = document.getElementById('snow-canvas');
  if (snow) {
    const ctx = snow.getContext('2d');
    ctx.clearRect(0, 0, snow.width, snow.height);
    snow.style.display = 'none';
  }
}
document.addEventListener('DOMContentLoaded', function() {
  if (window.S && (S.phase === 4 || S.phase === 5)) {
    stopSnow();
  } else {
    startSnow();
  }
});
  // Animate BP win from wheel center to BP count
  function animateBPWin(value) {
  const bpWin = document.getElementById('bpWinFloat');
  if (!bpWin) return;
  // Get wheel center (star)
  const wheel = document.getElementById('bpWheel');
  if (!wheel) return;
  const wheelBox = wheel.getBoundingClientRect();
  // Find the star element inside the SVG
  const star = wheel.querySelector('polygon');
  let cx = wheelBox.left + wheelBox.width / 2;
  let cy = wheelBox.top + wheelBox.height / 2;
  if (star) {
    // Get star's bounding box in SVG coordinates
    const starBox = star.getBBox();
    // Convert SVG coordinates to screen coordinates
    const svgRect = wheel.getBoundingClientRect();
    cx = svgRect.left + (starBox.x + starBox.width / 2) * (svgRect.width / 100)
    cy = svgRect.top + (starBox.y + starBox.height / 2) * (svgRect.height / 100);
  }  function animateBPWin(value) {
    const bpWin = document.getElementById('bpWinFloat');
    // ...existing code...
    // These lines set the start position:
    bpWin.style.left = `${cx}px`;
    bpWin.style.top = `${cy}px`;
    // ...existing code...
    // These lines update the position during animation:
    bpWin.style.left = `${x}px`;
    bpWin.style.top = `${y}px`;
    // ...existing code...
  }  function animateBPWin(value) {
    const bpWin = document.getElementById('bpWinFloat');
    // ...existing code...
    // These lines set the start position:
    bpWin.style.left = `${cx}px`;
    bpWin.style.top = `${cy}px`;
    // ...existing code...
    // These lines update the position during animation:
    bpWin.style.left = `${x}px`;
    bpWin.style.top = `${y}px`;
    // ...existing code...
  }  function animateBPWin(value) {
    const bpWin = document.getElementById('bpWinFloat');
    // ...existing code...
    // These lines set the start position:
    bpWin.style.left = `${cx}px`;
    bpWin.style.top = `${cy}px`;
    // ...existing code...
    // These lines update the position during animation:
    bpWin.style.left = `${x}px`;
    bpWin.style.top = `${y}px`;
    // ...existing code...
  }  function animateBPWin(value) {
    const bpWin = document.getElementById('bpWinFloat');
    // ...existing code...
    // These lines set the start position:
    bpWin.style.left = `${cx}px`;
    bpWin.style.top = `${cy}px`;
    // ...existing code...
    // These lines update the position during animation:
    bpWin.style.left = `${x}px`;
    bpWin.style.top = `${y}px`;
    // ...existing code...
  }
  // Get BP count position (Blessing card BP value)
  const bpCount = document.querySelector('.blessing-main #bp, #bp');
  if (!bpCount) return;
  const bpBox = bpCount.getBoundingClientRect();
  const bx = bpBox.left + bpBox.width / 2;
  const by = bpBox.top + bpBox.height / 2;
    // Set initial position (start 3cm above the calculated center)
    function cmToPx(cm) {
      const el = document.createElement('div');
      el.style.position = 'absolute';
      el.style.visibility = 'hidden';
      el.style.height = cm + 'cm';
      document.body.appendChild(el);
      const px = el.getBoundingClientRect().height;
      document.body.removeChild(el);
      return px;
    }
    const offsetPx = cmToPx(3); // 3cm upward visual offset
    const startCx = cx;
    const startCy = cy - offsetPx;

    bpWin.textContent = `+${value}%`;
    bpWin.style.display = 'block';
    bpWin.style.opacity = '1';
    bpWin.style.left = `${startCx}px`;
    bpWin.style.top = `${startCy}px`;
    bpWin.style.transform = 'translate(-50%, -50%) scale(1)';
    bpWin.style.transition = 'none';
    // Animate along path
    let start = null;
    function step(ts) {
      if (!start) start = ts;
      const t = Math.min((ts - start) / 3000, 1);
      // Curved path (ease-in-out)
      const ease = t < 0.5 ? 2*t*t : -1+(4-2*t)*t;
      const x = startCx + (bx - startCx) * ease;
      const y = startCy + (by - startCy) * ease;
      bpWin.style.left = `${x}px`;
      bpWin.style.top = `${y}px`;
      bpWin.style.opacity = `${1-t}`;
      bpWin.style.transform = `translate(-50%, -50%) scale(${1+0.2*(1-t)})`;
      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        bpWin.style.display = 'none';
      }
    }
    requestAnimationFrame(step);
  }
// script.js
// Load after DOM ready (safe even without defer)
document.addEventListener("DOMContentLoaded", () => {
    // --- Portal Sounds ---
    let portal1Audio = document.getElementById('portal1-audio');
    // Removed portal1-audio and portal2-audio setup (media files not present)

    window.playPortal1Sound = function() {
      portal1Audio.currentTime = 0;
      portal1Audio.play();
    };
    window.playPortal2Sound = function() {
      portal2Audio.currentTime = 0;
      portal2Audio.play();
    };
  // --- Live Comment Ticker Logic ---
  const commentStack = [
    {n: "Liam R.", a: 47, c: "Didn't expect that 😍"},
    {n: "Ava M.", a: 128, c: "Blessed today 🎉✨"},
    {n: "Noah K.", a: 87, c: "That spin was wild!"},
    {n: "Emma S.", a: 145, c: "Omg no way 😱✨"},
    {n: "Ethan L.", a: 103, c: "Worth every try ✨😊"},
    {n: "Olivia J.", a: 72, c: "Haha, small but sweet!"},
    {n: "Mason P.", a: 149, c: "That glow-up tho ✨🔥"},
    {n: "Sophia G.", a: 95, c: "Divine luck hit again 🌟"},
    {n: "Lucas D.", a: 120, c: "Feeling the Christmas magic ❄️"},
    {n: "Amelia C.", a: 118, c: "Unreal..I'm still shaking 🤯"},
    {n: "James H.", a: 67, c: "Gonna buy pizza 🍕"},
    {n: "Mia F.", a: 88, c: "Back-to-back wins? No way!"},
    {n: "Elijah T.", a: 82, c: "I knew this one felt right"},
    {n: "Isabella W.", a: 129, c: "Golden touch today 🏆"},
    {n: "Aiden N.", a: 93, c: "Almost hit 200 💯"},
    {n: "Charlotte R.", a: 115, c: "Okay now I believe 😇"},
    {n: "Logan E.", a: 92, c: "That spin sound=goosebumps"},
    {n: "Harper V.", a: 54, c: "Still counts ✨😊"},
    {n: "Benjamin L.", a: 133, c: "This wheel got blessings fr 🙏✨"},
    {n: "Ella D.", a: 124, c: "Feeling lucky tonight 🌙"},
    {n: "Oliver M.", a: 77, c: "Can't stop smiling 😄✨"},
    {n: "Evelyn K.", a: 110, c: "Phase 1 is pure magic 🎭✨"},
    {n: "Alexander G.", a: 76, c: "That was close!"},
    {n: "Abigail P.", a: 127, c: "Thank you Santa spirit 🎅🎄"},
    {n: "Daniel C.", a: 89, c: "Top tier spin 🔥😎"},
    {n: "Lily B.", a: 51, c: "Cute little win 🌸"},
    {n: "Henry T.", a: 130, c: "Holy spin 🤩✨"},
    {n: "Grace W.", a: 112, c: "Wallet's filling up fast 💰✨"},
    {n: "Jackson F.", a: 135, c: "Let's gooo 🚀"},
    {n: "Aria Q.", a: 81, c: "Snow blessings in real life ❄️✨"},
    {n: "Sebastian Y.", a: 91, c: "Missed the big one 😅✨"},
    {n: "Chloe J.", a: 140, c: "This is unreal 🌟✨"},
    {n: "Mateo L.", a: 75, c: "Got that divine spark ✨"},
    {n: "Scarlett Z.", a: 122, c: "One more spin 🎡✨"},
    {n: "Jack R.", a: 61, c: "Tiny but shiny ⭐"},
    {n: "Layla D.", a: 105, c: "My first big win!! 🎉🎉"},
    {n: "Owen K.", a: 99, c: "This phase hits diff 🔥🔥"},
    {n: "Mila C.", a: 78, c: "Almost there 😊✨"},
    {n: "Levi B.", a: 73, c: "That felt magical 🪄✨"},
    {n: "Nora T.", a: 109, c: "Not bad for one click 👌✨"},
    {n: "William S.", a: 138, c: "Fate's on my side 🌟🔮"},
    {n: "Zoey N.", a: 80, c: "Blessing storm incoming 🌪️✨🙏"},
    {n: "Luke J.", a: 132, c: "Got chills 😲✨"},
    {n: "Emily H.", a: 65, c: "That golden flash was lucky ✨"},
    {n: "Asher P.", a: 96, c: "Almost triple digits 💯🔥"},
    {n: "Camila R.", a: 120, c: "What a surprise 🎁✨"},
    {n: "Michael E.", a: 97, c: "I'm in shock rn 😲🤩"},
    {n: "Ella B.", a: 142, c: "Smooth and shiny spin ✨🎡"},
    {n: "Carter O.", a: 84, c: "Snowflakes brought me luck ❄️"},
    {n: "Luna M.", a: 128, c: "Heavenly timing 😇✨"},
  ];
  let lastCommentIdx = -1;
  let toastTimeout = null;
  let toastRemoveTimeout = null;
  let toastTimeAgoInterval = null;
  let toastStartTime = null;
  const ticker = document.getElementById('live-comment-ticker');
  // Removed bubbleSound (media file not present)

  // === Voice audio elements are now initialized in DOMContentLoaded handler above ===

  // === Background Music Already Initialized in Music Permission Handler ===
  // bgMusic is now defined before listeners to ensure it exists when button is clicked

  function pickRandomComment() {
    let idx;
    do {
      idx = Math.floor(Math.random() * commentStack.length);
    } while (idx === lastCommentIdx && commentStack.length > 1);
    lastCommentIdx = idx;
    return commentStack[idx];
  }

  function getTimeAgoLabel(secs) {
    if (secs < 1.5) return 'just now';
    if (secs < 60) return `${Math.floor(secs)} sec ago`;
    return `${Math.floor(secs/60)} min ago`;
  }

  function showCommentToast() {
    if (!ticker) return;
    // Only show in Phase 1
    var p1 = document.getElementById('p1');
    if (!p1 || !p1.classList.contains('active')) return;
    // Remove any existing toast
    ticker.innerHTML = '';
    if (toastRemoveTimeout) clearTimeout(toastRemoveTimeout);
    if (toastTimeAgoInterval) clearInterval(toastTimeAgoInterval);

    const c = pickRandomComment();
    toastStartTime = Date.now();
    // Dopamine: burst for wins > $100
    const burst = c.a > 100 ? `<span class="burst">${burstSVG()}</span>` : '';
    // Dopamine: trail emoji - use proper Unicode emoji codes
    const trail = c.a > 100 ? `<span class="trail">🎉</span>` : `<span class="trail">⭐</span>`;

    // Regional hint logic (4 in 10)
    let showRegion = Math.random() < 0.4;
    let region = '';
    if (showRegion) {
      // List of short city/country tags (Europe & America), no 'from'
      const regions = [
        'London, UK',
        'L Angles, US',
        'Montreal, CA',
        'Berlin, DE',
        'Paris, FR',
        'Madrid, ES',
        'NYC, US',
        'Boston, US',
        'Chicago, US',
        'Toronto, CA',
        'Rome, IT',
        'Vienna, AT',
        'Zurich, CH',
        'Dublin, IE',
        'Miami, US',
        'SF, US',
        'Oslo, NO',
        'Stockholm, SE',
        'Brussels, BE',
        'Lisbon, PT',
        'Warsaw, PL',
        'LA, US',
        'Seattle, US',
        'Copenhagen, DK',
        'Helsinki, FI',
        'Amsterdam, NL',
        'Prague, CZ',
        'Budapest, HU',
        'Porto, PT',
      ];
      region = regions[Math.floor(Math.random() * regions.length)];
    }

    const html = `
      <div class="comment-toast">
        ${trail}
        <div class="comment-main" style="align-items: flex-start; width: 100%;">
          <div class="comment-header" style="justify-content: space-between; align-items: center; width: 100%; position: relative;">
            <b style="color:#7fffbe;font-size:0.9em;">🏆 ${c.n} won <span class='comment-cash'><span class='cash-dollar'>$</span><span class='cash-amount' font-weight='400'>${c.a}</span></span></b>
            <span class="comment-meta" id="comment-timeago">just now</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; margin-top: 4px;">
            <div class="comment-body" style="text-align:left;"><span style="color:#fff;">💬 "${c.c}"</span></div>
            ${showRegion ? `<span class="comment-toast-region" style="font-size:0.75em;color:#bfc6d1;">${region}</span>` : ''}
          </div>
        </div>
        ${burst}
      </div>
    `;
    ticker.innerHTML = html;
    setTimeout(() => {
      const toast = ticker.querySelector('.comment-toast');
      if (toast) toast.classList.add('show');
    }, 10);
    // Play bubble sound (from Phase 1 loader)
    try {
      // Ensure global bubbleSound reference exists
      if (!window.bubbleSound) {
        window.bubbleSound = document.getElementById('bubble-audio');
      }
      const bubbleSound = window.bubbleSound;
      if (bubbleSound && bubbleSound.play) {
        bubbleSound.currentTime = 0;
        const playPromise = bubbleSound.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('✅ Bubble sound played successfully');
            })
            .catch(err => {
              if (err.name === 'NotAllowedError') {
                console.warn('⚠️ Bubble sound blocked by browser (autoplay policy):', err.name);
              } else if (err.name === 'NotSupportedError') {
                console.warn('⚠️ Bubble sound format not supported:', err.name);
              } else {
                console.warn('⚠️ Bubble sound playback error:', err.name, err.message);
              }
            });
        }
      } else {
        console.warn('⚠️ Bubble sound element not available');
      }
    } catch(e) {
      console.warn('⚠️ Bubble sound error:', e.name || 'Unknown', e.message || 'No details');
    }
    // Animate time ago
    toastTimeAgoInterval = setInterval(() => {
      const meta = document.getElementById('comment-timeago');
      if (meta) {
        const secs = (Date.now() - toastStartTime) / 1000;
        meta.textContent = getTimeAgoLabel(secs);
      }
    }, 1000);
    // Hide after 4s
    toastRemoveTimeout = setTimeout(() => {
      const toast = ticker.querySelector('.comment-toast');
      if (toast) toast.classList.add('hide');
      setTimeout(() => { ticker.innerHTML = ''; }, 400);
    }, 4000);
  }

  function burstSVG() {
    return `<svg width="80" height="80" viewBox="0 0 80 80"><g><circle cx="40" cy="40" r="24" fill="#ffe066" opacity="0.18"/><circle cx="40" cy="40" r="16" fill="#fffbe6" opacity="0.12"/><g stroke="#ffe066" stroke-width="2.5">${[...Array(12)].map((_,i)=>`<line x1="40" y1="8" x2="40" y2="20" transform="rotate(${i*30} 40 40)"/>`).join('')}</g></g></svg>`;
  }

  // Helper function to play voice with automatic background music ducking
  function playVoice(audioElement, onEndCallback) {
    if (!audioElement) {
      console.log('🔴 playVoice: audioElement is null or undefined');
      return;
    }
    try {
      console.log('✅ playVoice: Playing', audioElement.src);
      
      // CRITICAL: Stop ALL other voices first (prevent conflicts)
      const allVoices = [voiceV1, voiceV2_60, voiceV2_70, voiceV2_80, voiceV2_90, voiceV2_100, voiceV3, voiceV4A, voiceV4B, voiceV5, voiceV6, voiceV7, voiceV8];
      allVoices.forEach(v => {
        if (v && v !== audioElement && !v.paused) {
          console.log('⏹️ Stopping conflicting voice:', v.src);
          v.pause();
          v.currentTime = 0;
        }
      });
      
      // Reset current audio element
      audioElement.pause();
      audioElement.currentTime = 0;
      audioElement.volume = 1.0; // Voice at 100%
      
      // Ensure audio element is in DOM
      if (!audioElement.parentNode) {
        document.body.appendChild(audioElement);
      }
      
      // Duck background music volume when voice starts
      if (bgMusic) {
        bgMusic.volume = 0.15; // Reduce to 15% for clarity
        console.log('🎵 Background music ducked to 15%');
      }
      
      // When voice ends, restore background music volume and call optional callback
      const restoreVolume = () => {
        console.log('✅ Voice ended, restoring background music');
        if (bgMusic) {
          bgMusic.volume = 0.4; // Restore to normal (40%)
        }
        // Execute custom callback if provided
        if (onEndCallback && typeof onEndCallback === 'function') {
          onEndCallback();
        }
      };
      audioElement.onended = restoreVolume;
      
      // Play with proper error handling
      const playPromise = audioElement.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          console.log('✅ Voice playback started successfully:', audioElement.src);
        }).catch(e => {
          console.error('🔴 Voice play failed:', audioElement.src);
          console.error('   Error type:', e.name);
          console.error('   Error message:', e.message);
          
          // Restore volume immediately on error
          if (bgMusic) bgMusic.volume = 0.4;
          
          // Try to retry in 500ms
          console.log('⏳ Retrying voice playback in 500ms...');
          setTimeout(() => {
            audioElement.play().catch(retryError => {
              console.error('🔴 Retry failed:', retryError.name, retryError.message);
            });
          }, 500);
        });
      }
    } catch(e) {
      console.error('🔴 Exception in playVoice:', e.message);
    }
  }

  // Stop voice immediately and restore background music
  function stopVoice(audioElement) {
    if (!audioElement) return;
    try {
      if (!audioElement.paused) {
        audioElement.pause();
        audioElement.currentTime = 0;
        console.log('⏹️ Stopped voice:', audioElement.src);
      }
      if (bgMusic) {
        bgMusic.volume = 0.4; // Restore to normal immediately
        console.log('✅ Background music restored to 40%');
      }
    } catch(e) {
      console.error('❌ Error stopping voice playback:', e.message);
    }
  }

  // Global flag to track if wallet animations are paused
  let walletAnimationsPaused = false;

  // Pause wallet box animations
  function pauseWalletAnimations() {
    const boxes = document.querySelectorAll('.blessing-bubble');
    boxes.forEach(box => {
      box.classList.add('animation-paused');
    });
    walletAnimationsPaused = true;
    console.log('💰💰💰 Wallet animations paused');
  }

  // Resume wallet box animations
  function resumeWalletAnimations() {
    const boxes = document.querySelectorAll('.blessing-bubble');
    boxes.forEach(box => {
      box.classList.remove('animation-paused');
    });
    walletAnimationsPaused = false;
    console.log('🔄 Wallet animations resumed');
  }

  // Trigger sequential pop animations for suggestion boxes
  function triggerSuggestionBoxAnimations() {
    const boxes = document.querySelectorAll('.amount-suggestion-box');
    if (boxes.length === 0) {
      console.log('No suggestion boxes found');
      return;
    }
    
    boxes.forEach((box, index) => {
      // Total animation time per box: 0.8s up + 0.6s down = 1.4s
      // Add 200ms gap between boxes for clean separation
      const delayBeforeBox = (1.4 + 0.2) * index; // 1.6s total per box
      
      setTimeout(() => {
        box.classList.add('pop-up');
        console.log(`💚💛💜 Box ${index + 1} ($${[10, 20, 50, 100][index]}) gently appearing`);
        
        // Remove pop-up class and add pop-down after pop-up animation completes (0.8s)
        setTimeout(() => {
          box.classList.remove('pop-up');
          box.classList.add('pop-down');
          console.log(`💚💛💜 Box ${index + 1} ($${[10, 20, 50, 100][index]}) gently fading`);
          
          // Remove pop-down class after pop-down animation completes (0.6s)
          setTimeout(() => {
            box.classList.remove('pop-down');
          }, 600);
        }, 800); // Wait for pop-up animation to finish
      }, delayBeforeBox * 1000); // Convert to milliseconds
    });
  }

  // Background music plays continuously throughout the game
  // No phase switching needed

  function scheduleNextToast() {
    const nextMs = 4000 + Math.random() * 4000;
    toastTimeout = setTimeout(() => {
      showCommentToast();
      scheduleNextToast();
    }, nextMs);
  }

  // Start ticker
  showCommentToast();
  scheduleNextToast();
  // Tiny Reset button handler (Phase 2)
  const resetBtn = document.getElementById('resetAll');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      // Clear localStorage/sessionStorage if used
      if (window.localStorage) localStorage.clear();
      if (window.sessionStorage) sessionStorage.clear();
      // Optionally reset state variables if needed
      location.reload();
    });
  }
  // ---------- State ----------
  const S = {
    phase: 1,
    BP: 0,
    SB: 0,
    RS: 0,
    FS: 0,
    WB: 0,
    TB: 0,
    blessingDate: null,
    referral: { max: 5, list: [] },
    profile: null,
    hasSpun: false, // Prevents user from spinning wheel more than once per session
  };

  let lastAnimatedBP = 0; // Track last BP value that was animated

  const $ = (s) => document.querySelector(s);
// show integer only
const fmt$ = (n) => `$${Math.round(n || 0)}`;

  const save = () => {
    try {
      localStorage.setItem("dw_mobile", JSON.stringify(S));
      console.log('✅ Game state saved to localStorage');
    } catch (e) {
      if (e.name === 'QuotaExceededError') {
        console.warn('⚠️ localStorage quota exceeded - save failed');
      } else if (e.name === 'SecurityError') {
        console.warn('⚠️ localStorage disabled (private mode detected)');
      } else {
        console.error('❌ Error saving game state:', e.message);
      }
    }
  };
  const load = () => {
    try {
      const x = JSON.parse(localStorage.getItem("dw_mobile"));
      if (x) {
        Object.assign(S, x);
        console.log('✅ Game state loaded from localStorage');
      }
    } catch (e) {
      console.warn('⚠️ Failed to load saved state, using defaults:', e.message);
    }
  };

  // ---------- Journey bar ----------
  function renderJourney() {
    const j = $("#journey");
    if (!j) return;
    j.querySelectorAll(".dot").forEach((d) => d.remove());
    j.querySelectorAll('.track-segment').forEach(e => e.remove());
    const padL = 20,
      padR = 20,
      w = Math.max(0, j.clientWidth - padL - padR);
    const n = 5;
    // Add 4 segments (between 5 dots)
    for (let i = 0; i < n - 1; i++) {
      const seg = document.createElement('div');
      seg.className = 'track-segment';
      seg.style.position = 'absolute';
      seg.style.top = '13px';
      seg.style.height = '2.5px';
      seg.style.width = (w / (n - 1)) + 'px';
      seg.style.left = (padL + i * (w / (n - 1))) + 'px';
      seg.style.borderRadius = '2px';
      seg.style.opacity = '0.95';
      // Solid or dotted
      if (i < S.phase - 1) {
        seg.style.background = 'linear-gradient(90deg, var(--combo1-yellow) 0%, var(--combo1-red) 50%, var(--combo1-green) 100%)';
      } else {
        seg.style.background = 'repeating-linear-gradient(90deg, var(--combo1-yellow) 0 6px, transparent 6px 18px)';
      }
      j.appendChild(seg);
    }
    for (let i = 1; i <= n; i++) {
      const dot = document.createElement("div");
      dot.className = "dot";
      dot.style.left = padL + (w * (i - 1)) / (n - 1) + "px";
      dot.textContent = i;
      if (i <= S.phase) dot.classList.add("filled");
      if (i <= S.phase) {
        dot.classList.add("tap");
        dot.addEventListener("click", () => showPhase(i));
      }
      j.appendChild(dot);
    }
  }

  // ---------- Count-Up Animation for Wallet Values ----------
  function animateWalletCountUp(elementId, startValue, endValue, durationMs, isDummy = false) {
    const el = document.getElementById(elementId);
    if (!el) return Promise.resolve();

    return new Promise((resolve) => {
      const startTime = Date.now();
      const formatValue = (val) => isDummy ? `$${Math.round(val)}` : fmt$(Math.round(val));
      
      function update() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        const currentValue = startValue + (endValue - startValue) * progress;
        
        el.textContent = formatValue(currentValue);
        
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          // Final value
          el.textContent = formatValue(endValue);
          // Trigger shake animation
          triggerWalletShake(elementId);
          resolve();
        }
      }
      
      update();
    });
  }

  // Shake animation for wallet boxes when count-up completes
  function triggerWalletShake(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;
    
    // Remove any existing animation
    el.style.animation = '';
    
    // Trigger reflow to restart animation
    void el.offsetWidth;
    
    // Apply shake animation once
    el.style.animation = 'wallet-shake 0.5s ease-in-out forwards';
  }

  // ---------- Maths ----------
  function recalc() {
    // Cap BP at 151% to prevent abuse
    S.BP = Math.min(151, Math.max(0, S.BP));
    S.FS = Math.max(0, S.BP); // Fate Score equals BP directly
    S.RS = Math.max(0, S.SB * 2);
    S.WB = S.SB * (S.FS / 100);
    S.TB = S.SB + S.WB;
    updateMatrix();
    save();
    renderJourney();
  }
  // Track current tier for transition detection
  let currentTierIndex = 0;
  const tierLevels = [
    { name: "Card", index: 0, className: "tier-yellow", minTS: -Infinity },
    { name: "Red", index: 1, className: "tier-red", minTS: 1 },
    { name: "Green", index: 2, className: "tier-green", minTS: 81 },
    { name: "Black", index: 3, className: "tier-black", minTS: 101 },
    { name: "Aura", index: 4, className: "tier-aura", minTS: 121 }
  ];

  // Get tier info by TS value
  function getTierByTS(ts) {
    for (let i = tierLevels.length - 1; i >= 0; i--) {
      if (ts >= tierLevels[i].minTS) {
        return tierLevels[i];
      }
    }
    return tierLevels[0];
  }

  // Animated tier transition with journey walk-through
  function animateTierTransition(fromTierIndex, toTierIndex) {
    if (fromTierIndex === toTierIndex) return;
    
    const blessingMain = $("#blessingMain");
    if (!blessingMain) return;

    const direction = toTierIndex > fromTierIndex ? 1 : -1;
    const tierPath = [];
    
    // Build path from current to target tier
    for (let i = fromTierIndex; i !== toTierIndex; i += direction) {
      tierPath.push(tierLevels[i]);
    }
    tierPath.push(tierLevels[toTierIndex]);

    // Animate through each tier (1 second each)
    let delay = 0;
    tierPath.forEach((tierInfo, idx) => {
      setTimeout(() => {
        // Update classes
        tierLevels.forEach(t => blessingMain.classList.remove(t.className));
        blessingMain.classList.add(tierInfo.className);
        
        // Add transition animation
        blessingMain.classList.remove('tier-transitioning', 'tier-glow');
        void blessingMain.offsetWidth; // Reflow trigger
        blessingMain.classList.add('tier-transitioning', 'tier-glow');

        // Show tier number in center (journey counter)
        if (idx < tierPath.length - 1) { // Don't show on final tier
          showTierCounter(tierInfo.index + 1);
        }

        // Flash effect
        showTierFlash();
        
        // Play whoosh sound (optional - placeholder)
        playTierSound();

      }, delay);
      
      delay += 1000; // 1 second per tier transition
    });

    currentTierIndex = toTierIndex;
  }

  // Show animated tier number rising from bottom
  function showTierCounter(tierNumber) {
    const counter = document.createElement('div');
    counter.className = 'tier-journey-counter';
    counter.textContent = tierNumber;
    document.body.appendChild(counter);
    
    setTimeout(() => counter.remove(), 1200);
  }

  // Flash effect during transition
  function showTierFlash() {
    const flash = document.createElement('div');
    flash.className = 'tier-journey-flash';
    document.body.appendChild(flash);
    
    setTimeout(() => flash.remove(), 1000);
  }

  // Play tier transition sound (placeholder)
  function playTierSound() {
    try {
      // Optional: Create or use an audio element
  // Removed tierSound (media file not present)
      // tierSound.volume = 0.3;
      // tierSound.play().catch(() => {});
    } catch (e) {}
  }

  function updateMatrix() {
    // If dummy is active and no real SB entered, show dummy in white glassy style
    if (S._dummyUsed && (!S.SB || S.SB === 0)) {
      if ($("#sb")) { $("#sb").textContent = `$${S._dummySB}`; $("#sb").classList.add('dummy-result'); }
      if ($("#wb")) { $("#wb").textContent = `$${S._dummyWB}`; $("#wb").classList.add('dummy-result'); }
      if ($("#tb")) { $("#tb").textContent = `$${S._dummyTB}`; $("#tb").classList.add('dummy-result'); }
    } else {
      if ($("#sb")) { $("#sb").textContent = fmt$(S.SB); $("#sb").classList.remove('dummy-result'); $("#sb").style.color = ''; }
      if ($("#wb")) { $("#wb").textContent = fmt$(S.WB); $("#wb").classList.remove('dummy-result'); $("#wb").style.color = ''; }
      if ($("#tb")) { $("#tb").textContent = fmt$(S.TB); $("#tb").classList.remove('dummy-result'); $("#tb").style.color = ''; }
    }
  if ($("#bp")) {
    $("#bp").textContent = Math.round(S.BP) + "%";
    // Trigger pop animation only if BP increased (not on initial load)
    if (S.BP > lastAnimatedBP && S.BP > 0) {
      lastAnimatedBP = S.BP;
      const bpStatBox = document.querySelector('.bp-stat-box');
      if (bpStatBox) {
        bpStatBox.classList.remove('pop-animate');
        void bpStatBox.offsetWidth; // Trigger reflow to restart animation
        bpStatBox.classList.add('pop-animate');
      }
    }
  }
    if ($("#fs")) $("#fs").textContent = Math.round(S.FS);
    if ($("#rs")) $("#rs").textContent = Math.round(S.RS);
    const TS = Math.round(S.FS + S.RS);
    if ($("#ts")) $("#ts").textContent = TS;
    
    // Get new tier
    const newTier = getTierByTS(TS);
    const newTierIndex = newTier.index;
    
    // Trigger transition animation if tier changed
    if (newTierIndex !== currentTierIndex) {
      animateTierTransition(currentTierIndex, newTierIndex);
    }
    
    // Ensure classes are applied even without transition
    const blessingMain = $("#blessingMain");
    if (blessingMain) {
      tierLevels.forEach(t => blessingMain.classList.remove(t.className));
      blessingMain.classList.add(newTier.className);
    }
    
    if ($("#tierTxt")) $("#tierTxt").textContent = newTier.name ;
    const hint =
      "=0 Yellow � 1–80 Red � 81–100 Green � 101–120 Black � =121 Aura";
    if ($("#tierHint")) $("#tierHint").textContent = hint;
  }

  // ---------- Phases ----------
  function showPhase(n) {
    S.phase = n;
    save();
    ["p1", "p2", "p3", "p4", "p5"].forEach((id, i) => {
      const el = document.getElementById(id);
      if (el) el.classList.toggle("active", i === n - 1);
    });
    
    // === Logo Switching for Each Phase ===
    const logo = document.getElementById('main-logo');
    if (logo) {
  logo.src = 'phase-1-media/logo1.gif';
  console.log('🔄 Logo set to logo1.gif (only logo used)');
    }
    
    // Add/remove .phase2-active and .phase1-noscroll on <body>
    if (n === 2) {
      document.body.classList.add('phase2-active');
      console.log('📦 Entering Phase 2 - switching to bgMusicB');
      audioLoader.loadPhase4();  // Preload Phase 4 while in Phase 2
    } else {
      document.body.classList.remove('phase2-active');
    }
    if (n === 1) {
      document.body.classList.add('phase1-noscroll');
    } else {
      document.body.classList.remove('phase1-noscroll');
    }
    renderJourney();
    try {
      if (typeof updateHasFallbacks === "function") updateHasFallbacks();
    } catch (e) {}
    // Remove snow effect in Phase 4 and 5
    if (n === 4 || n === 5) {
      stopSnow();
    } else {
      const snow = document.getElementById('snow-canvas');
      if (snow) snow.style.display = '';
      startSnow();
    }
    
    // Hide wallet boxes in Phase 4 (date wheel spinning)
    // Show them only in Phase 5 when user transitions to referral section
    const walletBoxes = document.getElementById('walletBoxes');
    if (walletBoxes) {
      if (n === 4) {
        walletBoxes.style.display = 'none';
        console.log('🎡 Phase 4: Hiding wallet boxes for date wheel');
      } else if (n === 5) {
        walletBoxes.style.display = 'none';  // Start hidden in Phase 5, show only when referral section appears
        console.log('🔐 Phase 5: Wallet boxes initially hidden, will show when referral section appears');
      }
    }
    
    // Background music plays continuously throughout all phases
    // Switch to bgMusicB (ph1bgb) when entering Phase 2+
    if (n >= 2 && bgMusicB && bgMusic && !bgMusic.paused) {
      console.log('🎵 Switching to bgMusicB for phases 2-5');
      bgMusic.pause();
      bgMusicB.currentTime = bgMusic.currentTime;  // Maintain continuity
      bgMusicB.play().catch(e => console.error('Failed to play bgMusicB:', e.message));
    }
    
    // Load audio for each phase
    if (n === 3) {
      audioLoader.loadPhase3();
    } else if (n === 4) {
      audioLoader.loadPhase4();
    } else if (n === 5) {
      audioLoader.loadPhase5();
    }
    
    // Play phase entry voices
    if (n === 1) {
      setTimeout(() => playVoice(voiceV1), 500);
    } else if (n === 5) {
      setTimeout(() => playVoice(voiceV7), 500);
    }
  }

  // Add event listener for skip button (Phase 1)
  document.addEventListener('DOMContentLoaded', function() {
    var skipBtn = document.getElementById('skipToP5');
    if (skipBtn) {
      skipBtn.onclick = function() {
        showPhase(5);
      };
    }
  });

  // ---------- BP float animation ----------
  function floatBP(text) {
    // Prefer the visible `#bpWinFloat` element; fallback to legacy `#float`.
    let f = document.getElementById('bpWinFloat') || $("#float");
    if (!f) return;
    f.textContent = text;
    f.style.display = "block";
    f.style.opacity = "1";
    // If we're in Phase 1, start 3cm above the current center position
    const frames = S && S.phase === 1
      ? [
          { transform: "translate(-50%, calc(-50% - 3cm))", opacity: 0 },
          { transform: "translate(-50%, -50%)", opacity: 1 },
          { transform: "translate(-50%, -60px)", opacity: 0 },
        ]
      : [
          { transform: "translate(-50%, -40px)", opacity: 0 },
          { transform: "translate(-50%, -50%)", opacity: 1 },
          { transform: "translate(-50%, -60px)", opacity: 0 },
        ];

    f.animate(frames, { duration: 1200, easing: 'cubic-bezier(.17,.67,.36,1)' });
    setTimeout(() => {
      f.style.display = "none";
    }, 1200);
  }


      // --- Electric Spark Effect for Phase 2 ---
      // Create a container for sparks if not present
      let sparkContainer = document.getElementById('spark-container');
      if (!sparkContainer) {
        sparkContainer = document.createElement('div');
        sparkContainer.id = 'spark-container';
        sparkContainer.style.position = 'fixed';
        sparkContainer.style.left = '0';
        sparkContainer.style.top = '0';
        sparkContainer.style.width = '100vw';
        sparkContainer.style.height = '100vh';
        sparkContainer.style.pointerEvents = 'none';
        sparkContainer.style.zIndex = '1000';
        document.body.appendChild(sparkContainer);
      }

      // Spark colors
      // Spark image filenames
      // Each spark image has a 25% chance
      const sparkImages = [
        'site-asse-voices/spark1.webp',
        'site-asse-voices/spark2.webp',
        'site-asse-voices/spark3.webp',
        'site-asse-voices/spark4.webp'
      ];

      function getRandomSparkImage() {
        // 25% chance for each
        const idx = Math.floor(Math.random() * 4);
        return sparkImages[idx];
      }

      // Glitch sound
      let glitchAudio;
      try {
  // Removed glitchAudio (media file not present)
      } catch (e) {}

      // Spark effect logic
      let sparkPhase2Active = false;
      function startSparkLoop() {
        if (sparkPhase2Active) return;
        sparkPhase2Active = true;
        function spawnSpark() {
          if (!sparkPhase2Active) return;
          // Only run if Phase 2 is active
          const p2Active = document.querySelector('#p2.active');
          if (!p2Active) {
            sparkPhase2Active = false;
            return;
          }
      // Random position (avoid edges)
      const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      const x = Math.random() * (vw - 60) + 30;
      const y = Math.random() * (vh - 60) + 30;
      const imgSrc = getRandomSparkImage();
      // Create a wrapper for spark and lightning overlay
      const sparkWrapper = document.createElement('div');
      sparkWrapper.className = 'electric-spark';
      sparkWrapper.style.position = 'absolute';
      sparkWrapper.style.left = `${x}px`;
      sparkWrapper.style.top = `${y}px`;
      sparkWrapper.style.width = '38px';
      sparkWrapper.style.height = '76px';
      sparkWrapper.style.pointerEvents = 'none';
      sparkWrapper.style.zIndex = '1001';

      // Spark image
      const sparkImg = document.createElement('img');
      sparkImg.src = imgSrc;
      sparkImg.alt = 'spark';
      sparkImg.style.width = '38px';
      sparkImg.style.height = '76px';
      sparkImg.style.position = 'absolute';
      sparkImg.style.left = '0';
      sparkImg.style.top = '0';
      sparkImg.style.pointerEvents = 'none';

      // Lightning overlay SVG
      const lightning = document.createElement('div');
      lightning.style.position = 'absolute';
      lightning.style.left = '12px'; // center horizontally (narrow)
      lightning.style.top = '38px';  // start from middle/lower part
      lightning.style.width = '14px';
      lightning.style.height = '38px';
      lightning.style.pointerEvents = 'none';
      lightning.innerHTML = `<svg width="14" height="38" viewBox="0 0 14 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polyline points="7,2 9,14 5,20 10,28 6,36" stroke="#fffbe6" stroke-width="2.1" fill="none" filter="url(#lightglow)"/>
        <defs><filter id="lightglow"><feGaussianBlur stdDeviation="1.5" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
      </svg>`;

      sparkWrapper.appendChild(sparkImg);
      sparkWrapper.appendChild(lightning);
      sparkContainer.appendChild(sparkWrapper);
          // Play glitch sound
          if (glitchAudio) {
            try {
              glitchAudio.currentTime = 0;
              glitchAudio.play();
            } catch (e) {}
          }
          setTimeout(() => {
      sparkWrapper.remove();
          }, 1000);
      // Next spark in 1.4–3.0s (half as frequent)
      setTimeout(spawnSpark, 1400 + Math.random() * 1600);
        }
        spawnSpark();
      }

      // Monitor phase changes to start/stop sparks
      function monitorPhase2Sparks() {
        const observer = new MutationObserver(() => {
          const p2Active = document.querySelector('#p2.active');
          if (p2Active && !sparkPhase2Active) {
            startSparkLoop();
          } else if (!p2Active && sparkPhase2Active) {
            sparkPhase2Active = false;
          }
        });
        observer.observe(document.body, { attributes: true, childList: true, subtree: true });
        // Initial check
        if (document.querySelector('#p2.active')) startSparkLoop();
      }
      monitorPhase2Sparks();

      // Background music now plays continuously throughout all phases
      // (no phase-specific music switching needed)

  // ---------- Wheels (SVG) ----------
  function drawWheel(svg, labels) {
    if (!svg) return;
    svg.innerHTML = "";
    const cx = 50, cy = 50, r = 48, n = labels.length;
    // --- Gold border gradient ---
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const goldGrad = document.createElementNS("http://www.w3.org/2000/svg", "radialGradient");
    goldGrad.setAttribute("id", "wheel-gold-gradient");
    goldGrad.setAttribute("cx", "50%");
    goldGrad.setAttribute("cy", "50%");
    goldGrad.setAttribute("r", "50%");
    goldGrad.innerHTML = `
      <stop offset='0%' stop-color='#ffde59ff'/>
      <stop offset='70%' stop-color='#e20505ff'/>
      <stop offset='100%' stop-color='#000000ff'/>
    `;
    defs.appendChild(goldGrad);
    svg.appendChild(defs);

    // --- Draw slices ---
    // Darker, high-contrast slice colors for readability
    const sliceColors = [
      '#006600', // dark blue
      '#006600', // dark teal
      '#3d0c02      ', // dark gray
      '#3d0c02     ', // dark red
      '#3d0c02  ', // dark purple
      '#8b0000 ', // blue gray
      '#8b0000 '  // almost black
    ];
    for (let i = 0; i < n; i++) {
      const a0 = (2 * Math.PI * i) / n,
        a1 = (2 * Math.PI * (i + 1)) / n;
      const x0 = cx + r * Math.cos(a0),
        y0 = cy + r * Math.sin(a0);
      const x1 = cx + r * Math.cos(a1),
        y1 = cy + r * Math.sin(a1);
      const largeArc = a1 - a0 > Math.PI ? 1 : 0;
      const path = `M ${cx} ${cy} L ${x0} ${y0} A ${r} ${r} 0 ${largeArc} 1 ${x1} ${y1} Z`;
      const slice = document.createElementNS("http://www.w3.org/2000/svg", "path");
      slice.setAttribute("d", path);
      slice.setAttribute("fill", sliceColors[i % sliceColors.length]);
      slice.setAttribute("stroke", "#ffd700   ");
      slice.setAttribute("stroke-width", "0.5");
      svg.appendChild(slice);

      // label
      const la = (a0 + a1) / 2;
  let lx = cx + r * 0.28 * Math.cos(la);
  let ly = cy + r * 0.28 * Math.sin(la);
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("dominant-baseline", "middle");
      text.setAttribute("font-size", "8.5");
      text.setAttribute("font-weight", "bold");
      // Use a shining silver gradient for all themes
      if (!svg.querySelector('#wheel-label-gradient-silver')) {
        const labelGradSilver = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
        labelGradSilver.setAttribute("id", "wheel-label-gradient-silver");
        labelGradSilver.setAttribute("x1", "0%");
        labelGradSilver.setAttribute("y1", "0%");
        labelGradSilver.setAttribute("x2", "100%");
        labelGradSilver.setAttribute("y2", "100%");
        labelGradSilver.innerHTML = `
          <stop offset='10%' stop-color='#f0e68c'/>
          <stop offset='50%' stop-color='#eee8aa'/>
          <stop offset='40%' stop-color='#ffdf00'/>
          <stop offset='100%' stop-color='#faf0be'/>
        `;
        svg.querySelector('defs').appendChild(labelGradSilver);
      }
      text.setAttribute("fill", "url(#wheel-label-gradient-silver)");
      text.textContent = labels[i];
      // Custom tilt and position for each label
      let labelConfig = [
        {dist: 0.59, angle: +25}, // +100 BP
        {dist: 0.58, angle: +75}, // +50 BP
        {dist: 0.56, angle: +120}, // +60 BP
        {dist: 0.56, angle: +180}, // +70 BP
        {dist: 0.56, angle: -129}, // +80 BP
  {dist: 0.56, angle: -85},// +200 BP
        {dist: 0.56, angle: -30}  // +110 BP
      ];
      let config = labelConfig[i] || {dist: 0.56, angle: -76};
      lx = cx + r * config.dist * Math.cos(la);
      ly = cy + r * config.dist * Math.sin(la);
      text.setAttribute("x", lx);
      text.setAttribute("y", ly);
      text.setAttribute("transform", `rotate(${config.angle} ${lx} ${ly})`);
      svg.appendChild(text);
    }

    // --- Draw slim gold border ---
    const border = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    border.setAttribute("cx", cx);
    border.setAttribute("cy", cy);
    border.setAttribute("r", r);
    border.setAttribute("fill", "none");
    border.setAttribute("stroke", "url(#wheel-gold-gradient)");
    border.setAttribute("stroke-width", "3.2");
    border.setAttribute("filter", "drop-shadow(0 0 4px #000d9fff)");
    svg.appendChild(border);

    // --- Draw glowing rim bulbs ---
    for (let i = 0; i < n; i++) {
      const angle = (2 * Math.PI * i) / n;
      const dotCx = cx + (r - 1.5) * Math.cos(angle);
      const dotCy = cy + (r - 1.5) * Math.sin(angle);
      const bulb = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      bulb.setAttribute("cx", dotCx);
      bulb.setAttribute("cy", dotCy);
      bulb.setAttribute("r", "2.1");
      bulb.setAttribute("fill", "#f1f1f1ff");
      bulb.setAttribute("stroke", "#ffd700 ");
      bulb.setAttribute("stroke-width", "0.7");
      bulb.setAttribute("filter", "drop-shadow(0 0 6px #ffd700), drop-shadow(0 0 12px #fffbe6)");
      svg.appendChild(bulb);
    }

    // --- Draw gold star in center ---
    const star = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    const starPoints = [];
    const starR = 6, starR2 = 2.5;
    for (let i = 0; i < 10; i++) {
      const a = Math.PI / 5 * i - Math.PI / 2;
      const rCur = i % 2 === 0 ? starR : starR2;
      starPoints.push([
        cx + rCur * Math.cos(a),
        cy + rCur * Math.sin(a)
      ].join(","));
    }
  star.setAttribute("points", starPoints.join(" "));
  star.setAttribute("fill", "#000000ff");
  star.setAttribute("stroke", "#ffd900ff");
  star.setAttribute("stroke-width", "0.8");
  star.setAttribute("filter", "drop-shadow(0 0 8px #891414ff), drop-shadow(0 0 16px #fffbe6)");
  svg.appendChild(star);

    // --- Draw gold pointer ---
    if (!svg.querySelector('#wheelPointer')) {
      const pointer = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      // Pointer at right edge
      const px = cx + r + 10;
      const py = cy;
      pointer.setAttribute("id", "wheelPointer");
      pointer.setAttribute("points",
        `${px},${py} ${px+10},${py-7} ${px+10},${py+7}`
      );
      pointer.setAttribute("fill", "#67ef0cff");
      pointer.setAttribute("stroke", "#eae9e5ff");
      pointer.setAttribute("stroke-width", "1.2");
      pointer.setAttribute("filter", "drop-shadow(0 0 4px #faed3aff)");
      svg.appendChild(pointer);
    }
  }

  // drawCustomWheel: supports non-uniform slice angles (degrees clockwise)
  function drawCustomWheel(svg, slices) {
    if (!svg) return;
    svg.innerHTML = "";
    const cx = 50, cy = 50, r = 48;
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    svg.appendChild(defs);
    // simple gold gradient used for border
    const goldGrad = document.createElementNS("http://www.w3.org/2000/svg", "radialGradient");
    goldGrad.setAttribute("id", "wheel-gold-gradient-custom");
    goldGrad.setAttribute("cx", "50%");
    goldGrad.setAttribute("cy", "50%");
    goldGrad.setAttribute("r", "50%");
    goldGrad.innerHTML = `\n      <stop offset='0%' stop-color='#ffde59ff'/>\n      <stop offset='70%' stop-color='#e20505ff'/>\n      <stop offset='100%' stop-color='#000000ff'/>\n    `;
    defs.appendChild(goldGrad);

    function degToRad(d) { return (d % 360) * Math.PI / 180; }
    function normDeg(d) { let v = d % 360; if (v < 0) v += 360; return v; }

    const sliceColors = ['#006600','#3d0c02','#8b0000','#4ecbfc','#ffb347'];

    slices.forEach((s, i) => {
      const start = normDeg(s.start);
      const end = normDeg(s.end);
      const sweep = ((end - start + 360) % 360) || 360;
      const a0 = degToRad(start);
      const a1 = degToRad((start + sweep) % 360);
      const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
      const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
      const largeArc = sweep > 180 ? 1 : 0;
      const path = `M ${cx} ${cy} L ${x0} ${y0} A ${r} ${r} 0 ${largeArc} 1 ${x1} ${y1} Z`;
      const slice = document.createElementNS("http://www.w3.org/2000/svg", "path");
      slice.setAttribute("d", path);
      slice.setAttribute("fill", sliceColors[i % sliceColors.length]);
      slice.setAttribute("stroke", "#ffd700");
      slice.setAttribute("stroke-width", "0.5");
      svg.appendChild(slice);

      // label at middle angle
      const mid = normDeg(start + sweep / 2);
      const ma = degToRad(mid);
      const lx = cx + r * 0.28 * Math.cos(ma);
      const ly = cy + r * 0.28 * Math.sin(ma);
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("dominant-baseline", "middle");
      text.setAttribute("font-size", "8.5");
      text.setAttribute("font-weight", "bold");
      text.setAttribute("fill", "#fafafa");
      text.textContent = s.label;
      text.setAttribute("x", lx);
      text.setAttribute("y", ly);
      svg.appendChild(text);
    });

    // border
    const border = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    border.setAttribute("cx", cx);
    border.setAttribute("cy", cy);
    border.setAttribute("r", r);
    border.setAttribute("fill", "none");
    border.setAttribute("stroke", "url(#wheel-gold-gradient-custom)");
    border.setAttribute("stroke-width", "3.2");
    svg.appendChild(border);

    // pointer (right side)
    if (!svg.querySelector('#wheelPointer')) {
      const pointer = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      const px = cx + r + 10;
      const py = cy;
      pointer.setAttribute("id", "wheelPointer");
      pointer.setAttribute("points", `${px},${py} ${px+10},${py-7} ${px+10},${py+7}`);
      pointer.setAttribute("fill", "#67ef0cff");
      pointer.setAttribute("stroke", "#eae9e5ff");
      pointer.setAttribute("stroke-width", "1.2");
      svg.appendChild(pointer);
    }
  }

  /* spinWheel adjusted for LEFT-side pointer:
     target = 180 - (pickIndex + 0.5) * seg
  */
  function spinWheel(svg, labels, pickIndex, cb) {
    if (!svg) { cb && cb(); return; }
    const n = labels.length;
    const seg = 360 / n;
    const pointerOffset = 5; // degrees, tweak as needed for perfect alignment
    const baseSpins = 360 * 6; // full spins
    const target = 180 - (pickIndex + 0.5) * seg + pointerOffset;
    const jitter = Math.floor(Math.random() * 10 - 5);
    const to = baseSpins + target + jitter;
    svg.style.transition = "transform 2.4s cubic-bezier(.17,.67,.36,1)";
    svg.style.transform = `rotate(${to}deg)`;
    setTimeout(() => {
      // Only keep the wheel at the final clockwise position, do not spin back or reverse
      cb && cb();
    }, 2400);
  }

  // ---------- Build UI & Wire events ----------
  load();

  // ANTI-SPAM: Enforce one spin per session rule
  // If user somehow gets to another phase without spinning, return them to Phase 1
  if (S.phase === 1 && !S.hasSpun) {
    // User is in phase 1 and hasn't spun - this is correct state
    showPhase(1);
  } else if (!S.hasSpun) {
    // User somehow advanced to another phase without spinning - revert to phase 1
    console.warn('User attempted to advance without spinning wheel. Returning to Phase 1.');
    S.phase = 1;
    save();
    showPhase(1);
  }

  // Wheels
  const bpVals = [+60, 70, 80, 90, 100, -50, -100];
  const bpWheelEl = $("#bpWheel");
  if (bpWheelEl) drawWheel(bpWheelEl, bpVals.map((v) => {
    // Display BP values without emojis
    return `${v} BP`;
  }));
  // Date wheel slices (non-uniform angles clockwise).
  // Slices provided by product owner:
  // Slice 1 (315° → 35°) → "14 Feb"
  // Slice 2 (35° → 75°) → "15 Jan"
  // Slice 3 (75° → 155°) → "100D"
  // Slice 4 (155° → 235°) → "25 March"
  // Slice 5 (235° → 315°) → "07 Apr"
  const dateSlices = [
    { label: "14 Feb", start: 315, end: 35 },
    { label: "15 Jan", start: 35, end: 75 },
    { label: "100D", start: 75, end: 155 },
    { label: "25 March", start: 155, end: 235 },
    { label: "07 Apr", start: 235, end: 315 },
  ];
  // dateWheel may be rendered as an SVG with id="dateWheel" or as an image (#dateWheelImg) or canvas (#dateWheelCanvas)
  const dateWheelSvg = $("#dateWheel");
  const dateWheelImg = document.getElementById('dateWheelImg');
  const dateWheelCanvas = document.getElementById('dateWheelCanvas');
  // Use whichever element exists as the rotation target. Prefer SVG for drawing.
  const dateWheelEl = dateWheelSvg || dateWheelImg || dateWheelCanvas;
  if (dateWheelSvg) {
    try {
      drawCustomWheel(dateWheelSvg, dateSlices);
      console.log('✅ Date wheel rendered successfully');
    } catch (e) {
      console.error('❌ drawCustomWheel failed:', {
        message: e.message,
        stack: e.stack,
        dateSlices: dateSlices?.length
      });
      // Fallback: Show placeholder
      dateWheelSvg.innerHTML = '<text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="white">Wheel unavailable</text>';
    }
  } else if (dateWheelImg) {
    // keep the static image; rotation will be applied to this image element when spinning
    // ensure it is styled to allow transforms
    dateWheelImg.style.transformOrigin = '50% 50%';
  } else if (dateWheelCanvas) {
    dateWheelCanvas.style.transformOrigin = '50% 50%';
  }

  // Journey
  renderJourney();

  // Matrix restore
  recalc();

  // --- Fixed Phase 1 actions ---
  const spinBpBtn = $("#spinBp");
  if (spinBpBtn) {
    spinBpBtn.addEventListener("click", () => {
      console.log('🎯 SPIN BUTTON CLICKED!');
      
      // ⭐ PHASE 2 TRIGGER: Load Payhip and payment scripts on first spin
      if (window.Phase2PayhipLoader && !Phase2PayhipLoader.isLoaded) {
        console.log('🚀 Triggering Phase 2: Loading Payhip on user interaction...');
        Phase2PayhipLoader.loadPayhip().catch(error => {
          console.error('⚠️ Payhip load error (non-blocking):', error);
          // Continue regardless - Phase 1 wheel spin must not be blocked
        });
      }
      
      // Change hint text when spinning - find the hint div in Phase 1
      const hintEls = document.querySelectorAll("#p1 .hint");
      if (hintEls.length > 0) {
        hintEls[0].textContent = "This path is voluntary, Nothing is taken from you--only added to your journey. Don't Miss out!";
      }
      
      // Load Phase 1 Spin audio before spinning
      audioLoader.loadPhase1Spin();
      
      // Stop V1 voice if it's playing when spin button is clicked
      stopVoice(voiceV1);
      
      // Play spinning wheel sound
      let wheelAudio = document.getElementById('wheelAudio');
      if (!wheelAudio) {
        wheelAudio = document.createElement('audio');
        wheelAudio.id = 'wheelAudio';
        wheelAudio.src = 'phase-1-media/wheelbackground.mp3';
        wheelAudio.preload = 'none';
        wheelAudio.style.display = 'none';
        document.body.appendChild(wheelAudio);
      }
      wheelAudio.currentTime = 0;
      wheelAudio.play();
      wheelAudio.onended = function() {
        wheelAudio.currentTime = 0;
      };
      spinBpBtn.disabled = true;
      pauseWalletAnimations();
      if ($("#bpOutcome")) $("#bpOutcome").textContent = "Spinning ✨ ✨";

      // Only allow positive BP values (20% each): +60, +70, +80, +90, +100
      const allowedIndices = [
        { idx: 0, w: 1 }, // +60 BP - 20%
        { idx: 1, w: 1 }, // +70 BP - 20%
        { idx: 2, w: 1 }, // +80 BP - 20%
        { idx: 3, w: 1 }, // +90 BP - 20%
        { idx: 4, w: 1 }, // +100 BP - 20%
      ];

      function weightedIdxPick(weights) {
        const sum = weights.reduce((a, b) => a + b.w, 0);
        let r = Math.random() * sum;
        for (const it of weights) {
          if (r < it.w) return it.idx;
          r -= it.w;
        }
        return weights[weights.length - 1].idx;
      }

      const idx = weightedIdxPick(allowedIndices);
      spinWheel(bpWheelEl, bpVals, idx, () => {
        console.log('🎡 SPIN CALLBACK FIRED - Wheel spin completed!');
        const bpWon = bpVals[idx];
        S.BP += bpWon;
        recalc();
        if ($("#bpOutcome")) $("#bpOutcome").textContent = `${bpWon}%`;
        animateBPWin(bpWon);
        
        // Play V2 voice based on spin result
        const clearDummyValues = () => {
          S._dummyUsed = false;
          S._dummySB = 0;
          S._dummyWB = 0;
          S._dummyTB = 0;
          recalc();
        };
        
        if (bpWon === 60) {
          playVoice(voiceV2_60, clearDummyValues);
          // Show example amounts tooltip when v2 starts (displays for 3 seconds)
          showExampleAmountsTooltip(3000);
          // Show your turn tooltip 15 seconds after v2 starts (dummy removed at this point)
          setTimeout(() => {
            showYourTurnTooltip(3000);
          }, 15000);
          // Show description tooltips 3 seconds after v2 voice starts
          setTimeout(() => {
            showWalletTooltipDescriptionsOnly(4500);
          }, 3000);
          setTimeout(() => {
            triggerSuggestionBoxAnimations();
          }, 7000);
        }
        else if (bpWon === 70) {
          playVoice(voiceV2_70, clearDummyValues);
          // Show example amounts tooltip when v2 starts (displays for 3 seconds)
          showExampleAmountsTooltip(3000);
          // Show your turn tooltip 15 seconds after v2 starts (dummy removed at this point)
          setTimeout(() => {
            showYourTurnTooltip(3000);
          }, 15000);
          // Show description tooltips 3 seconds after v2 voice starts
          setTimeout(() => {
            showWalletTooltipDescriptionsOnly(4500);
          }, 3000);
          setTimeout(() => {
            triggerSuggestionBoxAnimations();
          }, 7000);
        }
        else if (bpWon === 80) {
          playVoice(voiceV2_80, clearDummyValues);
          // Show example amounts tooltip when v2 starts (displays for 3 seconds)
          showExampleAmountsTooltip(3000);
          // Show your turn tooltip 15 seconds after v2 starts (dummy removed at this point)
          setTimeout(() => {
            showYourTurnTooltip(3000);
          }, 15000);
          // Show description tooltips 3 seconds after v2 voice starts
          setTimeout(() => {
            showWalletTooltipDescriptionsOnly(4500);
          }, 3000);
          setTimeout(() => {
            triggerSuggestionBoxAnimations();
          }, 7000);
        }
        else if (bpWon === 90) {
          playVoice(voiceV2_90, clearDummyValues);
          // Show example amounts tooltip when v2 starts (displays for 3 seconds)
          showExampleAmountsTooltip(3000);
          // Show your turn tooltip 15 seconds after v2 starts (dummy removed at this point)
          setTimeout(() => {
            showYourTurnTooltip(3000);
          }, 15000);
          // Show description tooltips 3 seconds after v2 voice starts
          setTimeout(() => {
            showWalletTooltipDescriptionsOnly(4500);
          }, 3000);
          setTimeout(() => {
            triggerSuggestionBoxAnimations();
          }, 7000);
        }
        else if (bpWon === 100) {
          playVoice(voiceV2_100, clearDummyValues);
          // Show example amounts tooltip when v2 starts (displays for 3 seconds)
          showExampleAmountsTooltip(3000);
          // Show your turn tooltip 15 seconds after v2 starts (dummy removed at this point)
          setTimeout(() => {
            showYourTurnTooltip(3000);
          }, 15000);
          // Show description tooltips 3 seconds after v2 voice starts
          setTimeout(() => {
            showWalletTooltipDescriptionsOnly(4500);
          }, 3000);
          setTimeout(() => {
            triggerSuggestionBoxAnimations();
          }, 7000);
        }
        
        spinBpBtn.disabled = false;
        updateHasFallbacks();
        
        // =================================================================
        // DUMMY AMOUNT DISPLAY LOGIC
        // Shows $100 + calculated WB/TB when user spins wheel before 
        // entering real amount. Uses clean count-up animations.
        // =================================================================
        if (!S._dummyUsed) {
          // Mark that dummy display is active
          S._dummyUsed = true;
          S._dummySB = 100; // Dummy Savings Blessing amount
          S._dummyWB = Math.round(S._dummySB * (bpWon / 100)); // Dummy Winning Bonus (calculated from BP)
          S._dummyTB = S._dummySB + S._dummyWB; // Dummy Total Blessing
          
          // Get wallet display elements
          const sbEl = document.getElementById('sb');
          const wbEl = document.getElementById('wb');
          const tbEl = document.getElementById('tb');
          
          if (sbEl && wbEl && tbEl) {
            // Add dummy styling
            sbEl.classList.add('dummy-result');
            wbEl.classList.add('dummy-result');
            tbEl.classList.add('dummy-result');
            
            // Animate count-up for each wallet:
            // SB (Savings Blessing): 0 → $100 in 2.1 seconds (30% faster)
            // WB (Winning Bonus): 0 → calculated in 1.4 seconds (30% faster)
            // TB (Total Blessing): 0 → calculated in 2.8 seconds (30% faster)
            animateWalletCountUp('sb', 0, S._dummySB, 2100, true);
            animateWalletCountUp('wb', 0, S._dummyWB, 1400, true);
            animateWalletCountUp('tb', 0, S._dummyTB, 2800, true);
          }
        }

        // Fade out entire C1 (wheel) and fade in C2 — replace wheel with ebook
        const c1 = document.getElementById('c1-container');
        const c2 = document.getElementById('c2-container');
        console.log('🔍 Looking for c1 and c2:', { c1Found: !!c1, c2Found: !!c2 });
        if (c1 && c2) {
          console.log('✅ Both c1 and c2 found! Starting fade transition...');
          // visually hide the wheel section
          c1.style.opacity = '0';
          c1.style.pointerEvents = 'none';
          setTimeout(() => {
            c1.style.display = 'none';

            // show C2 controls - make it explicitly visible by removing hidden state
            c2.setAttribute('style', 'margin-top:0.001cm; margin-bottom:0.5cm; gap:50px; justify-content:center; align-items:center; z-index:2; opacity:1 !important; pointer-events:auto !important; transition:opacity 0.5s; width:100%; display:flex !important; position:relative;');
            console.log('📺 C2 displayed with setAttribute');

            // Insert or reveal ebook embed inside C2
            let ebookWrap = document.getElementById('ebook-container');
            if (!ebookWrap) {
              ebookWrap = document.createElement('div');
              ebookWrap.id = 'ebook-container';
              // Make the ebook the focal centered element (similar size to wheel)
              // reduce book cover size by half
              ebookWrap.style.minWidth = '160px';
              ebookWrap.style.maxWidth = '320px';
              ebookWrap.style.width = '210px';
              ebookWrap.style.height = '220px';
              ebookWrap.style.margin = '0 auto';
              ebookWrap.style.background = '#0b0f1a';
              ebookWrap.style.border = '1px solid rgba(255,255,255,0.04)';
              ebookWrap.style.borderRadius = '12px';
              ebookWrap.style.overflow = 'hidden';
              ebookWrap.style.boxShadow = '0 12px 40px rgba(0,0,0,0.6)';
              ebookWrap.style.display = 'flex';
              ebookWrap.style.alignItems = 'stretch';
              ebookWrap.style.justifyContent = 'center';
              ebookWrap.style.flexDirection = 'column';
              ebookWrap.style.padding = '6px';
              ebookWrap.style.left = '-20px';
              ebookWrap.style.top = '20px';



              // Removed PDF references (media files not present)

              const embed = document.createElement('embed');
              embed.id = 'ebook-embed';
              embed.type = 'application/pdf';
              embed.width = '100%';
              embed.height = '100%';
              embed.style.border = 'none';
              embed.style.flex = '1 1 auto';
              embed.style.minHeight = '320px';
              // set src immediately so user sees content when available (fetch HEAD may be blocked locally)
              embed.src = pdfSrcCandidate;

              // try to HEAD-request the candidate; if not available, fallback
              fetch(pdfSrcCandidate, { method: 'HEAD' }).then(res => {
                if (res && res.ok) {
                  embed.src = pdfSrcCandidate;
                } else {
                  embed.src = fallbackPdf;
                }
              }).catch(() => {
                embed.src = fallbackPdf;
              });

              // Download button removed


              // --- Magical Sacred Book Effects ---
              // Add floating and glowing animation via CSS class
              // SET POSITION RELATIVE FIRST - BEFORE adding absolutely positioned children
              ebookWrap.style.position = 'relative';

              ebookWrap.classList.add('magical-sacred-book');

              // Inject magical book CSS if not already present
              if (!document.getElementById('magical-book-style')) {
                const style = document.createElement('style');
                style.id = 'magical-book-style';
                style.textContent = `
                  .magical-sacred-book {
                    animation: magicalBookFloat 3.2s ease-in-out infinite alternate;
                    box-shadow: 0 0 32px 8px #ffe066cc, 0 0 64px 16px #ffd70044, 0 0 0 6px #fffbe622;
                    position: relative;
                    z-index: 1;
                  }
                  .magical-sacred-book::before {
                    content: '';
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    width: 120%;
                    height: 120%;
                    transform: translate(-50%, -50%);
                    background: radial-gradient(ellipse at center, rgba(255,255,220,0.38) 0%, rgba(255,215,0,0.18) 60%, rgba(255,255,255,0.08) 100%);
                    filter: blur(18px);
                    opacity: 0.85;
                    z-index: -1;
                    pointer-events: none;
                    border-radius: 18px;
                    animation: magicalBookAura 2.8s ease-in-out infinite alternate;
                  }
                  .magical-sacred-book > * {
                    position: relative;
                    z-index: 10;
                  }
                  @keyframes magicalBookFloat {
                    0% { transform: translateY(0) scale(1) rotate(-2deg); }
                    50% { transform: translateY(-18px) scale(1.04) rotate(2deg); }
                    100% { transform: translateY(0) scale(1) rotate(-2deg); }
                  }
                  @keyframes magicalBookAura {
                    0% { opacity: 0.7; filter: blur(18px); }
                    50% { opacity: 1; filter: blur(28px); }
                    100% { opacity: 0.7; filter: blur(18px); }
                  }
                `;
                document.head.appendChild(style);
              }

              // append embed into ebookWrap
              ebookWrap.appendChild(embed);



              // Ensure C2 presents ebook centered with controls pinned to bottom
              c2.style.display = '';
              c2.style.flexDirection = 'column';
              c2.style.alignItems = 'center';
              // keep content stacked; we'll push controlsRow to the bottom via marginTop:auto
              c2.style.justifyContent = 'flex-start';
              c2.style.gap = '12px';
              // try to match the wheel area height so controls can sit at the bottom
              try {
                const h = (c1 && c1.offsetHeight) ? c1.offsetHeight : 420;
                c2.style.height = h + 'px';
                c2.style.minHeight = h + 'px';
                // add extra bottom padding so controls sit slightly lower within the section
                c2.style.paddingBottom = '-20px';
              } catch (e) {
                c2.style.minHeight = '420px';
                c2.style.paddingBottom = '-20px';
              }

              // Move existing PWYW input and Add-to-SB button into a controls row under the book
              let controlsRow = document.getElementById('c2-controls-row');
              if (!controlsRow) {
                controlsRow = document.createElement('div');
                controlsRow.id = 'c2-controls-row';
                controlsRow.style.display = 'flex';
                controlsRow.style.flexDirection = 'row';
                controlsRow.style.gap = '10px';
                controlsRow.style.alignItems = 'center';
                controlsRow.style.justifyContent = 'center';
                // push controls row to bottom of the c2 container
                controlsRow.style.marginTop = 'auto';
                // small bottom margin so the whole controls block sits a bit above the very bottom
                controlsRow.style.marginBottom = '-20px';

                // move pwyw input and addSB button into controlsRow (if present)
                const pwywEl = c2.querySelector('#pwyw');
                const addSBBtn = c2.querySelector('#addSB');

                // ensure the moved controls have sensible widths when stacked under the ebook
                if (pwywEl) {
                  pwywEl.style.width = '180px';
                  pwywEl.style.margin = '0';
                }
                if (addSBBtn) {
                  // slightly narrower so it doesn't overlap visually
                  addSBBtn.style.minWidth = '100px';
                  addSBBtn.style.margin = '0';
                  addSBBtn.style.padding = '6px 10px';
                }

                if (pwywEl) controlsRow.appendChild(pwywEl);
                if (addSBBtn) controlsRow.appendChild(addSBBtn);

                // Create "Choose Your Fate" dropdown text box
                const chooseYourFateBox = document.createElement('div');
                chooseYourFateBox.id = 'choose-your-fate-box';
                chooseYourFateBox.style.height = '0.8cm';
                chooseYourFateBox.style.padding = '0 12px';
                chooseYourFateBox.style.background = 'rgba(0, 0, 0, 0.4)';
                chooseYourFateBox.style.backdropFilter = 'blur(12px)';
                chooseYourFateBox.style.color = '#8a0000ff';
                chooseYourFateBox.style.border = 'none';
                chooseYourFateBox.style.borderRadius = '8px';
                chooseYourFateBox.style.display = 'flex';
                chooseYourFateBox.style.alignItems = 'center';
                chooseYourFateBox.style.justifyContent = 'center';
                chooseYourFateBox.style.whiteSpace = 'nowrap';
                chooseYourFateBox.style.fontSize = '0.9rem';
                chooseYourFateBox.style.fontWeight = '600';
                chooseYourFateBox.style.cursor = 'pointer';
                chooseYourFateBox.style.position = 'absolute';
                chooseYourFateBox.style.bottom = 'auto';
                chooseYourFateBox.style.right = 'auto';
                chooseYourFateBox.style.left = '50%';
                chooseYourFateBox.style.transform = 'translateX(-50%)';
                chooseYourFateBox.style.top = 'auto';
                chooseYourFateBox.style.width = 'auto';
                chooseYourFateBox.style.zIndex = '1200';
                chooseYourFateBox.innerHTML = 'Choose Your Fate ▼';
                
                // Position it 0.1cm from bottom of ebook (lifted 0.1cm) - absolute positioning within container
                setTimeout(() => {
                  if (ebookWrap && c2) {
                    const ebookRect = ebookWrap.getBoundingClientRect();
                    const c2Rect = c2.getBoundingClientRect();
                    const relativeBottom = ebookRect.bottom - c2Rect.top;
                    const offset = -0.3 * 37.795; // Convert cm to pixels (1cm ≈ 37.795px)
                    chooseYourFateBox.style.position = 'absolute';
                    chooseYourFateBox.style.top = (relativeBottom + offset) + 'px';
                    chooseYourFateBox.style.left = '50%';
                    chooseYourFateBox.style.transform = 'translateX(-50%)';
                  }
                }, 100);

                // Append to c2 container
                c2.style.position = 'relative';
                c2.appendChild(chooseYourFateBox);

                // append controlsRow after ebookWrap
                // place ebook first, controls row last so marginTop:auto keeps it at the bottom
                c2.appendChild(ebookWrap);
                c2.appendChild(controlsRow);
                // download button removed
                controlsRow.style.position = 'relative';
                // move the ebook 3cm downward
                ebookWrap.style.marginTop = '6cm';
                ebookWrap.style.marginBottom = '20px';
              } else {
                // controlsRow exists: ensure ebook is present before it
                if (!c2.contains(ebookWrap)) c2.insertBefore(ebookWrap, controlsRow);
              }
            } else {
              ebookWrap.style.display = '';
            }
          }, 500);
        }
      });
    });
  }

  // --- Add-to-SB handler with max=100 validation ---
  (function setupAddSBValidation() {
    const pwywEl = $("#pwyw");
    const addSBBtn = $("#addSB");
    if (!pwywEl || !addSBBtn) return;

    // Remove previous error when user changes input
    pwywEl.addEventListener("input", () => {
      pwywEl.classList.remove("input-error");
    });

    addSBBtn.addEventListener("click", () => {
      // Load Phase 1 Payment audio before confirming purchase
      audioLoader.loadPhase1Payment();
      
      const raw = pwywEl.value || "";
      const v = parseFloat(raw);
      // reset any previous error style
      pwywEl.classList.remove("input-error");

      // basic validation: present and positive
      if (isNaN(v) || v <= 0) {
        pwywEl.classList.add("input-error");
        alert("Enter a valid amount (greater than $0).");
        return;
      }

      // enforce maximum 100
      if (v > 100) {
        pwywEl.classList.add("input-error");
        alert("Amount exceeds maximum allowed. You can add up to $100.");
        return;
      }

      // =================================================================
      // DEPOSIT HANDLER - Animate wallet values with count-up
      // When user deposits real amount, show smooth counting animation
      // =================================================================
      
      // Store previous values for animation
      const oldSB = S.SB;
      const oldWB = S.WB;
      const oldTB = S.TB;
      
      // Update the actual values
      S.SB += v;
      const newWB = S.SB * (S.FS / 100); // Calculate new WB based on new SB
      const newTB = S.SB + newWB; // Calculate new TB
      
      // Clear dummy values if they were active
      S._dummyUsed = false;
      S._dummySB = 0;
      S._dummyWB = 0;
      S._dummyTB = 0;
      
      // Update actual values in state
      S.WB = newWB;
      S.TB = newTB;
      
      // Remove dummy styling
      if ($("#sb")) $("#sb").classList.remove('dummy-result');
      if ($("#wb")) $("#wb").classList.remove('dummy-result');
      if ($("#tb")) $("#tb").classList.remove('dummy-result');
      
      // Animate count-up for each wallet:
      // SB (Savings Blessing): old → new in 2.1 seconds (30% faster)
      // WB (Winning Bonus): old → new in 1.4 seconds (30% faster)
      // TB (Total Blessing): old → new in 2.8 seconds (30% faster)
      animateWalletCountUp('sb', oldSB, S.SB, 2100, false);
      animateWalletCountUp('wb', oldWB, newWB, 1400, false);
      animateWalletCountUp('tb', oldTB, newTB, 2800, false);
      
      // Save state after all animations complete
      save();
      
      pwywEl.value = "";
      floatBP(`SB +$${v}`);
      
      // Play V3 voice (purchase confirmation)
      playVoice(voiceV3);
      
      // Trigger chainlock shattering effect
      // Fade out and remove chainlock overlay
      const overlay = document.getElementById('chainlock-overlay');
      if (overlay && !overlay.classList.contains('fading-out')) {
        overlay.classList.add('fading-out');
        setTimeout(() => {
          overlay.style.display = 'none';
        }, 800); // Match animation duration
      }

      // Automatically stop V3 and move to phase 2 after 4 seconds
      setTimeout(() => {
        // Do NOT stop v3, let it finish naturally
        showPhase(2);
      }, 4000);
      
      // Resume wallet animations after payment
      resumeWalletAnimations();
      
      updateHasFallbacks();
    });
  })();

  // --- Amount Suggestion Boxes ---
  (function setupAmountSuggestions() {
    const suggestions = [
      { label: "Bronze", value: 1 },
      { label: "Silver", value: 3 },
      { label: "Gold", value: 5 },
      { label: "Platinum", value: 10 },
      { label: "Diamond", value: 15 },
      { label: "Elite", value: 20 },
      { label: "Crown", value: 30 },
      { label: "Conqueror", value: 50 }
    ];

    const container = document.getElementById('amount-suggestions-container');
    const pwywEl = document.getElementById('pwyw');
    const addSBBtn = document.getElementById('addSB');

    if (!container) return;

    // Render suggestion boxes - 8 boxes with custom values
    suggestions.forEach(suggestion => {
      const box = document.createElement('div');
      box.className = 'amount-suggestion-box';
      box.innerHTML = `<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px;"><span style="color: #daa520; font-size: 0.7rem; line-height: 1;">${suggestion.label}</span><span style="color: #c0c0c0; font-size: 0.75rem; line-height: 1;">$${suggestion.value}</span></div>`;
      box.setAttribute('data-value', suggestion.value);
      
      box.addEventListener('click', function(event) {
        console.log(`Amount suggestion clicked: ${suggestion.label} - $${suggestion.value}`);
        
        // For Bronze tier ($1), show PayHip modal overlay
        if (suggestion.value === 1) {
          // Call the PayHip $1 modal show function
          if (typeof window.showPayHipModal1 === 'function') {
            window.showPayHipModal1();
          }
          return; // Don't process as regular PWYW
        }
        
        // For Silver tier ($3), show PayHip modal overlay
        if (suggestion.value === 3) {
          // Call the PayHip $3 modal show function
          if (typeof window.showPayHipModal3 === 'function') {
            window.showPayHipModal3();
          }
          return; // Don't process as regular PWYW
        }
        
        // For Gold tier ($5), show PayHip modal overlay
        if (suggestion.value === 5) {
          // Call the PayHip modal show function
          if (typeof window.showPayHipModal === 'function') {
            window.showPayHipModal();
          }
          return; // Don't process as regular PWYW
        }
        
        // For Silver tier ($10), show PayHip modal overlay for $10
        if (suggestion.value === 10) {
          // Call the PayHip $10 modal show function
          if (typeof window.showPayHipModal10 === 'function') {
            window.showPayHipModal10();
          }
          return; // Don't process as regular PWYW
        }
        
        // For Diamond tier ($15), show PayHip modal overlay for $15
        if (suggestion.value === 15) {
          // Call the PayHip $15 modal show function
          if (typeof window.showPayHipModal15 === 'function') {
            window.showPayHipModal15();
          }
          return; // Don't process as regular PWYW
        }
        
        // For Platinum tier ($20), show PayHip modal overlay for $20
        if (suggestion.value === 20) {
          // Call the PayHip $20 modal show function
          if (typeof window.showPayHipModal20 === 'function') {
            window.showPayHipModal20();
          }
          return; // Don't process as regular PWYW
        }
        
        // For Crown tier ($30), show PayHip modal overlay for $30
        if (suggestion.value === 30) {
          // Call the PayHip $30 modal show function
          if (typeof window.showPayHipModal30 === 'function') {
            window.showPayHipModal30();
          }
          return; // Don't process as regular PWYW
        }
        
        // For Conqueror tier ($50), show PayHip modal overlay for $50
        if (suggestion.value === 50) {
          // Call the PayHip $50 modal show function
          if (typeof window.showPayHipModal50 === 'function') {
            window.showPayHipModal50();
          }
          return; // Don't process as regular PWYW
        }
        
        // Set input value if wallet exists
        if (pwywEl) pwywEl.value = suggestion.value;
        
        // Add visual feedback
        box.classList.add('active');
        setTimeout(() => box.classList.remove('active'), 300);
        
        // Auto-trigger Add to SB after a short delay if button exists
        if (addSBBtn) {
          setTimeout(() => {
            addSBBtn.click();
          }, 100);
        }
      });

      container.appendChild(box);
    });

    // Show suggestion boxes when c2-container becomes visible
    const c2Container = document.getElementById('c2-container');
    const observer = new MutationObserver(() => {
      if (c2Container.style.opacity === '1' || parseFloat(c2Container.style.opacity) > 0) {
        container.style.opacity = '1';
        container.style.pointerEvents = 'auto';
      } else {
        container.style.opacity = '0';
        container.style.pointerEvents = 'none';
      }
    });

    observer.observe(c2Container, { attributes: true, attributeFilter: ['style'] });
  })();

  const goP2 = $("#goP2");
  if (goP2) goP2.addEventListener("click", () => {
    // ===== PHASE 2: Load all non-critical assets on Continue =====
    if (window.Phase2Loader) {
      window.Phase2Loader.loadPhase2Assets().catch(err => console.error('Phase 2 load failed:', err));
    }

    // Pre-portal fade to black
    const fadeOverlay = document.createElement('div');
    fadeOverlay.id = 'pre-portal-fade';
    fadeOverlay.style.position = 'fixed';
    fadeOverlay.style.top = '0';
    fadeOverlay.style.left = '0';
    fadeOverlay.style.width = '100vw';
    fadeOverlay.style.height = '100vh';
    fadeOverlay.style.zIndex = '9998';
    fadeOverlay.style.background = '#000';
    fadeOverlay.style.opacity = '0';
  fadeOverlay.style.transition = 'opacity 0.25s';
    document.body.appendChild(fadeOverlay);
    setTimeout(() => { fadeOverlay.style.opacity = '1'; }, 10);
    // After fade to black, show portal
    setTimeout(() => {
      // Portal transition effect
      const portalOverlay = document.createElement('div');
      portalOverlay.id = 'portal-transition-overlay';
      portalOverlay.style.position = 'fixed';
      portalOverlay.style.top = '0';
      portalOverlay.style.left = '0';
      portalOverlay.style.width = '100vw';
      portalOverlay.style.height = '100vh';
      portalOverlay.style.zIndex = '9999';
      portalOverlay.style.background = '#000';
      portalOverlay.style.display = 'block';
      portalOverlay.style.transition = 'opacity 0.7s';
      portalOverlay.style.opacity = '0';
      // Portal MP4 video
      const portalVideo = document.createElement('video');
      portalVideo.autoplay = true;
      portalVideo.muted = true;
      portalVideo.loop = false;
      portalVideo.playsinline = true;
      const source = document.createElement('source');
      source.src = 'site-asse-voices/portal1.mp4';
      source.type = 'video/mp4';
      portalVideo.appendChild(source);
      portalVideo.style.position = 'absolute';
      portalVideo.style.top = '0';
      portalVideo.style.left = '0';
      portalVideo.style.width = '100vw';
      portalVideo.style.height = '100vh';
      portalVideo.style.objectFit = 'cover';
      portalVideo.style.borderRadius = '0';
      portalVideo.style.boxShadow = 'none';
      portalVideo.style.animation = 'none';
      portalOverlay.appendChild(portalVideo);
      document.body.appendChild(portalOverlay);
      // Fade in portal and switch to Phase 2 immediately
      setTimeout(() => {
        portalOverlay.style.opacity = '1';
        showPhase(2);
      }, 10);
      // After 2s, fade out portal, then fade out black overlay
      setTimeout(() => {
        portalOverlay.style.opacity = '0';
        setTimeout(() => {
          if (portalOverlay.parentNode) portalOverlay.parentNode.removeChild(portalOverlay);
          // Post-portal fade from black
          fadeOverlay.style.opacity = '0';
          setTimeout(() => {
            if (fadeOverlay.parentNode) fadeOverlay.parentNode.removeChild(fadeOverlay);
          }, 500);
        }, 700);
      }, 2000);
    }, 500); // Pre-fade duration
  });

  // Phase 2 actions
  function pill(win) {
    const d = win ? 20 : -20;
    S.BP = Math.max(0, S.BP + d);
    recalc();
    if ($("#pillNote"))
      $("#pillNote").textContent = win ? "+20% added!" : "−20% 💪 keep going!";
    floatBP(win ? "+20%" : "−20%");
    
    // Play V4 voice (positive or negative)
    if (win) playVoice(voiceV4A);
    else playVoice(voiceV4B);
  }
  const greenPill = $("#greenPill");
  const redPill = $("#redPill");
  if (greenPill) greenPill.addEventListener("click", () => pill(Math.random() < 0.5));
  if (redPill) redPill.addEventListener("click", () => pill(Math.random() < 0.5));
  const addInvestBtn = $("#addInvest");
  if (addInvestBtn) {
    addInvestBtn.addEventListener("click", () => {
      const extraEl = $("#extraInvest");
      if (!extraEl) return;
      const v = parseFloat(extraEl.value || "0");
      if (isNaN(v) || v <= 0) {
        alert("Enter a valid $");
        return;
      }
      S.SB += v;
      S._dummyUsed = false;
      recalc();
      extraEl.value = "";
      floatBP(`SB +$${v}`);
      // Remove dummy style
      if (document.getElementById('sb')) document.getElementById('sb').classList.remove('dummy-result');
      if (document.getElementById('wb')) document.getElementById('wb').classList.remove('dummy-result');
      if (document.getElementById('tb')) document.getElementById('tb').classList.remove('dummy-result');
      updateHasFallbacks();
    });
  }
  const goP3Btn = $("#goP3");
  if (goP3Btn) goP3Btn.addEventListener("click", () => {
    // Stop V4A and V4B voices if they're playing when continue button is clicked
    stopVoice(voiceV4A);
    stopVoice(voiceV4B);
    
    // Pre-portal fade to black
    const fadeOverlay = document.createElement('div');
    fadeOverlay.id = 'pre-portal2-fade';
    fadeOverlay.style.position = 'fixed';
    fadeOverlay.style.top = '0';
    fadeOverlay.style.left = '0';
    fadeOverlay.style.width = '100vw';
    fadeOverlay.style.height = '100vh';
    fadeOverlay.style.zIndex = '9998';
    fadeOverlay.style.background = '#000';
    fadeOverlay.style.opacity = '0';
    fadeOverlay.style.transition = 'opacity 0.5s';
    document.body.appendChild(fadeOverlay);
  setTimeout(() => { fadeOverlay.style.opacity = '1'; }, 10);
  // After fade to black, show portal2
  setTimeout(() => {
      // Portal2 transition effect
      const portalOverlay = document.createElement('div');
      portalOverlay.id = 'portal2-transition-overlay';
      portalOverlay.style.position = 'fixed';
      portalOverlay.style.top = '0';
      portalOverlay.style.left = '0';
      portalOverlay.style.width = '100vw';
      portalOverlay.style.height = '100vh';
      portalOverlay.style.zIndex = '9999';
      portalOverlay.style.background = '#000';
      portalOverlay.style.display = 'block';
  portalOverlay.style.transition = 'opacity 0.35s';
      portalOverlay.style.opacity = '0';
      // Portal2 Video (MP4)
      const portalVideo = document.createElement('video');
      portalVideo.src = 'site-asse-voices/portal2.mp4';
      portalVideo.autoplay = true;
      portalVideo.muted = true;
      portalVideo.style.position = 'absolute';
      portalVideo.style.top = '0';
      portalVideo.style.left = '0';
      portalVideo.style.width = '100vw';
      portalVideo.style.height = '100vh';
      portalVideo.style.objectFit = 'cover';
      portalVideo.style.borderRadius = '0';
      portalVideo.style.boxShadow = 'none';
      portalVideo.style.animation = 'none';
      portalOverlay.appendChild(portalVideo);
      document.body.appendChild(portalOverlay);
      // Fade in portal and switch to Phase 3 immediately
      setTimeout(() => {
        portalOverlay.style.opacity = '1';
        showPhase(3);
      }, 10);
      // After 1s, fade out portal, then fade out black overlay
      setTimeout(() => {
        portalOverlay.style.opacity = '0';
        setTimeout(() => {
          if (portalOverlay.parentNode) portalOverlay.parentNode.removeChild(portalOverlay);
          // Post-portal fade from black
          fadeOverlay.style.opacity = '0';
          setTimeout(() => {
            if (fadeOverlay.parentNode) fadeOverlay.parentNode.removeChild(fadeOverlay);
          }, 250);
        }, 350);
      }, 1000);
    }, 250); // Pre-fade duration
  });

  // Phase 3 quiz: show 1 at a time, pick 5 random from 10, 3 options each
  const allQuestions = [
    {
  q: "Do you feel alone even when people are around?",
  a: ["Rarely", "Sometimes", "Often"],
},
{
  q: "How much do you want a safe, judgment-free space?",
  a: ["A little", "A lot", "Deeply"],
},
{
  q: "Do you feel you're holding heavy secrets?",
  a: ["Rarely", "Sometimes", "Often"],
},
{
  q: "How often do you need a motivational lift?",
  a: ["Occasional", "Frequent", "Daily"],
},
{
  q: "How often do you lose focus or clarity?",
  a: ["30%", "50%", "70%"],
},
{
  q: "How often do you need emotional support?",
  a: ["Rarely", "Sometimes", "Often"],
},
{
  q: "How much do you value a 24/7 comforting presence?",
  a: ["Somewhat", "A lot", "Deeply"],
},
{
  q: "Do you wish for a place to track your growth?",
  a: ["30%", "50%", "70%"],
},
{
  q: "How often do you feel pressure or heaviness?",
  a: ["30%", "50%", "70%"],
},
{
  q: "Do you want a private vault for healing messages?",
  a: ["30%", "50%", "70%"],
},
  ];

  let quizOrder = [];
  let quizAnswers = [];
  let quizStep = 0;

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function startQuiz() {
    quizOrder = shuffle([...Array(allQuestions.length).keys()]).slice(0, 5);
    quizAnswers = [];
    quizStep = 0;
    renderQuizStep();
    const submitBtn = $("#submitQuiz");
    if (submitBtn) submitBtn.disabled = true;
  }

  function renderQuizStep() {
    const box = document.getElementById("quiz-question-container");
    if (!box) return;
    box.innerHTML = "";
    if (quizStep >= quizOrder.length) {
      box.innerHTML = `<div style='text-align:center;font-size:1.2em;padding:1.5em 0;'>All questions answered!</div>`;
      const submitBtn = $("#submitQuiz");
      if (submitBtn) submitBtn.disabled = false;
      
      // Play V5 voice (quiz complete)
      playVoice(voiceV5);
      
      // Trigger subscription page after a short delay
      setTimeout(() => {
        const gain = 15;
        S.BP += gain;
        recalc();
        floatBP(`+${gain}%`);
        
        // Dim Phase 3 background and show Blessing Verse Pro subscription page
        const p3Element = document.getElementById('p3');
        if (p3Element) {
          p3Element.style.filter = 'blur(5px) brightness(0.4)';
        }
        if (window.BlessingVersePro && window.BlessingVersePro.show) {
          window.BlessingVersePro.show();
        }
        updateHasFallbacks();
      }, 800);
      return;
    }
    const qIdx = quizOrder[quizStep];
    const qObj = allQuestions[qIdx];
  const c = document.createElement("div");
  c.className = "q";
  c.innerHTML = `<div class='quiz-question'><b>Q${quizStep + 1}. ${qObj.q}</b></div>`;
    const r = document.createElement("div");
    r.className = "row";
    r.style.marginTop = "6px";
    qObj.a.forEach((opt, oi) => {
  const w = document.createElement("label");
  w.className = "opt row quiz-option";
  w.style.flex = "1";
  w.style.margin = "0 0px";
  w.innerHTML = `<input type="radio" name="qstep" value="${opt}"> <span>${opt}</span>`;
  r.appendChild(w);
    });
    c.appendChild(r);
    box.appendChild(c);
    // Animate in
    c.style.opacity = 0;
    setTimeout(() => { c.style.transition = 'opacity 0.4s'; c.style.opacity = 1; }, 10);
    // Disable submit until all done
    const submitBtn = $("#submitQuiz");
    if (submitBtn) submitBtn.disabled = true;
  }

  document.addEventListener("change", (e) => {
    if (e.target && e.target.name === "qstep") {
      // Save answer
      const val = e.target.value;
      quizAnswers[quizStep] = val;
      // Animate out, then next
      const box = document.getElementById("quiz-question-container");
      if (box && box.firstChild) {
        box.firstChild.style.opacity = 0;
        setTimeout(() => {
          quizStep++;
          renderQuizStep();
        }, 350);
      } else {
        quizStep++;
        renderQuizStep();
      }
    }
  });

  const submitQuizBtn = $("#submitQuiz");
  if (submitQuizBtn) {
    submitQuizBtn.addEventListener("click", () => {
      // Subscription page is now shown automatically after question 5
      // This button is kept as backup but the real action happens in renderQuizStep()
      console.log("Quiz submitted - subscription page should already be visible");
    });
  }

  // Start quiz on phase 3 show
  if (window.showPhase) {
    const origShowPhase = window.showPhase;
    window.showPhase = function(n) {
      origShowPhase.apply(this, arguments);
      if (n === 3) startQuiz();
    };
  } else {
    // fallback: start on load
    startQuiz();
  }

  // Phase 4 date wheel
  const spinDateBtn = document.getElementById("spinDate");
  if (spinDateBtn) {
    spinDateBtn.addEventListener("click", () => {
      spinDateBtn.disabled = true;
      const dateOutcome = document.getElementById("dateOutcome");
      if (dateOutcome) dateOutcome.textContent = "✨...Spinning ✨ ..✨";
      // Play wheelbackground audio
      let wheelAudio = document.getElementById('wheelDateAudio');
      if (!wheelAudio) {
        wheelAudio = document.createElement('audio');
        wheelAudio.id = 'wheelDateAudio';
        wheelAudio.src = 'phase-1-media/wheelbackground.mp3';
        wheelAudio.preload = 'none';
        wheelAudio.style.display = 'none';
        document.body.appendChild(wheelAudio);
      }
      wheelAudio.currentTime = 0;
      wheelAudio.play();
      // Pick from the configured non-uniform date slices and spin so the chosen
      // slice's random internal angle aligns with the pointer at 355°.
      function randAngleInSlice(s) {
        const start = ((s.start % 360) + 360) % 360;
        const end = ((s.end % 360) + 360) % 360;
        const sweep = (end - start + 360) % 360 || 360;
        return (start + Math.random() * sweep) % 360;
      }

      // build pick pool using explicit weights so '15 Jan' is never chosen
      // and '14 Feb' is only ~1% probability. Remaining probability is
      // split among the other slices.
      const explicitWeights = {
        '14 Feb': 0.01,
        '15 Jan': 0,
        '100D': 0.33,
        '25 March': 0.33,
        '07 Apr': 0.33
      };
      let pickPool = dateSlices.map(s => ({ value: s.label, w: (explicitWeights[s.label] || 0) }));
      let totalW = pickPool.reduce((a,b) => a + (b.w||0), 0);
      // if weights are invalid (sum 0 or NaN), fall back to equal weights
      if (!isFinite(totalW) || totalW <= 0) {
        pickPool = dateSlices.map(s => ({ value: s.label, w: 1 }));
        totalW = pickPool.reduce((a,b) => a + (b.w||0), 0);
      }
      let r = Math.random() * totalW;
      let pickIndex = pickPool.length - 1;
      for (let i = 0; i < pickPool.length; i++) {
        r -= (pickPool[i].w || 0);
        if (r < 0) { pickIndex = i; break; }
      }
      const pick = pickPool[pickIndex].value;
      const sliceIndex = dateSlices.findIndex(s => s.label === pick);
      console.log('[DATE SPIN] picked', pick, 'sliceIndex', sliceIndex);
      console.log('[DATE SPIN] target element:', dateWheelEl ? dateWheelEl.tagName : 'none', dateWheelEl ? dateWheelEl.id : '');

      // compute a random angle inside chosen slice and rotate wheel so that
      // the chosen angle aligns with the pointerAngle (355°)
      const pointerAngle = 355; // degrees
      const chosenSlice = dateSlices[sliceIndex];
      const stopAngle = randAngleInSlice(chosenSlice);
      console.log('[DATE SPIN] stopAngle', stopAngle);

      const fullSpins = 5 + Math.floor(Math.random() * 4); // 5..8 full turns
      const targetRotation = fullSpins * 360 + (pointerAngle - stopAngle);
      // apply rotation
      if (dateWheelEl) {
        dateWheelEl.style.transition = 'transform 3.6s cubic-bezier(.17,.67,.36,1)';
        dateWheelEl.style.transform = `rotate(${targetRotation}deg)`;
      }

      // call the callback after the transition completes (3.6s)
      const spinMs = 3600;
      setTimeout(() => {
        // Keep wheelbackground audio playing for 3.5 seconds
        // Then stop it and play V6 voice
        S.blessingDate = pick;
        save();
        if (dateOutcome) dateOutcome.textContent = `Blessing Date: ${pick}`;
        floatBP("+20 BP");
        S.BP += 20;
        recalc();
        
        // Schedule wheel sound to stop and V6 to play after 3.5 seconds
        console.log('Scheduling V6 voice to play in 3.5 seconds...');
        console.log('voiceV6:', voiceV6);
        console.log('voiceV6.src:', voiceV6 ? voiceV6.src : 'N/A');
        setTimeout(() => {
          // Stop wheelbackground audio
          if (wheelAudio) { wheelAudio.pause(); wheelAudio.currentTime = 0; }
          console.log('About to play V6 voice now');
          console.log('voiceV6 at play time:', voiceV6);
          playVoice(voiceV6);
        }, 3500);
        
        spinDateBtn.disabled = false;
        updateHasFallbacks();
      }, spinMs);
    });
  }
  
  // Note: showCalBtn event listener removed - now handled in inline HTML script for PDF download and Phase 5 transition
  
  const goP4Btn = document.getElementById("goP4");
  if (goP4Btn) {
    goP4Btn.addEventListener("click", () => {
      // Stop V5 voice if it's playing when goP4 button is clicked
      stopVoice(voiceV5);
      showPhase(4);
    });
  }

  const goP5Btn = document.getElementById("goP5");
  if (goP5Btn) goP5Btn.addEventListener("click", () => showPhase(5));

  // Phase 5 signup & referrals
  function token() {
    return Math.random().toString(36).slice(2, 10);
  }
  function renderRefList() {
    const box = $("#refList");
    if (!box) return;
    box.innerHTML = "";
    for (let i = 0; i < S.referral.max; i++) {
      const row = document.createElement("div");
      row.className = "ref-row";
      const input = document.createElement("input");
      input.placeholder = `friend${i + 1}@example.com`;
      input.value = S.referral.list[i]?.email || "";
      input.style.flex = "1";
      const btn = document.createElement("button");
      btn.className = "cta secondary";
  btn.textContent = S.referral.list[i]?.done ? "Revoke" : "Mark Joined (+20%)";
      btn.addEventListener("click", () => {
        if (!input.value.trim()) return alert("Enter email first");
        if (S.referral.list[i]?.done) {
          S.referral.list.splice(i, 1);
          S.BP = Math.max(0, S.BP - 20);
        } else {
          S.referral.list[i] = { email: input.value.trim(), done: true };
          S.BP += 20;
        }
        recalc();
        renderRefList();
      });
      row.appendChild(input);
      row.appendChild(btn);
      box.appendChild(row);
    }
  }
  const signupBtn = $("#signup");
  if (signupBtn) {
    signupBtn.addEventListener("click", () => {
      const uEl = $("#username"),
        eEl = $("#email"),
        wEl = $("#wallet");
      const u = uEl ? uEl.value.trim() : "";
      const e = eEl ? eEl.value.trim() : "";
      const w = wEl ? wEl.value.trim() : "";
      if (!u) return alert("Enter username");
      if (e && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) return alert("Enter valid email");
      S.profile = { username: u, email: e, wallet: w };
      save();
      const link = `${location.origin}${location.pathname}?ref=${encodeURIComponent(u)}-${token()}`;
      const refLinkEl = $("#refLink");
      if (refLinkEl) refLinkEl.value = link;
      const refAreaEl = $("#refArea");
      if (refAreaEl) refAreaEl.style.display = "block";
      renderRefList();
      updateHasFallbacks();
    });
  }
  const copyLinkBtn = $("#copyLink");
  if (copyLinkBtn) {
    copyLinkBtn.addEventListener("click", async () => {
      const refLinkEl = $("#refLink");
      if (!refLinkEl) return alert("No link to copy");
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(refLinkEl.value);
          alert('Copied!');
          
          // Play V8 voice (link copied)
          playVoice(voiceV8);
        } else {
          refLinkEl.select();
          document.execCommand('copy');
          alert('Copied!');
          
          // Play V8 voice (link copied)
          playVoice(voiceV8);
        }
      } catch (e) {
        alert("Copy failed");
      }
    });
  }

  // First paint
  renderJourney();
  // Theme handling (combo1 / combo2)
  function applyTheme(name) {
    try { document.documentElement.setAttribute('data-theme', name); } catch(e){}
  }
  function currentTheme() {
    return localStorage.getItem('dw_theme') || 'combo1';
  }
  // initialize
  applyTheme(currentTheme());
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = currentTheme() === 'combo1' ? 'combo2' : 'combo1';
      localStorage.setItem('dw_theme', next);
      applyTheme(next);
    });
  }
  // JS fallback for CSS :has() behaviors and controller visibility
  function updateHasFallbacks() {
    const p3Active = !!document.querySelector('#p3.active');
    const bf = document.querySelector('.blessing-float');
    if (bf) bf.style.display = p3Active ? 'none' : '';
    // Hide blessing-wallet bubbles during Phase 4 after user has spun
    try {
      const bubbles = document.querySelectorAll('.blessing-bubble');
      const p4Active = !!document.querySelector('#p4.active');
      if (bubbles && bubbles.length) {
        if (p4Active && S && S.hasSpun) {
          bubbles.forEach(b => b.style.display = 'none');
        } else {
          bubbles.forEach(b => b.style.display = '');
        }
      }
    } catch (e) { /* ignore in non-browser environments */ }
    // controller buttons
    const btns = document.querySelectorAll('.controller-buttons button');
    btns.forEach(b => b.style.display = 'none');
    if (document.querySelector('#p1.active')) {
      const el = document.querySelector('#goP2'); if (el) el.style.display = 'inline-flex';
    } else if (document.querySelector('#p2.active')) {
      const el = document.querySelector('#goP3'); if (el) el.style.display = 'inline-flex';
    } else if (document.querySelector('#p4.active')) {
      const el = document.querySelector('#goP5'); if (el) el.style.display = 'inline-flex';
    } else if (document.querySelector('#p5.active')) {
      const el = document.querySelector('#finishJourney'); if (el) el.style.display = 'inline-flex';
    }
  }
  updateHasFallbacks();

  // Header now always stays visible across all phases
  const header = document.querySelector('header');
  // Removed hide-header behavior - header is now always sticky and visible
});

// duplicate listeners removed (handled inside main DOMContentLoaded above)

// === Falling Leaves Animation for Phase 5 ===
(function() {
  const leafImages = [
    'site-asse-voices/leaf1.webp', 'site-asse-voices/leaf2.webp', 'site-asse-voices/leaf3.webp',
    'site-asse-voices/leaf4.webp', 'site-asse-voices/leaf5.webp', 'site-asse-voices/leaf6.webp',
    'site-asse-voices/leaf7.webp', 'site-asse-voices/leaf8.webp', 'site-asse-voices/leaf9.webp'
  ];
  const container = document.getElementById('falling-leaves-container');
  let leaves = [];
  let breezeActive = false;

  function createLeaf(idx) {
    const img = document.createElement('img');
    img.src = leafImages[idx];
    img.className = 'falling-leaf';
    img.style.position = 'absolute';
    img.style.willChange = 'transform, opacity';
    img.style.pointerEvents = 'none';
    container.appendChild(img);
    return img;
  }

  function randomLeafProps() {
    return {
      x: Math.random() * window.innerWidth,
      y: -Math.random() * 120,
      drift: (Math.random() - 0.5) * 1.2,
      swaySpeed: Math.random() * 0.008 + 0.004,
      fallSpeed: Math.random() * 0.7 + 0.4,
      rot: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 0.18,
      scale: Math.random() * 0.047 + 0.06, // 3x smaller leaves
      opacity: Math.random() * 0.2 + 0.8,
      delay: 0,
      breeze: Math.random() * 0.5 + 1
    };
  }

  function resetLeaf(leaf, props) {
    props.x = Math.random() * window.innerWidth;
    props.y = -Math.random() * 120;
    props.drift = (Math.random() - 0.5) * 1.2;
    props.swaySpeed = Math.random() * 0.008 + 0.004;
    props.fallSpeed = Math.random() * 0.7 + 0.4;
    props.rot = Math.random() * 360;
    props.rotSpeed = (Math.random() - 0.5) * 0.18;
    props.scale = Math.random() * 0.14 + 0.18;
    props.opacity = Math.random() * 0.2 + 0.8;
    props.delay = Math.random() * 1200 + 400;
    props.breeze = Math.random() * 0.5 + 1;
    leaf.style.opacity = props.opacity;
    leaf.style.transform = `translate(${props.x}px, ${props.y}px) scale(${props.scale}) rotate(${props.rot}deg)`;
  }

  function animateLeaves() {
    if (!container || container.style.display === 'none') return;
    leaves.forEach(({leaf, props}) => {
      if (props.delay > 0) {
        props.delay -= 16;
        return;
      }
      props.y += props.fallSpeed * (breezeActive ? 1.5 : 1);
      props.x += Math.sin(Date.now() * props.swaySpeed) * (props.drift + (breezeActive ? props.breeze : 0));
      props.rot += props.rotSpeed;
      leaf.style.opacity = props.opacity;
      leaf.style.transform = `translate(${props.x}px, ${props.y}px) scale(${props.scale}) rotate(${props.rot}deg)`;
      if (props.y > window.innerHeight + 40) {
        leaf.style.transition = 'opacity 0.7s';
        leaf.style.opacity = 0;
        setTimeout(() => {
          leaf.style.transition = '';
          resetLeaf(leaf, props);
        }, 700);
        props.y = -40;
      }
    });
    requestAnimationFrame(animateLeaves);
  }

  function startLeaves() {
    if (!container) return;
    container.innerHTML = '';
    leaves = [];
    for (let i = 0; i < 9; i++) {
      const leaf = createLeaf(i);
      const props = randomLeafProps();
      leaf.style.opacity = props.opacity;
      leaf.style.transform = `translate(${props.x}px, ${props.y}px) scale(${props.scale}) rotate(${props.rot}deg)`;
      leaves.push({leaf, props});
    }
    animateLeaves();
  }

  function setLeavesVisibility(show) {
    if (container) container.style.display = show ? 'block' : 'none';
  }

  // Breeze effect every few seconds
  setInterval(() => {
    if (container && container.style.display === 'block') {
      breezeActive = true;
      setTimeout(() => { breezeActive = false; }, 1200);
    }
  }, 6000);

  // Monitor phase changes
  function checkPhase5() {
    var p5 = document.getElementById('p5');
    if (p5 && p5.classList.contains('active')) {
      setLeavesVisibility(true);
      if (!leaves.length) startLeaves();
    } else {
      setLeavesVisibility(false);
    }
  }
  document.addEventListener('DOMContentLoaded', checkPhase5);
  var phaseEls = document.querySelectorAll('.screen');
  phaseEls.forEach(function(el) {
    var obs = new MutationObserver(checkPhase5);
    obs.observe(el, { attributes: true });
  });

  // === PHASE 5: Comment & Help Desk Functions ===
  
  // Submit user comment
  window.submitUserComment = function() {
    var commentInput = document.getElementById('commentInput');
    var commentMessage = document.getElementById('commentMessage');
    var commentText = commentInput ? commentInput.value.trim() : '';
    
    if (!commentText) {
      alert('Please enter a comment before submitting.');
      return;
    }
    
    // Show success message
    if (commentMessage) {
      commentMessage.style.display = 'block';
    }
    
    // Clear input
    if (commentInput) {
      commentInput.value = '';
    }
    
    // Hide message after 3 seconds
    setTimeout(function() {
      if (commentMessage) {
        commentMessage.style.display = 'none';
      }
    }, 3000);
  };
  
  // Open help desk panel
  window.openHelpDeskMail = function() {
    var helpDeskPanel = document.getElementById('helpDeskPanel');
    var helpDeskBtn = document.getElementById('helpDeskBtn');
    
    if (helpDeskPanel) {
      helpDeskPanel.style.display = 'block';
    }
    
    if (helpDeskBtn) {
      helpDeskBtn.style.display = 'none';
    }
  };
  
  // Close help desk panel
  window.closeHelpDeskMail = function() {
    var helpDeskPanel = document.getElementById('helpDeskPanel');
    var helpDeskBtn = document.getElementById('helpDeskBtn');
    var helpDeskMessage = document.getElementById('helpDeskMessage');
    
    if (helpDeskPanel) {
      helpDeskPanel.style.display = 'none';
    }
    
    if (helpDeskBtn) {
      helpDeskBtn.style.display = 'block';
    }
    
    if (helpDeskMessage) {
      helpDeskMessage.value = '';
    }
  };
  
  // Submit help desk message
  window.submitHelpDeskMail = function() {
    var helpDeskMessage = document.getElementById('helpDeskMessage');
    var helpDeskPanel = document.getElementById('helpDeskPanel');
    var helpDeskSuccess = document.getElementById('helpDeskSuccess');
    var helpDeskBtn = document.getElementById('helpDeskBtn');
    var messageText = helpDeskMessage ? helpDeskMessage.value.trim() : '';
    
    if (!messageText) {
      alert('Please enter a message before sending.');
      return;
    }
    
    // Hide panel and show success message
    if (helpDeskPanel) {
      helpDeskPanel.style.display = 'none';
    }
    
    if (helpDeskSuccess) {
      helpDeskSuccess.style.display = 'block';
    }
    
    if (helpDeskBtn) {
      helpDeskBtn.style.display = 'none';
    }
    
    // Reset message
    if (helpDeskMessage) {
      helpDeskMessage.value = '';
    }
    
    // Hide success message after 4 seconds
    setTimeout(function() {
      if (helpDeskSuccess) {
        helpDeskSuccess.style.display = 'none';
      }
      if (helpDeskBtn) {
        helpDeskBtn.style.display = 'block';
      }
    }, 4000);
  };

})();

// After Phase 3 question 5 is answered:
// Ensure currentQuestion is defined globally or in the relevant scope
if (typeof currentQuestion === 'undefined') {
  var currentQuestion = 0; // Default value, update as needed in quiz logic
}
if (typeof P3_completed === 'undefined') {
  var P3_completed = false; // Ensure P3_completed is defined
}
if (currentQuestion === 5 && P3_completed && window.BlessingVersePro && window.BlessingVersePro.show) {
  window.BlessingVersePro.show();
} else if (currentQuestion === 5 && P3_completed) {
  console.warn('⚠️ BlessingVersePro not yet loaded. Will be available after Phase 2 assets load.');
}

/* ========================================
   GARDEN WAVE ANIMATION (from gardenWave.js)
   ======================================== */
window.addEventListener('DOMContentLoaded', function() {
  const waveSpan = document.getElementById('gardenWave');
  if (!waveSpan) return;

  let wavePhase = 0;
  function animateWave() {
    wavePhase += 0.08;
    const text = waveSpan.textContent;
    // Split into words for coloring
    const words = text.split(' ');
    let html = '';
    let charIndex = 0;
    words.forEach((word, wIdx) => {
      let color = '#38b000'; // green
      if (word.toLowerCase() === 'of') color = '#e4ce0aff';
      // Blessings also green
      html += '<span style="white-space:pre">';
      for (let i = 0; i < word.length; i++, charIndex++) {
        const x = Math.sin(wavePhase + charIndex * 0.45) * 2.2;
        html += `<span style="display:inline-block;transform:translateX(${x}px);color:${color}">${word[i]}</span>`;
      }
      html += '</span>';
      if (wIdx < words.length - 1) html += ' ';
    });
    waveSpan.innerHTML = html;
    requestAnimationFrame(animateWave);
  }
  animateWave();
});

/* ========================================
   PIGGY BANK TOOLTIP (from piggy-tooltip.js)
   ======================================== */
(function() {
  function showPiggyTooltip() {
    var piggy = document.getElementById('piggyBank');
    var tooltip = document.getElementById('piggy-tooltip');
    if (!piggy || !tooltip) return;
    // Position tooltip above piggy bank
    var rect = piggy.getBoundingClientRect();
    var scrollY = window.scrollY || window.pageYOffset;
    var scrollX = window.scrollX || window.pageXOffset;
    tooltip.style.display = 'block';
    tooltip.style.position = 'absolute';
    tooltip.style.left = (rect.left + rect.width/2 + scrollX) + 'px';
    tooltip.style.top = (rect.top + scrollY - tooltip.offsetHeight - 18) + 'px';
    // Fade in
    setTimeout(function() {
      tooltip.classList.add('visible');
    }, 10);
    // Fade out after 3s
    setTimeout(function() {
      tooltip.classList.remove('visible');
      setTimeout(function() {
        tooltip.style.display = 'none';
      }, 700);
    }, 3000);
  }
  window.addEventListener('DOMContentLoaded', function() {
    setTimeout(showPiggyTooltip, 10000);
  });
})();










