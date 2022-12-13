class Entity extends EventConstrucor{

    Identifier: Identifier

    constructor(){
        super()
        this.Identifier = {}
        this.Settings.x = 1
        this.Settings.y = 1
        this.Identifier.color = "purple"
        this.Identifier.name = "Entity"
    }
    
    setCords(x,y){
        this.Settings.x = x;
        this.Settings.y = y;
    }

    setIdentifier(idName: string, value: string):void{

        this.Identifier[idName] = value;
    }

    getCords(){
        return {
            x: this.Settings.x,
            y: this.Settings.y
        }
    }

    getIdentifier(): Identifier{

        return this.Identifier;
    }
}