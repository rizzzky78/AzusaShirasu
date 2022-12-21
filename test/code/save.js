const  serveAtlas  = require('../../atlas')

const { ATLAS_DB, ATLAS_COLLECTION } = require('../../provider/atlas.config');

const Database = ATLAS_DB.azusaDatabase // Cluster Mongodb Atlas: Database
const UsersCollection = ATLAS_COLLECTION.azusaUsers // Cluster Mongodb Atlas Collection

const MainDatabase = serveAtlas.db(Database);
const MainCollection = MainDatabase.collection(UsersCollection);
