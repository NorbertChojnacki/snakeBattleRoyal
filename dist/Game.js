class Game extends BoardManager {
    constructor(canvas) {
        super();
        this.Ctx = canvas.getContext('2d', {
            alpha: false,
        });
        //na razie plansza musi być kwadratem
        this.Ctx["width"] = canvas.width;
        this.Ctx["height"] = canvas.height;
        this.setOption("gridSize", 10, 10, 10);
        this.setOption("boardSize", this.Ctx["width"] / this.Settings.gridSize, 0, this.Ctx["width"] / this.Settings.gridSize);
        this.addBoard();
    }
    drawBoard() {
        this.Ctx.clearRect(0, 0, this.Ctx["width"], this.Ctx["height"]);
        this.Board.forEach(row => {
            row.forEach(entity => {
                if (entity !== undefined)
                    this.drawEntity(entity.Settings.x, entity.Settings.y, entity.Identifier.color);
            });
        });
    }
    drawEntity(x, y, color) {
        this.Ctx.fillStyle = color;
        this.Ctx.fillRect(x * this.Settings.gridSize, y * this.Settings.gridSize, this.Settings.gridSize, this.Settings.gridSize);
    }
}
//# sourceMappingURL=Game.js.map