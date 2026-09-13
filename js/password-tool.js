/* ===================================================================
   INTERACTIVE PASSWORD ANALYZER & SECURE GENERATOR
   Cybersecurity Utility Demo (Project Showcase)
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Analyzer elements
  const passwordInput = document.getElementById('analyzer-input');
  const toggleVisibilityBtn = document.getElementById('toggle-pwd-visibility');
  const meterFill = document.getElementById('meter-fill');
  const strengthText = document.getElementById('strength-text');
  const entropyText = document.getElementById('entropy-text');
  const crackTimeText = document.getElementById('crack-time-text');

  // Criteria checks
  const checkLength = document.getElementById('check-length');
  const checkUpper = document.getElementById('check-upper');
  const checkLower = document.getElementById('check-lower');
  const checkNumber = document.getElementById('check-number');
  const checkSpecial = document.getElementById('check-special');

  // Generator elements
  const lengthSlider = document.getElementById('gen-length-slider');
  const lengthValue = document.getElementById('gen-length-val');
  const incUpper = document.getElementById('inc-upper');
  const incLower = document.getElementById('inc-lower');
  const incNumbers = document.getElementById('inc-numbers');
  const incSymbols = document.getElementById('inc-symbols');
  const generateBtn = document.getElementById('generate-pwd-btn');
  const generatedDisplay = document.getElementById('generated-pwd-text');
  const copyGeneratedBtn = document.getElementById('copy-generated-btn');
  const loadToAnalyzerBtn = document.getElementById('load-to-analyzer-btn');

  if (!passwordInput || !generateBtn) return;

  // Toggle password visibility
  if (toggleVisibilityBtn) {
    toggleVisibilityBtn.addEventListener('click', () => {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      const icon = toggleVisibilityBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
      }
    });
  }

  // Calculate Shannon Entropy
  function calculateEntropy(pwd) {
    if (!pwd) return 0;
    let poolSize = 0;
    if (/[a-z]/.test(pwd)) poolSize += 26;
    if (/[A-Z]/.test(pwd)) poolSize += 26;
    if (/[0-9]/.test(pwd)) poolSize += 10;
    if (/[^a-zA-Z0-9]/.test(pwd)) poolSize += 33;
    if (poolSize === 0) return 0;
    return Math.round(pwd.length * (Math.log2(poolSize)));
  }

  // Crack time estimation (Assuming 100 Billion hashes/sec high-end GPU cluster)
  function estimateCrackTime(entropy) {
    if (entropy <= 0) return 'Instant';
    const combinations = Math.pow(2, entropy);
    const hashesPerSec = 1e11; // 100 billion
    const seconds = combinations / (2 * hashesPerSec);

    if (seconds < 1) return '< 1 second';
    if (seconds < 60) return `${Math.round(seconds)} seconds`;
    if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
    if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
    if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
    if (seconds < 3153600000) return `${Math.round(seconds / 31536000)} years`;
    if (seconds < 3153600000000) return `${Math.round(seconds / 31536000000)} centuries`;
    return '10,000+ years';
  }

  function updateCheckItem(element, isValid) {
    if (!element) return;
    const icon = element.querySelector('.check-icon');
    if (isValid) {
      element.classList.add('valid');
      if (icon) icon.className = 'fas fa-check-circle check-icon';
    } else {
      element.classList.remove('valid');
      if (icon) icon.className = 'far fa-circle check-icon';
    }
  }

  // Analyze password function
  function analyzePassword(pwd) {
    if (!pwd) {
      meterFill.style.width = '0%';
      meterFill.style.backgroundColor = '#ff3366';
      strengthText.textContent = 'Strength: Enter password';
      strengthText.style.color = 'var(--text-muted)';
      entropyText.textContent = '0 bits';
      crackTimeText.textContent = '—';
      [checkLength, checkUpper, checkLower, checkNumber, checkSpecial].forEach(el => updateCheckItem(el, false));
      return;
    }

    const hasLen = pwd.length >= 12;
    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSpecial = /[^A-Za-z0-9]/.test(pwd);

    updateCheckItem(checkLength, hasLen);
    updateCheckItem(checkUpper, hasUpper);
    updateCheckItem(checkLower, hasLower);
    updateCheckItem(checkNumber, hasNumber);
    updateCheckItem(checkSpecial, hasSpecial);

    const entropy = calculateEntropy(pwd);
    entropyText.textContent = `${entropy} bits`;
    crackTimeText.textContent = estimateCrackTime(entropy);

    // Score evaluation
    let score = 0;
    if (pwd.length >= 8) score += 15;
    if (pwd.length >= 12) score += 20;
    if (pwd.length >= 16) score += 15;
    if (hasLower) score += 10;
    if (hasUpper) score += 15;
    if (hasNumber) score += 10;
    if (hasSpecial) score += 15;

    score = Math.min(score, 100);
    meterFill.style.width = `${score}%`;

    if (score < 40) {
      meterFill.style.backgroundColor = '#ff3366';
      strengthText.textContent = 'Strength: Weak';
      strengthText.style.color = '#ff3366';
    } else if (score < 70) {
      meterFill.style.backgroundColor = '#ffb703';
      strengthText.textContent = 'Strength: Moderate';
      strengthText.style.color = '#ffb703';
    } else if (score < 90) {
      meterFill.style.backgroundColor = '#00e5ff';
      strengthText.textContent = 'Strength: Strong';
      strengthText.style.color = '#00e5ff';
    } else {
      meterFill.style.backgroundColor = '#00ff9d';
      strengthText.textContent = 'Strength: Elite (SOC Ready)';
      strengthText.style.color = '#00ff9d';
    }
  }

  passwordInput.addEventListener('input', (e) => {
    analyzePassword(e.target.value);
  });

  // Generator Logic
  const CHARS = {
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lower: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
  };

  function generateSecurePassword() {
    let charPool = '';
    if (incUpper.checked) charPool += CHARS.upper;
    if (incLower.checked) charPool += CHARS.lower;
    if (incNumbers.checked) charPool += CHARS.numbers;
    if (incSymbols.checked) charPool += CHARS.symbols;

    if (!charPool) {
      incLower.checked = true;
      charPool = CHARS.lower;
    }

    const length = parseInt(lengthSlider.value, 10);
    const randomArray = new Uint32Array(length);
    window.crypto.getRandomValues(randomArray);

    let result = '';
    for (let i = 0; i < length; i++) {
      result += charPool[randomArray[i] % charPool.length];
    }

    generatedDisplay.textContent = result;
    return result;
  }

  lengthSlider.addEventListener('input', (e) => {
    lengthValue.textContent = e.target.value;
    generateSecurePassword();
  });

  [incUpper, incLower, incNumbers, incSymbols].forEach(cb => {
    cb.addEventListener('change', generateSecurePassword);
  });

  generateBtn.addEventListener('click', () => {
    generateSecurePassword();
  });

  // Copy Generated Password
  copyGeneratedBtn.addEventListener('click', async () => {
    const text = generatedDisplay.textContent;
    if (!text || text === 'Click generate') return;

    try {
      await navigator.clipboard.writeText(text);
      const originalIcon = copyGeneratedBtn.innerHTML;
      copyGeneratedBtn.innerHTML = '<i class="fas fa-check" style="color:var(--accent-green)"></i>';
      setTimeout(() => {
        copyGeneratedBtn.innerHTML = originalIcon;
      }, 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  });

  // Load into analyzer
  if (loadToAnalyzerBtn) {
    loadToAnalyzerBtn.addEventListener('click', () => {
      const text = generatedDisplay.textContent;
      if (!text || text === 'Click generate') return;
      passwordInput.value = text;
      passwordInput.setAttribute('type', 'text');
      analyzePassword(text);
      passwordInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  // Initial generation
  generateSecurePassword();
  // Initial default test string in analyzer for preview
  passwordInput.value = "CyberSec@2028#SOC";
  analyzePassword(passwordInput.value);
});
