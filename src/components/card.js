const cardTemplate = document.querySelector('#card-template').content;
import { deleteDataCard, likeDataCard, deleteLikeDataCard } from './api.js';

// Создаем карточку
export function createCard(item, openImage, likeCard, userId, deleteCard) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const deleteButton = card.querySelector('.card__delete-button');
  const likeButton = card.querySelector('.card__like-button');
  const likeCounter = card.querySelector('.card__like-counter');
  cardImage.src = item.link;
  cardTitle.textContent = item.name;
  cardImage.alt = item.name;
  likeCounter.textContent = item.likes.length;

  //Удаляем иконку корзины и вешаем слушатель на кнопку удаления
  if (item.owner._id === userId) {
    deleteButton.addEventListener('click', () => deleteCard(item._id, card));
  } else {
    deleteButton.remove();
  }

  //Закрашиваем свои лайки
  if (item.likes.some((like) => like._id === userId)) {
     likeButton.classList.add('card__like-button_is-active');
  }
  
  likeButton.addEventListener('click', () => likeCard(item._id, likeCounter, likeButton));
  cardImage.addEventListener('click', () => openImage(item));
  return card;
}

//Обработка кнопки лайка
export function likeCard(cardId, likeCounter, likeButton) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  if (isLiked) {
    likeButton.classList.remove('card__like-button_is-active');
    deleteLikeDataCard(cardId)
    .then((data) => {
      likeCounter.textContent = data.likes.length;
    }) 
    .catch((err) => {
      console.log(err);
    });
  } else {
    likeButton.classList.add('card__like-button_is-active');
    likeDataCard(cardId)
    .then((data) => {
      likeCounter.textContent = data.likes.length;
    }) 
    .catch((err) => {
      console.log(err);
    });
  }
}

// Удаление карточки
export function deleteCard(cardId, item) {
  deleteDataCard(cardId)
  .then(() => {
  item.remove();
}) 
.catch((err) => {
  console.log(err);
});
}