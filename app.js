const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT=5000
require('./models/user');
require('./models/post');
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))



mongoose.connect("mongodb://localhost:27017/clone", {
  useNewUrlParser: "true",
  useUnifiedTopography: "true",
})
mongoose.connection.on("error", err => {
  console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected")
})
app.get('/',(req,res) => {
    res.send('hello world')
});
app.listen(PORT,()=>{
    console.log('listening on port',PORT);
})