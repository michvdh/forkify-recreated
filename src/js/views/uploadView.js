import icons from 'url:../../img/icons.svg';
import View from './View';

// for the Upload feature, we will be sending the data to the Forkify API

class UploadView extends View {
  _parentElement = document.querySelector('.upload__form');
  _message = "Recipe was uploaded successfully";

  constructor() {
    super();
    this._setUploadDisplayHander();
  }


  _setUploadDisplayHander() {
    const addRecipeBtn = document.querySelector('.btn--add-recipe');
    const uploadCloseBtn = document.querySelector('.btn--close');
    const uploadSection = document.querySelector('.upload');
    const overlay = document.querySelector('.overlay');

    addRecipeBtn.addEventListener('click', () => this.toggleUploadWindow());
    uploadCloseBtn.addEventListener('click', () => this.toggleUploadWindow());
    overlay.addEventListener('click', () => this.toggleUploadWindow());
  }


  toggleUploadWindow() {
    const overlay = document.querySelector('.overlay');
    const uploadSection = document.querySelector('.upload');

    overlay.classList.toggle('invisible');
    uploadSection.classList.toggle('invisible');

    // remove comment for code below later. Will need value for testing for now
    // uploadInputField.forEach((field) => field.value = '');
  }


  setFormSubmitHandler(handler) {
    this._parentElement.addEventListener('submit', function(e) {
      e.preventDefault();

      const data = Object.fromEntries([...new FormData(this)]);

      handler(data);
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

    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML(`afterbegin`, markup);
  }

}

export default new UploadView();