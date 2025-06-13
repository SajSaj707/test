var userImgUp = document.getElementById("userImgUp");
var userImg = document.getElementById("userImg");
var modalClose = document.getElementById("modal-close");
var originalSrc = userImg.src;


userImgUp.addEventListener("change", function () {
  if (userImgUp.files && userImgUp.files[0]) {
    var file = userImgUp.files[0];
    var url = URL.createObjectURL(file);
    userImg.src = url;
  }
});

modalClose.addEventListener('click', function () {
  userImg.src = originalSrc;
  userImgUp.value = "";
});

