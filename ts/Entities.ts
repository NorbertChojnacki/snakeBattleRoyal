class Entity{
    modifier: string
    value: number

    Config: Config
    Settings: Settings
    Stats: Stats

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
            x: this.Stats.x,
            y: this.Stats.y
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
        this.Stats.color = "red";
        this.Stats.name = "Apple";
    }
}

class Apple extends Fruits{

    constructor(){

        super();
        this.Stats.color = "red";
        this.Stats.name = "Apple";
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
        this.Stats.color = "purple";
        this.Stats.name = "snake";
    }

    changeDirection(code){

        switch(code){
            case 37:
                this.Stats.moveX = -1;
                this.Stats.direction = "x";
                break;
            case 38:
                this.Stats.Stats.moveY = -1;
                this.Stats.Stats.direction = "y"
                break;
            case 39:
                this.Stats.Stats.moveX = 1;
                this.Stats.Stats.direction = "x";
                break;
            case 40:
                this.Stats.Stats.moveY = 1;
                this.Stats.Stats.direction = "y"
                break;
        }
    }

    newPosition(){
        
        let newX = this.Stats.x + (this.Stats.direction == "x" ? this.Stats.moveX : 0);
        let newY = this.Stats.y + (this.Stats.direction == "y" ? this.Stats.moveY : 0);

        this.setCords(newX, newY);
    }

}