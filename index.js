const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));

const todoRoutes = require("./routes/todos");

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.use("/api/todos", todoRoutes);

app.listen(3000, () => console.log(`App is running on port 3000`));
