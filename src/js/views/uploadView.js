import icons from 'url:../../img/icons.svg';
import View from './View';

// for the Upload feature, we will be sending the data to the Forkify API
class UploadView extends View {
  _parentElement = document.querySelector('.upload__form');
  _message = "Recipe was uploaded successfully";
  _errorMessage = "";

  constructor() {
    super();
    this._setUploadDisplayHander();
  }


  _setUploadDisplayHander() {
    const addRecipeBtn = document.querySelector('.btn--add-recipe');
    const uploadCloseBtn = document.querySelector('.btn--close');
    const overlay = document.querySelector('.overlay');

    addRecipeBtn.addEventListener('click', () => {
      this.toggleUploadWindow();
      this._clear();
      this.updateHTML();
      this.clearInvalidIndicatorOnEdit();
      this.setFormSubmitHandler();
    });
    uploadCloseBtn.addEventListener('click', () => this.toggleUploadWindow());
    overlay.addEventListener('click', () => this.toggleUploadWindow());
  }


  toggleUploadWindow() {
    const overlay = document.querySelector('.overlay');
    const uploadSection = document.querySelector('.upload');

    overlay.classList.toggle('invisible');
    uploadSection.classList.toggle('invisible');
  }


  setFormSubmitHandler(handler) {
    const uploadInputFields = document.querySelectorAll('.upload__input-field');

    this._parentElement.addEventListener('submit', function(e) {
      e.preventDefault();

      const data = Object.fromEntries([...new FormData(this)]);

      const dataEntries = Object.entries(data).filter((ing) => {
        if(ing[0].includes('ingredient') && ing[1] !== '') return ing[1];
      }).map((ing) => {
        const ingSpecific = ing[1].split(',');
        const [quantity, unit, description] = ingSpecific;

        // used to get the input field where inputs were added
        // +5 because there are 5 other input fields before ingredients field
        const fieldNumber = parseInt(ing[0].split('-').splice(1, 1)) + 5;

        if((!description) || (!quantity && unit)) {
          uploadInputFields[fieldNumber].classList.add('invalid-input');
        } else {
          return {quantity, unit, description};
        }
      });

      if(!dataEntries.includes(undefined)) handler(data);
    });
  }

  clearInvalidIndicatorOnEdit() {
    this._parentElement.addEventListener('click', function(e) {
      const currInputField = e.target.closest('.upload__input-field');

      if(!currInputField) return;

      if(currInputField.classList.contains('invalid-input')) currInputField.classList.remove('invalid-input');
    });
  }


  renderMessage() {
    const markup = `
    <div class="message">
      <svg class="icon icon--accent  icon--large">
        <use href="${icons}#icon-smile"></use>
      </svg>
      <span class="text">${this._message}</span>
    </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML(`afterbegin`, markup);
  }


  _generateMarkup() {
    return `
      <div class="upload__div">
        <ul class="upload__list">
          <li>
            <h3 class="upload__list__header">Recipe Data</h3>
          </li>
          <li>
            <label class="text" for="upload-title">Title</label>
            <input class="upload__input-field" name="title" type="text" id="upload-title" required>
          </li>
          <li>
            <label class="text" for="upload-url">URL</label>
            <input class="upload__input-field" name="url" type="text" id="upload-url" required>
          </li>
          <li>
            <label class="text" for="upload-img-url">Image URL</label>
            <input class="upload__input-field" name="imageURL" type="text" id="upload-img-url" required>
          </li>
          <li>
            <label class="text" for="upload-publisher">Publisher</label>
            <input class="upload__input-field" name="publisher" type="text" id="upload-publisher" required>
          </li>
          <li>
            <label class="text" for="upload-prep-time">Prep time</label>
            <input class="upload__input-field"name="prepTime"  type="number" id="upload-prep-time" min="1" required>
          </li>
          <li>
            <label class="text" for="upload-servings">Servings</label>
            <input class="upload__input-field" type="number" type="text" id="upload-servings" name="servings" min="1" required>
          </li>
        </ul>
        <ul class="upload__list">
          <li>
            <h3 class="upload__list__header">Ingredients</h3>
          </li>
          <li>
            <label class="text" for="upload-ingredient1">Ingredient 1</label>
            <input class="upload__input-field" type="text" id="upload-ingredient1" placeholder="0.5,kg,Rice" name="ingredient-1">
          </li>
          <li>
            <label class="text" for="upload-ingredient2">Ingredient 2</label>
            <input class="upload__input-field" type="text" id="upload-ingredient2" placeholder="0.5,kg,Rice" name="ingredient-2">
          </li>
          <li>
            <label class="text" for="upload-ingredient3">Ingredient 3</label>
            <input class="upload__input-field" type="text" id="upload-ingredient3" placeholder="0.5,kg,Rice" name="ingredient-3">
          </li>
          <li>
            <label class="text" for="upload-ingredient4">Ingredient 4</label>
            <input class="upload__input-field" type="text" id="upload-ingredient4" name="ingredient-4" placeholder="0.5,kg,Rice">
          </li>
          <li>
            <label class="text" for="upload-ingredient5">Ingredient 5</label>
            <input class="upload__input-field" type="text" id="upload-ingredient5" name="ingredient-5" placeholder="0.5,kg,Rice">
          </li>
          <li>
            <label class="text" for="upload-ingredient6">Ingredient 6</label>
            <input class="upload__input-field" type="text" id="upload-ingredient6" name="ingredient-6" placeholder="0.5,kg,Rice">
          </li>
        </ul>
      </div>
      <button class="btn btn--rounded btn--rounded--big btn--upload">
        <svg class="icon icon--white icon--med">
          <use href="${icons}#icon-upload-cloud"></use>
        </svg>
        <span class="text btn--upload__text text--left">Upload</span>
      </button>
    `;
  }

}

export default new UploadView();