// import icons from 'url:../../img/icons.svg';
import icons from '../../img/icons.svg';

export default class View {
  _data;

  renderSpinner() {
    const markup = `
    <div class="spinner">
      <svg class="icon icon--accent icon--xl">
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
    `; 

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }


  updateHTML(data) {
    data ? this._data = data : '';
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', this._generateMarkup(data));
  }


  updateNewValuesOnly(data) {  
    const newMarkup = this._generateMarkup(data); // string

    const newDOM = document.createRange().createContextualFragment(newMarkup); // object

    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));


    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue?.trim() !== '' && newEl.firstChild?.nodeValue !== null) {
        curEl.textContent = newEl.textContent;
      }

      if(!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value));
      }
    });
  }
  
  renderErrorMessage(error) {
    const markup = `
    <div class="message">
      <svg class="icon icon--accent  icon--large">
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
      <span class="text">${error}</span>
    </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML(`afterbegin`, markup);
  }


  _clear() {
    this._parentElement.innerHTML = '';
  }


  // when in smaller devices, this creates a slider effect that will show or hide the search result section
  // this function is used by SearchResults and Bookmarks also to display the specific ingredients
  renderSliderAndIngredients(renderResults) {
    const resultSection = document.querySelector('.result');
    const searchBtn = document.querySelector('.btn--search');
    const searchField = document.querySelector('.search__field');
    const allResultItems = document.querySelectorAll('.res__item');
    const allLinks = document.querySelectorAll('.result__item__link');
    const resultList = document.querySelectorAll('.result__list'); // for both search result and bookmarks list


    // this function controls the slider in mobile view
    const slideSearchResults = function(leftValue) {
      resultSection.style.left = leftValue;
    }


    // grants event listener when clicking on the result items for both search result list and bookmarks list
    resultList.forEach((list) => {
      list.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetRecipe = e.target.classList.contains('res__item');

        if(!targetRecipe) return;

        const targetRecipeID = e.target.closest('.result__item__link')?.getAttribute('href').substring(1);

        slideSearchResults('-200%'); // moves the search result section to the left to display the specific ingredients

        highlightRecipe(targetRecipeID);
        
        renderResults(targetRecipeID); // this is for rendering specific ingredients    

      });
    });


    // used to retain highlight for recipes that are clicked  
    const highlightRecipe = function(targetRecipeID) {
      allResultItems.forEach(res => res.classList.remove('active'));

      allLinks.forEach(link => {
        if(link.getAttribute('href').substring(1) === targetRecipeID) {
          link.classList.add('active');
        }
      }); 
    }


    searchField.addEventListener('click', () => slideSearchResults('0'));
    searchBtn.addEventListener('click', () => slideSearchResults('0'));
  }

}