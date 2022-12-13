class Game extends EventConstrucor {
    constructor() {
        super();
        this.EventList = {};
        this.setOption("boardSize", 20, 0, 20);
        this.addBoard();
        this.setOption("gridSize", 10, 10, 10);
        document.addEventListener('keydown', event => {
            console.log('jestem1');
            this.callAllEntitysEvent("keyboardUse", { code: event.keyCode });
        });
    }
    addEntity(entity) {
        this.Board[entity.Settings.x][entity.Settings.y] = entity;
        let events = Object.keys(entity.EventBox);
        events.forEach(eventName => {
            if (!Object.keys(this.EventList).includes(eventName))
                this.EventList[eventName] = new Array();
            this.EventList[eventName].push({
                identifier: entity.Identifier,
                x: entity.Settings.x,
                y: entity.Settings.y
            });
        });
    }
    addEntities(entities) {
        entities.forEach(entity => {
            this.addEntity(entity);
        });
    }
    addBoard() {
        this.Board = new Array(this.Settings.boardSize);
        for (let i = 0; i < this.Settings.boardSize; i++)
            this.Board[i] = new Array(this.Settings.boardSize);
    }
    callAllEntitysEvent(eventName, others) {
        this.EventList[eventName].forEach((event, index) => {
            let entity = this.Board[event.x][event.y];
            let oldCords = entity.getCords();
            entity.executeEvent(eventName, this.Settings, this.Config, others);
            let newCords = entity.getCords();
            if (oldCords.x != newCords.x || oldCords.y != newCords.y) {
                entity.executeEvent("move", this.Settings, this.Config, { newCords });
                this.Board[event.x][event.y] = undefined;
                this.Board[entity.Settings.x][entity.Settings.y] = entity;
                this.EventList[eventName][index].x = entity.Settings.x;
                this.EventList[eventName][index].y = entity.Settings.y;
            }
        });
    }
}
//# sourceMappingURL=Game.js.map