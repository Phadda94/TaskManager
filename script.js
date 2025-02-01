const activityInput = document.querySelector('#activity');
const dayInput = document.querySelector('#day');
const activityButton = document.querySelector('#activity-button');
const tableBox = document.querySelector('#table');
const hourDropdown = document.querySelector('#hour');
let currentUser = null;



// Carica utenti dal localStorage
let users = JSON.parse(localStorage.getItem('users')) || [];



// Funzione per aggiungere un'attività
function addActivity() {
  if (!currentUser) {
    alert('You must log in first!');
    return;
  }

  if (!activityInput.value || !dayInput.value || !hourDropdown.value) {
    alert('Please fill in all fields (Activity, Day, Hour)');
    return;
  }

  const capitalizedTask = capitalizeFirstLetter(activityInput.value.trim());

  const newActivity = {
    id: Date.now(),
    task: capitalizedTask,
    date: dayInput.value,
    time: hourDropdown.value,
    completed: false, // Stato completato inizialmente false
    dateTime: new Date(`${dayInput.value}T${hourDropdown.value}`)
  };
   
  const userIndex = users.findIndex(user => user.username === currentUser.toLowerCase());
  
  if (userIndex >= 0) {
    users[userIndex].activities.push(newActivity);
    users[userIndex].activities.sort((a, b) => a.dateTime - b.dateTime);
    saveUsers();
  }
  
  renderActivities();
  activityInput.value = '';
  dayInput.value = '';
  hourDropdown.selectedIndex = 0;
}


function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}



// Funzione per salvare gli utenti nel localStorage
function saveUsers() {
  localStorage.setItem('users', JSON.stringify(users));
}



// Funzione per rendere visibili le attività
function renderActivities() {
  const user = users.find(user => user.username === currentUser);
  tableBox.innerHTML = `
  <tr>
  <th>Activity</th>
  <th>Day</th>
  <th>Hour</th>
  <th>Check</th>
  <th>Delete</th>
  </tr>  
  `;

  if (!user || !user.activities.length) {
    tableBox.style.visibility = 'hidden';
    return;
  }

  user.activities.forEach(activity => {
    const newRow = document.createElement('tr');
    const taskCell = document.createElement('td');
    const dateCell = document.createElement('td');
    const timeCell = document.createElement('td');

    taskCell.textContent = activity.task;
    dateCell.textContent = activity.date;
    timeCell.textContent = activity.time;

    const checkCell = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `checkbox-${activity.id}`;

    // Mantieni lo stato del checkbox e applica lo stile
    checkbox.checked = !!activity.completed;
    if (checkbox.checked) {
      newRow.classList.add('checked');
    }

    checkbox.addEventListener('change', () => {
      newRow.classList.toggle('checked', checkbox.checked);
      activity.completed = checkbox.checked;  // Salva lo stato del checkbox
      saveUsers();  // Salva nel localStorage
    });

    checkCell.appendChild(checkbox);

    const deleteCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.innerHTML = '<span class="material-symbols-outlined">delete</span>';
    deleteButton.addEventListener('click', () => deleteActivity(activity.id));
    deleteCell.appendChild(deleteButton);

    newRow.appendChild(taskCell);
    newRow.appendChild(dateCell);
    newRow.appendChild(timeCell);
    newRow.appendChild(checkCell);
    newRow.appendChild(deleteCell);
    tableBox.appendChild(newRow);
  });


  tableBox.style.visibility = 'visible';
}



function deleteActivity(id) {
  const userIndex = users.findIndex(user => user.username === currentUser);
  if (userIndex >= 0) {
    users[userIndex].activities = users[userIndex].activities.filter(activity => activity.id !== id);
    saveUsers();
  }
  renderActivities();
}

// Event listener per aggiungere attività
activityButton.addEventListener('click', addActivity);

// Aggiunta opzioni per l'orario
for (let h = 0; h < 24; h++) {
  for (let m = 0; m < 60; m += 30) {
    const hour = h.toString().padStart(2, '0');
    const minute = m.toString().padStart(2, '0');
    const timeString = `${hour}:${minute}`;
    const option = document.createElement('option');
    option.value = timeString;
    option.textContent = timeString;
    hourDropdown.appendChild(option);
  }
}

// Simulazione di login
function login(username) {
  // Converti l'username in minuscolo
  currentUser = username.trim().toLowerCase();

  if (!users.find(user => user.username === currentUser)) {
    alert("User not found. Registering new user...");
    users.push({ username: currentUser, activities: [] });
    saveUsers();
  }

  alert(`Welcome, ${currentUser}!`);
  renderActivities();
  createUserNameBox();
}

// Simula il login di un utente
const username = prompt("Enter your username to login:");
if (username && username.trim()) {
  login(username);  // Solo se l'utente inserisce un nome
} else {
  alert("You must enter a username.");
  promptLogin()
}

function promptLogin() {
  let username = prompt("Enter your username to login:");
  if (username && username.trim()) {
    login(username.toLowerCase());  // Forza il lowercase anche qui
  } else {
    alert("You must enter a valid username.");
    promptLogin();  // Riprova il login
  }
}


function createUserNameBox() {
  const usernameBox = document.querySelector('#username-box');
  
  // Pulisce il contenuto precedente del box (rimuove sia "Login" che il nome utente precedente)
  usernameBox.innerHTML = '';

  if (currentUser) {  // Se c'è un utente loggato
    // Crea l'elemento con il nome dell'utente
    const usernameText = document.createElement('p');
    usernameText.id = 'username-text';
    usernameBox.appendChild(usernameText);
    usernameText.textContent = currentUser;  // Mostra il nome dell'utente
    
    const usernameBin = document.createElement('button');
    usernameBin.innerHTML = '<span class="material-symbols-outlined">delete</span>';
    usernameBin.id = 'username-bin';
    usernameBox.appendChild(usernameBin);
    
    // Aggiungi l'evento per il pulsante di eliminazione dell'account
    usernameBin.addEventListener('click', deleteUser);
  } else {
    // Se non c'è un utente loggato, aggiungi il testo "Login"
    const loginBox = document.createElement('p');
    loginBox.id = 'login-box';
    loginBox.textContent = 'Login';  // Mostra "Login" quando l'utente non è loggato
    usernameBox.appendChild(loginBox);
    
    // Aggiungi l'evento per il login
    loginBox.addEventListener('click', promptLogin);  // Passa la funzione senza chiamarla subito
  }
}

function deleteUser() {
  // Rimuove l'utente attualmente loggato
  users = users.filter(user => user.username !== currentUser);
  saveUsers();

  // Aggiungi un messaggio di conferma per il delete
  alert(`User ${currentUser} has been deleted.`);

  // Rimuove l'elemento dell'username dalla UI
  currentUser = null;  // Impostiamo currentUser a null per indicare che non siamo più loggati
  renderActivities();   // Pulisce la lista delle attività

  // Pulisce il box dell'username
  createUserNameBox();  // Chiamata per aggiornare il box dell'username
}
