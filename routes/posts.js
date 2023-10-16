const router = require('express').Router();
const { verifyUser, verifyToken } = require('../utils/verifyToken');

const { createThePost, updateThePost, deleteThePost, getOnePost, getAllPost } = require('../controllers/postsController');

//CREATE NEW POST
router.post('/', verifyToken, createThePost)

//UPDATE
router.put('/:id', verifyToken, updateThePost)

//DELETE POST
router.delete('/:id', verifyToken, deleteThePost)

//GET POST
router.get("/:id", getOnePost)

//GET ALL POST
router.get("/", getAllPost)


module.exports = router