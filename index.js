const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const mongoose = require("mongoose");

const PORT = 6001;

mongoose
  .connect("mongodb://127.0.0.1:27017/Test_project")
  .then(() => console.log("Connnected to MongoDb"))
  .catch((err) => console.log("There is some error : ", err));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contact: {
    type: Number,
    required: true,
    unique: true,
  },
});

const User = mongoose.model("myModel", UserSchema);

app.get("/", (req, res) => {
  res.send("working");
});

app.get("/all", (req, res) => {
  res.sendFile(path.join(__dirname, "public/all.html"));
});

app.get("/data", async (req, res) => {
  const allUser = await User.find({});
  const data = allUser.map((user) => user);
  res.json(data);
});

app.get("/services", (req, res) => {
  res.sendFile(path.join(__dirname, "public/form.html"));
});

app.post("/Createuser", async (req, res) => {
  await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    contact: req.body.contact,
  })
    .then(() => {
      console.log(req.body);
      res.sendFile(__dirname + "/public/success.html");
      res.status(201);
    })
    .catch((err) => {
      if (err.code == 11000) {
        res.send("Either email or Contact no. already exist <br>" + err);
      } else {
        res.send("Unknown Error....");
      }
      console.log(err);
    });
});

app.get("/deleteUser/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.send("success");
});

app.listen(PORT, () => console.log(`Listning on http://localhost:${PORT}`));
