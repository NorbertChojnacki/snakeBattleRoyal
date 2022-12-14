class BoardManager implements ManagerInterface{

    Box: any[];

    constructor(boardSize){

        this.Box = new Array(boardSize);

        for(let i = 0; i < boardSize; i++)
            this.Box[i] = new Array(boardSize).fill(undefined);
            
        return this;
    }

    addElem(elem: any, x: number, y:number): void {
        
        this.Box[x][y] = elem;
    }
    removeElem(x: number, y: number): void {
        
        this.Box[x][y] = undefined;
    }
    getElem(x: number, y: number): any {

        return this.Box[x][y];
    }
    getAllElems(callback):void {

        this.Box.forEach(row=>{
            row.forEach(entity => {
                callback(entity)
            });
        })
    }
    changeElem(callback: (elem: any) => any, x: number, y: number): void {

        this.Box[x][y] = callback(this.Box[x][y]);
    }

}