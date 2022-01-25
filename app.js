var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);

var canvas = document.getElementById("fungibleCanvas");
var ctx = canvas.getContext("2d");

coverImg = new Image();
demoImg = new Image();
demoImg.onload = function() {
    coverImg.onload = function() {
        createImageBitmap(demoImg, {resizeWidth: 480, resizeHeight: 480, resizeQuality: 'high'}).then(imageBitmap => drawFungiblePFP(imageBitmap));
    };
};
demoImg.src = 'demo.png';
coverImg.src = 'cover.png';

drawFungiblePFP = function(img) {
    ctx.drawImage(img, 0, 0);
    ctx.drawImage(coverImg, 0, 0);
}

function handleImage(e) {
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            createImageBitmap(img, {resizeWidth: 480, resizeHeight: 480, resizeQuality: 'high'}).then(imageBitmap => drawFungiblePFP(imageBitmap));
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);     
}

saveCanvas = function() {
    canvas.toBlob((blob) => {
        saveBlob(blob, `fungiblePFP.png`);
    });
}
 
const saveBlob = (function() {
  const a = document.createElement('a');
  document.body.appendChild(a);
  a.style.display = 'none';
  return function saveData(blob, fileName) {
     const url = window.URL.createObjectURL(blob);
     a.href = url;
     a.download = fileName;
     a.click();
  };
}());