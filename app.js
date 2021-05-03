var express = require("express");
var fs = require('fs');
var qs = require('querystring');
var port = process.env.PORT || 3000;
const { MongoClient } = require("mongodb");
const urll = process.env.MONGODB_URLL;
const url2 = "mongodb+srv://annalisejacobson:annalise@cluster0.0y4mi.mongodb.net/tuftsdining?retryWrites=true&w=majority";
var app = express();
app.use(express.static("public"));
var file;
app.get('/', function (req, res) {
  file = 'index.html';
  fs.readFile(file, function(err, txt) {
      if(err) { return console.log(err); }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(txt);
      setTimeout(function(){res.end();}, 2000);
    });
});
app.get('/login.html', function (req, res) {
  file = 'login.html';
  fs.readFile(file, function(err, txt) {
      if(err) { return console.log(err); }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(txt);
      setTimeout(function(){res.end();}, 2000);
    });
});
app.post('/login.html/process', function (req, res) {
  res.writeHead(200, {'Content-Type':'text/html'});
	console.log("Process the form");
	pdata = "";
	req.on('data', data => {
           pdata += data.toString();
    });
  req.on('end', () => {
	pdata = qs.parse(pdata);
	var name = String(pdata['fullname']);
	res.write("name: ");
	res.write(name);
	var Email = String(pdata['email']);
	res.write(" email: ");
	res.write(Email);
		MongoClient.connect(urll, { useUnifiedTopology: true }, function(err, db) {
		  if(err) { return console.log(err); }

			var dbo = db.db("users");
			var collection = dbo.collection('profiles');
			var theQuery = {email: Email} 
				collection.find(theQuery).toArray(function(err, items) {
					  if (err) {
						console.log("Error: '" + err+"'}");
					  } 
					  else if(items.length == 0){
						  var newData = {"fullname": name, "email": Email,"foods":[]};
						  collection.insertOne(newData, function(err, res){
							  if(err) { 
								  console.log("query err: " + err); 
								  return; 
							}
						  console.log("new document inserted");
					});
				} 

				});

			setTimeout(function(){db.close;}, 2000);
			console.log("Success!");

		});  
});
});
app.get('/my_choice.html', function (req, res) {
  file = 'my_choice.html';
  fs.readFile(file, function(err, txt) {
      if(err) { return console.log(err); }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(txt);
      setTimeout(function(){res.end();}, 2000);
    });
});
app.post('/my_choice.html/process', function (req, res) {
  res.writeHead(200, {'Content-Type':'text/html'});
	console.log("Process the form");
	pdata = "";
	req.on('data', data => {
           pdata += data.toString();
    });
  req.on('end', () => {
	pdata = qs.parse(pdata);
			MongoClient.connect(url2,{useUnifiedTopology:true},function(err, db) {
			if (err) {
				return console.log("err");
			}
			var dbo = db.db("tuftsdining");
			var coll = dbo.collection("menu");

			var query = {food:{$regex : ".*" + foodName + ".*"}}

			    var sendstring = "";
			    coll.find(query).toArray(function(err,items) {
				if (err) {
				   console.log("Error: " + err);
				} else if (items.length == 0) {
				    sendstring = "No food being served with that name.";
				} else {
				    for (i=0; i < items.length; i++) {
					//console.log(items[i].food + " is being served at " + items[i].hall + " on " + items[i].longdate);
					sendstring += (items[i].food + " is being served at " + items[i].hall + " on " + items[i].longdate + " \n") ;
					//console.log(sendstring);
				    }
				}

				res.write(sendstring);
			//         sendmail(sendstring)

			    })

			setTimeout(function(){ db.close(); console.log("Success!");}, 2000);
		});

			setTimeout(function(){db.close;}, 2000);
			console.log("Success!");

		});  
});
app.get('/about.html', function (req, res) {
  file = 'about.html';
  fs.readFile(file, function(err, txt) {
      if(err) { return console.log(err); }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(txt);
      setTimeout(function(){res.end();}, 2000);
    });
});
app.get('/menu.html', function (req, res) {
  file = 'menu.html';
  fs.readFile(file, function(err, txt) {
      if(err) { return console.log(err); }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(txt);
      setTimeout(function(){res.end();}, 2000);
    });
});


app.post('/menu.html/process', function (req, res) {
	res.write("yep!!!");

});


app.listen(port, function() {console.log("server started successfully");});

