import icons from 'url:../../img/icons.svg';
// import { Fraction } from 'fractional';
import fracty from "fracty";
import View from './View.js';

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');

  _generateMarkup() {
    // console.log(this._data.key ? this._data.key : "hello");

    return `
    <section class="banner">
      <div class="banner__overlay"></div>
      <figure>
        <img src="${this._data.imageUrl}" alt="">
        <h1><span class="text banner__text">${this._data.title}</span></h1>
      </figure>
    </section>

    <section class="servings container">
      <div class="container__secondary">
        <div class="container__tertiary">
          <div class="servings__time">
            <svg class="icon icon--accent icon--med">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="text"><b>${this._data.cookingTime}</b> minutes</span>
          </div>
          <div class="servings__amount">
            <svg class="icon icon--accent icon--med">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="text servings__text"><b>${this._data.servings}</b> Servings</span>
            <button class="btn btn--minus btn--servings" data-update="${this._data.servings - 1}">
              <svg class="icon icon--accent icon--small">
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn btn--add btn--servings" data-update="${this._data.servings + 1}">
              <svg class="icon icon--accent icon--small">
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>
        <div class="servings__nav">
          <button class="btn btn--inactive btn--user upload-indicator ${this._data.key ? "" : "invisible"}">
            <svg class="icon icon--accent icon--med">
              <use href="${icons}#icon-user"></use>
            </svg>
          </button>
          <button class="btn btn--circle btn--add-bookmark">
            <svg class="icon icon--white icon--med">
              <use href="${icons}#icon-bookmark${this._data.bookmarked ? '-fill' : ''}"></use>
            </svg>
          </button>
        </div>
      </div>
    </section>

    <section class="ingredients container">
      <div class="container__secondary">
        <h3 class="text recipe__header">Recipe Ingredients</h3>
        <ul class="ingredients__list">
          ${this._data.ingredients.map(this._generateIngredientsMarkup).join('')}
        </ul>
      </div>
    </section>

    <section class="directions container">
      <div class="container__secondary">
        <h3 class="text recipe__header">How to cook it</h3>
        <p class="text">This recipe was carefully designed and tested by <b>${this._data.publisher}</b>. Please check out directions at
          their website.</p>
        <button class="btn btn--rounded btn--rounded--big btn--directions">
          <a href="${this._data.sourceUrl}" class="text text--right">Directions</a>
          <svg class="icon icon--white icon--small">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      </div>
    </section>
    `;
  }

  _generateIngredientsMarkup(ing) {
    return `
    <li class="ingredients__item">
      <svg class="icon icon--accent icon--small">
        <use href="${icons}#icon-check"></use>
      </svg>
      <span class="text">${ing.quantity ? fracty(ing.quantity).toString() : ''} ${ing.unit ? ing.unit : ''} ${ing.description}</span>
    </li>
    `;
  } 


  updateServings(handler) {
    this._parentElement.addEventListener('click', function(e) {
      const btn = e.target.closest('.btn--servings');
      if(!btn) return;

      const newServings = +btn.dataset.update;

      if(newServings > 0) handler(newServings);
    });
  }


}

export default new RecipeView();