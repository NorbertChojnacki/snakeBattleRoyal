
const EventName = [
    "touch", "keyboardUse", "endGame"
]

/**
 * Event
 * @class
 */
class Event{

    Settings = {}
    Config = {}
    Events = {}

    setEvent(eventName, eventFunction){

        Object.assign(this.Events, {[eventName]: eventFunction});
    }

    /**
     * executeAllEvents
     * @param {object} GameSettings settings of the Game object
     * @param {object} GameConfig config of the Game config
     * @param {object} others custom values that can be passed to event
     * @param {object} others.fruitThis contains this of the fruit
     * @returns
     */
    executeAllEvents(GameSettings, GameConfig, others){

        for (const eventName of this.Events) 
            this.executeEvent(GameSettings, GameConfig, eventName, others)
    }

    /**
     * Executes event with given name
     * @param {object} GameSettings settings of the Game object
     * @param {object} GameConfig config of the Game config
     * @param {string} eventName name og the event to be called
     * @param {object} others custom values that can be passed to event
     * @param {object} others.fruitThis contains this of the fruit
     * @returns
     */
    executeEvent(GameSettings, GameConfig, eventName, others){

        if(!Object.keys(this.Events).includes(eventName)) return;
        this.Events[event](GameSettings, GameConfig, others);
    }
}

function eventFunction(GameSettings, GameConfig, others){


}

/**
 * EventsManager
 * @class
 */
class EventsManager{

    Settings = {}
    Config = {}
    Events = {}
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

    /**
     * Calls all fruits events of given type
     * @param {object} eventName name of the event to be fired
     * @param {object} others other values to be passed
     */
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

        newFruit.executeEvent(this.Settings, this.Config, eventName, newFruitOthers);
    }

    getFruitEvent(fruitName, event){

        if(!Object.keys(this.Basket).includes(fruitName)) return;

        let newFruit = new this.Basket[fruitName]();

        if(!newFruit.Events.includes(event)) return;

        return newFruit.Events[event];
    }
}