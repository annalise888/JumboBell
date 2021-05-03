var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var port = process.env.PORT || 3000;
const { MongoClient } = require("mongodb");
const urll = process.env.MONGODB_URLL;
const url2 = "mongodb+srv://annalisejacobson:annalise@cluster0.0y4mi.mongodb.net/tuftsdining?retryWrites=true&w=majority";

http.createServer(function (req, res) {
if (req.url == "/login.html")
{
	file = 'login.html';
	
	fs.readFile(file, function(err, txt) {
		if(err) { return console.log(err); }
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(txt);
	});
}
if(req.url == "/my_choice.html"){
	file2 = 'my_choice.html';
	fs.readFile(file2, function(err, txt) {
		if(err) {return console.log(err); }
		res.write(txt);
	});
}
else 
{
	res.writeHead(200, {'Content-Type':'text/html'});
	console.log("Process the form");
	pdata = "";
	req.on('data', data => {
           pdata += data.toString();
    });
	req.on('end', () => {
	pdata = qs.parse(pdata);
	if (req.url == "login.html/process"){
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
	}
		if (req.url == "my_choice.html/process"){
		MongoClient.connect(url2,{useUnifiedTopology:true},function(err, db) {
			if (err) {
				return console.log("err");
			}
			var dbo = db.db("tuftsdining");
			var coll = dbo.collection("menu");

			getFood(pdata['foodname'],coll);

			setTimeout(function(){ db.close(); console.log("Success!");}, 2000);
		});
		}
	});


}
setTimeout(function(){res.end();}, 3000);
}).listen(port);

//takes in a string of a food name and collection as a parameter and then searches menu databse for if that food is being served, if so print out when
function getFood(foodName, coll) {
    var query = {food:{$regex : ".*" + foodName + ".*"}}
    
    var sendstring = "";
    coll.find(query).toArray(function(err,items) {
        if (err) {
           res.write("Error: " + err);
        } else if (items.length == 0) {
            res.write("No food being served with that name.");
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
    
}

// var nodemailer = require('nodemailer');

// function sendmail(sendstring) {
    
    

//     var transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'cpekowsky@gmail.com',
//         pass: 'stinkfart101'
//       }
//     });

//     var mailOptions = {
//       from: 'cpekowsky@gmail.com',
//       to: 'cpekowsky@gmail.com',
//       subject: 'foods being served',
//       text: sendstring
//     };

//     transporter.sendMail(mailOptions, function(error, info){
//       if (error) {
//         console.log(error);
//       } else {
//         console.log('Email sent: ' + info.response);
//       }
//     });
    
// }
