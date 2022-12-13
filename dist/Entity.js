class Entity extends EventConstrucor {
    constructor() {
        super();
        this.Identifier = {};
        this.Settings.x = 1;
        this.Settings.y = 1;
        this.Identifier.color = "purple";
        this.Identifier.name = "Entity";
        this.Identifier.id = "#12p12p";
    }
    setCords(x, y) {
        this.Settings.x = x;
        this.Settings.y = y;
    }
    setIdentifier(idName, value) {
        this.Identifier[idName] = value;
    }
    getCords() {
        return {
            x: this.Settings.x,
            y: this.Settings.y
        };
    }
    getIdentifier() {
        return this.Identifier;
    }
}
//# sourceMappingURL=Entity.js.map