const express = require("express");
const https = require('https')
const http = require('http')
const path = require('path');
const roomRouter = require(path.join(__dirname, "/routers/room.js"));
const newRoom = require(path.join(__dirname, '/database/newRoom.js'));

const app = new express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "/views"));
app.use(express.json());
app.use(function(req,res,next){
    if( res.locals.err !== undefined) throw new Error(res.locals.err);
    next();
})

app.get('/', (req,res)=>{
    res.render('index.ejs');
})

app.post('/newGame', newRoom, (req,res,next)=>{
    res.status(201).send(`new Game created ${res.locals.roomID}`);
})

app.use('/room', roomRouter);


//* 404 handler
app.use((req, res, next) => {
    res.status(404).render('error', {code:404, message: "Page not found"});
})

//* respond to client
app.use((err,req,res,next)=>{

    let code = 500;
    let message = "Server error";

    if(err.message === '404' || res.locals.err){
        code = 404;
        message = "Page not found"
    }

    console.log(err);

    res.status(code).render('error', {code, message});
})


let server = http.createServer(app);

const PORT = process.env.CLIENT_PORT || 8080;
const HOST = process.env.CLIENT_HOST || "127.0.0.1";

server.listen(PORT, HOST, ()=>{
    console.log(`Client server is listening on: \n
    PORT: ${PORT}\n
    HOST: ${HOST}`);
})