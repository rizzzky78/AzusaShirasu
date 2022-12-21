//
const { ATLAS_DB, ATLAS_COLLECTION } = require('../provider/atlas.config');
const serveAtlas = require('../atlas')

const MainDatabase = ATLAS_DB.azusaDatabase // switch database here
const UsersCollection = ATLAS_COLLECTION.azusaUsers // switch collection here
const totalCMD = ATLAS_COLLECTION.azusaTotalcmd
const UsersDocuments = ATLAS_COLLECTION.azusaCloudUserStorage

// setup main Database + user collection
const AzusaData = serveAtlas.db(MainDatabase);
const MainCollection = AzusaData.collection(UsersCollection);

// setup total command used
const AtlasTotalCmd = AzusaData.collection(totalCMD);
// setup store msg
const StoreDocuments = AzusaData.collection(UsersDocuments);


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/* Databse -- users total */
async function getAtlasTotal() {
  const atlasUser = MainCollection.find().toArray();
  return atlasUser;
}
async function totalData() {
  let Result = await getAtlasTotal();
  return Result;
}

// get users data by @id (users)
async function geAtlastData(id) {
  let query = { userID: id }
  try {
    const Resolve = MainCollection.findOne(query);
    return Resolve
  } catch {
    return console.log("an error occured")
  }
};
async function atlasData(id) {
  try {
    let Result = await geAtlastData(id);
    return Result;
  } catch { return console.log("Error!") }
};

// get users data & update data by @id (users limit)
async function getAtlasUpdate(userId, setUserLimit) {
  let findId = { userID: userId }
  let setLimit = { $set: { limit: setUserLimit } }
  const makeChangeLimit = MainCollection.findOneAndUpdate(findId, setLimit);
  return makeChangeLimit;
};
async function atlasUpdate(user, changeLimit) {
  let Changes = await getAtlasUpdate(user, changeLimit);
  return Changes;
};

// get users data & update daya by@id (users premium)
async function getAtlasPrem(user, setPrem) {
  let findUser = { userID: user };
  let setPremium = { $set: { isPremium: setPrem } };
  const makeChangePrem = MainCollection.findOneAndUpdate(findUser, setPremium);
  return makeChangePrem;
};
async function atlasUpdatePrem(setUser, setPrem) {
  let PremiumChanges = await getAtlasPrem(setUser, setPrem);
  return PremiumChanges;
};
// total command --getter constructor
async function atlasTotalCommand(typeCmd) {
  let queryCmd = { type_cmd: typeCmd }
  const getTotalCmd = AtlasTotalCmd.findOne(queryCmd);
  return getTotalCmd;
};
async function atlasGetTotalCmd(typeCmd) {
  let DataCmd = await atlasTotalCommand(typeCmd);
  return DataCmd;
}
// total command --setter constructor
async function getAtlasCommand(typeCmd, valueChanges) {
  let types = { type_cmd: typeCmd };
  let mutate = { $set: { value: valueChanges } };
  const ValueChanges = AtlasTotalCmd.findOneAndUpdate(types, mutate);
  return ValueChanges;
};
async function atlasUpdateTotalCmd(typeCmd, valueToChange) {
  let HasChanges = await getAtlasCommand(typeCmd, valueToChange);
  return HasChanges;
};

// store contructor -- make new store
async function atlasMakeStore(user, username) {
  let query = {
    userID: user,
    userName: username,
    Store: [],
    CreatedOn: new Date
  }
  const MakeStore = StoreDocuments.insertOne(query);
  return MakeStore;
}

// store constructor -- save docs
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
  const NewDocs = StoreDocuments.findOneAndUpdate(findId, Docs, option);
  return NewDocs;
};
async function atlasUseStore(user, key, documents) {
  let DocsCreated = await atlasMakeDocs(user, key, documents);
  return DocsCreated;
};

// store constructor -- get docs
async function atlasSetStore(user) {
  let findDocs = {
    userID: user,
  };
  const GetDocs = StoreDocuments.findOne(findDocs);
  return GetDocs;
};
async function atlasGetStore(user, documentKey) {
  let GetsDocument = await atlasSetStore(user);
  let getArr = GetsDocument.Store;
  let FilteredDocs = getArr.filter(function (selectKey) {
    return selectKey.Key == documentKey;
  });
  let HasDocs = FilteredDocs[0].Document;
  return HasDocs;
};

module.exports = {
  totalData,
  atlasData,
  atlasUpdate,
  atlasUpdatePrem,
  atlasGetTotalCmd,
  atlasUpdateTotalCmd,
  atlasMakeStore,
  atlasUseStore,
  atlasSetStore,
  atlasGetStore
}