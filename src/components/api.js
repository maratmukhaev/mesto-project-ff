const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-20',
  headers: {
    authorization: 'fadfe3c0-2ca2-4011-9260-76e880b0299f',
    'Content-Type': 'application/json'
  }
}

const checkStatus = (res) => {
  if (res.ok) {
    return res.json();  
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

//Запрос информации о пользователе с сервера
export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(checkStatus);
}

//Запрос списка карточек с сервера
export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
    .then(checkStatus);
}

//Обновление профиля пользователя
export const sendUserInfo = (userName, userAbout) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: userName,
      about: userAbout
    })
  })
  .then(checkStatus);
}

//Обновление аватара
export const changeAvatar = (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink
    })
  })
  .then(checkStatus);
}

//Добавление новой карточки
export const sendNewCard = (cardName, cardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  })
  .then(checkStatus);
}

//Удаление карточки
export const deleteDataCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
    body: JSON.stringify({
      _id: cardId
    })
  })
  .then(checkStatus);
}

//Отправка лайка
export const likeDataCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
    body: JSON.stringify({
      _id: cardId
    })
  })
  .then(checkStatus);
}

//Удаление лайка
export const deleteLikeDataCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
    body: JSON.stringify({
      _id: cardId
    })
  })
  .then(checkStatus);
}