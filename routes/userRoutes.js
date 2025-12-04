const express = require('express');
const { loginController, registerController, authController,applyDoctorController,getAllNotificationController,deleteAllNotificationController } = require('../controllers/userCtrl');
const authMiddleware = require('../middlewares/authMiddleware');

//routes onject
const router = express.Router();

//routes
//LOGIN || POST
router.post('/login', loginController);

//REGISTER || POST
router.post('/register', registerController);

// Auth || post
router.post('/getUserData',authMiddleware, authController);

// Apply  doctor|| post
router.post('/apply-doctor',authMiddleware, applyDoctorController);
//module.exports = router;

// Notification  doctor|| post
router.post('/get-all-notification',authMiddleware,  getAllNotificationController);

// Notification  doctor|| post
router.post('/delete-all-notification',authMiddleware, deleteAllNotificationController);
module.exports = router;