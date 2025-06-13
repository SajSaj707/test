var users = [
  {
    name: "3azima",
    img: "/images/azima.jpeg",
    email: "asd1@gmail.com",
    password: "12345",
    phone: "0123456789",
  },
  {
    name: "raafat",
    img: "/images/azima.jpeg",
    email: "asd2@gmail.com",
    password: "12345",
    phone: "0123456789",
  }
]




var userNameAlert = document.getElementById("userNameAlert");
var emailAlert = document.getElementById("emailAlert");
var passwordAlert = document.getElementById("passwordAlert");
var rePasswordAlert = document.getElementById("rePasswordAlert");

var signUser = document.getElementById("signUser");
var signEmail = document.getElementById("signEmail");
var signPass = document.getElementById("signPass");
var signRePass = document.getElementById("signRePass");

var loginUserNameAlert = document.getElementById("loginUserNameAlert");
var loginPasswordAlert = document.getElementById("loginPasswordAlert");

var loginUser = document.getElementById("loginUser");
var loginPass = document.getElementById("loginPass");




var showPass = document.querySelectorAll(".showPass");

var regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;

function passChecker() {
  passwordAlert.style.color = "red";
  var check = regex.test(signPass.value);
  if (!signPass.value) {
    passwordAlert.innerHTML = "This field is required";
    signPass.classList.add("is-invalid");
    signPass.classList.remove("is-valid");
  }
  else if (!check) {
    passwordAlert.innerHTML = "Invalid Password";
    signPass.classList.add("is-invalid");
    signPass.classList.remove("is-valid");
  } else {
    passwordAlert.innerHTML = "";
    signPass.classList.add("is-valid");
    signPass.classList.remove("is-invalid");
  }
}
function signRePassCheck(){
  if(!signRePass.value){
    rePasswordAlert.style.color = "red";
    rePasswordAlert.innerHTML = "This field is required";
      signRePass.classList.add("is-invalid");
      signRePass.classList.remove("is-valid");
  }
}
function passMatch() {
  rePasswordAlert.style.color = "red";
  var check = regex.test(signPass.value);
  if (signRePass.value) {
    if (!check || !signPass.value) {
      rePasswordAlert.innerHTML = "Validate Password";
      signRePass.classList.add("is-invalid");
      signRePass.classList.remove("is-valid");
    } else if (signRePass.value != signPass.value) {
      rePasswordAlert.innerHTML = "Passwords don't match";
      signRePass.classList.add("is-invalid");
      signRePass.classList.remove("is-valid");
    } else {
      rePasswordAlert.innerHTML = "";
      signRePass.classList.add("is-valid");
      signRePass.classList.remove("is-invalid");
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
function userAvailable() {
      userNameAlert.style.color = "red";
  if (!signUser.value) {
    userNameAlert.innerHTML = "This field is required";
    signUser.classList.add("is-invalid");
    signUser.classList.remove("is-valid");
    return;
  }
  const exists = users.some(
    user => user.name.toLowerCase() === signUser.value.toLowerCase()
  );

  if (exists) {
    userNameAlert.innerHTML = "Username is taken";
    signUser.classList.add("is-invalid");
    signUser.classList.remove("is-valid");
  } else {
    userNameAlert.innerHTML = "";
    signUser.classList.add("is-valid");
    signUser.classList.remove("is-invalid");
  }
}

function emailAvailable(){
  emailAlert.style.color = "red";
  if (!signEmail.value) {
    emailAlert.innerHTML = "This field is required";
    signEmail.classList.add("is-invalid");
    signEmail.classList.remove("is-valid");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(signEmail.value)) {
    emailAlert.innerHTML = "Invalid email format";
    signEmail.classList.add("is-invalid");
    signEmail.classList.remove("is-valid");
    return;
  }

  const exists = users.some(user => user.email === signEmail.value);

  if (exists) {
    emailAlert.innerHTML = "Email already exists";
    signEmail.classList.add("is-invalid");
    signEmail.classList.remove("is-valid");
  } else {
    emailAlert.innerHTML = "";
    signEmail.classList.add("is-valid");
    signEmail.classList.remove("is-invalid");
  }
  
}
function userExist() {
  loginUserNameAlert.style.color = "red";
  let userFound = false;
  if (!loginUser.value) {
    loginUserNameAlert.innerHTML = "This field is required";
    loginUser.classList.add("is-invalid");
    loginUser.classList.remove("is-valid");
    return;
  }
  users.forEach(user => {
    if (user.name.toLowerCase() === loginUser.value.toLowerCase()) {
      loginUserNameAlert.innerHTML = "";
      loginUser.classList.add("is-valid");
      loginUser.classList.remove("is-invalid");
      userFound = true;
    }
  });
  if (!userFound) {
    loginUserNameAlert.innerHTML = "Username doesn't exist";
    loginUser.classList.remove("is-valid");
    loginUser.classList.add("is-invalid");
  }
}

function rightPass() {
  loginPasswordAlert.style.color = "red";
  if (!loginPass.value) {
    loginPasswordAlert.innerHTML = "This field is required";
    loginPass.classList.add("is-invalid");
    loginPass.classList.remove("is-valid");
    return;
  }
  if (!loginUser.value) {
    loginPasswordAlert.innerHTML = "Fill Username Field";
    loginPass.classList.remove("is-valid");
    loginPass.classList.add("is-invalid");
    return;
  }

  let user = users.find(u => u.name.toLowerCase() === loginUser.value.toLowerCase());
  if (!user) {
    loginPasswordAlert.innerHTML = "Check Username";
    loginPass.classList.remove("is-valid");
    loginPass.classList.add("is-invalid");
    return;
  }

  if (loginPass.value != user.password) {
    loginPasswordAlert.innerHTML = "Username or Password is incorrect";
    loginPass.classList.remove("is-valid");
    loginPass.classList.add("is-invalid");
  } else {
    loginPasswordAlert.innerHTML = "";
    loginPass.classList.add("is-valid");
    loginPass.classList.remove("is-invalid");
  }
}

signUser.addEventListener("blur", (e) => userAvailable());
signUser.addEventListener("input", (e) => userAvailable());

signEmail.addEventListener("blur", (e) => emailAvailable());
signEmail.addEventListener("input", (e) => emailAvailable());

signPass.addEventListener("blur", (e) => passChecker());
signPass.addEventListener("input", (e) => {
  passChecker();
  passMatch();
});

signRePass.addEventListener("blur", (e) => {
  signRePassCheck();
  passMatch();
});
signRePass.addEventListener("input", () => {
  signRePassCheck();
  passMatch();
});

loginUser.addEventListener("blur", (e) => userExist());
loginUser.addEventListener("input", (e) => userExist());

loginPass.addEventListener("blur", (e) => rightPass());
loginPass.addEventListener("input", (e) => rightPass());


showPass.forEach(show => {
  show.addEventListener("click", () => showUnPass(show));
});

var signForm = document.getElementById("signForm");
var loginForm = document.getElementById("loginForm");
const switchers = document.querySelectorAll(".switch");

switchers.forEach(sw => {
  sw.addEventListener("click", e => {
    signUser.value = "";
    signEmail.value = "";
    signPass.value = "";
    signRePass.value = "";
    loginUser.value = "";
    loginPass.value = "";

    signUser.classList.remove("is-valid");
    signUser.classList.remove("is-invalid");
    signEmail.classList.remove("is-valid");
    signEmail.classList.remove("is-invalid");
    signPass.classList.remove("is-valid");
    signPass.classList.remove("is-invalid");
    signRePass.classList.remove("is-valid");
    signRePass.classList.remove("is-invalid");
    loginPass.classList.remove("is-valid");
    loginPass.classList.remove("is-invalid");
    signUser.classList.remove("is-valid");
    signUser.classList.remove("is-invalid");

    userNameAlert.innerHTML = "";
    emailAlert.innerHTML = "";
    passwordAlert.innerHTML = "";
    rePasswordAlert.innerHTML = "";
    loginUserNameAlert.innerHTML = "";
    loginPasswordAlert.innerHTML = "";

    signPass.setAttribute("type","password");
    signRePass.setAttribute("type","password");
    loginPass.setAttribute("type","password");

    showPass.forEach(show=>{
      if(show.classList.contains("fa-eye-slash"))
        show.classList.replace("fa-eye-slash","fa-eye")
    })
  })
  if (window.innerWidth > 928) {
    sw.addEventListener("click", e => {
      if (loginForm.classList.contains("d-none")) {
        setTimeout(() => signForm.classList.add("d-none"), 500);
        signForm.style.opacity = 0;
        loginForm.classList.remove("d-none");
        loginForm.style.opacity = 1;
      } else {
        signForm.classList.remove("d-none");
        signForm.style.opacity = 1;
        setTimeout(() => loginForm.classList.add("d-none"), 500);
        loginForm.style.opacity = 0;
      }
    });
  } else {
    sw.addEventListener("click", e => {
      if (loginForm.classList.contains("d-none")) {
        setTimeout(() => signForm.classList.add("d-none"), 500);
        signForm.style.opacity = 0;
        setTimeout(() => {
          loginForm.classList.remove("d-none");
          loginForm.style.opacity = 1;
        }, 500)
      } else {
        setTimeout(() => {
          signForm.classList.remove("d-none");
          signForm.style.opacity = 1;
        }, 500)
        setTimeout(() => loginForm.classList.add("d-none"), 500);
        loginForm.style.opacity = 0;
      }
    });
  }
});

var changediv = document.querySelector(".changediv");
var changedivP = document.querySelector(".changediv p");
var changedivH2 = document.querySelector(".changediv h2");
var changedivBtn = document.querySelector(".changediv button");

let isRight = true;
switchers.forEach(sw => {
  sw.addEventListener("click", () => {
    if (isRight) {
      changediv.style.right = "33.333334%";
      changedivP.style.opacity=0;
      changedivH2.style.opacity=0;
      changedivBtn.style.opacity=0;
      setTimeout(() => {
        changedivP.style.opacity=1;
        changedivH2.style.opacity=1;
        changedivBtn.style.opacity=1;
        changedivH2.innerHTML = "Join the Family!";
        changedivP.innerHTML = "New here? Join the MaMa’s Spaghetti family today!";
        changedivBtn.innerHTML = "Sign Up";
      }, 500);
    } else {
      changediv.style.right = "0%";
      changedivP.style.opacity=0;
      changedivH2.style.opacity=0;
      changedivBtn.style.opacity=0;
      setTimeout(() => {
        changedivP.style.opacity=1;
        changedivH2.style.opacity=1;
        changedivBtn.style.opacity=1;
        changedivH2.innerHTML = "Welcome Back!";
        changedivP.innerHTML = "We're glad to see you again. Log in to your MaMa’s Spaghetti account";
        changedivBtn.innerHTML = "Login";
      }, 500);
    }
    isRight = !isRight;
  });
});