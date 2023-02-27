class tileBlock extends Image {
    constructor(type,angleNum) {
        super();
		this.blockType = type;
		this.angles = angleNum;
	}
}

const defaultIso = new tileBlock('ground',1);
defaultIso.src = "img/paving_iso_0.gif";

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

class imageTile extends tile {
    constructor() {
        super();
        this.ground = defaultIso;		
		this.prop = null;
        this.fillTile = function fillTile() {
            if(block.blockType == 'prop'){
			this.prop = block;	
			}
			else{
			this.ground = block;}
        }
        this.drawIso = function drawIso(x, y, tileSize) {
			let widthOffsetGround = this.ground.width/this.ground.angles
            ctx.drawImage(this.ground, 0,0, widthOffsetGround, this.ground.height, x - tileSize, y - tileSize * this.ground.height / 64, widthOffsetGround * tileSize / 64, this.ground.height * tileSize / 64);
			if(this.prop instanceof tileBlock){
				let widthOffsetProp = this.prop.width/this.prop.angles
				let angleOffset = angle/360;
				if(this.prop.angles == 4){
				ctx.drawImage(this.prop, this.prop.width*angleOffset, 0, widthOffsetProp, this.prop.height, x - tileSize, y - tileSize * this.prop.height / 64, widthOffsetProp * tileSize / 64, this.prop.height * tileSize / 64);}
				else{
				ctx.drawImage(this.prop, 0, 0, widthOffsetProp, this.prop.height, x - tileSize, y - tileSize * this.prop.height / 64, widthOffsetProp * tileSize / 64, this.prop.height * tileSize / 64);	
				}
			}
        }
    }
}

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
            let rotOffsetX = (this.mapCols / 2 * tileSize) - (this.mapRows / 2 * tileSize);
            let rotOffsetY = (this.mapRows / 2 * tileSize / 2) + (this.mapCols / 2 * tileSize / 2);
			rotOffsetX = 0
			rotOffsetY = 0
            if (angle == 0) {
				rotOffsetY = -this.mapRows/2*tileSize/2 -this.mapCols/2*tileSize/2
				rotOffsetX = this.mapRows/2*tileSize -this.mapCols/2*tileSize
                for (let col = 0; col < this.mapCols; col++) {
                    for (let row = 0; row < this.mapRows; row++) {
						let rowOffset = row * tileSize;
                        this.grid[col][row].drawIso(col * tileSize - rowOffset + x + rotOffsetX, col * tileSize / 2 + rowOffset / 2 + y + rotOffsetY, tileSize);
                    }
                }
            } else if (angle == 90) {
				rotOffsetY = this.mapRows/2*tileSize/2 -this.mapCols/2*tileSize/2 -tileSize/2
				rotOffsetX = this.mapRows/2*tileSize +this.mapCols/2*tileSize -tileSize
                for (let col = 0; col < this.mapCols; col++) {
                    for (let row = this.mapRows - 1; row >= 0; row--) {
						let rowOffset = row * tileSize;
                        this.grid[col][row].drawIso(-col * tileSize - rowOffset + x + rotOffsetX, col * tileSize / 2 - rowOffset / 2 + y + rotOffsetY, tileSize);
                    }
                }
            } else if (angle == 180) {
				rotOffsetY = this.mapRows/2*tileSize/2 + this.mapCols/2*tileSize/2 -tileSize
				rotOffsetX = -this.mapRows/2*tileSize + this.mapCols/2*tileSize
                for (let col = this.mapCols - 1; col >= 0; col--) {
                    for (let row = this.mapRows - 1; row >= 0; row--) {
						let rowOffset = row * tileSize;
                        this.grid[col][row].drawIso(-col * tileSize + rowOffset + x + rotOffsetX, -col * tileSize / 2 - rowOffset / 2 + y + rotOffsetY, tileSize);
                    }
                }
            } else if (angle == 270) {
				rotOffsetY = -this.mapRows/2*tileSize/2 +this.mapCols/2*tileSize/2 -tileSize/2
				rotOffsetX = -this.mapRows/2*tileSize -this.mapCols/2*tileSize + tileSize
                for (let col = this.mapCols - 1; col >= 0; col--) {
                    for (let row = 0; row < this.mapRows; row++) {
						let rowOffset = row * tileSize;
                        this.grid[col][row].drawIso(col * tileSize + rowOffset + x + rotOffsetX, -col * tileSize / 2 + rowOffset / 2 + y + rotOffsetY, tileSize);
                    }
                }
            }

        }

        this.setTile2d = function setTile2d(mouseX, mouseY) {
            let rotOffsetX = (this.mapCols / 2) * tileSize;
            let rotOffsetY = (this.mapRows / 2) * tileSize;
            let col = Math.floor((mouseX - x + rotOffsetX) / tileSize);
            let row = Math.floor((mouseY - y + rotOffsetY) / tileSize);
            if (angle == 90) {
                col = Math.floor((mouseY - y + rotOffsetY) / tileSize);
                row = -Math.floor((mouseX - x - rotOffsetX) / tileSize);
            } else if (angle == 180) {
                col = -Math.floor((mouseX - x - rotOffsetX) / tileSize);
                row = -Math.floor((mouseY - y - rotOffsetY) / tileSize);
            } else if (angle == 270) {
                col = -Math.floor((mouseY - y - rotOffsetY) / tileSize);
                row = Math.floor((mouseX - x + rotOffsetX) / tileSize);
            }
            if (col >= 0 && col < this.mapCols && row >= 0 && row < mapRows) {
                this.grid[col][row].fillTile()
            }
        }

        this.setTileIso = function setTileIso(mouseX, mouseY) {
			let rotOffsetY = -this.mapRows/2*tileSize/2 -this.mapCols/2*tileSize/2
			let rotOffsetX = this.mapRows/2*tileSize -this.mapCols/2*tileSize
            let row = Math.floor((mouseY - y - rotOffsetY) / tileSize - (mouseX - x - rotOffsetX) / (tileSize * 2)) + 1;
            let col = Math.floor((mouseX - x - rotOffsetX) / tileSize / 2 + (mouseY - y - rotOffsetY) / tileSize) + 1;
            if (angle == 90) {
				rotOffsetY = this.mapRows/2*tileSize/2 -this.mapCols/2*tileSize/2 -tileSize/2
				rotOffsetX = this.mapRows/2*tileSize +this.mapCols/2*tileSize -tileSize
                row = Math.floor((-mouseY + y + rotOffsetY) / tileSize - (mouseX - x - rotOffsetX) / (tileSize * 2)) + 0;
                col = Math.floor((-mouseX + x + rotOffsetX) / tileSize / 2 + (mouseY - y - rotOffsetY) / tileSize) + 1;
            }
            if (angle == 180) {
				rotOffsetY = this.mapRows/2*tileSize/2 + this.mapCols/2*tileSize/2 -tileSize
				rotOffsetX = -this.mapRows/2*tileSize + this.mapCols/2*tileSize
                row = Math.floor((-mouseY + y + rotOffsetY) / tileSize + (mouseX - x - rotOffsetX) / (tileSize * 2)) + 0;
                col = Math.floor((-mouseX + x + rotOffsetX) / tileSize / 2 - (mouseY - y - rotOffsetY) / tileSize) + 0;
            }
            if (angle == 270) {
				rotOffsetY = -this.mapRows/2*tileSize/2 +this.mapCols/2*tileSize/2 -tileSize/2
				rotOffsetX = -this.mapRows/2*tileSize -this.mapCols/2*tileSize + tileSize
                row = Math.floor((mouseY - y - rotOffsetY) / tileSize + (mouseX - x - rotOffsetX) / (tileSize * 2)) + 1;
                col = Math.floor((mouseX - x - rotOffsetX) / tileSize / 2 - (mouseY - y - rotOffsetY) / tileSize) + 0;
            }
            if (col >= 0 && col < this.mapCols && row >= 0 && row < mapRows) {
                this.grid[col][row].fillTile()
            }
        }

    }
};

class imageMap extends map {
    constructor(mapCols, mapRows) {
        super(mapCols, mapRows);
        this.grid = new Array(mapCols);
        for (let col = 0; col < mapCols; col++) {
            this.grid[col] = new Array(mapRows);
        }
        for (let col = 0; col < this.mapCols; col++) {
            for (let row = 0; row < this.mapRows; row++) {
                this.grid[col][row] = new imageTile();
            }

        }
    }
}