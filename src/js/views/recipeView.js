import icons from 'url:../../img/icons.svg';
import { Fraction } from 'fractional';

class RecipeView {
  _generateMarkup(data) {
    return `
    <section class="banner">
      <div class="banner__overlay"></div>
      <figure>
        <img src="${data.imageUrl}" alt="">
        <h1><span class="text banner__text">${data.title}</span></h1>
      </figure>
    </section>

    <section class="servings container">
      <div class="container__secondary">
        <div class="container__tertiary">
          <div class="servings__time">
            <svg class="icon icon--accent icon--med">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="text"><b>${data.cookingTime}</b> minutes</span>
          </div>
          <div class="servings__amount">
            <svg class="icon icon--accent icon--med">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="text"><b>${data.servings}</b> Servings</span>
            <button class="btn btn--minus btn--servings">
              <svg class="icon icon--accent icon--small">
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn btn--add btn--servings">
              <svg class="icon icon--accent icon--small">
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>
        <div class="servings__nav">
          <button class="btn btn--inactive btn--user">
            <svg class="icon icon--dark icon--med">
              <use href="${icons}#icon-user"></use>
            </svg>
          </button>
          <button class="btn btn--circle btn--add-bookmark">
            <svg class="icon icon--white icon--med">
              <use href="${icons}#icon-bookmark"></use>
            </svg>
          </button>
        </div>
      </div>
    </section>

    <section class="ingredients container">
      <div class="container__secondary">
        <h3 class="text recipe__header">Recipe Ingredients</h3>
        <ul class="ingredients__list">
          ${data.ingredients.map(this._generateIngredientsMarkup).join('')}
        </ul>
      </div>
    </section>

    <section class="directions container">
      <div class="container__secondary">
        <h3 class="text recipe__header">How to cook it</h3>
        <p class="text">This recipe was carefully designed and tested by <b>${data.publisher}</b>. Please check out directions at
          their website.</p>
        <button class="btn btn--rounded btn--rounded--big btn--directions">
          <a href="${data.sourceUrl}" class="text text--right">Directions</a>
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
      <span class="text">${ing.quantity ? new Fraction(ing.quantity).toString() : ''} ${ing.unit ? ing.unit : ''} ${ing.description}</span>
    </li>
    `;
  } 

  renderSpinner() {
    return `
    <div class="spinner spinner--search">
      <svg class="icon icon--accent icon--xl">
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
    `; 
  }

  updateHTML(data) {
    const recipeEl = document.querySelector('.recipe');
    recipeEl.innerHTML = '';
    recipeEl.insertAdjacentHTML('afterbegin', this._generateMarkup(data));
    // recipeEl.insertAdjacentHTML('afterbegin', this.renderSpinner());
  }
}

export default new RecipeView();