function validirajPodatke(podaci) {
  const validniStatusi = ['slobodno', 'zauzeto', 'rezervisano'];

  if (!podaci || !Array.isArray(podaci.projekcije) || podaci.projekcije.length === 0) {
    return false;
  }

  for (const proj of podaci.projekcije) {
    if (!proj.film || !proj.vrijeme || !Array.isArray(proj.sjedista)) {
      return false;
    }
    for (const sjediste of proj.sjedista) {
      if (!validniStatusi.includes(sjediste.status)) {
        return false;
      }
    }
  }

  return true;
}

let trenutniIndex = 0;

function iscrtajSalu() {
  const projekcija = podaci.projekcije[trenutniIndex];

  document.getElementById('info-naziv').textContent   = projekcija.film;
  document.getElementById('info-vrijeme').textContent = projekcija.vrijeme;
  document.getElementById('info-sala').textContent    = projekcija.sala ?? (trenutniIndex + 1);

  const select = document.getElementById('film-select');
  if (select) select.value = trenutniIndex;

  const grid = document.getElementById('hall-grid');
  grid.innerHTML = '';

  const redovi = {};
  for (const sj of projekcija.sjedista) {
    if (!redovi[sj.red]) redovi[sj.red] = [];
    redovi[sj.red].push(sj);
  }

  const sortiraniRedovi = Object.keys(redovi).sort();

  for (const slovo of sortiraniRedovi) {
    const row = document.createElement('div');
    row.className = 'seat-row';

    const label = document.createElement('div');
    label.className = 'row-label';
    label.textContent = slovo;
    row.appendChild(label);

    const sjedistaNaRed = redovi[slovo].sort((a, b) => a.broj - b.broj);

    for (const sj of sjedistaNaRed) {
      const seat = document.createElement('div');
      seat.className = 'seat';
      seat.title = `${slovo}${sj.broj} – ${sj.status}`;

      if (sj.status === 'slobodno') {
        seat.classList.add('free');
        seat.addEventListener('click', () => {
          sj.status = 'rezervisano';
          iscrtajSalu();
        });
      } else if (sj.status === 'zauzeto') {
        seat.classList.add('taken');
      } else {
        seat.classList.add('reserved');
      }

      row.appendChild(seat);
    }

    grid.appendChild(row);
  }

  azurirajDugmad();
}

function azurirajDugmad() {
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');

  if (btnPrev) btnPrev.disabled = (trenutniIndex === 0);
  if (btnNext) btnNext.disabled = (trenutniIndex === podaci.projekcije.length - 1);
}

function popuniSelect() {
  const select = document.getElementById('film-select');
  if (!select) return;

  select.innerHTML = '';
  podaci.projekcije.forEach((proj, i) => {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = `${proj.film} – ${proj.vrijeme}`;
    select.appendChild(opt);
  });

  select.addEventListener('change', () => {
    trenutniIndex = parseInt(select.value, 10);
    iscrtajSalu();
  });
}

function dodajDugmad() {
  if (document.getElementById('btn-prev')) return;

  const wrap = document.createElement('div');
  wrap.className = 'nav-buttons';
  wrap.innerHTML = `
    <button id="btn-prev" class="nav-btn">&#8592; Prethodna projekcija</button>
    <button id="btn-next" class="nav-btn">Sljedeća projekcija &#8594;</button>
  `;

  const hallWrap = document.querySelector('.hall-wrap');
  if (hallWrap && hallWrap.parentNode) {
    hallWrap.parentNode.insertBefore(wrap, hallWrap.nextSibling);
  } else {
    document.querySelector('main').appendChild(wrap);
  }

  document.getElementById('btn-prev').addEventListener('click', () => {
    if (trenutniIndex > 0) {
      trenutniIndex--;
      iscrtajSalu();
    }
  });

  document.getElementById('btn-next').addEventListener('click', () => {
    if (trenutniIndex < podaci.projekcije.length - 1) {
      trenutniIndex++;
      iscrtajSalu();
    }
  });
}

function dodajStilDugmadi() {
  if (document.getElementById('kinoSala-style')) return;
  const style = document.createElement('style');
  style.id = 'kinoSala-style';
  style.textContent = `
    .nav-buttons {
      display: flex;
      gap: 1rem;
      margin-top: 1.5rem;
      flex-wrap: wrap;
    }
    .nav-btn {
      background: var(--surface, #17171f);
      color: var(--text, #e8e3d9);
      border: 1px solid var(--border, rgba(200,151,74,.18));
      border-radius: 6px;
      padding: .55rem 1.2rem;
      font-family: 'DM Sans', sans-serif;
      font-size: .9rem;
      font-weight: 500;
      cursor: pointer;
      transition: background .2s, border-color .2s, color .2s;
    }
    .nav-btn:hover:not(:disabled) {
      background: var(--accent, #c8974a);
      color: #0e0e14;
      border-color: var(--accent, #c8974a);
    }
    .nav-btn:disabled {
      opacity: .35;
      cursor: not-allowed;
    }
  `;
  document.head.appendChild(style);
}

(function init() {
  if (!validirajPodatke(podaci)) {
    const main = document.querySelector('main');
    const poruka = document.createElement('p');
    poruka.style.cssText = 'color:#e74c3c;font-weight:600;margin-top:1rem;';
    poruka.textContent = 'Podaci nisu validni!';
    if (main) main.prepend(poruka);
    return;
  }

  dodajStilDugmadi();
  popuniSelect();
  dodajDugmad();
  iscrtajSalu();
})();