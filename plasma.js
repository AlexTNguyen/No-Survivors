Plasma.prototype = Object.create(Phaser.Sprite.prototype);

Plasma.prototype.constructor = Plasma;

Plasma.prototype.force = {x:0.0, y:0.0};

function Plasma(game, group, x, y){
	plasma = group.create(x, y, 'plasma');
	plasma.scale.setTo(2, 2);
	game.physics.enable(plasma, Phaser.Physics.ARCADE);
		plasma.body.setSize(12, 12, 10, 10);
	plasma.animations.add('plasma', [0, 1, 2, 3], 10, false);
	if(wizard.scale.x == 1){
		plasma.body.velocity.x = -300;
	}
	else plasma.body.velocity.x = 300;
	plasma.type = 'p';
}

Plasma.prototype.type = 'p';

Plasma.prototype.sequence = function () {
	psequence = "";
	var letters = "ASDF"
	for (var i=0; i<seqlength; i++)
	{
		psequence += letters.charAt(Math.floor(Math.random() * letters.length));
		text.addColor('#ff0000', 17 + i);
	}
	text.setText("Plasma Sequence: " + psequence);
}