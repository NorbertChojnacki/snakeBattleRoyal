const axios = require('axios');

module.exports = function (req,res,next){

    let data = {
        title: req.body.title,
        options: req.body.options
    }

    axios.post(`http://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/rooms`, data)
        .then(response=>{
            res.locals.roomID = response.data.id;
            next();
        })
        .catch(err=>{
            console.log(err);
            res.locals.err = 500
            next();
        })
}