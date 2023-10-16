const { createNewCat, getTheCat } = require('../controllers/categories');
const { verifyAdmin } = require('../utils/verifyToken');

const router = require('express').Router();


//CREATE CAT ROUTE
router.post("/", verifyAdmin, createNewCat);

//GET CAT ROUTE
router.get("/", getTheCat);


module.exports = router