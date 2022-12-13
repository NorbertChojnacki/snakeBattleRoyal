class EventConstrucor {
    constructor() {
        this.Settings = {};
        this.Config = {};
        this.EventBox = {};
    }
    setOption(optionName, baseValue, minValue, maxValue) {
        this.Settings[optionName] = baseValue;
        this.Config[`min${optionName}`] = minValue;
        this.Config[`max${optionName}`] = maxValue;
    }
    setEvent(eventName, eventFunction) {
        Object.assign(this.EventBox, { [eventName]: eventFunction });
    }
    setSettings(GameSettings) {
        Object.assign(this.Settings, GameSettings);
    }
    setConfig(GameConfig) {
        Object.assign(this.Config, GameConfig);
    }
    getConfig() {
        return this.Config;
    }
    getSettings() {
        return this.Settings;
    }
    getEvents() {
        return Object.keys(this.EventBox);
    }
    modifySettings(newValues, others, GameSettings, GameConfig) {
        for (const name of Object.keys(newValues)) {
            if (newValues[name] < this.Config[`min${name}`]) {
                this.executeEvent(`underMinValue-${name}`, GameSettings, GameConfig, others);
                break;
            }
            if (newValues[name] > this.Config[`max${name}`]) {
                this.executeEvent(`aboveMaxValue-${name}`, GameSettings, GameConfig, others);
                break;
            }
            this.Settings[name] = newValues[name];
        }
    }
    executeEvent(eventName, GameSettings, GameConfig, others) {
        if (!this.getEvents().includes(eventName))
            return this.Settings;
        let eventFunction = this.EventBox[eventName];
        let newValues = eventFunction.call(this, GameSettings, GameConfig, others);
        this.modifySettings(newValues, others, GameSettings, GameConfig);
        return this.Settings;
    }
}
//# sourceMappingURL=EventConstructor.js.map