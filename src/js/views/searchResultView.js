
class SearchResultView {
  getSearchInput() {
    const searchInput = document.querySelector('.search__field').value;
    console.log(`This is a ${searchInput}`);
    return searchInput;
  }

  _generateMarkup(data) {
    return `
    <ul class="result__list">
      ${data.map(this._generateSearchResultMarkup).join('')}
    </ul>
    `
  }

  _generateSearchResultMarkup(recipe) {
    return `
    <li class="result__item res__item">
      <a class="result__item__link res__item container" href="#${recipe.id}">
        <img class="result__item__logo res__item" src="${recipe.imageUrl}" alt="item logo">
        <div class="result__item__desc res__item">
          <span class="text result__item__name res__item">${recipe.title}</span>
          <span class="text result__item__author res__item">${recipe.publisher}</span>
        </div>
      </a>
    </li>    
    `;
  }

  

  updateHTML(data) {
    const searchResultSection = document.querySelector('.result__items');
    searchResultSection.insertAdjacentHTML('afterbegin', this._generateMarkup(data));
  }
}

export default new SearchResultView();