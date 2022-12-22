/**
 * @param {*} StoreObject a value extend Promises from cloud store
 * @returns {*} `Object`
 */
const StoreMapper = (StoreObject) => {
  const Data = StoreObject
  const Collections = Data.Store
  const CollectionsMapper = (Array) => {
    const Arrays = Array.map((value) => (
      {
        title: value.Key,
        rowdId: 'getstore ' + value.Key,
        description: 'Dibuat pada: ' + value.Created
      }
    ), {});
    return Arrays
  };

  let text = `
Cloud Storage
Database Kamu dibuat pada:
${Data.StoreCreatedOn}

Silahkan pilh Data yang akan diambil
Note: perintah tidak akan tereksekusi jika yang mengakses bukan pemilik Database!
`

  return {
    text: text,
    footer: "@AzusaBot",
    title: `*${Data.userName}'s Store*\nId Kamu: ${Data.userID}`,
    buttonText: "Buka Data Saya",
    sections: [
      {
        title: `${Data.userName} Collections`,
        rows: CollectionsMapper(Collections)
      },
      {
        title: 'Perlu Bantuan?',
        rows: [
          {
            title: 'Cara Pakai Store Cloud Azusa Bot',
            rowdId: 'storehelp',
            description: 'Tutorial cara menambahkan data ke cloud'
          }
        ]
      }
    ]
  };
};
/**
 * 
 * @param {*} data Represent Promise Result of Users Databases
 * @returns `Object`
 */
const StoreConstructor = (data) => {
  let Data = data
  let Arrays = data.Collection
  let text = `
Cloud Storage
Database Kamu dibuat pada:
${Data.CreatedOn}

Silahkan pilh Data yang akan diambil
Note:
_*perintah tidak akan tereksekusi jika yang mengakses bukan pemilik Database!_
_*jika tidak bisa mengakses data, ambil data manual dgn cara !getstore [nama key]_
`
  /**
   * @param {*} arr type of `Inserted Array`
   * @returns `Array` of Object Results
   */
  const CollectionMapper = (arr) => {
    let Mapped = arr.map((val) => (
      {
        title: val.Key,
        rowdId: 'getstore ' + val.Key,
        description: 'Dibuat pada: ' + val.Created
      }
    ), {});
    return Mapped
  };

  return {
    text: text,
    footer: '@AzusaBot',
    title: `${Data.userName}'s Cloud Store\nid kamu: ${Data.userID}`,
    buttonText: 'Buka Data Saya',
    sections: [
      {
        title: 'List Data Key',
        rows: CollectionMapper(Arrays)
      },
      {
        title: 'Help / Bantuan',
        rows: [
          {
            title: 'Bantuan cara pakai Cloud Store',
            rowdId: 'storehelp',
            description: 'Baca tutorial penggunaan.'
          }
        ]
      }
    ]
  }
};
/**
 * @param {*} dataObj Represents `Object` results from [StoreConstructor](./functions/store.controller.js)
 * @returns `Change State` in file [StoreState.json](./json/StoreState.json)
 */
const StoreSetState = (dataObj) => {
  let writeFile = JSON.stringify(dataObj, null, 2);
  fs.writeFileSync('../json/StoreState.json', writeFile, 'utf-8');
  console.log('Data has been saved!:\n', writeFile);
};
/**
 * @returns `Object` that has been converted from `String`
 */
const StoreGetState = () => {
  let dataString = fs.readFileSync('../json/StoreState.json', 'utf8');
  let dataObject = JSON.parse(dataString);
  console.log('Sucess converted into object:\n', dataObject);
  return dataObject;
};

module.exports = {
  StoreMapper,
  StoreConstructor,
  StoreSetState,
  StoreGetState
}
