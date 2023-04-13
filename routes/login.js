const express = require("express");
const fs = require("fs");

const router = express.Router();

const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/login", (req, res, next) => {
  console.log("login");
  res.send(
    `<div>
        <h1>Fill the Form</h1>
        <br />
        <form onsubmit="localStorage.setItem('username',document.getElementById('username').value)" action="/message" method="POST">
          <input id="username" type="text" name="title" />
          <br />
          <button type="submit">SUBMIT</button>
        </form>
      </div>`
  );
});

router.use("/message", (req, res, next) => {
  console.log(req.body.title);
  res.send(
    `${fs.readFileSync("./message.txt", {
      encoding: "utf8",
      flag: "r",
    })} 
      <br>
      <form action="/save" onsubmit="document.getElementById('username').value=localStorage.getItem('username')" method="POST">
      <input type="text" name="message" />
      <br/>
      <input id="username" type="hidden" name="username" />
      <br/>
      <button type="submit">SUBMIT</button></form>`
  );
});

router.use("/save", (req, res, next) => {
  console.log("final save");
  console.log(req.body.username);
  console.log(req.body.message);
  let message = `${req.body.username}:  ${req.body.message}  `;
  fs.appendFileSync("./message.txt", message);
  res.redirect("/message");
});

module.exports = router;
