const serveAtlas = require('../atlas');
const { ATLAS_DB, ATLAS_COLLECTION } = require('../provider/atlas.config')

const DATABASE = ATLAS_DB.azusaDatabase
const COLLECTION = ATLAS_COLLECTION.azusaUsers

const ATLAS_CLOUD = serveAtlas.db(DATABASE)

const getCollection = ATLAS_CLOUD.collection(COLLECTION);

getCollection.find().toArray((err, res) => {
  if (err) {
    return console.log(err);
  }
  console.log(res)
})

// setTimeout(() => {
//   ATLAS_CLOUD.collection(COLLECTION)
//     .find()
//     .toArray((error, result) => {
//       if (error) {
//         return console.log(error);
//       }
//       let datas = result
//       console.log("Databse Azusa Bot")
//       // console.log(datas)
//       for (let data of datas) {
//         console.log("Nama : ", data.userName),
//           console.log("Gender : ", data.gender),
//           console.log("Umur : ", data.age),
//           console.log("Hobi : ", data.hobby),
//           console.log("Nomor : ", parseInt(data.metaData.userID)),
//           console.log("Link : ", data.metaData.linkID),
//           console.log("Terdaftar pada : ", data.metaData.registeredOn)
//         // console.log(`Nama : ${data.userName}\nNomor : ${data.metaData.linkID}\nUmur : ${data.age}\nHobi : ${data.hobby}\nTerdaftar pada : ${metaData.registeredOn}`)
//       }
//     });
// }, 10000)