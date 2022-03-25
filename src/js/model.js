import * as config from './config.js';

export const state = {
  recipe: {},
  search: {
    input: [],
    recipe: [],
    resultsPerPage: config.RESULTS_PER_PAGE,
    page: 1
  }
};


const formatRecipeData = function(data) {
  const {recipe} = data;
  
  return {
    cookingTime: recipe.cooking_time,
    id: recipe.id,
    imageUrl: recipe.image_url,
    ingredients: recipe.ingredients,
    publisher: recipe.publisher,
    servings: recipe.servings,
    sourceUrl: recipe.source_url,
    title: recipe.title
  };
};


export const loadRecipeData = async function(targetRecipeID) {
  try {
    const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${targetRecipeID}`);
    const data = await res.json();
    const recipe = formatRecipeData(data.data);
    state.recipe = recipe;

  } catch(err) {
    
  }
}

export const loadSearchResult = async function(searchInput) {
  try {
    const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchInput}`);

    const data = await res.json();
    state.search.input.push(searchInput);
    state.search.recipe = [];

    state.search.recipe = data.data.recipes.map((recipe) => {
      return {
        id: recipe.id,
        imageUrl: recipe.image_url,
        publisher: recipe.publisher,
        title: recipe.title,
      }
    });

    console.log(state.search);

  } catch(err) {
    console.log(`🤷‍♀️🤷‍♀️🤷‍♀️ ${err}`);
  }
}