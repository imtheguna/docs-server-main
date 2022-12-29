//imports
const express = require("express");
const mongose = require("mongoose")
const cors = require("cors")
const http = require("http");
const authRouter = require("./routes/authRoutes");
const documentRouter = require("./routes/docRoutes");
const Document = require("./models/doc.model");

const PORT = process.env.PORT | 3001
const app = express()
const DB = 'mongodb+srv://guna:csg00109@cluster0.zx1yzv6.mongodb.net/?retryWrites=true&w=majority'
const server = http.createServer(app)
const io = require("socket.io")(server)


mongose.connect(DB).then(()=>{console.log('DB Connected')}).catch((err) => console.log(err))

io.on('connection',(socket) => {

    console.log("Server Connected "+socket.id);
    socket.on('join',(documentId) => {
        socket.join(documentId);
        console.log('Joined')
    });
    socket.on('typing',(data)=>{
        socket.broadcast.to(data.room).emit("changes",data);
    });

    socket.on('save',(data)=>{
        saveData(data);
       
    });
});

const saveData = async (data)=>   {
 
    let document = await Document.findById(data.docId);
    document.contents = data.delta;
    document = await document.save();
}

app.use(cors())
app.use(express.json())
app.use(authRouter)
app.use(documentRouter);

server.listen(PORT, "0.0.0.0",()=> {
    console.log(`Connected Port Number - ${PORT}`)
} )


