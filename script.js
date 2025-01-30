const activityInput = document.querySelector('#activity');
const dayInput = document.querySelector('#day');
const activityButton = document.querySelector('#activity-button');
const tableBox = document.querySelector('#table');

let activities = [];


// Function to add an activity
function addActivity() {
  if (!activityInput.value || !dayInput.value || !hourDropdown.value) {
    alert('Please fill in all fields (Activity, Day, Hour)');
    return;
  }
  
  const newActivity = {
    id: Date.now(), // Unique identifier for each activity
    task: activityInput.value,
    date: dayInput.value,
    time: hourDropdown.value,
    dateTime: new Date(`${dayInput.value}T${hourDropdown.value}`)
  };
  
  activities.push(newActivity);
  activities.sort((a, b) => a.dateTime - b.dateTime);
  
  setTimeout(() => {
    renderActivities();
    console.log("Activities after render (inside setTimeout):", activities);
  }, 200);
  
  activityInput.value = '';
  dayInput.value = '';
  hourDropdown.selectedIndex = 0;
}



// Function to render activities in the table
function renderActivities() {
  tableBox.innerHTML = `
  <tr>
  <th>Activity</th>
  <th>Day</th>
  <th>Hour</th>
  <th>Completed</th>
  <th>Delete</th>
  </tr>  
  `;
  
  activities.forEach(activity => {
    const newRow = document.createElement('tr');
    const taskCell = document.createElement('td');
    const dateCell = document.createElement('td');
    const timeCell = document.createElement('td');
    
    taskCell.textContent = activity.task;
    dateCell.textContent = activity.date;
    timeCell.textContent = activity.time;
    
    // Checkbox for marking the task as completed
    const checkCell = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', () => {
      newRow.classList.toggle('checked', checkbox.checked);
    });
    checkCell.appendChild(checkbox);
    
    // Delete button
    const deleteCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '🗑️';
    deleteButton.addEventListener('click', () => deleteActivity(activity.id));
    deleteCell.appendChild(deleteButton);
    
    newRow.appendChild(taskCell);
    newRow.appendChild(dateCell);
    newRow.appendChild(timeCell);
    newRow.appendChild(checkCell);
    newRow.appendChild(deleteCell);
    tableBox.appendChild(newRow);
  });
  
  tableBox.style.visibility = activities.length ? 'visible' : 'hidden';
}



// Function to delete an activity by id
function deleteActivity(id) {
  activities = activities.filter(activity => activity.id !== id);
  renderActivities();
}



// Event listener for adding an activity
activityButton.addEventListener('click', addActivity);
console.log(activities);



// Time options
const hourDropdown = document.querySelector('#hour');
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



/* ################# STORAGE FUNCTIONS ################

//SAVE ACTIVITIES FUNCTION
function saveActivity(activityValue) {
  let activities = JSON.parse(localStorage.getItem('activities')) || [];
  activities.push(activityValue);
  localStorage.setItem('activities', JSON.stringify(activities));
}

//LOAD ACTIVITIES FUNCTION
function loadActivities() {
  const activities = JSON.parse(localStorage.getItem('activities')) || [];
  if (activities.length > 0) {
    tableBox.style.visibility = 'visible';
  }
  activities.forEach(activityValue => {
    const newRow = document.createElement('tr');
    const newCell = document.createElement('td');
    newCell.textContent = activityValue;
    newRow.appendChild(newCell);
    tableBox.appendChild(newRow);
  });
}
*/
