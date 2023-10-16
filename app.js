const PORT = process.env.PORT || 5000; //portNumber
const express = require('express'); //express framework

const cors = require("cors");  //cors for tansforming data
const dotenv = require("dotenv"); //env library
const multer = require('multer');
const path = require("path") 


//cookie
const cookieSession = require("cookie-session")
const cookieParser = require("cookie-parser");

//our routes
const authRoute = require('./routes/auth'); //
const usersRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const categoriesRoute = require("./routes/categories");
const connectTheDB = require('./utils/db');

const app = express();

//connecting to DB


app.use(express.json());
dotenv.config()
app.use("/images", express.static(path.join(__dirname, "./images")));
app.use(cors());





const storage = multer.diskStorage({
  destination: (req, file, cb) => {
     cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  }
})

const upload = multer({ storage: storage }).single("file");

app.post("/api/upload", upload, (req, res) => {
  return res.status(200).json("File has been uploaded")
});
app.use(cookieParser());
app.use('/api/auth', authRoute);
app.use("/api/posts", postRoute);
app.use("/api/users", usersRoute);
app.use("/api/categories", categoriesRoute);



//app is lintenig
connectTheDB();
app.listen(PORT, () => {
  console.log('connected succesfully on  ' + PORT)
})
