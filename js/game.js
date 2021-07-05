var game = 
{
	// global variables
	canvas: null,
	ctx: null,
	soundOn: true,
	imgNaruto: new Image(),
	imgTitle: new Image(),
	imgInfo: new Image(),
	imgBG: new Image(),
	imgUI: new Image(),
	sndClick: new Audio(),
	sndExplosion: new Audio(),
	sndIkuttebayo: new Audio(),
	sndJutsu: new Audio(),
	sndNani: new Audio(),
	sndYatta: new Audio(),
	mouseX: 0,
	mouseY: 0	
};

/* Each screen handles its input, update and draw methods */
var currentScreen;

var resLoaded;

var sndOn = [216, 16, 56, 48];
var sndOff = [216, 16, 32, 48];

window.onload = function()
{
	// initialize canvas
	game.canvas = document.getElementById("canvas");
	game.canvas.addEventListener("click", onClick, false);
	game.ctx = game.canvas.getContext('2d');
	
	resLoaded = 0;
	
	// Load all resources, in the form:
	game.imgNaruto.src = "img/naruto.png";
	game.imgNaruto.onload = loadRes;
	game.imgTitle.src = "img/titlebg.png";
	game.imgTitle.onload = loadRes;
	game.imgInfo.src = "img/infobg.png";
	game.imgInfo.onload = loadRes;
	game.imgBG.src = "img/gamebg.jpg";
	game.imgBG.onload = loadRes;
	game.imgUI.src = "img/ui.png";
	game.imgUI.onload = loadRes;
	
	game.sndClick.src = "snd/click.ogg";
	game.sndClick.onloadeddata = loadRes;
	game.sndExplosion.src = "snd/explosion.ogg";
	game.sndExplosion.onloadeddata = loadRes;
	game.sndIkuttebayo.src = "snd/ikuttebayo.ogg";
	game.sndIkuttebayo.onloadeddata = loadRes;
	game.sndJutsu.src = "snd/kagebunshinnojutsu.ogg";
	game.sndJutsu.onloadeddata = loadRes;
	game.sndNani.src = "snd/nani.ogg";
	game.sndNani.onloadeddata = loadRes;
	game.sndYatta.src = "snd/yatta.ogg";
	game.sndYatta.onloadeddata = loadRes;
}

function loadRes()
{
	resLoaded++;	
	if (resLoaded == 11) // if this is the last resource loaded
	{
		run();	
	}
}

function run()
{
	document.getElementById("loadtxt").style.display = "none";
	game.canvas.style.display = "block";
	
	// set game loop - at fixed frame rate
	setInterval(loop, 1000 / 60); // 60 fps
	
	// begin with first screen
	currentScreen = new titleScreen();
}

function loop()
{
	// call update and draw methods
    update();
    draw();
}

function update()
{
	currentScreen.update(); // update screen
}

function draw()
{
	currentScreen.draw();  // draw current screen
	
	if (game.soundOn)
	{
		game.ctx.drawImage(game.imgUI, sndOn[0], sndOn[1], sndOn[2], sndOn[3], 730, 420, sndOn[2], sndOn[3]);
	}
	else
	{
		game.ctx.drawImage(game.imgUI, sndOff[0], sndOff[1], sndOff[2], sndOff[3], 730, 420, sndOff[2], sndOff[3]);
	}
}

function onClick(e)
{
	if (e.offsetX > 730 && e.offsetX < 730 + sndOn[2] && e.offsetY > 420 && e.offsetY < 420 + sndOn[3]) // Sound Button
	{
		game.soundOn = !game.soundOn;
		
		if (game.soundOn) game.sndClick.play();
	}
	
	currentScreen.onClick(e.offsetX, e.offsetY);	
}

function changeScreen(nextScreen)
{
	if (nextScreen == "title")
	{
		currentScreen = new titleScreen();
	}
	else if (nextScreen == "info")
	{
		currentScreen = new infoScreen();
	}
	else if (nextScreen == "game")
	{
		currentScreen = new gameScreen();
	}
}




