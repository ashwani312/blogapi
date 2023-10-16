const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const saltRounds = 10;


//REGISTER THE USER CONTROLLER
 const registerTheUser =  async (req, res, next) => {
    try {
        const isUserExist = await User.findOne({ username: req.body.username });
        if (isUserExist) {
            return res.status(401).json("user is alredy exist");
        }
        const salt = await bcrypt.genSalt(saltRounds)
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
            isAdmin : req.body.isAdmin
        })

        const user = await newUser.save();
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
}

//LOGIN THE USER CONTROLLER
const loginTheUser =  async (req, res, next) => {
    try {

        const user = await User.findOne({ username: req.body.username });
        console.log(user)
        if (!user) {
            return res.status(404).json("Wrong credentials")
        }

        const validated = await bcrypt.compare(req.body.password, user.password)
        if (!validated) {
            return res.status(400).json("Wrong credentials")
        }
        const token = jwt.sign({ id: user._id, username: user.username, isAdmin : user.isAdmin }, process.env.JWT);
        const { password, ...others } = user._doc;

        return res.cookie("access_token", token, {
            httpOnly: true,
            Secure : true
        }).status(200).json(others);

    } catch (err) {
        return res.status(500).json(err)
    }
}


module.exports = {registerTheUser, loginTheUser}