/* import all required modules*/

var express=require('express');
var cors=require('cors');
var app=express();
app.use(cors());
var bodyParser=require('body-parser');
const { response } = require('express');
app.use(bodyParser.json());
// app.use(express.json()) 
global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;
const  MongoClient  = require("mongodb").MongoClient;


var userCred =[];
var userDetails = [];



async function listDatabases(client){
    console.log(client);
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};


app.use(express.static(__dirname));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



app.post('/signUp', function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    const result = validateAndAddCred(req.body);

    const response = {data: ''};
    if(result.alreadyExist) {
        response.error = "Already registered",
        response.data = 'fail';
        response.reseon= 'alreadyRegistred';
    } else if(!result.success) {
        response.error = "",
        response.data = 'fail';
        response.reseon= result.reseon? result.reseon: '';
    } else {
        response.data = 'success';
    }
    res.json(response);
});


app.post('/login', function(req,res){
      const result = varifyUser(req.body);

    const response = {};
    if(result.success) {
        response.data = 'success';;
    } else  {
        response.data = 'fail';
    }
    res.json(response);
});


app.post('/verify', function(req,res){
    const result = varifyUser(req.body);

    const response = {};
    if(result.success) {
        response.status = 'success';
        response.data = result.data[0].email;
    } else  {
        response.status = 'fail';
    }
    res.json(response);
});


app.post('/saveUserData', function(req,res){
    /* 
    body:{ 
            aadhar,
            firstName, lastName, fatherName, motherName, 
            dob, currentQualification, higherQualification, currentCourseName, mobileNumber,
            homeAddress;
        }
    */
    const result = saveData(req.body);
    const response = {};
    if(result.status) {
        response.status = 'success';
    } else  {
        response.status = 'fail';
        response.reseon= result.reseon? result.reseon: '';
    }
    res.json(response);
});

app.get('/getUserData', function(req,res) {
    // console.log(req.query);
    const result = getUserData(req.query);

    const response = {};
    if(result.data) {
        response.status = 'success';
        response.data = result.data;
    } else  {
        response.status = 'fail';
    }
    res.json(response);
});


app.put('/updateUserData/:aadhar', function(req,res){
    /* 
    body:{ 
            aadhar,
            firstName, lastName, fatherName, motherName, 
            dob, currentQualification, higherQualification, currentCourseName, mobileNumber,
            homeAddress;
        }
    */
    const result = updateData(req.params.aadhar,req.body);
    const response = {};
    if(result.status) {
        response.status = 'success';
    } else  {
        response.status = 'fail';
        response.reseon= result.reseon? result.reseon: '';
    }
    res.json(response);
});

app.listen(3010,function(){
  // logger();
  console.log("connected to server")
});



function validateAndAddCred(cred) {
    if(!cred.aadhar || !cred.email) {
        return {alreadyExist: false, success: false, reseon:'insufficientData'}
    }
    const data = userCred.filter(data=> data.aadhar == cred.aadhar);
    if(data.length) {
        return {alreadyExist: true, success: false};
    }
    else {
        userCred.push(cred)
        return {alreadyExist: false, success: true};
    }
    return {alreadyExist: false, success: false};
}


function varifyUser(cred) {
    const data = userCred.filter(data=> data.aadhar == cred.aadhar);
    if(data.length) {
        return {success: true, data: data}
    }
    else {
        return {success: false};
    }
}


function saveData(userData) {
    const response = {};
    if(!userData.aadhar) {
        response.status = false;
        response.reseon = 'insufficientdata';
        return response;
    } else {
        userDetails.push(userData);
        response.status = true;
        return response;
    }
}


function getUserData(data) {
    const aadhar =data.aadhar;

    const result = {data:null}
    const userData = userDetails.filter(data=> data.aadhar == aadhar);
    if(userData.length) {
        result.data = userData[0]
    }

    return result;
}



function updateData(aadhar, userData) {
    const result = {};
    const data = userDetails.map(data=> {
        if(data.aadhar == aadhar) {
            data = userData;
        }
        return data;
    })

    userDetails = [];
    userDetails = data;
    result['status'] = true;
    return  result;
}

