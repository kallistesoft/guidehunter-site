// Theme toggle (light / dark, remembered), the language link and the mobile menu.
(function () {
  var root = document.documentElement;
  var dark = function () {
    return root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  };
  document.querySelector('.theme').addEventListener('click', function () {
    var next = dark() ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // The FR/EN link wins over the browser's language from now on (see LANGUAGE_SCRIPT in tools/build.mjs).
  document.querySelector('.lang').addEventListener('click', function (e) {
    try { localStorage.setItem('lang', e.currentTarget.hreflang.slice(0, 2)); } catch (err) {}
  });

  var menu = document.querySelector('.menu');
  var nav = document.getElementById('nav');
  menu.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('open')) { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.focus(); }
  });
})();
