var express = require("express");
var fs = require('fs');
var qs = require('querystring');
var port = process.env.PORT || 3000;
const { MongoClient } = require("mongodb");
const urll = process.env.MONGODB_URLL;
const url2 = "mongodb+srv://annalisejacobson:annalise@cluster0.0y4mi.mongodb.net/tuftsdining?retryWrites=true&w=majority";
var app = express();
app.use(express.static("public"));


app.get('/', function (req, res) {
res.send("hello world");
});
