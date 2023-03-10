"use strict";

import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';
import path from "path";
import { v4 as uuid } from "uuid";

let app = express();

// https://codingbeautydev.com/blog/javascript-dirname-is-not-defined-in-es-module-scope/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Also line 5
//

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.listen(3000, () => {
  console.log("Express is running on port 3000")
});

app.get("/signup", (req, res) => {
  res.sendFile("C:/Users/Joseph/Projects/spotify-project/public/index.html")
});