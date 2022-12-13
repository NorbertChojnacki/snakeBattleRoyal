let player = new Entity();
player.setIdentifier('name', 'player');
player.setIdentifier('id', 'radex12');
player.setIdentifier('direction', 'x');
player.setEvent('keyboardUse', function (GameSettings, GameConfig, others) {
    let moveX = 0;
    let moveY = 0;
    switch (others.code) {
        case 37:
            moveX = -1;
            this.Identifier.direction = "x";
            break;
        case 38:
            moveY = -1;
            this.Identifier.direction = "y";
            break;
        case 39:
            moveX = 1;
            this.Identifier.direction = "x";
            break;
        case 40:
            moveY = 1;
            this.Identifier.direction = "y";
            break;
    }
    let newX = this.Settings.x + (this.Identifier.direction == "x" ? moveX : 0);
    let newY = this.Settings.y + (this.Identifier.direction == "y" ? moveY : 0);
    this.setCords(newX, newY);
    console.log(this.getCords());
    return GameSettings;
});
player.setEvent("move", function (GameSettigns, GameConfig, others) {
    console.log({ GameConfig, others });
    let newCords = others.newCords;
    if (others.newCords.x > GameConfig.maxboardSize - 1)
        newCords.x = GameConfig.maxboardSize - 1;
    if (others.newCords.x < GameConfig.minboardSize)
        newCords.x = GameConfig.minboardSize;
    if (others.newCords.y > GameConfig.maxboardSize - 1)
        newCords.y = GameConfig.maxboardSize - 1;
    if (others.newCords.y < GameConfig.minboardSize)
        newCords.y = GameConfig.minboardSize;
    this.setCords(newCords.x, newCords.y);
    console.log(this.getCords());
    return GameSettigns;
});
//# sourceMappingURL=player.js.map