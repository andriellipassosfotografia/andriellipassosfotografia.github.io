/* =========================================================
   Andrielli Passos Fotografia — interações
   ========================================================= */
(function () {
  'use strict';

  var doc = document;

  /* ---------- ano no rodapé ---------- */
  var ano = doc.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();

  /* ---------- cabeçalho ao rolar ---------- */
  var topo = doc.getElementById('topo');
  function aoRolar() {
    topo.classList.toggle('is-rolado', window.scrollY > 40);
  }
  window.addEventListener('scroll', aoRolar, { passive: true });
  aoRolar();

  /* ---------- menu mobile ---------- */
  var botaoMenu = doc.getElementById('hamburguer');
  var menu = doc.getElementById('menu');
  function fechaMenu() {
    menu.classList.remove('is-aberto');
    botaoMenu.classList.remove('is-aberto');
    botaoMenu.setAttribute('aria-expanded', 'false');
    botaoMenu.setAttribute('aria-label', 'Abrir menu');
    doc.body.style.overflow = '';
  }
  botaoMenu.addEventListener('click', function () {
    var abrindo = !menu.classList.contains('is-aberto');
    menu.classList.toggle('is-aberto', abrindo);
    botaoMenu.classList.toggle('is-aberto', abrindo);
    botaoMenu.setAttribute('aria-expanded', String(abrindo));
    botaoMenu.setAttribute('aria-label', abrindo ? 'Fechar menu' : 'Abrir menu');
    doc.body.style.overflow = abrindo ? 'hidden' : '';
  });
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', fechaMenu);
  });

  /* ---------- revelar seções ao rolar ---------- */
  var alvos = doc.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visivel');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    alvos.forEach(function (el) { obs.observe(el); });
  } else {
    alvos.forEach(function (el) { el.classList.add('is-visivel'); });
  }

  /* ---------- filtros do portfólio ---------- */
  var filtros = doc.querySelectorAll('.filtro');
  var fotos = Array.prototype.slice.call(doc.querySelectorAll('.foto'));
  var vazio = doc.getElementById('galeriaVazio');

  filtros.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var cat = btn.dataset.filtro;

      filtros.forEach(function (b) {
        var ativo = b === btn;
        b.classList.toggle('is-ativo', ativo);
        b.setAttribute('aria-pressed', String(ativo));
      });

      var visiveis = 0;
      fotos.forEach(function (fig) {
        var cats = (fig.dataset.cat || '').split(' ');
        var mostrar = cat === 'todos' || cats.indexOf(cat) !== -1;
        fig.classList.toggle('is-oculto', !mostrar);
        if (mostrar) visiveis++;
      });
      vazio.hidden = visiveis > 0;
    });
  });

  /* ---------- visualizador de foto (lightbox) ---------- */
  var lupa = doc.getElementById('lupa');
  var lupaImg = doc.getElementById('lupaImg');
  var lupaLegenda = doc.getElementById('lupaLegenda');
  var atual = -1;
  var ultimoFoco = null;

  function listaVisivel() {
    return fotos.filter(function (f) { return !f.classList.contains('is-oculto'); });
  }

  function mostra(indice) {
    var lista = listaVisivel();
    if (!lista.length) return;
    atual = (indice + lista.length) % lista.length;
    var btn = lista[atual].querySelector('.foto-btn');
    var img = btn.querySelector('img');
    lupaImg.src = btn.dataset.full;
    lupaImg.alt = img.alt;
    lupaLegenda.textContent = btn.dataset.legenda || '';
  }

  function abre(fig) {
    ultimoFoco = doc.activeElement;
    mostra(listaVisivel().indexOf(fig));
    lupa.hidden = false;
    doc.body.style.overflow = 'hidden';
    doc.getElementById('lupaFechar').focus();
  }

  function fecha() {
    lupa.hidden = true;
    lupaImg.src = '';
    doc.body.style.overflow = '';
    if (ultimoFoco) ultimoFoco.focus();
  }

  fotos.forEach(function (fig) {
    fig.querySelector('.foto-btn').addEventListener('click', function () { abre(fig); });
  });

  doc.getElementById('lupaFechar').addEventListener('click', fecha);
  doc.getElementById('lupaAnt').addEventListener('click', function () { mostra(atual - 1); });
  doc.getElementById('lupaProx').addEventListener('click', function () { mostra(atual + 1); });
  lupa.addEventListener('click', function (e) { if (e.target === lupa) fecha(); });

  doc.addEventListener('keydown', function (e) {
    if (lupa.hidden) return;
    if (e.key === 'Escape') fecha();
    if (e.key === 'ArrowLeft') mostra(atual - 1);
    if (e.key === 'ArrowRight') mostra(atual + 1);
  });

  /* ---------- formulário: monta a mensagem ---------- */
  var aviso = doc.getElementById('formAviso');
  var botaoWhats = doc.getElementById('enviarWhats');
  var botaoEmail = doc.getElementById('enviarEmail');

  function coleta() {
    var v = function (id) { return doc.getElementById(id).value.trim(); };
    var nome = v('nome');
    if (!nome) {
      aviso.textContent = 'Escreva seu nome para eu saber com quem estou falando.';
      doc.getElementById('nome').focus();
      return null;
    }
    aviso.textContent = '';
    return {
      nome: nome,
      texto:
        'Olá, Andrielli! Meu nome é ' + nome + '.\n' +
        'Tenho interesse em: ' + v('tipo') + '\n' +
        (v('data') ? 'Data pensada: ' + v('data') + '\n' : '') +
        (v('fone') ? 'Meu WhatsApp: ' + v('fone') + '\n' : '') +
        (v('msg') ? '\n' + v('msg') : '')
    };
  }

  botaoWhats.addEventListener('click', function () {
    var d = coleta();
    if (!d) return;
    var fone = botaoWhats.dataset.fone;
    window.open('https://wa.me/' + fone + '?text=' + encodeURIComponent(d.texto), '_blank');
  });

  botaoEmail.addEventListener('click', function () {
    var d = coleta();
    if (!d) return;
    window.location.href =
      'mailto:passosestudiofotos@gmail.com' +
      '?subject=' + encodeURIComponent('Orçamento de ensaio — ' + d.nome) +
      '&body=' + encodeURIComponent(d.texto);
  });
})();
