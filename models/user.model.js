const mongose = require("mongoose")

const userSchema = mongose.Schema({

    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true, 
    },
    profilePic:{
        type:String,
        required:true  
    }

})

const User = mongose.model("User", userSchema)

module.exports = User;