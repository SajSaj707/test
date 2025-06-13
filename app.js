const express = require("express");
const mongoose = require("mongoose");
const { user: User } = require("./models/user");
const { Recipe: Recipe } = require("./models/recipe");
const app = express();

mongoose
  .connect(
    "mongodb+srv://mamaDB:iRxJef5YHejORXdA@cluster0.0gglfa5.mongodb.net/MamaSpaghetiDB",
    {}
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection failed:", err));

app.use(express.static("public"));
app.set("view engine", "ejs");

function getRandomRecipes(arr, x) {
  const newArr = [];
  for (var i = 0; i < x; i++) {
    let n;
    do {
      n = arr[Math.floor(Math.random() * arr.length)];
    } while (newArr.includes(n));
    newArr.push(n);
  }
  return newArr;
}

app.get("/", (req, res) => {
  const randomRecipes = getRandomRecipes(recipes, 2);
  res.render("home", { recipes: randomRecipes, user: fakeUser });
});

app.get("/profile", async (req, res) => {
  try {
    const user = await User.findById("684c60b7d6c663bb59a77213")
      .populate("favs")
      .populate("adds")
      .populate("lastViewed");

    if (!user) {
      return res.status(404).send("User not found");
    }

    const randomRecipes = getRandomRecipes(recipes, 1);
    res.render("profile", { recipes: randomRecipes, user });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});


app.get("/recipes", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 6;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedRecipes = recipes.slice(startIndex, endIndex);
  const totalPages = Math.ceil(recipes.length / limit);

  res.render("recipes", {
    recipes: paginatedRecipes,
    currentPage: page,
    totalPages: totalPages,
    user: fakeUser2,
  });
});

app.get("/recipeViewed/:title", (req, res) => {
  const recipetitle = req.params.title;
  const recipe = recipes.find((r) => r.title == recipetitle);
  if (!recipe) {
    return res.status(404).send("Recipe not found");
  }
  fakeUser.lastViewed = recipe;
  res.render("recipeViewed", { recipe: recipe, user: fakeUser });
});

app.get("/signLogin", (req, res) => {
  res.render("signLogin", { user: null });
});

app.get("/forgotPass", (req, res) => {
  res.render("forgotPass", { user: null, sent: false, verified: false });
});

app.get("/adminDashboard", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 12;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedUsers = users.slice(startIndex, endIndex);
  const totalPages = Math.ceil(users.length / limit);

  res.render("adminDashboard", {
    users: paginatedUsers,
    currentPage: page,
    totalPages: totalPages,
    user: fakeUser2,
  });
});

app.listen(3000, () =>
  console.log("Server running on http://localhost:3000")
);
