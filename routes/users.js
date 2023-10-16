const router = require('express').Router();
const User = require('../models/User');
const Post = require("../models/Post");
const { getTheUser, updateTheUser, deleteTheUser } = require('../controllers/usersControllers');
const { verifyUser } = require('../utils/verifyToken');

//UPDATE THE USER
router.put('/:id',verifyUser, updateTheUser)

//DELETE USER ROUTE
router.delete('/:id',verifyUser, deleteTheUser)

//GET USER ROUTE
router.get("/:id",verifyUser, getTheUser)


module.exports = router