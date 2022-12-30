const express = require("express")
const mongose = require("mongoose")
const User = require("../models/user.model")
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

const authRouter = express.Router();

authRouter.post('/api/signup',async (req,res)=> {
   try{
    const {name, email,profilePic} = req.body

    let user =await User.findOne({email})
   
    if(!user){
        user = new User({
            name:name,
            email:email,
            profilePic:profilePic
        })

        user = await user.save();

    }

    const token = jwt.sign({id:user._id},"passwordkey");

    res.status(200).json({user,token});

   }catch(e){

    res.status(500).json({error:e.message});

   } 
})

authRouter.get('/',auth,async (req,res)=>{
try{
    const user =await User.findById(req.user);
    res.json({user,token:req.token});
} catch(e){
    console.log(e.meaagse);
}
})

authRouter.get('/getemail',auth,async (req,res)=>{
    try{
        
        let users =await User.find({id:!req.user});
        res.status(200).json({users});

     
    } catch(e){
        console.log(e.meaagse);
    }
    })

module.exports = authRouter;