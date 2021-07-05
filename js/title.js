function titleScreen()
{
	// variables
	var btnPlay = [440, 0, 104, 56];

	// public methods
	this.update = function()
	{
		
	}
	
	this.draw = function()
	{
		game.ctx.drawImage(game.imgTitle, 0, 0);
		game.ctx.drawImage(game.imgUI, btnPlay[0], btnPlay[1], btnPlay[2], btnPlay[3], 610, 320, btnPlay[2], btnPlay[3]);
	}
	
	this.onClick = function(X, Y)
	{
		if (X > 610 && X < 610 + btnPlay[2] && Y > 320 && Y < 320 + btnPlay[3]) // Play Button
		{
			if (game.soundOn) game.sndClick.play();
			changeScreen("info");
		}
	}
}