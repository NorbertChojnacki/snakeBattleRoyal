class EntitiesManager extends EventConstrucor{

    Board: GameBoard

    EventList = {}

    constructor(){

        super();
    
        document.addEventListener('keydown', event =>{

            this.callAllEntitiesEvent("keyboardUse", {code: event.keyCode});
        });

        this.setEvent("moveEntity", function(GameSettings, GameConfig, {entity, event, eventName, index}){
            
            
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

            if(oldCords.x != newCords.x || oldCords.y != newCords.y){// walking and interaction block
                entity.executeEvent("walk", this.Settings, this.Config, {newCords})

                if(this.Board[entity.Settings.x][entity.Settings.y] !== undefined && this.Board[entity.Settings.x][entity.Settings.y].Identifier.id !== entity.Identifier.id){

                    this.executeEvent("collision", this.Settings, this.Config, {
                        home: this.Board[entity.Settings.x][entity.Settings.y],
                        visitor: entity
                    })

                    this.Board[entity.Settings.x][entity.Settings.y].executeEvent("hit", this.Settings, this.Config, {
                        visitor: entity
                    })

                    entity.executeEvent("touch", this.Settings, this.Config, {
                        home: this.Board[entity.Settings.x][entity.Settings.y]
                    })
                }

                this.executeEvent("moveEntity", this.Settings, this.Config, {
                    event,
                    entity,
                    eventName,
                    index
                })
            }


        });
    }

    updatePositionOnBoard(eventName, oldPos, newPos, entity, index){
        this.Board[oldPos.x][newPos.y] = undefined;
        this.Board[newPos.x][newPos.y] = entity;
        this.EventList[eventName][index].x = newPos.x
        this.EventList[eventName][index].y = entity.Settings.y
    }


}