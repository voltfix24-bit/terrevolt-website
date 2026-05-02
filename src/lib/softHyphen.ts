// Zachte koppelteken-utility (soft hyphen, U+00AD) voor lange Nederlandse
// samengestelde woorden in de TerreVolt-copy. Het zachte koppelteken is in
// platte tekst onzichtbaar; de browser gebruikt het pas als het woord aan
// het einde van een regel moet worden afgebroken.
//
// Bron blijft leesbaar: schrijf normale strings, draai ze door
// `softHyphenate(text)`. De helper vervangt bekende lange compounds (case-
// insensitive, met behoud van originele hoofdletters) door versies met
// soft hyphens op natuurlijke morfeemgrenzen.

const SHY = "\u00AD";

// Sleutelwoorden in lowercase -> arrays van segmenten (lowercase).
// Volgorde: langste eerst, zodat "Installatieverantwoordelijke" niet door
// "verantwoordelijke" wordt overschreven.
const SEGMENTS: Array<[string, string[]]> = [
  ["elektriciteitsvoorzieningssystemen", ["elek", "tri", "ci", "teits", "voor", "zienings", "sys", "te", "men"]],
  ["installatieverantwoordelijke", ["instal", "latie", "ver", "ant", "woor", "de", "lij", "ke"]],
  ["veiligheidswerkinstructies", ["vei", "lig", "heids", "werk", "in", "struc", "ties"]],
  ["veiligheidswerkinstructie", ["vei", "lig", "heids", "werk", "in", "struc", "tie"]],
  ["middenspanningsmonteurs", ["mid", "den", "span", "nings", "mon", "teurs"]],
  ["middenspanningsmonteur", ["mid", "den", "span", "nings", "mon", "teur"]],
  ["bedrijfsvoorschriften", ["be", "drijfs", "voor", "schrif", "ten"]],
  ["werkverantwoordelijke", ["werk", "ver", "ant", "woor", "de", "lij", "ke"]],
  ["werkverantwoordelijken", ["werk", "ver", "ant", "woor", "de", "lij", "ken"]],
  ["veiligheidsstructuur", ["vei", "lig", "heids", "struc", "tuur"]],
  ["bedrijfsspecifieke", ["be", "drijfs", "spe", "ci", "fie", "ke"]],
  ["aardingsvoorzieningen", ["aar", "dings", "voor", "zie", "nin", "gen"]],
  ["aardingsvoorziening", ["aar", "dings", "voor", "zie", "ning"]],
  ["stationsrenovaties", ["sta", "tions", "re", "no", "va", "ties"]],
  ["stationsrenovatie", ["sta", "tions", "re", "no", "va", "tie"]],
  ["netbeheerderseisen", ["net", "be", "heer", "ders", "ei", "sen"]],
  ["netbeheerwereld", ["net", "be", "heer", "we", "reld"]],
  ["netbeheerders", ["net", "be", "heer", "ders"]],
  ["netbeheerder", ["net", "be", "heer", "der"]],
  ["hoofdaannemers", ["hoofd", "aan", "ne", "mers"]],
  ["hoofdaannemer", ["hoofd", "aan", "ne", "mer"]],
  ["veiligheidsbewust", ["vei", "lig", "heids", "be", "wust"]],
  ["bedrijfsvoering", ["be", "drijfs", "voe", "ring"]],
  ["poortinstructies", ["poort", "in", "struc", "ties"]],
  ["aanwijsbeleid", ["aan", "wijs", "be", "leid"]],
];

// Bouw een patroon dat alle keys ineens matcht; we behouden hoofdletters
// door per match de lengte van elk segment uit het origineel te knippen.
const PATTERN = new RegExp(`(${SEGMENTS.map(([k]) => k).join("|")})`, "gi");

const SEG_MAP = new Map(SEGMENTS);

export function softHyphenate(input: string): string {
  return input.replace(PATTERN, (match) => {
    const segs = SEG_MAP.get(match.toLowerCase());
    if (!segs) return match;
    let i = 0;
    const parts: string[] = [];
    for (const seg of segs) {
      parts.push(match.slice(i, i + seg.length));
      i += seg.length;
    }
    return parts.join(SHY);
  });
}
