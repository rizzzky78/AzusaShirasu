/**
 * @global
 * @info
 */
const __dashboard = `Update v4.0`
// Validation Function
const NotRegistered = "Kamu belum terdaftar di database Azusa Bot, silahkan daftar terlebih dahulu agar bisa menggunakan Bot dengan cara *!daftar*\nFormat: *!daftar Nama|gender|umur|hobi*\nContoh: *!daftar Budi|cowo|29|turu*"
const userHasEmptyLimit = "Enjoy the Features?, but unfortunately your limit has empty\nKetuk tombol dibawah untuk melihat Bundle Limit"
const marks = '```'
const __userGuide = `
*_Azusa Bot -- Shirasu Azusa Bot_*
_a successor of shoujo bot, who is predecessor of shiroko bot and deprecated of kei bot_



*_FYI_*

*Information*
!rules | untuk melihat Rules/aturan pakai Bot
!guide | untuk melihat aturan/cara pakai Bot
!changelog | untuk melihat log patch rilis fitur Bot

*Register*
!daftar | Kamu *tidak perlu* daftar agar bisa menggunakan fitur-fitur Bot

*Interface*
!menu | Untuk menampilkan sub-menu fitur Bot
!semuamenu | Untuk menampilkan List Semua Fitur Bot yang ada

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

*User Guide*
Silahkan dibaca dengan teliti yaa, kalo masih bingung ya baca ulang :)

*_Youtube Downloader -Feature Request_*
!ytplay <link/query> | output audio/suara
contoh: !ytplay https://www.youtube.com/watch?v=AKm0GhHkhR4
atau juga bisa: !ytplay koyo jogja istimewa

!ytmp3 <link only> | output audio/suara (alternatif)
contoh: !ytmp3 https://www.youtube.com/watch?v=AKm0GhHkhR4
hampir sama sperti !ytplay, ini hanya utk alternatif

!ytmp4 <link only> | output video
contoh: !ytnp4 https://www.youtube.com/watch?v=AKm0GhHkhR4
tidak selalu work, jika video di privat maka tidak bisa


*_Jooxplay, music player+lyrics -Feature Request_*
!jooxplay <query/title/artist+title song> | output audio+lyricys(if available)
contoh: !jooxplay melukis senja
kadank tidak akurat, coba lebih detail lagi saat menulis request


*_Spotify Downloader -Feature Request_*
!spotifysearch <query> (query=args) | !spotifysearch <link> (query=link)
contoh: !spotifysearch hati hati di jalan
contoh: !spotify https://open.spotify.com/track/...


*_Facebook Downloader -Feature Request_*
!fbdl1 <link only> | output video from link fb
contoh: fbdl1 https://web.facebook.com/watch/?v=892725951575913
tidak semua konten di facebook bisa di download lewat Bot ya


*_Wikipedia / Kbbi_*
!wikipedia <query> (query=args)| !kbbi <query> (query=words)
contoh: !wikipedia Napoleon | !kbbi Rancu


*_Alquran/Alquran audio -Feature Request_*
!alquran <nomor surah>/<nomor ayat/<...-...>
contoh: !alquran 1/4
bisa juga: !alquran 1/1-4

!alquranaudio <nomor surah>/<nomor ayat/<...-...>
contoh: sama seperti penggunaan fitur !alquran diatas


*_Fitur-Fitur yang lain kurang lebih penggunaannya sama seperti yang sudah dicontohkan diatas_*
*untuk panduan fitur lainnya segera menyusul,..*


...thankyou for reading till end :)
`
const __faq = `
*_FAQ:_*

Q: Apakah Bot ini gratis digunakan?
A: Yes.

Q: Boleh dimasukin ke Grup gak min?
A: Silahkan chat Owner ya.

Q: Apakah Bot online 24 jam?
A: Bot akan selalu Online 24 jam, berjalan di Server VPS.

Q: Data aman min?
A: Data kamu aman 100% dan tidak akan disalahgunakan.

Q: Apakah Bot dipantau terus sama Owner?
A: Bot berjalan di server dan tetap di monitoring oleh Owner.

Q: Min, kok ada limit nya sih?
A: Limit di ibaratkan sebagai cash/money yang mana digunakan untuk memproses request kamu, dari pertama daftar kamu sudah mendapatkan gratis 50 limit.

Q: Min, limit aku habis nih
A: Limit bisa kamu beli, murah kok mulai 5k kamu udh dpt 70 limit, detailnya cek di panel Menu

Q: Min kok ga respon yaa?
A: Jika Bot tidak merespon, silahkan kirim ulang perintah. Bot terkadang restart untuk refresh cache pada server

Q: Koq hasilnya ga sesuai request ya min?
A: Lebih spesifik lagi dalam membuat request, karena yang memproses adalah sistem bukan manusia, tehe :))

Q: Koq aku di ban/block min?
A: Jika kamu melanggar rules / terms of service Bot maka akan otomatis tereksekusi, chat Owner untuk unban/unblock.


*_ENDs HERE_*
`
const __myRules = `
*_Azusa Bot Rules / Terms of Service_*

*Rules*
- Dilarang Call / Video Call ke bot
- Dilarang spam pesan (apapun) ke Bot, beri jeda waktu 5-10 detik
- Bot tidak 100% bisa memproses Request, terkadang terjadi error, dsb
- Bot masih dalam tahap pengembangan lebih lanjut

*Terms of Service*
- User perlu Registrasi agar bisa menggunakan Fitur Bot
- Data Registrasi User digunakan untuk validasi/user terkait limitasi dan penggunaan Fitur Bot
- Data User 100% aman, dan tidak akan disebar/disalahgunakan
- Adanya Limitasi/User, dikarenakan akhir-akhir ini jarang ada yang Support Bot
- Bot menggunakan Virtual Server (paid), jadi jika tidak ada pemasukan maka kemungkinan besar Bot hiatus sementara/permanen

_Segala kebijakan dan ketentuan bot dapat berubah kapan saja_
_Azusa Bot_
`

const __openAiHelp = `${marks}
Hints:
# chatgpt
- tools paling powerful dalam menjawab/menyelesaikan semua jenis permasalahan secara lebih detail.

# chatgptimage
- tools untuk generasi gambar sesuai masukan, didukung oleh openAi DALL-E 2.0.

# ai qna
- sesi Q & A, dijawab dengan kecerdasan buatan, hasil jawaban relatif tidak terlalu panjang.

# ai grammar
- tools untuk mnengkoreksi ejaan, bisa EYD, jawaban akan lebih sempurna jika menggunakan bahasa inggris.

# ai summary
- tools untuk meringkas kalimat/paragraf, hasil jawaban relatif pendek.

# ai code
- tools untuk generasi syntax koding, hasil jawaban tidak bisa terlalu panjang dan detail.

# ai keyword
- tools untuk membuat kata kunci dari suatu kalimat/paragraf, biasanya digunakan untuk SEO.

# ai factual
- sesi Q & A dengan jawaban fakta dan benar terjadi sesuai data yang ada.

# ai chat
- sesi chatbot dan direspon dengan kecerdasan buatan.

# ai analogy
- tools untuk membuat sebuah analogi dengan input berupa kata-kata/kalimat.

# ai chatbot
- sesi chatbot dan direspon dengan kecerdasan buatan, dengan respon relatif lebih panjang.

# ai marv
- sesi chatbot yang terkadang direspon dangan sisipan kata-kata sarkas.

# ai study
- tools untuk generasi hal apa saja yang harus dilakukan ketika ingin belajar sesuatu.

Footnote:
penggunaan: ai+command, contoh: aifactual indonesia,
chatgpt & chatgptimage memerlukan limit lebih banyak dari fitur lain, gunakan secara bijak.
query bebas sesuai keinginan dan imajinasi User, hasil tidak selalu 100% akurat.
 
don't forget to support me ookay! :))
${marks}`

const __myDonationsBoards = `
┏━━━━━━━⟬ *Donations Board* ⟭━━━━━━━

 - _patch of Azusa Bot, end of jul ~ nov_
┃ ♔ Budi ➛ 18 💎 
┃ ♔ Rry Kaslana ➛ 10 💎 
┃ ♔ Ikki ➛ 7 💎 
┃ ♔ Faiz ➛ 7 💎 
┃ ♔ Lewd Chan ➛ 5 💎 _updated_
┃ ♔ Dimas R. ➛ 4 💎
┃ ♔ Kadek Eva ➛ 2 💎 _updated_
┃ ♔ Daedalus ➛ 2 💎 _updated_
┃ ♔ Rizal ➛ 2 💎 
┃ ♔ viky ➛ 1 💎 

 - _patch of Shoujo Bot ~ Kei Bot_
┃ ♔ Allen ➛ 2 💎
┃ ♔ Dio ➛ 2 💎
┃ ♔ Lloyd ➛ 3 💎
┃ ♔ Sinz ➛ 2 💎
┃ ♔ Shadow ➛ 1 💎
┃ ♔ Ark ➛ 2 💎

┃ ♔ ...(you)?

┏━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃        💎 equals as well as 5k IDR
┗━━━━━━━━━━━━━━━━━━━━━━━━━┛

┗━━━━━━━⟬ _Donations Board_ ⟭━━━━━━━
`

const __bundleLimit = `
*_LIMIT BUNDLE_*

# \`\`\`Bundle: Anak Kosan Akhir Bulan\`\`\`
\`\`\`Limit +70\`\`\`
\`\`\`Price: 5k IDR\`\`\`

# \`\`\`Bundle: Anak Kosan Yang Suka Nongkrong\`\`\`
\`\`\`Limit +120\`\`\`
\`\`\`Price: 10k IDR\`\`\`

# \`\`\`Bundle: Anak Kosan Hedon\`\`\`
\`\`\`Limit +200\`\`\`
\`\`\`Price: 15k IDR\`\`\`

# \`\`\`Bundle: Anak Kosan Royal\`\`\`
\`\`\`Limit + 500\`\`\`
\`\`\`Price: 25k IDR\`\`\`

*_MASA BERLAKU LIMIT? = LIFETIME (SELAMA BOT HIDUP)_*

*_How To Paid?_*
- payment via donate QR Saweria, tetapi dipisah dari list donasi, akan di list ke subcriber Bot
- setelah payment dilakukan, User mengirim bukti SS payment ke Owner dengan caption data user berupa: Username dan Nomor pada database bot (bisa dicek pada command *!myprofile*)
- tunggu sampai Owner merespon, setelah itu perubahan limit bisa di cek via *!myprofile*


_Regards,.._
`

const __storeHelp = `
*Cloud Store Guides*
untuk memakai fitur ini perlu diperhatikan step by step nya, antara lain:

1 - gunakan perintah *!makestore* untuk membuat database jika belum membuat database

2 - gunakan perintah *!newstore* jika user sudah membuat database, untuk menyimpan data ke database

3 - gunakan perintah *!mystore* untuk melihat list data yang telah kamu buat sebelumnya

4 - gunakan perintah *!getstore* untuk memilih dan mengambil data yang telah kamu buat sebelumnya

Note Regulasi:
[Data Key] tidak boleh duplikat atau memiliki spasi
[Data] dapat berbentuk bebas dan memiliki batasan panjang 1000 kata
`

const __changelog = `
*_CHANGELOG BOT_*


*Support Oowner/Maintainer Bot dengan cara berdonasi agar Bot tetap hidup*
*tanpa pemasukan, Bot tidak akan bertahan lama melayani User-sama*

*_CHANGE DATABASES*
migrate to Mongodb Atlas Database
_penyesuaian semua fitur secara bertahap_

*_CHANGE FEATURES_*
donasi -> replace deprecated QRIS to Saweria
donasi -> added dashboard donasi, check at !donasi


*_ADDED NEW FEATURES_*
_last updated deployment: 2 nov 2022_

!semuamenu _get all list menu on safe mode_

*_PATCH 07 SEPTEMBER 2022_*

- NSFW
nhentaisearch
nhentaipdf
doujindesu
doujindesulatest
doujindesusearch
xnxxsearch [query]
xnxx [link]
xhamstersearch [query]
xhamster [link]

- ANIMANGA
neonimelatest
storyanime
anime
animesearch
otakudesusearch [query]
wait [link image] _what anime is that?_
wmit [link image] _what manga is that?_

- RANDOM TEXT
cerpen
ceritahoror
faktaunik
katabijak
pantun
puisi
katabucin1
katabucin2
quotes
quotesislami
quotesdilan
quotesanime

- MEMES
cmm [query] _change my mind memes_
memes [select button]

- RANDOM ASUPAN/IMAGE
asupan
cecan
cogan
ppcouple
esteticpicture
quotesimage

- SEARCH
wikipedia [query]
kbbi [query]
kanachansearch [query]
danboorusearch [query]
walppsearch1 [query]
walppsearch2 [query]
gimagesearch [query]
shopeeproduct [query]
pinterestsearch [query]
unsplashsearch [query]
grubwasearch [query]
searchplace [query]
searchquote [query]
ytsearch2 [query] _alternative feature_

- STICKER
stickerpatrick
stickerdadu
stickeramongus
stickergawgura
stickeranjing
stickerbucin

- ISLAMI
niatsholat [select query]
kisahnabi [query]

- DOWNLOADER
fbdl1 [link] _download facebook content_
fbdl2 [link] _download facebook content_
jooxplay [query] _play some songs with lyrics_
spotify [link] _play some song_
spotifysearch [query] _search song_
twtimage [link] _download picture from twitter link_
twtvideo [link]  _choose media download video from twitter link_
twtvideodl [link] _download video from selected twitter link_
insta_gram [link]  _Instagram downloader (igtv, post, video, reel, etc)_
ytplay2 [query] _alternative feature_
youtubemp3 [link] _alternative feature_
youtubemp4 [link] _alternative feature_


*_PATCH 17 SEPTEMBER 2022_*

OTHER
shorturl1
shorturl2
shorturl3
shorturl4
shortouo
ouo
filetobase64
texttomorse
morsetotext
ransoomer

DOWNLOADER
zippyshare
apkdownloader

MOVIE & STORY
filmapik
drakorsearch
drakorongoing
cerpen
ceritahoror

*_PATCH 2 OKTOBER 2022_*

URL SHORTENER
shorturl1
shorturl2
shorturl3
shorturl4
shortouo
ouo

OTHER
filetobase64
texttomorse
morsetotext
ransoomer
rangkum
ringkasan
random50
random100
random200

IMAGE
pixiv
pixivsearch
pixivid


*_PATCH 2 NOVEMBER 2022_*
MIGRATE DATABASE
LIMIT USAGE

*_PATCH 7 NOVEMBER 2022_*
NEW:
cekresi [ekspedisi|no resi]

REVAMPED:
ytsearch
ytmp3
ytmp4
tiktok
tiktokwm
tiktoknowm
animesearch

*_PATCH 20 NOVEMBER 2022_*
NEW FEATURES:
makestore
newstore
mystore
getstore

CHANGES:
LIMIT AWAL SET TO 25
MAJOR FEATURES CONSUME LIMIT TO USE
`

module.exports = { __dashboard, __userGuide, __openAiHelp, __myDonationsBoards, __bundleLimit, __changelog, __storeHelp, __myRules, __faq, userHasEmptyLimit, NotRegistered };
