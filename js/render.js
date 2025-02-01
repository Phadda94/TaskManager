import { getUsers, getCurrentUser, saveUsers } from './storage.js';

const tableBox = document.querySelector('#table');

export function renderActivities() {
  const users = getUsers();
  const user = users.find(user => user.username === getCurrentUser());

  tableBox.innerHTML = `
    <tr>
      <th>Activity</th>
      <th>Day</th>
      <th>Hour</th>
      <th>Check</th>
      <th>Delete</th>
    </tr>`;

  if (!user || !user.activities.length) {
    tableBox.style.visibility = 'hidden';
    return;
  }

  user.activities.forEach(activity => {
    const newRow = document.createElement('tr');

    const taskCell = document.createElement('td');
    taskCell.textContent = activity.task;

    const dateCell = document.createElement('td');
    dateCell.textContent = activity.date;

    const timeCell = document.createElement('td');
    timeCell.textContent = activity.time;

    // Casella di Check
    const checkCell = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!activity.completed;
    
    if (checkbox.checked) {
      newRow.classList.add('checked');
    }

    checkbox.addEventListener('change', () => {
      newRow.classList.toggle('checked', checkbox.checked);
      activity.completed = checkbox.checked;
      saveUsers(); // Salva nel localStorage
    });

    checkCell.appendChild(checkbox);

    // Bottone Cestino
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
  const users = getUsers();
  const user = users.find(user => user.username === getCurrentUser());
  
  if (user) {
    user.activities = user.activities.filter(activity => activity.id !== id);
    saveUsers(); // Salva nel localStorage
    renderActivities(); // Ricarica la tabella
  }
}
