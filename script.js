const activity = document.querySelector('#activity');
const day = document.querySelector('#day');
const hour = document.querySelector('#hour');

const tableBox = document.querySelector('#table');
tableBox.style.visibility = 'hidden';

const activityButton = document.querySelector('#activity-button');

let activities = [];

// Funzione per aggiungere un'attività
function addActivity() {
    if (!activity.value || !day.value || !hour.value) {
        alert('Inserisci tutti i campi (Attività, Giorno, Ora)');
        return;
    }

    const newActivity = {
        task: activity.value,
        dateTime: new Date(`${day.value}T${hour.value}`),
        date: day.value,
        time: hour.value
    };

    activities.push(newActivity);

    // Ordina le attività per data e ora
    activities.sort((a, b) => a.dateTime - b.dateTime);

    renderActivities();

    activity.value = '';
    day.value = '';
    hour.value = '';
}

// Funzione per aggiornare la tabella
function renderActivities() {
    tableBox.innerHTML = ''; // Pulizia tabella

    activities.forEach(activity => {
        const newRow = document.createElement('tr');
        const newCell = document.createElement('td');
        const newCellDay = document.createElement('td');
        const newCellHour = document.createElement('td');

        newCell.textContent = activity.task;
        newCellDay.textContent = activity.date;
        newCellHour.textContent = activity.time;

        newRow.appendChild(newCell);
        newRow.appendChild(newCellDay);
        newRow.appendChild(newCellHour);

        tableBox.appendChild(newRow);
    });

    tableBox.style.visibility = activities.length > 0 ? 'visible' : 'hidden';
}

activityButton.addEventListener('click', addActivity);



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