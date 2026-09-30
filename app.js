/**
 * REAL MADRID C.F. - THEMED WEBSITE ENGINE
 * High-performance Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initStickyHeader();
  initMobileMenu();
  initCountdown();
  initAnthemAudio();
  initTrophyModal();
  initLegendsFilter();
  initLegendModal();
  initHistoryFilter();
  initMatchCenterTabs();
  initMatchPredictor();
  initFanQuiz();
});

/* ==========================================================================
   1. THEME SWITCHER (White Classic vs Floodlight Night Mode)
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  if (!toggleBtn) return;

  const currentTheme = localStorage.getItem('rm_theme') || 'white';
  if (currentTheme === 'floodlight') {
    document.documentElement.setAttribute('data-theme', 'floodlight');
    updateThemeIcon(true);
  }

  toggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'floodlight';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('rm_theme', 'white');
      updateThemeIcon(false);
    } else {
      document.documentElement.setAttribute('data-theme', 'floodlight');
      localStorage.setItem('rm_theme', 'floodlight');
      updateThemeIcon(true);
    }
  });

  function updateThemeIcon(isDark) {
    toggleBtn.innerHTML = isDark
      ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
      : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    toggleBtn.setAttribute('title', isDark ? 'Switch to Pristine White Mode' : 'Switch to Bernabéu Floodlight Mode');
  }
}

/* ==========================================================================
   2. STICKY HEADER & ACTIVE SECTION HIGHLIGHTING
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll spy
    let currentId = '';
    const scrollPosition = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   3. MOBILE NAVIGATION MENU
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  if (!menuBtn || !navMenu) return;

  menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const isOpen = navMenu.classList.contains('active');
    menuBtn.innerHTML = isOpen
      ? `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
      : `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
  });

  // Close menu on link click
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      menuBtn.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });
  });
}

/* ==========================================================================
   4. LIVE MATCHDAY COUNTDOWN TIMER (El Clásico)
   ========================================================================== */
function initCountdown() {
  const daysEl = document.getElementById('countDays');
  const hoursEl = document.getElementById('countHours');
  const minsEl = document.getElementById('countMins');
  const secsEl = document.getElementById('countSecs');

  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  // Set match date 3 days, 16 hours ahead of right now
  let targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 3);
  targetDate.setHours(targetDate.getHours() + 16);
  targetDate.setMinutes(targetDate.getMinutes() + 35);

  function update() {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance < 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';
      return;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = d < 10 ? `0${d}` : d;
    hoursEl.textContent = h < 10 ? `0${h}` : h;
    minsEl.textContent = m < 10 ? `0${m}` : m;
    secsEl.textContent = s < 10 ? `0${s}` : s;
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   5. WEB AUDIO API - REAL MADRID ROYAL FANFARE
   ========================================================================== */
let audioCtx = null;
let isPlayingAnthem = false;

function initAnthemAudio() {
  const anthemNavBtn = document.getElementById('anthemNavBtn');
  const anthemMainBtn = document.getElementById('anthemMainBtn');

  const buttons = [anthemNavBtn, anthemMainBtn].filter(Boolean);

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleAnthemAudio(buttons);
    });
  });
}

function toggleAnthemAudio(buttons) {
  if (isPlayingAnthem) {
    stopFanfare();
    buttons.forEach(b => {
      b.classList.remove('playing');
      const textSpan = b.querySelector('.anthem-label');
      if (textSpan) textSpan.textContent = 'Anthem Fanfare';
    });
    isPlayingAnthem = false;
    return;
  }

  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!audioCtx) {
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    playHalaMadridFanfare(() => {
      buttons.forEach(b => {
        b.classList.remove('playing');
        const textSpan = b.querySelector('.anthem-label');
        if (textSpan) textSpan.textContent = 'Anthem Fanfare';
      });
      isPlayingAnthem = false;
    });

    buttons.forEach(b => {
      b.classList.add('playing');
      const textSpan = b.querySelector('.anthem-label');
      if (textSpan) textSpan.textContent = 'Playing...';
    });
    isPlayingAnthem = true;
  } catch (err) {
    console.error('Audio could not be initialized:', err);
  }
}

let activeOscillators = [];

function stopFanfare() {
  activeOscillators.forEach(osc => {
    try {
      osc.stop();
      osc.disconnect();
    } catch (e) {}
  });
  activeOscillators = [];
}

function playHalaMadridFanfare(onComplete) {
  stopFanfare();
  if (!audioCtx) return;

  // Royal Fanfare Brass Harmony ("¡Hala Madrid y nada más!" celebratory motif)
  // Notes in Hz: C4=261.6, D4=293.7, E4=329.6, F4=349.2, G4=392.0, A4=440.0, B4=493.9, C5=523.3, E5=659.3, G5=784.0
  const fanfareNotes = [
    { note: 392.0, dur: 0.22, delay: 0 },       // G4
    { note: 523.3, dur: 0.24, delay: 0.25 },    // C5
    { note: 659.3, dur: 0.28, delay: 0.52 },    // E5
    { note: 784.0, dur: 0.65, delay: 0.82 },    // G5 (triumphant hold)
    { note: 659.3, dur: 0.25, delay: 1.55 },    // E5
    { note: 784.0, dur: 0.85, delay: 1.85 },    // G5
    { note: 523.3, dur: 0.25, delay: 2.75 },    // C5
    { note: 587.3, dur: 0.25, delay: 3.02 },    // D5
    { note: 659.3, dur: 0.40, delay: 3.30 },    // E5
    { note: 587.3, dur: 0.35, delay: 3.75 },    // D5
    { note: 523.3, dur: 1.20, delay: 4.15 }     // C5 (grand majestic finale)
  ];

  const totalTime = 5.5;

  fanfareNotes.forEach(({ note, dur, delay }) => {
    const startTime = audioCtx.currentTime + delay;

    // Brass Lead Osc
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(note, startTime);

    // Warm filter for regal brass timbre
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, startTime);

    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.linearRampToValueAtTime(0.18, startTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + dur);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(startTime);
    osc.stop(startTime + dur);
    activeOscillators.push(osc);

    // Subtle Sub-Harmonic Octave for richness
    const subOsc = audioCtx.createOscillator();
    const subGain = audioCtx.createGain();
    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(note / 2, startTime);

    subGain.gain.setValueAtTime(0.001, startTime);
    subGain.gain.linearRampToValueAtTime(0.12, startTime + 0.05);
    subGain.gain.exponentialRampToValueAtTime(0.001, startTime + dur);

    subOsc.connect(subGain);
    subGain.connect(audioCtx.destination);

    subOsc.start(startTime);
    subOsc.stop(startTime + dur);
    activeOscillators.push(subOsc);
  });

  setTimeout(() => {
    if (onComplete) onComplete();
  }, totalTime * 1000);
}

/* ==========================================================================
   6. TROPHY CABINET & MODAL INSPECTION
   ========================================================================== */
const trophiesData = {
  ucl: {
    title: 'UEFA Champions League / European Cup',
    count: '15',
    tag: 'Kings of Europe (Historic Record)',
    summary: 'No club in world football matches Real Madrid\'s peerless dominance in Europe\'s supreme club competition. From winning the inaugural five titles to the modern Wembley glory.',
    years: '1956, 1957, 1958, 1959, 1960, 1966, 1998, 2000, 2002, 2014, 2016, 2017, 2018, 2022, 2024',
    finalsHighlights: [
      { year: '1956', score: 'Real Madrid 4 - 3 Stade de Reims', venue: 'Parc des Princes, Paris', hero: 'Di Stéfano & Rial' },
      { year: '1960', score: 'Real Madrid 7 - 3 Eintracht Frankfurt', venue: 'Hampden Park, Glasgow', hero: 'Puskás (4 goals), Di Stéfano (3 goals)' },
      { year: '1998', score: 'Real Madrid 1 - 0 Juventus', venue: 'Amsterdam Arena', hero: 'Predrag Mijatović (La Séptima)' },
      { year: '2002', score: 'Real Madrid 2 - 1 Bayer Leverkusen', venue: 'Hampden Park, Glasgow', hero: 'Zidane Iconic Volley & Casillas saves' },
      { year: '2014', score: 'Real Madrid 4 - 1 (aet) Atlético Madrid', venue: 'Estádio da Luz, Lisbon', hero: 'Sergio Ramos (92:48) - La Décima' },
      { year: '2017', score: 'Real Madrid 4 - 1 Juventus', venue: 'Millennium Stadium, Cardiff', hero: 'Cristiano Ronaldo brace (Historic Back-to-Back)' },
      { year: '2018', score: 'Real Madrid 3 - 1 Liverpool', venue: 'Kyiv NSC Olimpiyskiy', hero: 'Bale Overhead Bicycle Kick (Historic Three-Peat)' },
      { year: '2022', score: 'Real Madrid 1 - 0 Liverpool', venue: 'Stade de France, Paris', hero: 'Vinícius Jr. & Courtois 9 saves' },
      { year: '2024', score: 'Real Madrid 2 - 0 Borussia Dortmund', venue: 'Wembley Stadium, London', hero: 'Carvajal & Vinícius Jr. - La Decimoquinta' }
    ]
  },
  laliga: {
    title: 'La Liga (Spanish Championship)',
    count: '36',
    tag: 'Domestic Record Holders',
    summary: 'The uncontested kings of Spanish football. Real Madrid holds the absolute record for the most Primera División championships in Spanish history.',
    years: '1932, 1933, 1954, 1955, 1957, 1958, 1961, 1962, 1963, 1964, 1965, 1967, 1968, 1969, 1972, 1975, 1976, 1978, 1979, 1980, 1986, 1987, 1988, 1989, 1990, 1995, 1997, 2001, 2003, 2007, 2008, 2012, 2017, 2020, 2022, 2024',
    finalsHighlights: [
      { year: '2011-12', score: 'La Liga de los Récords (100 pts, 121 goals)', venue: 'Spain', hero: 'José Mourinho & Cristiano Ronaldo' },
      { year: '1985-90', score: 'La Quinta del Buitre 5 Consecutive Titles', venue: 'Spain', hero: 'Butragueño, Míchel, Hugo Sánchez' },
      { year: '2023-24', score: '95 Points, only 1 defeat all season', venue: 'Spain', hero: 'Jude Bellingham, Vinícius Jr., Ancelotti' }
    ]
  },
  copadelrey: {
    title: 'Copa del Rey (Spanish Cup)',
    count: '20',
    tag: 'National Knockout Cup',
    summary: 'Real Madrid\'s historic journey in Spain\'s oldest national football competition, crowned with iconic triumphs in El Clásico finals.',
    years: '1905, 1906, 1907, 1908, 1917, 1934, 1936, 1946, 1947, 1962, 1970, 1974, 1975, 1980, 1982, 1989, 1993, 2011, 2014, 2023',
    finalsHighlights: [
      { year: '2011', score: 'Real Madrid 1 - 0 Barcelona (aet)', venue: 'Mestalla, Valencia', hero: 'Cristiano Ronaldo header in extra time' },
      { year: '2014', score: 'Real Madrid 2 - 1 Barcelona', venue: 'Mestalla, Valencia', hero: 'Gareth Bale iconic sprint down the sideline' },
      { year: '2023', score: 'Real Madrid 2 - 1 Osasuna', venue: 'La Cartuja, Seville', hero: 'Rodrygo Goes double' }
    ]
  },
  worldcup: {
    title: 'FIFA Club World Cup & Intercontinental Cup',
    count: '8',
    tag: 'World Champions Record',
    summary: 'Real Madrid has been crowned Champion of the World a record 8 times (5 FIFA Club World Cups + 3 Intercontinental Cups).',
    years: '1960, 1998, 2002 (Intercontinental) | 2014, 2016, 2017, 2018, 2022 (Club World Cup)',
    finalsHighlights: [
      { year: '1960', score: 'Real Madrid 5 - 1 Peñarol (agg)', venue: 'Santiago Bernabéu', hero: 'Puskás & Di Stéfano' },
      { year: '1998', score: 'Real Madrid 2 - 1 Vasco da Gama', venue: 'National Stadium, Tokyo', hero: 'Raúl González "Gol del Aguanís"' },
      { year: '2022', score: 'Real Madrid 5 - 3 Al-Hilal', venue: 'Prince Moulay Abdellah, Rabat', hero: 'Vinícius Jr. & Valverde' }
    ]
  },
  supercup: {
    title: 'UEFA Super Cup',
    count: '6',
    tag: 'European Super Cup Record',
    summary: 'The outright European record holders. Real Madrid became the first club in history to lift 6 UEFA Super Cups after their triumph in Warsaw in 2024.',
    years: '2002, 2014, 2016, 2017, 2022, 2024',
    finalsHighlights: [
      { year: '2002', score: 'Real Madrid 3 - 1 Feyenoord', venue: 'Stade Louis II, Monaco', hero: 'Roberto Carlos & Guti' },
      { year: '2014', score: 'Real Madrid 2 - 0 Sevilla', venue: 'Cardiff City Stadium', hero: 'Cristiano Ronaldo brace' },
      { year: '2024', score: 'Real Madrid 2 - 0 Atalanta', venue: 'National Stadium, Warsaw', hero: 'Valverde & Kylian Mbappé debut goal' }
    ]
  },
  supercopa: {
    title: 'Supercopa de España',
    count: '13',
    tag: 'Spanish Super Cup',
    summary: 'Spain\'s super cup battle between the champions of La Liga and the Copa del Rey, filled with Clásico masterclasses.',
    years: '1988, 1989, 1990, 1993, 1997, 2001, 2003, 2008, 2012, 2017, 2020, 2022, 2024',
    finalsHighlights: [
      { year: '2024', score: 'Real Madrid 4 - 1 Barcelona', venue: 'Al-Awwal Park, Riyadh', hero: 'Vinícius Jr. first-half hat-trick' }
    ]
  },
  century: {
    title: 'FIFA Club of the Century',
    count: '1',
    tag: 'Sole Club in Football History',
    summary: 'On 11 December 2000, FIFA officially awarded Real Madrid CF the title of "Best Club of the 20th Century" with an astounding 42.35% of the total votes, miles ahead of Manchester United and Bayern Munich.',
    years: 'Awarded December 2000 in Rome',
    finalsHighlights: [
      { year: '2000', score: '42.35% of global votes', venue: 'Rome World Gala', hero: 'Presented to Alfredo Di Stéfano & Florentino Pérez' }
    ]
  }
};

function initTrophyModal() {
  const modalBackdrop = document.getElementById('trophyModalBackdrop');
  const closeBtn = document.getElementById('trophyModalClose');
  const trophyCards = document.querySelectorAll('.trophy-card');

  if (!modalBackdrop) return;

  trophyCards.forEach(card => {
    card.addEventListener('click', () => {
      const trophyKey = card.getAttribute('data-trophy-id');
      const data = trophiesData[trophyKey];
      if (!data) return;

      document.getElementById('modalTrophyTitle').textContent = data.title;
      document.getElementById('modalTrophyCount').textContent = `${data.count} TITLES`;
      document.getElementById('modalTrophyTag').textContent = data.tag;
      document.getElementById('modalTrophyDesc').textContent = data.summary;
      document.getElementById('modalTrophyYears').textContent = data.years;

      const highlightsList = document.getElementById('modalTrophyHighlights');
      highlightsList.innerHTML = '';

      if (data.finalsHighlights && data.finalsHighlights.length) {
        data.finalsHighlights.forEach(item => {
          const li = document.createElement('div');
          li.className = 'timeline-highlight-box';
          li.style.marginBottom = '0.75rem';
          li.innerHTML = `<strong>${item.year} • ${item.score}</strong><br><span style="font-size:0.8rem; color:var(--text-muted);">${item.venue} — Key Match: ${item.hero}</span>`;
          highlightsList.appendChild(li);
        });
      }

      modalBackdrop.classList.add('active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modalBackdrop.classList.remove('active'));
  }

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) modalBackdrop.classList.remove('active');
  });

  // Trophy Filter
  const filterBtns = document.querySelectorAll('.trophy-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter');

      trophyCards.forEach(c => {
        if (cat === 'all' || c.getAttribute('data-category') === cat) {
          c.style.display = 'flex';
        } else {
          c.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   7. LEGENDS HALL OF FAME FILTER & SEARCH
   ========================================================================== */
function initLegendsFilter() {
  const filterBtns = document.querySelectorAll('.legend-filter-btn');
  const legendCards = document.querySelectorAll('.legend-card');
  const searchInput = document.getElementById('legendSearchInput');

  function applyFilters() {
    const activeCategory = document.querySelector('.legend-filter-btn.active')?.getAttribute('data-pos') || 'all';
    const query = (searchInput?.value || '').toLowerCase().trim();

    legendCards.forEach(card => {
      const pos = card.getAttribute('data-position') || '';
      const name = (card.querySelector('.legend-card-name')?.textContent || '').toLowerCase();
      const era = (card.querySelector('.legend-card-era')?.textContent || '').toLowerCase();
      const bio = (card.querySelector('.legend-snippet')?.textContent || '').toLowerCase();

      const matchesCategory = activeCategory === 'all' || pos === activeCategory;
      const matchesSearch = !query || name.includes(query) || era.includes(query) || bio.includes(query);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }
}

/* ==========================================================================
   8. LEGENDS MODAL DETAIL VIEW
   ========================================================================== */
const legendsData = {
  cr7: {
    name: 'Cristiano Ronaldo',
    role: 'Forward / All-Time Greatest',
    era: '2009 – 2018 (438 Games)',
    stats: { apps: '438', goals: '450', trophies: '16' },
    quote: '"Your love makes me strong, your hate makes me unstoppable."',
    bio: 'Real Madrid\'s all-time record goalscorer with a jaw-dropping 450 goals in just 438 appearances (averaging over 1.02 goals per match). Ronaldo propelled Los Blancos to 4 UEFA Champions League titles—including the historic Three-Peat (2016-2018)—and captured 4 Ballon d\'Or trophies while wearing the iconic white shirt.',
    trophiesList: '4x UEFA Champions League, 3x FIFA Club World Cup, 3x UEFA Super Cup, 2x La Liga, 2x Copa del Rey, 2x Supercopa de España'
  },
  distefano: {
    name: 'Alfredo Di Stéfano',
    role: 'Forward / The Club Patriarch',
    era: '1953 – 1964 (396 Games)',
    stats: { apps: '396', goals: '308', trophies: '17' },
    quote: '"Playing without scoring is like dancing without music."',
    bio: 'The man who transformed Real Madrid into the undisputed kings of the world. "La Saeta Rubia" guided the club to five consecutive European Cups between 1956 and 1960, scoring in every single final. The only footballer in history to receive the prestigious Super Ballon d\'Or.',
    trophiesList: '5x European Cup, 1x Intercontinental Cup, 8x La Liga, 1x Copa de España, 1x Super Ballon d\'Or (1989)'
  },
  zidane: {
    name: 'Zinedine Zidane',
    role: 'Midfielder & Historic Manager',
    era: 'Player: 2001–2006 | Coach: 2016–2021',
    stats: { apps: '227', goals: '49', trophies: '17' },
    quote: '"Madrid is my home. When you win here, you know you are making history."',
    bio: 'Poetry in motion on the pitch and tactical perfection on the touchline. Scored the greatest goal in European Cup history with his Glasgow volley in 2002. Later as manager, led Real Madrid to an unprecedented modern Three-Peat of Champions League titles from 2016 to 2018.',
    trophiesList: 'Player: 1x UCL, 1x La Liga, 1x Intercontinental Cup | Manager: 3x UCL, 2x La Liga, 2x FIFA Club World Cup'
  },
  raul: {
    name: 'Raúl González Blanco',
    role: 'Forward / "El Ángel de Madrid"',
    era: '1994 – 2010 (741 Games)',
    stats: { apps: '741', goals: '323', trophies: '16' },
    quote: '"Real Madrid is a feeling, a religion, a way of living life with honor."',
    bio: 'The ultimate emblem of Madridismo. The all-time appearance record holder with 741 matches in the white shirt. Raúl captained Madrid through golden eras, winning 3 Champions League trophies and scoring in both the 2000 and 2002 finals.',
    trophiesList: '3x UEFA Champions League, 2x Intercontinental Cup, 6x La Liga, 4x Supercopa de España, 1x UEFA Super Cup'
  },
  casillas: {
    name: 'Iker Casillas',
    role: 'Goalkeeper / "San Iker"',
    era: '1999 – 2015 (725 Games)',
    stats: { apps: '725', cleanSheets: '264', trophies: '19' },
    quote: '"I am not a galactic, I am from Móstoles. But I bleed pure white."',
    bio: 'Widely considered the greatest goalkeeper in the history of Spanish football. Made his debut at age 18 and won the Champions League that same season. Famous for impossible reflex saves that repeatedly rescued Real Madrid on the biggest stages.',
    trophiesList: '3x UEFA Champions League, 5x La Liga, 2x Copa del Rey, 1x FIFA Club World Cup, 2x UEFA Super Cup'
  },
  modric: {
    name: 'Luka Modrić',
    role: 'Midfield Maestro / Club Captain',
    era: '2012 – Present (540+ Games)',
    stats: { apps: '545', assists: '88', trophies: '27' },
    quote: '"Real Madrid is special. It changes you forever. You fight until the final second."',
    bio: 'The joint most decorated player in Real Madrid history with 27 trophies. Ballon d\'Or winner in 2018, Modrić is universally revered for his outside-of-the-boot wizardry, relentless stamina, and leadership in winning 6 UEFA Champions Leagues.',
    trophiesList: '6x UEFA Champions League, 4x La Liga, 2x Copa del Rey, 5x FIFA Club World Cup, 5x UEFA Super Cup'
  },
  puskas: {
    name: 'Ferenc Puskás',
    role: 'Forward / "The Galloping Major"',
    era: '1958 – 1966 (262 Games)',
    stats: { apps: '262', goals: '242', trophies: '10' },
    quote: '"If you shoot with conviction, the ball will always find the net."',
    bio: 'One of the most devastating left feet in football history. Puskás arrived at Madrid at age 31 and scored 242 goals in 262 matches, including a record four goals in the 1960 European Cup Final against Frankfurt.',
    trophiesList: '3x European Cup, 5x La Liga, 1x Copa de España, 1x Intercontinental Cup, 4x Pichichi Trophy'
  },
  ramos: {
    name: 'Sergio Ramos',
    role: 'Defender / The 92:48 Hero',
    era: '2005 – 2021 (671 Games)',
    stats: { apps: '671', goals: '101', trophies: '22' },
    quote: '"As long as there is 1 second on the clock, Real Madrid never surrenders."',
    bio: 'A titan in central defence and an clutch goalscoring captain. Scored 101 goals for Real Madrid—an extraordinary number for a defender—highlighted by the iconic 92:48 equaliser in the 2014 Champions League Final to clinch La Décima.',
    trophiesList: '4x UEFA Champions League, 5x La Liga, 2x Copa del Rey, 4x FIFA Club World Cup, 3x UEFA Super Cup'
  },
  gento: {
    name: 'Paco Gento',
    role: 'Winger / Honorary President',
    era: '1953 – 1971 (600 Games)',
    stats: { apps: '600', goals: '182', trophies: '24' },
    quote: '"To wear the white shirt is to carry the responsibility of millions of dreams."',
    bio: '"La Galerna del Cantábrico". The ONLY player in the entire history of world football to win 6 European Cups. His lightning pace down the left flank terrorised defences across Europe for nearly two decades.',
    trophiesList: '6x European Cup (All-time world record), 12x La Liga (Record), 2x Copa de España, 1x Intercontinental Cup'
  }
};

function initLegendModal() {
  const modalBackdrop = document.getElementById('legendModalBackdrop');
  const closeBtn = document.getElementById('legendModalClose');
  const legendCards = document.querySelectorAll('.legend-card');

  if (!modalBackdrop) return;

  legendCards.forEach(card => {
    card.addEventListener('click', () => {
      const legendId = card.getAttribute('data-legend-id');
      const data = legendsData[legendId];
      if (!data) return;

      document.getElementById('modalLegendName').textContent = data.name;
      document.getElementById('modalLegendRole').textContent = data.role;
      document.getElementById('modalLegendEra').textContent = data.era;
      document.getElementById('modalLegendQuote').textContent = data.quote;
      document.getElementById('modalLegendBio').textContent = data.bio;
      document.getElementById('modalLegendTrophies').textContent = data.trophiesList;

      modalBackdrop.classList.add('active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modalBackdrop.classList.remove('active'));
  }

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) modalBackdrop.classList.remove('active');
  });
}

/* ==========================================================================
   9. HISTORY TIMELINE FILTER
   ========================================================================== */
function initHistoryFilter() {
  const filterBtns = document.querySelectorAll('.history-filter-btn');
  const blocks = document.querySelectorAll('.timeline-block');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const era = btn.getAttribute('data-era');

      blocks.forEach(block => {
        if (era === 'all' || block.getAttribute('data-era') === era) {
          block.style.display = 'flex';
        } else {
          block.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   10. MATCH CENTER TABS
   ========================================================================== */
function initMatchCenterTabs() {
  const tabBtns = document.querySelectorAll('.match-tab-btn');
  const panels = document.querySelectorAll('.match-content-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-panel');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });
}

/* ==========================================================================
   11. MATCH PREDICTOR POPUP
   ========================================================================== */
function initMatchPredictor() {
  const predictBtns = document.querySelectorAll('.btn-predict');
  predictBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const match = btn.getAttribute('data-match') || 'El Clásico';
      runPredictionSimulation(match);
    });
  });
}

function runPredictionSimulation(matchName) {
  const winChances = Math.floor(Math.random() * 15) + 72; // 72% to 87% Madridista win chance
  const simulatedScores = ['3 - 1', '2 - 0', '4 - 1', '3 - 2', '2 - 1'];
  const score = simulatedScores[Math.floor(Math.random() * simulatedScores.length)];

  alert(`⚔️ Madridista Fan Match Engine: ${matchName}\n\n👑 Real Madrid Win Probability: ${winChances}%\n⚽ Simulated Prediction: Real Madrid ${score}\n📍 Santiago Bernabéu Stadium Atmosphere: 100% Electrifying!\n\n¡Hasta El Final, Vamos Real!`);
}

/* ==========================================================================
   12. MADRIDISTA FAN QUIZ
   ========================================================================== */
const quizQuestions = [
  {
    q: 'How many UEFA Champions League / European Cups has Real Madrid won?',
    options: ['10', '13', '15', '16'],
    correct: 2,
    feedback: '¡Exacto! Real Madrid lifted their historic 15th European Cup in 2024 at Wembley.'
  },
  {
    q: 'Who scored the historic equaliser header in the 92nd minute and 48th second in Lisbon (La Décima)?',
    options: ['Cristiano Ronaldo', 'Sergio Ramos', 'Gareth Bale', 'Karim Benzema'],
    correct: 1,
    feedback: '¡Brillante! Sergio Ramos at 92:48 created one of the most iconic moments in football history.'
  },
  {
    q: 'Which legendary player holds the record as the ONLY player in football history with 6 European Cups?',
    options: ['Alfredo Di Stéfano', 'Paco Gento', 'Ferenc Puskás', 'Cristiano Ronaldo'],
    correct: 1,
    feedback: '¡Correcto! Paco Gento won 6 European Cups with Real Madrid (1956, 1957, 1958, 1959, 1960, 1966).'
  }
];

let currentQuestionIndex = 0;
let userScore = 0;

function initFanQuiz() {
  const qText = document.getElementById('quizQuestionText');
  const optContainer = document.getElementById('quizOptionsContainer');
  const feedbackEl = document.getElementById('quizFeedback');
  const nextBtn = document.getElementById('quizNextBtn');

  if (!qText || !optContainer) return;

  function loadQuestion() {
    feedbackEl.textContent = '';
    feedbackEl.className = 'quiz-feedback';
    nextBtn.style.display = 'none';

    if (currentQuestionIndex >= quizQuestions.length) {
      qText.textContent = `Quiz Finished! Your Madridista Score: ${userScore} / ${quizQuestions.length}`;
      optContainer.innerHTML = '';
      feedbackEl.textContent = userScore === 3 ? '🏆 Pure Madridista Legend! You know your club inside out.' : 'Great effort! Hala Madrid y nada más!';
      feedbackEl.style.color = 'var(--gold-dark)';
      return;
    }

    const currentQ = quizQuestions[currentQuestionIndex];
    qText.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}: ${currentQ.q}`;
    optContainer.innerHTML = '';

    currentQ.options.forEach((optText, index) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-opt-btn';
      btn.textContent = optText;
      btn.addEventListener('click', () => {
        // Disable all option buttons
        const allBtns = optContainer.querySelectorAll('.quiz-opt-btn');
        allBtns.forEach(b => b.disabled = true);

        if (index === currentQ.correct) {
          btn.classList.add('correct');
          feedbackEl.textContent = currentQ.feedback;
          feedbackEl.style.color = '#059669';
          userScore++;
        } else {
          btn.classList.add('incorrect');
          allBtns[currentQ.correct].classList.add('correct');
          feedbackEl.textContent = `Incorrect! ${currentQ.feedback}`;
          feedbackEl.style.color = '#dc2626';
        }
        nextBtn.style.display = 'inline-block';
      });
      optContainer.appendChild(btn);
    });
  }

  nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    loadQuestion();
  });

  loadQuestion();
}
