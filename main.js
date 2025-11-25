const listBtn = document.querySelector('.list');
const closeBtn = document.querySelector('.close');
const nav = document.querySelector('nav');
const liAnimation = document.querySelector('.menu-items');
const content = document.querySelector("#content");
const search = document.querySelector('#search');
const categories = document.querySelector('#categories');
const area = document.querySelector('#area');
const ingredients = document.querySelector('#ingredients');
const contact = document.querySelector('#contact');

// nav

listBtn.addEventListener('click', function(){
  nav.classList.add('open');
  listBtn.classList.add('d-none');
  closeBtn.classList.remove('d-none');
  liAnimation.classList.remove('animation');
});

closeBtn.addEventListener('click', function(){
  nav.classList.remove('open');
  listBtn.classList.remove('d-none');
  closeBtn.classList.add('d-none');
  liAnimation.classList.add('animation');
});

// start home

async function getMeals() {
  const response = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood");
  const data = await response.json();
  console.log(data.meals);
  homeMeal(data.meals);
}


function homeMeal(meals) {
  const row = document.querySelector(".row");
  let card = ""; 

  for (let i = 0; i < meals.length; i++) {
    const meal = meals[i];
  card += `
  <div class="col-md-3 my-2">
    <div onclick="getMealDetails('${meal.idMeal}')" class="home-item rounded-3">
      <div class="cover-img d-flex align-items-center">
        <h3 class="ms-3">${meal.strMeal}</h3>
      </div>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-100 img-home rounded-3">
    </div>
  </div>
`;
  }

  row.innerHTML = card;
}


getMeals();

// end home

// start search

search.addEventListener('click', function(){
    nav.classList.remove('open');
  listBtn.classList.remove('d-none');
  closeBtn.classList.add('d-none');
  liAnimation.classList.add('animation');
  content.innerHTML = ` <div class="container mt-4">
  <div class="row justify-content-center">
    <div class="col-md-5">
      <input type="text" id= "searchByName" class="form-control bg-black text-white" placeholder="Search By Name">
    </div>
    <div class="col-md-5 ">
      <input type="text" id= "searchFirstLatter" class="form-control bg-black text-white" placeholder="Search By First Latter" maxlength="1">
    </div>
  </div>
 </div>
  
    <div class="row mt-4" id="searchResult">
    
    </div>
  
 `;
 getSearch();
})


function getSearch(){
  const searchByName = document.querySelector('#searchByName');
  const searchFirstLatter = document.querySelector('#searchFirstLatter');
  const searchResult = document.querySelector('#searchResult');

  searchByName.addEventListener('keyup',async function(){

    let valueName = searchByName.value.trim();
    if(valueName.length ===0){
      searchResult.innerHTML = "";
      return
    }
const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${valueName}`);    const data = await response.json();
    displaySearchResults(data.meals);
  });

  searchFirstLatter.addEventListener('keyup',async function(){

    let valueLetter = searchFirstLatter.value.trim();
    if(valueLetter.length ===0){
      searchResult.innerHTML = "";
      return
    }
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${valueLetter}`);
    const data = await response.json();
    displaySearchResults(data.meals);
  });
}

function displaySearchResults(meals)
{


  const searchResult = document.querySelector("#searchResult");
  let card = "";

  if (!meals) {
    searchResult.innerHTML = "";
    return;
  }

  for (let i = 0; i < meals.length; i++) {
    const meal = meals[i];

    card += `
      <div onclick="getMealDetails('${meal.idMeal}')" class="col-md-3 my-2">
        <div class="home-item rounded-3">
          <div class="cover-img d-flex align-items-center">
            <h3 class="ms-3">${meal.strMeal}</h3>
          </div>
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-100 img-home rounded-3">
        </div>
      </div>
    `;
  }

  searchResult.innerHTML = card;

}

// end search


// start categories
categories.addEventListener('click',function(){
      nav.classList.remove('open');
  listBtn.classList.remove('d-none');
  closeBtn.classList.add('d-none');
  liAnimation.classList.add('animation');

  content.innerHTML=`
    <div class="container mt-5" ">
    <div class="row" id="categorie">
    
    </div>
  </div>
  `
  getCategories()
})


async function getCategories() {
  const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
  const data = await response.json();
  categoriesMeal(data.categories);
}

function categoriesMeal(categories) {
  const categorie = document.querySelector("#categorie");
  let card = "";

  for (let i = 0; i < categories.length; i++) {
    const cat = categories[i];

    card += 
      `  <div class="col-md-3 my-2" onclick="getCategoryMeals('${cat.strCategory}')">
        <div class="home-item rounded-3 text-center text-black   categories">
          <img src="${cat.strCategoryThumb}" class="w-100 rounded-3 ">
          <div class="categories-cover text-center">
<h3>${cat.strCategory}</h3>
<p class="m-0 p-0">${cat.strCategoryDescription}</p>
          </div>
        </div>
      </div>`;
  }

  categorie.innerHTML = card;
}

async function getCategoryMeals(categoriesName) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoriesName}`)
  const data = await response.json()
  displayCategoriesMeals(data.meals)
}

function displayCategoriesMeals(meals){
content.innerHTML = `
  <div class="container mt-5" >
    <div id="categoryMeals" class="row" >
    </div>
  </div>
`;

  const categoryMeals = document.querySelector("#categoryMeals");
  let card = "";

  for (let i = 0; i < meals.length; i++) {
    const meal = meals[i];

    card += `
      <div class="col-md-3 my-2">
        <div onclick="getMealDetails('${meal.idMeal}')" class="home-item rounded-3" style="cursor:pointer;">
          <div class="cover-img d-flex align-items-center">
            <h3 class="ms-3">${meal.strMeal}</h3>
          </div>
          <img src="${meal.strMealThumb}" class="w-100 img-home rounded-3">
        </div>
      </div>
    `;
  }

  categoryMeals.innerHTML = card;
}

// ens categories

// start Details

async function getMealDetails(id) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  displayMealDetails(data.meals[0]);
}

function displayMealDetails(meal) {
  content.innerHTML = `
    <div class="container pt-5">
      <div class="row text-white">
      
        <div class="col-md-4">
          <img src="${meal.strMealThumb}" class="w-100 rounded-4 mb-3">
          <h2>${meal.strMeal}</h2>
        </div>

        <div class="col-md-8">
          <h3>Instructions</h3>
          <p>${meal.strInstructions}</p>

          <h4 class="info">Area : <span >${meal.strArea}</span></h4>
          <h4 class="info">Category  : <span>${meal.strCategory}</span></h4>

          <h4 class="mt-4">Recipes :</h4>
          <div class="d-flex flex-wrap gap-2 ">
           ${getIngredientsList(meal)}
        
          </div>

          <h4 class="mt-4">Tags :</h4>
          <div class="d-flex gap-2">
            <a href="${meal.strSource}" class="btn btn-success" target="_blank">Source</a>
            <a href="${meal.strYoutube}" class="btn btn-danger" target="_blank">Youtube</a>
          </div>

        </div>

      </div>
    </div>
  `;
}





function getIngredientsList(meal) {
  let ingredients = "";

  for (let i = 1; i <= 20; i++) {
    let ingredient = meal[`strIngredient${i}`];
    let measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      ingredients += `<span class="badge recipes text-dark p-2">${measure} ${ingredient}</span>`;
    }
  }

  return ingredients;
}
// end Details

// start area


area.addEventListener('click',function(){
      nav.classList.remove('open');
  listBtn.classList.remove('d-none');
  closeBtn.classList.add('d-none');
  liAnimation.classList.add('animation');

  content.innerHTML=`
    <div class="container mt-5" ">
    <div class="row" id="Area">
    
    </div>
  </div>
  `
getArea()
})

async function getArea() {
  const response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
  const data = await response.json();
  AreaMeal(data.meals);
}

function AreaMeal(meals) {
  const Area = document.querySelector("#Area");
  let card = "";

  for (let i = 0; i < meals.length; i++) {
    const a = meals[i];

    card += 
      ` 
          <div class="col-md-3 mb-3" onclick="getAreaMeals('${a.strArea}')">
        <div class="area text-center">
          <i class="fa-solid fa-house-laptop"></i>
          <h3>${a.strArea}</h3>
        </div>
      </div>
      `;
  }

  Area.innerHTML = card;
}


async function getAreaMeals(areaName) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`)
  const data = await response.json()
  displayAreaMeals(data.meals)
}

function displayAreaMeals(meals){
content.innerHTML = `
  <div class="container mt-5" >
    <div id="areaMeals" class="row" >
    </div>
  </div>
`;

  const areaMeals = document.querySelector("#areaMeals");
  let card = "";

  for (let i = 0; i < meals.length; i++) {
    const meal = meals[i];

    card += `
      <div class="col-md-3 my-2">
        <div onclick="getMealDetails('${meal.idMeal}')" class="home-item rounded-3" ">
          <div class="cover-img d-flex align-items-center">
            <h3 class="ms-3">${meal.strMeal}</h3>
          </div>
          <img src="${meal.strMealThumb}" class="w-100 img-home rounded-3">
        </div>
      </div>
    `;
  }

  areaMeals.innerHTML = card;
}


// end area

// start ingredients

ingredients.addEventListener('click',function(){
      nav.classList.remove('open');
  listBtn.classList.remove('d-none');
  closeBtn.classList.add('d-none');
  liAnimation.classList.add('animation');

  content.innerHTML=`
    <div class="container mt-5" ">
    <div class="row" id="Ingredients">
    
    </div>
  </div>
  `
getIngredients()
})

async function getIngredients() {
  const response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
  const data = await response.json();
  ingredientsMeal(data.meals);
}

function ingredientsMeal(meals) {
  const Ingredients = document.querySelector("#Ingredients");
  let card = "";


  for (let i = 0; i < meals.length; i++) {
    const a = meals[i];



  let desc = "";
    if (a.strDescription) {
      let words = a.strDescription.split(" ");
      if (words.length > 15) {
        desc = words.slice(0, 15).join(" ") ;
      } else {
        desc = a.strDescription;
      }
    }
    card += 
      ` 
      <div class="col-md-3 mb-5" onclick="getIngredientsMeals('${a.strIngredient}')">
    <div class="ingredients text-center text-white">
      <i class="fa-solid fa-drumstick-bite"></i>
      <h3>${a.strIngredient}</h3>
      <p>${desc}</p>
    </div>
  </div>
      `;
  }

  Ingredients.innerHTML = card;
}


async function getIngredientsMeals(ingredientsName) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientsName}
`)
  const data = await response.json()
  displayIngredientsNameMeals(data.meals)
}

function displayIngredientsNameMeals(meals){
content.innerHTML = `
  <div class="container mt-5" >
    <div id="ingredientsMeals" class="row" >
    </div>
  </div>
`;

  const ingredientsMeals = document.querySelector("#ingredientsMeals");
  let card = "";

  for (let i = 0; i < meals.length; i++) {
    const meal = meals[i];

    card += `
      <div class="col-md-3 my-2">
        <div onclick="getMealDetails('${meal.idMeal}')" class="home-item rounded-3" ">
          <div class="cover-img d-flex align-items-center">
            <h3 class="ms-3">${meal.strMeal}</h3>
          </div>
          <img src="${meal.strMealThumb}" class="w-100 img-home rounded-3">
        </div>
      </div>
    `;
  }

  ingredientsMeals.innerHTML = card;
}

// start contact

contact.addEventListener('click',function(){
      nav.classList.remove('open');
  listBtn.classList.remove('d-none');
  closeBtn.classList.add('d-none');
  liAnimation.classList.add('animation');

  content.innerHTML=`
  <div class="container">
    <div class="row">
      <div class="d-flex vh-100 align-items-center">
        <div class="container w-75">
          <div class="row">
            <div class="mt-4 col-6"><input type="text" class="form-control" placeholder="Enter Your Name"></div>
            <div class="mt-4 col-6"><input type="text" class="form-control" placeholder="Enter Your Email"></div>
            <div class="mt-4 col-6"><input type="text" class="form-control" placeholder="Enter Your Phone"></div>
            <div class="mt-4 col-6"><input type="text" class="form-control" placeholder="Enter Your Age"></div>
            <div class="mt-4 col-6"><input type="text" class="form-control" placeholder="Enter Your Password"></div>
            <div class="mt-4 col-6"><input type="text" class="form-control" placeholder="Repassword"></div>

          </div>
          <div class="d-flex justify-content-center mt-3 "><button type="button" class=" rounded-3 submit ">
            Submit</button></div>
        </div>
      </div>
    </div>
  </div>

  `

})

// end contact
