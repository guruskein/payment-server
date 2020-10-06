
module.exports = function (app) {
    var userctrl = require('../controllers/academic_info.controller.js');
    // const middleware = require('../utils/middleware');

    /**To add the roles */
    app.route('/school')
        .post(userctrl.createschool)
        .get(userctrl.viewschool);

    app.route('/school/:id')
        .get(userctrl.viewSchoolByUserId);

    app.route('/student/by/school/:id')
        .get(userctrl.viewStudentBySchoolId);

    app.route('/classes')
        .post(userctrl.createclasses)
        .get(userctrl.viewclasses);

    app.route('/classes/:id')
        .get(userctrl.viewClassesBySchoolId);

    app.route('/student')
        .post(userctrl.createstudent)
        .get(userctrl.viewstudent);

    app.route('/acdemicinfo')
        .post(userctrl.createacademicinfo)
        .get(userctrl.viewacademicinfo);

    app.route('/getPaymentDetails')
        .post(userctrl.getPaymentDetails)

    app.route('/updatePayment/:id')
        .get(userctrl.updateRequestedPayment)

    app.route('/getSchoolList')
        .get(userctrl.getSchoolList)

    app.route('/updateSchoolApproval')
        .post(userctrl.updateSchoolApproval)

    app.route('/createSchoolByAdmin')
        .post(userctrl.createSchoolByAdmin)

    app.route('/approve/:id/:status')
        .get(userctrl.approveByUser)

    app.route('/test')
        .get(userctrl.testFunction)

};

