const express = require("express");

const app = new express();

app.get('/', (req,res)=>{
    res.send('Main page');
})

app.get('/game/:roomID/:action', (req,res)=>{
    
})