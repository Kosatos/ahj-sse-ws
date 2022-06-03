export default class Message {
  constructor(username, message, date) {
    this.username = username;
    this.message = message;
    this.date = new Date(date);
  }

  render() {
    this.messageEl = document.createElement('li');
    this.messageEl.className = 'chat__message message-chat';
    this.messageInfoEl = document.createElement('span');
    this.messageInfoEl.className = 'message-chat__info';
    this.messageInfoEl.textContent = `${this.username}, ${this.formatDate()}`;
    this.messageTextEl = document.createElement('span');
    this.messageTextEl.className = 'message-chat__text';
    this.messageTextEl.textContent = this.message;

    this.messageEl.appendChild(this.messageInfoEl);
    this.messageEl.appendChild(this.messageTextEl);
    return this.messageEl;
  }

  formatDate() {
    const day =
      this.date.getDate() < 10
        ? `0${this.date.getDate()}`
        : this.date.getDate();
    const month =
      this.date.getMonth() < 10
        ? `0${this.date.getMonth()}`
        : this.date.getMonth();
    const year = String(this.date.getFullYear()).slice(-2);
    const hour =
      this.date.getHours() < 10
        ? `0${this.date.getHours()}`
        : this.date.getHours();
    const minute =
      this.date.getMinutes() < 10
        ? `0${this.date.getMinutes()}`
        : this.date.getMinutes();
    const formattedDate = `${hour}:${minute} ${day}.${month}.${year}`;

    return formattedDate;
  }
}
