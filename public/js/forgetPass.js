var sendBtn=document.getElementById("sendBtn");
function sendCode(){
    sent=true;
}
sendBtn.addEventListener("click",e=>sendCode())

var regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;

var pass=document.getElementById("pass");
var passwordAlert=document.getElementById("passwordAlert");
var rePass=document.getElementById("rePass");
var rePasswordAlert=document.getElementById("rePasswordAlert");
var showPass = document.querySelectorAll(".showPass");

function passChecker() {
  passwordAlert.style.color = "red";
  var check = regex.test(pass.value);
  if (!pass.value) {
    passwordAlert.innerHTML = "This field is required";
    pass.classList.add("is-invalid");
    pass.classList.remove("is-valid");
  }
  else if (!check) {
    passwordAlert.innerHTML = "Invalid Password";
    pass.classList.add("is-invalid");
    pass.classList.remove("is-valid");
  } else {
    passwordAlert.innerHTML = "";
    pass.classList.add("is-valid");
    pass.classList.remove("is-invalid");
  }
}
function rePassCheck(){
  if(!rePass.value){
    rePasswordAlert.style.color = "red";
    rePasswordAlert.innerHTML = "This field is required";
      rePass.classList.add("is-invalid");
      rePass.classList.remove("is-valid");
  }
}
function passMatch() {
  rePasswordAlert.style.color = "red";
  var check = regex.test(pass.value);
  if (rePass.value) {
    if (!check || !pass.value) {
      rePasswordAlert.innerHTML = "Validate Password";
      rePass.classList.add("is-invalid");
      rePass.classList.remove("is-valid");
    } else if (rePass.value != pass.value) {
      rePasswordAlert.innerHTML = "Passwords don't match";
      rePass.classList.add("is-invalid");
      rePass.classList.remove("is-valid");
    } else {
      rePasswordAlert.innerHTML = "";
      rePass.classList.add("is-valid");
      rePass.classList.remove("is-invalid");
    }
  }
}
function showUnPass(e) {
  const targetId = e.getAttribute("data-target");
  const inputField = document.getElementById(targetId);
  const type = inputField.getAttribute("type");
  inputField.setAttribute("type", type === "password" ? "text" : "password");
  e.classList.contains("fa-eye") ? e.classList.replace("fa-eye", "fa-eye-slash") : e.classList.replace("fa-eye-slash", "fa-eye");
}


pass.addEventListener("blur", (e) => passChecker());
pass.addEventListener("input", (e) => {
  passChecker();
  passMatch();
});

rePass.addEventListener("blur", (e) => {
  rePassCheck();
  passMatch();
});
rePass.addEventListener("input", () => {
  rePassCheck();
  passMatch();
});
showPass.forEach(show => {
   show.addEventListener("click", () => showUnPass(show));
 });