import { EventEmitter } from "events";

class GameBoard extends EventEmitter implements ManagerInterface {
    rows: number;
    columns: number;
    Box: Map<string, EntityConstructor>;

    constructor(rows: number, columns: number) {
        super();
        this.rows = rows;
        this.columns = columns;
        this.Box = new Map();
    }

    setElem(x: number, y: number, value: EntityConstructor) {
        this.updateElem(x, y, value);
    }

    getElem(x: number, y: number): EntityConstructor | undefined {
        return this.lookupElem(x, y);
    }

    removeElem(x: number, y: number) {
        this.updateElem(x, y, undefined);
    }

    updateElem(x: number, y: number, value: EntityConstructor | undefined) {
        // Check if the Elem is within bounds
        if (!this.isValidElem(x, y)) {
            this.emit("outOfBoard");
            return;
        }

        // Update the value at the Elem
        this.Box.set(`${x},${y}`, value);
    }

    lookupElem(x: number, y: number): EntityConstructor | undefined {
        // Check if the Elem is within bounds
        if (!this.isValidElem(x, y)) {
            this.emit("outOfBoard");
            return;
        }

        // Look up the value at the Elem
        return this.Box.get(`${x},${y}`);
    }

    isValidElem(x: number, y: number): boolean {
        return x >= 0 && x < this.rows && y >= 0 && y < this.columns;
    }
}