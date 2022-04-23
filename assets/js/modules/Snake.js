let snakeBody = (x , y)=>{
	ctx.beginPath();
	ctx.fillStyle = this.color;
	ctx.fillRect(x+1, y+1, unit-1, unit-1);
	ctx.closePath();

	ctx.fillStyle = "white";
	ctx.beginPath();
	ctx.arc(x + unit/2 + 0.5 , y + unit/2 + 0.5, unit/4 , 0, 2*Math.PI);
	ctx.closePath();
	ctx.fill();
}
for(let i = 0; i < snake.length; i++){
	snakeBody(snake[i].x, snake[i].y);
}

snake[0] = {
	x:0,
	y:0
}