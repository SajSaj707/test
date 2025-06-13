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

// Insert test user once connected
mongoose.connection.once("open", async () => {
  try {
    const existing = await User.findOne({ email: "asd@gmail.com" });
    if (!existing) {
      await User.create({
        name: "3azima",
        email: "asd@gmail.com",
        password: "12345",
        img: "/images/azima.jpeg",
        admin: false,
        favs: [],
        adds: [],
        lastViewed: null,
        darkMood: false,
      });
      console.log("Test user inserted");
    } else {
      console.log("Test user already exists");
    }
  } catch (err) {
    console.error("Error inserting test user:", err);
  }
});





app.use(express.static("public"));
app.set("view engine", "ejs");


var recipes = [
  {
    title: "Cheesecake",
    img: "/images/Cheesecake.jpeg",
    url: "/recipes/cheesecake",
    ingrediants: ["Salt", "Pepper"],
    description: "asdsdasasdasdasda",
  },
  {
    title: "Banana Tart",
    img: "/images/Banana Tart.jpeg",
    url: "/recipes/banana-tart",
    ingrediants: ["Salt", "Pepper"],
    description: "asdsdasasdasdasda",
  },
  {
    title: "Banana Tart2",
    img: "/images/Banana Tart.jpeg",
    url: "/recipes/banana-tart",
    ingrediants: ["Sugar", "Banana"],
    description: "asdsdasasdasdasda",
  },
  {
    title: "Banana Tart2",
    img: "/images/Banana Tart.jpeg",
    url: "/recipes/banana-tart",
    ingrediants: ["Sugar", "Banana"],
    description: "asdsdasasdasdasda",
  },
  {
    title: "Banana Tart2",
    img: "/images/Banana Tart.jpeg",
    url: "/recipes/banana-tart",
    ingrediants: ["Sugar", "Banana"],
    description: "asdsdasasdasdasda",
  },
  {
    title: "Banana Tart2",
    img: "/images/Banana Tart.jpeg",
    url: "/recipes/banana-tart",
    ingrediants: ["Sugar", "Banana"],
    description: "asdsdasasdasdasda",
  },
  {
    title: "Banana Tart2",
    img: "/images/Banana Tart.jpeg",
    url: "/recipes/banana-tart",
    ingrediants: ["Sugar", "Banana"],
    description: "asdsdasasdasdasda",
  },
  {
    title: "Banana Tart2",
    img: "/images/Banana Tart.jpeg",
    url: "/recipes/banana-tart",
    ingrediants: ["Sugar", "Banana"],
    description: "asdsdasasdasdasda",
  },
  {
    title: "Banana Tart2",
    img: "/images/Banana Tart.jpeg",
    url: "/recipes/banana-tart",
    ingrediants: ["Sugar", "Banana"],
    description: "asdsdasasdasdasda",
  },
  {
    title: "Banana Tart2",
    img: "/images/Banana Tart.jpeg",
    url: "/recipes/banana-tart",
    ingrediants: ["Sugar", "Banana"],
    description: "asdsdasasdasdasda",
  },
  {
    title: "Banana Tart2",
    img: "/images/Banana Tart.jpeg",
    url: "/recipes/banana-tart",
    ingrediants: ["Sugar", "Banana"],
    description: "asdsdasasdasdasda",
  },
  {
    title: "Banana Tart2",
    img: "/images/Banana Tart.jpeg",
    url: "/recipes/banana-tart",
    ingrediants: ["Sugar", "Banana"],
    description: "asdsdasasdasdasda",
  },
];

const fakeUser = {
  name: "3azima",
  img: "/images/azima.jpeg",
  email: "asd@gmail.com",
  password: "12345",
  phone: "0123456789",
  favs: [
    {
      title: "Cheesecake",
      img: "/images/Cheesecake.jpeg",
      url: "/recipes/cheesecake",
    },
    {
      title: "Banana Tart",
      img: "/images/Banana Tart.jpeg",
      url: "/recipes/banana-tart",
    },
  ],
  admin: false,
  adds: [
    {
      title: "Banana Tart",
      img: "/images/Banana Tart.jpeg",
      url: "/recipes/banana-tart",
    },
  ],
  lastViewed: {},
};

const fakeUser2 = {
  name: "John Doe",
  img: "/images/profile-pic.jpg",
  email: "asd@gmail.com",
  password: "12345",
  phone: "0123456789",
  favs: [],
  adds: [],
  lastViewed: recipes[0],
  admin: true,
};

const users = [
  { img: "4k.jpeg", name: "raafat", password: "1234" },
  { img: "4k.jpeg", name: "jana", password: "1234" },
  { img: "4k.jpeg", name: "janna", password: "1234" },
  { img: "4k.jpeg", name: "rana", password: "1234" },
];

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
  res.render("home", { recipes: randomRecipes, user: null });
});

app.get("/profile", async (req, res) => {
  try {
    // const user = await User.findById("684c598306a865e5e65b9951")
    //   .populate("favs")
    //   .populate("adds")
    //   .populate("lastViewed");

    // if (!user) {
    //   return res.status(404).send("User not found");
    // }

    const randomRecipes = getRandomRecipes(recipes, 1);
    res.render("profile", { recipes: randomRecipes, user:fakeUser2 });
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










//recipes done
app.post('/deleteRecipe/:id', async (req, res) => {
  try {
    const recipeId = req.params.id;
    const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);

    if (!deletedRecipe) {
      return res.status(404).send('Recipe not found');
    }

    await User.findOneAndUpdate(
      { email: fakeUser2.email },
      { 
        $pull: { 
          adds: { 
            title: deletedRecipe.title 
          }
        }
      }
    );

    const index = recipes.findIndex(r => r._id.toString() === recipeId);
    if (index !== -1) {
      recipes.splice(index, 1);
    }

    res.redirect('/recipes');
  } catch (err) {
    console.error('Error deleting recipe:', err);
    res.status(500).send('Error deleting recipe');
  }
});

app.post('/editRecipe/:id', async (req, res) => {
  try {
    const { RecipeName, Ingredients, RecipeDescription } = req.body;
    const recipeId = req.params.id;

    const ingredientsArray = Ingredients.split(',').map(item => item.trim());

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      recipeId,
      {
        title: RecipeName,
        ingrediants: ingredientsArray,
        description: RecipeDescription,
        url: '/recipes/' + RecipeName.toLowerCase().replace(/\s+/g, '-')
      },
      { new: true }
    );

    if (!updatedRecipe) {
      return res.status(404).send('Recipe not found');
    }

    // Update recipe in local array
    const index = recipes.findIndex(r => r._id.toString() === recipeId);
    if (index !== -1) {
      recipes[index] = updatedRecipe;
    }

    res.redirect('/profile');
  } catch (err) {
    console.error('Error updating recipe:', err);
    res.status(500).send('Error updating recipe');
  }
});


//forgetpasss
app.post("/changePassword", (req, res) => {
  const { newPassword, confirmPassword } = req.body;
  if (newPassword === confirmPassword) {
    fakeUser.password = newPassword;
    res.render("forgotPass", { user: null, sent: false, verified: true });
  } else {
    res.render("forgotPass", { user: null, sent: false, verified: false });
  }
});

app.post("/forgotPass", (req, res) => {
  const { email } = req.body;
  if (email === fakeUser.email) {
    res.render("forgotPass", { user: null, sent: true, verified: false });
  } else {
    res.render("forgotPass", { user: null, sent: false, verified: false });
  }
});

//signLogin
app.post("/loginUser", (req, res) => {
  const { loginPassword, loginUsername } = req.body;
  if (loginPassword === fakeUser.password && loginUsername === fakeUser.name) {
    res.redirect("/profile");
  } else {
    res.render("signLogin", { user: null, error: "Invalid credentials" });
  }
});

app.post("/signUser", (req, res) => {
  const { SignUpUsername,SignUpPassword, email } = req.body;
  if (SignUpUsername === fakeUser.name && SignUpPassword === fakeUser.password && email === fakeUser.email) {
    res.redirect("/profile");
  } else {
    res.render("signLogin", { user: null, error: "Invalid credentials" });
  }
});

//adminDashboard
app.post("/editUser", upload.single('userImgUp'), async (req, res) => {
  try {
    const { originalName, userName, userPass } = req.body;
    
    const updateData = {
      name: userName,
      password: userPass
    };

    if (req.file) {
      updateData.img = '/images/' + req.file.filename;
    }

    // Update user in database using original name
    const updatedUser = await User.findOneAndUpdate(
      { name: originalName },
      updateData,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send('User not found');
    }

    // Update local users array
    const index = users.findIndex(u => u.name === originalName);
    if (index !== -1) {
      users[index] = {
        ...users[index],
        ...updateData
      };
    }

    res.redirect('/adminDashboard');
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).send('Error updating user');
  }
});

app.post("/deleteUser", async (req, res) => {
  try {
    const { userName } = req.body;

    // Delete user from database by name
    const deletedUser = await User.findOneAndDelete({ name: userName });

    if (!deletedUser) {
      return res.status(404).send('User not found');
    }

    // Remove from local users array
    const index = users.findIndex(u => u.name === userName);
    if (index !== -1) {
      users.splice(index, 1);
    }

    res.redirect('/adminDashboard');
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).send('Error deleting user');
  }
});




app.listen(3000, () =>
  console.log("Server running on http://localhost:3000")
);


