const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const grassImg = new tileBlock('ground', 1, [1,1]);
grassImg.src = "img/grassBlock_iso_0.gif";
const crateImg = new tileBlock('prop', 1, [1,1]);
crateImg.src = "img/crate_iso_0.gif";
const sofaImg = new tileBlock('prop', 4, [1,2]);
sofaImg.src = "img/sofa_iso_x4.png";
const deskImg = new tileBlock('prop', 4, [1,2]);
deskImg.src = "img/desk_iso_x4.png";
const plant1Img = new tileBlock('prop', 4, [1,1]);
plant1Img.src = "img/plant1_iso_x4.png";

let heightLimit = -3;
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
let isMouseDown = false;
let clickStart = [0, 0];
let selection = [];

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
        isMouseDown = true;
        clickStart = map.findTileID(event.offsetX, event.offsetY);
        //console.log(clickStart);
    }
}

canvas.addEventListener("mouseup", mouseUp);

function mouseUp(event) {
    if (event.button == 0) {
        isMouseDown = false;
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

canvas.addEventListener("mousemove", highlight);
canvas.addEventListener("mousedown", highlight);

function highlight(event) {
    let hlTile = map.findTileID(event.offsetX, event.offsetY);
    let col = hlTile[0]
        let row = hlTile[1]
        //if(isMouseDown == false){
        map.clearHighlights();
    //}
    if (isMouseDown) {
        highlightGrid(clickStart[0], clickStart[1], col, row);
		selectGrid(clickStart[0], clickStart[1], col, row);
    } else if (map.isTile(col, row)) {
        map.grid[col][row].highlight = true;
        //drawMap();
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
    if (renderStyle == "Iso") {
        if (outline) {
			for(let i = 0; i < selection.length; i++){
			map.moveGroundUpbyID(selection[i][0], selection[i][1], event.altKey);
			}
            //map.moveGroundUp(event.offsetX, event.offsetY, event.altKey);
        } else {
			for(let i = 0; i < selection.length; i++){
			map.setTileByID(selection[i][0], selection[i][1]);
			}
            //map.setTileIso(event.offsetX, event.offsetY);
        }
        drawIso();
    } else {
        map.setTile2d(event.offsetX, event.offsetY);
        draw2d();
    }
};

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

draw();