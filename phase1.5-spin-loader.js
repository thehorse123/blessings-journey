/**
 * PHASE 1.5: DYNAMIC LOADER (On Spin Button Click)
 * 
 * Triggers ONLY when user clicks the Spin button (#spinBp).
 * Loads payment scripts and Payhip without blocking Phase 1 interaction.
 * 
 * NO auto-execution. NO preloading. Only loads on explicit user intent.
 */

const Phase1Point5SpinLoader = {
  isLoaded: false,
  isLoading: false,

  /**
   * Initialize Spin button listener (call from script.js)
   */
  init() {
    console.log('🎯 Phase 1.5: Attaching Spin button listener...');
    
    const spinBtn = document.getElementById('spinBp');
    if (!spinBtn) {
      console.warn('⚠️ Spin button not found. Phase 1.5 loader not attached.');
      return;
    }

    // Load once on first Spin click
    spinBtn.addEventListener('click', () => {
      if (!this.isLoaded && !this.isLoading) {
        this.loadPhase1Point5Assets();
      }
    }, { once: true });

    console.log('✅ Phase 1.5: Spin button listener attached');
  },

  /**
   * Load Phase 1.5 assets dynamically
   */
  async loadPhase1Point5Assets() {
    if (this.isLoaded || this.isLoading) return;
    this.isLoading = true;

    console.log('🚀 Phase 1.5: Loading Payhip and payment scripts on Spin...');

    try {
      // Load Payhip via Phase2PayhipLoader if available
      if (window.Phase2PayhipLoader && window.Phase2PayhipLoader.loadPayhip) {
        await Phase2PayhipLoader.loadPayhip();
        console.log('✅ Phase 1.5: Payhip loaded');
      } else {
        console.warn('⚠️ Phase 1.5: Phase2PayhipLoader not available');
      }

      this.isLoaded = true;
      console.log('✅ Phase 1.5: All assets loaded successfully');
      window.dispatchEvent(new Event('phase1.5-assets-loaded'));

    } catch (error) {
      console.error('❌ Phase 1.5 loading error:', error);
    } finally {
      this.isLoading = false;
    }
  }
};

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => Phase1Point5SpinLoader.init());
} else {
  Phase1Point5SpinLoader.init();
}
