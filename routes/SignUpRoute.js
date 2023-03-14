
const express = require('express');
const saveUser = require('../controllers/SignUp/saveUser');
const User = require('../models/users');
const Model = require('../models/model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const app = express();

const router = express.Router();

var bodyParser = require("body-parser");
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
require('dotenv').config();

router.post("/",async (req,res)=>{
    // console.log("check if", req.body)

    var data = {
        userType: req.body.userType,
        email : req.body.email,
        password:req.body.password
    }
    if(data.userType && data.email){
        let emailCheck = await User.findOne({email:data.email})
        // console.log(emailCheck)
        if(data.userType === "User" && !emailCheck){
            
            if (data.password === req.body.confirmPassword) {
       
                data.password = await bcrypt.hash(data.password,12)
                
                const response =await saveUser(data)
                const token = jwt.sign({ userID: response._id }, process.env.SECRET_KEY, { expiresIn: '5d' })
                const response1 = await User.findOne({email:data.email},{password:0,verifyToken:0,favourites:0, bookings:0,verified:0}) 
              
            
                res.json({message:"Success", token:token, credentials:response1})
             
          } else {
            res.send("Passwords and Confirm Password must match");
          }
                    
                }
                
            
          

    
        else{
           res.json({message:"Email already exists"})
        }
       
     
    }
    else{
        res.send("All fields are required")
    }
    
})

module.exports = router;