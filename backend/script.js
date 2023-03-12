"use strict";

import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import path from "path";
import { v4 as uuid } from "uuid";
import { body, validationResult } from "express-validator";

let app = express();

// https://codingbeautydev.com/blog/javascript-dirname-is-not-defined-in-es-module-scope/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Also line 5
//

let spotifyUsers = [];

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
//

app.listen(3000, () => {
  console.log("Express is running on port 3000");
});

app.get("/signup", (req, res) => {
  res.sendFile("C:/Users/Joseph/Projects/spotify-project/public/index.html");
});


[
  body("fname", "Empty name").trim().isLength({ min: 1 }).withMessage("Enter your first name").escape(),
  body("lname", "Empty name").trim().isLength({ min: 1 }).withMessage("Enter your last name").escape(),
  body("birthday", "Invalid age").optional({ checkFalsy: true }).isISO8601().toDate(),
]


// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/forms
app.post("/submit", (req, res) => {
  const { id } = req.body;
  const data = req.body;
  spotifyUsers.push({ ...data, id: uuid() });
  res.send(`Hi ${req.body.fName} ${req.body.lName}! You haved signed up successfully!`);
  res.sendFile("C:/Users/Joseph/Projects/spotify-project/public/index.html")

});
//
// const clickSubmit = () => {
//   if(confirm("Press a button!")) {
//     alert(`Hi ${req.body.fname} ${req.body.lname}! You haved signed up successfully!`)
//   } 
// };
// clickSubmit();

app.get("/users", (req, res) => {
  res.send(spotifyUsers)
});
