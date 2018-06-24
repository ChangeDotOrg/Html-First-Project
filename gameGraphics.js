function updateDrawGraphics(){
	// regular fence piece NS
	fence.push({ //regular fence EW, above gate
		sprite: (new Sprite({'EW': fence_2}, 'EW', -28, 185, 86, 65, 160)),
	});
	fence.push({ //regular fence EW, above gate
		sprite: (new Sprite({'EW': fence_2}, 'EW', 6, 167, 86, 65, 160)),
	});
	fence.push({ //regular fence EW, above gate
		sprite: (new Sprite({'EW': fence_2}, 'EW', 40, 149, 86, 65, 160)),
	});
	fence.push({ //regular fence TURN right, above gate
		sprite: (new Sprite({'NS': fence_1}, 'NS', 48, 149, 86, 65, 160)),
	});
	fence.push({ //regular fence NS, above gate
		sprite: (new Sprite({'NS': fence_1}, 'NS', 82, 166, 86, 65, 160)),
	});
	fence.push({ //regular fence NS, above gate
		sprite: (new Sprite({'NS': fence_1}, 'NS', 116, 183, 86, 65, 160)),
	});
	fence.push({ //regular fence NS, above gate
		sprite: (new Sprite({'NS': fence_1}, 'NS', 150, 200, 86, 65, 160)),
	});
	//fence.push({  //holds the gate
	//	sprite: (new Sprite({'openGate': gate_1}, 'openGate', 206, 216, 86, 65, 160)),
	//});
	fence.push({  //regular Fence NS, below gate
		sprite: (new Sprite({'NS': fence_1}, 'NS', 219, 235, 86, 65, 160)),
	});
	fence.push({  //regular Fence NS, bg
		sprite: (new Sprite({'NS': fence_1}, 'NS', 253, 252, 86, 65, 160)),
	});
	fence.push({  //regular Fence NS, bg
		sprite: (new Sprite({'NS': fence_1}, 'NS', 287, 269, 86, 65, 160)),
	});
	fence.push({  //regular Fence NS, bg
		sprite: (new Sprite({'NS': fence_1}, 'NS', 321, 286, 86, 65, 160)),
	});
	fence.push({ //regular fence Turn left, below gate
		sprite: (new Sprite({'NS': fence_left}, 'NS', 366, 303, 86, 65, 160)),
	});
	fence.push({ //regular fence EW, below gate
		sprite: (new Sprite({'EW': fence_2}, 'EW', 356, 322, 86, 65, 160)),
	});
	fence.push({ //regular fence EW, below gate
		sprite: (new Sprite({'EW': fence_2}, 'EW', 322, 340, 86, 65, 160)),
	});
	fence.push({ //regular fence EW, below gate
		sprite: (new Sprite({'EW': fence_2}, 'EW', 288, 358, 86, 65, 160)),
	});
	fence.push({ //regular fence EW, below gate
		sprite: (new Sprite({'EW': fence_2}, 'EW', 254, 376, 86, 65, 160)),
	});
	fence.push({ //regular fence EW, below gate
		sprite: (new Sprite({'EW': fence_2}, 'EW', 220, 394, 86, 65, 160)),
	});
	fence.push({ //regular fence EW, below gate
		sprite: (new Sprite({'EW': fence_2}, 'EW', 186, 412, 86, 65, 160)),
	});
	fence.push({ //regular fence EW, below gate
		sprite: (new Sprite({'EW': fence_2}, 'EW', 152, 430, 86, 65, 160)),
	});fence.push({ //regular fence EW, below gate
		sprite: (new Sprite({'EW': fence_2}, 'EW', 118, 448, 86, 65, 160)),
	});
	fence.push({ //regular fence TURN right, above gate
		sprite: (new Sprite({'turnRight': fence_right}, 'turnRight', 73, 466, 86, 65, 160)),
	});
	fence.push({ //regular fence Turn left, below gate
		sprite: (new Sprite({'NS': fence_1}, 'NS', 83, 484, 86, 65, 160)),
	});
	
	//GRAVES
	grave.push({ 
		sprite: (new Sprite({'open': grave_1}, 'open', 80 , 193, 54, 54, 160)),
	});
	grave.push({ 
		sprite: (new Sprite({'closed': grave_2}, 'closed', 118 , 214, 54, 54, 160)),
	});
	grave.push({  //bottom side grave below gate
		sprite: (new Sprite({'closed': grave_3}, 'closed', 175 , 400, 54, 54, 160)),
	});
	grave.push({ //bottom side grave below gate
		sprite: (new Sprite({'closed': grave_3}, 'closed', 217 , 380, 54, 54, 160)),
	});
	grave.push({ //bottom side grave below gate
		sprite: (new Sprite({'closed': grave_3}, 'closed', 259 , 360, 54, 54, 160)),
	});
	grave.push({ //bottom side grave below gate
		sprite: (new Sprite({'closed': grave_3}, 'closed', 301 , 340, 54, 54, 160)),
	});
	grave.push({ //bottom side grave below gate
		sprite: (new Sprite({'closed': grave_3}, 'closed', 343 , 320, 54, 54, 160)),
	});
	grave.push({ //bottom side grave below gate
		sprite: (new Sprite({'closed': grave_4}, 'closed', 295 , 300, 54, 54, 160)),
	});
	wordBubble.push({
		sprite:(new Sprite({'five': damages}, 'five', 100, 100, 16,16,160)),
	});
}

function pushGraphics(){
	//new row 1
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({'maple': tree_maple}, 'maple', -24 , -20, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({'maple': tree_maple}, 'maple', 4 , -20, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({'maple': tree_maple}, 'maple', 32 , -20, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({'maple': tree_maple}, 'maple', 60 , -20, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({'maple': tree_maple}, 'maple', 88 , -20, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({'maple': tree_maple}, 'maple', 116 , -20, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({'maple': tree_maple}, 'maple', 144 , -20, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({'maple': tree_maple}, 'maple', 172 , -20, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({'maple': tree_maple}, 'maple', 200 , -20, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({'maple': tree_maple}, 'maple', 228 , -20, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({'maple': tree_maple}, 'maple', 256 , -20, 54, 54, 160)),
	});
	
	//new row 2
	tree.push({ //
		level: 'front',
		sprite: (new Sprite({'maple': tree_maple2}, 'maple', -33 , 10, 54, 54, 160)),
	});
	tree.push({ //
		level: 'front',
		sprite: (new Sprite({'maple': tree_maple2}, 'maple', 256 , 10, 54, 54, 160)),
	});
	//new row 3
	tree.push({ //
		level: 'front',
		sprite: (new Sprite({'maple': tree_maple2}, 'maple', -33 , 40, 54, 54, 160)),
	});
	tree.push({ //
		level: 'front',
		sprite: (new Sprite({'maple': tree_maple2}, 'maple', 32 , 33, 54, 54, 160)),
	});
	tree.push({ //
		level: 'front',
		sprite: (new Sprite({'maple': tree_maple2}, 'maple', 60 , 33, 54, 54, 160)),
	});
	tree.push({ //
		level: 'front',
		sprite: (new Sprite({'maple': tree_maple2}, 'maple', 88 , 33, 54, 54, 160)),
	});
	tree.push({ //
		level: 'front',
		sprite: (new Sprite({'maple': tree_maple2}, 'maple', 116 , 33, 54, 54, 160)),
	});
	tree.push({ //
		level: 'front',
		sprite: (new Sprite({'maple': tree_maple2}, 'maple', 144 , 33, 54, 54, 160)),
	});
	tree.push({ //
		level: 'front',
		sprite: (new Sprite({'maple': tree_maple2}, 'maple', 172 , 33, 54, 54, 160)),
	});
	tree.push({ //
		level: 'front',
		sprite: (new Sprite({'maple': tree_maple2}, 'maple', 200 , 40, 54, 54, 160)),
	});
	tree.push({ //
		level: 'front',
		sprite: (new Sprite({'maple': tree_maple2}, 'maple', 228 , 40, 54, 54, 160)),
	});
	tree.push({ //
		level: 'front',
		sprite: (new Sprite({'maple': tree_maple2}, 'maple', 256 , 40, 54, 54, 160)),
	});
	//new row 4
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({'maple': tree_maple}, 'maple', -33 , 70, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({'maple': tree_maple}, 'maple', 32 , 63, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({'maple': tree_maple}, 'maple', 60 , 63, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({'maple': tree_maple}, 'maple', 88 , 63, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({'maple': tree_maple}, 'maple', 116 , 63, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({'maple': tree_maple}, 'maple', 144 , 63, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({'maple': tree_maple}, 'maple', 172 , 63, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({'maple': tree_maple}, 'maple', 200 , 70, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({'maple': tree_maple}, 'maple', 228 , 70, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({'maple': tree_maple}, 'maple', 256 , 70, 54, 54, 160)),
	});
	//new row 5
	tree.push({ //
		level: 'front',
		sprite: (new Sprite({'maple': tree_maple2}, 'maple', -33, 100, 54, 54, 160)),
	});
	tree.push({ //
		level: 'front',
		sprite: (new Sprite({'maple': tree_maple2}, 'maple', -5, 100, 54, 54, 160)),
	});
	tree.push({ //
		level: 'front',
		sprite: (new Sprite({'maple': tree_maple2}, 'maple',  23, 100, 54, 54, 160)),
	});
	tree.push({ //
		level: 'front',
		sprite: (new Sprite({'maple': tree_maple2}, 'maple', 51 , 100, 54, 54, 160)),
	});
	tree.push({ //
		level: 'front',
		sprite: (new Sprite({'maple': tree_maple2}, 'maple', 79, 100, 54, 54, 160)),
	});
	tree.push({ //
		level: 'front',
		sprite: (new Sprite({'maple': tree_maple2}, 'maple',  107, 100, 54, 54, 160)),
	});
	tree.push({ //
		level: 'front',
		sprite: (new Sprite({'maple': tree_maple2}, 'maple', 135 , 100, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({'maple': tree_maple}, 'maple', 200 , 100, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({'maple': tree_maple}, 'maple', 228 , 100, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({'maple': tree_maple}, 'maple', 256 , 100, 54, 54, 160)),
	});
	//new row 6
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({'maple': tree_maple}, 'maple', -33, 130, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({'maple': tree_maple}, 'maple', -5, 130, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({'maple': tree_maple}, 'maple',  23, 130, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({'maple': tree_maple}, 'maple', 51 , 130, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({'maple': tree_maple}, 'maple', 79, 130, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({'maple': tree_maple}, 'maple',  107, 130, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({'maple': tree_maple}, 'maple', 135 , 130, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({'maple': tree_maple}, 'maple', 200 , 130, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({'maple': tree_maple}, 'maple', 228 , 130, 54, 54, 160)),
	});
	tree.push({ //
		level: 'back',
		sprite: (new Sprite({'maple': tree_maple}, 'maple', 256 , 130, 54, 54, 160)),
	});
	
	//top tree chest
	lootChest.push({
		opened: false,
		sprite: (new Sprite({'closed': chestClosed, 'opened': chestOpened},'closed', 230, 0, 54, 54, 160)),
	})
	wordBubble.push({
		visible: 'yes',
		item: 'chest',
		sprite:(new Sprite({'talk': pressF}, 'talk', player.sprite.x+10, player.sprite.y-15, 45,18,160)),
	});
	wordBubble.push({
		visible: 'yes',
		item: 'loot',
		sprite:(new Sprite({'talk': pressF}, 'talk', player.sprite.x+10, player.sprite.y-15, 45,18,160)),
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
	});*/
	edge.push({ //ISLAND
		sprite:(new Sprite({'EW': island}, 'EW', 425, 297, 230, 230,160)),
	});
	playerInterface.push({
		sprite:(new Sprite({'close': spellBarBag,'open': spellBarBagOpen}, 'close',0, 405,318,120,0)),
	})
	tomes.push({
		tag: 'tome',
		visible: 'yes',
		level: 'level 1',
		discription: 'A lightning spell with moderate damage.',
		sprite:(new Sprite({'dropped': lightningTome_1}, 'dropped', 300, 250, 32, 32, 0)),
	})
}