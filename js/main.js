/**
 * Bunkyo Premier League
 * Main Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize QR Codes
  initQRCodes();

  // 2. Initialize Scroll Reveal Animations
  initScrollAnimations();

  // 3. Navbar scroll effect
  initNavbarEffect();
});

/**
 * Fallback for Logo image error
 * Displays the text fallback if the image path is invalid or fails to load.
 */
window.handleLogoError = function(img) {
  img.style.display = 'none';
  const fallback = img.parentElement.querySelector('.logo-fallback');
  if (fallback) {
    fallback.style.display = 'block';
  }
};

/**
 * Copy invitation text to clipboard and show toast
 */
window.copyInvite = function() {
  const text = document.getElementById('invite-msg').innerText;
  
  if (navigator.clipboard && window.isSecureContext) {
    // using modern API
    navigator.clipboard.writeText(text).then(() => {
      showToast();
    }).catch(err => {
      console.error('Failed to copy: ', err);
      fallbackCopyTextToClipboard(text);
    });
  } else {
    // fallback
    fallbackCopyTextToClipboard(text);
  }
};

function fallbackCopyTextToClipboard(text) {
  const el = document.createElement('textarea');
  el.value = text;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  showToast();
}

/**
 * Toast Notification Logic
 */
let toastTimeout;
function showToast() {
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/**
 * Initialize QR Codes using raw urls
 */
function initQRCodes() {
  const classicUrl = "https://fantasy.premierleague.com/leagues/auto-join/rb3s2e";
  const h2hUrl = "https://fantasy.premierleague.com/leagues/auto-join/9pqsln";

  const classicContainer = document.getElementById("qr-classic");
  const h2hContainer = document.getElementById("qr-h2h");

  if(classicContainer && window.QRCode) {
    new QRCode(classicContainer, {
      text: classicUrl,
      width: 160,
      height: 160,
      colorDark: "#3d195b",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.M
    });
  }

  if(h2hContainer && window.QRCode) {
    new QRCode(h2hContainer, {
      text: h2hUrl,
      width: 160,
      height: 160,
      colorDark: "#e90052",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.M
    });
  }
}

/**
 * Scroll Reveal Animations using IntersectionObserver
 */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('[data-reveal]');
  
  // Set delay dynamically
  revealElements.forEach(el => {
    const delay = el.getAttribute('data-delay');
    if (delay) {
      el.style.transitionDelay = `${delay}ms`;
    }
  });

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        // Stop observing once revealed
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
}

/**
 * Navbar blur and shadow on scroll
 */
function initNavbarEffect() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
      nav.style.borderBottom = '1px solid rgba(229, 231, 235, 1)';
    } else {
      nav.style.boxShadow = 'none';
      nav.style.borderBottom = '1px solid rgba(229, 231, 235, 0.5)';
    }
  });
}
