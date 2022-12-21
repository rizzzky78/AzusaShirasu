const { ATLAS_DB, ATLAS_COLLECTION } = require('../../provider/atlas.config');
const serveAtlas = require('../../atlas')

const MainDatabase = ATLAS_DB.azusaDatabase // switch database here
const UsersCollection = ATLAS_COLLECTION.azusaCloudUserStorage // switch collection here

// setup main Database + collection
const AzusaData = serveAtlas.db(MainDatabase);
const MainCollection = AzusaData.collection(UsersCollection);

async function atlasMakeStore(user) {
  let query = {
    userID: user,
    Store: [],
    CreatedOn: new Date
  }
  const MakeStore = MainCollection.insertOne(query);
  return MakeStore;
}

async function atlasMakeDocs(user, Key, documents) {
  let findId = { userID: user };
  let option = { upsert: true }
  let Docs = {
    $push: {
      Store: {
        Key,
        Document: documents,
        Created: new Date
      }
    }
  };
  const NewDocs = MainCollection.findOneAndUpdate(findId, Docs, option);
  return NewDocs;
};
async function useStore(user, key, documents) {
  let DocsCreated = await atlasMakeDocs(user, key, documents);
  return DocsCreated;
};


async function atlasGetStore(user) {
  let findDocs = {
    userID: user,
  };
  const GetDocs = MainCollection.findOne(findDocs);
  return GetDocs;
};
async function getStore(user, documentKey) {
  let GetsDocument = await atlasGetStore(user);
  let getArr = GetsDocument.Store;
  let FilteredDocs = getArr.filter(function (selectKey) {
    return selectKey.Key == documentKey;
  });
  let HasDocs = FilteredDocs[0].Document;
  return HasDocs;
};

(async () => {

  let id = 12345678
  let makeKey = "linkanu"
  let makeDocs = "http//www.anu.com/hshdkjahfihsdifhs/ahsidhiagfdui"

  // let coba = await getStore(id, makeKey)
  // console.log(coba)
  await atlasGetStore(id).then(async data => {
    let array = data.Store
    let txt = `Data array\n`
    for (let arr of array) {
      txt += `- Key ${arr.Key}\n`
      txt += `- Doc ${arr.Document}\n\n`
    }
    console.log(txt)
  })
  // let test = await atlasMakeDocs(id, makeKey, makeDocs)
  // console.log(test)

})();