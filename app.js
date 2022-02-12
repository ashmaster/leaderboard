const express = require('express')
const userRouter = require('./routers/leaderboard')
const port = process.env.PORT||3001
require('./db/db')
var bodyParser = require('body-parser')

const app = express()
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());
app.use(express.json())
app.use(userRouter)
app.listen(port, () => {
    console.log(`Server running on ${port}`)
})