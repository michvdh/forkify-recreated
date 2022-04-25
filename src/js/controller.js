import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchResultView from './views/searchResultView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import uploadView from './views/uploadView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controlRecipes = async function(targetRecipeID) {
  try {
    recipeView.renderSpinner();
    await model.loadRecipeData(targetRecipeID);
    recipeView.updateHTML(model.state.recipe);
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

  } catch(err) {
    console.log(err);
    throw err;
  }
}


const controlSearchResult = async function(searchInput) {
  try {
    searchResultView.renderSpinner();

    await model.loadAllSearchResult(searchInput);
  
    const currentPage = model.state.search.currentPage;
    const totalPages = model.state.search.totalPages;

    if(totalPages > 0) {
      searchResultView.updateHTML(model.loadSearchResultDisplay());
      paginationView.updateHTML(currentPage, totalPages);
      paginationView.btnHandler(currentPage, controlPagination);
      searchResultView.renderSliderAndIngredients(controlRecipes);
    } else {
      searchResultView.renderErrorMessage();
    }

  } catch(err) {
    console.log(err);
    throw err;    
  }
}


const controlPagination = function(newCurrentPage) {
  model.updateCurrentPage(newCurrentPage);
  searchResultView.updateHTML(model.loadSearchResultDisplay());
  searchResultView.renderSliderAndIngredients(controlRecipes);
  paginationView.updateHTML(newCurrentPage, model.state.search.totalPages);
  paginationView.btnHandler(newCurrentPage, controlPagination);
}


const controlServings = function(newServings) {
  model.updateServings(newServings);
  recipeView.updateNewValuesOnly(model.state.recipe);
}

const controlAddBookmarks = function() {
  model.addBookmark(model.state.recipe);
  bookmarksView.updateHTML(model.state.bookmarks);
  recipeView.updateNewValuesOnly(model.state.recipe);
  bookmarksView.renderSliderAndIngredients(controlRecipes);
}


const controlBookmarksInitLocalStorage = function() {
  // for some reason, state.recipe keeps getting a "bookmarked: true" value. We're using this function to clear the content of state.recipe
  model.state.recipe = {}
  bookmarksView.updateHTML(model.state.bookmarks);
}


const controlUploadRecipe = async function(data) {
  try {
    uploadView.renderSpinner();

    await model.addRecipe(data);

    recipeView.updateHTML(model.state.recipe);
    bookmarksView.updateHTML(model.state.bookmarks);
  
    // used to show the "person" icon as indicator that a recipe was uploaded
    const uploadIndicator = document.querySelector('.upload-indicator');
    uploadIndicator.classList.remove('invisible');
  
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    uploadView.renderMessage();
    setTimeout(uploadView.toggleUploadWindow, 900);

  } catch(err) {
    console.log(`🤷‍♀️🤷‍♀️🤷‍♀️ ${err}`);
    uploadView.renderErrorMessage(err);
    throw err;
  }
}


const init = function() { 
  controlBookmarksInitLocalStorage();
  searchResultView.getSearchInput(controlSearchResult);
  recipeView.updateServings(controlServings);
  bookmarksView.setBookmarkHandler(controlAddBookmarks);
  bookmarksView.renderSliderAndIngredients(controlRecipes);
  uploadView.setFormSubmitHandler(controlUploadRecipe);
}

init();
