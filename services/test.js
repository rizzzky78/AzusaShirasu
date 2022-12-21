const MyData = {
  userID: '6281329585825',
  userName: 'Rizu',
  Store: [
    {
      Key: 'Beruang',
      Document: 'Yang hidup di tanah dingin',
      Created: 'Rabu, 4 Jan 2022'
    },
    {
      Key: 'Kucing',
      Document: 'Suka meow meoww',
      Created: 'Jumat, 9 Des 2022'
    },
    {
      Key: 'Anjing',
      Document: 'yang suka menggong nggong',
      Created: 'Minggu, 25 Mar 2022'
    }
  ],
  StoreCreatedOn: 'Minggu, 10 Nov 2022'
};

const StoreMapper = (StoreObject) => {
  const Data = StoreObject
  const Collections = Data.Store
  const CollectionsMapper = (Array) => {
    let space = ' '
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
            rowdId: '_storehelp',
            description: 'Tutorial cara menambahkan data ke cloud'
          }
        ]
      }
    ]
  };
};

console.log(StoreMapper(MyData).sections[0].rows)