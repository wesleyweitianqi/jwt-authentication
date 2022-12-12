require('dotenv').config();
const {ACCESS_TOKEN_SECRET, REFRESH_TOKEN} = process.env
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
const posts = [
  {
    username: "wesley",
    title: "post 1",
  },
  {
    username: "Jenny",
    title: "post 2"
  },
];

app.get("/posts", (req, res)=> {
  res.json(posts)
})

app.get("/login", (req, res)=> {
  const username = req.body.username;
  const user = {username : username};
  const accessToken = jwt.sign(user, ACCESS_TOKEN_SECRET);

  res.json({accessToken:accessToken});
})

app.listen(3000, ()=> {
  console.log("Server is listening to port 3000")
});
