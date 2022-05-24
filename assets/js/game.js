(async ()=>{
	const socket = io();
	const unit = 10;

	let cav = document.querySelector('#canvas')
	let applePicture = applePictureRendered()
	let ctx = cav.getContext('2d')
	const players = []

	backgroundInitialize()
		.then(image=>{
			ctx.drawImage(image, 0,0)
		})
		.then(()=>{
		})
		.catch(err => console.error(err))

	socket.on('player_info', (player)=>{
		if(!players.some( e => e?.id === player.id)){
			players.push(player)
			socket.emit('new_player')
			console.info('player_info')
			console.table(players)
		}
	})
	
})()

document.addEventListener('keydown', movement);