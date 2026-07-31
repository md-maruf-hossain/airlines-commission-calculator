(function(){
  const $ = id => document.getElementById(id);

  // ---------- Theme toggle ----------
  const root = document.documentElement;
  const themeToggle = $('themeToggle');

  function currentTheme(){
    return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  themeToggle.addEventListener('click', () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
  });


  const inputs = {
    baseFare: $('baseFare'),
    totalTaxes: $('totalTaxes'),
    bspDiscount: $('bspDiscount'),
    aitPercent: $('aitPercent'),
    serviceCharge: $('serviceCharge')
  };

  const defaults = {
    baseFare: 50000.00,
    totalTaxes: 15000.00,
    bspDiscount: 7,
    aitPercent: 0.3,
    serviceCharge: 0.00
  };

  const fmt = (n) => {
    if (isNaN(n)) n = 0;
    return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // animate numeric text content smoothly between values
  const animated = {};
  function setValue(el, newVal, prefix) {
    prefix = prefix || '';
    const key = el.id;
    const from = animated[key] !== undefined ? animated[key] : newVal;
    const to = newVal;
    const duration = 350;
    const start = performance.now();

    function step(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = from + (to - from) * eased;
      el.textContent = prefix + fmt(current);
      if (t < 1) requestAnimationFrame(step);
      else animated[key] = to;
    }
    requestAnimationFrame(step);
  }

  function num(el) {
    const v = parseFloat(el.value);
    return isNaN(v) ? 0 : v;
  }

  function calculate() {
    const baseFare = num(inputs.baseFare);
    const totalTaxes = num(inputs.totalTaxes);
    const bspPct = num(inputs.bspDiscount);
    const aitPct = num(inputs.aitPercent);
    const serviceCharge = num(inputs.serviceCharge);

    const totalAirfare = baseFare + totalTaxes;
    const bspAmount = baseFare * bspPct / 100;
    const afterBsp = totalAirfare - bspAmount;
    const aitAmount = totalAirfare * aitPct / 100;
    const netCharge = afterBsp + aitAmount + serviceCharge;

    setValue($('outBaseFare'), baseFare);
    setValue($('outTotalTaxes'), totalTaxes);
    setValue($('outTotalAirfare'), totalAirfare);
    $('outBspPct').textContent = (bspPct % 1 === 0 ? bspPct : bspPct.toFixed(2));
    setValue($('outBspAmount'), bspAmount);
    setValue($('outAfterBsp'), afterBsp);
    $('outAitPct').textContent = (aitPct % 1 === 0 ? aitPct : aitPct.toFixed(2));
    setValue($('outAitAmount'), aitAmount);
    setValue($('outServiceCharge'), serviceCharge, '৳');
    setValue($('netCharge'), netCharge);
  }

  Object.values(inputs).forEach(el => {
    el.addEventListener('input', calculate);
  });

  $('resetBtn').addEventListener('click', () => {
    Object.keys(defaults).forEach(key => {
      inputs[key].value = defaults[key];
    });
    calculate();
  });

  calculate();
})();
