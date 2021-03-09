const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Post = mongoose.model('Post')
const bcrypt = require("bcryptjs");
const jwt =require("jsonwebtoken");
const {JWT_SECRET} = require("../keys")

const requireLogin = require('../middleware/requireLogin')


router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  User.findOne({ email: email }).then((savedUser) => {
      if(savedUser){
    return res
      .status(422)
      .json({ error: "User already exists with that email" });
  }});
  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        email,
        password:hashedPassword,
        name,
      });
      user.save()
        .then((user) => {
          res.json({ message: "user saved successfully" });
        })
        .catch((err) => {
          console.log(err);
        });
    })

    .catch((err) => {
      console.log(err);
    });
});


router.post('/signin', (req, res) => {
    const {email, password} =req.body;
    if(!email || !password){
        res.status(422).json({error:'PLease add the email or password'})
        
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"invalid credentials"})
        }
        bcrypt.compare(password, savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                const token =jwt.sign({_id:savedUser._id},JWT_SECRET)
                const {_id,name,email} =savedUser
                res.json({token,user:{_id,name,email}})
              //  res.json({message:"Successfully signed in"})
            }else{
                return res.status(422).json({ error: "Invalid email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})

router.get('/myposts',requireLogin,(req,res)=>{
  Post.find({postedBy:req.user})
  .populate('PostedBy',"_id name")
  .then(mypost=>{
    res.json({mypost})
  })
  .catch(err=>{
    console.log(err)
  })
})


module.exports = router;
