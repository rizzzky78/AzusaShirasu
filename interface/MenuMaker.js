/**
 * @Menu
 * @Sections
 */
const SelectorMenu = [
  {
    title: '📑 Shirasu Azusa Bot Menu\'s',
    rows: [
      {
        title: '📒 All Menu\'s',
        rowId: 'semuamenu',
        description: 'Menampilkan semua Fitur Bot'
      },
      {
        title: '📔 Info Bot',
        rowId: 'infobot',
        description: 'Menampilkan informasi tentang Bot & Grup Bot'
      },
      {
        title: '📗 Panduan',
        rowId: 'guide',
        description: 'Bingung, butuh bantuan cara pakai Bot?, baca tutorial disini.'
      },
      {
        title: '📕 Cloud Store',
        rowId: 'storehelp',
        description: 'Cara pakai Cloud Store'
      },
      {
        title: '📘 Rules',
        rowId: 'rulesbot',
        description: 'Peraturan terkait penggunaan Bot'
      },
      {
        title: '📙 FAQ',
        rowId: 'faq',
        description: 'Pertanyaan seputar Bot yang mungkin sama'
      },
      {
        title: '💷 Tambah Limit',
        rowId: 'howtolimit',
        description: 'Buy limit agar tetap bisa menggunakan fitur Bot'
      },
      {
        title: '💰 Support Owner',
        rowId: 'donasi',
        description: 'Dukung owner agar Bot tetap hidup'
      }
    ]
  },
  {
    title: '📑 Handler Menu',
    rows: [
      {
        title: '🗂️ Owner Menu',
        rowId: 'azusacommand ownermenu',
        description: 'Fitur khusus Owner Bot'
      },
      {
        title: '📁 Cloud Store',
        rowId: 'azusacommand cloudstore',
        description: 'Menyimpan sesuatu ke Database Bot'
      },
      {
        title: '🤖 Open Ai',
        rowId: 'openai',
        description: 'Fitur Exclusive, direspon dengan Ai / kecerdasan buatan'
      },
      {
        title: '👤 Group & Management',
        rowId: 'azusacommand groupmenu',
        description: 'Fitur khusus Grup beserta manajemen Grup'
      },
    ]
  },
  {
    title: '📑 Users Menu',
    rows: [
      {
        title: '🪪 My Profile',
        rowId: 'myprofile',
        description: 'Menampilkan status dan profile kamu'
      },
      {
        title: '👤👤 Anonymous Chat',
        rowId: 'azusacommand anonymous',
        description: 'Fitur untuk melakukan chat random'
      },
      {
        title: '🎮 RGP Games',
        rowId: 'azusacommand rpggames',
        description: 'Fitur RPG Adventure Games mirip seperti Growtopia'
      },
      {
        title: '🧩 Quiz',
        rowId: 'azusacommand quizmenu',
        description: 'Random Quiz game'
      }
    ]
  },
  {
    title: '📑 Game Guides n Game FAQ',
    rows: [
      {
        title: '📚 Honkai Impact ER Recomended Signet',
        rowId: 'signet',
        description: 'v6.2 Rekomendasi signet ER - fase 1'
      },
      {
        title: '📚 Genshin Impact Material Ascend',
        rowId: 'genshinmaterial',
        description: 'Lihat kebutuhan material untuk built-up karakter'
      },
      {
        title: '📚 Genshin Impact Build',
        rowId: 'genshinbuild',
        description: 'Lihat rekomendasi build karakter'
      }
    ]
  },
  {
    title: '🧰 Tools',
    rows: [
      {
        title: '📥 Downloader',
        rowId: 'azusacommand downloadermenu',
        description: 'Mendowload sesuatu via Bot'
      },
      {
        title: '🔍 Searcher',
        rowId: 'azusacommand searchmenu',
        description: 'Mencari sesuatu yang gak penting amat'
      },
      {
        title: '🕋 Islami',
        rowId: 'azusacommand islamicmenu',
        description: 'Stay halal brother :))'
      }
    ]
  },
  {
    title: '⚗️ Otaku\'s',
    rows: [
      {
        title: '🔖 Animanga',
        rowId: 'azusacommand animanga',
        description: 'Segala sesuatu tentang Anime & Manga'
      },
      {
        title: '🔖 Anime Picture & Wallpaper',
        rowId: 'azusacommand animepicture',
        description: 'Kumpulan wallpaper anime'
      },
      {
        title: '🔖 NSFW Menu',
        rowId: 'azusacommand nsfwmenu',
        description: 'Not Safe For Work (+18) Menu'
      },
      {
        title: '🔖 Lewd Picture',
        rowId: 'azusacommand lewdmenu',
        description: 'Kumpulan Gambar Lewd (+18) Menu'
      }
    ]
  },
  {
    title: '📱 Entertainment, Meme & Tele Sticker',
    rows: [
      {
        title: '💈 Meme\'s',
        rowId: 'azusacommand memes',
        description: 'Kumpulan memes & meme creator'
      },
      {
        title: '💈 Movie',
        rowId: 'azusacommand movie',
        description: 'Melihat info seputar perfilman'
      },
      {
        title: '💈 Story',
        rowId: 'azusacommand story',
        description: 'Fitur pembuat cerita fiktif'
      },
      {
        title: '💈 Quotes',
        rowId: 'azusacommand quotes',
        description: 'Fitur random quotes'
      },
      {
        title: '💈 Asupan',
        rowId: 'azusacommand asupan',
        description: 'Bahan penyegar dan cuci mata :v'
      },
      {
        title: '💈 Random Cewe',
        rowId: 'azusacommand randomcewe',
        description: 'Kumpulan gambar random cewe cantik'
      },
      {
        title: '💈 Telegram Sticker',
        rowId: 'azusacommand telesticker',
        description: 'Kumpulan sticker Telegram'
      }
    ]
  },
  {
    title: '🎨 Editor Menu',
    rows: [
      {
        title: '📇 Converter',
        rowId: 'azusacommand convertermenu',
        description: 'Mengkonversi sesuatu dnegan Bot'
      },
      {
        title: '🖼️ Image Effect',
        rowId: 'azusacommand imageeffect',
        description: 'Membuat gambar jadi lebih menarik'
      },
      {
        title: '🖼️ Sticker Effect',
        rowId: 'azusacommand stickeffect',
        description: 'Membuat sticker jadi lebih menarik'
      },
      {
        title: '📼 Primbon',
        rowId: 'azusacommand primbonmenu',
        description: 'Primbon Efek'
      },
      {
        title: '📷 Ephoto360',
        rowId: 'azusacommand ephoto',
        description: 'Mengedit sesuatu dengan Ephoto360 via Bot'
      },
      {
        title: '🖊️ Text Pro Maker',
        rowId: 'azusacommand textpro',
        description: 'Membuat watermark keren dengan Bot'
      },
      {
        title: '✒️ Logo Maker',
        rowId: 'azusacommand logomaker',
        description: 'Membuat Logo keren dengan Bot'
      },
      {
        title: '🎙️ Voice Changer',
        rowId: 'azusacommand voicechanger',
        description: 'Filter audio agar menjadi lebih menarik'
      }
    ]
  },
  {
    title: '📓 Other Features',
    rows: [
      {
        title: 'Others',
        rowId: 'azusacommand other',
        description: 'Menampilkan fitur lainnya'
      }
    ]
  }
]

module.exports = { SelectorMenu };
