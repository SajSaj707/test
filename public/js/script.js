const form = document.getElementById("recipeForm");
const addButton = form.querySelector('button[type="submit"]');
form.addEventListener("input", function () {
    addButton.disabled = !(form.checkValidity() && ingArray.length >= 3);
});

const ingBtn = document.getElementById("addIngBtn");
const ingsInput = document.getElementById("Ingredients");
const ingsCont = document.getElementById("ings");
var ingArray=[];
ingsInput.addEventListener("input", function () {
  ingBtn.disabled = ingsInput.value.trim() === "";
});
ingBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const ingValue = ingsInput.value.trim();
    if (ingValue !== "") {
        const span = document.createElement("span");
        span.className = "btn btn-primary me-2";
        span.textContent = ingValue;
        ingsCont.appendChild(span); 
        ingsInput.value = "";
        ingArray.push(ingValue);
        addButton.disabled = !(form.checkValidity() && ingArray.length >= 3);
    }
});

const toastTrigger = document.getElementById("addRecBtn");
const toastLive = document.getElementById("liveToast");
recipeForm.addEventListener("submit", function (e) {
  e.preventDefault(); 
  const toast = new bootstrap.Toast(toastLive);
  toast.show();
  setTimeout(() => {
    recipeForm.submit();
  }, 1000);
});
