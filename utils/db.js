const mongoose = require("mongoose");


const connectTheDB = async() => {
   await mongoose.connect(`${process.env.MONGO_URL}` || "mongodb+srv://ashwani04:ash04wani31@cluster0.ogua3en.mongodb.net/blogworld", {
        useNewUrlParser: true,
        
    }).then(()=>
    console.log("mongodb is connected successfylly")
    )
}

module.exports = connectTheDB