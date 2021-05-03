/*
//takes in the name of the user 

takes in name of user 

adds current food to that users array of foods 

*/

/*


var http = require('http');
var port = process.env.PORT || 3000;


const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const userurl = 'mongodb+srv://unellu01:aaa@cluster0.trnuo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'



http.createServer(function (req, res) {

    uploaduserfood("Beef", "unnathy5109@gmail.com");

    
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("Uploading user foods");
    res.write("<br>")


    function uploaduserfood(currfood, useremail) {
        
        currfood = "Rice";
        useremail = "cpekowsky@gmail.com";
        
        
        MongoClient.connect(userurl,{useUnifiedTopology:true},function(err, db ) {
            
            
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
            
            
        


            
            setTimeout(function(){ db.close(); console.log("Success!");}, 1000);
        })

        
    }




}).listen(8080);

*/
