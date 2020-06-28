const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.get('/', userController.getUsers);

router.get('/findByEmail/:email', userController.getUserByEmail)

router.get('/search', userController.searchUser)

router.post('/', userController.newUser);

module.exports = router