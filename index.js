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

app.get("/posts", authenticateToken,  (req, res)=> {
  console.log(req.user)
  res.json(posts.filter(post => post.username === req.user.name))
})

app.post("/login", (req, res)=> {
  const username = req.body.username;
  const user = {name : username};
  const accessToken = jwt.sign(user, ACCESS_TOKEN_SECRET);

  res.json({accessToken:accessToken});
})

function authenticateToken(req, res, next) {
  const authHeader = req.headers['Authorization']
  console.log(authHeader)
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user)=> {
    if (err) return res.sendStatus(403);
    req.user = user;
    next()
  })
}
app.listen(3000, ()=> {
  console.log("Server is listening to port 3000")
});
