
class EventConstrucor{

    Settings: Settings
    Config: Config
    EventBox: EventBox

    constructor(){

        this.Settings = {}
        this.Config = {}
        this.EventBox = {}
    }

    setOption(optionName: string, baseValue: number, minValue: number, maxValue: number){

        this.Settings[optionName] = baseValue;
        this.Config[`min${optionName}`] = minValue;
        this.Config[`max${optionName}`] = maxValue;
    }

    setEvent(eventName: EventName, eventFunction: EventFunction){

        Object.assign(this.EventBox, {[eventName]: eventFunction});
    }

    setSettings(GameSettings: Settings): void{

        Object.assign(this.Settings, GameSettings);
    }

    setConfig(GameConfig: Config): void{

        Object.assign(this.Config, GameConfig)
    }

    getConfig(): Config{
        
        return this.Config;
    }

    getSettings(): Settings{

        return this.Settings;
    }

    getEvents():Array<string>{

        return Object.keys(this.EventBox);
    }

    modifySettings(newValues: Settings, others, GameSettings, GameConfig){

        for (const name of Object.keys(newValues)) {

            if(newValues[name] < this.Config[`min${name}`]){
                this.executeEvent(`underMinValue-${name}`, GameSettings, GameConfig, others);
                break;
            }

            if(newValues[name] > this.Config[`max${name}`]){
                this.executeEvent(`aboveMaxValue-${name}`, GameSettings, GameConfig,others);
                break;
            }

            this.Settings[name] = newValues[name];
            
        }
    }

    executeEvent(eventName: string,GameSettings: Settings, GameConfig:Config, others: any): Settings{

        if(!this.getEvents().includes(eventName)) return this.Settings;

        let eventFunction: EventFunction = this.EventBox[eventName];
        let newValues: Settings = eventFunction.call(this,GameSettings, GameConfig, others);

        this.modifySettings(newValues, others, GameSettings, GameConfig);

        return this.Settings;
    }

}