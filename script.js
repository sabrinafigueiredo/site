// Identificador de dispositivo: marca o body para permitir ajustes finos por tipo de entrada
  var deviceClass = window.matchMedia('(hover: none), (pointer: coarse)').matches ? 'is-touch' : 'is-desktop';
  document.body.classList.add(deviceClass);

  // Em telas sem hover (celular/tablet), o toque na foto principal dispara as ondas sonoras
  var heroArtWrap = document.querySelector('.hero-art-wrap');
  if (heroArtWrap && deviceClass === 'is-touch') {
    heroArtWrap.addEventListener('click', function(){
      heroArtWrap.classList.add('sonar-active');
      window.clearTimeout(heroArtWrap._sonarTimeout);
      heroArtWrap._sonarTimeout = window.setTimeout(function(){
        heroArtWrap.classList.remove('sonar-active');
      }, 2100);
    });
  }

  const nav = document.getElementById('siteNav');
  window.addEventListener('scroll', () => { nav.classList.toggle('scrolled', window.scrollY > 20); }, { passive: true });

  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  navToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.style.display === 'block';
    mobileMenu.style.display = isOpen ? 'none' : 'block';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
  });
  document.querySelectorAll('#mobileMenu a').forEach(a => { a.addEventListener('click', () => { mobileMenu.style.display = 'none'; }); });

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealEls = document.querySelectorAll('.reveal');
  if (prefersReduced || !('IntersectionObserver' in window)) {
    revealEls.forEach(el => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  }

  // Máscara de celular brasileira
  const celInput = document.getElementById('qf-celular');
  celInput.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 11);
    if (v.length > 6) v = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
    else if (v.length > 2) v = `(${v.slice(0,2)}) ${v.slice(2)}`;
    else if (v.length > 0) v = `(${v}`;
    e.target.value = v;
  });

  // Formulário de qualificação -> WhatsApp
  document.getElementById('qualForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('qf-nome').value.trim();
    const celular = document.getElementById('qf-celular').value.trim();
    const testou = document.querySelector('input[name="qf-testou"]:checked');
    const tempo = document.querySelector('input[name="qf-tempo"]:checked');
    let msg = `Olá Sabrina Figueiredo, meu nome é ${nome} e tenho interesse em agendar o teste auditivo gratuito. `;
    msg += `Celular: ${celular}. `;
    if (testou) msg += `Já testei aparelho auditivo antes: ${testou.value}. `;
    if (tempo) msg += `Tempo com dificuldade auditiva: ${tempo.value}.`;
    const url = 'https://api.whatsapp.com/send?phone=5511946910734&text=' + encodeURIComponent(msg);
    window.open(url, '_blank');
  });
