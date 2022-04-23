const unit = 10;

module.exports = class Food{
    constructor(){
      this.x = this.positionGen()
      this.y = this.positionGen()
   }

   positionGen(){
      return Math.floor(Math.random() * 10)*unit;
   }

   get getPosition(){
      return {x: this.x, y: this.y}
   }
}