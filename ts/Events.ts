
const EventName = [
    "touch", "keyboardUse", "endGame"
]

class EventConstrucor{

    Settings: Settings
    Config: Config
    EventBox: EventBox

    setEvent(eventName: string, eventFunction: EventFunction){

        Object.assign(this.EventBox, {[eventName]: eventFunction});
    }
    executeAllEvents(GameSettings: Settings, GameConfig: Config, others: EventFunctionOthers){

        for (const eventName of this.EventBox) 
            this.executeEvent(GameSettings, GameConfig, eventName, others)
    }

    executeEvent(GameSettings: Settings, GameConfig: Config, eventName: string, others: EventFunctionOthers){

        if(!Object.keys(this.EventBox).includes(eventName)) return;
        let eventFunction: EventFunction = this.EventBox[eventName];
        eventFunction(GameSettings, GameConfig, others);
    }
}

class EventsManager{

    Settings: Settings
    Config: Config
    EventBox: EventBox
    Basket = {}

    keyboardMonitor(callback){
  
        window.addEventListener('keydown', e=>{
            
            let others = {
                code: e.keyCode
            }
            this.callAllFruitsEvent("keyboardUse", others);
            callback(e.keyCode);
        });
    }

    settingsModify(fruit){

        let modifier = fruit.modifier;
        let value = fruit.value;
        let Settings = this.Settings;
        let Config = this.Config;

        let tmpValue = Settings[modifier] + value;

        if(tmpValue >= Config[`${modifier}Min`] && tmpValue <= Config[`${modifier}Max`]){

            if(Object.keys(fruit.Events).includes("touch")) fruit.Events.touch(Settings, Config, {fruit: fruit});
            this.Settings[modifier] = tmpValue;
        }
    }

    callAllFruitsEvent(eventName, others = {}){

        for (const fruitName of Object.keys(this.Basket))
            this.callFruitEvent(fruitName, eventName, others);
    }

    callFruitEvent(fruitName, eventName, others = {}){
        
        if(!Object.keys(this.Basket).includes(fruitName)) return;

        let newFruit = new this.Basket[fruitName]();
        let fruitOthers = {
            fruitThis: newFruit,
        }

        Object.assign(fruitOthers, others);

        newFruit.executeEvent(this.Settings, this.Config, eventName, fruitOthers);
    }

    getFruitEvent(fruitName, event){

        if(!Object.keys(this.Basket).includes(fruitName)) return;

        let newFruit = new this.Basket[fruitName]();

        if(!newFruit.Events.includes(event)) return;

        return newFruit.Events[event];
    }
}