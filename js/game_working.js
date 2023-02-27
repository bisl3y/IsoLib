const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let tileSize = 32;
let renderStyle = "2d";
let x = canvas.width / 2;
let y = canvas.height / 2;
let color = 'black';
let angle = 0;

class tile {
    constructor() {
        this.shade = 'white'
            this.fillTile = function fillTile() {
            this.shade = color;
        }
        this.drawIso = function drawIso(x, y, tileSize) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + tileSize, y - tileSize / 2);
            ctx.lineTo(x, y - tileSize);
            ctx.lineTo(x - tileSize, y - tileSize / 2);
            ctx.closePath();
            ctx.fillStyle = this.shade;
            ctx.fill();
            ctx.stroke();
        }
        this.draw2d = function draw2d(x, y, tileSize) {
            ctx.beginPath();
            ctx.rect(x, y, tileSize, tileSize);
            ctx.fillStyle = this.shade;
            ctx.fillRect(x, y, tileSize, tileSize);
            ctx.stroke();
        }
    }
};

class map {
    constructor(mapCols, mapRows) {
        this.mapCols = mapCols;
        this.mapRows = mapRows;
        this.grid = new Array(mapCols);
        for (let col = 0; col < mapCols; col++) {
            this.grid[col] = new Array(mapRows);
        }
        for (let col = 0; col < this.mapCols; col++) {
            for (let row = 0; row < this.mapRows; row++) {
                this.grid[col][row] = new tile();
            }

        }

        this.draw2d = function draw2d(x, y, tileSize) {
            let rotOffsetX = this.mapCols * tileSize / 2;
            let rotOffsetY = this.mapRows * tileSize / 2;
            for (let col = 0; col < this.mapCols; col++) {
                for (let row = 0; row < this.mapRows; row++) {
                    if (angle == 0) {
                        this.grid[col][row].draw2d(col * tileSize + x - rotOffsetX, row * tileSize + y - rotOffsetY, tileSize)
                    } else if (angle == 90) {
                        this.grid[col][row].draw2d(-row * tileSize + x + rotOffsetY, col * tileSize + y - rotOffsetX, tileSize)
                    } else if (angle == 180) {
                        this.grid[col][row].draw2d(-col * tileSize + x + rotOffsetX, -row * tileSize + y + rotOffsetY, tileSize)
                    } else if (angle == 270) {
                        this.grid[col][row].draw2d(row * tileSize + x - rotOffsetY, -col * tileSize + y + rotOffsetX, tileSize)
                    }
                }

            }
        }

        this.drawIso = function drawIso(x, y, tileSize) {
			let rotOffsetX = (this.mapCols/2 * tileSize) - (this.mapRows/2 * tileSize);
            let rotOffsetY = (this.mapRows/2 * tileSize / 2) + (this.mapCols/2 *tileSize/2);
            for (let col = 0; col < this.mapCols; col++) {
                for (let row = 0; row < this.mapRows; row++) {
                    let rowOffset = row * tileSize;
                    if (angle == 0) {
                        this.grid[col][row].drawIso(col * tileSize - rowOffset + x - rotOffsetX, col * tileSize / 2 + rowOffset / 2 + y - rotOffsetY, tileSize)
                    } else if (angle == 90) {
                        this.grid[col][row].drawIso(-col * tileSize - rowOffset + x + rotOffsetY, col * tileSize / 2 - rowOffset / 2 + y - rotOffsetX, tileSize)
                    } else if (angle == 180) {
                        this.grid[col][row].drawIso(-col * tileSize + rowOffset + x  + rotOffsetX, -col * tileSize / 2 - rowOffset / 2 + y + rotOffsetY, tileSize)
                    } else if (angle == 270) {
                        this.grid[col][row].drawIso(col * tileSize + rowOffset + x  - rotOffsetY, -col * tileSize / 2 + rowOffset / 2 + y + rotOffsetX, tileSize)
                    }

                }
            }
        }

        this.setTile2d = function setTile2d(mouseX, mouseY) {
            let rotOffsetX = (this.mapCols / 2)*tileSize;
            let rotOffsetY = (this.mapRows / 2)*tileSize;
            let col = Math.floor((mouseX - x +rotOffsetX) / tileSize );
            let row = Math.floor((mouseY - y +rotOffsetY) / tileSize );
            if (angle == 90) {
                col = Math.floor((mouseY - y +rotOffsetY) / tileSize );
                row = -Math.floor((mouseX - x -rotOffsetX) / tileSize );
            } else if (angle == 180) {
                col = -Math.floor((mouseX - x -rotOffsetX) / tileSize );
                row = -Math.floor((mouseY - y -rotOffsetY) / tileSize );
            } else if (angle == 270) {
                col = -Math.floor((mouseY - y -rotOffsetY) / tileSize );
                row = Math.floor((mouseX - x + rotOffsetX) / tileSize );
            }
            if (col >= 0 && col < this.mapCols && row >= 0 && row < mapRows) {
                this.grid[col][row].fillTile()
            }
        }

        this.setTileIso = function setTile3d(mouseX, mouseY) {
			let rotOffsetX = (this.mapCols/2 * tileSize) - (this.mapRows/2 * tileSize);
            let rotOffsetY = (this.mapRows/2 * tileSize / 2) + (this.mapCols/2 *tileSize/2);
            if (angle == 0) {
			let row = Math.floor((mouseY - y +rotOffsetY) / tileSize - (mouseX - x + rotOffsetX) / (tileSize * 2)) + 1;
            let col = Math.floor((mouseX - x + rotOffsetX) / tileSize / 2 + (mouseY - y +rotOffsetY) / tileSize) + 1;
			console.log(col+','+row)
                if (col >= 0 && col < this.mapCols && row >= 0 && row < mapRows) {
                    this.grid[col][row].fillTile()
                }
			}

			if (angle == 90) {
			let row = Math.floor((-mouseY + y +rotOffsetY) / tileSize - (mouseX - x + rotOffsetX) / (tileSize * 2)) - 1;
            let col = Math.floor((-mouseX + x + rotOffsetX) / tileSize / 2 + (mouseY - y +rotOffsetY) / tileSize) - 1;
			//console.log(row) I BET WE SWAP THE OFFSETS
                if (col >= 0 && col < this.mapCols && row >= 0 && row < mapRows) {
                    this.grid[col][row].fillTile()
                }
			}
			
			if (angle == 270) {
			let row = Math.floor((mouseY - y + rotOffsetY) / tileSize + (mouseX - x + rotOffsetX) / (tileSize * 2)) - 1;
            let col = Math.floor((mouseX - x + rotOffsetX) / tileSize / 2 - (mouseY - y +rotOffsetY) / tileSize) - 1;
			console.log(col+','+row)
                if (col >= 0 && col < this.mapCols && row >= 0 && row < mapRows) {
                    this.grid[col][row].fillTile()
                }
			}
			
        }
    }
};

function drawIso() {
    renderStyle = "Iso";
    drawMap();
};

function draw2d() {
    renderStyle = "2d";
    drawMap();
};

function zoom(z) {
    if (z > 0 || tileSize != 10) {
        tileSize = tileSize + z * 10
    }
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
        map.setTileIso(event.offsetX, event.offsetY);
        drawIso();
    } else {
        map.setTile2d(event.offsetX, event.offsetY);
        draw2d();
    }
};

function rotateMap(rot) {
    angle = angle + rot;
    if (angle == 360) {
        angle = 0
    } else if (angle == -90) {
        angle = 270;
    }
    drawMap();
};

map = new map(10, 10);
angle =270
drawIso();