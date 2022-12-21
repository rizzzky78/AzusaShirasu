//
const { ATLAS_DB, ATLAS_COLLECTION } = require('../config/global.config');
const serveAtlas = require('../config/mongodbAtlas')
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


/* = = = = = = = New Date Constructor = = = = = = = */
/* =============================================== */
const newDate = () => {
  let makeDate = new Date(new Date + 3600000)
  let date = makeDate.toLocaleDateString('id', { day: 'numeric', month: 'long', year: 'numeric' })
  let day = makeDate.toLocaleDateString('id', { weekday: 'long' })
  return day + " " + date
};
/* =============================================== */

/* = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = */
/** @DatabaseGetter */
const getAtlasTotal = async () => {
  return MainCollection.find().toArray()
};
const totalData = async () => {
  return (await getAtlasTotal()).length
};
/* = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = */

/* = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = */
/** @DatabaseGetter */
const getAtlastData = async (id) => {
  return MainCollection.findOne({ userID: id })
};
/**
 * @database mongodb atlas
 * @object type of Object
 * 
 * Method : GET by Query
 * @params `id` as userID [input query]
 * And Will Return:
 * @userName String
 * @gender String
 * @age Number
 * @hobby String
 * @userID Number
 * @linkID String
 * @isPremium Boolean
 * @limit Number
 * @registeredOn Date
 * @userSerial String
 */
const atlasData = async (id) => {
  return await getAtlastData(id)
};
/* = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = */

/* = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = */
/** @DatabaseManipulator */
const getAtlasUpdate = async (userId, setUserLimit) => {
  let filter = { userID: userId }; let update = { $set: { limit: setUserLimit } }
  return MainCollection.findOneAndUpdate(filter, update);
};
const atlasUpdate = async (user, changeLimit) => {
  return await getAtlasUpdate(user, changeLimit);
};
/* = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = */

// get users data & update daya by@id (users premium)
const getAtlasPrem = async (user, setPrem) => {
  let filter = { userID: user }; let update = { $set: { isPremium: setPrem } }
  return MainCollection.findOneAndUpdate(filter, update);
};
const atlasUpdatePrem = async (user, setPrem) => {
  return await getAtlasPrem(user, setPrem);
};

// total command --getter constructor
const atlasTotalCommand = async (typeCmd) => {
  return AtlasTotalCmd.findOne({ type_cmd: typeCmd });
};
const atlasGetTotalCmd = async (typeCmd) => {
  return await atlasTotalCommand(typeCmd);
};

(async () => {
  console.log(await atlasGetTotalCmd('sticker'))
})();

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

/**
 * Cloud Store Registrations Handler
 * @user as `id` per Users, must be unique [number]
 * @username as `Username` type [string]
 * 
 * Return : Crate new databases in Cloud Store DB
 * By:
 * @params
 * [userID], [userName], [Store: Array], [Date]
 */
const atlasMakeStore = async (id, username) => {
  let insert = {
    userID: id,
    userName: username,
    Collection: [],
    CreatedOn: newDate()
  };
  return StoreDocuments.insertOne(insert);
};
/* = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = */

/* = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = */
const atlasMakeDocs = async (id, Key, documents) => {
  let findId = { userID: id }; let option = { upsert: true };
  let Docs = {
    $push: {
      Collection: {
        Key,
        Document: documents,
        Created: newDate()
      }
    }
  };
  return StoreDocuments.findOneAndUpdate(findId, Docs, option);
};
/**
 * @param {*} id as ID of Users
 * @param {*} Key as Keypair of each Documents created
 * @param {*} documents as inserted Documents to database [Array]
 * @returns `to Save the Documents`
 */
const atlasUseStore = async (id, key, documents) => {
  return await atlasMakeDocs(id, key, documents);
};
/* = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = */

/* = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = */
const atlasSetStore = async (id) => {
  return StoreDocuments.findOne({ userID: id });
};
/**
 * @param {*} id 
 * @param {*} documentKey 
 * @returns `Get and Filter the Documents`
 */
const atlasGetStore = async (id, documentKey) => {
  let GetsDocument = await atlasSetStore(id);
  let ArrayDocs = GetsDocument.Collection;
  let FilteredDocs = ArrayDocs.filter(
    function (selectKey) {
      return selectKey.Key == documentKey;
    });
  return FilteredDocs[0].Document;
};
/* = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = */

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