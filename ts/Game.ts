class Game extends EventConstrucor{

    Board: Board

    EventList = {}

    constructor(){

        super();
        this.setOption("boardSize", 20, 0,20);
        this.addBoard();
        this.setOption("gridSize", 10, 10, 10);

        document.addEventListener('keydown', event =>{

            this.callAllEntitiesEvent("keyboardUse", {code: event.keyCode});
        });

        this.setEvent("moveEntity", function(GameSettings, GameConfig, {entity, event, eventName, index}){
            
            this.Board[event.x][event.y] = undefined;
            this.Board[entity.Settings.x][entity.Settings.y] = entity;
            this.EventList[eventName][index].x = entity.Settings.x
            this.EventList[eventName][index].y = entity.Settings.y
            return GameSettings;
        });
    }

    addEntity(entity: Entity){

        this.Board[entity.Settings.x][entity.Settings.y] = entity;

        let events = Object.keys(entity.EventBox);

        events.forEach(eventName =>{

            if(!Object.keys(this.EventList).includes(eventName)) this.EventList[eventName] = new Array();

            this.EventList[eventName].push({
                identifier: entity.Identifier,
                x: entity.Settings.x,
                y: entity.Settings.y
            })
        })
    }

    addEntities(entities: Array<Entity>){

        entities.forEach(entity => {
            this.addEntity(entity);
        });
    }

    addBoard(){

        this.Board = new Array(this.Settings.boardSize);
        for(let i = 0; i < this.Settings.boardSize; i++)
            this.Board[i] = new Array(this.Settings.boardSize).fill(undefined);
    }

    callAllEntitiesEvent(eventName, others){

        this.EventList[eventName].forEach((event,index)=>{

            let entity = this.Board[event.x][event.y]
            let oldCords = entity.getCords();
            
            entity.executeEvent(eventName, this.Settings, this.Config, others);
            let newCords = entity.getCords();

            if(oldCords.x != newCords.x || oldCords.y != newCords.y)
                entity.executeEvent("walk", this.Settings, this.Config, {newCords})

            if(this.Board[entity.Settings.x][entity.Settings.y] !== undefined && this.Board[entity.Settings.x][entity.Settings.y].Identifier.id !== entity.Identifier.id){

                this.executeEvent("collision", this.Settings, this.Config, {
                    home: this.Board[entity.x][entity.y],
                    visitor: entity
                })

                this.Board[entity.x][entity.y].executeEvent("hit", this.Settings, this.Config, {
                    visitor: entity
                })

                entity.executeEvent("touch", this.Settings, this.Config, {
                    home: this.Board[entity.x][entity.y]
                })
            }

            this.executeEvent("moveEntity", this.Settings, this.Config, {
                event,
                entity,
                eventName,
                index
            })
            
        });
    }



    // isEndGame(){
    //     this.callAllEntitysEvent("endGame", {});
    //     return true;
    // }

    // generateEntity(entityName:string, i: number, j: number){

    //     if(!Object.keys(this.Basket).includes(entityName)) return;

    //     let newentity = new this.Basket[entityName]();
    //     newentity.setCords(i, j);
    //     this.addentity(newentity);
        
    // }
}