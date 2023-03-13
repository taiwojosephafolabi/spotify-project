"use strict";

//Imports
import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import path from "path";
import { v4 as uuid } from "uuid";
import { body, check, validationResult } from "express-validator";

const app = express();
//

// Listen on Port 3000
app.listen(3000, () => {
  console.log("Express is running on port 3000");
});
//

// https://codingbeautydev.com/blog/javascript-dirname-is-not-defined-in-es-module-scope/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Also line 6
//

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join("C:/Users/Joseph/Projects/spotify-project/public")));
app.use(express.static(path.join("C:/Users/Joseph/Projects/spotify-project/img")));
//

let spotifyUsers = [];

app.get("/signup", (req, res) => {
  res.sendFile("C:/Users/Joseph/Projects/spotify-project/public/index.html");
});

// Validation Routes
const signupValidators = [
  body('password').exists({checkFalsy: true}).withMessage('You must type a password'),
  body('confirmedPassword').exists({checkFalsy: true}).withMessage('You must type a confirmation password').custom((value, {req}) => value === req.body.password).withMessage("The passwords do not match"),
];

/*
[
  body("fname", "Empty name").trim().isLength({ min: 1 }).withMessage("Enter your first name").escape(),
  body("lname", "Empty name").trim().isLength({ min: 1 }).withMessage("Enter your last name").escape(),
  body("birthday", "Invalid age").optional({ checkFalsy: true }).isISO8601().toDate(),
]
*/
//

// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/forms
app.post("/submit", ...signupValidators, (req, res) => {
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
