import * as model from './model.js';
import recipeView from './views/RecipeView.js';
import searchResultView from './views/SearchResultView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const searchBtn = document.querySelector('.btn--search');


const controlRecipes = async function(targetRecipeID) {
  await model.loadRecipeData(targetRecipeID);
  recipeView.updateHTML(model.state.recipe);
}

const controlSearchResult = async function(e) {
  e.preventDefault();

  const searchInput = searchResultView.getSearchInput();
  await model.loadSearchResult(searchInput);
  console.log(model.state.search.recipe);
  searchResultView.updateHTML(model.state.search.recipe);
  controlSearchResultSliderEffect();
}

const controlPagination = function() {

}

const controlSearchResultSliderEffect = function() {
  // when in smaller devices, this creates a slider effect that will show or hide the search result section
  
  const resultSection = document.querySelector('.result');
  const searchBtn = document.querySelector('.btn--search');
  const searchField = document.querySelector('.search__field');
  const searchResultList = document.querySelector('.result__list');

  const displaySearchResult = function(leftValue) {
    resultSection.style.left = leftValue;
  }

  searchResultList.addEventListener('click', function(e) {
    e.preventDefault();

    if(e.target.classList.contains('res__item')) {
      displaySearchResult('-200%');
      const targetRecipeID = e.target.closest('.result__item__link')?.getAttribute('href').substring(1);
      controlRecipes(targetRecipeID);
    }
  });

  searchField.addEventListener('click', () => displaySearchResult('0'));
  searchBtn.addEventListener('click', () => displaySearchResult('0'));
}

const init = function() { 
  searchBtn.addEventListener('click', e => controlSearchResult(e));
}

init();


/*
C - set addEventListener when search button is clicked in init(). When search button is clicked, it will get the value of search field in view then pass it to model, then gets the data from model, then update the search results section

V - search button is clicked
V - eventListener is triggered and returns the value of the input field to Controller

C - checks the passed value. If empty, don't do anything. If it contains a value, pass to Model

M - with the passed value, model retrieves data from API
M - model formats the data
M - model passes the data to Controller

C - controller passes the value to View

V - view makes the update in search results section


*/