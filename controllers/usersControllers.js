const User = require('../models/User');
const Post = require("../models/Post");


//UPDATE THE USER
const updateTheUser = async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            });
            const { password, ...others } = user._doc
            return res.status(200).json(others);
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(401).json("you can update only your account")
    }
}


//DELETE THE USER
const deleteTheUser =  async (req, res) => {
    // console.log(req.body.userId,req.params.id )
    // if (req.body.userId === req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            try {
                await User.findByIdAndDelete(req.params.id);
                await Post.deleteMany({ username: user.username });
                return  res.status(200).json("user has been deleted...")
            } catch (err) {
                return  res.status(500).json(err)
            }
        } catch (err) {
            return  res.status(404).json("User not found");
        }
    // } else {
    return //     return res.status(401).json("you can update only your account")
    // }
}


//GET THE USER
const getTheUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc
        return res.status(200).json(others)
    } catch (err) {
        return res.status(500).json(err)
    }
}

module.exports = {getTheUser, deleteTheUser, updateTheUser}