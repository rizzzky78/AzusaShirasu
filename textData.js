
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

 - _patch of Azusa Bot, end of jul ~ oct_
┃ ♔ Budi ➛ 18 💎 
┃ ♔ Rry Kaslana ➛ 10 💎 
┃ ♔ Faiz ➛ 7 💎 _updated_
┃ ♔ Kanzaki Ikki ➛ 5 💎 _updated_
┃ ♔ Lewd Chan ➛ 5 💎 _updated_
┃ ♔ Rizal ➛ 4 💎 _updated_
┃ ♔ viky ➛ 1 💎 

 - _patch of Shoujo Bot ~ Kei Bot_
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

module.exports = { __userGuide, __myDonationsBoards };
