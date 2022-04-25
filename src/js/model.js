import { RESULTS_PER_PAGE } from './config.js';
import { API_URL } from './config.js';
import { KEY } from './config.js';

export const state = {
  recipe: {}, // for the specific recipe and ingredients
  search: {
    input: [],
    recipes: [], // for the search results
    resultsPerPage: RESULTS_PER_PAGE,
    currentPage: 1,
    totalPages: 0
  },
  bookmarks: []
};


const formatRecipeData = function (data) {
  const { recipe } = data;

  return {
    cookingTime: recipe.cooking_time,
    id: recipe.id,
    imageUrl: recipe.image_url,
    ingredients: recipe.ingredients,
    publisher: recipe.publisher,
    servings: recipe.servings,
    sourceUrl: recipe.source_url,
    title: recipe.title,
    ...(recipe.key && {key: recipe.key})
  };
};


export const loadRecipeData = async function (targetRecipeID) {
  try {
    const res = await fetch(`${API_URL}${targetRecipeID}?key=${KEY}`);
    const data = await res.json();
    const recipe = formatRecipeData(data.data);

    state.recipe = recipe;

    if (state.bookmarks.some(bookmark => bookmark.id === targetRecipeID)) state.recipe.bookmarked = true;

  } catch (err) {
    console.log(`🤷‍♀️🤷‍♀️🤷‍♀️ ${err}`);
    throw err;
  }
}

export const loadAllSearchResult = async function (searchInput) {
  try {
    const res = await fetch(`${API_URL}?search=${searchInput}&key=${KEY}`);
    const data = await res.json();

    state.search.input.push(searchInput);
    state.search.recipes = [];
    state.search.currentPage = 1;

    state.search.recipes = data.data.recipes.map((recipe) => {
      return {
        id: recipe.id,
        imageUrl: recipe.image_url,
        publisher: recipe.publisher,
        title: recipe.title,
        ...(recipe.key && {key: recipe.key})
      }
    });

    state.search.totalPages = Math.ceil(state.search.recipes.length / state.search.resultsPerPage);

  } catch (err) {
    console.log(`🤷‍♀️🤷‍♀️🤷‍♀️ ${err}`);
    throw err;
  }
}

export const loadSearchResultDisplay = function() {
  const resultsPerPage = state.search.resultsPerPage;
  const currentPage = state.search.currentPage;
  const start = resultsPerPage * (currentPage - 1);
  const end = resultsPerPage * currentPage;

  return state.search.recipes.slice(start, end);
}


export const updateCurrentPage = function(newCurrentPage) {
  state.search.currentPage = newCurrentPage;
}


export const updateServings = function(newServings) {
  state.recipe.ingredients.forEach((ing) => { ing.quantity = (ing.quantity * newServings) / state.recipe.servings });

  state.recipe.servings = newServings;
}

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}

export const addBookmark = function(recipe) {
  if(!recipe.bookmarked) {
    state.bookmarks.push(recipe);
    state.recipe.bookmarked = true;
    persistBookmarks();
  } else {
    const index = state.bookmarks.findIndex(obj => obj.id === recipe.id);
    state.bookmarks.splice(index, 1);
    state.recipe.bookmarked = false;
    persistBookmarks();
  }
}

export const addRecipe = async function(newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe).filter((ing) => {
      if(ing[0].includes('ingredient') && ing[1] !== '') return ing[1];
    }).map((ing) => {
      const ingSpecific = ing[1].split(',');
      const [quantity, unit, description] = ingSpecific;

      return {quantity, unit, description};
    });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.url,
      image_url: newRecipe.imageURL,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.prepTime,
      servings: +newRecipe.servings,
      ingredients,
      key: newRecipe.key
    }

    const fetchPro = await fetch(`${API_URL}?key=${KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(recipe)
    });

    const {data} = await fetchPro.json();

    state.recipe = formatRecipeData(data);
    addBookmark(state.recipe);

  } catch(err) {
    console.log(`🤷‍♀️🤷‍♀️🤷‍♀️ ${err}`);
    throw err;
  }
}

const init = function() {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
}

init();




