const express = require("express")
const Document = require("../models/doc.model");
const auth = require("../middleware/auth");

const documentRouter = express.Router();

documentRouter.post("/doc/create",auth,async (req,res) =>{

    try{

        const {createdAt} = req.body;

        let document = new Document({
            uid:req.user,
            title:"Untitled Document",
            createdAt,
        })

        document = await document.save();
        res.status(200).json(document);

    }catch(e){

        res.status(500).json({error:e.message});

    }

});


documentRouter.get('/docs/me',auth, async (req,res) => {

    try{

        let documents = await Document.find({uid:req.user});

        res.json(documents);

    }catch(e){
        res.status(500).json({error:e.message});
    }

})

documentRouter.get('/doc/:id',auth, async (req,res) => {

    try{

        const document = await Document.findById(req.params.id)

        res.json(document);

    }catch(e){
        res.status(500).json({error:e.message});
    }

})


documentRouter.post("/doc/titleUp",auth,async (req,res) =>{

    try{

        const {id,title} = req.body;

        const document = await Document.findByIdAndUpdate(id,{title})

        res.status(200).json(document);

    }catch(e){

        res.status(500).json({error:e.message});

    }

});


module.exports = documentRouter;