
const calendar = document.getElementById('calendar');
const monthYear = document.getElementById('monthYear');
const prevMonth = document.getElementById('prevMonth');
const nextMonth = document.getElementById('nextMonth');
const menstrualDateInput = document.getElementById('menstrualDate');
const saveDateButton = document.getElementById('saveDate');

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let menstrualDates = JSON.parse(localStorage.getItem('menstrualDates')) || {};

// Function to generate the calendar
function generateCalendar(month, year) {
  calendar.innerHTML = '';
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  monthYear.textContent = `${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}`;

  // Create blank days for the first week
  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement('div');
    calendar.appendChild(emptyCell);
  }

  // Create days with menstrual reminders
  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement('div');
    dayElement.classList.add('day');
    dayElement.innerHTML = `<strong>${day}</strong>`;

    const dateKey = `${year}-${month + 1}-${day}`;

    // Check if this day is a menstrual reminder
    if (menstrualDates[dateKey]) {
      dayElement.classList.add('period-day');
      dayElement.innerHTML += `<div class="reminder">Period Reminder</div>`;
    }

    calendar.appendChild(dayElement);
  }
}

// Save the menstrual start date and set reminders for the next months
saveDateButton.addEventListener('click', () => {
  const selectedDate = new Date(menstrualDateInput.value);
  if (isNaN(selectedDate)) {
    alert('Please select a valid date.');
    return;
  }
  const deleteDateButton = document.getElementById('deleteDate');

deleteDateButton.addEventListener('click', () => {
  if (confirm("Are you sure you want to delete all saved menstrual dates?")) {
    localStorage.removeItem('menstrualDates');
    menstrualDates = {};
    alert("All saved menstrual dates have been deleted.");
    generateCalendar(currentMonth, currentYear);
  }
});

  const cycleLength = 28; // You can customize the cycle length
  for (let i = 0; i < 12; i++) { // Set reminders for the next 12 months
    const reminderDate = new Date(selectedDate);
    reminderDate.setDate(reminderDate.getDate() + i * cycleLength);
    const dateKey = `${reminderDate.getFullYear()}-${reminderDate.getMonth() + 1}-${reminderDate.getDate()}`;
    menstrualDates[dateKey] = true;
  }

  localStorage.setItem('menstrualDates', JSON.stringify(menstrualDates));
  alert('Menstrual dates saved and reminders set!');
  generateCalendar(currentMonth, currentYear);
});

// Navigation for previous and next month
prevMonth.addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  generateCalendar(currentMonth, currentYear);
});

nextMonth.addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  generateCalendar(currentMonth, currentYear);
});

// Initialize the calendar
generateCalendar(currentMonth, currentYear);
