//Открытие попапа
export function openModal(modal) {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeEsc);
}

//Закрытие попапа
export function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeEsc);
}

//Закрытие попапа кнопкой Esc
function closeEsc(evt) {
  if (evt.key === 'Escape') {
    const popupIsOpened = document.querySelector('.popup_is-opened');
    closeModal(popupIsOpened);
  }
};

//Закрытие попапа кликом по крестику и оверлею
export function setEventListeners (modal) {
  const popupClose = modal.querySelector('.popup__close');
  popupClose.addEventListener('click', () => {
    closeModal(modal);
  });
  modal.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closeModal(modal);
    }
  });
}