Wizard.prototype = Object.create(Phaser.Sprite.prototype);

Wizard.prototype.constructor = Wizard;

Wizard.prototype.force = {x:0.0, y:0.0}

function Wizard(game, x, y){
	Phaser.Sprite.call(this, game, x, y, 'wizard');
	this.anchor.setTo(0.5, 1);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.allowRotation = false;
	this.body.gravity.y = 300;
	this.body.collideWorldBounds = true;
	this.animations.add('move', [0, 1, 2, 3], 10, false);
	this.animations.add('cast', [4, 5, 6], 10, false);
	game.add.existing(this);
}

Wizard.prototype.update = function(){
	wizard.body.velocity.x = 0;

	if (cursors.left.isDown)
	{
		wizard.scale.x = 1;
		wizard.animations.play('move');
		wizard.body.velocity.x = -150;
	}
	else if (cursors.right.isDown)
	{
		wizard.animations.play('move');
		//flip sprite along y axis
		wizard.scale.x = -1;
		wizard.body.velocity.x = 150;
	}
	//press down arrow to test play animation
	//eventually this will only be played when the player
	//inputs the sequence for an attack
	else if (cursors.down.isDown) 
	{
		wizard.animations.play('cast');
		if(!casting) plasma = new Plasma(game, plasmas, wizard.x, wizard.y - 50);
		casting = true;
	}
	else
	{ 
		//if not casting then stop animation
		if((wizard.frame != 4) && (wizard.frame != 5) && (wizard.frame != 6)){
			wizard.animations.stop();
			wizard.frame = 0;
		}
		//allow casting animation to finish before going back to
		//idle state
		else if(wizard.frame == 6){
			game.time.events.add(200, function(){
				wizard.animations.stop();
				wizard.frame = 0;
				casting = false;
			});
		}
	}
	if (cursors.up.isDown && wizard.body.touching.down)
	{
		wizard.body.velocity.y = -250;
	}
}
