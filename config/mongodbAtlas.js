const { MongoClient, ServerApiVersion } = require("mongodb");
const { ATLAS } = require('./global.config');

/** @version @4.1 */
const uri = `mongodb+srv://${ATLAS.user}:${ATLAS.key}@bot-database.w7oyxwa.mongodb.net/?retryWrites=true&w=majority`;
/** @version @2.2.12 */
const uris = `mongodb://rizzzky:${ATLAS.key}@ac-xtaqo4g-shard-00-00.w7oyxwa.mongodb.net:27017,ac-xtaqo4g-shard-00-01.w7oyxwa.mongodb.net:27017,ac-xtaqo4g-shard-00-02.w7oyxwa.mongodb.net:27017/?ssl=true&replicaSet=atlas-yds57g-shard-0&authSource=admin&retryWrites=true&w=majority`

const serveAtlas = new MongoClient(uris, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
});

module.exports = serveAtlas
