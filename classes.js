class Vector2 {

	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	applyForce(force, angle) {
		this.x += Math.cos(angle) * force;
		this.y += Math.sin(angle) * force;
	}
}

class GameObject {

	position = new Vector2(0, 0);
	speed = new Vector2(0, 0);
	angle = 0;

	constructor() { }
}

class KeyState {

	pressed = false;
	lifted = false;
	holding = false;

	constructor() { }

	falsifyPressLift() {
		this.pressed = false;
		this.lifted = false;
	}
}

class Key {

	state = new KeyState();

	constructor(code) {
		this.code = code;
	}
}