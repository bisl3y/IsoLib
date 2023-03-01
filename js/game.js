const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const grassImg = new tileBlock('ground',1);
grassImg.src = "img/grassBlock_iso_0.gif";
const crateImg = new tileBlock('prop',1);
crateImg.src = "img/crate_iso_0.gif";
const dockImg = new tileBlock('prop',4);
dockImg.src = "img/dock_iso_x4.gif";

let tileSize = 48;
let renderStyle = "Iso";
let x = canvas.width / 2;
let y = canvas.height / 2;
let color = 'black';
let block = crateImg;
let angle = 0;
let mapWidth = 16;
let mapHeight = 16;
let outline = false;

function drawIso() {
    renderStyle = "Iso";
    drawMap();
};

function draw2d() {
    renderStyle = "2d";
    drawMap();
};

function drawMap() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (renderStyle == "2d") {
        map.draw2d(x, y, tileSize)
    } else {
        map.drawIso(x, y, tileSize)
    }
};

canvas.addEventListener("click", setTile);

function setTile(event) {
    if (renderStyle == "Iso") {
		if(outline){
		map.moveGroundUp(event.offsetX, event.offsetY, event.altKey);	
		}
		else{
        map.setTileIso(event.offsetX, event.offsetY);
		}
        drawIso();
    } else {
        map.setTile2d(event.offsetX, event.offsetY);
        draw2d();
    }
};

canvas.addEventListener("wheel", zoom);

function zoom(z) {
    if (z instanceof Event) {
        if (tileSize - z.deltaY / 100 > 10) {
            tileSize = tileSize - z.deltaY / 100;
        }
    } else if (z > 0 || tileSize != 10) {
        tileSize = tileSize + z * 10
    }
    drawMap();
};

addEventListener("keydown", toggleGrid);

function toggleGrid(event){
	if (event.key == 'o'){
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
    drawMap();
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
    block = dockImg;
    break;
}
};

addEventListener("keydown", switchRenderStyle);

function switchRenderStyle(event) {
switch (event.key) {
	case 'q':
    renderStyle = 'Iso';
	drawMap();
    break;
    case 'w':
    renderStyle = '2d';
	drawMap();
    break;
}
};

canvas.addEventListener("mousemove", scrollMap);

function scrollMap(event){
if(event.buttons == 4){
	x += event.movementX;
	y += event.movementY;
	drawMap();
}
}

canvas.addEventListener("mousemove", highlight);

function highlight(event){
	let hlTile = map.findTileID(event.offsetX, event.offsetY);
	let col = hlTile[0]
	let row = hlTile[1]
	map.clearHighlights();
	if (col >= 0 && col < map.mapCols && row >= 0 && row < map.mapRows){
	map.grid[col][row].highlight = true;
	drawMap();
	}
}

function newMap(){
	map = new imageMap(mapWidth, mapHeight);
	drawMap();
}
angle = 0
newMap();

crateImg.onload = () => {
    drawMap();
}