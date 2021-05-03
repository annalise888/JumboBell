/*
//takes in the name of the user 

finds all of there foods, and then finds all the foods 

in the foods database that match those foods.

*/
var http = require('http');
var port = process.env.PORT || 3000;


const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const userurl = 'mongodb+srv://unellu01:aaa@cluster0.trnuo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const foodsurl = "mongodb+srv://user1:caleb@cluster0.0y4mi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"



http.createServer(function (req, res) {

    getusersfoods("cpekowsky@gmail.com");

    
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("Uploading user foods app");
    res.write("<br>")


    function getusersfoods(useremail) {
        
        useremail = "cpekowsky@gmail.com";
        
        MongoClient.connect(userurl,{useUnifiedTopology:true},function(err, db ) {
            
            
            if (err) {
                console.log("Connection err: " + err);
            }
            var dbo = db.db("users");
            var coll = dbo.collection('profiles');
            //var coll = dbo.collection("profile2");
            
            var myquery = { email: useremail };
                        
            coll.find( myquery ).toArray(function(err, items) {
                
                  if (err) {
                      res.write("Error: " + err);  
                  } 
                  
                  if( items.length == 0 ) {
                      res.write("no user of this email found");
                  }
                  
                  else   {
                      
                      var foods = items[0].foods;
                      
                      for(var i = 0; i < foods.length; i++ ) {
                          res.write(foods[i]);
                          getfoods(foods[i] );
                      }
                      
                  }
                  
                  db.close();
                  
            })

            
    

            
            setTimeout(function(){ db.close(); console.log("Success!");}, 1000);
        })

        
    }
    
    
    
    function getfoods(foodName ) {
                
        MongoClient.connect(foodsurl,{useUnifiedTopology:true},function(err, db ) {
            
            var dbo = db.db("tuftsdining");
            var coll = dbo.collection("menu");

            
            
            if (err) {
                console.log("Connection err: " + err);
            }
            
            var query = {food:{$regex : ".*" + foodName + ".*"}}
    
            var sendstring = "";
            
            coll.find(query).toArray(function(err,items) {
                if (err) {
                   res.write("Error: " + err);
                } else if (items.length == 0) {
                    res.write("No food being served with that name.");
                } else {
                    for (i=0; i < items.length; i++) {
                        res.write("user food: " + foodName + " served food: " + items[i].food + " is being served at " + items[i].hall + " on " + items[i].longdate + "<br>");
                        sendstring += (items[i].food + " is being served at " + items[i].hall + " on " + items[i].longdate + " \n") ;
                        //console.log(sendstring);
                    }
                }
                
                //res.write(sendstring);

            })
            
        




        
        setTimeout(function(){ db.close(); console.log("Success!");}, 1000);
    })

        
    }
    






}).listen(8080);


