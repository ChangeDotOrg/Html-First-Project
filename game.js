/**
  * 
  * @author Hampton Brewer
  * @program A simple game program named Change~
  * @version 0.11
  * @lastUpdate 07-06-15
*/

//makes the request point to browser being used.
var requestAnimationFrame = (function () {
	return window.requestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.oRequestAnimationFrpame ||
		window.msRequestAnimationFrame ||
		function () {
			window.setTimeout(callback, 1000 / 60);
		};
})();


//New Movement
var canvas = document.getElementById("gameCanvas");  //finds canvas element
var ctx = canvas.getContext("2d"); //built in html object, for drawing
var keysDown = [];

/*
var music = document.getElementById("music"); //listener for music to be played
music.volume = 0.30;  //sets volume to 30%
var laser = document.getElementById("laser");
laser.volume = 0.15;
var laser1 = document.getElementById("laser1");
laser1.volume = 0.15;
var laser2 = document.getElementById("laser2");
laser2.volume = 0.15;
var laser3 = document.getElementById("laser3");
laser3.volume = 0.15;
var gameover = document.getElementById("gameover");
gameover.volume = 0.50;
var missed = document.getElementById("missed");
missed.volume = 0.25;
var collision = document.getElementById("collision");
collision.volume = 0.50;
*/
var nameSuccessful = false; //tells when name entered correctly to hide elements
canvas.width = 704;//document.documentElement.clientWidth -30; //650
canvas.height = 576;//document.documentElement.clientHeight - 250;  //525
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
window.addEventListener("keydown", keyDownCallback, false);
window.addEventListener("keyup", keyUpCallback, false);
window.addEventListener("resize", resizeCanvas, false);

$("#gameCanvas").mousedown(function (e) { handleMouseDown(e); });
$("#gameCanvas").mousemove(function (e) { handleMouseMove(e); });
$("#gameCanvas").mouseup(function (e) { handleMouseUp(e); });
$("#gameCanvas").mouseout(function (e) { handleMouseOut(e); });
var canvasOffset = $("#gameCanvas").offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;
var isDragging = false;
var castBarX, castBarY;
var playerMovingX;
var playerMovingY;
var playerMoving = false;
//mouse movements
function handleMouseDown(e) {
	e.preventDefault();
	canMouseX = parseInt(e.clientX - offsetX);
	canMouseY = parseInt(e.clientY - offsetY);
	//isDragging=true;
	// set the drag flag - figure out to only drag if making contact
	if (bag.opened == true) {
		for (var i = 0; i < bag.slots.length; i++) {
			if (hits([e.clientX - offsetX, e.clientY - offsetY], [1, 1], [bag.slots[i].sprite.x, bag.slots[i].sprite.y], [32, 32])) {
				isDragging = true;
				bag.slots[i].isDragging = true;
			}
		}
	}
	for (var i = 0; i < castbar.length; i++) {
		if (hits([e.clientX - offsetX, e.clientY - offsetY], [1, 1], [castbar[i].sprite.x, castbar[i].sprite.y], [32, 32])) {
			isDragging = true;
			castbar[i].isDragging = true;
			castBarX = canMouseX - 16;
			castBarY = canMouseY - 16;
		}
	}
	// playerMovingX = canMouseX;
	// playerMovingY = canMouseY;
	// playerMoving = true;
}
var hasbeendone = false; //checks if there is an open spot on the cast bar
function handleMouseUp(e) {
	e.preventDefault();
	canMouseX = parseInt(e.clientX - offsetX);
	canMouseY = parseInt(e.clientY - offsetY);
	// playerMoving = false;
	for (var i = 0; i < bag.slots.length; i++) { //Dragging item from bag
		if (bag.slots[i].isDragging == true) {
			bag.slots[i].isDragging = false;
			hasbeendone = false;
			if (hits([e.clientX - offsetX, e.clientY - offsetY], [1, 1], [0, 544], [206, 32])) { //checks if placed over castbar
				bag.slots[i].sprite.x = canMouseX - 16;
				bag.slots[i].sprite.y = canMouseY - 16;
				var holdBag = bag.slots[i];
				castBarTest(holdBag); //calls to check if there is something in each cast bar
				if (hasbeendone == false) {
					castbar.push(bag.slots[i]);
					bag.slots.splice(i, 1);
					i--;
				}
				//castBar();
				break;
			}
			//if(hits([e.clientX-offsetX,e.clientY-offsetY],[1,1],[0,544],[206,32])){
			//	break;
			//}
			else {  //place back into items
				bag.slots[i].sprite.x = canMouseX - 16;
				bag.slots[i].sprite.y = canMouseY - 16;
				items.push(bag.slots[i]);
				bag.slots.splice(i, 1);
				i--;
				break;
			}

		}
	}
	if (hits([e.clientX - offsetX, e.clientY - offsetY], [1, 1], [0, 544], [246, 32]) && isDragging == false) {
		if (canMouseX > 206 && canMouseX < 246) {
			if (bag.opened == true) {
				bag.opened = false;
			}
			else {
				bag.opened = true;
			}
			updateAnimation(playerInterface[0].sprite.stateAnimations[playerInterface[0].sprite.currentState]);
		}
	}

	//castbar 
	for (var i = 0; i < castbar.length; i++) {
		if (castbar[i].isDragging == true) {
			//castbar[i].isDragging = false;
			castbar[i].sprite.x = canMouseX - 16;
			castbar[i].sprite.y = canMouseY - 16;
			hasbeendone = false;
			if (hits([e.clientX - offsetX, e.clientY - offsetY], [1, 1], [0, 544], [206, 32])) { //put in castbar
				var holdBag = castbar[i];
				castBarTest(holdBag); //returns hasbeendone true if space bar taken up
				if (hasbeendone == false) {
					castbar[i].isDragging = false;
					//removeFromCastbar(castBarX);
					removeFromCastbar(castbar[i].onCastBar);
					break;
				}
				else {
					//removeFromCastbar(castBarX);
					removeFromCastbar(castbar[i].onCastBar);
					castbar[i].sprite.x = castBarX;
					castbar[i].sprite.y = castBarY;
					castbar[i].isDragging = false;
					break;
				}
			}
			else if (hits([e.clientX - offsetX, e.clientY - offsetY], [1, 1], [265, 445], [100, 100]) && bag.slots.length < 9) { //put in bag
				//removeFromCastbar(castBarX); //take off of castbar spot
				removeFromCastbar(castbar[i].onCastBar);
				castbar[i].onCastBar = -1;
				castbar[i].isDragging = false;
				bag.slots.push(castbar[i]);
				castbar.splice(i, 1);
				i--;
				break;
			}
			else if (hits([e.clientX - offsetX, e.clientY - offsetY], [1, 1], [206, 544], [40, 32]) && bag.slots.length < 9) {
				//removeFromCastbar(castBarX); //take off of castbar spot
				removeFromCastbar(castbar[i].onCastBar);
				castbar[i].onCastBar = -1;
				castbar[i].isDragging = false;
				bag.slots.push(castbar[i]);
				castbar.splice(i, 1);
				break;
			}
			else {
				castbar[i].sprite.x = castBarX;
				castbar[i].sprite.y = castBarY;
				castbar[i].isDragging = false;
			}
		}
	}

	isDragging = false;
}

function handleMouseOut(e) {
	e.preventDefault();
	canMouseX = parseInt(e.clientX - offsetX);
	canMouseY = parseInt(e.clientY - offsetY);
	// user has left the canvas, so clear the drag flag
	isDragging = false;
}

function handleMouseMove(e) {
	e.preventDefault();
	canMouseX = parseInt(e.clientX - offsetX);
	canMouseY = parseInt(e.clientY - offsetY);
	if (isDragging == true) {
		for (var i = 0; i < bag.slots.length; i++) {
			if (bag.slots[i].isDragging == true) {
				bag.slots[i].sprite.x = canMouseX - 16;
				bag.slots[i].sprite.y = canMouseY - 16;
			}
		}
		for (var i = 0; i < castbar.length; i++) {
			if (castbar[i].isDragging == true) {
				castbar[i].sprite.x = canMouseX - 16;
				castbar[i].sprite.y = canMouseY - 16;
			}
		}
	}
}
function keyDownCallback(e) {
	if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
		e.preventDefault();
	}
	keysDown[e.keyCode] = true;
}

function keyUpCallback(e) {
	if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
		e.preventDefault();
	}
	keysDown[e.keyCode] = false;
}

//resizesCanvas areas to alter functions needing to be changed if window size changes
function resizeCanvas(e) {
	//canvas.style.width = window.innerWidth + 'px';  //extends size of window mouse doesn't work
	//canvas.style.height = window.innerHeight + 'px';
	canvasOffset = $("#gameCanvas").offset();
	offsetX = canvasOffset.left;
	offsetY = canvasOffset.top;
}

function collides(x, y, r, b, x2, y2, r2, b2) {
	return !(r <= x2 || x > r2 ||
		b <= y2 || y > b2);
}

function hits(pos, size, pos2, size2) {  //tests if objects are touching or not
	return collides(pos[0], pos[1],
		pos[0] + size[0], pos[1] + size[1],
		pos2[0], pos2[1],
		pos2[0] + size2[0], pos2[1] + size2[1]);
}

var points = { //keeps track of certain things
	hits: 0,  //enemy # destroyed
	gameover: false, //tells if games over
	paused: true, //tells if games paused
	isFreePlay: true, //game type
};


// variables for update()
var lastSpell = Date.now();
var lastFire = Date.now(); var lastFire2 = Date.now(); var lastFire3 = Date.now();
var lastArrow = Date.now();
var lastPlayerHit = Date.now();
var lastPotion = Date.now(); var potionUses = true;
var lastSkeletonAdded = Date.now(); var skeletonCount = 0;
var temp;
var fenceBlocked = false;
var spellDisplay = { //tracks damage dealt by the player and shows it
	heal: false,
	damage: -1,
	hit: false,
	x: 0,
	y: 0,
	time: 0
};

var castBarHold = [];
for (var i = 0; i < 6; i++) {
	castBarHold[i] = false;
}

function castBarTest(holdBag) {  //tests to see if slots has something or not in it
	hasbeendone = true;
	if (holdBag.sprite.x < 32 && castBarHold[0] == false) {
		//castBarHold[0] = true;
		hasbeendone = false;
	}
	if (holdBag.sprite.x < 64 && holdBag.sprite.x > 32 && castBarHold[1] == false) {
		//castBarHold[1] = true;
		hasbeendone = false;
	}
	if (holdBag.sprite.x < 96 && holdBag.sprite.x > 64 && castBarHold[2] == false) {
		//castBarHold[2] = true;
		hasbeendone = false;
	}
	if (holdBag.sprite.x < 128 && holdBag.sprite.x > 96 && castBarHold[3] == false) {
		//castBarHold[3] = true;
		hasbeendone = false;
	}
	if (holdBag.sprite.x < 160 && holdBag.sprite.x > 128 && castBarHold[4] == false) {
		//castBarHold[4] = true;
		hasbeendone = false;
	}
	if (holdBag.sprite.x < 192 && holdBag.sprite.x > 160 && castBarHold[5] == false) {
		//castBarHold[5] = true;
		hasbeendone = false;
	}
}
function removeFromCastbar(onCastBar) {//(castBarX){  
	/*
	if(castBarX < 32 && castBarHold[0] == true){
		castBarHold[0] = false;
	}
	if(castBarX < 64 && castBarX > 32 && castBarHold[1] == true){
		castBarHold[1] = false;
	}
	if(castBarX < 96 && castBarX > 64 && castBarHold[2] == true){
		castBarHold[2] = false;
	}
	if(castBarX < 128 && castBarX > 96 && castBarHold[3] == true){
		castBarHold[3] = false;
	}
	if(castBarX < 160 && castBarX > 128 && castBarHold[4] == true){
		castBarHold[4] = false;
	}
	if(castBarX < 192 && castBarX > 160 && castBarHold[5] == true){
		castBarHold[5] = false;
	}*/
	switch (onCastBar) {
		case 0: castBarHold[0] = false;
		case 1: castBarHold[1] = false;
		case 2: castBarHold[2] = false;
		case 3: castBarHold[3] = false;
		case 4: castBarHold[4] = false;
		case 5: castBarHold[5] = false;
	}
}

function update(t) {//keyCodes up:38, down: 40, left: 37, right: 39, spacebar:32
	lootItem(items);  //calls to loot on any dropped items
	keyEvents();
	//check if enemy spell is hitting player
	for (var i = 0; i < enemySpell.length; i++) {
		if (hits([player.sprite.x + 10, player.sprite.y], [25, 25], [enemySpell[i].sprite.x + 20, enemySpell[i].sprite.y + 14], [20, 16])) {
			player.health -= enemySpell[i].damage;
			spellDisplay.heal = false;
			spellDisplay.damage = enemySpell[i].damage;
			//spellDisplay.damage = spell[i].damage;
			spellDisplay.x = player.sprite.x;
			spellDisplay.y = player.sprite.y;
			spellDisplay.time = 0;
			spellDisplay.hit = true;
			enemySpell.splice(i, 1);
		}
	}
	if (playerMoving) {
		player.sprite.currentState = 'up';
		updateAnimation(player.sprite.stateAnimations[player.sprite.currentState]);
		player.sprite.y -= player.sprite.speed * t;
	}
	if (keysDown[38] == true || keysDown[87] == true) {//up
		if (keysDown[32] == true) {
		}
		else {
			player.sprite.currentState = 'up';
			updateAnimation(monsters[1].sprite.stateAnimations[monsters[1].sprite.currentState]);
			updateAnimation(monsters[0].sprite.stateAnimations[monsters[0].sprite.currentState]);
			updateAnimation(player.sprite.stateAnimations[player.sprite.currentState]);
		}
		if (player.sprite.y > 0) {
			for (var i = 0; i < tree.length; i++) {
				if (hits([player.sprite.x, player.sprite.y], [32, 6], [tree[i].sprite.x + 14, tree[i].sprite.y], [26, 28])) {
					fenceBlocked = true;
					//player.sprite.x = player.lastX; //put player back in bounds
					//player.sprite.y = player.lastY;
				}
			}
			for (var i = 0; i < doors.length; i++) {
				if (hits([player.sprite.x, player.sprite.y], [32, 32], [doors[i].sprite.x, doors[i].sprite.y], [32, 24])) {
					fenceBlocked = true;
				}
			}
			for (var i = 0; i < walls.length; i++) {
				if (hits([player.sprite.x + 4, player.sprite.y], [26, 32], [walls[i].sprite.x, walls[i].sprite.y], [32, 24])) {
					fenceBlocked = true;
				}
			}
			if (fenceBlocked) {
				fenceBlocked = false;
			}
			else {
				player.sprite.y -= player.sprite.speed * t;
			}
		}
	}
	if (keysDown[40] == true || keysDown[83] == true) {//down
		if (keysDown[32] == true) {
		}
		else {
			player.sprite.currentState = 'down';
			updateAnimation(monsters[1].sprite.stateAnimations[monsters[1].sprite.currentState]);
			updateAnimation(monsters[0].sprite.stateAnimations[monsters[0].sprite.currentState]);
			updateAnimation(player.sprite.stateAnimations[player.sprite.currentState]);
		}
		for (var i = 0; i < tree.length; i++) {
			if (hits([player.sprite.x, player.sprite.y], [32, 10], [tree[i].sprite.x + 14, tree[i].sprite.y - 2], [26, 24]) ||
				hits([0, canvasHeight], [canvasWidth, 0], [player.sprite.x, player.sprite.y], [32, 32])) {
				fenceBlocked = true;
				//player.sprite.x = player.lastX; //put player back in bounds
				//player.sprite.y = player.lastY;
			}
		}
		for (var i = 0; i < edge.length; i++) {
			if (hits([edge[i].sprite.x + 4, edge[i].sprite.y], [226, 230], [player.sprite.x, player.sprite.y], [32, 32])) { //hits edge
				fenceBlocked = true;
				//player.sprite.x = player.lastX; //put player back in bounds
				//player.sprite.y = player.lastY;
			}
		}
		for (var i = 0; i < doors.length; i++) {
			if (hits([player.sprite.x, player.sprite.y], [32, 32], [doors[i].sprite.x, doors[i].sprite.y], [32, 20])) {
				fenceBlocked = true;
			}
		}
		for (var i = 0; i < walls.length; i++) {
			if (hits([player.sprite.x + 3, player.sprite.y], [26, 32], [walls[i].sprite.x, walls[i].sprite.y], [32, 20])) {
				fenceBlocked = true;
			}
		}
		if (fenceBlocked) {
			fenceBlocked = false;
		}
		else {
			player.sprite.y += player.sprite.speed * t;
		}
	}
	if (keysDown[37] == true || keysDown[65] == true) {//left
		//box.x -= box.speed * t;
		if (keysDown[32] == true) {
		}
		else {
			player.sprite.currentState = 'left';
			updateAnimation(monsters[1].sprite.stateAnimations[monsters[1].sprite.currentState]);
			updateAnimation(monsters[0].sprite.stateAnimations[monsters[0].sprite.currentState]);
			updateAnimation(player.sprite.stateAnimations[player.sprite.currentState]);
		}
		for (var i = 0; i < tree.length; i++) {
			if (hits([player.sprite.x, player.sprite.y], [32, 10], [tree[i].sprite.x + 14, tree[i].sprite.y + 4], [32, 20]) ||
				hits([player.sprite.x, player.sprite.y], [32, 10], [0, 0], [0, canvasHeight])) {
				fenceBlocked = true;
				//player.sprite.x = player.lastX; //put player back in bounds
				//player.sprite.y = player.lastY;
			}
		}
		for (var i = 0; i < doors.length; i++) {
			if (hits([player.sprite.x, player.sprite.y + 12], [29, 20], [doors[i].sprite.x, doors[i].sprite.y], [32, 32])) {
				fenceBlocked = true;
			}
		}
		for (var i = 0; i < walls.length; i++) {
			if (hits([player.sprite.x, player.sprite.y + 12], [29, 20], [walls[i].sprite.x, walls[i].sprite.y], [32, 32])) {
				fenceBlocked = true;
			}
		}
		if (fenceBlocked) {
			fenceBlocked = false;
		}
		else {
			player.sprite.x -= player.sprite.speed * t;
		}
	}
	if (keysDown[39] == true || keysDown[68] == true) {//right
		// box.x += box.speed * t;
		if (keysDown[32] == true) {
		}
		else {
			player.sprite.currentState = 'right';
			updateAnimation(monsters[1].sprite.stateAnimations[monsters[1].sprite.currentState]);
			updateAnimation(monsters[0].sprite.stateAnimations[monsters[0].sprite.currentState]);
			updateAnimation(player.sprite.stateAnimations[player.sprite.currentState]);
		}
		for (var i = 0; i < tree.length; i++) {
			if (hits([player.sprite.x, player.sprite.y], [32, 10], [tree[i].sprite.x + 10, tree[i].sprite.y + 4], [14, 20]) ||
				hits([player.sprite.x, player.sprite.y], [32, 10], [canvasWidth, 0], [0, canvasHeight])) {
				fenceBlocked = true;
				//player.sprite.x = player.lastX; //put player back in bounds
				//player.sprite.y = player.lastY;
			}
		}
		for (var i = 0; i < edge.length; i++) {  //blocks from going onto the island
			if (hits([edge[i].sprite.x, edge[i].sprite.y + 4], [230, 226], [player.sprite.x, player.sprite.y], [32, 32])) { //hits edge
				fenceBlocked = true;
				//player.sprite.x = player.lastX; //put player back in bounds
				//player.sprite.y = player.lastY;
			}
		}
		for (var i = 0; i < doors.length; i++) {
			if (hits([player.sprite.x, player.sprite.y + 12], [32, 20], [doors[i].sprite.x, doors[i].sprite.y], [32, 32])) {
				fenceBlocked = true;
			}
		}
		for (var i = 0; i < walls.length; i++) {
			if (hits([player.sprite.x, player.sprite.y + 12], [32, 20], [walls[i].sprite.x, walls[i].sprite.y], [32, 32])) {
				fenceBlocked = true;
			}
		}
		if (fenceBlocked) {
			fenceBlocked = false;
		}
		else {
			player.sprite.x += player.sprite.speed * t;
		}
		if (player.sprite.x > canvasWidth - 20) {
			//player.sprite.x = -15;
		}
	}

	//updates spell casting
	if (keysDown[49] == true) {  //for # 1
		for (var i = 0; i < castbar.length; i++) {
			if (castbar[i].onCastBar == 0) {
				if (castbar[i].tag = 'spell') {
					var holdSpell = castbar[i];
					castSpell(holdSpell);
				}
				if (castbar[i].tag = 'potion') {
					var holdPotion = castbar[i];
					usePotion(holdPotion);
					if (potionUses == false) { //means the potion is out of uses
						//  castbar[i].splice(i,1);
						//	potionUses = true;
						//	i--;
						castbar[i].sprite.currentState = 'empty';
						updateAnimation(castbar[i].sprite.stateAnimations[castbar[i].sprite.currentState]);
						potionUses = true;
					}
				}
			}
		}
	}
	if (keysDown[50] == true) { //2
		for (var i = 0; i < castbar.length; i++) {
			if (castbar[i].onCastBar == 1) {
				if (castbar[i].tag = 'spell') {
					var holdSpell = castbar[i];
					castSpell(holdSpell);
				}
				if (castbar[i].tag = 'potion') {
					var holdPotion = castbar[i];
					usePotion(holdPotion);
					if (potionUses == false) { //means the potion is out of uses
						castbar[i].sprite.currentState = 'empty';
						updateAnimation(castbar[i].sprite.stateAnimations[castbar[i].sprite.currentState]);
						potionUses = true;
					}
				}
			}
		}
	}
	//fireFlash
	if (keysDown[51] == true) { // 3
		for (var i = 0; i < castbar.length; i++) {
			if (castbar[i].onCastBar == 2) {
				if (castbar[i].tag = 'spell') {
					var holdSpell = castbar[i];
					castSpell(holdSpell);
				}
				if (castbar[i].tag = 'potion') {
					var holdPotion = castbar[i];
					usePotion(holdPotion);
					if (potionUses == false) { //means the potion is out of uses
						castbar[i].sprite.currentState = 'empty';
						updateAnimation(castbar[i].sprite.stateAnimations[castbar[i].sprite.currentState]);
						potionUses = true;
					}
				}
			}
		}
	}
	//holy spell
	if (keysDown[52] == true) { //4
		for (var i = 0; i < castbar.length; i++) {
			if (castbar[i].onCastBar == 3) {
				if (castbar[i].tag = 'spell') {
					var holdSpell = castbar[i];
					castSpell(holdSpell);
				}
				if (castbar[i].tag = 'potion') {
					var holdPotion = castbar[i];
					usePotion(holdPotion);
					if (potionUses == false) { //means the potion is out of uses
						castbar[i].sprite.currentState = 'empty';
						updateAnimation(castbar[i].sprite.stateAnimations[castbar[i].sprite.currentState]);
						potionUses = true;
					}
				}
			}
		}
	}
	if (keysDown[53] == true) { //5
		for (var i = 0; i < castbar.length; i++) {
			if (castbar[i].onCastBar == 4) {
				if (castbar[i].tag = 'spell') {
					var holdSpell = castbar[i];
					castSpell(holdSpell);
				}
				if (castbar[i].tag = 'potion') {
					var holdPotion = castbar[i];
					usePotion(holdPotion);
					if (potionUses == false) { //means the potion is out of uses
						castbar[i].sprite.currentState = 'empty';
						updateAnimation(castbar[i].sprite.stateAnimations[castbar[i].sprite.currentState]);
						potionUses = true;
					}
				}
			}
		}
	}
	if (keysDown[54] == true) { //6
		for (var i = 0; i < castbar.length; i++) {
			if (castbar[i].onCastBar == 5) {
				if (castbar[i].tag = 'spell') {
					var holdSpell = castbar[i];
					castSpell(holdSpell);
				}
				if (castbar[i].tag = 'potion') {
					var holdPotion = castbar[i];
					usePotion(holdPotion);
					if (potionUses == false) { //means the potion is out of uses
						castbar[i].sprite.currentState = 'empty';
						updateAnimation(castbar[i].sprite.stateAnimations[castbar[i].sprite.currentState]);
						potionUses = true;
					}
				}
			}
		}
	}
	for (var i = 0; i < spell.length; i++) {
		switch (spell[i].dir) {
			case 'right': spell[i].sprite.x += spell[i].sprite.speed * t; break;
			case 'left': spell[i].sprite.x -= spell[i].sprite.speed * t; break;
			case 'up': spell[i].sprite.y -= spell[i].sprite.speed * t; break;
			case 'down': spell[i].sprite.y += spell[i].sprite.speed * t; break;
		}
		updateAnimation(spell[i].sprite.stateAnimations[spell[i].sprite.currentState]);
		if (spell[i].sprite.x > canvasWidth || spell[i].sprite.y > canvasHeight || spell[i].sprite.x < -20 || spell[i].sprite.y < -20) {
			spell.splice(i, 1);
			i--;
		}
	}

	/*
	if(monsters.length < 1){
		for(var i=0; i<monsters.length; i++){
			}
		var x = 650;//Math.floor((Math.random() * (canvas.width-(54))) + 5);
		var y = 440;//Math.floor((Math.random() * (canvas.height-(54))) + 5);
		var z = 'leftStart';
		monsters.push({
			lastX: x,
			lastY: y,
			health: 15,
			type: 'human',
			typeClass: 'archer',
			weakness: 'unLife',
			pos:[x,y],
			dir: z,
			sprite: new Sprite({'leftStart': archerLeft,'down': archerDown,'up': archerUp,'left': archerLeft,'right': archerRight}, z, x, y, 47, 47, 40)
		});
		
	}
	else{
		switch(monsters[0].dir){
		case 'down': if(monsters[0].sprite.y < 450){monsters[0].sprite.y += monsters[0].sprite.speed*t}else{monsters[0].dir = 'right';monsters[0].sprite.currentState = 'right';};updateAnimation(monsters[0].sprite.stateAnimations[monsters[0].sprite.currentState]);break;
		case 'right': if(monsters[0].sprite.x < 580){monsters[0].sprite.x += monsters[0].sprite.speed*t}else{monsters[0].dir = 'up';monsters[0].sprite.currentState = 'up';};updateAnimation(monsters[0].sprite.stateAnimations[monsters[0].sprite.currentState]);break;
		case 'leftStart': if(monsters[0].sprite.x > 580){monsters[0].sprite.x -= monsters[0].sprite.speed*t}else{monsters[0].dir = 'up';monsters[0].sprite.currentState = 'up';};updateAnimation(monsters[0].sprite.stateAnimations[monsters[0].sprite.currentState]);break;
		case 'up': if(monsters[0].sprite.y > 340){monsters[0].sprite.y -= monsters[0].sprite.speed*t}else{monsters[0].dir = 'left';monsters[0].sprite.currentState = 'left';};updateAnimation(monsters[0].sprite.stateAnimations[monsters[0].sprite.currentState]);break;
		case 'left': if(monsters[0].sprite.x > 475){monsters[0].sprite.x -= monsters[0].sprite.speed*t}else{monsters[0].dir = 'down';monsters[0].sprite.currentState = 'down';};updateAnimation(monsters[0].sprite.stateAnimations[monsters[0].sprite.currentState]);break;
		}
		
	}
	if(hits([player.sprite.x,player.sprite.y],[32,32],[monsters[0].sprite.x+15,monsters[0].sprite.y+15],[35,33]) && Date.now() - lastPlayerHit > 1000){
		player.health -=5;
		lastPlayerHit = Date.now();
	}
  
	if(Date.now() - lastArrow > 600 && monsters[0].sprite.currentState != 'leftStart'){ //doesn't fire when archer first entering area
		//updateAnimation(monsters[0].sprite.stateAnimations[monsters[0].sprite.currentState]);
		var x = monsters[0].sprite.x;
		var y = monsters[0].sprite.y;
		var z = monsters[0].sprite.currentState;
		enemySpell.push({
			lastX: x,
			lastY: y,
			hit: [x,y],
			type: 'arrow',
			damage: 5,
			pos: [x,y],
			dir: z,
			sprite: new Sprite({'up': arrowUp,'down': arrowDown,'left': arrowLeft,'right': arrowRight}, z, x, y, 31, 31, 260),
		});
		lastArrow = Date.now();
	}
  
//checks if spell hits demon or not
	for(var i=0; i<spell.length; i++){
		if(hits([spell[i].sprite.x,spell[i].sprite.y],[25,25],[monsters[0].sprite.x+20,monsters[0].sprite.y+14],[20,16])){
			if(monsters[0].weakness == spell[i].type){
				monsters[0].health -= spell[i].damage*2;
				spellDisplay.damage = spell[i].damage*2;
			}
			else{
				monsters[0].health -= spell[i].damage;
				spellDisplay.damage = spell[i].damage;
			}
			//spellDisplay.damage = spell[i].damage;
			spellDisplay.heal = false;
			spellDisplay.x = monsters[0].sprite.x;
			spellDisplay.y = monsters[0].sprite.y;
			spellDisplay.time = 0;
			spellDisplay.hit = true;
			if(monsters[0].health <= 0){
				monsters.splice(0,1);
				points.hits +=1;
			}
			spell.splice(i,1);
			break;
		}
	}
	*/

	//WORK FOR DIG TO ATTACK
	for (var i = 0; i < monsters.length; i++) {
		if (monsters[i].name == 'smallDig') {
			if (hits([player.sprite.x, player.sprite.y], [32, 32], [monsters[i].sprite.x - 112, monsters[i].sprite.y - 112], [256, 256])) {
				if (player.sprite.y > monsters[i].sprite.y) {
					monsters[i].sprite.y += monsters[i].sprite.speed * t;
				}
				else if (player.sprite.y + 32 < monsters[i].sprite.y) {
					monsters[i].sprite.y -= monsters[i].sprite.speed * t;
				}
				else if (player.sprite.x < monsters[i].sprite.x - 32) {
					monsters[i].sprite.x -= monsters[i].sprite.speed * t;
				}
				else if (player.sprite.x > monsters[i].sprite.x + 32) {
					monsters[i].sprite.x += monsters[i].sprite.speed * t;
				}

			}
		}
	}
	for (var i = 0; i < enemySpell.length; i++) {
		switch (enemySpell[i].dir) {
			case 'right': enemySpell[i].sprite.x += enemySpell[i].sprite.speed * t; break;
			case 'left': enemySpell[i].sprite.x -= enemySpell[i].sprite.speed * t; break;
			case 'up': enemySpell[i].sprite.y -= enemySpell[i].sprite.speed * t; break;
			case 'down': enemySpell[i].sprite.y += enemySpell[i].sprite.speed * t; break;
		}
		updateAnimation(enemySpell[i].sprite.stateAnimations[enemySpell[i].sprite.currentState]);
		if (enemySpell[i].sprite.x > canvasWidth || enemySpell[i].sprite.y > canvasHeight || enemySpell[i].sprite.x < -20 || enemySpell[i].sprite.y < -20) {
			enemySpell.splice(i, 1);
			i--;
		}
	}

	//SKELETON
	if (Date.now() - lastSkeletonAdded > 5000 && skeletonCount == 0) {
		var x = 200;//Math.floor((Math.random() * (100)) + 5);
		var y = 10;//Math.floor((Math.random() * (canvas.height-(54))) + 5);
		var p = Math.floor((Math.random() * 4) + 0); //randoms 0-3
		var z;
		switch (p) {
			case 0: z = 'down'; x = 180; y = 150; break;
			case 1: z = 'up'; x = 180; y = 115; break;
			case 2: z = 'left'; x = 140; y = 90; break;
			case 3: z = 'right'; x = 80; y = 90; break;
			case 4: z = 'down1'; x = 13; y = 30; break;
			case 5: z = 'up1'; x = 13; y = 70; break;
			case 6: z = 'left1'; x = 215; y = 13; break;
			case 7: z = 'right1'; x = 100; y = 13; break;
		}
		skeleton.push({
			lastX: x,
			lastY: y,
			entityNum: 1,
			path: 0,
			type: 'undead',
			weakness: 'holy',
			health: 25,
			pos: [x, y],
			dir: z,
			sprite: new Sprite({ 'up': skeletonUp, 'down': skeletonDown, 'right': skeletonRight, 'left': skeletonLeft }, z, x, y, 32, 32, 100)
		});
		lastSkeletonAdded = Date.now();
		if (skeletonCount <= 1000) {
			skeletonCount++;
		}
	}
	for (var i = 0; i < skeleton.length; i++) {
		if (skeleton[i].entityNum == 1) {
			switch (skeleton[i].dir) {
				case 'down': if (skeleton[i].sprite.y < 170) {
					skeleton[i].sprite.y += skeleton[i].sprite.speed * t; skeleton[i].sprite.currentState = 'down';
					updateAnimation(skeleton[i].sprite.stateAnimations[skeleton[i].sprite.currentState]);
				} else { skeleton[i].dir = 'up'; }; break;
				case 'up': if (skeleton[i].sprite.y > 90) {
					skeleton[i].sprite.y -= skeleton[i].sprite.speed * t; skeleton[i].sprite.currentState = 'up';
					updateAnimation(skeleton[i].sprite.stateAnimations[skeleton[i].sprite.currentState]);
				} else { skeleton[i].dir = 'left'; }; break;
				case 'left': if (skeleton[i].sprite.x > 13) {
					skeleton[i].sprite.x -= skeleton[i].sprite.speed * t; skeleton[i].sprite.currentState = 'left';
					updateAnimation(skeleton[i].sprite.stateAnimations[skeleton[i].sprite.currentState]);
				} else { skeleton[i].dir = 'up1'; }; break;
				case 'right': if (skeleton[i].sprite.x < 180) {
					skeleton[i].sprite.x += skeleton[i].sprite.speed * t; skeleton[i].sprite.currentState = 'right';
					updateAnimation(skeleton[i].sprite.stateAnimations[skeleton[i].sprite.currentState]);
				} else { skeleton[i].dir = 'down'; }; break;
				case 'down1': if (skeleton[i].sprite.y < 90) {
					skeleton[i].sprite.y += skeleton[i].sprite.speed * t; skeleton[i].sprite.currentState = 'down';
					updateAnimation(skeleton[i].sprite.stateAnimations[skeleton[i].sprite.currentState]);
				} else { skeleton[i].dir = 'right'; }; break;
				case 'up1': if (skeleton[i].sprite.y > 13) {
					skeleton[i].sprite.y -= skeleton[i].sprite.speed * t; skeleton[i].sprite.currentState = 'up';
					updateAnimation(skeleton[i].sprite.stateAnimations[skeleton[i].sprite.currentState]);
				} else { skeleton[i].dir = 'right1'; }; break;
				case 'left1': if (skeleton[i].sprite.x > 13) {
					skeleton[i].sprite.x -= skeleton[i].sprite.speed * t; skeleton[i].sprite.currentState = 'left';
					updateAnimation(skeleton[i].sprite.stateAnimations[skeleton[i].sprite.currentState]);
				} else { skeleton[i].dir = 'down1'; }; break;
				case 'right1': if (skeleton[i].sprite.x < 215) {
					skeleton[i].sprite.x += skeleton[i].sprite.speed * t; skeleton[i].sprite.currentState = 'right';
					updateAnimation(skeleton[i].sprite.stateAnimations[skeleton[i].sprite.currentState]);
				} else { skeleton[i].dir = 'left1'; }; break;
			}

		}
	}
	/*
	for(var i=0; i<skeleton.length; i++){
		if(skeleton[i].path < 75){
			skeleton[i].sprite.x += 1;skeleton[i].sprite.speed*t;
		skeleton[i].sprite.currentState = 'right';
		updateAnimation(skeleton[i].sprite.stateAnimations[skeleton[i].sprite.currentState]);
		skeleton[i].path ++;
		}
		else if(skeleton[i].path < 125 && skeleton[i].path >= 75){
			skeleton[i].sprite.y -= 1;//skeleton[i].sprite.speed*t;
		skeleton[i].sprite.currentState = 'up';
		updateAnimation(skeleton[i].sprite.stateAnimations[skeleton[i].sprite.currentState]);
		skeleton[i].path ++;
		}
		else if(skeleton[i].path < 175 && skeleton[i].path >= 125){
			skeleton[i].path ++;
		}	
		else if(skeleton[i].path < 225 && skeleton[i].path >= 175){
			skeleton[i].sprite.y += 1//skeleton[i].sprite.speed*t;
		skeleton[i].sprite.currentState = 'down';
		updateAnimation(skeleton[i].sprite.stateAnimations[skeleton[i].sprite.currentState]);
		skeleton[i].path ++;
		}
		else if(skeleton[i].path < 300 && skeleton[i].path >= 225){
			skeleton[i].sprite.x -= 1;//skeleton[i].sprite.speed*t;
		skeleton[i].sprite.currentState = 'left';
		updateAnimation(skeleton[i].sprite.stateAnimations[skeleton[i].sprite.currentState]);
		skeleton[i].path ++;
		}
		else if(skeleton[i].path < 325 && skeleton[i].path >= 300){
			skeleton[i].sprite.y += 1;skeleton[i].sprite.speed*t;
		skeleton[i].sprite.currentState = 'down';
		updateAnimation(skeleton[i].sprite.stateAnimations[skeleton[i].sprite.currentState]);
		skeleton[i].path ++;
		}
		else if(skeleton[i].path < 400 && skeleton[i].path >= 325){
			skeleton[i].path ++;
		}
		else if(skeleton[i].path < 425 && skeleton[i].path >= 400){
			skeleton[i].sprite.y -= 1;skeleton[i].sprite.speed*t;
		skeleton[i].sprite.currentState = 'up';
		updateAnimation(skeleton[i].sprite.stateAnimations[skeleton[i].sprite.currentState]);
		skeleton[i].path ++;
		}
		else{
			skeleton[i].path = 0;
		}
}*/
	for (var i = 0; i < skeleton.length; i++) {
		if (hits([player.sprite.x, player.sprite.y], [32, 32], [skeleton[i].sprite.x, skeleton[i].sprite.y], [32, 32]) && Date.now() - lastPlayerHit > 1000) {
			player.health -= 5;
			spellDisplay.heal = false;
			spellDisplay.damage = 5;
			spellDisplay.x = player.sprite.x;
			spellDisplay.y = player.sprite.y;
			spellDisplay.time = 0;
			spellDisplay.hit = true;
			lastPlayerHit = Date.now();
		}
		for (var j = 0; j < spell.length; j++) {
			if (hits([spell[j].sprite.x + 4, spell[j].sprite.y + 4], [20, 18], [skeleton[i].sprite.x + 8, skeleton[i].sprite.y], [15, 32])) {
				if (skeleton[i].weakness == spell[i].type) {
					skeleton[i].health -= spell[i].damage * 2;
					spellDisplay.damage = spell[i].damage * 2;
				}
				else {
					skeleton[i].health -= spell[i].damage;
					spellDisplay.damage = spell[i].damage;
				}
				spellDisplay.heal = false;
				spellDisplay.x = skeleton[i].sprite.x;
				spellDisplay.y = skeleton[i].sprite.y;
				spellDisplay.time = 0;
				spellDisplay.hit = true;
				if (skeleton[i].health <= 0) {
					items.push({
						uses: 1,
						type: 'healingPotion1',
						onCastBar: -1, // -1 if not on
						isDragging: false,
						restore: 10,
						tag: 'potion',
						visible: 'yes',
						level: 'level 1',
						discription: 'A potion for light healing.',
						sprite: (new Sprite({ 'full': healingPotion1, 'empty': healingPotion1E }, 'full', skeleton[i].sprite.x, skeleton[i].sprite.y, 32, 32, 0)),
					})
					skeleton.splice(i, 1);
					lastSkeletonAdded = Date.now();
					skeletonCount--;
					i--;
					points.hits += 1;
				}
				spell.splice(j, 1);
				j--;
				break;
			}
		}
	}
}

//Used to pick up and item on the ground
var holdItem;
function lootItem(array) {
	for (var i = 0; i < array.length; i++) {
		if (hits([player.sprite.x, player.sprite.y], [32, 32], [array[i].sprite.x + 10, array[i].sprite.y + 10], [30, 30])) {
			for (var j = 0; j < wordBubble.length; j++) {
				if (wordBubble[j].item == 'loot') {
					wordBubble[j].sprite.x = player.sprite.x + 10;
					wordBubble[j].sprite.y = player.sprite.y - 15;
					drawSprite(wordBubble[j].sprite);
					holdItem = j;
				}
			}
			if (keysDown[70] == true && bag.slots.length < 9) {
				bag.slots.push(array[i]);
				array.splice(i, 1);
				i--; //array[i].visible = 'no';
				wordBubble[holdItem].item = 'loot'; //makes wordBubble go away if set to 'looted'
			}
		}
	}
}

//key events, such as opening doors
function keyEvents() {
	//event for looting chests
	for (var i = 0; i < lootChest.length; i++) {
		if (hits([player.sprite.x, player.sprite.y], [32, 32], [lootChest[i].sprite.x + 10, lootChest[i].sprite.y + 10], [30, 30])) {
			for (var j = 0; j < wordBubble.length; j++) {
				if (wordBubble[j].item == 'chest') {
					wordBubble[j].sprite.x = player.sprite.x + 10;
					wordBubble[j].sprite.y = player.sprite.y - 15;
					drawSprite(wordBubble[j].sprite);
				}
			}
			if (keysDown[70] == true && !lootChest.opened) {
				lootChest.opened = true;
				lootChest[i].sprite.currentState = 'opened';
				updateAnimation(lootChest[i].sprite.stateAnimations[lootChest[i].sprite.currentState]);
				for (var j = 0; j < wordBubble.length; j++) {
					if (wordBubble[i].info == 'chest1') {
						updateAnimation(wordBubble[i].sprite.stateAnimations[wordBubble[i].sprite.currentState]); //for press F
					}
				}
			}
		}
	}

	//events for opening doors
	for (var i = 0; i < doors.length; i++) {
		if (hits([player.sprite.x, player.sprite.y], [32, 32], [doors[i].sprite.x, doors[i].sprite.y], [32, 32]) && player.sprite.currentState == 'up') {
			if (doors[i].sprite.currentState == 'closed') {
				for (var j = 0; j < wordBubble.length; j++) {

					if (wordBubble[j].item == 'chest') {
						wordBubble[j].sprite.x = player.sprite.x + 5;
						wordBubble[j].sprite.y = player.sprite.y + 28;
						drawSprite(wordBubble[j].sprite);
					}
				}
				if (keysDown[70] && doors[i].type == 'digCaveEntrance') {
					doors[i].opened = true;
					doors[i].sprite.currentState = 'opened';
					updateAnimation(doors[i].sprite.stateAnimations[doors[i].sprite.currentState]);
				}
			}
			if (keysDown[69] && doors[i].opened == true && doors[i].type == 'digCaveEntrance') { //if e is hit, enter dig cave
				player.zone = 'Dig Cave';
				skeleton = [];
				tree = [];
				lootChest = [];
				wordBubble = [];
				items = [];
				doors = [];
				edge = [];
				monsters = [];
				imgs.src = 'imgs/dirt.png';
				pattern = ctx.createPattern(imgs, 'repeat');
				ctx.fillStyle = pattern;
				ctx.fillRect(0, 0, canvasWidth, canvasHeight);
				digCave();
			}
		}
	}
}
//functions for using spells and potions and any castbar items
function usePotion(holdPotion) {
	if (holdPotion.type == 'healingPotion1' && Date.now() - lastPotion > 1200 && player.health != player.maxHealth) {
		if (player.health + 10 > player.maxHealth) {
			var healed = player.maxHealth - player.health;
			player.health = player.maxHealth;
			spellDisplay.heal = true;
			spellDisplay.damage = healed;
			spellDisplay.x = player.sprite.x;
			spellDisplay.y = player.sprite.y;
			spellDisplay.time = 0;
			spellDisplay.hit = true;
		}
		else {
			player.health += 10;
			spellDisplay.heal = true;
			spellDisplay.damage = 10;
			spellDisplay.x = player.sprite.x;
			spellDisplay.y = player.sprite.y;
			spellDisplay.time = 0;
			spellDisplay.hit = true;
		}
		holdPotion.uses -= 1;
		if (holdPotion.uses == 0) {
			potionUses = false;
		}
		lastPotion = Date.now();
	}
}

function castSpell(holdSpell) {
	if (holdSpell.type == 'electric' && Date.now() - lastFire > 600) { // 1
		var x = player.sprite.x;
		var y = player.sprite.y;
		spell.push({
			lastX: x,
			lastY: y,
			hit: [x, y],
			type: 'electric',
			damage: 5,
			pos: [x, y],
			dir: player.sprite.currentState,
			sprite: new Sprite({ 'lightningShock': playerSpellAnim2 }, 'lightningShock', x, y, 35, 35, 260),
		});
		lastFire = Date.now();
	}
	if (holdSpell.type == 'frost' && Date.now() - lastSpell > 600) { //2
		var x = player.sprite.x + 16;
		var y = player.sprite.y + 16;
		spell.push({
			lastX: x,
			lastY: y,
			hit: [x, y],
			type: 'frost',
			damage: 5,
			pos: [x, y],
			dir: player.sprite.currentState,
			sprite: new Sprite({ 'iceShock': playerSpellAnim }, 'iceShock', player.sprite.x, player.sprite.y, 35, 35, 160)
		});
		lastSpell = Date.now();
	}
	if (holdSpell.type == 'fire' && Date.now() - lastFire2 > 600) { // 3
		var x = player.sprite.x;
		var y = player.sprite.y;
		spell.push({
			lastX: x,
			lastY: y,
			hit: [x, y],
			type: 'fire',
			damage: 5,
			pos: [x, y],
			dir: player.sprite.currentState,
			sprite: new Sprite({ 'fireFlash': playerSpellAnim3 }, 'fireFlash', x, y, 35, 35, 240),
		});
		lastFire2 = Date.now();
	}
	if (holdSpell.type == 'holy' && Date.now() - lastFire3 > 1500) { //4
		var x = player.sprite.x;
		var y = player.sprite.y;
		spell.push({
			lastX: x,
			lastY: y,
			hit: [x, y],
			type: 'holy',
			damage: 10,
			pos: [x, y],
			dir: player.sprite.currentState,
			sprite: new Sprite({ 'holy': playerSpellHoly }, 'holy', x, y, 35, 35, 240),
		});
		lastFire3 = Date.now();
	}
}

//used to update things that don't move and all, ie. a fence
function updateDrawGraphics() {
	// regular fence piece NS
	fence.push({ //regular fence EW, above gate
		sprite: (new Sprite({ 'EW': fence_2 }, 'EW', -28, 185, 86, 65, 160)),
	});
	fence.push({ //regular fence EW, above gate
		sprite: (new Sprite({ 'EW': fence_2 }, 'EW', 6, 167, 86, 65, 160)),
	});
	fence.push({ //regular fence EW, above gate
		sprite: (new Sprite({ 'EW': fence_2 }, 'EW', 40, 149, 86, 65, 160)),
	});
	fence.push({ //regular fence TURN right, above gate
		sprite: (new Sprite({ 'NS': fence_1 }, 'NS', 48, 149, 86, 65, 160)),
	});
	fence.push({ //regular fence NS, above gate
		sprite: (new Sprite({ 'NS': fence_1 }, 'NS', 82, 166, 86, 65, 160)),
	});
	fence.push({ //regular fence NS, above gate
		sprite: (new Sprite({ 'NS': fence_1 }, 'NS', 116, 183, 86, 65, 160)),
	});
	fence.push({ //regular fence NS, above gate
		sprite: (new Sprite({ 'NS': fence_1 }, 'NS', 150, 200, 86, 65, 160)),
	});
	//fence.push({  //holds the gate
	//	sprite: (new Sprite({'openGate': gate_1}, 'openGate', 206, 216, 86, 65, 160)),
	//});
	fence.push({  //regular Fence NS, below gate
		sprite: (new Sprite({ 'NS': fence_1 }, 'NS', 219, 235, 86, 65, 160)),
	});
	fence.push({  //regular Fence NS, bg
		sprite: (new Sprite({ 'NS': fence_1 }, 'NS', 253, 252, 86, 65, 160)),
	});
	fence.push({  //regular Fence NS, bg
		sprite: (new Sprite({ 'NS': fence_1 }, 'NS', 287, 269, 86, 65, 160)),
	});
	fence.push({  //regular Fence NS, bg
		sprite: (new Sprite({ 'NS': fence_1 }, 'NS', 321, 286, 86, 65, 160)),
	});
	fence.push({ //regular fence Turn left, below gate
		sprite: (new Sprite({ 'NS': fence_left }, 'NS', 366, 303, 86, 65, 160)),
	});
	fence.push({ //regular fence EW, below gate
		sprite: (new Sprite({ 'EW': fence_2 }, 'EW', 356, 322, 86, 65, 160)),
	});
	fence.push({ //regular fence EW, below gate
		sprite: (new Sprite({ 'EW': fence_2 }, 'EW', 322, 340, 86, 65, 160)),
	});
	fence.push({ //regular fence EW, below gate
		sprite: (new Sprite({ 'EW': fence_2 }, 'EW', 288, 358, 86, 65, 160)),
	});
	fence.push({ //regular fence EW, below gate
		sprite: (new Sprite({ 'EW': fence_2 }, 'EW', 254, 376, 86, 65, 160)),
	});
	fence.push({ //regular fence EW, below gate
		sprite: (new Sprite({ 'EW': fence_2 }, 'EW', 220, 394, 86, 65, 160)),
	});
	fence.push({ //regular fence EW, below gate
		sprite: (new Sprite({ 'EW': fence_2 }, 'EW', 186, 412, 86, 65, 160)),
	});
	fence.push({ //regular fence EW, below gate
		sprite: (new Sprite({ 'EW': fence_2 }, 'EW', 152, 430, 86, 65, 160)),
	}); fence.push({ //regular fence EW, below gate
		sprite: (new Sprite({ 'EW': fence_2 }, 'EW', 118, 448, 86, 65, 160)),
	});
	fence.push({ //regular fence TURN right, above gate
		sprite: (new Sprite({ 'turnRight': fence_right }, 'turnRight', 73, 466, 86, 65, 160)),
	});
	fence.push({ //regular fence Turn left, below gate
		sprite: (new Sprite({ 'NS': fence_1 }, 'NS', 83, 484, 86, 65, 160)),
	});

	//GRAVES
	grave.push({
		sprite: (new Sprite({ 'open': grave_1 }, 'open', 80, 193, 54, 54, 160)),
	});
	grave.push({
		sprite: (new Sprite({ 'closed': grave_2 }, 'closed', 118, 214, 54, 54, 160)),
	});
	grave.push({  //bottom side grave below gate
		sprite: (new Sprite({ 'closed': grave_3 }, 'closed', 175, 400, 54, 54, 160)),
	});
	grave.push({ //bottom side grave below gate
		sprite: (new Sprite({ 'closed': grave_3 }, 'closed', 217, 380, 54, 54, 160)),
	});
	grave.push({ //bottom side grave below gate
		sprite: (new Sprite({ 'closed': grave_3 }, 'closed', 259, 360, 54, 54, 160)),
	});
	grave.push({ //bottom side grave below gate
		sprite: (new Sprite({ 'closed': grave_3 }, 'closed', 301, 340, 54, 54, 160)),
	});
	grave.push({ //bottom side grave below gate
		sprite: (new Sprite({ 'closed': grave_3 }, 'closed', 343, 320, 54, 54, 160)),
	});
	grave.push({ //bottom side grave below gate
		sprite: (new Sprite({ 'closed': grave_4 }, 'closed', 295, 300, 54, 54, 160)),
	});
	wordBubble.push({
		info: 'pressf',
		sprite: (new Sprite({ 'five': damages }, 'five', 100, 100, 16, 16, 160)),
	});
}

function pushGraphics() {
	//new row 1
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({ 'maple': tree_maple }, 'maple', -24, -20, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({ 'maple': tree_maple }, 'maple', 4, -20, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({ 'maple': tree_maple }, 'maple', 32, -20, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({ 'maple': tree_maple }, 'maple', 60, -20, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({ 'maple': tree_maple }, 'maple', 88, -20, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({ 'maple': tree_maple }, 'maple', 116, -20, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({ 'maple': tree_maple }, 'maple', 144, -20, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({ 'maple': tree_maple }, 'maple', 172, -20, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({ 'maple': tree_maple }, 'maple', 200, -20, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({ 'maple': tree_maple }, 'maple', 228, -20, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({ 'maple': tree_maple }, 'maple', 256, -20, 54, 54, 160)),
	});

	//new row 2
	tree.push({ //
		level: 'front',
		sprite: (new Sprite({ 'maple': tree_maple2 }, 'maple', -33, 10, 54, 54, 160)),
	});
	tree.push({ //
		level: 'front',
		sprite: (new Sprite({ 'maple': tree_maple2 }, 'maple', 256, 10, 54, 54, 160)),
	});
	//new row 3
	tree.push({ //
		level: 'front',
		sprite: (new Sprite({ 'maple': tree_maple2 }, 'maple', -33, 40, 54, 54, 160)),
	});
	tree.push({ //
		level: 'front',
		sprite: (new Sprite({ 'maple': tree_maple2 }, 'maple', 32, 33, 54, 54, 160)),
	});
	tree.push({ //
		level: 'front',
		sprite: (new Sprite({ 'maple': tree_maple2 }, 'maple', 60, 33, 54, 54, 160)),
	});
	tree.push({ //
		level: 'front',
		sprite: (new Sprite({ 'maple': tree_maple2 }, 'maple', 88, 33, 54, 54, 160)),
	});
	tree.push({ //
		level: 'front',
		sprite: (new Sprite({ 'maple': tree_maple2 }, 'maple', 116, 33, 54, 54, 160)),
	});
	tree.push({ //
		level: 'front',
		sprite: (new Sprite({ 'maple': tree_maple2 }, 'maple', 144, 33, 54, 54, 160)),
	});
	tree.push({ //
		level: 'front',
		sprite: (new Sprite({ 'maple': tree_maple2 }, 'maple', 172, 33, 54, 54, 160)),
	});
	tree.push({ //
		level: 'front',
		sprite: (new Sprite({ 'maple': tree_maple2 }, 'maple', 200, 40, 54, 54, 160)),
	});
	tree.push({ //
		level: 'front',
		sprite: (new Sprite({ 'maple': tree_maple2 }, 'maple', 228, 40, 54, 54, 160)),
	});
	tree.push({ //
		level: 'front',
		sprite: (new Sprite({ 'maple': tree_maple2 }, 'maple', 256, 40, 54, 54, 160)),
	});
	//new row 4
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({ 'maple': tree_maple }, 'maple', -33, 70, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({ 'maple': tree_maple }, 'maple', 32, 63, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({ 'maple': tree_maple }, 'maple', 60, 63, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({ 'maple': tree_maple }, 'maple', 88, 63, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({ 'maple': tree_maple }, 'maple', 116, 63, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({ 'maple': tree_maple }, 'maple', 144, 63, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({ 'maple': tree_maple }, 'maple', 172, 63, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({ 'maple': tree_maple }, 'maple', 200, 70, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({ 'maple': tree_maple }, 'maple', 228, 70, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({ 'maple': tree_maple }, 'maple', 256, 70, 54, 54, 160)),
	});
	//new row 5
	tree.push({ //
		level: 'front',
		sprite: (new Sprite({ 'maple': tree_maple2 }, 'maple', -33, 100, 54, 54, 160)),
	});
	tree.push({ //
		level: 'front',
		sprite: (new Sprite({ 'maple': tree_maple2 }, 'maple', -5, 100, 54, 54, 160)),
	});
	tree.push({ //
		level: 'front',
		sprite: (new Sprite({ 'maple': tree_maple2 }, 'maple', 23, 100, 54, 54, 160)),
	});
	tree.push({ //
		level: 'front',
		sprite: (new Sprite({ 'maple': tree_maple2 }, 'maple', 51, 100, 54, 54, 160)),
	});
	tree.push({ //
		level: 'front',
		sprite: (new Sprite({ 'maple': tree_maple2 }, 'maple', 79, 100, 54, 54, 160)),
	});
	tree.push({ //
		level: 'front',
		sprite: (new Sprite({ 'maple': tree_maple2 }, 'maple', 107, 100, 54, 54, 160)),
	});
	tree.push({ //
		level: 'front',
		sprite: (new Sprite({ 'maple': tree_maple2 }, 'maple', 135, 100, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({ 'maple': tree_maple }, 'maple', 200, 100, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({ 'maple': tree_maple }, 'maple', 228, 100, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({ 'maple': tree_maple }, 'maple', 256, 100, 54, 54, 160)),
	});
	//new row 6
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({ 'maple': tree_maple }, 'maple', -33, 130, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({ 'maple': tree_maple }, 'maple', -5, 130, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({ 'maple': tree_maple }, 'maple', 23, 130, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({ 'maple': tree_maple }, 'maple', 51, 130, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({ 'maple': tree_maple }, 'maple', 79, 130, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({ 'maple': tree_maple }, 'maple', 107, 130, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({ 'maple': tree_maple }, 'maple', 135, 130, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({ 'maple': tree_maple }, 'maple', 200, 130, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({ 'maple': tree_maple }, 'maple', 228, 130, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({ 'maple': tree_maple }, 'maple', 256, 130, 54, 54, 160)),
	});

	//top tree chest
	lootChest.push({
		opened: false,
		sprite: (new Sprite({ 'closed': chestClosed, 'opened': chestOpened }, 'closed', 230, 0, 54, 54, 160)),
	})
	wordBubble.push({
		info: 'chest1',
		visible: 'yes',
		item: 'chest',
		sprite: (new Sprite({ 'talk': pressF }, 'talk', player.sprite.x + 10, player.sprite.y - 15, 45, 18, 160)),
	});
	wordBubble.push({
		info: 'items',
		visible: 'yes',
		item: 'loot',
		sprite: (new Sprite({ 'talk': opened }, 'talk', player.sprite.x + 10, player.sprite.y - 15, 45, 18, 160)),
	});
	wordBubble.push({
		info: 'digDoor',
		visible: 'yes',
		item: 'door',
		sprite: (new Sprite({ 'open': pressF }, 'open', player.sprite.x + 10, player.sprite.y - 15, 45, 18, 160)),
	});


	/*//WATER 
	edge.push({ //left side
		sprite:(new Sprite({'NS': riverNS}, 'NS', 280, 450, 32, 32,160)),
	});
	edge.push({ //square
		sprite:(new Sprite({'river': river}, 'river', 300, 450, 32, 32,160)),
	});
	edge.push({ //square
		sprite:(new Sprite({'river': river}, 'river', 300, 482, 32, 48,160)),
	});
	edge.push({ //square
		sprite:(new Sprite({'river': river}, 'river', 332, 450, 32, 32,160)),
	});
	//edge.push({ //square
	//	sprite:(new Sprite({'river': river}, 'river', 332, 482, 32, 48,160)),
	//});
	edge.push({ //square
		sprite:(new Sprite({'river': river}, 'river', 364, 450, 32, 32,160)),
	});
	//edge.push({ //square
	//	sprite:(new Sprite({'river': river}, 'river', 364, 482, 32, 48,160)),
	//});
	edge.push({ //square
		sprite:(new Sprite({'river': river}, 'river', 396, 450, 32, 32,160)),
	});
	//edge.push({ //square
	//	sprite:(new Sprite({'river': river}, 'river', 396, 482, 32, 48,160)),
	//});
	
	edge.push({ //left side
		sprite:(new Sprite({'NS': riverNS}, 'NS', 280, 482, 32, 48,160)),
	});
	edge.push({ //turn right
		sprite:(new Sprite({'TR': riverTR}, 'TR', 280, 430, 32, 32,160)),
	});
	edge.push({ //straight EW
		sprite:(new Sprite({'EW': riverEW}, 'EW', 312, 430, 32, 32,160)),
	});
	edge.push({ //straight EW
		sprite:(new Sprite({'EW': riverEW}, 'EW', 344, 430, 32, 32,160)),
	});
	edge.push({ //straight EW
		sprite:(new Sprite({'EW': riverEW}, 'EW', 376, 430, 32, 32,160)),
	});
	edge.push({ //straight EW
		sprite:(new Sprite({'EW': riverEW}, 'EW', 408, 430, 32, 32,160)),
	});
	edge.push({ //ISLAND
		type: 'island',
		discription: '',
		sprite:(new Sprite({'EW': island}, 'EW', 425, 297, 230, 230,160)),
	});*/
	playerInterface.push({
		sprite: (new Sprite({ 'close': spellBarBag, 'open': spellBarBagOpen }, 'close', 0, 448, 380, 130, 0)),
	})
	items.push({
		type: 'electric',
		onCastBar: -1, // -1 if not on
		isDragging: false,
		tag: 'spell',
		visible: 'yes',
		level: 'level 1',
		discription: 'A lightning spell with moderate damage.',
		sprite: (new Sprite({ 'dropped': lightningTome_1 }, 'dropped', 300, 250, 32, 32, 0)),
	})
	items.push({
		type: 'frost',
		onCastBar: -1, // -1 if not on
		isDragging: false,
		tag: 'spell',
		visible: 'yes',
		level: 'level 1',
		discription: 'A frost spell with moderate damage.',
		sprite: (new Sprite({ 'dropped': frostTome_1 }, 'dropped', 240, 250, 32, 32, 0)),
	})
	items.push({
		type: 'holy',
		onCastBar: -1, // -1 if not on
		isDragging: false,
		tag: 'spell',
		visible: 'yes',
		level: 'level 1',
		discription: 'A holy spell with moderate damage.',
		sprite: (new Sprite({ 'dropped': holyTome_1 }, 'dropped', 270, 250, 32, 32, 0)),
	})
	items.push({
		uses: 1,
		type: 'healingPotion1',
		restore: 10,
		onCastBar: -1, // -1 if not on
		isDragging: false,
		tag: 'potion',
		visible: 'yes',
		level: 'level 1',
		discription: 'A potion for light healing.',
		sprite: (new Sprite({ 'full': healingPotion1, 'empty': healingPotion1E }, 'full', 300, 200, 32, 32, 0)),
	})
	items.push({
		uses: 1,
		type: 'healingPotion1',
		restore: 10,
		onCastBar: -1, // -1 if not on
		isDragging: false,
		tag: 'potion',
		visible: 'yes',
		level: 'level 1',
		discription: 'A potion for light healing.',
		sprite: (new Sprite({ 'full': healingPotion1, 'empty': healingPotion1E }, 'full', 300, 150, 32, 32, 0)),
	})
	items.push({
		uses: 1,
		type: 'healingPotion1',
		restore: 10,
		onCastBar: -1, // -1 if not on
		isDragging: false,
		tag: 'potion',
		visible: 'yes',
		level: 'level 1',
		discription: 'A potion for light healing.',
		sprite: (new Sprite({ 'full': healingPotion1, 'empty': healingPotion1E }, 'full', 300, 115, 32, 32, 0)),
	})
	items.push({
		uses: 1,
		type: 'healingPotion1',
		restore: 10,
		onCastBar: -1, // -1 if not on
		isDragging: false,
		tag: 'potion',
		visible: 'yes',
		level: 'level 1',
		discription: 'A potion for light healing.',
		sprite: (new Sprite({ 'full': healingPotion1, 'empty': healingPotion1E }, 'full', 300, 90, 32, 32, 0)),
	})
	doors.push({
		opened: false,
		inside: false,
		key: 'dig key',
		type: 'digCaveEntrance',
		discription: 'A door to Dig dungeon.',
		sprite: (new Sprite({ 'opened': digDoorOpened, 'closed': digDoorClosed }, 'closed', 608, 32, 32, 32, 160))
	})
	walls.push({
		type: 'wall',
		discription: ' ',
		sprite: (new Sprite({ 'here': darkWoodWall }, 'here', 608, 0, 32, 32, 160))
	})
	walls.push({
		type: 'wall',
		discription: ' ',
		sprite: (new Sprite({ 'here': darkWoodWall }, 'here', 576, 32, 32, 32, 160))
	})
	walls.push({
		type: 'wall',
		discription: ' ',
		sprite: (new Sprite({ 'here': darkWoodWall }, 'here', 640, 32, 32, 32, 160))
	})
	walls.push({
		type: 'wall',
		discription: ' ',
		sprite: (new Sprite({ 'here': darkWoodWall }, 'here', 640, 0, 32, 32, 160))
	})
	walls.push({
		type: 'wall',
		discription: ' ',
		sprite: (new Sprite({ 'here': darkWoodWall }, 'here', 576, 0, 32, 32, 160))
	})
	walls.push({
		type: 'wall',
		discription: ' ',
		sprite: (new Sprite({ 'here': darkWoodWall }, 'here', 672, 32, 32, 32, 160))
	})
	walls.push({
		type: 'wall',
		discription: ' ',
		sprite: (new Sprite({ 'here': darkWoodWall }, 'here', 544, 32, 32, 32, 160))
	})
	walls.push({
		type: 'wall',
		discription: ' ',
		sprite: (new Sprite({ 'here': darkWoodWall }, 'here', 672, 0, 32, 32, 160))
	})
	walls.push({
		type: 'wall',
		discription: ' ',
		sprite: (new Sprite({ 'here': darkWoodWall }, 'here', 544, 0, 32, 32, 160))
	})
	monsters.push({
		lastX: 550,
		lastY: 0,
		health: 15,
		type: 'animal',
		name: 'bigDig',
		typeClass: 'earth',
		weakness: 'goo',
		dir: 'down',
		pos: [300, 300],
		sprite: (new Sprite({ 'start': bigDigUpandDown }, 'start', 550, 0, 51, 46, 160))
	})
	monsters.push({
		lastX: 630,
		lastY: 0,
		health: 15,
		name: 'smallDig',
		type: 'animal',
		typeClass: 'earth',
		weakness: 'goo',
		dir: 'down',
		pos: [300, 300],
		sprite: (new Sprite({ 'start': littleDigUpandDown }, 'start', 660, 15, 35, 35, 160))
	})

}
function digCave() {
	doors.push({
		opened: false,
		inside: true,
		key: 'dig key',
		type: 'digCaveFallenEntrance',
		discription: 'A door to Dig Cave.',
		sprite: (new Sprite({ 'opened': digDoorBroken }, 'opened', 608, 32, 32, 32, 160))
	})
	monsters.push({
		lastX: 550,
		lastY: 0,
		health: 15,
		name: 'smallDig',
		type: 'animal',
		typeClass: 'earth',
		weakness: 'goo',
		dir: 'down',
		pos: [300, 300],
		sprite: (new Sprite({ 'start': bigDigUpandDown }, 'start', 200, 300, 51, 46, 160))
	})
	monsters.push({
		lastX: 630,
		lastY: 0,
		health: 15,
		name: 'bigDig',
		type: 'animal',
		typeClass: 'earth',
		weakness: 'goo',
		dir: 'down',
		pos: [300, 300],
		sprite: (new Sprite({ 'start': littleDigUpandDown }, 'start', 300, 200, 35, 35, 160))
	})
}
function pushCharacters() {

}
//var purge = 30;
function draw() {
	if (browserType == 'Safari') {
		ctx.rect(0, 0, canvasWidth, canvasHeight);
		ctx.fillStyle = pattern;
		ctx.fill();
	}
	else {
		//if(time > purge){ //if firefox/ ie / chrome / any other.  //purge page every 30 seconds
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
		//ctx.fillStyle = background;
		ctx.fillStyle = pattern;
		ctx.fill();
		//purge += 30; //every 30 seconds do it
		//}
		//else{
		//	ctx.rect(0, 0, canvas.width, canvas.height);
		//	ctx.fillStyle = background;
		//	ctx.fill();
		//}
	}
	/*ctx.fillRect(player.lastX,player.lastY,48,48);
	for(var i=0; i<skeleton.length; i++){
		ctx.fillRect(skeleton[i].lastX,skeleton[i].lastY,48,48);
	}
	for(var i=0; i<spell.length; i++){
		ctx.fillRect(spell[i].lastX,spell[i].lastY,48,48);
	}
	for(var i=0; i<enemySpell.length; i++){
		ctx.fillRect(enemySpell[i].lastX,enemySpell[i].lastY,48,48);
	}
	for(var i=0; i<monsters.length; i++){
		ctx.fillRect(monsters[i].lastX,monsters[i].lastY,48,48);
	}*/
	for (var i = 0; i < digz.length; i++) {
		drawSprite(digz[i].sprite);
	}
	for (var i = 0; i < doors.length; i++) {
		drawSprite(doors[i].sprite);
	}
	for (var i = 0; i < walls.length; i++) {
		drawSprite(walls[i].sprite);
	}
	for (var i = 0; i < edge.length; i++) {
		drawSprite(edge[i].sprite);
	}
	//drawSprite(fence1);
	for (var i = 0; i < tree.length; i++) {
		//for(var j=0; j<skeleton.length; j++){
		if (tree[i].level == 'back') {//tree[i].sprite.y+44 < player.sprite.y+32){// || tree[i].sprite.y+44 < skeleton[j].sprite.y+32){
			drawSprite(tree[i].sprite);
		}
		//}
	}
	for (i = 0; i < items.length; i++) {
		if (items[i].visible == 'yes') {
			drawSprite(items[i].sprite);
		}
	}
	for (var i = 0; i < grave.length; i++) {
		drawSprite(grave[i].sprite);
	}
	for (var i = 0; i < fence.length; i++) {
		drawSprite(fence[i].sprite);
	}

	for (var i = 0; i < skeleton.length; i++) {
		drawSprite(skeleton[i].sprite);
		skeleton[i].lastX = skeleton[i].sprite.x;
		skeleton[i].lastY = skeleton[i].sprite.y;
	}
	for (var i = 0; i < lootChest.length; i++) {
		drawSprite(lootChest[i].sprite);
	}
	if (player.sprite.currentState == 'down') { //so spell looks good
		drawSprite(player.sprite);
		player.lastX = player.sprite.x;
		player.lastY = player.sprite.y;
	}
	for (var i = 0; i < spell.length; i++) {
		drawSprite(spell[i].sprite);
		spell[i].lastX = spell[i].sprite.x;
		spell[i].lastY = spell[i].sprite.y;
	}
	for (var i = 0; i < enemySpell.length; i++) {
		drawSprite(enemySpell[i].sprite);
		enemySpell[i].lastX = enemySpell[i].sprite.x;
		enemySpell[i].lastY = enemySpell[i].sprite.y;
	}
	for (var i = 0; i < monsters.length; i++) {
		drawSprite(monsters[i].sprite);
		monsters[i].lastX = monsters[i].sprite.x;
		monsters[i].lastY = monsters[i].sprite.y;
	}
	if (player.sprite.currentState != 'down') { //for spells
		drawSprite(player.sprite);
		player.lastX = player.sprite.x;
		player.lastY = player.sprite.y;
	}
	for (var i = 0; i < tree.length; i++) {
		if (tree[i].level == 'front') {
			drawSprite(tree[i].sprite);
		}
	}
	//displays the damage done or taken -red txt
	if (spellDisplay.hit && spellDisplay.damage >= 0 && spellDisplay.time < 20 && !spellDisplay.heal) {
		ctx.fillStyle = "#FF3300";
		ctx.font = "20px Georgia";
		ctx.fillText(spellDisplay.damage, spellDisplay.x, spellDisplay.y);
		spellDisplay.time++;
	}
	//displays the healing done -green txt
	if (spellDisplay.hit && spellDisplay.damage >= 0 && spellDisplay.time < 20 && spellDisplay.heal == true) {
		ctx.fillStyle = "#7FFF00";
		ctx.font = "20px Georgia";
		ctx.fillText(spellDisplay.damage, spellDisplay.x, spellDisplay.y);
		spellDisplay.time++;
	}
	for (var i = 0; i < playerInterface.length; i++) {
		drawSprite(playerInterface[i].sprite);
	}
	if (bag.opened == true) {
		for (var i = 0; i < bag.slots.length; i++) {
			switch (i) {
				case 0: if (bag.slots[i].isDragging == true) { } else { bag.slots[i].sprite.x = 272; bag.slots[i].sprite.y = 450; } break;
				case 1: if (bag.slots[i].isDragging == true) { } else { bag.slots[i].sprite.x = 307; bag.slots[i].sprite.y = 450; } break;
				case 2: if (bag.slots[i].isDragging == true) { } else { bag.slots[i].sprite.x = 343; bag.slots[i].sprite.y = 450; } break;
				case 3: if (bag.slots[i].isDragging == true) { } else { bag.slots[i].sprite.x = 272; bag.slots[i].sprite.y = 483.5; } break;
				case 4: if (bag.slots[i].isDragging == true) { } else { bag.slots[i].sprite.x = 307; bag.slots[i].sprite.y = 483.5; } break;
				case 5: if (bag.slots[i].isDragging == true) { } else { bag.slots[i].sprite.x = 343; bag.slots[i].sprite.y = 483.5; } break;
				case 6: if (bag.slots[i].isDragging == true) { } else { bag.slots[i].sprite.x = 272; bag.slots[i].sprite.y = 517; } break;
				case 7: if (bag.slots[i].isDragging == true) { } else { bag.slots[i].sprite.x = 307; bag.slots[i].sprite.y = 517; } break;
				case 8: if (bag.slots[i].isDragging == true) { } else { bag.slots[i].sprite.x = 343; bag.slots[i].sprite.y = 517; } break;
			}
			drawSprite(bag.slots[i].sprite);
		}
	}
	//sets the cast bar items to their positions
	for (var i = 0; i < castbar.length; i++) {
		if (castbar[i].isDragging == false) {
			if (castbar[i].sprite.x < 32) {
				castbar[i].sprite.x = -2;
				castbar[i].sprite.y = 545;
				castbar[i].onCastBar = 0;
				castBarHold[0] = true;
			}
			else if (castbar[i].sprite.x < 64 && castbar[i].sprite.x > 32) {
				castbar[i].sprite.x = 33;
				castbar[i].sprite.y = 545;
				castbar[i].onCastBar = 1;
				castBarHold[1] = true;
			}
			else if (castbar[i].sprite.x < 96 && castbar[i].sprite.x > 64) {
				castbar[i].sprite.x = 69;
				castbar[i].sprite.y = 545;
				castbar[i].onCastBar = 2;
				castBarHold[2] = true;
			}
			else if (castbar[i].sprite.x < 128 && castbar[i].sprite.x > 96) {
				castbar[i].sprite.x = 104;
				castbar[i].sprite.y = 545;
				castbar[i].onCastBar = 3;
				castBarHold[3] = true;
			}
			else if (castbar[i].sprite.x < 160 && castbar[i].sprite.x > 128) {
				castbar[i].sprite.x = 139;
				castbar[i].sprite.y = 545;
				castbar[i].onCastBar = 4;
				castBarHold[4] = true;
			}
			else if (castbar[i].sprite.x < 192 && castbar[i].sprite.x > 160) {
				castbar[i].sprite.x = 173;
				castbar[i].sprite.y = 545;
				castbar[i].onCastBar = 5;
				castBarHold[5] = true;
			}
		}
		drawSprite(castbar[i].sprite);
	}
}



function imageLoaded() {
	load.imagesLoaded++;
}

var load = {
	images: 0,
	imagesLoaded: 0,
}

function Tileset(image, tileWidth, tileHeight) { //creating class code
	this.image = new Image();
	load.images++;
	this.image.onload = imageLoaded;
	this.image.src = image;
	this.tileWidth = tileWidth;
	this.tileHeight = tileHeight;
}

//var spriteTiles = new Tileset('sprite.png', 44, 108); //calling in the sprites

var spriteSpells = new Tileset('imgs/spells/spells1.png', 31, 30);
var spriteSpells2 = new Tileset('imgs/spells/spells2.png', 31, 31);

var lightningSpell1 = new Tileset('imgs/spells/lightningSpell_1.png', 32, 32);
var frostSpell1 = new Tileset('imgs/spells/frostSpell_1.png', 32, 32);
var holySpell1 = new Tileset('imgs/spells/holySpell_1.png', 32, 32);

var spriteTiles = new Tileset('imgs/monsters-32x32.png', 32, 32);
var spriteDemon1 = new Tileset('imgs/demon1.png', 54, 54);
var fenceTile = new Tileset('imgs/fence.png', 66, 50);
var graveTile = new Tileset('imgs/graveStones-54x54.png', 54, 54);
var treeMapleTile = new Tileset('imgs/mapleTree.png', 54, 54);

var numberTile = new Tileset('imgs/numbers.png', 16, 16);
var chestTile = new Tileset('imgs/chest1.png', 54, 54);
var chestLootTile = new Tileset('imgs/damage.png', 50, 20);
var edgeTiles = new Tileset('imgs/dg_edging132.gif', 32, 32);
var edgeTilesBig = new Tileset('imgs/island.gif', 178, 159);

var archerTiles = new Tileset('imgs/archercopy.png', 47, 47);
var barTiles = new Tileset('imgs/interface/interface2.png', 380, 130);
var potionTiles = new Tileset('imgs/potions.png', 32, 32);
var backTiles = new Tileset('imgs/G000M803.png', 128, 128);

var doorTiles = new Tileset('imgs/dg_town2_32x32.gif', 32, 32);
var digTiles = new Tileset('imgs/digs.png', 51, 44);
var littleDigTiles = new Tileset('imgs/digs.png', 35, 35);

function Animation(tileset, frames, frameDuration) {
	this.tileset = tileset;
	this.frames = frames;
	this.currentFrame = 0;
	this.frameTimer = Date.now();
	this.frameDuration = frameDuration;
}


var spriteUpAnim = new Animation(spriteTiles, ['6,4', '7,4', '8,4'], 200);
var spriteDownAnim = new Animation(spriteTiles, ['0,4', '1,4', '2,4'], 200);
var spriteLeftAnim = new Animation(spriteTiles, ['11,4', '10,4', '9,4'], 200);
var spriteRightAnim = new Animation(spriteTiles, ['3,4', '4,4', '5,4'], 200);//['0,1', '1,1', '2,1', '3,1'], 200);
var playerSpellAnim = new Animation(spriteSpells, ['0,16.5', '1,16.5', '2,16.5', '3,16.5', '4,16.5', '5,16.5', '6,16.5', '7,16.5'], 200);
var playerSpellAnim2 = new Animation(spriteSpells, ['0,15.5', '1,15.5', '2,15.5', '3,15.5', '4,15.5', '5,15.5', '6,15.5', '7,15.5'], 200);
var lightningTome_1 = new Animation(lightningSpell1, ['0,0'], 0);
var frostTome_1 = new Animation(frostSpell1, ['0,0'], 0);
var holyTome_1 = new Animation(holySpell1, ['0,0'], 0);
var playerSpellAnim3 = new Animation(spriteSpells, ['0,5.2', '1,5.2', '2,5.2', '3,5.2', '4,5.2', '5,5.2', '6,5.2', '7,5.2'], 200);
var playerSpellHoly = new Animation(spriteSpells, ['0,18.6', '1,18.6', '2,18.6', '3,18.6', '4,18.6', '5,18.6', '6,18.6', '7,18.6'], 200);
var playerNoSpellAnim = new Animation(spriteSpells, ['0,0'], 20);
var demon1 = new Animation(spriteDemon1, ['0,0'], 0);

var arrowUp = new Animation(spriteSpells2, ['0,0'], 200);   //['x,y']
var arrowDown = new Animation(spriteSpells2, ['4,0'], 200);
var arrowLeft = new Animation(spriteSpells2, ['6,0'], 200);
var arrowRight = new Animation(spriteSpells2, ['2,0'], 200);

var archerDown = new Animation(archerTiles, ['0,0', '1,0', '2,0'], 200);
var archerLeft = new Animation(archerTiles, ['0,1', '1,1', '2,1'], 200);
var archerRight = new Animation(archerTiles, ['0,2', '1,2', '2,2'], 200);
var archerUp = new Animation(archerTiles, ['0,3', '1,3', '2,3'], 200);

var skeletonUp = new Animation(spriteTiles, ['6,1', '7,1', '8,1'], 200);
var skeletonDown = new Animation(spriteTiles, ['0,1', '1,1', '2,1'], 200);
var skeletonLeft = new Animation(spriteTiles, ['11,1', '10,1', '9,1'], 200);
var skeletonRight = new Animation(spriteTiles, ['3,1', '4,1', '5,1'], 200);
var fence_1 = new Animation(fenceTile, ['0,1.1'], 0); // north to south straight
var fence_2 = new Animation(fenceTile, ['4.5,1.1', 0]);  //east to west straight
var fence_left = new Animation(fenceTile, ['.95,0'], 0);
var fence_right = new Animation(fenceTile, ['1.6,0'], 0);
var gate_1 = new Animation(fenceTile, ['2.7,0'], 0);
var grave_1 = new Animation(graveTile, ['0,0'], 0);
var grave_2 = new Animation(graveTile, ['1,0'], 0);
var grave_3 = new Animation(graveTile, ['2,0'], 0);
var grave_4 = new Animation(graveTile, ['2,1'], 0);
var tree_maple = new Animation(treeMapleTile, ['0,0'], 0);
var tree_maple2 = new Animation(treeMapleTile, ['1,0'], 0);
var chestClosed = new Animation(chestTile, ['0,1'], 0);
var chestOpened = new Animation(chestTile, ['0,0'], 200);

var pressF = new Animation(chestLootTile, ['0,0', '1,0'], 200);
var opened = new Animation(chestLootTile, ['0,0'], 0);
var river = new Animation(edgeTiles, ['2,14'], 0); //square
var riverNS = new Animation(edgeTiles, ['0,8'], 0); //north to south left side
var riverTR = new Animation(edgeTiles, ['2,8'], 0); //turns right
var riverEW = new Animation(edgeTiles, ['1,8'], 0); //east to west
var island = new Animation(edgeTilesBig, ['0,0'], 0); //island

var spellBar = new Animation(barTiles, ['0,0'], 0);
var spellBarBagOpen = new Animation(barTiles, ['0,0'], 0);
var spellBarBag = new Animation(barTiles, ['0,1', '0,0'], 0);

var healingPotion1 = new Animation(potionTiles, ['4,1', '2,7'], 200);
var healingPotion1E = new Animation(potionTiles, ['2,7'], 200);

var digDoorClosed = new Animation(doorTiles, ['4,3'], 0);
var digDoorOpened = new Animation(doorTiles, ['1,3'], 0);
var digDoorBroken = new Animation(doorTiles, ['6,3'], 0);
var darkWoodWall = new Animation(doorTiles, ['2,0'], 0);
var medWoodWall = new Animation(doorTiles, ['1,0'], 0);
var lightWoodWall = new Animation(doorTiles, ['0,0'], 0);

var bigDigUpandDown = new Animation(digTiles, ['0,2', '1,2', '2,2', '3,2', '4,2', '5,2', '6,2', '7,2'], 150);
var littleDigUpandDown = new Animation(littleDigTiles, ['0,6.93', '1,6.93', '2,6.93', '3,6.93', '4,6.93', '5,6.93', '6,6.93', '7,6.93',], 150);
function updateAnimation(anim) {
	if (Date.now() - anim.frameTimer > anim.frameDuration) {
		if (anim.currentFrame < anim.frames.length - 1) anim.currentFrame++;
		else anim.currentFrame = 0;
		anim.frameTimer = Date.now();
	}
}
function Sprite(stateAnimations, startingState, x, y, width, height, speed) {
	this.stateAnimations = stateAnimations;
	this.currentState = startingState;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.speed = speed;
}

//objects to use
var player = ({
	zone: 'For Estcha Ange',
	lastX: canvasWidth / 2,
	lastY: canvasHeight / 2,
	health: 20,
	maxHealth: 25,
	bag: [],
	pos: [canvasWidth / 2, canvasHeight / 2],
	sprite: new Sprite({ 'left': spriteLeftAnim, 'right': spriteRightAnim, 'down': spriteDownAnim, 'up': spriteUpAnim }, 'down', canvasWidth / 2, canvasHeight / 2, 32, 32, 160), //starts in down state, changes based on input
});
var bag = {
	slots: [],
	opened: false,
};
var digz = [];
var doors = [];
var castbar = [];
var edge = [];
var lootChest = [];
var items = [];
var wordBubble = [];
var fence = [];
var grave = [];
var walls = [];
var skeleton = [];
var monsters = [];
var spell = [];
var enemySpell = [];
var tree = [];
var playerInterface = [];
var items = [];

var barPositions = [];  //should only have 6 spots, 0-5 array positions

function drawSprite(sprite) {
	ctx.drawImage(
		sprite.stateAnimations[sprite.currentState].tileset.image,
		sprite.stateAnimations[sprite.currentState].frames[sprite.stateAnimations[sprite.currentState].currentFrame].split(',')[0] * sprite.stateAnimations[sprite.currentState].tileset.tileWidth,
		sprite.stateAnimations[sprite.currentState].frames[sprite.stateAnimations[sprite.currentState].currentFrame].split(',')[1] * sprite.stateAnimations[sprite.currentState].tileset.tileHeight,
		sprite.stateAnimations[sprite.currentState].tileset.tileWidth,
		sprite.stateAnimations[sprite.currentState].tileset.tileHeight,
		Math.round(sprite.x),
		Math.round(sprite.y),
		sprite.width,
		sprite.height
	);
}

var textSize = 25;
var img;
var background;
function drawStart() {
	//img = document.getElementById("dirt");
	background = ctx.createPattern(imgs, 'repeat');
	ctx.rect(0, 0, canvasWidth, canvasHeight);
	ctx.fillStyle = background;
	ctx.fill();
	//ctx.drawImage(img,100,100);
	//updateDrawGraphics();
	pushGraphics();
	ctx.fillStyle = '#000';
	ctx.font = '15pt Arial';
	ctx.textBaseline = 'top';
	ctx.fillText('Arrow keys to move. Space, c, v, to fire spells.', 15, 15);
	document.getElementById('game-start').style.display = 'block';
	document.getElementById('game-over-overlay').style.display = 'block';

}

//LOAD for safari
var imgs = new Image();
var pattern;
imgs.src = 'imgs/G000M803.png';
imgs.onload = function () {
	pattern = ctx.createPattern(imgs, 'repeat');
	ctx.fillStyle = pattern;
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);
};


var globalID;
var fps = 0;
var lastTime;
function repeatOften() {  //different form of looping, new and better
	// Do whatever
	var now = Date.now();
	var t = (now - lastTime) / 1000.0;
	if (!isPaused && !points.gameover) {
		draw();
		update(t);
		fps++;
	}
	lastTime = now;
	globalID = requestAnimationFrame(repeatOften);
}

//Paused Button
var browserType;
var startLoop = true;
var isPaused = true; //game starts out paused
drawStart(); //just to draw at the start and show character
var time = 0;
var p = window.setInterval(function () {
	if (!isPaused && !points.gameover) {
		var foundFps = fps;
		time++;
		$('#time').text("Elapsed Time: " + timeCountSeconds(time) + "   fps:" + foundFps);
		fps = 0;
	}
}, 1000); //1000 is 1 second

var gameover = false;
$('#saveName').hide();//hide at start
function repeatAlways() {
	if (!isPaused && !points.gameover) {
		$('#hit').text("Enemys destoryed: " + points.hits);
		$('#miss').text("Health: " + player.health); //or change back to misses
		$('#zone').text("Zone: " + player.zone);
		$('#browser').text("Browser: " + browserType);
		if (player.health <= 0) {
			points.gameover = true;
		}
		if (!points.isFreePlay || points.gameover == true) {
			//music.pause();
			//gameover.play();
			points.gameover = true;
			ctx.font = "20px Arial";
			ctx.fillStyle = "#FF0000";
			//ctx.fillText("Game Over",canvas.width/2.3,canvas.height/2.1);
			$('#saveName').show();
			nameSuccessful = true;
			document.getElementById('game-over').style.display = 'block';
			document.getElementById('game-over-overlay').style.display = 'block';
		}
	}
	globalAL = requestAnimationFrame(repeatAlways);
}


//function that restarts the game!
function restart() {
	// variables for update()
	lastSpell = Date.now();
	lastFire = Date.now(); lastFire2 = Date.now(); lastFire3 = Date.now();
	lastArrow = Date.now();
	lastPlayerHit = Date.now();
	lastSkeletonAdded = Date.now(); skeletonCount = 0;
	temp;
	fenceBlocked = false;
	spellDisplay = { //tracks damage dealt by the player and shows it
		heal: false,
		damage: -1,
		hit: false,
		x: 0,
		y: 0,
		time: 0
	};
	bag.opened = false;
	bag.slots = [];
	castbar = [];
	for (var i = 0; i < 6; i++) {
		castBarHold[i] = false;
	}
	digz = [];
	doors = [];
	edge = [];
	lootChest = [];
	//items = [];
	wordBubble = [];
	fence = [];
	grave = [];
	walls = [];
	skeleton = [];
	monsters = [];
	spell = [];
	enemySpell = [];
	tree = [];
	playerInterface = [];
	items = [];
	barPositions = [];
	pushGraphics();
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	//music.play();
	player = ({
		zone: 'For Estcha Ange',
		lastX: canvasWidth / 2,
		lastY: canvasHeight / 2,
		health: 20,
		maxHealth: 25,
		bag: [],
		pos: [canvasWidth / 2, canvasHeight / 2],
		sprite: new Sprite({ 'left': spriteLeftAnim, 'right': spriteRightAnim, 'down': spriteDownAnim, 'up': spriteUpAnim }, 'down', canvasWidth / 2, canvasHeight / 2, 32, 32, 160), //starts in down state, changes based on input
	});
	//reset pattern
	imgs.src = 'imgs/G000M803.png';
	pattern = ctx.createPattern(imgs, 'repeat');
	ctx.fillStyle = pattern;
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);
	points.hits = 0;
	time = 0;
	points.gameover = false;
	isPaused = false;
	$('#saveName').hide();
	$('#nameSaved').hide();
	document.getElementById('game-pause').style.display = 'none';
	document.getElementById('game-over').style.display = 'none';
	document.getElementById('game-over-overlay').style.display = 'none';

}
$('input:radio[name="optradio"]').filter('input[value=true]').prop("checked", true);
$(document).ready(function () {
	$('input:radio[name="optradio"]').click(function () {  //checks radio buttons
		if ($('input[value=true]').prop("checked")) {
			points.isFreePlay = true;
			points.hits = 0;
			time = 0;

		}
		else if ($('input[value=false]').prop("checked")) {
			points.isFreePlay = false;
			points.hits = 0;
			time = 0;
		}
	});

	$(".close").click(function () {
		$("#myAlert").alert("close");
	});
	$(".play").click(function (e) { //down one
		e.preventDefault();
		//music.play();
		isPaused = false;
		document.getElementById('game-pause').style.display = 'none';
		document.getElementById('game-over-overlay').style.display = 'none';
	});
	$(".pause").click(function (e) { //down one
		e.preventDefault();
		//music.pause();
		isPaused = true;
		document.getElementById('game-pause').style.display = 'block';
		document.getElementById('game-over-overlay').style.display = 'block';
	});

	$("#play-pause").click(function (e) {  //contine if game is paused
		e.preventDefault();
		//music.play();
		isPaused = false;
		document.getElementById('game-pause').style.display = 'none';
		document.getElementById('game-over-overlay').style.display = 'none';
	});

	$("#restart").click(function (e) {  //restart button used if game paused or gameover
		restart();

	});
	//PLAY
	$("#play-again").click(function (e) { //instead of restart
		restart();
	});

	//PLAY
	$("#play-start").click(function (e) {  //click play at the start
		e.preventDefault();
		points.paused = false;
		isPaused = false;
		document.getElementById('game-pause').style.display = 'none';
		document.getElementById('game-over-overlay').style.display = 'none';
		document.getElementById('game-start').style.display = 'none';
		if (startLoop) {
			globalID = requestAnimationFrame(repeatOften);
			globalAL = requestAnimationFrame(repeatAlways);
			lastTime = Date.now();
			startLoop = false;

			browserType = (navigator.detectBrowser).replace(/[0-9]/g, '');
			browserType = browserType.replace(/ /g, '');
		}
	})
	$("body").keydown(function (e) {
		if (e.keyCode == 80 && !points.gameover) {  //p code
			if (!isPaused) {
				e.preventDefault();
				//music.pause();
				isPaused = true;
				points.paused = true;
				ctx.font = "20px Arial";
				ctx.fillStyle = "#FF0000";
				document.getElementById('game-pause').style.display = 'block';
				document.getElementById('game-over-overlay').style.display = 'block';

			}
			else {
				e.preventDefault();
				//music.play();
				points.paused = false;
				isPaused = false;
				document.getElementById('game-pause').style.display = 'none';
				document.getElementById('game-over-overlay').style.display = 'none';
				document.getElementById('game-start').style.display = 'none';
				if (startLoop) {
					globalID = requestAnimationFrame(repeatOften);
					globalAL = requestAnimationFrame(repeatAlways);
					lastTime = Date.now();
					startLoop = false;
				}

			}
		}
		if (e.keyCode == 82 && !nameSuccessful) { //R  restart
			e.preventDefault();
			//music.play();
			points.hits = 0;
			time = 0;
			//reset enemy placement
			resizeCanvas(); //reset the rest
			points.gameover = false;
			$('#saveName').hide();
			$('#nameSaved').hide();

		}
		if (e.keyCode == 66) {  //opens the bag
			e.preventDefault();
			if (bag.opened == true) {
				bag.opened = false;
			}
			else {
				bag.opened = true;
			}
			updateAnimation(playerInterface[0].sprite.stateAnimations[playerInterface[0].sprite.currentState]);
		}
		if (e.keyCode == 72) {
			player.sprite.x = 50;
			player.sprite.y = 500;
		}

	});

});

function timeCountSeconds(s) {
	var h = Math.floor(s / 3600); //hours
	s -= h * 3600;
	var m = Math.floor(s / 60); //minutes
	s -= m * 60;
	return h + ":" + (m < 10 ? '0' + m : m) + ":" + (s < 10 ? '0' + s : s);
}

//FUNCTIONS FOR MYSQL STUFF
//FUNCTION FOR MySQL TABLE
function showTable() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	}
	else {
		// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			document.getElementById("txtTable").innerHTML = xmlhttp.responseText; //place into txtTable
		}
	}
	xmlhttp.open("Get", "showTopScores.php", true); //call get on file
	xmlhttp.send();
}

function PostData() {
	var xhr;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	}
	else if (window.ActiveXObject) {
		xhr = new ActiveXObject("Msxml2.XMLHTTP");
	}
	else {
		throw new Error("Ajax is not supported by this browser");
	}
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			if (xhr.status == 200 && xhr.status < 300) {
				document.getElementById('nameSaved').innerHTML = xhr.responseText;
				var thisthing = xhr.responseText;
				if (thisthing = "Score saved.") {
					$('#saveName').hide();
					nameSuccessful = false;
					$('#nameSaved').show();
				}
			}
		}
	}
	var userid = document.getElementById("userid").value;
	xhr.open('POST', 'insertScore.php');
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("userid=" + userid + "&score=" + points.hits);

	//xhr.send("userid=" + userid +"&userid2=" + userid2);How to post multiple variables var userid = document.getElementById("userid").value; //creating variable
}
//code to detect which browser user is using
navigator.detectBrowser = (function () {
	var ua = navigator.userAgent, tem,
		M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
	if (/trident/i.test(M[1])) {
		tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
		return 'IE ' + (tem[1] || '');
	}
	if (M[1] === 'Chrome') {
		tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
		if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
	}
	M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
	if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
	return M.join(' ');
})();