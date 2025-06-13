const toggle = document.getElementById("darkModeToggle");
var topUL=document.querySelector(".top h2");
toggle.addEventListener("click", () => toggleTheme());
const toggleTheme = () => {
  const currentTheme = document.documentElement.getAttribute("data-bs-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  if(toggle.classList.contains("fa-moon"))
  toggle.classList.replace("fa-moon","fa-sun");
  else
  toggle.classList.replace("fa-sun","fa-moon");
  document.documentElement.setAttribute("data-bs-theme", newTheme);
};
