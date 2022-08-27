/* import all required modules*/

var express=require('express');
var cors=require('cors');
var app=express();
app.use(cors());
var bodyParser=require('body-parser');
app.use(bodyParser.json());
global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;
var dbo = require('./conn');


dbo.connectToServer(function (err) {
    if (err) {
        console.error(err);
        process.exit();
    } else {
        console.log('DB connnection successfully stablished.');
    }
});


app.use(express.static(__dirname));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



app.post('/signUp', async function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    const result = await validateAndAddCred(req.body);
    const response = {data: ''};
    if(result.alreadyExist) {
        response.error = "Already registered",
        response.status = 'fail';
        response.reseon= 'alreadyRegistred';
    } else if(!result.success) {
        response.error = "",
        response.status = 'fail';
        response.reseon= result.reseon? result.reseon: '';
    } else {
        response.status = 'success';
    }
    res.json(response);
});


app.post('/login', async function(req,res){
      const result = await varifyUser(req.body);

    const response = {};
    if(result.success) {
        response.status = 'success';;
    } else  {
        response.status = 'fail';
    }
    res.json(response);
});


app.post('/verify', async function(req,res){
    const result = await varifyUser(req.body);


    const response = {};
    if(result.success) {
        response.status = 'success';
        response.data = result.data.email;
    } else  {
        response.status = 'fail';
    }
    res.json(response);
});


app.post('/saveUserData',async function(req,res){
    /* 
    body:{ 
            aadhar,
            firstName, lastName, fatherName, motherName, 
            dob, currentQualification, higherQualification, currentCourseName, mobileNumber,
            homeAddress;
        }
    */
    const result = await saveData(req.body);
    const response = {};
    if(result.status) {
        response.status = 'success';
    } else  {
        response.status = 'fail';
        response.error = 'Data not saved.';
        response.reseon= result.reseon? result.reseon: '';
    }
    res.json(response);
});

app.get('/getUserData', async function(req,res) {
    const result = await getUserData(req.query);

    const response = {};
    if(result.data) {
        response.status = 'success';
        response.data = result.data;
    } else  {
        response.status = 'fail';
    }
    res.json(response);
});


app.put('/updateUserData/:aadhar',async function(req,res){
    /* 
    body:{ 
            aadhar,
            firstName, lastName, fatherName, motherName, 
            dob, currentQualification, higherQualification, currentCourseName, mobileNumber,
            homeAddress;
        }
    */
    const result = await updateData(req.params.aadhar,req.body);
    const response = {};
    if(result.status) {
        response.status = 'success';
    } else  {
        response.status = 'fail';
        response.error = 'Data update failed.';
        response.reseon= result.reseon? result.reseon: '';
    }
    res.json(response);
});

app.listen(process.env.PORT || 3011,function(){
  // logger();
  console.log("connected to server")
});



async function validateAndAddCred(cred) {
    if(!cred.aadhar || !cred.email) {
        return {alreadyExist: false, success: false, reseon:'insufficientData'}
    }

    const client = dbo.getDb();
    const studentCredColl = client.db("student").collection("studentCred");

    const user  = await studentCredColl.findOne({aadhar: cred.aadhar});
    if(user && user.aadhar) {
        return {alreadyExist: true, success: false};
    } else {
       const result = await studentCredColl.insertOne(cred);
       if(result && result.acknowledged) {
            return {alreadyExist: false, success: true};
       }
    }
    return {alreadyExist: false, success: false}
}


async function varifyUser(cred) {
    if(!cred.aadhar) {
        return {success: false};
    }
    
    const client = dbo.getDb();
    const studentCredColl = client.db("student").collection("studentCred");

    const user  = await studentCredColl.findOne({aadhar: cred.aadhar});
    if(user && user.aadhar) { 
        return {success: true, data: user}
    }
    else {
        return {success: false};
    }
}


async function saveData(userData) {
    const response = {};
    if(!userData.aadhar) {
        response.status = false;
        response.reseon = 'insufficientdata';
        return response;
    } else {
        const client = dbo.getDb();
        const studentCredColl = client.db("student").collection("studentDetails");
    
        const studentDetails  = await studentCredColl.insertOne(userData);
        if(studentDetails && studentDetails.acknowledged && studentDetails.insertedId ) {
            response.status = true;
        } else {
            response.status = false;
        }
        return response;
    }
}


async function getUserData(data) {
    const aadhar =data.aadhar;

    const result = {data:null}

    if(!aadhar) {
        return result;
    }

    const client = dbo.getDb();
    const studentDetails = client.db("student").collection("studentDetails");

    const user  = await studentDetails.findOne({aadhar: aadhar});
    if(user && user.aadhar) {
        result.data = user;
    }

    return result;
}



async function updateData(aadhar, userData) {
    const result = {};
    
    const client = dbo.getDb();
    const studentCredColl = client.db("student").collection("studentDetails");
    delete userData._id;
    const studentDetails  = await studentCredColl.updateOne({ "aadhar" :  aadhar},
    { $set: userData});
    console.log(studentDetails);
    if(studentDetails && studentDetails.acknowledged && studentDetails.matchedCount ) {
        result['status'] = true;
    } else {
        result['status'] = false;
    }
    return  result;
}

