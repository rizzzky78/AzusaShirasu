const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://rizzzky:DEV@bot-database.w7oyxwa.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((error, client) => {
  if (Error) {
    console.log(error);
  }
  console.log("Database connected");
});
setTimeout(() => {
  client.close();
}, 10000);

const dbName = "db_user_wabot";
const collectionName = "users_wabot";
const db = client.db(dbName);

db.collection(collectionName).insertOne(
  {
    userName: "Saya Manusia",
    phoneNumber: 98372984,
    limit: 12,
    isPremium: true,
    items: {
      dog: 12,
      cat: 5,
    },
  },
  async (error, result) => {
    if (error) {
      return console.log("error adding the data", err);
    }
    console.log("Yeayy database berhasil ditambahkan! ", result);
  }
);

// display all data in collection, converted into array
db.collection(collectionName)
  .find()
  .toArray((error, result) => {
    if (error) {
      return console.log(error);
    }
    console.log(result);
  });

// change or update data
const updateUser = db.collection(collectionName).updateOne(
  {
    userName: "Manusia",
  }, // before
  {
    $set: {
      userName: "Manusia after change",
    },
  } // after
);

updateUser
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

// delete one data
db.collection(collectionName)
  .deleteOne({
    _id: ObjectID("typeString"),
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

// delete all data based oon parameter
db.collection(collectionName)
  .deleteMany({
    userName: "Manusia", // paran  that to be used
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
