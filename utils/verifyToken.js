const jwt = require("jsonwebtoken");


 const verifyToken = (req, res, next) =>{
    const token = req.cookies.access_token;
    if(!token){
        return res.status(401).json("You are not authenticated");
    }

    jwt.verify(token, process.env.JWT, (err, user)=>{
        if(err) return res.status(403).json("Your token is not valid");
        req.user = user;
        console.log(req.user)
        next();
    })
}

const verifyUser = async(req, res, next) =>{
    verifyToken(req, res,  ()=>{
        if(req.user.id === req.params.id){
            next();
        }else{
            return res.status(403).json("you are not authorized")
        }
    })
}


const verifyAdmin = async(req, res, next) =>{
    console.log(req.body)
    verifyToken(req, res, ()=>{
        console.log(req.user.isAdmin)
        if(req.user.isAdmin){
            next()
        }else{
            return res.status(403).json("you are not authorized")
        }
    })
}

module.exports = {verifyToken, verifyUser, verifyAdmin}