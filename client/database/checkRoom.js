const axios = require('axios');

module.exports = function(req,res,next){

    const roomID = req.params.roomID;
    
    axios.get(`http://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/rooms/${roomID}`)
    .then(response=>{
        if(response.data == {} || response.data.id !== roomID) res.locals.err = 404;
        next();
    })
    .catch(err=>{
        console.log(err);
        res.locals.err = 500;
        next()
    })
}