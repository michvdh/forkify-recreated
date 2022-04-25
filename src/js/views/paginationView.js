import icons from 'url:../../img/icons.svg';

class PaginationView {
  _generateMarkup(currentPage, totalPages) {
    const btnStatus = this._setBtnVisibility(currentPage, totalPages);

    return `
    <button class="btn btn--page btn--rounded btn--rounded--small btn--prev ${btnStatus.prevBtnVisibility}">
      <svg class="icon icon--accent icon--xs">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span class="text text--pagination">Page ${currentPage - 1}</span>
    </button>

    <button class="btn btn--page btn--rounded btn--rounded--small btn--next  ${btnStatus.nextBtnVisibility}">
      <span class="text text--pagination">Page ${currentPage + 1}</span>
      <svg class="icon icon--accent icon--xs">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>    
    `;
  }

  _setBtnVisibility(currentPage, totalPages) {
    if(currentPage == 1) {
      return {
        prevBtnVisibility: 'invisible',
        nextBtnVisibility: ''
      };
    }

    if(currentPage == totalPages) {
      return {
        prevBtnVisibility: '',
        nextBtnVisibility: 'invisible'
      };
    }

    if(currentPage > 1 && currentPage < totalPages) {
      return {
        prevBtnVisibility: '',
        nextBtnVisibility: ''
      };
    }
  }

  btnHandler(currentPage, handler) {
    const btnPrev = document.querySelector('.btn--prev');
    const btnNext = document.querySelector('.btn--next');
    
    btnPrev.addEventListener('click', function() {
      handler(currentPage - 1);
    });

    btnNext.addEventListener('click', function() {
      handler(currentPage + 1);
    });
  }

  updateHTML(currentPage, totalPages) {
    const paginationNav = document.querySelector('.result__pagination');

    paginationNav.innerHTML = '';
    paginationNav.insertAdjacentHTML('afterbegin', this._generateMarkup(currentPage, totalPages));
  }
}

export default new PaginationView();