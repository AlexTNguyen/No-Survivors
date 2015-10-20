Enemy.prototype = Object.create(Phaser.Sprite.prototype);

Enemy.prototype.constructor = Enemy;

Enemy.prototype.force = {x:0.0, y:0.0};

function Enemy(game, x, y){
	Phaser.Sprite.call(this, game, x, y, 'enemy');
	this.anchor.setTo(0.5, 0.5);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.gravity.y = 300;
	this.body.allowRotation = false;
	this.animations.add('move', [0, 1, 2], 5, true);
	this.animations.add('die', [3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 5, false);
	this.body.setSize(78, 90, 8, 0);
	this.animations.play('move');
	this.HP = 2;
};

Enemy.prototype.update = function () {
	if(gameOver == false) {
		if(this.body.x < wizard.body.x)
		{
			this.scale.x = -1;
			this.body.velocity.x = 100;
		}
		else
		{
			this.scale.x = 1;
			this.body.velocity.x = -100;
		}
		if (this.frame == 12) this.destroy();
	}
	else {
		this.animations.stop();
		this.body.velocity.x = 0;
	}
};

Enemy.prototype.HP = 2;

Enemy.prototype.faint = function() {
	this.HP--;
	console.log(this.HP);
	if(this.HP > 0) return false;
	this.body.velocity.x = 0; 
	this.animations.play('die');
	this.body.enable = false;
	return true;
}