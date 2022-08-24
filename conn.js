const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://amanpatel:r9jPfmKST75qHjGT@cluster0.ov2vga9.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1, connectTimeoutMS: 30000, keepAlive: true});

let dbConnection;

module.exports = {
  connectToServer:  function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }
      console.log("Successfully connected to MongoDB.");
      return callback();
    });
  },

  getDb: function () {
    return client;
  },
};