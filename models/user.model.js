var connection = require('../db/databases.js');
const fs = require('fs');

var app_url = "http://localhost:3001/";
// if (process.env.NODE_ENV == "development") {
//     app_url = "http://192.168.1.175:3001/";
// } else {
//     app_url = "http://172.105.61.17:3001/"
// }
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


var addroles = function (request, callback) {
    data = request;


    console.log("inside insert query");

    dbQuery = "insert into user_role set role=? ;";
    console.log(dbQuery)
    connection.query(dbQuery, [data.roles], function (err, db_results) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, db_results)
        }
    });

}




var addusers = function (request, callback) {
    data = request;
    var path = '';
    if (data.user_image) {
        var returned_base_data = splitbase64(data.user_image);
        path = "images/" + Date.now() + String(returned_base_data['extension']);
        console.log("--------------------------------------------", path)
        var bitmap = new Buffer.from(returned_base_data['splitted_base64'], 'base64');
        fs.writeFileSync(path, bitmap);
    }

    console.log("inside insert query");

    dbQuery = "insert into user_details set role_id =?,name = ?,phone_number = ?,\
            email_id = ?,password = ?,isActive = 0, profile_pic = ?;";
    console.log(dbQuery)
    connection.query(dbQuery, [data.role_id, data.name, data.phone_number, data.email_id, data.password, path], function (err, db_results) {
        if (err) {
            callback(err, null)
        } else {
            dbQuery = "select id as user_id from user_details order by id desc limit 1";
            console.log(dbQuery)
            connection.query(dbQuery, function (err, user_id) {
                callback(null, user_id)
            });
        }
    });


}



/**Get the individual patient Details */
var getuser = function (callback) {

    dbQuery = "select * from user_details  ;";
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

var getlogin = function (request, callback) {
    data = request;
    dbQuery = "select * from  user_details where email_id = ? and password = ? and isActive=1;";
    connection.query(dbQuery, [data.email_id, data.password], function (err, results) {
        if (err) {
            callback(err, null)
        } else {
            console.log("results-->", results);
            callback(null, results);
            console.log("1234567", results)
            // notification.sendNotification('This is the test notification')
        }

    });
}



var getusereoles = function (callback) {
    // data = request;
    dbQuery = "select * from user_role;";
    connection.query(dbQuery, function (err, results) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, results);
        }

    });
}

var updateUser = function (userDetail, callback) {
    dbQuery = "update user_details set name =?, phone_number = ?, password = ? where id=?;";
    connection.query(dbQuery, [userDetail.name, userDetail.phone_number, userDetail.password, userDetail.user_id], function (err, results) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, results);
        }
    });
}

var updatePassword = function (userDetail, callback) {
    existQuery = "select name from user_details where email_id = ?";
    connection.query(existQuery, [userDetail.email_id], function (err, results) {
        if (err) {
            callback(err, null)
        } else {
            if (results.length) {
                console.log('Results: ', results)
                console.log('Result length: ', results.length)
                dbQuery = "update user_details set password = ? where email_id=?;";
                connection.query(dbQuery, [userDetail.password, userDetail.email_id], function (error, updated) {
                    if (err) {
                        callback(error, null)
                    } else {
                        callback(null, results);
                    }
                });
            } else {
                callback([], null)
            }
        }
    });
}
module.exports = { addroles, addusers, getuser, getlogin, getusereoles, updateUser, updatePassword }