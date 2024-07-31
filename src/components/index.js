import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, likeCard, deleteCard } from './card.js';
import { openModal, closeModal, setEventListeners } from './modal.js';

// Темплейт карточки
const cardsContainer = document.querySelector('.places__list');

// DOM узлы
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const popup = document.querySelectorAll('.popup');
const formEditProfile = document.querySelector('form[name="edit-profile"]');
const nameInput = formEditProfile.querySelector('input[name="name"]');
const jobInput = formEditProfile.querySelector('input[name="description"]');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formNewPlace = document.querySelector('form[name="new-place"]');
const placeInput = formNewPlace.querySelector('input[name="place-name"]');
const linkInput = formNewPlace.querySelector('input[name="link"]');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

//Редактирование профиля
function editProfileSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupTypeEdit);
}

//Добавление новой карточки
function addCardSubmit(evt) {
  evt.preventDefault();
  const name = placeInput.value;
  const link = linkInput.value;
  cardsContainer.prepend(createCard({ name, link }, openImage, likeCard, deleteCard));
  closeModal(popupTypeNewCard);
  formNewPlace.reset();
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

// Открытие попапа для добавления карточки
buttonAddCard.addEventListener('click', () => openModal(popupTypeNewCard));

// Открытие попапа для редактирования профиля
buttonEditProfile.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupTypeEdit);
});

//Закрытие попапов
setEventListeners(popupTypeEdit);
setEventListeners(popupTypeNewCard);
setEventListeners(popupTypeImage);

//Добавление анимации попапам
popup.forEach((item) => {
  item.classList.add('popup_is-animated');
});

// Вывод карточек при открытии страницы
initialCards.forEach((item) => {
  cardsContainer.append(createCard(item, openImage, likeCard, deleteCard));
});