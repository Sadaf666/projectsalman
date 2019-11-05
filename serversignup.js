const port = 8080; //only for server.
const express = require("express"); //only for server.
const app = express(); //only for server.
const mongoose = require("mongoose"); //requiered to connect to mongodb.
var bodyParser = require("body-parser");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
mongoose.connect(
  "mongodb://localhost:27017/sdata", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  },
  err => {
    /*connection set to mongodb*/
    if (err) {
      console.log("Problem in connecting to mongoDB", err);
    } else {
      console.log("Connection successfull to mongoDB");
    }
  }
);

app.get("/", (req, res) => res.send("Hello World sorry!"));

let route = require("./routes")(app);
app.listen(port, () => console.log(`Example app listening on port ${port}!`)); //only for server.