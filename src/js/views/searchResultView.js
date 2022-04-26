import icons from 'url:../../img/icons.svg';
import { updateCurrentPage } from '../model';
import View from './View';

class SearchResultView extends View {
  _parentElement = document.querySelector('.result .result__items');
  _paginationSection = document.querySelector('.result__pagination');

  getSearchInput(render) {
    const searchBtn = document.querySelector('.btn--search');
    searchBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const searchField = document.querySelector('.search__field')
      const searchInput = searchField.value;
      searchField.value = '';
      render(searchInput);
    });
  }

  _generateMarkup() {
    // this._data = data;

    return `
    <ul class="result__list">
      ${this._data.map(this._generateSearchResultMarkup).join('')}
    </ul>
    `;
  }

  _generateSearchResultMarkup(recipe) {
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

  renderErrorMessage() {
    // const searchResultSection = document.querySelector('.result__items');
    const paginationSection = document.querySelector('.result__pagination');

    const markup = `
      <div class="message">
        <svg class="icon icon--accent icon--large">
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
        <span>No recipes found for your query! Please try again ;)</span>
      </div>`;

    this._clear();
    paginationSection.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

}

export default new SearchResultView();