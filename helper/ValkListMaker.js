// valkyrie list maker menu


/*
@params

    @title as name valkyrie
    @rows.title as type name valkyrie
    @rows.rowId as id command
    @rows.description as type atk buff mode

*/

const sections = [
  {
    title: "Guides / Panduan ER",
    rows: [
      { title: "ER Phase Conditions", rowId: "erguides", description: "_melihat kondisi buff ER versi sekarang_" }
    ]
  },
  {
    title: "Li Sushang",
    rows: [
      { title: "Jade Knight", rowId: "jadeknight", description: "Regular playmode" }
    ]
  },
  {
    title: "Elysia",
    rows: [
      { title: "Miss Pink Elf", rowId: "misspinkelf", description: "_Play Mode: regular_" },
      { title: "Herscher of Human Ego", rowId: "hohtypecharge", description: "_Play Mode: charge atk_" },
      { title: "Herscher of Human Ego", rowId: "hohtypeultimate", description: "_Play Mode: ultimate/burst atk_" },
    ]
  },
  {
    title: "Kiana Kaslana",
    rows: [
      { title: "Herscher of Void", rowId: "kianavoid", description: "_Play Mode: regular_" },
      { title: "Herscher of Flamescion", rowId: "kianahof", description: "_Play Mode: regular_" }
    ]
  },
  {
    title: "Raiden Mei",
    rows: [
      { title: "Hershcher of Thunder", rowId: "meihot7t", description: "_Play Mode: 7 Thunder mode_" },
      { title: "Hershcher of Thunder", rowId: "meihotulti", description: "_Play Mode: Burst Mode_" },
    ]
  },
  {
    title: "Bronya",
    rows: [
      { title: "Hershcer of Reason", rowId: "bronyahor", description: "_Play Mode: regular_" }
    ]
  },
  {
    title: "Rita",
    rows: [
      { title: "Argent Knight Artemis", rowId: "ritaaka", description: "_Play Mode: regular_" },
      { title: "Fallen Rosemary", rowId: "ritafr", description: "_Play Mode: regular_" },
    ]
  },
  {
    title: "Fu Hua",
    rows: [
      { title: "Hershcer of Sentience", rowId: "huasenti", description: "_Play Mode: regular_" }
    ]
  },
  {
    title: "Seele",
    rows: [
      { title: "Starchasm Nyx", rowId: "seelont", description: "_Play Mode: regular_" }
    ]
  },

  {
    title: "Pardofelis",
    rows: [
      { title: "Reverist Calico", rowId: "feliscalico", description: "_Play Mode: regular_" }
    ]
  },
  {
    title: "Griseo",
    rows: [
      { title: "Starry Impression", rowId: "griseosi", description: "_Play Mode: regular_" }
    ]
  },
  {
    title: "Eden",
    rows: [
      { title: "Golden Diva", rowId: "edendiva", description: "_Play Mode: regular_" }
    ]
  },
  {
    title: "Aponia",
    rows: [
      { title: "Disciplinary Perdition", rowId: "aponiahot", description: "_Play Mode: regular_" }
    ]
  },
  {
    title: "Mobius",
    rows: [
      { title: "Infinite Ouroboros", rowId: "mobiouroboros", description: "_Play Mode: regular_" }
    ]
  },
  {
    title: "Vill V",
    rows: [
      { title: "Hellical Contraption", rowId: "villvcontra", description: "_Play Mode: regular_" }
    ]
  },
  {
    title: "More?",
    rows: [
      { title: "jangan klik saya", rowId: "xcommandx", description: "jangan di klik, entar nyesel lu...." }
    ]
  },
]

const listAllValkyrie = {
  text: "Elysian Realm v6.1 Recomended Signet",
  footer: "@AzusaBot",
  title: "*GAME GUIDES*\nHonkai Impact 3rd",
  buttonText: "SELECT SIGNET",
  sections
}
const links = 'https://raw.githubusercontent.com/rizzzky78/AzusaShirasu/main/picture/HoyolabER-V6.1/'
const ValkPictureGuide = {
  header: 'headers.jpg',
  phase: 'currentphase.jpg',

  kianahof: 'kiana-hof.jpg',
  kianahov: 'kiana-hov.jpg',
  bronya: 'bronya-hor.jpg',
  mei7t: 'mei-hot-7thunder-mode.jpg',
  meiburst: 'mei-hot-burst-mode.jpg',
  hua: 'hua-hos.jpg',
  sushang: 'li-sushang-jade-knight.jpg',
  ritaAKA: 'rita-aka.jpg',
  ritaFR: 'rita-fallen-rosemary.jpg',
  seele: 'seele-starchasm-nyx.jpg',

  elympe: 'ely-mpe.jpg',
  elyahohCharge: 'ely-hoh-type-charge.jpg',
  elyhohUlti: 'ely-hoh-type-ultimate.jpg',
  felis: 'felis-reverist-calico.jpg',
  griseo: 'griseo-stary-impresion.jpg',
  eden: 'eden-golden-diva.jpg',
  aponia: 'aponia-diclipinary-perdition.jpg',
  mobius: 'mobius-infinite-ouroboros.jpg',
  villv: 'vill-v-hellical-contraption.jpg'

}

module.exports = { listAllValkyrie, links, ValkPictureGuide };

//https://raw.githubusercontent.com/rizzzky78/AzusaShirasu/main/picture/HoyolabER-V6.1/

/*
Jade Knight

Herrscher of Human: Ego charge
Herrscher of Human: Ego ulti

Reverist Calico
Helical Contraption
Infinite Ouroboros

Herrscher of Thunder Narukami
Herrscher of Thunder Divine Penalty

Herrscher of Reason
SILVERWING: N-EX

Fallen Rosemary
Disciplinary Perdition
Fervent Tempo
Starry Impression
Herrscher of Sentience
Herrscher of Flamescion
Miss Pink Elf♪ SS
Golden Diva SSS
Argent Knight: Artemis SS
Palatinus Equinox
Spina Astera
*/
