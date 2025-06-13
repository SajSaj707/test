var searchinp = document.getElementById("searcher");
var ingsearchinp = document.getElementById("ingSearcher");
var displayer = document.querySelector(".recipes .row");

const recipes = [
  {
    title: "Cheesecake",
    img: "/images/Cheesecake.jpeg",
    url: "/recipes/cheesecake",
    ingrediants: [
      "Salt",
      "Pepper"
    ],
    description:"asdsdasasdasdasda"
  },
  {
    title: "Banana Tart",
    img: "/images/Banana Tart.jpeg",
    url: "/recipes/banana-tart",
        ingrediants: [
      "Salt",
      "Pepper"
    ],
    description:"asdsdasasdasdasda"
  },
  {
    title: "Banana Tart2",
    img: "/images/Banana Tart.jpeg",
    url: "/recipes/banana-tart",
        ingrediants: [
      "Sugar",
      "Banana"
    ],
    description:"asdsdasasdasdasda"
  }
];

function applyFilters() {
  const val = searchinp.value.toLowerCase();
  const intval = ingsearchinp.value.toLowerCase();

  const filtered = recipes.filter((r) =>
    r.title.toLowerCase().includes(val) &&
    r.ingrediants.find(ingrediant=>ingrediant.toLowerCase().includes(intval))
  );

  updateDisplay(filtered);
}

searchinp.addEventListener("input", applyFilters);
ingsearchinp.addEventListener("input", applyFilters);

function updateDisplay(filteredRecipes) {
  displayer.innerHTML = "";

  filteredRecipes.forEach((recipe) => {
    displayer.innerHTML += `
      <div class="col-xl-4 col-md-6 recipe-card">
        <div class="inner">
          <div class="card shadow">
            <div class="img-box overflow-hidden">
              <img src="${recipe.img}" alt="${recipe.title}">
            </div>
            <div class="card-body">
              <a href="recipeViewed/${recipe.title}" class="text-black text-decoration-none d-flex justify-content-between">
                <h5 class="card-title">${recipe.title}</h5>
                <span>View Recipe <i class="fa-solid fa-arrow-right"></i></span>
              </a>
            </div>
          </div>
        </div>
      </div>`;
  });
}

const ingBtn = document.getElementById("addIngBtn");
const ingsInput = document.getElementById("Ingredients");
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
    }
});