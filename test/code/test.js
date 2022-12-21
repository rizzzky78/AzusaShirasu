const serveAtlas = require('../atlas');
const { ATLAS_DB, ATLAS_COLLECTION } = require('../provider/atlas.config');

const Database = ATLAS_DB.azusaDatabase // Cluster Mongodb Atlas: Database
const DataUsers = ATLAS_COLLECTION.azusaCloudUserStorage // Cluster Mongodb Atlas Collection

const MainDatabase = serveAtlas.db(Database);
const UsersCloudStore = MainDatabase.collection(DataUsers);

/*
  @params

    @user
    #Key
    #Value

 */
let arg = args.join(' ');
let insertedKey = arg.split('|')[0];
let insertedValue = arg.split('|')[1];
let nowDate = new Date
let insertedDate = nowDate.toString()
let dataOwner = m.sender.split('@')[0];

let txt = `Cara Penggunaan
Format: !savemydata key|value
key harus unik/tidak duplikat, dan value merupakan text atau pesan yang kamu simpan ke database

Contoh penggunaan: *!mystore kebayamerah|ini link kebaya merah: https://www.kebayamerah.com

Cara menampilkan list data yang kamu simpan:
*!mydata*
Cara akses data yang kamu simpan:
*!getmydata [key yang telah kamu buat]*
Contoh: *!getmydata kebayamerah*

Hasil akan Error jika Key yang kamu masukan salah atau kamu memang belum menyimpan data ke cloud
`
if (!text && !text.includes('|')) return reply('Cara Penggunaan:\nContoh: kebaya|https://kebaya-merah.com')


(async () => {

})();

