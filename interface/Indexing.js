//

const CategoryMenu = [
  'All Menu',

  'Owner Menu',
  'Cloud Store',
  'Open Ai',
  'Group & Management',

  'Anonymous Chat',
  'RPG Games',
  'Quiz Games',

  'Downloader',
  'Search',
  'Islamic',

  'Anime & Manga',
  'NSFW Menu',
  'Lewd Picture (NSFW)',

  'Asupan',
  'Random Cewe',
  'Telegram Sticker',

  'Converter',
  'Image Effect',
  'Sticker Effect',
  'Primbon',
  'Ephoto360',
  'Text Pro Maker',
  'Logo Maker',
  'Voice Changer',

  'Bantuan / Help'
]
const CategoryDesc = [
  'Menampilkan semua Fitur Bot',
  'Fitur khusus Owner Bot',
  'Menympan sesuatu via Bot',
  'Fitur Exclusive, direspon dengan Ai / kecerdasan buatan',
  'Fitur khusus Grup beserta manajemen Grup',

  'Fitur untuk melakukan chat random',
  'Fitur RPG Adventure Games mirip seperti Growtopia',
  'Random Quiz game',

  'Mendowload sesuatu via Bot',
  'Mencari sesuatu yang gak penting amat',
  'Menu Islami',

  'Segala sesuatu tentang Anime & Manga',
  'Not Safe For Work (+18) Menu',
  'Kumpulan Gambar Lewd (+18) Menu',

  'Bahan penyegar dan cuci mata',
  'Kumpulan gambar random cewe cantik',
  'Kumpulan sticker Telegram',

  'Mengkonversi sesuatu dnegan Bot',
  'Membuat gambar jadi lebih menarik',
  'Membuat sticker jadi lebih menarik',
  'Primbon Efek',
  'Mengedit sesuatu dengan Ephoto360 via Bot',
  'Membuat watermark keren dengan Bot',
  'Membuat Logo keren dengan Bot',
  'Filter audio menjadi lebih menarik',
  'Stuck, bingung, perlu bantuan?, silahkan klik disini'
]
const RandomLewd_type1 = [
  'chiisaihentai',
  'trap',
  'blowjob',
  'yaoi',
  'ecchi',
  'hentai',
  'ahegao',
  'hololewd',
  'sideoppai',
  'animefeets',
  'animebooty',
  'animethighss',
  'hentaiparadise',
  'animearmpits',
  'hentaifemdom',
  'lewdanimegirls',
  'biganimetiddies',
  'animebellybutton',
  'hentai4everyone'
]
const RandomLewd_type2 = [
  'bj',
  'ero',
  'cum',
  'feet',
  'yuri',
  'trap',
  'lewd',
  'feed',
  'eron',
  'solo',
  'gasm',
  'poke',
  'anal',
  'holo',
  'tits',
  'kuni',
  'kiss',
  'erok',
  'smug',
  'baka',
  'solog',
  'feetg',
  'lewdk',
  'waifu',
  'pussy',
  'femdom',
  'cuddle',
  'hentai',
  'eroyuri',
  'cum_jpg',
  'blowjob',
  'erofeet',
  'holoero',
  'classic',
  'erokemo',
  'fox_girl',
  'futanari',
  'lewdkemo',
  'wallpaper',
  'pussy_jpg',
  'kemonomimi',
  'nsfw_avatar'
]
const RandomPictAnime = [
  'art',
  'elaina',
  'elf',
  'kanna',
  'loli',
  'neko',
  'waifu',
  'shota',
  'husbu',
  'sagiri',
  'shinobu',
  'megumin',
  'wallnime'
]
const Owner = [
  '< evaluate',
  '> evaluate',
  '$ exec',
  '=> exec',
  'setmenu [query]',
  'setmenu templateLocation',
  'setmenu templateTenor',
  'setmenu katalog',
  'setmenu katalog2',
  'setmenu list',
  'setwm packname|author',
  'sendsesi',
  'listpc',
  'listgc',
  'broadcast [text]',
  'bc [text]',
  'bcgc',
  'bcimage',
  'bcaudio',
  'bcstiker',
  'bcvn',
  'bcvideo',
  'nsfw [on/off]',
  'mute [on/off]',
  'banchat',
  'unbanchat',
  'autorespond [on/off]',
  'antiviewonce [on/off]',
  'autobio [on/off]',
  'join [link]',
  'self',
  'public [only bot]',
  'del [reply pesan bot]',
  'setppbot [reply image]'
]
const CloudStore = [
  'makestore [username]',
  'newstore [key|text]',
  'getstore [key]',
  'mystore'
]
const OpenAi = [
  'chatgpt [query text]',
  'chatgptimage [query specifier]'
]
const GroupManagement = [
  'absen',
  'cekabsen',
  'deleteabsen',
  'absenstart',
  'register',
  'unregister',
  'listonline',
  'sider',
  'wm packname|author',
  'infochat',
  'setdesk [text]',
  'setppgrup [reply image]',
  'revoke',
  'leave',
  'add [62***]',
  'kick @tag',
  'leave',
  'linkgc',
  'welcome [on/off]',
  'goodbye [on/off]',
  'demotedetect [on/off]',
  'promotedetect  [on/off]',
  'setwelcome',
  'updatewelcome',
  'delwelcome',
  'cekwelcome',
  'setgoodbye',
  'updategoodbye',
  'delgoodbye',
  'cekgoodbye',
  'setpromote',
  'updatepromote',
  'setdemote',
  'updatedemote',
  'cekpromote',
  'cekdemote',
  'delpromote',
  'deldemote',
  'nsfw [on/off]',
  'antilink [on/off]',
  'take packname|author',
  'group [open/close]',
  'tagall [text]',
  'hidetag [text]',
  'stickertag [reply sticker]',
  'videotag [reply video]',
  'vntag [reply vn]',
  'imagetag [reply image]'
]
const AnonymousChat = [
  'anonymous',
  'start',
  'skip',
  'stop'
]
const RpgGames = [
  'adventure',
  'weekly',
  'use',
  'transfer',
  'slot',
  'shop',
  'pasar',
  'ojek',
  'nguli',
  'narik',
  'nabung',
  'monthly',
  'mining',
  'merampok',
  'mancing',
  'kolam',
  'koboy',
  'kerja',
  'kandang',
  'judi',
  'inventory',
  'hourly',
  'fishop',
  'feed',
  'duel',
  'daily',
  'craft',
  'cooldown',
  'cook',
  'collect',
  'chop',
  'casino',
  'buy',
  'bank',
  'bansos',
  'berdagang',
  'berkebon',
  'build',
]
const Quiz = [
  'kuismath',
  'tebakgambar',
  'tebakkata',
  'tebakbendera',
  'tebakkalimat',
  'tebaksiapa',
  'tebakkabupaten',
  'tebakkimia',
  'tebaklirik',
  'tebaktebakan',
  'tekateki',
  'susunkata'
]
const Downloader = [
  'tiktok',
  'tiktoknowm',
  'tiktokwm',
  'tiktokaudio',
  'ytdl',
  'play',
  'ytmp3',
  'ytshortmp3',
  'ytmp4',
  'ytshorts',
  'facebook',
  'facebooksd',
  'facebookhd',
  'fbaudio',
  'igstory',
  'igdl',
  'igphoto',
  'igvideo',
  'igreels',
  'igtv',
  'soundcloud',
  'gitclone',
  'gitrepo',
  'mediafire',
  'twitter',
  'fbdl',
  'jooxplay',
  'spotify',
  'spotifysearch',
  'twtimage',
  'twtvideo',
  'twtvideodl'
]
const Searcher = [
  'wikipedia',
  'kbbi',
  'kanachansearch',
  'danboorusearch',
  'walppsearch1',
  'walppsearch2',
  'gimagesearch',
  'shopeeproduct',
  'pixiv',
  'pinterestsearch',
  'unsplashsearch',
  'grubwasearch',
  'searchplace',
  'searchquote',
  'ytsearch',
  'wallpaper',
  'google',
  'wikimedia',
  'wattpad',
  'webtoons',
  'drakor'
]
const Islamic = [
  'niatsholat [select query]',
  'kisahnabi [query]',
  'asmaulhusna',
  'kisahnabi [nabi]',
  'jadwalshalat [daerah]',
  'randomquran',
  'randomquran2',
  'listsurah',
  'tafsirsurah [surah]',
  'alquranaudio [surah|ayat]'
]
const Animanga = [
  'otakudesusearch [query]',
  'neonime',
  'storyanime',
  'quotesanime',
  'anime [query]',
  'manga [query]',
  'character [query]'
]
const Nsfw = [
  'doujindesu [link]',
  'doujindesulatest',
  'doujindesusearch [query]',
  'nhentaisearch [query]',
  'nekopoisearch [query]',
  'nekopoi [link]',
  'nhentaipdf [query]',
  'xnxxsearch [query]',
  'xnxx [link]',
  'xhamstersearch [query]',
  'xhamster [link]'
]
const LewdPicture = [
  'chiisaihentai',
  'trap',
  'blowjob',
  'yaoi',
  'ecchi',
  'hentai',
  'ahegao',
  'hololewd',
  'sideoppai',
  'animefeets',
  'animebooty',
  'animethighss',
  'hentaiparadise',
  'animearmpits',
  'hentaifemdom',
  'lewdanimegirls',
  'biganimetiddies',
  'animebellybutton',
  'hentai4everyone',
  'bj',
  'ero',
  'cum',
  'feet',
  'yuri',
  'trap',
  'lewd',
  'feed',
  'eron',
  'solo',
  'gasm',
  'poke',
  'anal',
  'holo',
  'tits',
  'kuni',
  'kiss',
  'erok',
  'smug',
  'baka',
  'solog',
  'feetg',
  'lewdk',
  'waifu',
  'pussy',
  'femdom',
  'cuddle',
  'hentai',
  'eroyuri',
  'cum_jpg',
  'blowjob',
  'erofeet',
  'holoero',
  'classic',
  'erokemo',
  'fox_girl',
  'futanari',
  'lewdkemo',
  'wallpaper',
  'pussy_jpg',
  'kemonomimi',
  'nsfw_avatar'
]
const Movie = [
  'lk21',
  'filmapik',
  'drakorsearch',
  'drakorongoing'
]
const Memes = [
  'memes [select]',
  'darkjoke',
  'meme',
  'memeindo',
  'cmm [query]'
]
const Story = [
  'cerpen',
  'ceritahoror'
]
const Quotes = [
  'quotes',
  'quotesislami',
  'quotesdilan',
  'quotesanime',
  'quotesimage'
]
const Asupan = [
  'asupan',
  'cecan',
  'cogan',
  'chika',
  'delvira',
  'ayu',
  'bunga',
  'aura',
  'nisa',
  'ziva',
  'yana',
  'viona',
  'syania',
  'riri',
  'syifa',
  'mama_gina',
  'alcakenya',
  'mangayutri',
  'rikagusriani',
  'bocil',
  'geayubi',
  'santuy',
  'ukhty',
  'syifa'
]
const RandomCewe = [
  'china',
  'indonesia',
  'malaysia',
  'thailand',
  'korea',
  'japan',
  'vietnam',
  'jenni',
  'jiso',
  'lisa',
  'rose'
]
const TelegramSticker = [
  'awoawo',
  'benedict',
  'chat',
  'dbfly',
  'dino_kuning',
  'doge',
  'gojosatoru',
  'hope_boy',
  'jisoo',
  'kr_robot',
  'kucing',
  'lonte',
  'manusia_lidi',
  'menjamet',
  'meow',
  'nicholas',
  'patrick',
  'popoci',
  'sponsbob',
  'kawan_sponsbob',
  'tyni'
]
const Converter = [
  'emoji',
  'emojimix',
  'toaudio',
  'tomp3',
  'tovn',
  'stiker',
  'tourl',
  'togif',
  'tomp4',
  'toimg'
]
const ImageEffect = [
  'emoji',
  'emojimix',
  'toaudio',
  'tomp3',
  'tovn',
  'stiker',
  'tourl',
  'togif',
  'tomp4',
  'toimg',
  'wanted',
  'utatoo',
  'unsharpen',
  'thanos',
  'sniper',
  'sharpen',
  'sepia',
  'scary',
  'rip',
  'redple',
  'rejected',
  'posterize',
  'ps4',
  'pixelize',
  'missionpassed',
  'moustache',
  'lookwhatkarenhave',
  'jail',
  'invert',
  'instagram',
  'greyscale',
  'glitch',
  'gay',
  'frame',
  'fire',
  'distort',
  'dictator',
  'deepfry',
  'ddungeon',
  'circle',
  'challenger',
  'burn',
  'brazzers',
  'beautiful'
]
const StickerEffect = [
  'jail',
  'red',
  'gay',
  'bloo',
  'blue',
  'sepia',
  'green',
  'glass',
  'invert',
  'blurple',
  'blurple2',
  'wasted',
  'passed',
  'triggered',
  'comrade',
  'greyscale',
  'threshold',
  'brightness',
  'invertgreyscale'
]
const Primbon = [
  'nomorhoki 887435047326',
  'artimimpi [query]',
  'artinama [query]',
  'ramaljodoh',
  'ramaljodohbali',
  'suamiistri',
  'ramalcinta',
  'cocoknama',
  'pasangan',
  'jadiannikah',
  'sifatusaha',
  'rezeki',
  'pekerjaan',
  'nasib',
  'penyakit',
  'tarot',
  'fengshui',
  'haribaik',
  'harisangar',
  'harisial',
  'nagahari',
  'arahrezeki',
  'peruntungan',
  'weton',
  'karakter',
  'keberuntungan',
  'memancing',
  'masasubur',
  'zodiak',
  'shio [query]'
]
const Ephoto360 = [
  'youtubegold text',
  'youtubesilver text',
  'facebookgold text',
  'facebooksilver text',
  'instagramgold text',
  'instagramsilver text',
  'twittergold text',
  'twittersilver text',
  'retrotext text',
  'halloweenbats text',
  'texthalloween text',
  'cardhalloween text',
  'birthdaycake text',
  'thundertext text',
  'icetext text',
  'milkcake text',
  'snowontext text',
  'metalstar text',
  'dragonfire text',
  'zombie3d text',
  'merrycard text',
  'generalexam text',
  'viettel text',
  'embroider text',
  'graffititext text',
  'graffititext2 text',
  'graffititext3 text',
  'covergraffiti text',
  'moderngold text',
  'capercut text',
  'lovecard text',
  'heartflashlight text',
  'heartcup text',
  'sunglightshadow text',
  'graffiti3d text',
  'moderngoldsilver text',
  'moderngold2 text',
  'moderngold3 text',
  'fabrictext text',
  'masteryavatar text',
  'messagecoffee text',
  'announofwin text',
  'writeblood text',
  'horrorletter text',
  'writehorror text',
  'shirtclub text',
  'angelwing text',
  'christmasseason text',
  'projectyasuo text',
  'lovelycute text',
  'womansday text',
  'covergamepubg text',
  'nameonheart text',
  'funnyhalloween text',
  'lightningpubg text',
  'greetingcardvideo text',
  'christmascard text',
  'galaxybat text',
  'writegalaxy text',
  'starsnight text',
  'noeltext text',
  'textcakes text',
  'pubgbirthday text',
  'galaxywallpaper text',
  'pubgglicthvideo text',
  'pubgmascotlogo text',
  'realembroidery text',
  'vintagetelevision text',
  'funnyanimations text',
  'glowingtext text',
  'textonglass text',
  'cartoonstyle text',
  'multicolor text',
  'watercolor2 text',
  'textsky text',
  'summerbeach text',
  '1917text text',
  'puppycute text',
  'rosebirthday text',
  'steellettering text|text2',
  'letterstext text|text2',
  'barcashirt text|text2',
  'premiercup text|text2',
  'stylepoligon text|text2',
  'lifebuoys text|text2',
  'juventusshirt text|text2'
]
const TextPro = [
  'halloween2 text|text2',
  'horror text|text2',
  'game8bit text|text2',
  'layered text|text2',
  'glitch2 text|text2',
  'coolg text|text2',
  'coolwg text|text2',
  'realistic text|text2',
  'space3d text|text2',
  'gtiktok text|text2',
  'stone text|text2',
  'marvel text|text2',
  'marvel2 text|text2',
  'pornhub text|text2',
  'avengers text|text2',
  'metalr text|text2',
  'metalg text|text2',
  'metalg2 text|text2',
  'halloween2 text|text2',
  'lion text|text2',
  'wolf_bw text|text2',
  'wolf_g text|text2',
  'ninja text|text2',
  '3dsteel text|text2',
  'horror2 text|text2',
  'lava text|text2',
  'bagel text|text2',
  'blackpink text',
  'rainbow2 text',
  'water_pipe text',
  'halloween text',
  'sketch text',
  'sircuit text',
  'discovery text',
  'metallic2 text',
  'fiction text',
  'demon text',
  'transformer text',
  'berry text',
  'thunder text',
  'magma text',
  '3dstone text',
  'neon text',
  'glitch text',
  'harry_potter text',
  'embossed text',
  'broken text',
  'papercut text',
  'gradient text',
  'glossy text',
  'watercolor text',
  'multicolor text',
  'neon_devil text',
  'underwater text',
  'bear text',
  'wonderfulg text',
  'christmas text',
  'neon_light text',
  'snow text',
  'cloudsky text',
  'luxury2 text',
  'gradient2 text',
  'summer text',
  'writing text',
  'engraved text',
  'summery text',
  '3dglue text',
  'metaldark text',
  'neonlight text',
  'oscar text',
  'minion text',
  'holographic text',
  'purple text',
  'glossyb text',
  'deluxe2 text',
  'glossyc text',
  'fabric text',
  'neonc text',
  'newyear text',
  'newyear2 text',
  'metals text',
  'xmas text',
  'blood text',
  'darkg text',
  'joker text',
  'wicker text',
  'natural text',
  'firework text',
  'skeleton text',
  'balloon text',
  'balloon2 text',
  'balloon3 text',
  'balloon4 text',
  'balloon5 text',
  'balloon6 text',
  'balloon7 text',
  'steel text',
  'gloss text',
  'denim text',
  'decorate text',
  'decorate2 text',
  'peridot text',
  'rock text',
  'glass text',
  'glass2 text',
  'glass3 text',
  'glass4 text',
  'glass5 text',
  'glass6 text',
  'glass7 text',
  'glass8 text',
  'captain_as2 text',
  'robot text',
  'equalizer text',
  'toxic text',
  'sparkling text',
  'sparkling2 text',
  'sparkling3 text',
  'sparkling4 text',
  'sparkling5 text',
  'sparkling6 text',
  'sparkling7 text',
  'decorative text',
  'chocolate text',
  'strawberry text',
  'koifish text',
  'bread text',
  'matrix text',
  'blood2 text',
  'neonligth2 text',
  'thunder2 text',
  '3dbox text',
  'neon2 text',
  'roadw text',
  'bokeh text',
  'gneon text',
  'advanced text',
  'dropwater text',
  'wall text',
  'chrismast text',
  'honey text',
  'drug text',
  'marble text',
  'marble2 text',
  'ice text',
  'juice text',
  'rusty text',
  'abstra text',
  'biscuit text',
  'wood text',
  'scifi text',
  'metalr text',
  'purpleg text',
  'shiny text',
  'jewelry text',
  'jewelry2 text',
  'jewelry3 text',
  'jewelry4 text',
  'jewelry5 text',
  'jewelry6 text',
  'jewelry7 text',
  'jewelry8 text',
  'metalh text',
  'golden text',
  'glitter text',
  'glitter2 text',
  'glitter3 text',
  'glitter4 text',
  'glitter5 text',
  'glitter6 text',
  'glitter7 text',
  'metale text',
  'carbon text',
  'candy text',
  'metalb text',
  'gemb text',
  '3dchrome text',
  'metalb2 text',
  'metalg text',
  'metalg text'
]
const LoggoMaker = [
  'coverbannerlol text|heroes',
  'pubglogomaker text|style',
  'colorfulpubg text|color',
  'astronotspace text|style',
  'wallpaperaov text|heroes',
  'maketeamlogo text|style',
  'circlemarcotteam text|logo',
  'wallpaperml text|heroes',
  'dragonballfb text|character',
  'bannerofaov text|character',
  'effect3donbeach text|background',
  'cutegirlgamer text|logo',
  'footballteam text|logo',
  'beautifulshimmering text|champion',
  'pubgcutelogo text|logo',
  'elegantrotation text|logo',
  'logogamingassasin text|logo',
  'introvideomaker text|logo',
  'gaminglogo4fvs text|logo',
  'blueneon text|logo',
  'metalmascot text|logo',
  'anonymous2 text|style',
  'lolpentakill text|style',
  'avatarleagueofking text|style',
  'avatarff text|character',
  'overwatchwallpaper text|character',
  'rovwallpaperhd text|hero',
  'rovwallpaper text|avatar',
  'beautifulgalaxylol text|style',
  'crossfirecover text|character',
  'lolwallpaper text|wallpaper',
  'coverdota2 text|heroes',
  'coverleagueofking text|character',
  'avatar3q360 text|avatar',
  'coverofwarface text|character',
  'newlolavatar text|avatar',
  'csgocover text|background',
  'coverloknew text|hero',
  'coverfblol text|letters',
  'overwatchcover text|hero',
  'crossfirestyle text|avatar',
  'avatarlolbyname text|style',
  'lolcoverbyname text|avatar',
  'cyberhunterfb text|character',
  'coverfreefirefb text|character',
  'gamingmascot text|style',
  'coveronepiecefb text|character',
  'bannerytcsgo text|banner',
  'fbgamepubgcover text|template',
  'banneroflol text|text2|banner',
  'bannerofaov2 text|text2|banner',
  'teamlogo text|text2|background',
  'companylogo2 text|text2|background',
  'companylogo text|text2|background',
  'gradientlogo text|text2|background',
  'pencilsketch text|text2|icon',
  'gunlogogaming text|text2|background',
  'banneroffreefire text|text2|background',
  'letterlogos text|text2|thumb',
  'bannerofoverwatch text|text2|background',
  'bannerofapex text|text2|background',
  'bannerofpubg text|text2|background',
  'mascotstyle text|text2|thumb',
  'logoaccording text|text2|thumb',
  'avataroverwatch text|text2|thumb'
]
const VoiceChanger = [
  'bass',
  'blown',
  'deep',
  'earrape',
  'fast',
  'fat',
  'nightcore',
  'reverse',
  'robot',
  'slow',
  'smooth',
  'tupai'
]
const Other = [
  'faktaunik',
  'katabijak',
  'pantun',
  'puisi',
  'katabucin1',
  'katabucin2',
  'cekresi',
  'shorturl [select]',
  'shortouo',
  'ouo',
  'texttomorse',
  'morsetotext',
  'ransoomer'
]
const GameGuide = [
  'signet [select]',
  'genshinmaterial',
  'genshinbuild'
]

const ObjectCmd = {
  category: CategoryMenu,
  categoryDesc: CategoryDesc,
  commands: {
    owner: Owner,
    cloudstore: CloudStore,
    openai: OpenAi,
    group: GroupManagement,

    anonymous: AnonymousChat,
    rpg: RpgGames,
    quiz: Quiz,

    downloader: Downloader,
    searcher: Searcher,
    islamic: Islamic,

    animanga: Animanga,
    animes: RandomPictAnime,
    nsfw: Nsfw,
    lewd: LewdPicture,

    memes: Memes,
    movie: Movie,
    story: Story,
    quotes: Quotes,
    asupan: Asupan,
    rancewe: RandomCewe,
    telestick: TelegramSticker,

    converter: Converter,
    imgeffect: ImageEffect,
    stickeffect: StickerEffect,
    primbon: Primbon,
    ephoto: Ephoto360,
    textpro: TextPro,
    logomaker: LoggoMaker,
    voice: VoiceChanger,

    other: Other
  }
}

//randomhentai2
module.exports = {
  RandomLewd_type1,
  RandomLewd_type2,
  ObjectCmd
}



