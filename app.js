//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
var request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");

});

app.post("/", (req, res) => {

  var fName = req.body.fName;
  var lName = req.body.lName;
  var email = req.body.email;
  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fName,
          LNAME: lName
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us20.api.mailchimp.com/3.0/lists/deb3eba978",
    method: "POST",
    headers: {
      "Authorization": "VoiiDz 781c5b741084ce6c29209d1ca8cb077e-us20"
    },
    body: jsonData
  };

  request(options, (error, response, body) => {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });
});

app.post("/failure", (req, res) => {
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("server started, port: 3000");
});

// API key
// 781c5b741084ce6c29209d1ca8cb077e-us20

// List ID
// deb3eba978
