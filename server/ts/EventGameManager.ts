class EventListManager implements ManagerInterface{

    Box: any[]

    constructor(){

        this.Box = new Array();
        return this;
    }
    getAllElems(callback):void {

        for (const eventName of this.Box) {
            this.Box[eventName].forEach(elem => {
                callback({eventName, elem});
            });
        } 
    }
    removeElem(x: number, y: number): void {

        for (const eventName of this.Box) {
            this.Box[eventName] = this.Box[eventName].filter( item => (item.x !== x && item.y !== y))
        }        
    }
    getElem(x: number):any {

        return this.Box[x];
    }
    changeElem(callback: (elem: any) => { x: number; y: number; elem: any; }, x:number, y:number): void {
        
        for (const eventName of this.Box) {

            this.Box[eventName].foreach( (item, index) => {
                if(item.x == x && item.y == y) this.Box[eventName][index] = callback(item);
            });
        }
    }
    addElem(elem: any, eventName: EventName): void {

        if(!Object.keys(this.Box).includes(eventName)) this.Box[eventName] = new Array();

        this.Box[eventName].push(elem);
    }
}