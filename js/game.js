const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let heightLimit = -3;
let tileSize = 48;
let renderStyle = "Iso";
let x = canvas.width / 2;
let y = canvas.height / 2;
let color = 'black';
let block = crateImg;
let angle = 0;
let propAngle = 0;
let mapWidth = 16;
let mapHeight = 16;
let outline = false;
let mouseIsDown = false;
let clickStart = [0, 0];
let selection = [];
let cursorX = 0;
let cursorY = 0;
let selectionType = "ground";
let wallHeight = 1;
wallHeight=1.5
let wallShade = 'white';
wallShade = 'rgba(255,255,255,0.5)'
let saveData;
let level = '1';
let wallAlpha = 1;
var file

function drawIso() {
    renderStyle = "Iso";
    //drawMap();
};

function draw2d() {
    renderStyle = "2d";
    //drawMap();
};

function drawMap() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (renderStyle == "2d") {
        map.draw2d(x, y, tileSize)
    } else {
        map.drawIso(x, y, tileSize)
    }
};

canvas.addEventListener("mousedown", mouseDown);

function mouseDown(event) {
    if (event.button == 0) {
        mouseIsDown = true;
        clickStart = map.findTileID(event.offsetX, event.offsetY);
		highlight();
        //console.log(clickStart);
    }
}

canvas.addEventListener("mouseup", mouseUp);

function mouseUp(event) {
    if (event.button == 0) {
        mouseIsDown = false;
    }
}

canvas.addEventListener("wheel", zoom);

function zoom(z) {
    if (z instanceof Event) {
        if (tileSize - z.deltaY / 100 > 10) {
            tileSize = tileSize - z.deltaY / 100;
        }
    } else if (z > 0 || tileSize != 10) {
        tileSize = tileSize + z * 10
    }
    //drawMap();
};

addEventListener("keydown", toggleGrid);

function toggleGrid(event) {
    if (event.key == 'o') {
        outline = !outline;
    }
}

addEventListener("keydown", rotateMap);

function rotateMap(rot) {
    if (rot instanceof Event) {
        if (rot.key == 'z') {
            angle = angle - 90;
        } else if (rot.key == 'x') {
            angle = angle + 90;
        }
    } else {
        angle = angle + rot;
    }
    if (angle == 360) {
        angle = 0
    } else if (angle == -90) {
        angle = 270;
    }
    //drawMap();
};

addEventListener("keydown", rotateProp);

function rotateProp(rot) {
    if (rot instanceof Event) {
        if (rot.key == 'r') {
            propAngle = propAngle + 90;
        }
    }
    if (propAngle == 360) {
        propAngle = 0
    } else if (propAngle == -90) {
        propAngle = 270;
    }
    highlight();
};

addEventListener("keydown", tileSelect);

function tileSelect(event) {
    switch (event.key) {
    case '1':
        block = grassImg;
        break;
    case '2':
        block = defaultIso;
        break;
    case '3':
        block = crateImg;
        break;
    case '4':
        block = sofaImg;
        break;
    }
};

addEventListener("keydown", switchRenderStyle);

function switchRenderStyle(event) {
    switch (event.key) {
    case 'q':
        renderStyle = 'Iso';
        //drawMap();
        break;
    case 'w':
        renderStyle = '2d';
        //drawMap();
        break;
    }
};

canvas.addEventListener("mousemove", scrollMap);

function scrollMap(event) {
    if (event.buttons == 4) {
        x += event.movementX;
        y += event.movementY;
        //drawMap();
    }
}

addEventListener("keydown", switchHighlightStyle);

function switchHighlightStyle(event) {
	if(event.key == 'e'){
	if(selectionType == "ground"){
		selectionType = "walls";
	}
	else if(selectionType == "walls"){
		selectionType = "ground";
	}
	}
};

canvas.addEventListener("mousemove", highlight);

function highlight(event) {
	if(selectionType == "ground"){
	if(typeof event === 'object' && event.type=="mousemove"){
	cursorX=event.offsetX;
	cursoyY=event.offsetY;
	}	
    let hlTile = map.findTileID(cursorX, cursoyY);
    let col = hlTile[0]
        let row = hlTile[1]
        //if(mouseIsDown == false){
        map.clearHighlights();
    //}
    if (mouseIsDown) {
        highlightGrid(clickStart[0], clickStart[1], col, row);
		selectGrid(clickStart[0], clickStart[1], col, row);
    } else{
		for(let i = block.dimensions[1]-1; i>=0; i--){
		if (propAngle==0 && map.isTile(col, row-i)){
        map.grid[col][row - i].highlight = true;
		}
		else if (propAngle==90 && map.isTile(col+i, row)){
        map.grid[col + i][row].highlight = true;
		}
		else if (propAngle==180 && map.isTile(col, row+i)){
        map.grid[col][row + i].highlight = true;
		}
		else if (propAngle==270 && map.isTile(col-i, row)){
        map.grid[col - i][row].highlight = true;
		}
		}
    }
	}
}


canvas.addEventListener("mousemove", highlightEdge); 

function highlightEdge(event) {
	if(selectionType == "walls"){
	if(typeof event === 'object' && event.type=="mousemove"){
	cursorX=event.offsetX;
	cursoyY=event.offsetY;
	}	
    let hlTile = map.findTileID(cursorX, cursoyY);
    let col = hlTile[0]
        let row = hlTile[1]
        //if(mouseIsDown == false){
        map.clearHighlights();
    //}
    if (mouseIsDown) {
        highlightGrid(clickStart[0], clickStart[1], col, row);
		selectGrid(clickStart[0], clickStart[1], col, row);
    } else{
		for(let i = block.dimensions[1]-1; i>=0; i--){
		if (propAngle==0 && map.isTile(col, row-i)){
        map.grid[col][row - i].highlightEdge = true;
		map.grid[col][row - i].selectedEdge = selectEdge(cursorX,cursoyY);
		}
		else if (propAngle==90 && map.isTile(col+i, row)){
        map.grid[col + i][row].highlightEdge = true;
		}
		else if (propAngle==180 && map.isTile(col, row+i)){
        map.grid[col][row + i].highlightEdge = true;
		}
		else if (propAngle==270 && map.isTile(col-i, row)){
        map.grid[col - i][row].highlightEdge = true;
		}
		}
    }
	}
}


/*
canvas.addEventListener("mousemove", highlightCorner); 

function highlightCorner(event) {
	if(selectionType == "walls"){
	if(typeof event === 'object' && event.type=="mousemove"){
	cursorX=event.offsetX;
	cursoyY=event.offsetY;
	}	
    let hlTile = map.findTileID(cursorX, cursoyY);
    let col = hlTile[0]
        let row = hlTile[1]
        //if(mouseIsDown == false){
        map.clearHighlights();
    //}
    if (mouseIsDown) {
        highlightGrid(clickStart[0], clickStart[1], col, row);
		selectGrid(clickStart[0], clickStart[1], col, row);
    } else{
		for(let i = block.dimensions[1]-1; i>=0; i--){
		if (propAngle==0 && map.isTile(col, row-i)){
        map.grid[col][row - i].highlightCorner = true;
		map.grid[col][row - i].selectedCorner = selectEdge(cursorX,cursoyY);
		}
		else if (propAngle==90 && map.isTile(col+i, row)){
        map.grid[col + i][row].highlightCorner = true;
		}
		else if (propAngle==180 && map.isTile(col, row+i)){
        map.grid[col][row + i].highlightCorner = true;
		}
		else if (propAngle==270 && map.isTile(col-i, row)){
        map.grid[col - i][row].highlightCorner = true;
		}
		}
    }
	}
}*/

function selectEdge(x,y){
	//console.log(map.floatTileID(x,y)[0]%1);
	if(map.floatTileID(x,y)[0]%1<0.3){
	return 0;
	}
	else if(map.floatTileID(x,y)[0]%1>0.7){
	return 2;
	}
	else if(map.floatTileID(x,y)[1]%1<0.3){
	return 1;
	}
	else if(map.floatTileID(x,y)[1]%1>0.7){
	return 3;
	}
}

function highlightGrid(x1, y1, x2, y2) {
    if (x1 <= x2 && y1 <= y2) {
        for (let i = x1; i <= x2; i++) {
            for (let j = y1; j <= y2; j++) {
                if (map.isTile(i, j)) {
                    map.grid[i][j].highlight = true;
                }
            }
        }
    } else if (x1 >= x2 && y1 >= y2) {
        for (let i = x1; i >= x2; i--) {
            for (let j = y1; j >= y2; j--) {
                if (map.isTile(i, j)) {
                    map.grid[i][j].highlight = true;
                }
            }
        }
    } else if (x1 <= x2 && y1 >= y2) {
        for (let i = x1; i <= x2; i++) {
            for (let j = y1; j >= y2; j--) {
                if (map.isTile(i, j)) {
                    map.grid[i][j].highlight = true;
                }
            }
        }
    } else if (x1 >= x2 && y1 <= y2) {
        for (let i = x1; i >= x2; i--) {
            for (let j = y1; j <= y2; j++) {
                if (map.isTile(i, j)) {
                    map.grid[i][j].highlight = true;
                }
            }
        }
    }
}

function selectGrid(x1, y1, x2, y2) {
	selection = [];
    if (x1 <= x2 && y1 <= y2) {
        for (let i = x1; i <= x2; i++) {
            for (let j = y1; j <= y2; j++) {
                if (map.isTile(i, j)) {
                    selection.push([i,j]);
                }
            }
        }
    } else if (x1 >= x2 && y1 >= y2) {
        for (let i = x1; i >= x2; i--) {
            for (let j = y1; j >= y2; j--) {
                if (map.isTile(i, j)) {
                    selection.push([i,j]);
                }
            }
        }
    } else if (x1 <= x2 && y1 >= y2) {
        for (let i = x1; i <= x2; i++) {
            for (let j = y1; j >= y2; j--) {
                if (map.isTile(i, j)) {
                    selection.push([i,j]);
                }
            }
        }
    } else if (x1 >= x2 && y1 <= y2) {
        for (let i = x1; i >= x2; i--) {
            for (let j = y1; j <= y2; j++) {
                if (map.isTile(i, j)) {
                    selection.push([i,j]);
                }
            }
        }
    }
}

canvas.addEventListener("click", setTile);

function setTile(event) {
	if(selectionType == "walls"){
		if(event.altKey){
			map.clearWallIso(event.offsetX,event.offsetY);
			}
	else{map.setWallIso(event.offsetX,event.offsetY);
	}
	}
    else if (renderStyle == "Iso") {
        if (outline) {
			for(let i = 0; i < selection.length; i++){
			map.moveGroundUpbyID(selection[i][0], selection[i][1], event.altKey);
			}
            //map.moveGroundUp(event.offsetX, event.offsetY, event.altKey);
        } else {
			for(let i = 0; i < selection.length; i++){
			if(event.altKey){
			map.clearPropByID(selection[i][0], selection[i][1]);	
			}
			else{
			map.setTileByID(selection[i][0], selection[i][1]);
			}
			}
            //map.setTileIso(event.offsetX, event.offsetY);
        }
        drawIso();
    } else {
        map.setTile2d(event.offsetX, event.offsetY);
        draw2d();
    }
};

function saveMap(){
//localStorage.setItem("lastMap", JSON.stringify(map));
localStorage.setItem("Map"+level, JSON.stringify(map,replace));
}

function replace(key,val){
	if(val instanceof tileBlock){
	return val.iD}
	else{
	return val
	}
}

function loadMap(){
saveData = JSON.parse(localStorage.getItem("Map"+level));
mapBuild(saveData);
}

function mapBuild(saveData){
	map = new imageMap(saveData.mapCols,saveData.mapRows);
for(let i = 0; i<map.mapCols; i++){
	for(let j = 0; j<map.mapRows; j++){
	Object.assign(map.grid[i][j],saveData.grid[i][j]);
	map.grid[i][j].ground = eval(saveData.grid[i][j].ground);
	map.grid[i][j].prop = eval(saveData.grid[i][j].prop);
}
} 
}

window.addEventListener("input", mapSelect);
function mapSelect(){
level = document.querySelector("#map-select").value;
}

window.addEventListener("input", setWallAlpha);
function setWallAlpha(){
wallAlpha = document.querySelector("#wall-alpha").value;
}

function newMap() {
    map = new imageMap(mapWidth, mapHeight);
    drawMap();
}
angle = 0
    newMap();

crateImg.onload = () => {
    draw();
}

//main game loop
function draw() {
    drawMap();
    window.requestAnimationFrame(draw);
}

function download(content, fileName) {
    var a = document.createElement("a");
    var file = new Blob([content]);
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

function upLoad() {
  file = document.querySelector('input[type=file]').files[0];
  file.text().then(loadFromDisk);
}

function loadFromDisk(text){
	mapBuild(JSON.parse(text))
}

draw();