// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

// @todo: DOM узлы

// @todo: Функция создания карточки
function createCard (item, deleteCard) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const deleteButton = card.querySelector('.card__delete-button');
  cardImage.src = item.link;
  cardTitle.textContent = item.name;
  cardImage.alt = item.name;
  deleteButton.addEventListener('click', deleteCard);
  return card;
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
  evt.target.closest('.card').remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  placesList.append(createCard(item, deleteCard));
});