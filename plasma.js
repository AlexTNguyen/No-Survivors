Plasma.prototype = Object.create(Phaser.Sprite.prototype);

Plasma.prototype.constructor = Plasma;

Plasma.prototype.force = {x:0.0, y:0.0};

function Plasma(game, group, x, y){
	plasma = group.create(x, y, 'plasma');
	//this.anchor.setTo(0.5, 1);
	plasma.scale.setTo(2, 2);
	game.physics.enable(plasma, Phaser.Physics.ARCADE);
	plasma.animations.add('plasma', [0, 1, 2, 3], 10, false);
	if(wizard.scale.x == 1){
		plasma.body.velocity.x = -300;
	}
	else plasma.body.velocity.x = 300;
	//game.add.existing(this);
}

Plasma.prototype.update = function () {

}