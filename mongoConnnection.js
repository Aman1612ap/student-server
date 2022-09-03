


/* import all required modules*/

// var express=require('express');
// var cors=require('cors');
// var app=express();
// app.use(cors());
// var bodyParser=require('body-parser');
// app.use(bodyParser.json());
// global.TextEncoder = require("util").TextEncoder;
// global.TextDecoder = require("util").TextDecoder;
// const  MongoClient  = require("mongodb").MongoClient;


// var dbo = import('./conn');

const connectionString = "mongodb+srv://amanpatel:patel16121998@cluster0.nctxk3l.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(connectionString, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });


// client.connect(function (err, db) {
//     if (err || !db) {
//      console.log('error');
//     }
//     console.log(db);
//     dbConnection = db.db("user");
//     console.log("Successfully connected to MongoDB.");
// });



global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://amanpatel:r9jPfmKST75qHjGT@cluster0.ov2vga9.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1, connectTimeoutMS: 30000, keepAlive: true});

client.connect(async err => {
  const collection = client.db("User").collection("userCred");
  // perform actions on the collection object
//   collection.insertOne({aadhar: 'ssssdsd', email:'sdssdsds@sdsd.sdsd'},function(err,docs){
//     console.log('err', err)
//     console.log(docs);
//   });

collection.findOne({},{_id:0},function(err,docs){
        console.log('err', err)
        console.log(docs);
      });


     const allData  = await client.db("student").collection("studentDetails").find({}, {_id:0});
      console.log(allData);
      for await (const doc of allData) {
  console.log(doc);
}
//  const data = await collection.find({aadhar: 'ssssdsd'});
//   console.log(data);
//   client.close();

// databasesList = await client.db().admin().listDatabases();
      
//     console.log("Databases:");
//     console.log(databasesList);
// });

// const data  = await collection.aggregate([
// {$match: {'aadhar':'825155221935'}},
// {$lookup: {
//   from: "userRole",
//   localField: "aadhar",
//   foreignField: "aadhar",
//   as: "userRole"
//   }
// }, {$unwind: { path: "$userRole", preserveNullAndEmptyArrays: true }},
// ]);

// {$match: {userRole: {}}}
// console.log('adaada',);

// for await (const doc of data) {
//   console.log(doc);
// }

});



// r9jPfmKST75qHjGT


// const client = new MongoClient(connectionString, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });


// async function dbCon() {
 
//     try {
//         // Connect to the MongoDB cluster
//         await client.connect();
 
//         // Make the appropriate DB calls
//         const data = await  listDatabases(client)
//         console.log(data);
 
//     } catch (e) {
//         console.error(e);
//     } finally {
//         await client.close();
//     }
// }

// dbCon().then(data=> console.log(data)).catch(console.error);


// async function listDatabases(client){
//     console.log(client);
//     databasesList = await client.db().admin().listDatabases();
 
//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };

// listDatabases();
// let dbConnection;
// var dbo = {
//   connectToServer: function (callback) {
//     client.connect(function (err, db) {
//       if (err || !db) {
//         return callback(err);
//       }

//       dbConnection = db.db("user");
//       console.log("Successfully connected to MongoDB.");

//       return callback();
//     });
//   },

//   getDb: function () {
//     return dbConnection;
//   },
// };




// dbo.connectToServer(function (err) {
//     if (err) {
//         console.log('this.is err');
//       console.error(err);
//       process.exit();
//     } else {
//         console.log('this is success');
//     }
// });


// app.listen(3010,function(){
//   // logger();
//   console.log("connected to server")
// });

