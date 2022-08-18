const express = require('express');

const AdminNoticesController = require('../controllers/admin/notices_controller');
const AdminUsersController = require('../controllers/admin/users_controller');
const SessionsController = require('../controllers/admin/sessions_controller');
const PasswordController = require('../controllers/admin/password_controller');
const ExamineesController = require('../controllers/admin/examinees_controller');

const NoticesController = require('../controllers/notices_controller');
const MoodsController = require('../controllers/moods_controller');
const KneePainsController = require('../controllers/knee_pains_controller');
const FoodsController = require('../controllers/foods_controller');
const UsersController = require('../controllers//users_controller');
const WeathersController = require('../controllers/weathers_controller');
const HomeController = require('../controllers/home_controller');
const SilmeeController = require('../controllers/users/silmee_controller');
const WalkXController = require('../controllers/users/walkx_controller');

const { checkSession, checkAdminSession } = require('../services/check_session');

const router = express.Router()

const { regDeviceValidator, createUserValidator } = require('../validators/user');
const { changePasswordValidator } = require('../validators/admin/password');

const noticeValidator = require('../validators/notice');

router.post('/admin/notices', checkAdminSession, noticeValidator, AdminNoticesController.create)
router.get('/admin/users', checkAdminSession, AdminUsersController.index)
router.post('/admin/login', SessionsController.create)
router.delete('/admin/logout', checkAdminSession, SessionsController.destroy)
router.put('/admin/password', checkAdminSession, changePasswordValidator, PasswordController.update)

router.get('/admin/examinees', checkAdminSession, ExamineesController.index)
router.post('/admin/examinees', checkAdminSession, ExamineesController.create)
router.put('/admin/examinees/:examinee_id', checkAdminSession, ExamineesController.update)

router.get('/home', checkSession, HomeController.index)

router.get('/notices', checkSession, NoticesController.index)
router.get('/notices/unread', checkSession, NoticesController.unread)
router.get('/notices/:notice_id', checkSession, NoticesController.show)
router.put('/notices/:notice_id/read', checkSession, NoticesController.read)

router.post('/moods', checkSession, MoodsController.create)
router.get('/moods', checkSession, MoodsController.index)
router.get('/moods/statistics', checkSession, MoodsController.statistics)

router.post('/knee_pains', checkSession, KneePainsController.create)
router.get('/knee_pains', checkSession, KneePainsController.index)
router.get('/knee_pains/statistics', checkSession, KneePainsController.statistics)

router.post('/foods', checkSession, FoodsController.create)
router.get('/foods', checkSession, FoodsController.index)

router.post('/users', createUserValidator, UsersController.create)
router.get('/users/:userID', checkSession, UsersController.show)
router.put('/users/:userID', checkSession, createUserValidator, UsersController.update)
router.post('/register/reg_deviceid', checkSession, regDeviceValidator, UsersController.regDevice)
router.post('/users/walkx/minute', checkSession, createUserValidator, WalkXController.minute)
router.post('/users/walkx/daily', checkSession, createUserValidator, WalkXController.daily)

router.post('/users/:userID/silmee', checkSession, SilmeeController.create)
router.get('/users/:userID/silmee', checkSession, SilmeeController.show)
router.get('/users/:userID/silmee/state', checkSession, SilmeeController.state)

router.get('/weathers/current', checkSession, WeathersController.current)
router.get('/weathers/daily', checkSession, WeathersController.daily)
router.get('/weathers/history', checkSession, WeathersController.history)

// TODO remove
const { readVital, readWristband } = require('../services/silmee_service');
router.get('/test/silmee/readVital', readVital)
router.get('/test/silmee/readWristband', readWristband)

module.exports = router
