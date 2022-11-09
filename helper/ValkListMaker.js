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
      { title: "ER Conditions", rowId: "erguides", description: "_melihat kondisi buff ER versi sekarang_" }
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
      { title: "Herscher of Human Ego", rowId: "hohtypecharge", description: "_Play Mode: charge atk_" },
      { title: "Herscher of Human Ego", rowId: "hohtypeultimate", description: "_Play Mode: ultimate/burst atk_" },
    ]
  },
  {
    title: "Gak ada lagi su",
    rows: [
      { title: "Wumbo", rowId: "wanipiroxxx", description: "blablablaa...." }
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

module.exports = { listAllValkyrie };