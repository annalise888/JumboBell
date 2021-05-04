var express = require("express");
var fs = require('fs');
var qs = require('querystring');
var port = process.env.PORT || 3000;
const { MongoClient } = require("mongodb");
const urll = process.env.MONGODB_URLL;
const url2 = "mongodb+srv://annalisejacobson:annalise@cluster0.0y4mi.mongodb.net/tuftsdining?retryWrites=true&w=majority";
const userurl = 'mongodb+srv://unellu01:aaa@cluster0.trnuo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

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
app.get('/index.html', function (req, res) {
  file = 'index.html';
  fs.readFile(file, function(err, txt) {
      if(err) { return console.log(err); }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(txt);
      setTimeout(function(){res.end();}, 2000);
    });
});
app.get('/home.html', function (req, res) {
  file = 'home.html';
  fs.readFile(file, function(err, txt) {
      if(err) { return console.log(err); }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(txt);
      setTimeout(function(){res.end();}, 2000);
    });
});
app.get('/index.html/process', function (req, res) {
  res.writeHead(200, {'Content-Type':'text/html'});
	console.log("Process the form");
	pdata = "";
	req.on('data', data => {
           pdata += data.toString();
    });
  req.on('end', () => {
	pdata = qs.parse(pdata);
	res.write("User signed in successfully! ");
	res.write("Redirecting to home page...");
	
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
		});  
	  	res.end();
	      	res.writeHead(200, {'Content-Type': 'text/html'});
	  	res.redirect('https://jumbo-bell.herokuapp.com/home.html');
	  	res.end();

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

			var query = {food:{$regex : ".*" + pdata['foodname'] + ".*"}}

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

//code to get all of current users favorite foods being served 
app.get('/my_choice.html/finduserfoods', function (req, res) {
	res.writeHead(200, {'Content-Type':'text/html'});
	
	res.write("Hello");

	setTimeout(function(){res.end();}, 2000);
	
	res.write(req.url);
	res.write(" SHOUld get actual thing: ")
	var stringURL = req.url.toString()
	res.write(stringURL );
	
	stringURL = stringURL.split("=");
	stringURL = stringURL[1];
	
	stringURL  = (decodeURIComponent(stringURL));

	res.write("important bit: " + stringURL );


});


//code to add a food to the users favorites 
app.get('/my_choice.html/userprocess', function (req, res) {
	res.writeHead(200, {'Content-Type':'text/html'});
	
	res.write("Hello");
	
	//const queryObject = url.parse(req.url,true).query;
	
  	res.write(req.url);
	res.write(" SHOUld get actual thing: ")
	var stringURL = req.url.toString()
	res.write(stringURL );
	
	stringURL = stringURL.split("=");
	stringURL = stringURL[1];
	res.write(stringURL );
	
	 MongoClient.connect(userurl,{useUnifiedTopology:true},function(err, db ) {
		 
        currfood = stringURL;
        useremail = "cpekowsky@gmail.com";

            
            
            if (err) {
                console.log("Connection err: " + err);
            }
            var dbo = db.db("users");
            var coll = dbo.collection('profiles');
            //var coll = dbo.collection("profile2");
            
            var myquery = { email: useremail };
            
            var newvalues = { $push: {foods: currfood } };
            coll.updateOne(myquery, newvalues, function(err, res) {
              if (err) throw err;
              console.log("1 document updated");
             // db.close();
            });

            
    
        

            
            
            coll.find( ).toArray(function(err, items) {
                
                  if (err) {
                      res.write("Error: " + err);  
                  } 
                  
                  if( items.length == 0 ) {
                      res.write("no users.");
                  }
                  
                  else   {
                      for (i=0; i<items.length; i++) {
                          res.write("name:" + items[i].email );
                          res.write( "<br>" );

                      }
                  }
                  
                  db.close();
                  
            })
            
            
            

            /*
            
            collection.insertOne(newData2, function(err, res) {
            if(err) { console.log("query err: " + err); return; }
            console.log("new document inserted");

            }   );
            
            
            */




            
            setTimeout(function(){ db.close(); console.log("Success!");}, 1000);
        })



	
	
	
	setTimeout(function(){res.end();}, 2000);

});

app.get('/menu.html/process', function (req, res) {
	res.writeHead(200, {'Content-Type':'text/html'});
	
	//actual code for connecting to the database and printing all menus 
	
	    //actual mongo query 
    MongoClient.connect(url2, { useUnifiedTopology: true }, function(err, db) {
        if(err) { res.write("Connection err: " + err); return; }
        
        var dbo = db.db("tuftsdining");
        
        console.log(3);
        
        
        var coll = dbo.collection('menu');
        
        console.log(4);
        
        
        
        var myquery = {  };
        
        //here, the query is for things where the ticker is the same as user input
        
        coll.find( ).toArray(function(err, items) {
            
            if (err) {
                res.write("Error: " + err);  
            } 
            
            if( items.length == 0 ) {
                res.write("no foods.");
            }
            
            else   {
                
                
                //really stupid: going through this array like 30 times 
                mealarr = [];
                mealarr = ["breakfast", "Lunch", "Dinner"];
                
                
                for(var numday = 0; numday < 7; numday ++ ) {
                    
                    for(var currmeal = 0; currmeal < 3; currmeal ++) {
                        
                        for (i=0; i<items.length; i++) {
                            
                            
                            if(items[i].numdate == numday && items[i].meal == mealarr[currmeal]) {
                                res.write("hall: " + items[i].hall + " meal: " + items[i].meal + " food: " + items[i].food  + " date: " + items[i].longdate);
                                res.write( "<br>" );
                                
                            }
                            
                        }
                        
                    }                        
                    
                }
                
            }
            
            db.close();
            
        })
        
        
        
        
    });  //end connect

	
	
	
	//end of code for connecting to database and printing all menus 
	setTimeout(function(){res.end();}, 2000);
});


app.listen(port, function() {console.log("server started successfully");});

