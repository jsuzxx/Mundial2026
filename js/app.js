// ════════════════════════════════════════════════════════
// DATA
// ════════════════════════════════════════════════════════
const TEAMS = {
  MEX:{name:'México',flag:'🇲🇽',group:'A'},
  RSA:{name:'Sudáfrica',flag:'🇿🇦',group:'A'},
  KOR:{name:'Corea del Sur',flag:'🇰🇷',group:'A'},
  CZE:{name:'Rep. Checa',flag:'🇨🇿',group:'A'},
  CAN:{name:'Canadá',flag:'🇨🇦',group:'B'},
  BIH:{name:'Bosnia-Herz.',flag:'🇧🇦',group:'B'},
  QAT:{name:'Catar',flag:'🇶🇦',group:'B'},
  SUI:{name:'Suiza',flag:'🇨🇭',group:'B'},
  USA:{name:'Estados Unidos',flag:'🇺🇸',group:'C'},
  PAR:{name:'Paraguay',flag:'🇵🇾',group:'C'},
  AUS:{name:'Australia',flag:'🇦🇺',group:'C'},
  TUR:{name:'Turquía',flag:'🇹🇷',group:'C'},
  GER:{name:'Alemania',flag:'🇩🇪',group:'D'},
  CUW:{name:'Curazao',flag:'🇨🇼',group:'D'},
  NED:{name:'Países Bajos',flag:'🇳🇱',group:'D'},
  JPN:{name:'Japón',flag:'🇯🇵',group:'D'},
  CIV:{name:'Costa de Marfil',flag:'🇨🇮',group:'E'},
  ECU:{name:'Ecuador',flag:'🇪🇨',group:'E'},
  SWE:{name:'Suecia',flag:'🇸🇪',group:'E'},
  TUN:{name:'Túnez',flag:'🇹🇳',group:'E'},
  ESP:{name:'España',flag:'🇪🇸',group:'F'},
  CPV:{name:'Cabo Verde',flag:'🇨🇻',group:'F'},
  BEL:{name:'Bélgica',flag:'🇧🇪',group:'F'},
  EGY:{name:'Egipto',flag:'🇪🇬',group:'F'},
  KSA:{name:'Arabia Saudita',flag:'🇸🇦',group:'G'},
  URU:{name:'Uruguay',flag:'🇺🇾',group:'G'},
  IRN:{name:'Irán',flag:'🇮🇷',group:'G'},
  NZL:{name:'Nueva Zelanda',flag:'🇳🇿',group:'G'},
  FRA:{name:'Francia',flag:'🇫🇷',group:'H'},
  SEN:{name:'Senegal',flag:'🇸🇳',group:'H'},
  IRQ:{name:'Irak',flag:'🇮🇶',group:'H'},
  NOR:{name:'Noruega',flag:'🇳🇴',group:'H'},
  ARG:{name:'Argentina',flag:'🇦🇷',group:'I'},
  ALG:{name:'Argelia',flag:'🇩🇿',group:'I'},
  AUT:{name:'Austria',flag:'🇦🇹',group:'I'},
  JOR:{name:'Jordania',flag:'🇯🇴',group:'I'},
  POR:{name:'Portugal',flag:'🇵🇹',group:'J'},
  COD:{name:'RD Congo',flag:'🇨🇩',group:'J'},
  ENG:{name:'Inglaterra',flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿',group:'J'},
  CRO:{name:'Croacia',flag:'🇭🇷',group:'J'},
  GHA:{name:'Ghana',flag:'🇬🇭',group:'K'},
  PAN:{name:'Panamá',flag:'🇵🇦',group:'K'},
  UZB:{name:'Uzbekistán',flag:'🇺🇿',group:'K'},
  COL:{name:'Colombia',flag:'🇨🇴',group:'K'},
  BRA:{name:'Brasil',flag:'🇧🇷',group:'L'},
  MAR:{name:'Marruecos',flag:'🇲🇦',group:'L'},
  HAI:{name:'Haití',flag:'🇭🇹',group:'L'},
  SCO:{name:'Escocia',flag:'🏴󠁧󠁢󠁳󠁣󠁴󠁿',group:'L'},
};

// Venues: city · stadium
const VENUES = {
  'SoFi':       {city:'Los Ángeles',  stadium:'SoFi Stadium'},
  'MetLife':    {city:'Nueva York',   stadium:'MetLife Stadium'},
  'ATT':        {city:'Dallas',       stadium:'AT&T Stadium'},
  'Levi':       {city:'San Francisco',stadium:"Levi's Stadium"},
  'Arrowhead':  {city:'Kansas City',  stadium:'Arrowhead Stadium'},
  'Lincoln':    {city:'Filadelfia',   stadium:'Lincoln Financial Field'},
  'Estadio':    {city:'Ciudad de México',stadium:'Estadio Azteca'},
  'Monterrey':  {city:'Monterrey',    stadium:'Estadio BBVA'},
  'Guadalajara':{city:'Guadalajara',  stadium:'Estadio Akron'},
  'BMO':        {city:'Toronto',      stadium:'BMO Field'},
  'BC':         {city:'Vancouver',    stadium:'BC Place'},
  'Seattle':    {city:'Seattle',      stadium:'Lumen Field'},
  'Miami':      {city:'Miami',        stadium:'Hard Rock Stadium'},
  'Boston':     {city:'Boston',       stadium:'Gillette Stadium'},
  'Houston':    {city:'Houston',      stadium:'NRG Stadium'},
  'Atlanta':    {city:'Atlanta',      stadium:'Mercedes-Benz Stadium'},
};

// id, date (COT), time, home, away, venue key
const MATCHES = [
  // Jun 11
  {id:'m01',date:'2026-06-11',time:'2:00 p.m.',home:'MEX',away:'RSA',venue:'Estadio'},
  {id:'m02',date:'2026-06-11',time:'9:00 p.m.',home:'KOR',away:'CZE',venue:'Guadalajara'},
  // Jun 12
  {id:'m03',date:'2026-06-12',time:'2:00 p.m.',home:'CAN',away:'BIH',venue:'BMO'},
  {id:'m04',date:'2026-06-12',time:'8:00 p.m.',home:'USA',away:'PAR',venue:'SoFi'},
  // Jun 13
  {id:'m05',date:'2026-06-13',time:'2:00 p.m.',home:'QAT',away:'SUI',venue:'Levi'},
  {id:'m06',date:'2026-06-13',time:'5:00 p.m.',home:'BRA',away:'MAR',venue:'MetLife'},
  {id:'m07',date:'2026-06-13',time:'8:00 p.m.',home:'HAI',away:'SCO',venue:'Boston'},
  {id:'m08',date:'2026-06-13',time:'11:00 p.m.',home:'AUS',away:'TUR',venue:'BC'},
  // Jun 14
  {id:'m09',date:'2026-06-14',time:'12:00 m.',home:'GER',away:'CUW',venue:'Houston'},
  {id:'m10',date:'2026-06-14',time:'3:00 p.m.',home:'NED',away:'JPN',venue:'ATT'},
  {id:'m11',date:'2026-06-14',time:'6:00 p.m.',home:'CIV',away:'ECU',venue:'Lincoln'},
  {id:'m12',date:'2026-06-14',time:'9:00 p.m.',home:'SWE',away:'TUN',venue:'Monterrey'},
  // Jun 15
  {id:'m13',date:'2026-06-15',time:'11:00 a.m.',home:'ESP',away:'CPV',venue:'Atlanta'},
  {id:'m14',date:'2026-06-15',time:'2:00 p.m.',home:'BEL',away:'EGY',venue:'Seattle'},
  {id:'m15',date:'2026-06-15',time:'5:00 p.m.',home:'KSA',away:'URU',venue:'Miami'},
  {id:'m16',date:'2026-06-15',time:'8:00 p.m.',home:'IRN',away:'NZL',venue:'SoFi'},
  // Jun 16
  {id:'m17',date:'2026-06-16',time:'2:00 p.m.',home:'FRA',away:'SEN',venue:'MetLife'},
  {id:'m18',date:'2026-06-16',time:'5:00 p.m.',home:'IRQ',away:'NOR',venue:'Boston'},
  {id:'m19',date:'2026-06-16',time:'8:00 p.m.',home:'ARG',away:'ALG',venue:'Arrowhead'},
  {id:'m20',date:'2026-06-16',time:'11:00 p.m.',home:'AUT',away:'JOR',venue:'Levi'},
  // Jun 17
  {id:'m21',date:'2026-06-17',time:'12:00 m.',home:'POR',away:'COD',venue:'Houston'},
  {id:'m22',date:'2026-06-17',time:'3:00 p.m.',home:'ENG',away:'CRO',venue:'ATT'},
  {id:'m23',date:'2026-06-17',time:'6:00 p.m.',home:'GHA',away:'PAN',venue:'BMO'},
  {id:'m24',date:'2026-06-17',time:'9:00 p.m.',home:'UZB',away:'COL',venue:'Estadio'},
  // Jun 18
  {id:'m25',date:'2026-06-18',time:'11:00 a.m.',home:'CZE',away:'RSA',venue:'Atlanta'},
  {id:'m26',date:'2026-06-18',time:'2:00 p.m.',home:'SUI',away:'BIH',venue:'SoFi'},
  {id:'m27',date:'2026-06-18',time:'5:00 p.m.',home:'CAN',away:'QAT',venue:'BC'},
  {id:'m28',date:'2026-06-18',time:'8:00 p.m.',home:'MEX',away:'KOR',venue:'Guadalajara'},
  // Jun 19
  {id:'m29',date:'2026-06-19',time:'2:00 p.m.',home:'USA',away:'AUS',venue:'Seattle'},
  {id:'m30',date:'2026-06-19',time:'5:00 p.m.',home:'SCO',away:'MAR',venue:'Boston'},
  {id:'m31',date:'2026-06-19',time:'8:00 p.m.',home:'BRA',away:'HAI',venue:'Lincoln'},
  {id:'m32',date:'2026-06-19',time:'11:00 p.m.',home:'TUR',away:'PAR',venue:'Levi'},
  // Jun 20
  {id:'m33',date:'2026-06-20',time:'2:00 p.m.',home:'NED',away:'SWE',venue:'Houston'},
  {id:'m34',date:'2026-06-20',time:'3:00 p.m.',home:'GER',away:'CIV',venue:'BMO'},
  {id:'m35',date:'2026-06-20',time:'7:00 p.m.',home:'ECU',away:'CUW',venue:'Arrowhead'},
  {id:'m36',date:'2026-06-20',time:'11:00 p.m.',home:'TUN',away:'JPN',venue:'Monterrey'},
  // Jun 21
  {id:'m37',date:'2026-06-21',time:'11:00 a.m.',home:'ESP',away:'KSA',venue:'Atlanta'},
  {id:'m38',date:'2026-06-21',time:'2:00 p.m.',home:'BEL',away:'IRN',venue:'SoFi'},
  {id:'m39',date:'2026-06-21',time:'5:00 p.m.',home:'URU',away:'CPV',venue:'Miami'},
  {id:'m40',date:'2026-06-21',time:'8:00 p.m.',home:'NZL',away:'EGY',venue:'BC'},
  // Jun 22
  {id:'m41',date:'2026-06-22',time:'12:00 m.',home:'ARG',away:'AUT',venue:'ATT'},
  {id:'m42',date:'2026-06-22',time:'4:00 p.m.',home:'FRA',away:'IRQ',venue:'Lincoln'},
  {id:'m43',date:'2026-06-22',time:'7:00 p.m.',home:'NOR',away:'SEN',venue:'MetLife'},
  {id:'m44',date:'2026-06-22',time:'10:00 p.m.',home:'JOR',away:'ALG',venue:'Levi'},
  // Jun 23
  {id:'m45',date:'2026-06-23',time:'12:00 m.',home:'POR',away:'UZB',venue:'Houston'},
  {id:'m46',date:'2026-06-23',time:'3:00 p.m.',home:'ENG',away:'GHA',venue:'Boston'},
  {id:'m47',date:'2026-06-23',time:'6:00 p.m.',home:'PAN',away:'CRO',venue:'BMO'},
  {id:'m48',date:'2026-06-23',time:'9:00 p.m.',home:'COL',away:'COD',venue:'Guadalajara'},
  // Jun 24
  {id:'m49',date:'2026-06-24',time:'2:00 p.m.',home:'SUI',away:'CAN',venue:'BC'},
  {id:'m50',date:'2026-06-24',time:'2:00 p.m.',home:'BIH',away:'QAT',venue:'Seattle'},
  {id:'m51',date:'2026-06-24',time:'5:00 p.m.',home:'SCO',away:'BRA',venue:'Miami'},
  {id:'m52',date:'2026-06-24',time:'5:00 p.m.',home:'MAR',away:'HAI',venue:'Atlanta'},
  {id:'m53',date:'2026-06-24',time:'8:00 p.m.',home:'CZE',away:'MEX',venue:'Estadio'},
  {id:'m54',date:'2026-06-24',time:'8:00 p.m.',home:'RSA',away:'KOR',venue:'Monterrey'},
  // Jun 25
  {id:'m55',date:'2026-06-25',time:'3:00 p.m.',home:'CUW',away:'CIV',venue:'Lincoln'},
  {id:'m56',date:'2026-06-25',time:'3:00 p.m.',home:'ECU',away:'GER',venue:'MetLife'},
  {id:'m57',date:'2026-06-25',time:'6:00 p.m.',home:'JPN',away:'SWE',venue:'ATT'},
  {id:'m58',date:'2026-06-25',time:'6:00 p.m.',home:'TUN',away:'NED',venue:'Arrowhead'},
  {id:'m59',date:'2026-06-25',time:'9:00 p.m.',home:'TUR',away:'USA',venue:'SoFi'},
  {id:'m60',date:'2026-06-25',time:'9:00 p.m.',home:'PAR',away:'AUS',venue:'Levi'},
  // Jun 26
  {id:'m61',date:'2026-06-26',time:'2:00 p.m.',home:'NOR',away:'FRA',venue:'MetLife'},
  {id:'m62',date:'2026-06-26',time:'2:00 p.m.',home:'SEN',away:'IRQ',venue:'Lincoln'},
  {id:'m63',date:'2026-06-26',time:'7:00 p.m.',home:'CPV',away:'KSA',venue:'Miami'},
  {id:'m64',date:'2026-06-26',time:'7:00 p.m.',home:'URU',away:'ESP',venue:'Atlanta'},
  {id:'m65',date:'2026-06-26',time:'10:00 p.m.',home:'EGY',away:'IRN',venue:'Seattle'},
  {id:'m66',date:'2026-06-26',time:'10:00 p.m.',home:'NZL',away:'BEL',venue:'BC'},
  // Jun 27
  {id:'m67',date:'2026-06-27',time:'4:00 p.m.',home:'PAN',away:'ENG',venue:'Arrowhead'},
  {id:'m68',date:'2026-06-27',time:'4:00 p.m.',home:'CRO',away:'GHA',venue:'BMO'},
  {id:'m69',date:'2026-06-27',time:'6:30 p.m.',home:'COL',away:'POR',venue:'MetLife'},
  {id:'m70',date:'2026-06-27',time:'6:30 p.m.',home:'COD',away:'UZB',venue:'Atlanta'},
  {id:'m71',date:'2026-06-27',time:'9:00 p.m.',home:'ALG',away:'AUT',venue:'ATT'},
  {id:'m72',date:'2026-06-27',time:'9:00 p.m.',home:'JOR',away:'ARG',venue:'Levi'},
];

const GROUPS_DEF = {
  A:['MEX','RSA','KOR','CZE'], B:['CAN','BIH','QAT','SUI'],
  C:['USA','PAR','AUS','TUR'], D:['GER','CUW','NED','JPN'],
  E:['CIV','ECU','SWE','TUN'], F:['ESP','CPV','BEL','EGY'],
  G:['KSA','URU','IRN','NZL'], H:['FRA','SEN','IRQ','NOR'],
  I:['ARG','ALG','AUT','JOR'], J:['POR','COD','ENG','CRO'],
  K:['GHA','PAN','UZB','COL'], L:['BRA','MAR','HAI','SCO'],
};

// Round of 32 pairings (FIFA 2026 official bracket)
// Format: [winner/runner-up group, position (1=1st, 2=2nd, 3=3rd-best)]
const R32_BRACKET = [
  {id:'r01', label:'1A vs 2C', slot1:{g:'A',pos:1}, slot2:{g:'C',pos:2}, date:'28 jun', time:'2:00 p.m.'},
  {id:'r02', label:'1B vs 2D', slot1:{g:'B',pos:1}, slot2:{g:'D',pos:2}, date:'28 jun', time:'5:00 p.m.'},
  {id:'r03', label:'1C vs 2A', slot1:{g:'C',pos:1}, slot2:{g:'A',pos:2}, date:'28 jun', time:'8:00 p.m.'},
  {id:'r04', label:'1D vs 2B', slot1:{g:'D',pos:1}, slot2:{g:'B',pos:2}, date:'29 jun', time:'2:00 p.m.'},
  {id:'r05', label:'1E vs 2G', slot1:{g:'E',pos:1}, slot2:{g:'G',pos:2}, date:'29 jun', time:'5:00 p.m.'},
  {id:'r06', label:'1F vs 2H', slot1:{g:'F',pos:1}, slot2:{g:'H',pos:2}, date:'29 jun', time:'8:00 p.m.'},
  {id:'r07', label:'1G vs 2E', slot1:{g:'G',pos:1}, slot2:{g:'E',pos:2}, date:'30 jun', time:'2:00 p.m.'},
  {id:'r08', label:'1H vs 2F', slot1:{g:'H',pos:1}, slot2:{g:'F',pos:2}, date:'30 jun', time:'5:00 p.m.'},
  {id:'r09', label:'1I vs 2K', slot1:{g:'I',pos:1}, slot2:{g:'K',pos:2}, date:'30 jun', time:'8:00 p.m.'},
  {id:'r10', label:'1J vs 2L', slot1:{g:'J',pos:1}, slot2:{g:'L',pos:2}, date:'1 jul',  time:'2:00 p.m.'},
  {id:'r11', label:'1K vs 2I', slot1:{g:'K',pos:1}, slot2:{g:'I',pos:2}, date:'1 jul',  time:'5:00 p.m.'},
  {id:'r12', label:'1L vs 2J', slot1:{g:'L',pos:1}, slot2:{g:'J',pos:2}, date:'1 jul',  time:'8:00 p.m.'},
  // 3rd-place slots (best 8 of 12)
  {id:'r13', label:'Mejor 3º (1)', slot1:{g:'?',pos:3}, slot2:{g:'?',pos:3}, date:'2 jul',  time:'2:00 p.m.'},
  {id:'r14', label:'Mejor 3º (2)', slot1:{g:'?',pos:3}, slot2:{g:'?',pos:3}, date:'2 jul',  time:'5:00 p.m.'},
  {id:'r15', label:'Mejor 3º (3)', slot1:{g:'?',pos:3}, slot2:{g:'?',pos:3}, date:'2 jul',  time:'8:00 p.m.'},
  {id:'r16', label:'Mejor 3º (4)', slot1:{g:'?',pos:3}, slot2:{g:'?',pos:3}, date:'3 jul',  time:'2:00 p.m.'},
  {id:'r17', label:'Mejor 3º (5)', slot1:{g:'?',pos:3}, slot2:{g:'?',pos:3}, date:'3 jul',  time:'5:00 p.m.'},
  {id:'r18', label:'Mejor 3º (6)', slot1:{g:'?',pos:3}, slot2:{g:'?',pos:3}, date:'3 jul',  time:'8:00 p.m.'},
  {id:'r19', label:'Mejor 3º (7)', slot1:{g:'?',pos:3}, slot2:{g:'?',pos:3}, date:'3 jul',  time:'2:00 p.m.'},
  {id:'r20', label:'Mejor 3º (8)', slot1:{g:'?',pos:3}, slot2:{g:'?',pos:3}, date:'3 jul',  time:'5:00 p.m.'},
];

const KNOCKOUT_ROUNDS = [
  {id:'r32',  label:'Dieciseisavos', dates:'28 jun – 3 jul',  teams:32},
  {id:'r16',  label:'Octavos de Final', dates:'4 – 7 jul',   teams:16},
  {id:'qf',   label:'Cuartos de Final', dates:'9 – 12 jul',  teams:8},
  {id:'sf',   label:'Semifinales',   dates:'14 – 15 jul',    teams:4},
  {id:'3rd',  label:'Tercer Puesto', dates:'Sáb 18 jul',     teams:2},
  {id:'final',label:'Gran Final',    dates:'Dom 19 jul',      teams:2},
];

const DAYS_ES=['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
const MONTHS_ES=['enero','febrero','marzo','abril','mayo','junio','julio'];

// ════════════════════════════════════════════════════════
// ADMIN MODE
// Contraseña de la URL: cambia ADMIN_KEY a cualquier palabra secreta.
// Para activar: visita la app con ?key=TU_PALABRA en la URL.
// La sesión queda guardada en este navegador hasta que cierres la pestaña.
// ════════════════════════════════════════════════════════
const ADMIN_KEY = 'colombia2026'; // ← CAMBIA ESTO A TU PALABRA SECRETA

let isAdmin = false;
(function() {
  const p = new URLSearchParams(location.search);
  if (p.get('key') === ADMIN_KEY) {
    isAdmin = true;
    sessionStorage.setItem('wc2026_admin', '1');
    p.delete('key');
    history.replaceState({}, '', location.pathname + (p.toString() ? '?' + p : ''));
  } else if (sessionStorage.getItem('wc2026_admin')) {
    isAdmin = true;
  }
})();

// ════════════════════════════════════════════════════════
// SYNC  —  todos leen results.json via GitHub API (sin caché CDN)
//          el admin escribe en ese mismo archivo via GitHub API
// ════════════════════════════════════════════════════════
const GH_OWNER  = 'jsuzxx';
const GH_REPO   = 'Mundial2026';
const GH_BRANCH = 'main';
const API_FILE  = `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/results.json`;
const CACHE_KEY = 'wc2026_results';
const CACHE_TS  = 'wc2026_ts';
const CACHE_TTL = 30 * 1000; // 30 segundos

let results   = {};
let syncState = 'loading';

function updateSyncUI(msg) {
  const dot = document.getElementById('sync-dot');
  const txt = document.getElementById('sync-txt');
  if (!dot || !txt) return;
  const stateClass = { loading:'loading', ok:'ok', err:'err', saving:'loading', saved:'ok' };
  dot.className = 'sync-dot ' + (stateClass[syncState] || 'ok');
  txt.textContent = msg || { loading:'Cargando...', ok:'Resultados al día', err:'Sin conexión', saving:'Guardando en GitHub...', saved:'Guardado ✓' }[syncState] || '';
}

// Toast visible para el admin
function toast(msg, type = 'ok') {
  let el = document.getElementById('admin-toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'admin-toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.className = 'admin-toast ' + type;
  el.style.opacity = '1';
  clearTimeout(el._t);
  el._t = setTimeout(() => { el.style.opacity = '0'; }, 3500);
}

// Leer results.json via GitHub Contents API (nunca cacheado por CDN)
async function ghGet() {
  const headers = { Accept: 'application/vnd.github+json' };
  const pat = localStorage.getItem('wc2026_pat');
  if (pat) headers.Authorization = `Bearer ${pat}`;

  const r = await fetch(API_FILE, { headers });
  if (!r.ok) throw new Error('HTTP ' + r.status);
  const meta = await r.json();
  const json = decodeURIComponent(escape(atob(meta.content.replace(/\n/g, ''))));
  return { data: JSON.parse(json), sha: meta.sha };
}

async function fetchResults(force = false) {
  if (!force) {
    const ts = parseInt(localStorage.getItem(CACHE_TS) || '0');
    if (Date.now() - ts < CACHE_TTL) {
      try {
        results = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
        syncState = 'ok'; updateSyncUI(); refresh(); return;
      } catch(e) {}
    }
  }
  syncState = 'loading'; updateSyncUI();
  try {
    const { data } = await ghGet();
    results = data;
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    localStorage.setItem(CACHE_TS, String(Date.now()));
    syncState = 'ok';
    if (data._updated) {
      const ago = Math.round((Date.now() - new Date(data._updated).getTime()) / 60000);
      updateSyncUI(`Actualizado hace ${ago < 1 ? 'menos de 1' : ago} min`);
      return;
    }
  } catch(e) {
    try { results = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}'); } catch(_) { results = {}; }
    syncState = 'err';
  }
  updateSyncUI(); refresh();
}

async function saveToGitHub() {
  const pat = localStorage.getItem('wc2026_pat');
  if (!pat) { showTokenSetup(); return false; }

  syncState = 'saving'; updateSyncUI();
  try {
    // Siempre obtener SHA fresco — nunca cachear entre guardados
    const { sha } = await ghGet();

    const payload = { ...results };
    delete payload._updated;
    payload._updated = new Date().toISOString();

    const body = JSON.stringify(payload, null, 2);
    const content = btoa(unescape(encodeURIComponent(body)));

    const put = await fetch(API_FILE, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${pat}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: 'chore: actualizar resultados', content, sha, branch: GH_BRANCH }),
    });

    if (!put.ok) {
      const errData = await put.json().catch(() => ({}));
      throw new Error(errData.message || `HTTP ${put.status}`);
    }

    // Actualizar caché local con los datos recién guardados
    localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
    localStorage.setItem(CACHE_TS, String(Date.now()));
    results = payload;

    syncState = 'saved'; updateSyncUI();
    toast('✅ Guardado. Todos verán el resultado en segundos.');
    setTimeout(() => { syncState = 'ok'; updateSyncUI(); }, 3000);
    return true;

  } catch(e) {
    syncState = 'ok'; updateSyncUI();
    const msg = e.message || String(e);
    console.error('[GitHub save]', msg);

    if (msg.includes('401') || msg.includes('Bad credentials') || msg.includes('403')) {
      localStorage.removeItem('wc2026_pat');
      showTokenSetup('Tu clave de GitHub venció o es inválida. Ingresa una nueva.');
    } else if (msg.includes('409') || msg.includes('conflict')) {
      // SHA desincronizado — reintentar una vez con SHA fresco
      toast('⚠️ Conflicto de versión. Reintentando...', 'err');
      return saveToGitHub();
    } else {
      toast('❌ Error al guardar: ' + msg, 'err');
    }
    return false;
  }
}

// Refrescar cada 30 segundos
setInterval(() => fetchResults(true), 30 * 1000);

// ════════════════════════════════════════════════════════
// DATE UTILS
// ════════════════════════════════════════════════════════
function getTodayCOT() {
  const now = new Date();
  const cot = new Date(now.getTime() - 5*60*60*1000);
  return `${cot.getUTCFullYear()}-${String(cot.getUTCMonth()+1).padStart(2,'0')}-${String(cot.getUTCDate()).padStart(2,'0')}`;
}
function dayLabel(dateStr) {
  const [y,m,d] = dateStr.split('-').map(Number);
  const dow = new Date(y,m-1,d).getDay();
  return { dow:DAYS_ES[dow], label:`${d} de ${MONTHS_ES[m-1]}` };
}

const todayKey = getTodayCOT();

// ════════════════════════════════════════════════════════
// STANDINGS
// ════════════════════════════════════════════════════════
function calcStandings() {
  const s = {};
  Object.keys(TEAMS).forEach(k => { s[k] = {code:k,pj:0,g:0,e:0,p:0,gf:0,gc:0,pts:0}; });
  MATCHES.forEach(m => {
    const r = results[m.id];
    if (!r || r.home===null || r.away===null) return;
    const {home:gh, away:ga} = r;
    const h = s[m.home], a = s[m.away];
    if (!h || !a) return;
    h.pj++; a.pj++;
    h.gf+=gh; h.gc+=ga; a.gf+=ga; a.gc+=gh;
    if (gh>ga){h.g++;h.pts+=3;a.p++;}
    else if (gh<ga){a.g++;a.pts+=3;h.p++;}
    else {h.e++;h.pts++;a.e++;a.pts++;}
  });
  return s;
}

function sortGroup(members, standings) {
  return members.map(k => standings[k]).sort((a,b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    const gdA = a.gf-a.gc, gdB = b.gf-b.gc;
    if (gdB !== gdA) return gdB - gdA;
    return b.gf - a.gf;
  });
}

function getGroupTable(groupCode) {
  return sortGroup(GROUPS_DEF[groupCode], calcStandings());
}

// Returns {code, groupCode, pos, pts, gd, gf} for all 3rd-place teams, sorted
function getBest3rds() {
  const st = calcStandings();
  return Object.entries(GROUPS_DEF).map(([g, members]) => {
    const sorted = sortGroup(members, st);
    const row = sorted[2]; // 3rd place
    return { ...row, groupCode: g, pos: 3 };
  }).sort((a,b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    const gdA = a.gf-a.gc, gdB = b.gf-b.gc;
    if (gdB !== gdA) return gdB - gdA;
    return b.gf - a.gf;
  });
}

// Resolve a bracket slot to a team code (or null if not yet determined)
function resolveSlot(slot) {
  const st = calcStandings();
  if (slot.pos === 3 && slot.g === '?') return null;
  const sorted = sortGroup(GROUPS_DEF[slot.g], st);
  const row = sorted[slot.pos - 1];
  return row ? row.code : null;
}

// ════════════════════════════════════════════════════════
// RENDER MATCHES
// ════════════════════════════════════════════════════════
function renderMatches(filter) {
  const byDay = {};
  MATCHES.forEach(m => { if (!byDay[m.date]) byDay[m.date]=[]; byDay[m.date].push(m); });

  let html = '';
  for (const date of Object.keys(byDay).sort()) {
    if (filter === 'today' && date !== todayKey) continue;
    const isToday = date === todayKey;
    const {dow, label} = dayLabel(date);
    html += `<div class="day-group" data-date="${date}">
      <div class="day-header">
        <span class="day-name">${dow}</span>
        <span class="day-date">${label}</span>
        ${isToday ? '<span class="today-label">HOY</span>' : ''}
        <div class="day-line"></div>
      </div>`;

    for (const m of byDay[date]) {
      const r = results[m.id];
      const hasResult = r && r.home !== null && r.away !== null;
      const ht = TEAMS[m.home], at = TEAMS[m.away];
      const homeWin = hasResult && r.home > r.away;
      const awayWin = hasResult && r.away > r.home;
      const v = VENUES[m.venue];
      const venueStr = v ? `📍 ${v.city} · ${v.stadium}` : '';

      const isLive = hasResult && r.live;
      const cardClass = `match-card${isToday?' today-match':''}${hasResult&&!isLive?' finished':''}${isLive?' live-match':''}`;
      html += `<div class="${cardClass}" data-id="${m.id}">
        <div class="team">
          <span class="flag">${ht.flag}</span>
          <span class="team-name${homeWin?' winner':''}">${ht.name}</span>
        </div>
        <div class="match-center">
          <span class="vs">VS</span>
          ${isLive  ? `<span class="score-display">${r.home} – ${r.away}</span><span class="live-badge">EN VIVO</span>` : ''}
          ${hasResult && !isLive ? `<span class="score-display">${r.home} – ${r.away}</span><span class="ft-badge">FT</span>` : ''}
          <span class="match-time">${m.time}</span>
        </div>
        <div class="team right">
          <span class="team-name${awayWin?' winner':''}">${at.name}</span>
          <span class="flag">${at.flag}</span>
        </div>
        ${isAdmin ? `<button class="edit-btn" onclick="openModal('${m.id}')" title="Editar resultado">✏️</button>` : ''}
        ${venueStr ? `<div class="match-venue"><span>${venueStr}</span></div>` : ''}
      </div>`;
    }
    html += '</div>';
  }

  if (filter === 'today' && html === '') {
    html = '<div style="text-align:center;padding:3rem;color:var(--muted)">No hay partidos de grupo programados para hoy.</div>';
  }
  document.getElementById('matches-container').innerHTML = html;
}

// ════════════════════════════════════════════════════════
// RENDER GROUPS TABLE
// ════════════════════════════════════════════════════════
function renderGroups() {
  let html = '';
  for (const [gCode] of Object.entries(GROUPS_DEF)) {
    const table = getGroupTable(gCode);
    html += `<div class="group-card">
      <div class="group-title">Grupo ${gCode}</div>
      <table class="group-table">
        <thead><tr>
          <th>Equipo</th><th>PJ</th><th>G</th><th>E</th><th>P</th><th>GF</th><th>GC</th><th>DG</th><th>Pts</th>
        </tr></thead><tbody>`;
    table.forEach((row, i) => {
      const rowClass = i===0 ? 'qualify' : (i===1 ? 'qualify2' : '');
      const dg = row.gf - row.gc;
      const dgStr = dg>0 ? `<span class="gd-pos">+${dg}</span>` : dg<0 ? `<span class="gd-neg">${dg}</span>` : dg;
      const t = TEAMS[row.code];
      html += `<tr class="${rowClass}">
        <td><div class="team-cell"><span class="pos-num">${i+1}</span><span class="flag-sm">${t.flag}</span>${t.name}</div></td>
        <td>${row.pj}</td><td>${row.g}</td><td>${row.e}</td><td>${row.p}</td>
        <td>${row.gf}</td><td>${row.gc}</td><td>${dgStr}</td>
        <td><strong class="pts-bold">${row.pts}</strong></td>
      </tr>`;
    });
    html += '</tbody></table></div>';
  }
  document.getElementById('groups-container').innerHTML = html;
}

// ════════════════════════════════════════════════════════
// RENDER KNOCKOUT BRACKET
// ════════════════════════════════════════════════════════
function teamSlot(code) {
  if (!code) return `<span class="tbd">Por definir</span>`;
  const t = TEAMS[code];
  return `<span class="flag-sm">${t.flag}</span> ${t.name}`;
}

function renderKnockout() {
  const st = calcStandings();
  const best3 = getBest3rds();

  // Build 3rd-place teams list (best 8 of 12)
  const top8thirds = best3.slice(0, 8);

  let html = '';

  // Round of 32
  html += `<div class="bracket-round">
    <div class="bracket-round-title">Dieciseisavos · 28 jun – 3 jul</div>
    <div class="bracket-matches">`;

  // First 12: group 1st vs 2nd pairings
  R32_BRACKET.slice(0, 12).forEach(m => {
    const t1 = resolveSlot(m.slot1);
    const t2 = resolveSlot(m.slot2);
    const r = results[m.id];
    const hasR = r && r.home!==null && r.away!==null;
    const w1 = hasR && r.home > r.away;
    const w2 = hasR && r.away > r.home;
    html += `<div class="bracket-card">
      <div class="bracket-slot${w1?' winner-slot':''}">${teamSlot(t1)}${hasR?`<span class="bracket-score">${r.home}</span>`:''}</div>
      <div class="bracket-divider"></div>
      <div class="bracket-slot${w2?' winner-slot':''}">${teamSlot(t2)}${hasR?`<span class="bracket-score">${r.away}</span>`:''}</div>
      <div class="bracket-meta"><span>${m.date} · ${m.time}</span></div>
    </div>`;
  });

  // 3rd-place slots
  top8thirds.forEach((row, i) => {
    const opp = top8thirds[i % 2 === 0 ? i+1 : i-1];
    if (i % 2 !== 0) return; // render pairs
    const t1 = row ? row.code : null;
    const t2 = opp ? opp.code : null;
    const info = R32_BRACKET[12 + Math.floor(i/2)];
    html += `<div class="bracket-card">
      <div class="bracket-slot">${teamSlot(t1)}${t1?`<span style="font-size:.6rem;color:var(--muted);margin-left:.3rem">3°${row.groupCode}</span>`:''}</div>
      <div class="bracket-divider"></div>
      <div class="bracket-slot">${teamSlot(t2)}${t2?`<span style="font-size:.6rem;color:var(--muted);margin-left:.3rem">3°${opp.groupCode}</span>`:''}</div>
      <div class="bracket-meta"><span>${info ? info.date+' · '+info.time : '2–3 jul'}</span></div>
    </div>`;
  });

  html += '</div></div>';

  // Remaining rounds (placeholder cards)
  const laterRounds = [
    {label:'Octavos de Final', dates:'4 – 7 jul', n:8},
    {label:'Cuartos de Final', dates:'9 – 12 jul', n:4},
    {label:'Semifinales', dates:'14 – 15 jul', n:2},
    {label:'Tercer Puesto', dates:'Sáb 18 jul', n:1},
    {label:'Gran Final 🏆', dates:'Dom 19 jul', n:1, isFinal:true},
  ];

  laterRounds.forEach(round => {
    html += `<div class="bracket-round">
      <div class="bracket-round-title">${round.label} · ${round.dates}</div>
      <div class="bracket-matches">`;
    for (let i=0; i<round.n; i++) {
      html += `<div class="bracket-card${round.isFinal?' final':''}">
        <div class="bracket-slot"><span class="tbd">Por definir</span></div>
        <div class="bracket-divider"></div>
        <div class="bracket-slot"><span class="tbd">Por definir</span></div>
      </div>`;
    }
    html += '</div></div>';
  });

  document.getElementById('knockout-container').innerHTML = html;
}

// ════════════════════════════════════════════════════════
// MODAL (local edit — for repo owner use)
// ════════════════════════════════════════════════════════
let activeMatchId = null;

function openModal(id) {
  activeMatchId = id;
  const m = MATCHES.find(x => x.id === id);
  const ht = TEAMS[m.home], at = TEAMS[m.away];
  const r = results[id] || {home:null, away:null};

  document.getElementById('modal-teams').innerHTML = `
    <div class="modal-team"><div class="flag">${ht.flag}</div><div class="name">${ht.name}</div></div>
    <div class="modal-sep">VS</div>
    <div class="modal-team"><div class="flag">${at.flag}</div><div class="name">${at.name}</div></div>`;

  document.getElementById('lbl-home').textContent = ht.name;
  document.getElementById('lbl-away').textContent = at.name;
  document.getElementById('inp-home').value = r.home !== null ? r.home : '';
  document.getElementById('inp-away').value = r.away !== null ? r.away : '';
  document.getElementById('modal').style.display = 'flex';
  setTimeout(() => document.getElementById('inp-home').focus(), 100);
}

function closeModal() { document.getElementById('modal').style.display='none'; activeMatchId=null; }

document.getElementById('btn-save').onclick = async () => {
  const h = document.getElementById('inp-home').value;
  const a = document.getElementById('inp-away').value;
  if (h === '' || a === '') return;
  results[activeMatchId] = { home: parseInt(h), away: parseInt(a) };
  closeModal(); refresh();
  await saveToGitHub();
};

document.getElementById('btn-clear').onclick = async () => {
  delete results[activeMatchId];
  closeModal(); refresh();
  await saveToGitHub();
};

document.getElementById('btn-cancel').onclick = closeModal;
document.getElementById('modal').addEventListener('click', e => { if (e.target===document.getElementById('modal')) closeModal(); });
document.addEventListener('keydown', e => {
  if (e.key==='Enter' && activeMatchId) document.getElementById('btn-save').click();
  if (e.key==='Escape' && activeMatchId) closeModal();
});

// ════════════════════════════════════════════════════════
// TABS & FILTER
// ════════════════════════════════════════════════════════
let currentFilter = 'all';

function buildTabs() {
  const hasTodayGroup = MATCHES.some(m => m.date === todayKey);
  const cotDate = new Date(new Date().getTime() - 5*60*60*1000);
  const todayShort = `${cotDate.getUTCDate()} ${MONTHS_ES[cotDate.getUTCMonth()].substring(0,3).toUpperCase()}`;

  document.getElementById('tabs').innerHTML = `
    <button class="tab active" data-filter="all">Todos</button>
    ${hasTodayGroup ? `<button class="tab today-tab" data-filter="today">Hoy · ${todayShort}</button>` : ''}
    <button class="tab" data-filter="groups">📊 Grupos</button>
    <button class="tab" data-filter="knockout">🏆 Finales</button>`;

  document.getElementById('tabs').addEventListener('click', e => {
    const btn = e.target.closest('.tab');
    if (!btn) return;
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    applyFilter();
  });
}

function applyFilter() {
  const sm = document.getElementById('section-matches');
  const sg = document.getElementById('section-groups');
  const sk = document.getElementById('section-knockout');

  sm.style.display = (currentFilter==='groups'||currentFilter==='knockout') ? 'none' : '';
  sg.style.display = currentFilter==='groups' ? '' : 'none';
  sk.style.display = currentFilter==='knockout' ? '' : 'none';

  if (currentFilter !== 'groups' && currentFilter !== 'knockout') renderMatches(currentFilter);
  if (currentFilter === 'groups') renderGroups();
  if (currentFilter === 'knockout') renderKnockout();
}

// ════════════════════════════════════════════════════════
// BANNER
// ════════════════════════════════════════════════════════
function buildBanner() {
  const cot = new Date(new Date().getTime() - 5*60*60*1000);
  const dow = DAYS_ES[cot.getUTCDay()];
  const d = cot.getUTCDate();
  const mo = MONTHS_ES[cot.getUTCMonth()];
  document.getElementById('banner-date').innerHTML = `📅 Hoy es <strong>${dow} ${d} de ${mo}</strong> · Hora Colombia (COT)`;
}

function refresh() { applyFilter(); }

// ════════════════════════════════════════════════════════
// SETUP TOKEN MODAL  (solo admin, primera vez o token vencido)
// ════════════════════════════════════════════════════════
function showTokenSetup(msg = '') {
  const overlay = document.getElementById('token-setup-overlay');
  if (msg) document.getElementById('token-setup-msg').textContent = msg;
  overlay.style.display = 'flex';
  setTimeout(() => document.getElementById('token-input').focus(), 100);
}

function hideTokenSetup() {
  document.getElementById('token-setup-overlay').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btn-token-save').addEventListener('click', () => {
    const val = document.getElementById('token-input').value.trim();
    if (!val) return;
    localStorage.setItem('wc2026_pat', val);
    _fileSha = null; // forzar re-lectura del SHA
    hideTokenSetup();
    document.getElementById('token-input').value = '';
  });
  document.getElementById('btn-token-cancel').addEventListener('click', hideTokenSetup);

  // Si es admin y no tiene token, mostrar setup automáticamente
  if (isAdmin && !localStorage.getItem('wc2026_pat')) {
    showTokenSetup();
  }
});

// ════════════════════════════════════════════════════════
// INIT
// ════════════════════════════════════════════════════════
buildBanner();
buildTabs();
applyFilter();
fetchResults();
