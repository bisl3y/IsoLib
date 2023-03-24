const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext("2d");

const grassImg = new tileBlock('grassImg','ground', 1, [1,1]);
grassImg.src = "img/grassBlock_iso_0.png";
const crateImg = new tileBlock('crateImg','prop', 1, [1,1]);
crateImg.src = "img/crate_iso_0.gif";
const sofaImg = new tileBlock('sofaImg','prop', 4, [1,2]);
sofaImg.src = "img/sofa_iso_x4.png";
const deskImg = new tileBlock('deskImg','prop', 4, [1,2]);
deskImg.src = "img/desk_iso_x4.png";
const plant1Img = new tileBlock('plant1Img','prop', 4, [1,1]);
plant1Img.src = "img/plant1_iso_x4.png";
const plant2Img = new tileBlock('plant2Img','prop', 4, [1,1]);
plant2Img.src = "img/Plant_style1_iso_x4.png";
const copierImg = new tileBlock('copierImg','prop', 4, [1,1]);
copierImg.src = "img/copier_iso_x4.png";
const armchairImg = new tileBlock('armchairImg','prop', 4, [1,1]);
armchairImg.src = "img/armchair_iso_x4.png";
const chair1Img = new tileBlock('chair1Img','prop', 4, [1,1]);
chair1Img.src = "img/chair_style1_iso_x4.png";
const chair2Img = new tileBlock('chair2Img','prop', 4, [1,1]);
chair2Img.src = "img/chair_style2_iso_x4.png";
const chair3Img = new tileBlock('chair3Img','prop', 4, [1,1]);
chair3Img.src = "img/chair_style3_iso_x4.png";
const chair4Img = new tileBlock('chair4Img','prop', 4, [1,1]);
chair4Img.src = "img/chair_style4_iso_x4.png";
const chair5Img = new tileBlock('chair5Img','prop', 4, [1,1]);
chair5Img.src = "img/chair_style5_iso_x4.png";
const watercoolerImg = new tileBlock('watercoolerImg','prop', 4, [1,1]);
watercoolerImg.src = "img/watercooler_iso_x4.png";
const slipsignImg = new tileBlock('slipsignImg','prop', 4, [1,1]);
slipsignImg.src = "img/Slipsign_iso_x4.png";
const lamp1Img = new tileBlock('lamp1Img','prop', 4, [1,1]);
lamp1Img.src = "img/Lamp_style1_iso_x4.png";
const lamp2Img = new tileBlock('lamp2Img','prop', 4, [1,1]);
lamp2Img.src = "img/Lamp_style2_iso_x4.png";
const wallImg = new tileBlock('wallImg','wall', 4, [1,1]);
wallImg.src = "img/wall_iso_x4.png";
const defaultIso = new tileBlock('defaultIso','ground', 1, [1,1]);
defaultIso.src = "img/pavingBlock_iso_0.png";


function drawIcon(image,x,y){
	image.onload = () => {
    ctx2.drawImage(image, 0, 0, image.width/4, image.height, image.width/8*x, image.height/2*y, image.width/8, image.height/2);
	}
}

drawIcon(copierImg,0,0);
drawIcon(armchairImg,1,0);
drawIcon(plant1Img,2,0);
drawIcon(chair1Img,0,1);
drawIcon(chair2Img,1,1);
drawIcon(chair3Img,2,1);
drawIcon(chair4Img,0,2);
drawIcon(chair5Img,1,2);
drawIcon(plant2Img,2,2);
drawIcon(watercoolerImg,0,3);
drawIcon(slipsignImg,1,3);
drawIcon(lamp1Img,2,3);
drawIcon(lamp2Img,0,4);