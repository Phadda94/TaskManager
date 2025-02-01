import { getCurrentUser, deleteUser } from './storage.js';

export function createUserNameBox() {
  const usernameBox = document.querySelector('#username-box');
  
  // Pulisce il contenuto precedente del box
  usernameBox.innerHTML = '';

  const currentUser = getCurrentUser();

  if (currentUser) {
    // Crea l'elemento con il nome dell'utente
    const usernameText = document.createElement('p');
    usernameText.id = 'username-text';
    usernameBox.appendChild(usernameText);
    usernameText.textContent = currentUser;

    const usernameBin = document.createElement('button');
    usernameBin.innerHTML = '<span class="material-symbols-outlined">delete</span>';
    usernameBin.id = 'username-bin';
    usernameBox.appendChild(usernameBin);

    // Evento per eliminare il profilo utente
    usernameBin.addEventListener('click', () => {
      deleteUser();
      alert(`User ${currentUser} has been deleted.`);
      createUserNameBox(); // Aggiorna il box
    });
  } else {
    // Se non c'è un utente loggato, mostra "Login"
    const loginBox = document.createElement('p');
    loginBox.id = 'login-box';
    loginBox.textContent = 'Login';
    usernameBox.appendChild(loginBox);

    loginBox.addEventListener('click', () => {
      const username = prompt("Enter your username to login:");
      if (username && username.trim()) {
        location.reload(); // Aggiorna la pagina per simulare un nuovo login
      } else {
        alert("Please enter a valid username.");
      }
    });
  }
}
