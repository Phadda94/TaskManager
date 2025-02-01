import { login } from './login.js';

document.addEventListener('DOMContentLoaded', () => {
  const username = prompt("Enter your username to login:");
  if (username) {
    login(username.trim());
  } else {
    alert("You must enter a username.");
  }
});