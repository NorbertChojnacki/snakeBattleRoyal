class Game extends EventConstrucor{

    Config: Config = {
        appleChanceSpawn: 1,
        gridSize: 10,
        boardSizeMax: 20,
        boardSizeMin: 0,
        bodyLengthMin: 1,
        bodyLengthMax: 200,
    }

    Basket = new Object();

    Board: Board

    constructor(){

        super();

        for(let i = 0; i < this.Config.boardSizeMax; i++){
            this.Board[i] = new Array(this.Config.boardSizeMax);
        }
    }

    addFruit(fruit: Entity){

        this.Board[fruit.Settings.x][fruit.Settings.y] = fruit;
    }

    callAllFruitsEvent(eventName){

        for (const fruitName of Object.keys(this.Basket))
            this.callFruitsEvent(fruitName, eventName);
    }

    callFruitsEvent(fruitName, eventName){
    

        newFruit.executeEvent(this.Settings, this.Config, eventName, fruitOthers);
    }

    // filterApples(){

    //     let fruit = this.Board[x][y];

    //     if(fruit !== undefined) this.settingsModify(fruit);

    //     this.Board[x][y] = undefined;
    // }

    drawBoard(){
        
        // this.Settings.ctx.clearRect(0,0,200,200);
        this.drawApples();
    }

    // isEndGame(){
    //     let minBoard = this.Config.boardSizeMin;
    //     let maxBoard = this.Config.boardSizeMax - 1;

    //     if(x < minBoard || x > maxBoard || y < minBoard || y > maxBoard){
    //         this.callAllFruitsEvent("endGame");
    //         return true
    //     };
    // }

    addBasket(fruits: Entity){

        Object.assign(this.Basket, fruits);

        for (const Fruit of Object.keys(fruits)) {

            let newFruit = new fruits[Fruit]();
            Object.assign(this.Config, newFruit.Config);
            Object.assign(this.Settings, newFruit.Settings);
        }
    }

    generateFruit(fruitName:string, i: number, j: number){

        if(!Object.keys(this.Basket).includes(fruitName)) return;

        let newFruit = new this.Basket[fruitName]();
        newFruit.setCords(i, j);
        this.addFruit(newFruit);
        
    }

    spawnApples(callback){

        for(let i = 0; i < this.Config.boardSizeMax; i++)
            for(let j = 0; j < this.Config.boardSizeMax; j++)
                callback(i, j,this.Config.appleChanceSpawn, Math.random());
    }

    drawApples(){

        this.Board.forEach(x => {
            x.forEach(y => {
                // if(y !== undefined) this.drawRect(y);
            });
        });
    }

    // drawRect({color, x, y}){
    //     this.Settings.ctx.fillStyle = color;
    //     this.Settings.ctx.fillRect(x * this.Config.gridSize, y * this.Config.gridSize, this.Config.gridSize, this.Config.gridSize); 
    // }
}