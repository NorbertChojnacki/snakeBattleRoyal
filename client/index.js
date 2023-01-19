const express = require("express");
const https = require('https')
const http = require('http')
const path = require('path');

const app = new express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "/views"));

app.get('/', (req,res)=>{
    res.render('index.ejs');
})

let server = http.createServer(app);

const PORT = process.env.CLIENT_PORT || 8080;
const HOST = process.env.CLIENT_HOST || "127.0.0.1";

server.listen(PORT, HOST, ()=>{
    console.log(`Client server is listening on: \n
    PORT: ${PORT}\n
    HOST: ${HOST}`);
})