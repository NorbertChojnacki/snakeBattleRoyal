class Entity{
    modifier
    value

    Config = {}
    Settings = {}
    Stats = {}

    constructor(){
        this.Stats.x = 1
        this.Stats.y = 1
        this.Stats.color = "purple"
        this.Stats.name = "Entity"
    }

    setCords(x,y){
        this.Stats.x = x;
        this.Stats.y = y;
    }

    getCords(){
        return {
            x: this.x,
            y: this.y
        }
    }

    setEffect(modifier, value){
        
        this.modifier = modifier;
        this.value = value;
    }
}

class Fruits extends Entity{

    constructor(){

        super();
        this.color = "red";
        this.name = "Apple";
    }
}

class Apple extends Fruits{

    constructor(){

        super();
        this.color = "red";
        this.name = "Apple";
        this.setEffect("bodyLength", 1);
    }
}

class Snake extends Entity{

    moveX = 1
    moveY = 1
    direction = "x"
    body = []

    constructor(){
        
        super();
        this.color = "purple";
        this.name = "snake";
    }

    changeDirection(code){

        switch(code){
            case 37:
                this.moveX = -1;
                this.direction = "x";
                break;
            case 38:
                this.moveY = -1;
                this.direction = "y"
                break;
            case 39:
                this.moveX = 1;
                this.direction = "x";
                break;
            case 40:
                this.moveY = 1;
                this.direction = "y"
                break;
        }
    }

    newPosition(){
        
        let newX = this.x + (this.direction == "x" ? this.moveX : 0);
        let newY = this.y + (this.direction == "y" ? this.moveY : 0);

        this.setCords(newX, newY);
    }

}