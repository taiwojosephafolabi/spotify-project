'use strict';

// Imports - imports
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuid } from 'uuid';
import { body, check, validationResult } from 'express-validator';
import expressValidator from 'express-validator';
import expressSession from 'express-session';
import * as dotenv from 'dotenv'

const app = express();
dotenv.config();
// 

// Imports - require
// const express = require('express');
// const bodyParser = require('body-parser');
// const { fileURLToPath } = require ('url');
// const path = require ('path');
// const { v4: uuid } = require('uuid');
// const { body, check, validationResult } = require ('express-validator');
// const expressValidator = require ('express-validator');
// const expressSession = require ('express-session');
// require('dotenv').config()

// const app = express();
//

// Listen on port
// app.listen(3000, () => {
//   console.log('Express is running on port 3000');
// });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Express is running on port ${port}`);
});
//

// https://codingbeautydev.com/blog/javascript-dirname-is-not-defined-in-es-module-scope/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname); /* My root dir is the backend dir */ 
console.log(__filename);
//

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.urlencoded({ extended: false }));
// app.use(expressValidator());
app.use(express.static(path.join('C:/Users/Joseph/Projects/spotify-project/public')));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(expressSession({secret: 'max', saveUninitialized: false, resave: false}));
//

let spotifyUsers = [];

app.get('/signup', (req, res) => {
  res.sendFile('C:/Users/Joseph/Projects/spotify-project/public/index.html');
});

// Validation Routes
// const signupValidators = [
//   body('password').exists({checkFalsy: true}).withMessage('You must type a password'),
//   body('confirmedPassword').exists({checkFalsy: true}).withMessage('You must type a confirmation password').custom((value, {req}) => value === req.body.password).withMessage('The passwords do not match'),
// ];

/*
[
  body('fname', 'Empty name').trim().isLength({ min: 1 }).withMessage('Enter your first name').escape(),
  body('lname', 'Empty name').trim().isLength({ min: 1 }).withMessage('Enter your last name').escape(),
  body('birthday', 'Invalid age').optional({ checkFalsy: true }).isISO8601().toDate(),
]
*/
//

// const func1 = () => {
//   profileData.innerHTML = req.body
// };

// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/forms
app.post('/submit', /*...signupValidators ,*/ (req, res) => {
  const { id } = req.body;
  const data = req.body;
  spotifyUsers.push({ ...data, id: uuid() });
  // res.send(`Hi ${req.body.fName} ${req.body.lName}! You haved signed up successfully!`);
  
  // const profileData = document.createElement('p');
  // profileData.innerHTML = {...data};
  // profileData.appendChild(text)
  // res.send(document.write(spotifyUsers))
  // res.sendFile('C:/Users/Joseph/Projects/spotify-project/public/index.html')
  // let fName = document.getElementById('fName');
  // localStorage.setItem('profileData', req.body)
  // localStorage.setItem('firstName', fName)
  
  // req.assert('cPassword', 'Passwords do not match').equals(req.body.ipassword);
  // const mappedErrors = req.validationErrors(true);

  // https://www.youtube.com/watch?v=hE5zeEiVqpw&t=3s&ab_channel=Academind
  // req.check('email', 'Invalid email address').isEmail();
  // req.check('cPassword', 'Passwords do not match').equals(req.body.ipassword);

  // let errors = req.validationErrors();
  // if (errors) {
  //   req.session.errors = errors
  // }
  // res.redirect('/signup')
  res.sendFile('C:/Users/Joseph/Projects/spotify-project/public/confirmation.html');
  res.redirect('http://localhost:3000/confirm-user/:id')
});
//
// const clickSubmit = () => {
//   if(confirm('Press a button!')) {
//     alert(`Hi ${req.body.fname} ${req.body.lname}! You haved signed up successfully!`)
//   } 
// };
// clickSubmit();

app.get('/users', (req, res) => {
  res.send(spotifyUsers)
});

// const alertFunc = () => {
//   window.alert(`Hi ${req.body.fName} ${req.body}`)
// };

// Next steps
app.get('/confirm-user/:id', (req, res) => {
  // res.send(`Hi ${req.body.fName} ${req.body.lName}! You haved signed up successfully!`)
  console.log(spotifyUsers[0]);
  // alertFunc();
  res.sendFile('C:/Users/Joseph/Projects/spotify-project/public/confirmation.html')
});

app.get('/spotifyHome', (req, res) => {
  res.sendFile('C:/Users/Joseph/Projects/spotify-project/public/homepage.html')
});

app.get('/signup/:id', (req, res) => {
  res.sendFile('C:/Users/Joseph/Projects/spotify-project/public/index.html');
});

app.put('/signup/:id', (req, res) => {
  res.sendFile('C:/Users/Joseph/Projects/spotify-project/public/index.html');
});


// HTML Elements
// const form = document.getElementById('signup-form');
// const firstName = document.getAttribute('fName');
// const lastName = document.getAttribute('lName');
//

// Local Storage
// form.addEventListener('submit', function(e) {
//   e.preventDefault(); // prevent data refresh

//   const profileDataFirstName = firstName.value;
//   const profileDataLastName = lastName.value;

//   localStorage.setItem('first-name', profileDataFirstName);
//   localStorage.setItem('last-name', profileDataLastName);
// })
//

