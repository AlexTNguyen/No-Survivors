var game = new Phaser.Game(800, 600, Phaser.AUTO, "game", {preload:preload, update:update, create:create});

var wizard;
var plasma;
var casting;
var flinching;
var style = { font: "bold 16px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
var psequence = "ASD";
var fsequence = "QWER";
var input = "";
var pseq = "";
var fseq = "";
var inputIndex = 0;
var inputIndex2 = 0;
var seqlength = 3;
var fseqlength = 4;
var HP = 5;
var invincTime = 0; 
var gameOver = false;
var playOnce = false;
var firelvl = 0;
var plasmalvl = 0;
var maxlvl = 50;
var zfreq = 1;
var efreq = 1;
var gameLevel = 1;
var lastLevelTime = 0;
var numKilled = 0; 
var levelGoal = 4;
var monLeft = 4;
var monSpawned = 0;

function preload() 
{
	game.load.spritesheet('wizard', 'sprites/wiz2.png', 52, 46);
	//game.load.spritesheet('wizard', 'sprites/wiz1.png', 43, 49);
	game.load.spritesheet('enemy', 'sprites/zom2.png', 74, 98);
	game.load.spritesheet('ground', 'sprites/Ground&Stone/Ground&Stone/Stone/ground5.png');
	game.load.spritesheet('dungeon', 'sprites/dungeon.jpg');
	game.load.spritesheet('plasma', 'sprites/plasma.png', 32, 28);
	game.load.spritesheet('zombie', 'sprites/zombie.png', 73, 77, 20);
	game.load.spritesheet('fire', 'sprites/fireballs.png', 23, 30);
	game.load.audio('music', 'sound/DungeonMusic1.mp3');
	game.load.audio('explosion', 'sound/explosion.wav');
	game.load.audio('hit', 'sound/hit.wav');
}

function create()
{
	music = game.add.audio('music');
	if(gameLevel == 1) {
		music.play();
		music.loopFull(1);
	}
	expsound = game.add.audio('explosion');
	expsound.volume = 0.4;
	hitsound = game.add.audio('hit');

	game.physics.enable(Phaser.Physics.ARCADE);
	game.add.sprite(0,0,'dungeon');
	cursors = game.input.keyboard.createCursorKeys();
	plasmas = game.add.group();
	zombies = game.add.group();
	enemies = game.add.group();
	fireballs = game.add.group();
	wizard = new Wizard(game, game.world.centerX, 550);
	stones = game.add.group();
	
	zombies.enableBody = true;
	stones.enableBody = true;
	enemies.enableBody = true;
	for(var i = 0; i < 10; i++){
		var ground = stones.create(i * 125, 550, 'ground');
		ground.scale.setTo(1, 0.5);
		ground.body.immovable = true;
	}

	text = game.add.text(300, 560, "Plasma Sequence: " + psequence, style);
	text.addColor('#ff0000', 17);
	text2 = game.add.text(300, 575, "Firestorm Sequence: " + fsequence, style);
	text2.addColor('#ff0000', 20);
	hpText = game.add.text(5, 5, "HP: " + HP, style);
	levelText = game.add.text(5, 20, "Level: " + gameLevel, style);
	timeText = game.add.text(300, 5, "Time Survived: " + Math.floor(game.time.totalElapsedSeconds()), style);
	monstersText = game.add.text(5, 35, "Monsters left: " + monLeft, style);

	game.input.keyboard.onDownCallback = handleInput;
	game.time.events.loop(3000 * zfreq - (gameLevel * 100), createZombie, this);
	game.time.events.add(15000, function(){
			game.time.events.loop(7000 * efreq - (gameLevel * 100), createEnemy, this);
	})
	game.time.events.add(20000, function(){
		zfreq = 0.9;
	})
	game.time.events.add(30000, function(){
		efreq = 0.9;
		zfreq = 0.8;
	})
	game.time.events.add(40000, function(){
		efreq = 0.8;
		zfreq = 0.7;
	})
	game.time.events.add(50000, function(){
		efreq = 0.7;
		zfreq = 0.6;
	})
	game.time.events.add(60000, function(){
		efreq = 0.6;
		zfreq = 0.5;
	})
}

function createZombie () {
	monSpawned++;
	if(monSpawned <= levelGoal) {
		var random = Math.floor(Math.random() * 2);
		if(random == 0) {
			zombie = new Zombie(game, game.world.width - 50, 400);
			zombies.add(zombie);
		}
		else {
		 	zombie = new Zombie(game, 50, 400);
		 	zombies.add(zombie);
		}
	}
}
function createEnemy () {
	monSpawned++;
	if(monSpawned <= levelGoal) {
		var random = Math.floor(Math.random() * 2);
		if(random == 0) {
			enemy = new Enemy(game, game.world.width - 50, 500);
			enemies.add(enemy);
		}
		else {
		 	enemy = new Enemy(game, 50, 500);
		 	enemies.add(enemy);
		}
	}
}

function update()
{
	if(numKilled == levelGoal){
		pseq = "";
		fseq = "";
		casting = false;
		flinching = false;
		gameLevel++;
		levelGoal += 2;
		monLeft += levelGoal;
		numKilled = 0;
		monSpawned = 0;
		levelCompleteText = game.add.text(game.world.width / 2 - 265, game.world.height / 2 - 25, "LEVEL COMPLETE",{ font: '100px Lucida Console', fill: '#fff', align: 'center'});
		game.time.events.add(10000, game.world.remove(levelCompleteText));
		game.time.events.add(10000, game.state.restart(true, false, gameLevel, levelGoal, monLeft, numKilled, monSpawned));
	}
	if(HP == 0) { 
		game.time.events.pause();
		if(!gameOver){
			gameOverText = game.add.text(game.world.width / 2 - 265, game.world.height / 2 - 25, "GAME OVER",{ font: '100px Lucida Console', fill: '#fff', align: 'center'});
		}
		gameOver = true;
	}
	else timeText = timeText.setText("Time Survived: " + Math.floor(game.time.totalElapsedSeconds()));

	monstersText = monstersText.setText("Monsters left: " + monLeft);

		game.physics.arcade.collide(wizard, stones);
		game.physics.arcade.collide(zombies, stones);
		game.physics.arcade.collide(enemies, stones);
		if(wizard.invincible == false) { 
			game.physics.arcade.overlap(wizard, zombies, flinch, null);
			game.physics.arcade.overlap(wizard, enemies, flinch, null);
		}
		else{
			if(invincTime + 2 <= game.time.totalElapsedSeconds())
			{
				wizard.invincible = false;
				wizard.tint = 0xffffff;
			}
		}
		game.physics.arcade.overlap(zombies, plasmas, die, null);
		game.physics.arcade.overlap(zombies, fireballs, die, null);
		game.physics.arcade.overlap(enemies, fireballs, die, null);
		game.physics.arcade.overlap(enemies, plasmas, die, null);
		plasmas.forEach(function(plasma) {
			plasma.animations.play('plasma');
		});
		fireballs.forEach(function(fireball){
			fireball.animations.play('fire');
		})
}

function die(zombie, spell) {
	expsound.play();
    fainted = zombie.faint();
    if(!fainted)
    {
    	spell.destroy();
    	return;
    } 
    numKilled++;
	monLeft--;
    if(spell.type == 'f' && (firelvl < maxlvl)){
    	firelvl++;
    	if(firelvl % 10 == 0 ){ 
    		updatetext = game.add.text(350, 300, "Firestorm upgraded!", style);
    		    game.time.events.add(1500, function(){
    			game.world.remove(updatetext);
    })
    	}
    }
    else if (plasmalvl < maxlvl){ 
    	plasmalvl++;
    	if (plasmalvl == 10) {
			updatetext = game.add.text(350, 300, "Plasma Upgraded!", style);
			game.time.events.add(1500, function(){
    			game.world.remove(updatetext);
    		});
		}
    }
    spell.destroy();
}

function flinch(wizard, zombie) {
	if(!gameOver) hitsound.play();
	if (HP > 0) {
		HP--;
		game.world.remove(hpText);
		hpText = game.add.text(5, 5, "HP: " + HP, style);
		wizard.flinch();
		invincTime = game.time.totalElapsedSeconds(); 
	}
}

function handleInput(key)
{
	if(gameOver == false) {
		if((key.keyCode > 64) && (key.keyCode < 91))
		{
			input = String.fromCharCode(key.keyCode);
			if(input == 'A' || input == 'S' || input == 'D' || input =='F') pseq += input;
			else fseq += input;
			if(pseq[inputIndex] == psequence[inputIndex]) 
			{
				text.addColor('#009900', 17 + inputIndex);
				if(inputIndex < (seqlength -1)) 
				{
					text.addColor('#ff0000', 18 + inputIndex);
					inputIndex++;
				}
				else if(inputIndex == (seqlength - 1))
				{
					if(!casting){
						if(plasmalvl >= 10) 
						{
							game.time.events.add(100, function () {
								if(wizard.scale.x == 1){
									plasma = new Plasma(game, plasmas, wizard.x - 25, wizard.y - 50);
								}
								else plasma = new Plasma(game, plasmas, wizard.x, wizard.y - 50);
							})
						}
						wizard.animations.play('cast');
						if(wizard.scale.x == 1){
							plasma = new Plasma(game, plasmas, wizard.x - 25, wizard.y - 50);
						}
						else plasma = new Plasma(game, plasmas, wizard.x, wizard.y - 50); 
						plasma.sequence();
						casting = true;
						pseq = "";
						inputIndex = 0;
					}
				}
				else
				{
					pseq = "";
					inputIndex = 0;
				}
			}
			else if(fseq[inputIndex2] == fsequence[inputIndex2])
			{
				text2.addColor('#009900', 20 + inputIndex2);
				if(inputIndex2 < (fseqlength - 1))
				{
					text2.addColor('#ff0000', 21 + inputIndex2);
					inputIndex2++;
				}
				else if(inputIndex2 == (fseqlength - 1))
				{
					if(!casting){
						wizard.animations.play('cast');
						for(var i = 0; i < 5 + Math.floor(firelvl / 10); i++)
						{
							var fireball = new Fire(game, fireballs, (i * 40) + (wizard.x - 50), 0, 'fire');
						}
						fireball.sequence();
						casting = true;
						fseq = "";
						inputIndex2 = 0;
					}
				}
				else
				{
					fseq = "";
					inputIndex2 = 0;
				}
			}
			else 
			{
				pseq = "";
				inputIndex = 0;
				fseq = "";
				inputIndex2 = 0;
				for(var i = 0; i < seqlength; i++)
				{
					text.addColor('#ff0000', 17 + i);
				}
				for( var i = 0; i < fseqlength; i++)
				{
					text2.addColor('#ff0000', 20 + i);
				}
			}
		}
	}
}

