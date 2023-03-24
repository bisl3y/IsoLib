const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext("2d");
copierImg.onload = () => {
    ctx2.drawImage(copierImg, 0, 0, copierImg.width/4, copierImg.height, 0, 0, copierImg.width/8, copierImg.height/2);
}
