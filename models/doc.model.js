const mongose = require("mongoose")

const document = mongose.Schema({

    uid:{
        required: true,
        type:String,
    },
    createdAt:{
        required:true,
        type:Number
    },
    title:{
        required: true,
        type:String,
        trim:true
    },
    contents:{
        default:[],
        type:Array,
    }


});

const Document = mongose.model('Document',document);

module.exports = Document;