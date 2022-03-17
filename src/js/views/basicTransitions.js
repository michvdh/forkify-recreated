/* Search result
1. container will close/hide if a search item is clicked
2. container will show always on the side once screen size reaches a certain point
*/

// if screen width begins with less than 1024
  // hide recipe section
  // show searchResult section
  // when search button is clicked, hide searchResult and show recipe
  // when search field is focused, show searchResult and hide recipe
  
// if screen width is adjusted to less than 1024px
  // hide recipe section
  // show searchResult section
  // when search button is clicked, hide searchResult and show recipe
  // when search field is focused, show searchResult and hide recipe

// if search is clicked and field is empty, do nothing

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
  }
});

searchField.addEventListener('click', () => displaySearchResult('0'));
searchBtn.addEventListener('click', () => displaySearchResult('0'));






/* Upload
1. show upload form when upload button is clicked
2. when submit button is clicked, clear form
*/

const addRecipeBtn = document.querySelector('.btn--add-recipe');
const uploadForm = document.querySelector('.upload');
const uploadeCloseBtn = document.querySelector('.btn--close');
const uploadInputField = document.querySelectorAll('.upload__input-field');
const overlay = document.querySelector('.overlay');

const uploadDisplayState = function(vis, op) {
  uploadForm.style.visibility = vis;
  uploadForm.style.opacity = op;
  overlay.style.visibility = vis;
  overlay.style.opacity = op;

  // remove comment for code below later. Will need value for testing for now
  // uploadInputField.forEach((field) => field.value = '');
}

addRecipeBtn.addEventListener('click', () => uploadDisplayState('visible', '1'));
uploadeCloseBtn.addEventListener('click', () => uploadDisplayState('hidden', '0'));
overlay.addEventListener('click', () => uploadDisplayState('hidden', '0'));