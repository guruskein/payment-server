// const decodeImage = require('./../utils/util');
const userService = require('./../models/user.model.js');
// const commonRes = require("./../utils/response");
// const commonErr = require("./../utils/errorFn");
// const id = decodeImage.id;
const fs = require("fs");
const userfeatureItem = "User"




/**To add the roles */
function createroles(req, res) {


    userService.addroles(req.body, function (err, data) {
        // console.log("data ...",data[0].phone_num,"--->",data[0].emailID);

        if (err) {
            console.log("Error: **Advertisement details updated**", err)
            res.send({ "status_code": "400", "messages": "roles details  not updated" })
        }

        else {
            console.log("exists--->");
            res.send({ "status_code": "200", data })
        }
    });
}

function createusers(req, res) {

    userService.addusers(req.body, function (err, data) {
        // console.log("data ...",data[0].phone_num,"--->",data[0].emailID);

        if (err) {
            console.log("Error: **Advertisement details updated**", err)
            res.send({ "status_code": "400", "Messages": "user details details  not updated" })
        }

        else {
            console.log("exists--->");
            res.send({ "status_code": "200", data })
        }
    });
}



function checklogin(req, res) {
    console.log("** login exists input data ** ");
    // var userdata = { "id": req.query.id };
    userService.getlogin(req.body, function (err, data) {
        console.log("Response -->", data);
        if (err) {
            console.log("Error: **login exists details update**", err)
        } else {
            // if(inputreq.phone_num == data[0].phone_num || inputreq.user_emailID == data[0].user_emailID){
            if (data.length == 1) {
                console.log("empty----->");
                res.send({ "status_code": "200", "data": "login succes", data });
            }

            else {
                console.log("exists--->");
                res.send({ "status_code": "400", "data": "login Failed" })
            }

        }
    });
}


function viewalluserdetails(req, res) {
    console.log("** login exists input data ** ");
    // var userdata = { "id": req.query.id };
    userService.getuser(function (err, data) {
        console.log("Response -->", data);
        if (err) {
            console.log("Error: **login exists details update**", err)
            res.send({ "status_code": "400", "status": "user data not found " })
        } else {
            // if(inputreq.phone_num == data[0].phone_num || inputreq.user_emailID == data[0].user_emailID){

            console.log("empty----->");
            res.send({ "status_code": "200", data });

        }
    });
}



function viewuserroles(req, res) {
    console.log("** login exists input data ** ");
    // var userdata = { "id": req.query.id };
    userService.getusereoles(function (err, data) {
        console.log("Response -->", data);
        if (err) {
            console.log("Error: **login exists details update**", err)
            res.send({ "status_code": "400", "status": "user data not found " })
        } else {
            // if(inputreq.phone_num == data[0].phone_num || inputreq.user_emailID == data[0].user_emailID){

            console.log("empty----->");
            res.send({ "status_code": "200", data });

        }
    });
}

function updateUserDetails(req, res) {
    userService.updateUser(req.body, function (err, result) {
        if (err) {
            res.send({ "status_code": "400", "status": "user data not found " })
        } else {
            res.send({ "status_code": "200", result });
        }
    })
}

function updateUserPassword(req, res) {
    userService.updatePassword(req.body, function (err, result) {
        if (err) {
            res.send({ "status_code": "400", "status": "user data not found " })
        } else {
            res.send({ "status_code": "200", result });
        }
    })
}

module.exports = { createroles, createusers, checklogin, viewalluserdetails, viewuserroles, updateUserDetails, updateUserPassword };
