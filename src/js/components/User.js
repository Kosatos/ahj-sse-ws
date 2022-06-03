export default class User {
  constructor(username) {
    this.username = username;
  }

  render() {
    this.userEl = document.createElement('li');
    this.userEl.className = 'chat__user user';
    this.userAvatar = document.createElement('div');
    this.userAvatar.className = 'user__avatar';
    this.usernameEl = document.createElement('span');
    this.usernameEl.className = 'user__name';
    this.usernameEl.textContent = this.username;

    this.userEl.appendChild(this.userAvatar);
    this.userEl.appendChild(this.usernameEl);
    return this.userEl;
  }
}
