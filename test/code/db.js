const serveAtlas = require('../../atlas');
const { ATLAS_DB, ATLAS_COLLECTION } = require('../../provider/atlas.config');
const cryptoRandomString = require('crypto-random-string');

// serveAtlas.connect((error) => {
//   if (error) {
//     console.log(error);
//   }
//   console.log("Database connected");
// });

const Database = ATLAS_DB.azusaDatabase // switch database here
const UsersCollection = ATLAS_COLLECTION.azusaUsers // switch collection here

const MainDatabase = serveAtlas.db(Database)
const MainCollection = MainDatabase.collection(UsersCollection)

// ini dummy bro
let name = 'Wumbo'
let genders = 'cowo'
let ages = '20'
let hobbys = 'Nonton Nekopoi'
let phoneNumber = '62813395838229'
let linkPhoneNumber = 'wa.me/' + phoneNumber
let premium = false
let limitAwal = 50
let nowDate = new Date
let registerDate = nowDate.toString()
let serialNumber = cryptoRandomString(10)

let appendUsers = {
  userName: name,
  gender: genders,
  age: parseInt(ages),
  hobby: hobbys,
  userID: parseInt(phoneNumber),
  linkID: linkPhoneNumber,
  isPremium: premium,
  limit: limitAwal,
  registeredOn: registerDate,
  userSerial: serialNumber
}

// AzusaData.collection(UsersCollection)
//   .insertOne(appendUsers, async (error, result) => {
//     if (error) {
//       return console.log("error adding the data") && console.log(error);
//     }
//     let txt = `*Register Berhasil!*\n\n`
//     txt += `Nama : ${name}\n`
//     txt += `Gender : ${genders}\n`
//     txt += `Umur : ${ages}\n`
//     txt += `Hobi : ${hobbys}\n\n`
//     txt += `ID kamu\n`
//     txt += `Nomor : wa.me/${phoneNumber}\n`
//     txt += `Serials : ${serialNumber}\n\n`
//     txt += `Terdaftar Pada :\n`
//     txt += `${registerDate}\n\n`
//     txt += `_Thankyou for Registering!_`
//     console.log(txt);
//     console.log(result);
//   })

// function userValidator(id) {
//   let results;
//   let query = { userID: id }
//   MainCollection.findOne(query).then(
//     res => 
//   ).catch((error) => { return error });
// }
let num = parseInt(phoneNumber)


// let userValidator = function (id) {
//   let query = {
//     userID: id
//   }

//   return MainCollection
//     .findOne(query).then(result => {
//       console.log("via console: ", result)
//       return result
//     })
//   // .then(data => { return data })
// }


// let userData = userValidator(num)

// userData.then(function (result) {
//   console.log("another console:", result)
//   return result
// })


let testing = makePromise
console.log(testing)



