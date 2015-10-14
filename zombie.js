Zombie.prototype = Object.create(Phaser.Sprite.prototype);

Zombie.prototype.constructor = Zombie;

Zombie.prototype.force = {x:0.0, y:0.0};

function Zombie(game, x, y){
	Phaser.Sprite.call(this, game, x, y, 'zombie');
	this.anchor.setTo(0.5, 0.5);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.gravity.y = 300;
	this.body.allowRotation = false;
	this.animations.add('move', [4, 5, 6, 7], 5, true);
	this.animations.add('die', [12, 16, 17, 18], 5, false);
	this.body.setSize(68, 60, 8, 0);
	this.animations.play('move');
};

Zombie.prototype.update = function () {
	if(gameOver == false) {
		if(this.body.x < wizard.body.x)
			this.scale.x = -1;
		else
			this.scale.x = 1;
		game.physics.arcade.moveToObject(this, wizard, 100);
		if (this.frame == 18) this.destroy();
	}
	else {
		this.animations.stop();
		this.body.velocity.x = 0;
	}
};

Zombie.prototype.faint = function() {
	this.body.velocity.x = 0; 
	this.animations.play('die');
	this.body.enable = false;
}