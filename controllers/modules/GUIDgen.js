module.exports = function(model = 'xxxxxx', hex = "0123456789ABCDEF") {
    let str = "";
    for (let i = 0; i < model.length; i++) {
      let rnd = Math.floor(Math.random() * hex.length);
      str += model[i] === "x" ?  hex[rnd] : model[i] ;
    }
    return str.toLowerCase();
  }
