const unit = 10;

/**
 * Handles keydown listener event 
 * @param {Object<Event>} event 
 */
function movement(event){
    switch(event.keyCode){
        case 37: //arrow left
            if (dir != "RIGHT") dir = "LEFT"
        break;

        case 38: //arrow up
            if(dir != "DOWN") dir = "UP"
        break;

        case 39: //arrow right
            if(dir != "LEFT") dir = "RIGHT"
        break;

        case 40: //arrow down
            if(dir != "UP") dir = "DOWN"
        break;
    }
}

/**
 * Prerenders and returnes 'apple'
 * @returns {Object<Canvas>} Canvas
 */
function applePictureRendered(){
	let applePicture = document.createElement('canvas')
	applePicture.width = 10
	applePicture.height = 10
	let applePictureCtx= applePicture.getContext('2d')

	applePictureCtx.fillStyle = "red";
	applePictureCtx.beginPath();
	applePictureCtx.arc(unit/2 + 1,unit/2 + 1, unit/2 - 1, 0, 2*Math.PI);
	applePictureCtx.closePath();
	applePictureCtx.fill()
	return applePicture;
}

/**
 * Function awaits background image to load and then returns it
 * @async
 * @return {Promise<ImageBitmap>} image
 */
async function backgroundInitialize(){
    let image =  new Image()
    image.src = '/assets/img/mapa.png'
    image.crossOrigin = 'anonymous'
    await image.decode()
    return image
}