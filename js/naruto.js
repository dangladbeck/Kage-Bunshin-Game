function Naruto()
{
	var srcRect = [0, 0, 110, 150];  // Naruto rect
    var smkRect = [0, 150, 110, 150];  // smoke rect
    var state = "idle";
    var frameNo = 0;
    var frameTimer = 0;
    var frameNo2 = 0;
    var frameTimer2 = 0;
    var animTime = [];
    var animTime2 = [];
	
	
	function timedAnim(rect)  // passa um Rect para atualizar
    {
        if (frameTimer >= animTime[frameNo])
		{
            frameNo++;
            if (frameNo > animTime.length - 1)
			{
                return true;
            }
            rect[0] = frameNo * 110;
            rect[2] = 110;
            frameTimer = -1;
        }
        frameTimer++;

        return false;
    }
	
	
	this.update = function(timer)
	{
		if (state == "start")
        {
            if (timedAnim(srcRect))
            {
                this.setState("clone");
            }
        }
        else if (state == "clone")
        {
            if (timedAnim(smkRect))
            {
                this.setState("mix");
            }
        }
        else if (state == "win")
        {
            // Animação do Naruto
            if (frameTimer2 >= animTime2[frameNo2])
            {
                frameNo2++;
                if (frameNo2 > animTime2.length - 1)
                {
                    this.setState("idle");
                }
                srcRect[0] = ((frameNo2 % 3) + 5) * 110;
                srcRect[2] = 110;
                frameTimer2 = -1;
            }
            frameTimer2++;

            timedAnim(smkRect);  // animação da fumaça
        }
        else if (state == "lose")
        {
            if (timer > 10)
            {
                frameNo2 += 10;  // agora frameNo2 é o ângulo de rotação
                if (frameNo2 > 60) frameNo2 = 60;
                //matrix.setRotate(frameNo2);
            }
            timedAnim(smkRect);  // animação da fumaça
        }
	}
	
	this.draw = function(x, y)
	{
		if (state == "idle")
        {
            game.ctx.drawImage(game.imgNaruto, 0, 0, 110, 150, x, y, 110, 150);
        }
		else if (state == "start")
        {
            game.ctx.drawImage(game.imgNaruto, srcRect[0], srcRect[1], srcRect[2], srcRect[3], x, y, 110, 150);
        }
        else if (state == "clone")
        {
            if (frameNo >= 2)
            {
				game.ctx.drawImage(game.imgNaruto, 440, 0, 110, 150, x, y, 110, 150);
            }
            game.ctx.drawImage(game.imgNaruto, smkRect[0], smkRect[1], smkRect[2], smkRect[3], x, y, 110, 150);
        }
        else if (state == "mix")
        {
            game.ctx.drawImage(game.imgNaruto, 440, 0, 110, 150, x, y, 110, 150);
        }
        else if (state == "win")
        {
            game.ctx.drawImage(game.imgNaruto, srcRect[0], srcRect[1], srcRect[2], srcRect[3], x, y, 110, 150);
        }
        else if (state == "lose")
        {
			game.ctx.save();
			game.ctx.translate(x+55,y+150);
			game.ctx.rotate(frameNo2/ 180*Math.PI);
			game.ctx.drawImage(game.imgNaruto, srcRect[0], srcRect[1], srcRect[2], srcRect[3], -55, -150, 110, 150);
			game.ctx.restore();
        }
	}
	
	this.drawSmoke = function(x, y)
    {
        game.ctx.drawImage(game.imgNaruto, smkRect[0], smkRect[1], smkRect[2], smkRect[3], x, y, 110, 150);
    }
	
	this.setState = function(value)
	{
		state = value;
        frameNo = 0;
        frameTimer = 0;

        if (state == "idle")
        {
            srcRect = [0, 0, 110, 150];
            smkRect = [0, 150, 110, 150];
        }
        else if (state == "start")
        {
            animTime = [30, 4, 4, 100];
        }
        else if (state == "clone")
        {
            animTime = [2, 4, 4, 6, 4, 4, 6, 60];
        }
        else if (state == "win")
        {
            frameNo2 = 0;
            frameTimer2 = 0;
            animTime = [2, 4, 4, 6, 4, 4, 6, 120];  // fumaça
            animTime2 = [8, 12, 20, 8, 12, 20, 8, 12, 60];  // Naruto
        }
        else if (state == "lose")
        {
            animTime = [2, 4, 4, 6, 4, 4, 6, 120];  // fumaça
            srcRect[0] = 8 * 110;
            srcRect[2] = 110;
            //matrix = new Matrix();
            frameNo2 = 0;
        }
	}
}