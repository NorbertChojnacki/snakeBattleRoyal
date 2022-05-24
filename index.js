const express = require('express');
const path = require('path')
// const player = require(path.join(__dirname, '/controllers/modules/SnakeServ.js'));
// const Food = require(require('path').join(__dirname,'/modules/AppleServ.js'));
const fc = require(path.join(__dirname, '/controllers/configFileControler.js'));
const guid = require(path.join(__dirname , '/controllers/modules/GUIDgen.js'))
const multer = require('multer')
const upload = multer()

const http = require('http');
const fs = require('fs')
const socket = require('socket.io');
const session = require('express-session')

const app = express()
app.use(express.urlencoded({extended:true}))
app.use('/assets', express.static(__dirname + '/assets'))
app.set('view engine', 'ejs')
app.use(session({secret: 'secret', resave: false, saveUninitialized: false, unset:'destroy', cookie:{maxAge:10000}}))

let server = http.Server(app)
let io = socket(server)

const player = new Object();
function gameCheckRequest(req, res, next){
   if (!['create', 'join','snake'].includes(req.params.game)) res.status(400).end()
   next()
}

function gameCreate(req,res,next){
   if(req.params.game === 'create'){
      fc.createRoomFile(req.body, gameCode =>{
         res.locals.gameCode = gameCode
      })
   } 
   next()
}

function snakeCreate(req,res,next){
   if(req.params.game === 'snake'){
      Object.assign(player, {
         id: guid('xxxxx'),
         name: req.body.snakeName,
         color: req.body.snakeColor
      })
      res.status(200).end()
   }else{
      next()
   }
}

function gameCheckCode(req, res, next){
   fc.isRoom(req.query?.gameCode).then(room=>{
         res.locals.room = room
         next() 
      }).catch(err=>{
          res.send('ooops invalid gameCode or its missing')
      })     
}

function joinGame(req, res, next){
   if(req.params.game === 'join') res.locals.gameCode = req.body.joinGameCode;
   next()
}

/* get requset handler */
app.get('/', (req, res) => {
   res.render('index', {randomColor: `#${guid()}`});
});
/* ------------------------------- */

app.get('/snake',gameCheckCode, (req,res)=>{
   let player = req.session.player
   res.render('game')
})

/* post request handler*/
let mid = [gameCheckRequest,snakeCreate, gameCreate, joinGame]
app.post('/game/:game',upload.none(), mid, (req,res)=>{
   res.redirect(`/snake?&gameCode=${res.locals.gameCode}`)
});
/* ------------------------------- */

app.get('/*', (req,res)=>{
   res.redirect('/')
})

io.use((socket, next)=>{
   const param = new URLSearchParams(socket.handshake.headers.referer).get('gameCode')
   socket.data.gameCode = param
   socket.join(param)
   fc.isRoom(socket.data.gameCode)
      .then(json => json['playerNumber'] >= json['currentPlayer'] ? [true, json] : [false, json])
      .then(ret => {
         fc.editPlayerNumber(socket.data.gameCode, true, ret[1])    
         socket.data.player = player  
         if(!ret[0]) socket.disconnect()
      })
      .catch(err => console.error(err))

   next()
})

io.on('connect', socket =>{
      io.in(socket.data.gameCode).emit('new_player')
})
io.on('connection', (socket)=>{
   // socket.on('getApples', ()=>{
   //    for(let i = 0; i < 4; i++ ){
   //       socket.emit('yourApples', new Food().getPosition )
   //    }
   // })
   // socket.on('hello', ()=>{
   //    io.in(params).emit('player_info', player)
   // })
   
   socket.on('new_player', ()=>{
      io.to(socket.data.gameCode).emit('check', player.name)
   })

   socket.on('disconnect', ()=>{
      fc.editPlayerNumber(socket.data.gameCode, false)
         .then(data=>{ if(data.currentPlayer === 0) fc.removeRoomFile(params)})
         .catch(err => console.error(err))
   });
});

server.listen(8080, '127.0.0.1');
console.log(`listening: 127.0.0.1, on port: 8080`);