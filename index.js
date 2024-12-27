const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();

app.use(bodyParser.json({limit: "50mb"}));
app.use(cors());
app.use(morgan("common"));
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URL)
   .then(() => {
        console.log("Connected to MongoDB");
    })
   .catch((error) => {
        console.error("Failed to connect to MongoDB:", error);
    });


const authorRoute = require("./routes/author");
const booksRoute = require("./routes/book");
const authRoute = require("./routes/auth");

app.use("/v1/author", authorRoute);
app.use("/v1/books", booksRoute);
app.use("/v1/auth", authRoute);

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});