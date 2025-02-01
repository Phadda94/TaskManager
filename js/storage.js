let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = null;

export function getUsers() {
  return users;
}

export function setUsers(newUsers) {
  users = newUsers;
  saveUsers();
}

export function getCurrentUser() {
  return currentUser;
}

export function setCurrentUser(username) {
  currentUser = username;
}

export function saveUsers() {
  localStorage.setItem('users', JSON.stringify(users));
}

export function deleteUser() {
    users = users.filter(user => user.username !== currentUser);
    saveUsers();
    currentUser = null;
    localStorage.removeItem('currentUser');
  }