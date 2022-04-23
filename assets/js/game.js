(async ()=>{
	const socket = io();
	const unit = 10;

	let cav = document.querySelector('#canvas')
	let applePicture = applePictureRendered()
	let ctx = cav.getContext('2d')


	backgroundInitialize()
		.then(image=>{
			ctx.drawImage(image, 0,0)
		})
		.then(()=>{
			for(let i = 0; i<4; i++){
				console.log('jestem')
				socket.emit('getApples', apple =>{
					console.log(apple)
				ctx.drawImage(applePicture, apple.x, apple.y)
			})
		}
		})
})()

document.addEventListener('keydown', movement);