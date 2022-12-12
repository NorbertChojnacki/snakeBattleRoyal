class Game extends EventsManager{

    Config: Config = {
        appleChanceSpawn: 1,
        gridSize: 10,
        speedMin: 50,
        speedMax: 2050,
        boardSizeMax: 20,
        boardSizeMin: 0,
        bodyLengthMin: 1,
        bodyLengthMax: 200,
    }

    Settings: Settings = {
        speed: 500,
        bodyLength: 1,
        bin: 0
    }

    Player // do wyjebania

    basket = new Object();

    Board: Board

    constructor(ctx){

        super()
        for(let i = 0; i < this.Config.boardSizeMax; i++){
            this.Board[i] = new Array(this.Config.boardSizeMax);
        }
    }

    addFruit(fruit: Entity){

        this.Board[fruit.Settings.x][fruit.Settings.y] = fruit;
    }

    filterApples(){

        let x = this.Player.x;
        let y = this.Player.y

        let fruit = this.Board[x][y];

        if(fruit !== undefined) this.settingsModify(fruit);

        this.Board[x][y] = undefined;
    }

    drawBoard(){
        
        this.Settings.ctx.clearRect(0,0,200,200);
        this.drawApples();
        this.drawPlayers();
    }

    isEndGame(){

        let x = this.Player.x;
        let y = this.Player.y;
        let minBoard = this.Config.boardSizeMin;
        let maxBoard = this.Config.boardSizeMax - 1;

        if(x < minBoard || x > maxBoard || y < minBoard || y > maxBoard){
            this.callAllFruitsEvent("endGame");
            return true
        };
    }

    addBasket(fruits: Entity){

        Object.assign(this.basket, fruits);

        for (const Fruit of Object.keys(fruits)) {

            let newFruit = new fruits[Fruit]();
            Object.assign(this.Config, newFruit.Config);
            Object.assign(this.Settings, newFruit.Settings);
        }
    }

    generateFruit(fruitName:string, i: number, j: number){

        if(!Object.keys(this.basket).includes(fruitName)) return;

        let newFruit = new this.basket[fruitName]();
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
                if(y !== undefined) this.drawRect(y);
            });
        });
    }

    drawPlayers(){

        this.drawRect(this.Player);
    }

    drawRect({color, x, y}){
        this.Settings.ctx.fillStyle = color;
        this.Settings.ctx.fillRect(x * this.Config.gridSize, y * this.Config.gridSize, this.Config.gridSize, this.Config.gridSize); 
    }
}