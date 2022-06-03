import User from './components/User';
import Message from './components/Message';

window.onload = () => {
  const ws = new WebSocket('ws://localhost:8080');

  const chooseUsernamePopup = document.querySelector('.choose-username-popup');
  const chooseUsernameForm = document.querySelector('.choose-username-form');
  const chatForm = document.getElementById('chat-form');
  const popupOverlay = document.querySelector('.alarm-popup');
  const popup = document.querySelector('.alarm-popup__container');
  const close = document.querySelector('.alarm-popup__close');

  const chat = document.querySelector('.chat');
  const users = chat.querySelector('.chat__users');
  const messages = chat.querySelector('.chat__messages');

  ws.onmessage = (message) => {
    const data = JSON.parse(message.data);

    if (data.renderUsers) {
      data.names.forEach((name) => {
        users.appendChild(new User(name).render());
        return;
      });
    }

    if (data.nameIsFree) {
      chooseUsernamePopup.classList.add('hidden');
      chat.classList.remove('hidden');
      const user = new User(data.name).render();
      user.classList.add('current-user');
      users.appendChild(user);
      return;
    } else if (data.nameIsFree === false) {
      popupOverlay.classList.remove('hidden');
      console.log('Имя занято. Выберите другое имя.');
    }

    if (data.renderNames) {
      users.appendChild(new User(data.name).render());
      return;
    }

    if (data.closeUser) {
      const users = [...document.querySelectorAll('.user')];
      users.forEach((user) => {
        if (user.querySelector('.user__name').textContent === data.name) {
          user.remove();
          return;
        }
      });
    }

    if (data.renderOwnMessage) {
      const ownMessage = new Message(
        data.name,
        data.message,
        data.date
      ).render();
      ownMessage.classList.add('own-message');
      messages.appendChild(ownMessage);
    }

    if (data.renderMessage) {
      messages.appendChild(
        new Message(data.name, data.message, data.date).render()
      );
    }

    if (data.renderMessages) {
      data.messages.forEach((mes) => {
        messages.appendChild(
          new Message(mes.name, mes.message, mes.date).render()
        );
      });
    }
  };

  chooseUsernameForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const username = document.getElementById('username').value;
    ws.send(JSON.stringify({ username: username, chooseUsername: true }));
    evt.currentTarget.reset();
  });

  chatForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const messageText = document.getElementById('message').value;
    ws.send(
      JSON.stringify({
        chatMessage: true,
        messageText: messageText,
      })
    );
    evt.currentTarget.reset();
  });

  popupOverlay.addEventListener('click', function (event) {
    if (event.target !== popup && !popup.contains(event.target)) {
      popupOverlay.classList.add('hidden');
    }
  });

  close.addEventListener('click', function (event) {
    popupOverlay.classList.add('hidden');
  });
};
