var express = require("express");
var app = express();
var mongo = require("mongodb");
var bodyParser = require("body-parser");

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:true}));

var dbURL = "mongodb://localhost/oolo-test";
var db;

mongo.MongoClient.connect(dbURL, function(err, database) {
	if (err) {
		return console.err(err);
	}
	db = database;
	app.listen(3000, function() {
		console.log("Listening on port 3000");
	});
});

app.get("/login", function(req, res) {
  res.render("login");
});

app.post("/login", function(req, res) {
    var user = {"username": req.body.user, "password": req.body.password};
    console.log(user);
    db.collection("users").findOne(user, function(err, user) {
      if (user) {
        return res.send(user.username);
      }
      return res.status(401).send("Incorrect username or password");
    });
});


