const express = require('express');
const router = express.Router();

const usersApi = require('../../../controllers/api/v1/users_api');
const postsApi = require("../../../controllers/api/v1/post_api");

router.post('/create-session', usersApi.createSession);
// session false is to prevent session cookies from generation

module.exports = router;