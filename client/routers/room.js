const express = require('express');
const path = require('path');
const checkRoom = require(path.join(__dirname, '../database/checkRoom.js'));

const room = express.Router();

room.use('/:roomID', checkRoom);room.use(express.json());

room.get('/:roomID', (req,res,next)=>{
    res.status(200).send('You are in room');
})



//* Room error handler
room.use((err, req, res, next) => {

    let code = 500;
    let message = "Room server error";

    if(err.message === '404'){
        code = 404;
        message = "Game not found"
    }

    console.log(err);

    res.status(code).render('error', {code, message});
})

module.exports = room;