var express = require("express");
var fs = require('fs');
var qs = require('querystring');
var port = process.env.PORT || 3000;
const { MongoClient } = require("mongodb");
const urll = process.env.MONGODB_URLL;
const url2 = "mongodb+srv://annalisejacobson:annalise@cluster0.0y4mi.mongodb.net/tuftsdining?retryWrites=true&w=majority";
var app = express();
app.use(express.static("public"));


app.get('/login.html', function (req, res) {
 var file = 'login.html';
 fs.readFile(file, function(err, txt) {
		if(err) { return console.log(err); }
		res.send(txt);
	});
});

app.get('/my_choice.html', function (req, res) {
 var file2 = 'my_choice.html';
 fs.readFile(file2, function(err, txt) {
		if(err) { return console.log(err); }
		res.send(txt);
	});
});
app.get('/', function (req, res) {
 var file3 = 'index.html';
 fs.readFile(file3, function(err, txt) {
		if(err) { return console.log(err); }
		res.send(txt);
	});
});
app.get('/menu.html', function (req, res) {
 var file4 = 'menu.html';
 fs.readFile(file4, function(err, txt) {
		if(err) { return console.log(err); }
		res.send(txt);
	});
});
app.get('/about.html', function (req, res) {
 var file4 = 'about.html';
 fs.readFile(file4, function(err, txt) {
		if(err) { return console.log(err); }
		res.send(txt);
	});
});
