import '../pages/index.css';
import { createCard, likeCard, deleteCard } from './card.js';
import { openModal, closeModal, setEventListeners } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { getUserInfo, getInitialCards, sendUserInfo, sendNewCard, changeAvatar } from './api.js';

// Темплейт карточки
const cardsContainer = document.querySelector('.places__list');

// DOM узлы
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeEditAvatar = document.querySelector('.popup_type_edit-avatar');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const popup = document.querySelectorAll('.popup');
const formEditProfile = document.querySelector('form[name="edit-profile"]');
const nameInput = formEditProfile.querySelector('input[name="name"]');
const aboutInput = formEditProfile.querySelector('input[name="description"]');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formEditAvatar = document.querySelector('form[name="edit-avatar"]');
const linkAvatarInput = formEditAvatar.querySelector('input[name="link-avatar"]');
const formNewPlace = document.querySelector('form[name="new-place"]');
const placeInput = formNewPlace.querySelector('input[name="place-name"]');
const linkInput = formNewPlace.querySelector('input[name="link"]');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const profileImage = document.querySelector('.profile__image');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

//Замена текста на кнопке при загрузке данных
function renderLoading(popupType, isLoading) {
  const popupButton = popupType.querySelector('.popup__button');
  if (isLoading) {
    popupButton.textContent = 'Сохранение...';
  } else {
    popupButton.textContent = 'Сохранить';
  }
}

//Редактирование профиля
function editProfileSubmit(evt) {
  evt.preventDefault();
  renderLoading(popupTypeEdit, true);
  sendUserInfo(nameInput.value, aboutInput.value)
  .then((data) => {
    profileTitle.textContent = data.name;
    profileDescription.textContent = data.about;
    closeModal(popupTypeEdit);
  }) 
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(popupTypeEdit, false);
  });
}

//Редактирование аватара
function editAvatarSubmit(evt) {
  evt.preventDefault();
  renderLoading(popupTypeEditAvatar, true);
  changeAvatar(linkAvatarInput.value)
  .then((data) => {
    profileImage.style.backgroundImage = `url(${data.avatar})`;
    closeModal(popupTypeEditAvatar);
  }) 
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(popupTypeEditAvatar, false);
  });
}

//Добавление новой карточки
function addCardSubmit(evt) {
  evt.preventDefault();
  renderLoading(popupTypeNewCard, true);
  sendNewCard(placeInput.value, linkInput.value)
  .then((item) => {
    cardsContainer.prepend(createCard(item, openImage, likeCard, userId, deleteCard));
    closeModal(popupTypeNewCard);
  }) 
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(popupTypeNewCard, false);
  });
}

//Открытие попапа изображения карточки
function openImage({name, link}) {
  openModal(popupTypeImage);
  popupCaption.textContent = name;
  popupImage.src = link;
  popupImage.alt = name;
}

formEditProfile.addEventListener('submit', editProfileSubmit);
formNewPlace.addEventListener('submit', addCardSubmit);
formEditAvatar.addEventListener('submit', editAvatarSubmit);

// Открытие попапа для добавления карточки
buttonAddCard.addEventListener('click', () => {
  formNewPlace.reset();
  clearValidation(formNewPlace, validationConfig);
  openModal(popupTypeNewCard);
});

// Открытие попапа для редактирования профиля
buttonEditProfile.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  aboutInput.value = profileDescription.textContent;
  openModal(popupTypeEdit);
  clearValidation(formEditProfile, validationConfig);
});

// Открытие попапа для обновления аватара
profileImage.addEventListener('click', () => {
  formEditAvatar.reset();
  clearValidation(formEditAvatar, validationConfig);
  openModal(popupTypeEditAvatar);
});

//Валидация форм
enableValidation(validationConfig); 

let userId;

Promise.all([getUserInfo(), getInitialCards()])
  .then(
    ([dataUser, dataCards]) => {
    //Вывод информации о пользователе с сервера
    profileTitle.textContent = dataUser.name;
    profileDescription.textContent = dataUser.about;
    profileImage.style.backgroundImage = `url(${dataUser.avatar})`;

    userId = dataUser._id;

    //Вывод карточек с сервера
    dataCards.forEach((item) => {
      cardsContainer.append(createCard(item, openImage, likeCard, userId, deleteCard));
    });
  })
  .catch((err) => {
    console.log(err);
  });

//Закрытие попапов
setEventListeners(popupTypeEdit);
setEventListeners(popupTypeEditAvatar);
setEventListeners(popupTypeNewCard);
setEventListeners(popupTypeImage);

//Добавление анимации попапам
popup.forEach((item) => {
  item.classList.add('popup_is-animated');
});

// Вывод карточек при открытии страницы
//initialCards.forEach((item) => {
//  cardsContainer.append(createCard(item, openImage, likeCard, deleteCard));
//});
