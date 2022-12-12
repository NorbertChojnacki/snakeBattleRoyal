
let player = new Entity();

player.setIdentifier('name', 'player');
player.setIdentifier('id', 'radex12');

player.setEvent('keyboardUse', (GameSettings, GameConfig, others)=>{

    let moveX: number;
    let moveY: number;
    const {Settings, Identifier} = others.entityThis; 

        switch(others.code){
            case 37:
                moveX = -1;
                Identifier.direction = "x";
                break;
            case 38:
                moveY = -1;
                Identifier.direction = "y"
                break;
            case 39:
                moveX = 1;
                Identifier.direction = "x";
                break;
            case 40:
                moveY = 1;
                Identifier.direction = "y"
                break;
        }

        let newX = Settings.x + (Identifier.direction == "x" ? moveX : 0);
        let newY = Settings.y + (Identifier.direction == "y" ? moveY : 0);

        others.entityThis.setCords(newX, newY);

    return GameSettings;
})
