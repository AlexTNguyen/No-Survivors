Fire.prototype = Object.create(Phaser.Sprite.prototype);

Fire.prototype.constructor = Fire;

Fire.prototype.force = {x:0.0, y:0.0};

function Fire(game, group, x, y){
	fire = group.create(x, y, 'fire');
	fire.anchor.setTo(1, 0.5);
	//fire.scale.y = -1;
	fire.scale.setTo(2, 2);
	game.physics.enable(fire, Phaser.Physics.ARCADE);
	fire.animations.add('fire', [0, 1, 2, 3], 10, false);
	if(wizard.scale.x == 1){
		fire.body.velocity.x = -70;
	}
	else fire.body.velocity.x = 70;
	fire.body.velocity.y = 700;
	fire.type = 'f';

}

Fire.prototype.type = 'f';

Fire.prototype.sequence = function () {
	fsequence = "";
	var letters = "QWER"
	for (var i=0; i<fseqlength; i++)
	{
		fsequence += letters.charAt(Math.floor(Math.random() * letters.length));
		text2.addColor('#ff0000', 20 + i);
	}
	text2.setText("Firestorm Sequence: " + fsequence);
}