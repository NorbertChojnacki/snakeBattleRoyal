const { fstat } = require('fs');
const socket = require('socket.io');

const playersId = [];

const Food = require(require('path').join(__dirname,'/modules/AppleServ.js'));
const fc = require(require('path').join(__dirname, '/configFileControler.js'))

const send = {};


module.exports = (io) =>{
   io.on('connect', socket =>{
      const params = new URLSearchParams(socket.handshake.headers.referer).get('gameCode')

      fc.isRoom(params)
         .then(json => json['playerNumber'] >= json['currentPlayer'] ? [true, json] : [false, json])
         .then(ret => {
            fc.editPlayerNumber(params, true, ret[1])
            socket.join(params)
            if(!ret[0]) socket.disconnect()
         })
         .catch(err => console.error(err))
   })
   io.on('connection', (socket)=>{
      const params = new URLSearchParams(socket.handshake.headers.referer).get('gameCode')
      socket.on('getApples', ()=>{
         for(let i = 0; i < 4; i++ ){
            socket.emit('yourApples', new Food().getPosition )
         }
      })
      

      socket.on('disconnect', ()=>{
         fc.editPlayerNumber(params, false)
      });
   });
}