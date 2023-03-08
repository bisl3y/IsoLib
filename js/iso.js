class tileBlock extends Image {
    constructor(type, angleNum, dimensions) {
        super();
        this.blockType = type;
        this.angles = angleNum;
		this.dimensions = dimensions;
		this.propIndex = 0;
    }
}

const defaultIso = new tileBlock('ground', 1, [1,1]);
defaultIso.src = "img/pavingBlock_iso_0.png";

class tile {
    constructor() {
        this.shade = 'white'
            this.vOffset = 1;
        this.fillTile = function fillTile() {
            this.shade = color;
			this.highlight = false;

        }
		this.tilePath = function tilePath(x, y, tileSize) {
		ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + tileSize, y - tileSize / 2);
            ctx.lineTo(x, y - tileSize);
            ctx.lineTo(x - tileSize, y - tileSize / 2);
            ctx.closePath();
        }
		
		
        this.drawIso = function drawIso(x, y, tileSize) {
            this.tilePath(x, y, tileSize);
            ctx.fillStyle = this.shade;
            ctx.fill();
			if (this.highlight == true) {
			this.drawOverlay(x, y + (this.vOffset - 1) * tileSize, tileSize);
			}
            ctx.stroke();
        }
        this.draw2d = function draw2d(x, y, tileSize) {
            ctx.beginPath();
            ctx.rect(x, y, tileSize, tileSize);
            ctx.fillStyle = this.shade;
            ctx.fillRect(x, y, tileSize, tileSize);
            ctx.stroke();
        }
		    this.drawOutline = function drawOutline(x, y, tileSize) {
            this.tilePath(x, y, tileSize);
            ctx.stroke();
        }
		    this.drawOverlay = function drawOverlay(x, y, tileSize) {
            this.tilePath(x, y, tileSize);
			ctx.fillStyle = 'rgba(0,255,255,0.5)';
            ctx.fill();
        }
    }
};

class imageTile extends tile {
    constructor() {
        super();
        this.ground = defaultIso;
        this.prop = null;
        this.fillTile = function fillTile() {
            if (block.blockType == 'prop') {
                this.prop = block;
            } else {
                this.ground = block;
            }
        }
        this.drawIso = function drawIso(x, y, tileSize) {
            let widthOffsetGround = this.ground.width / this.ground.angles;
			//do the following in reverse
			for(let i = 1; i>=this.vOffset; i-=0.5){
			ctx.drawImage(this.ground, 0, 0, widthOffsetGround, this.ground.height, x - tileSize, y - tileSize * this.ground.height / 64 + tileSize * i, widthOffsetGround * tileSize / 64, this.ground.height * tileSize / 64);	
			}            
            if (outline == true) {
			this.drawOutline(x, y + (this.vOffset - 1) * tileSize, tileSize);		
            }
			if (this.highlight == true) {
			this.drawOverlay(x, y + (this.vOffset - 1) * tileSize, tileSize);
			}
            if (this.prop instanceof tileBlock) {
                let widthOffsetProp = this.prop.width / this.prop.angles
                    let angleOffset = angle / 360;
					let indexOffset = 1/this.prop.dimensions[1];
                if (this.prop.angles == 4) {
					if(this.prop.dimensions[1]>1){ //this feels like a hack
					let segmentOffset = this.prop.width/this.prop.angles/(this.prop.dimensions[1]+1)
					let sourceX = this.prop.width * angleOffset +segmentOffset*this.propIndex;
					let sourceY = -(this.propIndex*segmentOffset)/2;	
					let sourceWidth = this.prop.width/this.prop.angles/((this.prop.dimensions[1]+1)/2);
					let sourceHeight = this.prop.height
					let destinationX = x - tileSize
					let destinationY = y - tileSize * this.prop.height / 64
					let destinationWidth = tileSize*2
					let destinationHeight = this.prop.height * tileSize / 64
					if(angle==180){
					sourceX = (this.prop.width * angleOffset) + (this.prop.width/this.prop.angles) -segmentOffset*this.propIndex -segmentOffset*2;
					sourceY = -segmentOffset/2+(this.propIndex*segmentOffset/2);										
					}
                    else if(angle==90){
					sourceX = this.prop.width * angleOffset +segmentOffset*this.propIndex;
					sourceY = (this.propIndex*segmentOffset)/2 - (segmentOffset)/2;
					}
					else if(angle==270){
					sourceX = (this.prop.width * angleOffset) + (this.prop.width/this.prop.angles) -segmentOffset*this.propIndex -segmentOffset*2;
					sourceY = -this.propIndex*segmentOffset/2;
					}
					ctx.drawImage(this.prop, sourceX, sourceY, sourceWidth, sourceHeight, destinationX, destinationY +(this.vOffset-1)*tileSize, destinationWidth, destinationHeight);
					}
					else{
					ctx.drawImage(this.prop, this.prop.width * angleOffset, 0, widthOffsetProp, this.prop.height, x - tileSize, y - tileSize * this.prop.height / 64 +(this.vOffset-1)*tileSize, widthOffsetProp * tileSize / 64, this.prop.height * tileSize / 64);
					}
                } 
				else {
                    ctx.drawImage(this.prop, 0, 0, widthOffsetProp, this.prop.height, x - tileSize, y - tileSize * this.prop.height / 64 +(this.vOffset-1)*tileSize, widthOffsetProp * tileSize / 64, this.prop.height * tileSize / 64);
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
                    rotOffsetY = -this.mapRows / 2 * tileSize / 2 - this.mapCols / 2 * tileSize / 2 
                        rotOffsetX = this.mapRows / 2 * tileSize - this.mapCols / 2 * tileSize
                        for (let col = 0; col < this.mapCols; col++) {
                            for (let row = 0; row < this.mapRows; row++) {								
                                let rowOffset = row * tileSize;
                                this.grid[col][row].drawIso(col * tileSize - rowOffset + x + rotOffsetX, col * tileSize / 2 + rowOffset / 2 + y + rotOffsetY, tileSize);
                            }
                        }
                } else if (angle == 90) {
                    rotOffsetY = this.mapRows / 2 * tileSize / 2 - this.mapCols / 2 * tileSize / 2 - tileSize / 2
                        rotOffsetX = this.mapRows / 2 * tileSize + this.mapCols / 2 * tileSize - tileSize
                        for (let col = 0; col < this.mapCols; col++) {
                            for (let row = this.mapRows - 1; row >= 0; row--) {
                                let rowOffset = row * tileSize;
                                this.grid[col][row].drawIso(-col * tileSize - rowOffset + x + rotOffsetX, col * tileSize / 2 - rowOffset / 2 + y + rotOffsetY, tileSize);
                            }
                        }
                } else if (angle == 180) {
                    rotOffsetY = this.mapRows / 2 * tileSize / 2 + this.mapCols / 2 * tileSize / 2 - tileSize
                        rotOffsetX = -this.mapRows / 2 * tileSize + this.mapCols / 2 * tileSize
                        for (let col = this.mapCols - 1; col >= 0; col--) {
                            for (let row = this.mapRows - 1; row >= 0; row--) {
                                let rowOffset = row * tileSize;
                                this.grid[col][row].drawIso(-col * tileSize + rowOffset + x + rotOffsetX, -col * tileSize / 2 - rowOffset / 2 + y + rotOffsetY, tileSize);
                            }
                        }
                } else if (angle == 270) {
                    rotOffsetY = -this.mapRows / 2 * tileSize / 2 + this.mapCols / 2 * tileSize / 2 - tileSize / 2
                        rotOffsetX = -this.mapRows / 2 * tileSize - this.mapCols / 2 * tileSize + tileSize
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
            if (col >= 0 && col < this.mapCols && row >= 0 && row < this.mapRows) {
                this.grid[col][row].fillTile()
            }
        }

        this.findTileID = function findTileID(mouseX, mouseY) {			
            let rotOffsetY = -this.mapRows / 2 * tileSize / 2 - this.mapCols / 2 * tileSize / 2
                let rotOffsetX = this.mapRows / 2 * tileSize - this.mapCols / 2 * tileSize
                let row = (mouseY - y - rotOffsetY) / tileSize - (mouseX - x - rotOffsetX) / (tileSize * 2)+ 1 ;
            let col = (mouseX - x - rotOffsetX) / tileSize / 2 + (mouseY - y - rotOffsetY) / tileSize + 1 ;
            if (angle == 90) {
                rotOffsetY = this.mapRows / 2 * tileSize / 2 - this.mapCols / 2 * tileSize / 2 - tileSize / 2
                    rotOffsetX = this.mapRows / 2 * tileSize + this.mapCols / 2 * tileSize - tileSize
                    row = (-mouseY + y + rotOffsetY) / tileSize - (mouseX - x - rotOffsetX) / (tileSize * 2);
                col = (-mouseX + x + rotOffsetX) / tileSize / 2 + (mouseY - y - rotOffsetY) / tileSize + 1 ;
            }
            if (angle == 180) {
                rotOffsetY = this.mapRows / 2 * tileSize / 2 + this.mapCols / 2 * tileSize / 2 - tileSize
                    rotOffsetX = -this.mapRows / 2 * tileSize + this.mapCols / 2 * tileSize
                    row = (-mouseY + y + rotOffsetY) / tileSize + (mouseX - x - rotOffsetX) / (tileSize * 2);
                col = (-mouseX + x + rotOffsetX) / tileSize / 2 - (mouseY - y - rotOffsetY) / tileSize;
            }
            if (angle == 270) {
                rotOffsetY = -this.mapRows / 2 * tileSize / 2 + this.mapCols / 2 * tileSize / 2 - tileSize / 2
                    rotOffsetX = -this.mapRows / 2 * tileSize - this.mapCols / 2 * tileSize + tileSize
                    row = (mouseY - y - rotOffsetY) / tileSize + (mouseX - x - rotOffsetX) / (tileSize * 2) + 1;
                col = (mouseX - x - rotOffsetX) / tileSize / 2 - (mouseY - y - rotOffsetY) / tileSize;
            }			
			let colOffset = 0;
			let rowOffset = 0;
			if(angle == 0){
			for(let i = 0.5; i<5; i += 0.5){
				if(this.isTile(Math.floor(col +i),Math.floor(row+i))){
				if(this.grid[Math.floor(col+i)][Math.floor(row+i)].vOffset == 1-i){
				colOffset = i;
				rowOffset = i;
				}
			}
			}	
			}
			if(angle == 90){
			for(let i = 0.5; i<5; i += 0.5){
				if(this.isTile(Math.floor(col +i),Math.floor(row-i))){
				if(this.grid[Math.floor(col+i)][Math.floor(row-i)].vOffset == 1-i){
				colOffset = +i;
				rowOffset = -i;
				}
			}
			}	
			}	
			if(angle == 180){
			for(let i = 0.5; i<5; i += 0.5){
				if(this.isTile(Math.floor(col -i),Math.floor(row-i))){
				if(this.grid[Math.floor(col-i)][Math.floor(row-i)].vOffset == 1-i){
				colOffset = -i;
				rowOffset = -i;
				}
			}
			}	
			}
			if(angle == 270){
			for(let i = 0.5; i<5; i += 0.5){
				if(this.isTile(Math.floor(col -i),Math.floor(row+i))){
				if(this.grid[Math.floor(col-i)][Math.floor(row+i)].vOffset == 1-i){
				colOffset = -i;
				rowOffset = +i;
				}
			}
			}	
			}			
			col = Math.floor(col+colOffset);
			row = Math.floor(row+rowOffset);
            return [col, row];
        }
		
		this.clearHighlights = function clearHighlights(){
		for (let col = 0; col < this.mapCols; col++) {
             for (let row = 0; row < this.mapRows; row++) {                             
                  this.grid[col][row].highlight = false;
                            }			
		}
		}
		
		this.setTileByID = function setTileByID(col, row) {
            if(this.isTile(col,row)) {
				for(let i = 0; i<block.dimensions[1]; i++){
                this.grid[col][row-i].fillTile()
				if (block.blockType == 'prop') {
				this.grid[col][row-i].propIndex = i;
				}
				}
            }
        }
		
        this.setTileIso = function setTileIso(mouseX, mouseY) {
            let xy = this.findTileID(mouseX, mouseY);
            let col = xy[0];
            let row = xy[1];
            if(this.isTile(col,row)) {
                this.grid[col][row].fillTile()
            }
        }

		this.isTile = function isTile(col,row){
			if (col >= 0 && col < this.mapCols && row >= 0 && row < mapRows){
				return true;
			}
			else{
				return false;
			}
		}

        this.moveGroundUp = function moveGroundUp(mouseX, mouseY, altKey) {
            let xy = this.findTileID(mouseX, mouseY);
            let col = xy[0];
            let row = xy[1];
            if (col >= 0 && col < this.mapCols && row >= 0 && row < mapRows) {
                if (altKey) {
					if(this.grid[col][row].vOffset + 0.5 <= 1){					
                    this.grid[col][row].vOffset += 0.5;
					}
                } else {
					if(this.grid[col][row].vOffset - 0.5 >= heightLimit){
                    this.grid[col][row].vOffset -= 0.5;
					}
                }
            }
        }
		
		
		this.moveGroundUpbyID = function moveGroundUp(col, row, altKey) {
            if (col >= 0 && col < this.mapCols && row >= 0 && row < mapRows) {
                if (altKey) {
					if(this.grid[col][row].vOffset + 0.5 <= 1){					
                    this.grid[col][row].vOffset += 0.5;
					}
                } else {
					if(this.grid[col][row].vOffset - 0.5 >= heightLimit){
                    this.grid[col][row].vOffset -= 0.5;
					}
                }
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