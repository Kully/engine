const FPS = 60;
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;
const CANVAS_BKGD_COLOR = "#E45826";
const GROUND_COLOR = "#151D3B";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const CONTROLLER = {
	ArrowLeft: 0,
	ArrowRight: 0
}

const CHARACTER = {
	x: Math.floor(CANVAS_WIDTH/2),
	y: 400,
	width: 32,
	height: 64,
	speed: 0,
	color: "#FFFBE9",
}

// grab controller inputs
document.addEventListener("keydown", function(e) {
	if(e.key === "ArrowLeft")
	{
		CONTROLLER["ArrowLeft"]	= 1;
	}
	if(e.key === "ArrowRight")
	{
		CONTROLLER["ArrowRight"] = 1;
	}

});

document.addEventListener("keyup", function(e) {
	if(e.key === "ArrowLeft")
	{
		CONTROLLER["ArrowLeft"]	= 0;
	}
	if(e.key === "ArrowRight")
	{
		CONTROLLER["ArrowRight"] = 0;
	}
});




// game loop
setInterval(function(e) {
	// refresh the screen
	ctx.fillStyle = CANVAS_BKGD_COLOR;
	ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

	// update character
	CHARACTER["x"] += -2 * CONTROLLER["ArrowLeft"] + 2 * CONTROLLER["ArrowRight"];

	// draw ground
	ctx.fillStyle = GROUND_COLOR;
	ctx.fillRect(
		0,
		400 + CHARACTER["height"],
		CANVAS_WIDTH,
		CANVAS_HEIGHT - 400 - CHARACTER["height"]
	)

	// draw character
	ctx.fillStyle = CHARACTER["color"];
	ctx.fillRect(
		CHARACTER["x"],
		CHARACTER["y"],
		CHARACTER["width"],
		CHARACTER["height"]
	)
}, 1000 / FPS)
