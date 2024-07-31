const cardTemplate = document.querySelector('#card-template').content;

// Создание карточки
export function createCard (item, openImage, likeCard, deleteCard) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const deleteButton = card.querySelector('.card__delete-button');
  const likeButton = card.querySelector('.card__like-button');
  cardImage.src = item.link;
  cardTitle.textContent = item.name;
  cardImage.alt = item.name;
  cardImage.addEventListener('click', () => openImage(item));
  likeButton.addEventListener('click', () => likeCard(likeButton));
  deleteButton.addEventListener('click', () => deleteCard(card));
  return card;
}

//Функция-обработчик события лайка карточки
export function likeCard(item) {
  item.classList.toggle('card__like-button_is-active');
}

// Функция-обработчик события удаления карточки
export function deleteCard(item) {
  item.remove();
}