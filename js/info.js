function infoScreen()
{
	// variables
	var btnPlay = [440, 0, 104, 56];
	var btnBack = [440, 72, 104, 56];

	// public methods
	this.update = function()
	{
		
	}
	
	this.draw = function()
	{
		game.ctx.drawImage(game.imgInfo, 0, 0);
		game.ctx.drawImage(game.imgUI, btnPlay[0], btnPlay[1], btnPlay[2], btnPlay[3], 500, 300, btnPlay[2], btnPlay[3]);
		game.ctx.drawImage(game.imgUI, btnBack[0], btnBack[1], btnBack[2], btnBack[3], 550, 380, btnBack[2], btnBack[3]);
	}
	
	this.onClick = function(X, Y)
	{
		if (X > 500 && X < 500 + btnPlay[2] && Y > 300 && Y < 300 + btnPlay[3]) // Play Button
		{
			if (game.soundOn) game.sndClick.play();
			changeScreen("game");
		}
		
		if (X > 550 && X < 550 + btnBack[2] && Y > 380 && Y < 380 + btnBack[3]) // Back Button
		{
			if (game.soundOn) game.sndClick.play();
			changeScreen("title");
		}
		
		
	}
}