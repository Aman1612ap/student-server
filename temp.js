


/* import all required modules*/

var express=require('express');
var cors=require('cors');
var app=express();
app.use(cors());
var bodyParser=require('body-parser');
app.use(bodyParser.json());
global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;
const  MongoClient  = require("mongodb").MongoClient;


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
const client = new MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });


async function dbCon() {
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        const data = await  listDatabases(client)
        console.log(data);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

dbCon().then(data=> console.log(data)).catch(console.error);


async function listDatabases(client){
    console.log(client);
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

listDatabases();



// console.log(dbo);

// var mongojs=require('mongojs');
// var db=mongojs('pro',['rest','user']);
app.use(express.static(__dirname));
// var events=require('events');
// var em=new events.EventEmitter();
// var fs = require('fs');

// var multer = require('multer');

// //define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo
// var upload = multer({dest: './uploads'}).single('userFile');

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });


// dbo.connectToServer(function (err) {
//     if (err) {
//         console.log('this.is err');
//       console.error(err);
//       process.exit();
//     } else {
//         console.log('this is success');
//     }
// });

app.get('/newAPi',function(req,res){
    const dbConnect = dbo.getDb();

  dbConnect
    .collection("UserDetails")
    .find({}).limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
     } else {
        res.json(result);
      }
    });
  // logger();
});
// //variable to store data of logger

// var msg="Directory Name: "+ __dirname + "\n" +
//          "StartTimeStamp: "+(new Date(Date.now()+"\n"))+
//          "File Name: "+__filename+"\n"+
//          "Process Version: "+process.version+"\n"+
//          "Process Time: "+process.uptime()+"\n"+
//          "Memory Use: "+JSON.stringify(process.memoryUsage())+"\n";


//finction for append log data in file

       /*   var write=function()
         {
           try{
           fs.appendFile("D:\\logFile.txt", msg+"*************************************************************"+"\n"+"\n" , function(err)
           {

           });
         }
         catch(err)
         {

         }
         };
 */


//function to call write function

         /* var logger=function()
         {
           em.on('error',function(err){

            });
            em.on('event1',write);
            em.emit ('event1');
         }; */


//data for home page

//        app.get('/home',function(req,res){
//       		                    db.rest.aggregate([{$skip:101},{$limit:6}],function(err,docs){
//                                           res.json(docs);
//                                                        }
//                                 );
//                                 // logger();
//                                            }
//                );


// //data for landing page of search

//                      app.get('/ddfdf',function(req,res){
//       		                    db.rest.aggregate([{$limit:100}],function(err,docs){
//                                           res.json(docs);
//                                                        }
//                                 );
//                                 // logger();
//                                            }
//                );


// //data for discription(detail) page

//               app.get('/:id',function(req,res){
//       		          db.rest.aggregate([{$match:{"uniqueId": parseInt(req.params.id)}}],function(err,docs){
//                                                  res.send(docs);
//                                                        }
//                                 );
//                                 // logger();
//                                            }
//                );


// //data to be store for contact page

//              app.get('/SaveUser/:name/:subject/:email/:message',function(req,res){
//       		       db.user.insert({name:req.params.name,subject:req.params.subject,email:req.params.email,msg:req.params.message},function(err,docs){
//                                               res.send(docs);
//                                                        }
//                                 );
//                                 // logger();
//                                            }
//                );


// //list of all cities for particular country

//              app.get('/getcity/:country',function(req,res){
//       		       db.rest.find({country:req.params.country},{_id:0,city:1},function(err,docs){
//                                                  res.send(docs);
//                                                        }
//                                 );
//                                 // logger();
//                                            }
//                );



// //get restaurant name  for particular country and city

// 		app.get('/getRest/:country/:city',function(req,res){
//       		                          db.rest.find({country:req.params.country,city:req.params.city},{_id:0,name:1},function(err,docs){
//                                                           res.send(docs);
//                                                        }
//                                 );
//                                 // logger();
//                                            }
//                );


// //****to get Data as according to user input

// //get all data for particular country

// 		app.get('/getCountryData/:country',function(req,res){
//       		                    db.rest.find({country:req.params.country},function(err,docs){
//                                                             res.send(docs);
//                                                        }
//                                 );
//                                 // logger();
//                                            }
//                );


// //get all data for particular country and city

//               app.get('/getCountryCityData/:country/:city',function(req,res){
//       		                  db.rest.find({country:req.params.country,city:req.params.city},function(err,docs){
//                                               res.send(docs);
//                                                        }
//                                 );
//                                 // logger();
//                                            }
//                );



// //get all data for particular country,city and restaurant


// 		app.get('/getCountryCityRestData/:country/:city/:rest',function(req,res){
//       		 			db.rest.find({country:req.params.country,city:req.params.city,name:req.params.rest},function(err,docs){
//                                             res.send(docs);
//                                                        }
//                                 );
//                                 // logger();
//                                            }
//                );






// 		app.post("/login",(rfunctioneq,res){
// 			res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// 			// console.log(req.body.passWord)
//    //           console.log(req.body.userName);


// 			//console.log(req.headers)
// 			if(req.body.passWord===req.body.userName)
//                res.json({"msg":"success"})	
               		
// 		else{
// 			res.json({"msg":"failed"})	
// 		}
// 	}
	
	
// 	)
// 			app.post("/file",function(req,res){
			
// 			//console.log(req.body)
// 			//console.log("++++++++++++++++++++++++++++++++++++++++++++++++++")
// 			//console.log(req.file)
			

// 			//console.log("++++++++++++++++++++++++++++++++++++++++++++++++++")
// 			//console.log(req)
//    //           console.log(req.body.userName);


// 			//console.log(req.headers)
// 			//if(req.body.passWord===req.body.userName)
//               // res.json({"msg":"success"})
//     var path = '';
//      upload(req, res, function (err) {
//         if (err) {
//           // An error occurred when uploading
//           console.log(err);
//           return res.status(422).send("an Error occured")
//         }  
//        // No error occured.
//         path = req.file.path;
//         return res.send("Upload Completed for "+path); 
//   }); 		  
               		
		
// 	}
	
// )


app.listen(3010,function(){
  // logger();
  console.log("connected to server")
});

