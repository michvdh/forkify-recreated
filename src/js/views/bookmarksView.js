import icons from 'url:../../img/icons.svg';
import View from './View';

class BookmarksView extends View {
  _recipeParentElement = document.querySelector('.recipe');
  _parentElement = document.querySelector('.bookmarks-preview');

  // this function adds a click event listener to the add bookmark button and adds the recipe to bookmarks list
  setBookmarkHandler(handler) {
    this._recipeParentElement.addEventListener('click', (e) => {
      const btnAddBookmark = e.target.closest('.btn--add-bookmark');

      if(!btnAddBookmark) return;

      handler();
    });
  }

  // this function loads the recipe on center page when an item is clicked from bookmarks list
  // setBookmarkLoadRecipeHandler(handler) {
  //   this._parentElement.addEventListener('click', (e) => {
  //     const bookmarkedRecipe = e.target.closest('.result__item');

  //     if(!bookmarkedRecipe) return;

  //     const targetRecipeID = e.target.closest('.result__item__link').getAttribute('href').substring(1);

  //     handler(targetRecipeID);
  //   });
  // }

  _generateMarkup() {
    return `
    <ul class="bookmarks-preview__list result__list">
      ${this._data.length < 1 ? this._genereateEmptyMarkup() : this._data.map(this._generateBookmarksMarkup).join('')}
    </ul>
    `;
  }

  _genereateEmptyMarkup() {
    return `
    <li>
      <div class="message">
        <svg class="icon icon--accent icon--large">
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
        <span>No bookmarks yet. Find a nice recipe and bookmark it :)</span>
      </div>
    </li>
    `;
  }

  _generateBookmarksMarkup(recipe) {
    const id = window.location.hash.slice(1);

    return `
    <li class="result__item res__item ${recipe.id === id ? "active" : ""}">
      <a class="result__item__link res__item container" href="#${recipe.id}">
        <div class="secondary-container">
          <img class="result__item__logo res__item" src="${recipe.imageUrl}" alt="item logo">
          <div class="result__item__desc res__item">
            <span class="text result__item__name res__item">${recipe.title}</span>
            <span class="text result__item__author res__item">${recipe.publisher}</span>
          </div>
        </div>
        <svg class="icon icon--accent icon--small res__item result__upload-indicator ${recipe.key ? "" : "invisible"}">
          <use href="${icons}#icon-user"></use>
        </svg>  
      </a>
    </li>  
    `;
  }

}

export default new BookmarksView();