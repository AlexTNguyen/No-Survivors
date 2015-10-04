Zombie.prototype = Object.create(Phaser.Sprite.prototype);

Zombie.prototype.constructor = Zombie;

Zombie.prototype.force = {x:0.0, y:0.0};

function Zombie(game, x, y){
	//zombie = group.create(x, y, 'zombie');
	Phaser.Sprite.call(this, game, x, y, 'zombie');
	//this.anchor.setTo(0.5, 1);
	//zombie.scale.setTo(1, 1);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.gravity.y = 300;
	this.body.allowRotation = false;
	this.animations.add('move', [4, 5, 6, 7], 5, true);
	game.add.existing(this);
	this.animations.play('move');
	this.body.velocity.x = 150;
	this.scale.x = -1;
};

// Zombie.prototype.collide = function(){

// }

Zombie.prototype.update = function () {
};