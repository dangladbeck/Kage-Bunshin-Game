function gameScreen()
{
	// variables
	var screenWidth = game.canvas.width;
	var screenHeight = game.canvas.height;
	
	var self = this;
	var state = "waiting";
	var naruto = new Naruto();
	var bunshin = [];
	var bunshinPos = [];
	var level = 1;
	var errors = 0;
    var timer = 0;
    var flipCount = 0;
    var flip1 = 0;
    var flip2 = 0;
    var right = 0;
    var win = false;
	
	
	function createBunshin()
    {
        flipCount = level + 3;  // O número de trocas cresce conforme se avança de fase.
        var bunshinCount = level + 2;  // O número de bunshins também aumenta conforme a fase...
        if (bunshinCount > 9) bunshinCount = 9;  // ...mas nunca é maior que 9.

        bunshin = [];
        bunshinPos = [];

        for (var n = 0; n < bunshinCount; n++)
        {
            bunshin[n] = false;
            bunshinPos[n] = n * 80;
        }

        right = Math.floor(Math.random() * bunshinCount);
        bunshin[right] = true;  // Este é o verdadeiro Naruto.
    }

    function chooseBunshin()
    {
        flip1 = Math.floor(Math.random() * bunshin.length);
        do
        {
            flip2 = Math.floor(Math.random() * bunshin.length); // flip2 é escolhido aleatóriamente...
        } while (flip1 == flip2);  // ...mas näo pode ser igual a flip1. Caso contrário escolhe de novo.

        // flip1 deve ser menor que flip2. Se näo, eles devem ser invertidos.
        if (flip1 > flip2)
        {
            var aux = flip1;
            flip1 = flip2;
            flip2 = aux;
        }
    }
	
	
	// public methods
	this.update = function()
	{
		if (state == "waiting")
        {
            timer++;
            if (timer >= 60)  // 1 second passed
            {
                state = "ready";
            }
        }
        else if (state == "start")
        {
            naruto.update(timer);
            timer++;
            if (timer == 30 && game.soundOn)
            {
                game.sndJutsu.play();
            }
            if (timer >= 140)
            {
                state = "clone";
                naruto.setState("clone");
                timer = 0;
                createBunshin();
            }
        }
        else if (state == "clone")
        {
            naruto.update(timer);
            timer++;
            if (timer == 2 && game.soundOn)
            {
                game.sndExplosion.play();
            }
            if (timer == 32 && game.soundOn)
            {
                game.sndIkuttebayo.play();
            }
            if (timer >= 100)
            {
                state = "mix";
                chooseBunshin();
            }
        }
        else if (state == "mix")
        {
            // Todos os bunshins ficam parados em posições múltiplas de 80.
            if (bunshinPos[flip1] < flip2 * 80)
            {
                // Quando um se movimenta, o outro também deve se movimentar no sentido
                // contrário. Näo é necessário fazer testes para movimentar o outro.
                bunshinPos[flip1] += (flip2 - flip1) * 80 / 10;
                bunshinPos[flip2] -= (flip2 - flip1) * 80 / 10;
            }
            else  // Quando 2 bunshin acabaram de trocar as posicöes.
            {
                // Atualiza o array bunshin trocando os valores em flip1 e flip2.
                var aux1 = bunshin[flip1];
                bunshin[flip1] = bunshin[flip2];
                bunshin[flip2] = aux1;
                var aux2 = bunshinPos[flip1];
                bunshinPos[flip1] = bunshinPos[flip2];
                bunshinPos[flip2] = aux2;

                flipCount--;  // Agora falta uma troca a menos.
                chooseBunshin();  // Escolhe um novo par de bunshins.
            }

            if (flipCount == 0)  // Quando acabam as trocas
            {
                state = "choose";
            }
        }
        else if (state == "result")
        {
            naruto.update(timer);
            timer++;

            if (timer == 2 && game.soundOn)
            {
                game.sndExplosion.play();
                if (win)
                {
                    game.sndNani.play();
                }
                else
                {
                    game.sndYatta.play();
                }
            }

            if (timer >= 140)
            {
                if (win)
                {
                    level++;
                }
                else
                {
                    errors++;
                }
                state = "waiting";
                naruto.setState("idle");
            }
        }
	}
	
	this.draw = function()
	{
		game.ctx.drawImage(game.imgBG, 0, 0);
		// draw HUD items
        game.ctx.drawImage(game.imgUI, 0, 0, 102, 77, 100, 10, 102, 77);
        game.ctx.drawImage(game.imgUI, 104, 0, 102, 77, 598, 10, 102, 77);
        // HUD numbers
        var left = (errors % 10) * 20;
        game.ctx.drawImage(game.imgUI, left, 168, 20, 22, 650, 45, 20, 22);
        if (errors > 9)
        {
            left = Math.floor(errors / 10) * 20;
            game.ctx.drawImage(game.imgUI, left, 168, 20, 22, 636, 45, 20, 22);
        }
        left = (level % 10) * 20;
        game.ctx.drawImage(game.imgUI, left, 168, 20, 22, 152, 45, 20, 22);
        if (level > 9)
        {
            left = Math.floor(level / 10) * 20;
            game.ctx.drawImage(game.imgUI, left, 168, 20, 22, 138, 45, 20, 22);
        }
		
		if (state == "waiting")
        {
            naruto.draw(340, 280);
        }
		else if (state == "ready")
        {
            naruto.draw(340, 280);
			game.ctx.drawImage(game.imgUI, 328, 0, 104, 120, 350, 120, 104, 120);
            left = (level % 10) * 20;
            game.ctx.drawImage(game.imgUI, left, 168, 20, 22, 425, 120, 20, 22);
            if (level > 9)
            {
                left = Math.floor(level / 10) * 20;
                game.ctx.drawImage(game.imgUI, left, 168, 20, 22, 411, 120, 20, 22);
            }
        }
        else if (state == "start")
        {
            naruto.draw(340, 280);
            if (timer > 52)
            {
                game.ctx.drawImage(game.imgUI, 280, 0, 40, 198, 450, 140, 40, 198);
            }
        }
        else if (state == "clone")
        {
            for (var n = 0; n < bunshin.length; n++)
            {
                naruto.draw(bunshinPos[n] + 10, 280);
            }
            if (timer > 30)  // ikkutebayo
            {
                left = right * 80 + 25;
                game.ctx.drawImage(game.imgUI, 0, 80, 77, 85, left, 230, 77, 85);
            }
        }
        else if (state == "mix" || state == "choose")
        {
            for (var n = 0; n < bunshin.length; n++)
            {
                naruto.draw(bunshinPos[n] + 10, 280);
            }
        }
        else if (state == "result")
        {
            for (var n = 0; n < bunshin.length; n++)
            {
                if (bunshin[n])  // desenha o naruto verdadeiro
                {
                    naruto.draw(bunshinPos[n] + 10, 280);
                }
                else  // desenha as fumaças
                {
                    naruto.drawSmoke(bunshinPos[n] + 10, 280);
                }
            }

            // desenha o texto do resultado
            if (win)
            {
                game.ctx.drawImage(game.imgUI,88, 120, 184, 32, 300, 180, 184, 32);
            }
            else
            {
                game.ctx.drawImage(game.imgUI, 88, 80, 184, 32, 300, 180, 184, 32);
            }
        }
	}
	
	this.onClick = function(clickX, clickY)
	{
		if (state == "ready")
        {
            // Check for click on Yes Button
			var btnYes = [350,184,104,120];
			if (clickX >= btnYes[0] && clickX <= btnYes[0] + btnYes[2] && clickY >= btnYes[1] && clickY <= btnYes[1] + btnYes[3])
			{  // Yes button clicked
				if (game.soundOn) game.sndClick.play();
				
				timer = 0;
				state = "start";
				naruto.setState("start");
			}
        }
        else if (state == "choose")
        {
            // wait for click on one bunshin
			for (var n = 0; n < bunshin.length; n++)
			{
				// Check for click on one Bunshin
				btnX = bunshinPos[n] + 22;
				btnY = 280;
				btnW = bunshinPos[n] + 88;
				btnH = 280 + 150;
				if (clickX >= btnX && clickX <= btnW && clickY >= btnY && clickY <= btnH)
				{
					if (bunshin[n])
					{
						naruto.setState("lose");
						win = true;
					}
					else
					{
						naruto.setState("win");
						win = false;
					}
					state = "result";
					timer = 0;
					break;
				}
			}
        }
	}
}
