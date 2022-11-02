
/* Used for Guides */

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



*_Extra Guide & FAQ_*
_Selengkapnya:_

*_About GET Features!_*
*GET Features => Fitur Bot yg menggunakan APIkey Premium/berbayar untuk memproses request!
*Note: web APIkey terkadang error saat memproses request, NOT 100% guaranteed WORK

*_FAQ:_*
Q:Apa Bot ini FREE?
A:Yes, kalo mau donasi silahkan, alhamdulillah banget :)

Q:Apa Bot ini ada limit / batasan pemakaian?
A:Tidak ada, kamu bebas pakai semaumu.

Q:Hasil proses fitur darimana?
A:APIkey provider (berbayar)

Q:Cara masukin Bot ke Grup gimana?
A:Kamu bisa chat owner agar Bot dimasukan ke Grup yang kamu mau, chat owner di wa.me/6281329585825

Q:Kok error / gak muncul requestnya banh?
A:Okey,.. gw jelasin dikit

first, apakah perintah yg kamu masukin udh bener dan sesuai format yg ada di list menu?
second, tanda [...] itu cuman marker ya,.. jadi gaperlu dimasukin tiap request... nanti malah gak ke proses request kamu
third, bisa jadi karena ada problem di bagian server side Bot.. yep, server Reest API Bot
fourth, ada problem di production App Bot nya... chat owner semisal nemu problem ya,..


*untuk panduan fitur lainnya segera menyusul,..*


...thankyou for reading till end :)
`

const __myDonationsBoards = `
┏━━━━━━━⟬ *Donations Board* ⟭━━━━━━━

 - _patch of Azusa Bot, end of jul ~ sep_
┃ ♔ Budi ➛ 18 (+8) 💎 _updated_
┃ ♔ Rry Kaslana ➛ 10 💎 _updated_
┃ ♔ Ikki ➛ 2 💎 _updated_
┃ ♔ Rizal ➛ 2 💎 _updated_
┃ ♔ viky ➛ 1 💎 _updated_

 - _patch of Shoujo Bot ~ Kei Bot_
┃ ♔ Faiz ➛ 5 💎
┃ ♔ Allen ➛ 2 💎
┃ ♔ Dio ➛ 2 💎
┃ ♔ Dimas R. ➛ 2 💎
┃ ♔ Lloyd ➛ 3 💎
┃ ♔ Sinz ➛ 2 💎
┃ ♔ Shadow ➛ 1 💎
┃ ♔ Ark ➛ 2 💎

┃ ♔ ...(you)?

┏━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃        💎 equals as well as 5k IDR
┗━━━━━━━━━━━━━━━━━━━━━━━━━┛

┗━━━━━━━⟬ _Donations Board_ ⟭━━━━━━━`

const __changelog = `
*_CHANGELOG BOT_*


*Support Oowner/Maintainer Bot dengan cara berdonasi agar Bot tetap hidup*
*tanpa pemasukan, Bot tidak akan bertahan lama melayani User-sama*

*_CHANGE DATABASES*
migrate to Mongodb ATlas Database
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
`

module.exports = { __userGuide, __myDonationsBoards, __changelog };
