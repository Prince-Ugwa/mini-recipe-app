const container = document.querySelector(".container");
const form = document.querySelector(".my__form");
const input = document.querySelector("input");
const searchResult = document.querySelector(".recipe__cards");
let searchInput;
/////////API APP
const appId = "86980c88";
const appKey = "68eae5532dce12233a6a9adea07f2814";

const renderHtml = function (inputs) {
  let htmlEl = "";
  inputs.map((result) => {
    htmlEl += `
    <div class="recipe__item">
    <img src="${result.recipe.image}" alt="food" />
    <div class="recipe__tag">
      <h1 class="recipe__title">${result.recipe.label}</h1>
      <a href="${
        result.recipe.url
      }"  target="_blank" class="view"> View more</a>
    </div>
    <p class="recipe__text">Calorie:${result.recipe.calories.toFixed(0)}</p>
    <p class="recipe__text">Source:${result.recipe.source}</p>
    <p class="recipe__text">Ingrdient-Labels:${
      result.recipe.ingredientLines
    }</p>
  </div>
    `;
  });
  searchResult.innerHTML = htmlEl;
};

/////////////////////////////////////////////////
const fetchRecipe = async function () {
  try {
    const baseUrl = `
    https://api.edamam.com/search?q=${searchInput}&app_id=${appId}&app_key=${appKey}&from=0&to=12
    `;
    const response = await fetch(baseUrl);
    if (!response.ok) throw new Error(`No api response ${response.status}`);
    const data = await response.json();
    renderHtml(data.hits);
    console.log(data);
  } catch (err) {
    alert(`${err.message} Recipe💥💥`);
    // throw err;
  }
};
//////////////////////////////////////////////////
form.addEventListener("submit", function (e) {
  e.preventDefault();
  searchInput = e.target.querySelector("input").value;
  // console.log(searchInput);
  fetchRecipe();
});
