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
	this.body.setSize(36, 46, 0, 0);
	this.invincible = false;
	this.animations.add('move', [0, 1, 2, 3], 10, false);
	this.animations.add('cast', [4, 5, 6], 10, false);
	this.animations.add('die', [7, 8], 1, false);
	this.animations.add('flinch', [9], 1, true);
	game.add.existing(this);
}

Wizard.prototype.update = function(){
	wizard.body.velocity.x = 0;
	if(gameOver == false) {
		if (cursors.left.isDown)
		{
			if(!casting && !flinching)
			{
				wizard.scale.x = 1;
				wizard.animations.play('move');
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
			else if(wizard.frame == 9) { 
				game.time.events.add(500, function() {
					wizard.animations.stop();
					wizard.frame = 0;
					flinching = false;
				});
			}
			else{
				flinching = false;
				//casting = false;
			}
			wizard.body.velocity.x = -150;
		}
		else if (cursors.right.isDown)
		{
			if(!casting && !flinching)
			{
				wizard.animations.play('move');
				//flip sprite along y axis
				wizard.scale.x = -1;
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
			else if(wizard.frame == 9) { 
				game.time.events.add(500, function() {
					wizard.animations.stop();
					wizard.frame = 0;
					flinching = false;
				});
			}
			else{
				flinching = false;
				//casting = false;
			}
			wizard.body.velocity.x = 150;
		}
		//if not casting then stop animation
		else if(!casting && !flinching){
			wizard.animations.stop();
			wizard.frame = 0;
		}
		else if(wizard.frame == 6){
			game.time.events.add(200, function(){
				wizard.animations.stop();
				wizard.frame = 0;
				casting = false;
			});
		}
		else if(wizard.frame == 9) { 
			game.time.events.add(500, function() {
				wizard.animations.stop();
				wizard.frame = 0;
				flinching = false;
			});
		}
		else{
			flinching = false;
			//casting = false;
		}



		if (cursors.up.isDown && wizard.body.touching.down)
		{
			wizard.body.velocity.y = -250;
		}
	}
	else if(playOnce == false) {
		wizard.animations.play('die');
		playOnce = true;
	}
}

Wizard.prototype.flinch = function () {
	this.toggleInvincible();
	//game.time.events.add(2000, this.toggleInvincible, this);
	//wizard.tint = 0xff0000;
	if(!casting) {
		wizard.animations.play('flinch');
		flinching = true;
	}
}

Wizard.prototype.toggleInvincible = function () {
	wizard.invincible = true;
	wizard.tint = 0xff0000;
}