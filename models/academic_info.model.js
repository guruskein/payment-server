var connection = require('../db/databases.js');
const fs = require('fs');
const nodemailer = require("nodemailer");


const app_url = "https://demo.emeetify.com:5000/";
// if (process.env.NODE_ENV == "development") {
//     app_url = "http://192.168.1.175:3001/";
// } else {
//     app_url = "http://172.105.61.17:3001/"
// }

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'skeintest2019@gmail.com',
        pass: 'Skein@123'
    }
});

function get_mime_type_extension(mime_type) {
    if (mime_type == 'application/pdf;') {
        return '.pdf'
    }
    else if (mime_type == 'application/msword;') {
        return '.doc'
    }
    else if (mime_type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document;') {
        return '.docx'
    }
    else if (mime_type == 'application/vnd.ms-excel;') {
        return '.xls'
    }
    else if (mime_type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;') {
        return '.xlsx'
    }
    else if (mime_type == 'application/vnd.ms-powerpoint;') {
        return '.ppt'
    }
    else if (mime_type == 'application/vnd.openxmlformats-officedocument.presentationml.presentation;') {
        return '.pptx'
    }
    else if (mime_type == 'image/jpeg;') {
        return '.jpeg'
    }
    else if (mime_type == 'image/png;') {
        return '.png'
    }
    else if (mime_type == 'image/gif;') {
        return '.gif'
    }
    else if (mime_type == 'text/csv;') {
        return '.csv'
    }
    else if (mime_type == 'audio/mpeg;') {
        return '.mp3'
    }
    else if (mime_type == 'audio/mp3;') {
        return '.mp3'
    }
    else if (mime_type == 'audio/mid;') {
        return '.rmi'
    }
    else if (mime_type == 'audio/mp4;') {
        return '.mp4 audio'
    }
    else if (mime_type == 'audio/x-aiff;') {
        return '.aif'
    }
    else if (mime_type == 'video/mp4;') {
        return '.mp4'
    }
    else if (mime_type == 'video/x-flv;') {
        return '.flv'
    }

    else if (mime_type == 'application/x-mpegURL;') {
        return '.m3u8'
    }
    else if (mime_type == 'video/MP2T;') {
        return '.ts'
    }
    else if (mime_type == 'video/3gpp;') {
        return '.3gp'
    }
    else if (mime_type == 'video/quicktime;') {
        return '.mov'
    }
    else if (mime_type == 'video/x-msvideo;') {
        return '.avi'
    }
    else if (mime_type == 'video/x-ms-wmv;') {
        return '.wmv'
    }
}


function splitbase64(base64_image) {
    var splitted_image = base64_image.split("base64,")
    var full_mime = splitted_image[0];
    var base64_splitted = splitted_image[1];
    var mime_type = full_mime.split('data:')[1];

    console.log(mime_type)
    return { 'splitted_base64': base64_splitted, 'extension': get_mime_type_extension(mime_type), 'mime_type': mime_type }
}


var addschool = function (request, callback) {
    data = request;

    dbQuery = "insert into school set user_id =?,school_name = ?, school_address = ?,is_approved = 0 ,is_rejected = 0 ;";
    console.log(dbQuery)
    connection.query(dbQuery, [data.user_id, data.school_name, data.school_address], function (err, db_results) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, db_results)
        }
    });


}




var addclasses = function (request, callback) {
    data = request;

    console.log("inside insert query");

    dbQuery = "insert into classes set school_id =?,class_name = ?,teacher_name = ?,\
            teacher_phonenumber = ?,date = ?";
    console.log(dbQuery)
    var date = new Date(data.date);
    console.log(date);
    connection.query(dbQuery, [data.school_id, data.class_name, data.teacher_name, data.teacher_phonenumber, date], function (err, db_results) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, db_results)
        }
    });


}

var addstudent = function (request, callback) {
    data = request;
    var path = '';
    if (data.user_image) {
        var returned_base_data = splitbase64(data.user_image);
        path = "images/" + Date.now() + String(returned_base_data['extension']);
        console.log("--------------------------------------------", path)
        var bitmap = new Buffer.from(returned_base_data['splitted_base64'], 'base64');
        fs.writeFileSync(path, bitmap);
    }

    dbQuery = "insert into student_details set name = ?,phone_number= ?,\
            email_id = ?,parents_name = ?,parents_phonenumber = ?,parents_emailId = ?, profile_pic = ?, address = ?;";
    console.log(dbQuery)
    connection.query(dbQuery, [data.name, data.phone_number, data.email_id, data.parents_name,
    data.parents_phonenumber, data.parents_emailId, path, data.address], function (err, db_results) {
        if (err) {
            callback(err, null)
        } else {
            dbStudentQuery = "select id as student_id from student_details order by id desc limit 1";
            console.log(dbStudentQuery)
            connection.query(dbStudentQuery, function (err, student_id) {
                callback(null, student_id)
            });
        }
    });


}


var addacademicinfo = function (request, callback) {
    data = request;

    console.log("inside insert query");

    dbQuery = "insert into academic_info set classes =?,student = ?,fees_structure = ?,\
            due_date = ?,remainder_days =?;";
    console.log(dbQuery)
    var due_date = new Date(data.due_date)
    connection.query(dbQuery, [data.classes_id, data.student_id, data.fees_structure, due_date, data.remainder_days], function (err, db_results) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, db_results)
        }
    });


}





/**Get the individual patient Details */
var getschool = function (callback) {

    dbQuery = "select *, sch.id as school_id from school sch inner join user_details user on user.id=sch.user_id;";
    connection.query(dbQuery, function (err, results) {
        if (err) {
            callback(err, null)
        } else {
            console.log("results-->", results);

            callback(null, results);
            console.log("1234567", results)

        }

    });
}

var getSchoolByUserId = function (userId, callback) {

    dbQuery = "select * from school where user_id = ?;";
    connection.query(dbQuery, [userId], function (err, results) {
        if (err) {
            callback(err, null)
        } else {
            console.log("results-->", results);

            callback(null, results);
            console.log("1234567", results)

        }

    });
}

var getclasses = function (callback) {
    dbQuery = "select * from classes  ;";
    connection.query(dbQuery, function (err, results) {
        if (err) {
            callback(err, null)
        } else {
            console.log("results-->", results);

            callback(null, results);
            console.log("1234567", results)
        }
    });
}

var getClassesBySchoolId = function (schoolId, callback) {
    dbQuery = "select * from classes where school_id = ? ;";
    connection.query(dbQuery, [schoolId], function (err, results) {
        if (err) {
            callback(err, null)
        } else {
            console.log("results-->", results);

            callback(null, results);
            console.log("1234567", results)
        }
    });
}

var getstudent = function (callback) {

    dbQuery = "select * from student_details  ;";
    connection.query(dbQuery, function (err, results) {
        if (err) {
            callback(err, null)
        } else {
            console.log("results-->", results);

            callback(null, results);
            console.log("1234567", results)

        }

    });
}

var getStudentByClassId = function (callback) {

    dbQuery = "select * from student_details  ;";
    connection.query(dbQuery, function (err, results) {
        if (err) {
            callback(err, null)
        } else {
            console.log("results-->", results);

            callback(null, results);
            console.log("1234567", results)

        }

    });
}

var getStudentBySchoolId = function (schoolId, callback) {

    dbQuery = "select * from student_details student inner join academic_info academic on academic.student=student.id inner join classes clas on academic.classes = clas.id inner join school schl on schl.id = ?;";
    connection.query(dbQuery, [schoolId], function (err, results) {
        if (err) {
            callback(err, null)
        } else {
            console.log("results-->", results);

            callback(null, results);
            console.log("1234567", results)

        }

    });
}

var getacademicinfo = function (callback) {

    dbQuery = "select * from academic_info  ;";
    connection.query(dbQuery, function (err, results) {
        if (err) {
            callback(err, null)
        } else {
            console.log("results-->", results);

            callback(null, results);
            console.log("1234567", results)

        }

    });
}

var getPaymentDetailsForMonth = function (request, callback) {
    data = request;
    dbQuery = "select payment.id, payment.date, payment.amount, payment.is_admin_confirmed, payment.is_user_confirmed, student.name, student.phone_number from payment_details payment inner join student_details student on student.id=payment.student where date between ? and ?;";
    connection.query(dbQuery, [data.start_date, data.end_date], function (err, results) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, results);
        }
    });
}

var updatePaymentDetail = function (paymentId, callback) {
    dbQuery = "update payment_details set is_admin_confirmed=1 where id = ?;"
    console.log(paymentId)
    connection.query(dbQuery, [paymentId], function (err, results) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}


var getSchoolListForApproval = function (callback) {
    dbQuery = "select *, sch.id as school_id from school sch inner join user_details user on user.id=sch.user_id where sch.is_approved = 0 and sch.is_rejected = 0;"
    connection.query(dbQuery, function (err, results) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}

var schoolApproval = function (schoolDetails, callback) {
    console.log(schoolDetails);
    let isActive;
    if (schoolDetails.is_approved == 1) {
        isActive = 1;
    }
    if (schoolDetails.is_rejected == 1) {
        isActive = 0;
    }
    dbQuery = "update school set is_approved =?,is_rejected = ? where id=?;";
    connection.query(dbQuery, [schoolDetails.is_approved, schoolDetails.is_rejected, schoolDetails.school_id], function (err, results) {
        if (err) {
            callback(err, null);
        } else {
            userUpdate = `update user_details set isActive =${isActive} where id=${schoolDetails.user_id};`;
            connection.query(userUpdate, function (err, response) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, response);
                }
            });
        }
    });

}

var addSchoolByAdmin = function (request, callback) {
    data = request;

    dbQuery = "insert into user_details set role_id =?,name = ?,phone_number = ?,\
            email_id = ?,password = ?,isActive = 1, profile_pic = ?;";
    console.log(dbQuery)
    connection.query(dbQuery, [2, data.name, data.phone_number, data.email_id, data.password, ''], function (err, db_results) {
        if (err) {
            callback(err, null)
        } else {
            userQuery = "select id as user_id from user_details order by id desc limit 1";
            console.log(userQuery)
            connection.query(userQuery, function (err, user_id) {
                schoolQuery = "insert into school set user_id =?,school_name = ?, school_address = ?,is_approved = 1 ,is_rejected = 0 ;";
                console.log(schoolQuery)
                connection.query(schoolQuery, [user_id[0].user_id, data.school_name, data.school_address], function (err, db_results) {
                    if (err) {
                        callback(err, null)
                    } else {
                        callback(null, db_results)
                    }
                });
            });
        }
    });
}

var updatePaymentDetailByUser = function (paymentId, statusId, callback) {
    dbQuery = "update payment_details set is_user_confirmed=? where id = ?;"
    console.log(paymentId)
    connection.query(dbQuery, [statusId, paymentId], function (err, results) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}

var sendMail = function (paymentId, userMailId, callback) {
    var mailOptions = {
        from: 'skeintest2019@gmail.com',
        // to: 'guru.s@skeintech.com',
        to: userMailId,
        subject: 'Payment Reminder',
        html: `<html lang="en">
      <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    
        <title>Payment Reminder</title>
      </head>
      <body>
      <h1>Greetings!</h1>
      <p>This the gentle remainder for the monthly subscription.</p>
      <p>If you already done click <strong>"YES"</strong></p>
      <div class="row">
        <div class="col-12">
        <a href="${app_url}approve/${paymentId}/1" class="btn btn-primary">Yes</a>
        <a href="${app_url}approve/${paymentId}/0" class="btn btn-primary">No</a>
      </div>
    </div>
  
    
        <!-- Optional JavaScript -->
        <!-- jQuery first, then Popper.js, then Bootstrap JS -->
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
      </body>
    </html>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            callback(error, null)
        } else {
            console.log('Email sent: ' + info.response);
            callback(null, 'Okay')
        }
    });
}

var test = function (callback) {
    sendMail(1, 'guru.s@skeintech.com');
    callback(null, []);
}



module.exports = {
    addschool, addclasses, addstudent, addacademicinfo,
    getschool, getSchoolByUserId, getclasses, getClassesBySchoolId,
    getStudentBySchoolId, getstudent, getacademicinfo, getPaymentDetailsForMonth, updatePaymentDetail,
    getSchoolListForApproval, schoolApproval, addSchoolByAdmin, updatePaymentDetailByUser, test
}