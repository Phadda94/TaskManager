import { getUsers, setUsers, getCurrentUser, setCurrentUser} from './storage.js';
import { renderActivities } from './render.js';
import { createUserNameBox } from './userbox.js';

export function login(username) {
  setCurrentUser(username.toLowerCase());

  let users = getUsers();
  if (!users.find(user => user.username === getCurrentUser())) {
    alert("User not found. Registering new user...");
    users.push({ username: getCurrentUser(), activities: [] });
    setUsers(users);
  }

  alert(`Welcome, ${getCurrentUser()}!`);
  renderActivities();
  createUserNameBox();

}
