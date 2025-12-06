# TODO: Fix Authentication Error in Controllers

## Tasks
- [ ] Update controllers/doctorCtrl.js: Replace `req.body.userId` with `req.userId` in getDoctorInfoController, updateProfileController, and doctorAppointmentsController
- [ ] Update controllers/userCtrl.js: Replace `req.body.userId` with `req.userId` in getAllNotificationController and deleteAllNotificationController
- [ ] Update controllers/userCtrl.js: Change `req.body.id` to `req.userId` in userAppointmentsController
- [ ] Test the application to ensure the error is resolved
