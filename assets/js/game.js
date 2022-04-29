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
			
		})
})()

document.addEventListener('keydown', movement);