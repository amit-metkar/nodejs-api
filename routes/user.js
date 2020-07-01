const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

/* 
    /user?all=true
    /user?isActive=true
    /user?isActive=false
*/
router.get('/', userController.getUsers);

/* /user/find/byId/:id */
router.get('/find/byId/:id', userController.findUserById)

/* /user/find/byEmail/:email */
router.get('/find/byEmail/:email', userController.findUserByEmail)

/* /user/search?by=firstName&val=Amit */
router.get('/search', userController.searchUser)

/* /user */
router.post('/', userController.newUser);

/* /user/update/byId/:id */
router.patch('/update/byId/:id', userController.updateUser)

/* /user/update/byEmail/:email */
router.patch('/update/byEmail/:email', userController.updateUser)

/* /user/delete/byId/:id */
router.delete('/delete/byId/:id', userController.deleteUser)

/* /user/delete/byEmail/:email */
router.delete('/delete/byEmail/:email', userController.deleteUser)

module.exports = router