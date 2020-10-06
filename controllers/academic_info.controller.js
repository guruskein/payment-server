// const decodeImage = require('./../utils/util');
const userService = require('./../models/academic_info.model.js');

const fs = require("fs");
const userfeatureItem = "User"




/**To add the roles */
function createschool(req, res) {


    userService.addschool(req.body, function (err, data) {
        // console.log("data ...",data[0].phone_num,"--->",data[0].emailID);

        if (err) {
            console.log("Error: **Advertisement details updated**", err)
            res.send({ "status_code": "400", "data": "school details  not updated" })
        }

        else {
            console.log("exists--->");
            res.send({ "status_code": "200", data })
        }
    });
}

function createclasses(req, res) {

    userService.addclasses(req.body, function (err, data) {
        // console.log("data ...",data[0].phone_num,"--->",data[0].emailID);

        if (err) {
            console.log("Error: **Advertisement details updated**", err)
            res.send({ "status_code": "400", data: "class details  not updated" })
        }

        else {
            console.log("exists--->");
            res.send({ "status_code": "200", data })
        }
    });
}

function createstudent(req, res) {

    userService.addstudent(req.body, function (err, data) {
        // console.log("data ...",data[0].phone_num,"--->",data[0].emailID);

        if (err) {
            console.log("Error: **Advertisement details updated**", err)
            res.send({ "status_code": "400", data: "student details  not updated" })
        }

        else {
            console.log("exists--->");
            res.send({ "status_code": "200", data })
        }
    });
}

function createacademicinfo(req, res) {

    userService.addacademicinfo(req.body, function (err, data) {
        // console.log("data ...",data[0].phone_num,"--->",data[0].emailID);

        if (err) {
            console.log("Error: **Advertisement details updated**", err)
            res.send({ "status_code": "400", data: "Academic info  not updated" })
        }

        else {
            console.log("exists--->");
            res.send({ "status_code": "200", data })
        }
    });
}




function viewschool(req, res) {
    console.log("** login exists input data ** ");
    // var userdata = { "id": req.query.id };
    userService.getschool(function (err, data) {
        console.log("Response -->", data);
        if (err) {
            console.log("Error: **login exists details update**", err)
            res.send({ "status_code": "400", "status": "School details not found " })
        } else {
            // if(inputreq.phone_num == data[0].phone_num || inputreq.user_emailID == data[0].user_emailID){

            console.log("empty----->");
            res.send({ "status_code": "200", data });

        }
    });
}

function viewSchoolByUserId(req, res) {
    console.log("** login exists input data ** ");
    var userId = req.params.id
    userService.getSchoolByUserId(userId, function (err, data) {
        console.log("Response -->", data);
        if (err) {
            console.log("Error: **login exists details update**", err)
            res.send({ "status_code": "400", "status": "School details not found " })
        } else {
            // if(inputreq.phone_num == data[0].phone_num || inputreq.user_emailID == data[0].user_emailID){

            console.log("empty----->");
            res.send({ "status_code": "200", data });

        }
    });
}

function viewStudentBySchoolId(req, res) {
    console.log("** login exists input data ** ");
    var schoolId = req.params.id
    userService.getStudentBySchoolId(schoolId, function (err, data) {
        console.log("Response -->", data);
        if (err) {
            console.log("Error: **login exists details update**", err)
            res.send({ "status_code": "400", "status": "School details not found " })
        } else {
            res.send({ "status_code": "200", data });
        }
    });
}


function viewclasses(req, res) {
    console.log("** login exists input data ** ");
    // var userdata = { "id": req.query.id };
    userService.getclasses(function (err, data) {
        console.log("Response -->", data);
        if (err) {
            console.log("Error: **login exists details update**", err)
            res.send({ "status_code": "400", "status": "Classes not found " })
        } else {
            // if(inputreq.phone_num == data[0].phone_num || inputreq.user_emailID == data[0].user_emailID){

            console.log("empty----->");
            res.send({ "status_code": "200", data });

        }
    });
}

function viewClassesBySchoolId(req, res) {
    var schoolId = req.params.id
    userService.getClassesBySchoolId(schoolId, function (err, data) {
        console.log("Response -->", data);
        if (err) {
            console.log("Error: **login exists details update**", err)
            res.send({ "status_code": "400", "status": "Classes not found " })
        } else {
            // if(inputreq.phone_num == data[0].phone_num || inputreq.user_emailID == data[0].user_emailID){

            console.log("empty----->");
            res.send({ "status_code": "200", data });

        }
    });
}


function viewstudent(req, res) {
    console.log("** login exists input data ** ");
    // var userdata = { "id": req.query.id };
    userService.getstudent(function (err, data) {
        console.log("Response -->", data);
        if (err) {
            console.log("Error: **login exists details update**", err)
            res.send({ "status_code": "400", "status": "student  data not found " })
        } else {
            // if(inputreq.phone_num == data[0].phone_num || inputreq.user_emailID == data[0].user_emailID){

            console.log("empty----->");
            res.send({ "status_code": "200", data });

        }
    });
}


function viewacademicinfo(req, res) {
    console.log("** login exists input data ** ");
    // var userdata = { "id": req.query.id };
    userService.getacademicinfo(function (err, data) {
        console.log("Response -->", data);
        if (err) {
            console.log("Error: **login exists details update**", err)
            res.send({ "status_code": "400", "status": "Academic info not found " })
        } else {
            // if(inputreq.phone_num == data[0].phone_num || inputreq.user_emailID == data[0].user_emailID){

            console.log("empty----->");
            res.send({ "status_code": "200", data });

        }
    });
}


function getPaymentDetails(req, res) {
    userService.getPaymentDetailsForMonth(req.body, function (err, data) {
        if (err) {
            console.log("Error:", err)
            res.send({ "status_code": "400", "status": "Not found!" })
        } else {
            res.send({ "status_code": "200", data });
        }
    });
}

function updateRequestedPayment(req, res) {
    var paymentId = req.params.id;
    userService.updatePaymentDetail(paymentId, function (err, data) {
        if (err) {
            console.log("Error:", err)
            res.send({ "status_code": "400", "status": "Cannot Update" })
        } else {
            res.send({ "status_code": "200", data });
        }
    });
}

function getSchoolList(req, res) {
    userService.getSchoolListForApproval(function (err, data) {
        if (err) {
            console.log("Error:", err)
            res.send({ "status_code": "400", "status": "Cannot Get data" })
        } else {
            res.send({ "status_code": "200", data });
        }
    })
}

function updateSchoolApproval(req, res) {
    userService.schoolApproval(req.body, function (err, data) {
        if (err) {
            console.log("Error:", err)
            res.send({ "status_code": "400", "status": "Cannot Update" })
        } else {
            res.send({ "status_code": "200", data });
        }
    })
}

function createSchoolByAdmin(req, res) {
    userService.addSchoolByAdmin(req.body, function (err, data) {
        if (err) {
            console.log("Error:", err)
            res.send({ "status_code": "400", "status": "Cannot Create" })
        } else {
            res.send({ "status_code": "200", data });
        }
    })
}

function approveByUser(req, res) {
    var paymentId = req.params.id;
    var paymentStatus = req.params.status;
    userService.updatePaymentDetailByUser(paymentId, paymentStatus, function (err, data) {
        if (err) {
            console.log("Error:", err)
            res.send({ "status_code": "400", "status": "Cannot Update" })
        } else {
            res.send({ "status_code": "200", data });
        }
    })
}

function testFunction(req, res) {
    userService.test(function (err, data) {
        if (err) {
            console.log("Error:", err)
            res.send({ "status_code": "400", "status": "Cannot Update" })
        } else {
            res.send({ "status_code": "200", data });
        }
    })
}

module.exports = {
    createschool, createclasses, createstudent, createacademicinfo,
    viewschool, viewSchoolByUserId, viewclasses, viewClassesBySchoolId,
    viewStudentBySchoolId, viewstudent, viewacademicinfo, getPaymentDetails, updateRequestedPayment,
    getSchoolList, updateSchoolApproval, createSchoolByAdmin, approveByUser, testFunction
};
