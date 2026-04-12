function red(slovo, niz) {
  const m = { s: 'slobodno', z: 'zauzeto', r: 'rezervisano' };
  return niz.split('').map((st, i) => ({ red: slovo, broj: i + 1, status: m[st] }));
}

function sala(raspored) {
  const sjedista = [];
  for (const [slovo, niz] of Object.entries(raspored)) {
    sjedista.push(...red(slovo, niz));
  }
  return sjedista;
}

const SKORO_PUNA = {
  A: 'sszzzzzzzr', B: 'sszzzzzzzr', C: 'zzzzzzzzzr',
  D: 'zzzzzzzzrr', E: 'zzzszzzzrr', F: 'szzzzzzrrs',
  G: 'sszzzzzrrs', H: 'ssszzzzrss'
};
const POLUPRAZNA = {
  A: 'sssszzrrss', B: 'ssszzzrrss', C: 'sszzzzrrss',
  D: 'ssssssssss', E: 'ssssssssss', F: 'ssssssssss',
  G: 'ssssssssss', H: 'ssssssssss'
};
const PRAZNA = {
  A: 'ssssssssss', B: 'ssssssssss', C: 'ssssssssss',
  D: 'ssssssssss', E: 'ssssssssss', F: 'ssssssssss',
  G: 'ssssssssss', H: 'ssssssssss'
};
const RASPRODANO = {
  A: 'zzzzzzzzzz', B: 'zzzzzzzzzz', C: 'zzzzzzzzrr',
  D: 'zzzzzzzrrs', E: 'zzzzzzrrss', F: 'zzzzrrrssr',
  G: 'sszzzrrsss', H: 'sssszsssss'
};
const MALO = {
  A: 'zzssssssss', B: 'zsssssssss', C: 'ssssssssss',
  D: 'ssssssssss', E: 'rrssssssss', F: 'ssssssssss',
  G: 'ssssssssss', H: 'ssssssssss'
};

const podaci = {
  projekcije: [
    { film: "Mission: Impossible – Final Reckoning", vrijeme: "16:00", sala: 1, sjedista: sala(SKORO_PUNA) },
    { film: "Thunderbolts*",                         vrijeme: "18:30", sala: 2, sjedista: sala(POLUPRAZNA) },
    { film: "John Wick",                             vrijeme: "20:15", sala: 3, sjedista: sala(SKORO_PUNA) },
    { film: "Avengers",                              vrijeme: "21:00", sala: 1, sjedista: sala(PRAZNA)     },
    { film: "Batman",                                vrijeme: "15:00", sala: 2, sjedista: sala(RASPRODANO) },
    { film: "Gladiator",                             vrijeme: "19:00", sala: 1, sjedista: sala(POLUPRAZNA) },
    { film: "Joker",                                 vrijeme: "21:30", sala: 2, sjedista: sala(SKORO_PUNA) },
    { film: "Sinners",                               vrijeme: "17:30", sala: 3, sjedista: sala(SKORO_PUNA) },
    { film: "Oppenheimer",                           vrijeme: "13:00", sala: 1, sjedista: sala(RASPRODANO) },
    { film: "127 Hours",                             vrijeme: "17:00", sala: 3, sjedista: sala(MALO)       },
    { film: "A Minecraft Movie",                     vrijeme: "14:00", sala: 3, sjedista: sala(SKORO_PUNA) },
    { film: "Little Man",                            vrijeme: "16:30", sala: 2, sjedista: sala(POLUPRAZNA) },
    { film: "Home Alone",                            vrijeme: "11:00", sala: 1, sjedista: sala(PRAZNA)     },
    { film: "The Johnsons",                          vrijeme: "10:00", sala: 3, sjedista: sala(RASPRODANO) },
    { film: "Barbie",                                vrijeme: "12:30", sala: 2, sjedista: sala(RASPRODANO) },
    { film: "The Wild Robot",                        vrijeme: "13:30", sala: 2, sjedista: sala(SKORO_PUNA) },
    { film: "Maomao",                                vrijeme: "11:30", sala: 3, sjedista: sala(POLUPRAZNA) },
    { film: "Inside Out 2",                          vrijeme: "10:30", sala: 1, sjedista: sala(RASPRODANO) },
    { film: "Chainsaw Man Movie: Reze Arc",          vrijeme: "20:00", sala: 2, sjedista: sala(MALO)       },
    { film: "Spider-Man: Across the Spider-Verse",   vrijeme: "14:30", sala: 1, sjedista: sala(RASPRODANO) }
  ]
};