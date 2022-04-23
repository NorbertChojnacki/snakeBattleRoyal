const fs = require('fs')
const path = require('path')

const guid = require(path.join(__dirname, '/modules/GUIDgen.js'))

module.exports = {
    createRoomFile({playerNumber, applesNumber, boardSize}, callback){
        const roomId = guid()
        let room = {
            playerNumber,
            applesNumber,
            boardSize,
            currentPlayer: 0
        }
        fs.writeFileSync(path.join(__dirname, `/../rooms/${roomId}.json`), JSON.stringify(room), {encoding:'utf-8'})
        callback(roomId)
    },

    isRoom(gameCode){
        return new Promise((resolve, reject)=>{
            fs.readFile(path.join(__dirname, `/../rooms/${gameCode}.json`), (err, data)=>{
                err ? reject(err) : resolve(data);
            })
        })
    }
}
