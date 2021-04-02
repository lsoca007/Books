const express = require("express"); // the library we will use to handle requests
const mongodb = require("mongodb"); // load mongodb
const port = 8000; // port to listen on
const mongoose = require("mongoose");

const app = express(); // instantiate express
app.use(require("cors")()); // allow Cross-domain requests
app.use(require("body-parser").json()); // automatically parses request data to JSON

// make sure in the free tier of MongoDB atlas when connecting, to
// select version 2.2.* as the node.js driver instead of the default 3.0
// put your URI HERE ⬇
//const uri = "mongodb+srv://OurDatabaseOurDatabase@bookscript.qxdhz.mongodb.net/Books"; // put your URI HERE
const uri = "mongodb+srv://JoseSerpa:sLsmIoJCMNgsMgr9@bookscript.qxdhz.mongodb.net/BackUp?retryWrites=true&w=majority";
// connect to your MongoDB database through your URI. 
// The connect() function takes a uri and callback function as arguments.
mongodb.MongoClient.connect(uri, (err, client) => {
  // connect to your specific collection (a.k.a database) that you specified at the end of your URI (/database)
  const bookCollection = client.db("BackUp").collection("BooksPart2");
  const userCollection = client.db("BackUp").collection("Users");
  const authorCollection = client.db("BackUp").collection("Authors");

  // Responds to GET requests with the route parameter being the book id.
  // Returns with the JSON data about the user (if there is a user with that username)
  // Example request: https://mynodeserver.com/myusername
  app.route('/search/:theRequest').get((req, res) => {
    // search the database (collection) for all users with the `id` field being the `id` route paramter
    
    var minStars;
    var sort = "";
    var sortOrder;
    var genre1 = "";
    var bestSeller = false;
    var query = new Object();
    if(req.params.theRequest === "ALL"){
      minStars = 0;
      sort = "title";
      sortOrder = 1;
      genre1 = "ALL";
    }else{
      minStars = parseInt(req.params.theRequest.substr(0,1));
      switch(req.params.theRequest.substr(1,3)){
        case "TIT":
          sort = "title";
          break;
        case "AUT":
          sort = "author";
          break;
        case "VAL":
          sort = "price";
          break;
        case "RAT":
          sort = "averageRating";
          break;
        case "DAT":
          sort = "release";
          break;
        default:
          sort = "title";
          break;
      }
      if(req.params.theRequest.substring(4,5) === "1"){
        sortOrder=1;
      }else{
        sortOrder=-1;
      }
      if(req.params.theRequest.substring(5,6) === "1") bestSeller = true;
      genre1 = req.params.theRequest.substring(6);

    }
    query.averageRating = {$gte:minStars};
    if(bestSeller === true) query.topSeller = bestSeller;
    if(genre1 !== "ALL")query.genre = genre1;
    bookCollection.find(query).sort({[sort]:sortOrder}).toArray((err, docs) => {  //toArray
      if (err) {
        // if an error happens
        res.send("Error in GET req.");
      } else {
        // if all works
        res.send(docs); // send back all books found with the matching id.
      }
    });

  });
  app.route('/book/:theRequest').get((req, res) => {    
    
    bookCollection.find({"_id": mongodb.ObjectID(req.params.theRequest)}).toArray((err, docs) => {
      if (err) {
        res.send("Error in GET req.");
      } else {
        res.send(docs); 
      }
    });

  });
  app.route('/author/:theRequest').get((req, res) => {    
    
    authorCollection.find({"name": req.params.theRequest}).toArray((err, docs) => {
      if (err) {
        res.send("Error in GET req.");
      } else {
        res.send(docs); 
      }
    });

  });
  app.route('/user/:userName/:theRequest').get((req, res) => {
    // search the database (collection) for all users with the `id` field being the `id` route paramter
    
    
    if(req.params.theRequest === "shoppingCart"){
      userCollection.find({"Username": req.params.userName}).toArray((err, docs) => {  //toArray
        if (err) {
          // if an error happens
          res.send("Error in GET req.");
        } else {
          // if all works
          res.send(docs); // send back all books found with the matching id.
        }
      });
    }
    

  });

    // if someone goes to base route, send back they are home.
    app.route('/').get((req, res) => {
      res.send("You are home 🏚.");
    });
  });

  // listen for requests
  var listener = app.listen(port, () => {
    console.log("Your app is listening on port " + listener.address().port);
  });
//});


// Api Example
/*
var book = require('./BookInfo');
var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors());


app.route('/api/books').get((req, res) => {
  res.send({
    books: [{ ID: '1' }, {Title: 'Harry Potter, Half Blood Prince.'}, {Author: 'JK Rowling'}, 
    {Ratingarr: ['Rohan ', 5]}, {Price: 6.98}, {Genre: 'Suspense'}, {Publisher: 'Scholastic'}, {ReleaseInfo: 'June 26, 1997'}],
  })
})

app.route('/api/books/:name').get((req, res) => {
  const requestedBookName = req.params['name'];
  res.send({name: requestedBookName})
  })

const bodyParser = require('body-parser')                      //posting an object at endpoint
app.use(bodyParser.json())
  app.route('/api/books').post((req, res) => {
  res.send(201, req.body)
  })

app.route('/api/books/:name').put((req, res) => {                 //changing object at endpoint
  res.send(200, req.body)
})

app.route('/api/books/:name').delete((req, res) => {              // deleting object at endpoint
  res.sendStatus(204)
}) 

app.listen(8000, function () {
  console.log("Listening to port 8000!");
});
*/




/*
var log = function(req, res, next){ // Declaring a function
  console.log('Inside Server!');
  next();
}
*/