const socket = require('socket.io');

const playersId = [];

const Food = require(require('path').join(__dirname,'/modules/AppleServ.js'));

const send = {};


module.exports = (io) =>{
   io.on('connection', (socket)=>{

      socket.on('getApples', ()=>{
         for(let i = 0; i < 4; i++ ){
            socket.emit('yourApples', new Food().getPosition )
         }
      })
      

      socket.on('disconnect', ()=>{
         console.log('byebye')
      });
   });
}
