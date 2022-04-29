const fs = require('fs')
const fsp = require('fs/promises')
const path = require('path')

const guid = require(path.join(__dirname, '/modules/GUIDgen.js'))


module.exports = {
    createRoomFile({playerNumber, applesNumber, boardSize}, callback){
        const roomId = guid()
        let room = {
            playerNumber: parseInt(playerNumber),
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
                err ? reject(err) : resolve(JSON.parse(data));
            })
        })
    },

    editPlayerNumber(gameCode, value, file = null){
        let filePath = path.join(__dirname, `/../rooms/${gameCode}.json`)
        return new Promise((resolve, reject)=>{
            if(file === null){
                fsp.readFile(filePath)
                    .then(body => JSON.parse(body))
                    .then(json =>{
                        json['currentPlayer'] = value ? json['currentPlayer'] + 1 : json['currentPlayer'] - 1
                        return json
                    })
                    .then(json => JSON.stringify(json))
                    .then(body => {
                        fsp.writeFile(filePath, body)
                        resolve(true)
                    })
                    .catch(err => reject(err))  
            }else{
                let json = file;
                file['currentPlayer'] = value ? json['currentPlayer'] + 1 : json['currentPlayer'] - 1
                fsp.writeFile(filePath, JSON.stringify(file))
                    .catch(err => console.error(err))
            }
            
        })
    }
}
