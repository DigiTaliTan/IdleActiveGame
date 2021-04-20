/* INIT */

var player = new GameObject();
player.position.x = 100;
player.position.y = 100;
var keySpace = new Key(32);
var keyLeft = new Key(37);
var keyUp = new Key(38);
var keyRight = new Key(39);

/* UPDATE */

window.requestAnimationFrame(updateCanvas);
function updateCanvas() {

	var canvas = document.getElementById("game-canvas");
	var context = canvas.getContext('2d')

	// Interpret key states
	if (keyLeft.holding) {
		player.angle -= 1;
	} else if (keyRight.holding) {
		player.angle += 1;
	}

	if (player.angle < 0) { player.angle = 359; }
	else if (player.angle > 359) { player.angle = 0; }

	if (keyUp.holding) {
		player.speed.applyForce(0.01, degToRads(player.angle));
	}

	// Apply player forces
	player.position.x += player.speed.x;
	player.position.y += player.speed.y;

	// Position wrapping
	if (player.position.x > canvas.width) { player.position.x = 0; }
	else if (player.position.x < 0) { player.position.x = canvas.width; }
	if (player.position.y > canvas.height) { player.position.y = 0; }
	else if (player.position.y < 0) { player.position.y = canvas.height; }

	// Draw
	context.save();
	context.clearRect(0, 0, canvas.width, canvas.height);

	context.translate(player.position.x, player.position.y);
	context.rotate(degToRads(player.angle));
	context.translate(-player.position.x, -player.position.y);
	context.drawImage(document.getElementById("asset-ship"), player.position.x - 8, player.position.y - 8);
	context.rotate(-degToRads(player.angle));

	context.restore();

	// Falsify key press and lift
	keyLeft.state.falsifyPressLift();
	keyUp.state.falsifyPressLift();
	keyRight.state.falsifyPressLift();

	// Update
	window.requestAnimationFrame(updateCanvas);
}


/* USER INPUT */

document.addEventListener('keydown', inputKeyDown);
document.addEventListener('keyup', inputKeyUp);

function inputKeyDown(e) {
	switch (e.keyCode) {
		case keySpace.code:
			keySpace.pressed = true;
			keySpace.holding = true;
			break;

		case keyLeft.code:
			keyLeft.pressed = true;
			keyLeft.holding = true;
			break;

		case keyUp.code:
			keyUp.pressed = true;
			keyUp.holding = true;
			break;

		case keyRight.code:
			keyRight.pressed = true;
			keyRight.holding = true;
			break;
	}
}

function inputKeyUp(e) {
	switch (e.keyCode) {
		case keySpace.code:
			keySpace.lifted = true;
			keySpace.holding = false;
			break;

		case keyLeft.code:
			keyLeft.lifted = true;
			keyLeft.holding = false;
			break;

		case keyUp.code:
			keyUp.lifted = true;
			keyUp.holding = false;
			break;

		case keyRight.code:
			keyRight.lifted = true;
			keyRight.holding = false;
			break;
	}
}

function degToRads(deg) {
	return Math.PI / 180 * deg;
}