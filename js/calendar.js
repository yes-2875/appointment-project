const today = new Date(); // Gets current day
const month = today.getMonth() // Based on the day, gets the month
const year = today.getFullYear() // Based on the day, gets the year
const firstDay = new Date(year, month, 1); //Gets first day of the month
const dayWeek = firstDay.getDay(); // Gets the day of the week
const daysInMonth = new Date(year, month+1, 0).getDate() // i'll be honest, idk


const monthDisp = document.getElementById("Month")
console.log(month)
switch(month) {
    case 0: monthDisp.innerText = "January"; break; // Jan
    case 1: monthDisp.innerText = "Feburary"; break; // Feburary
    case 2: monthDisp.innerText = "March"; break; // March
    case 3: monthDisp.innerText = "April"; break; // April
    case 4: monthDisp.innerText = "May"; break; // May
    case 5: monthDisp.innerText = "June"; break; // June
    case 6: monthDisp.innerText = "July"; break; // July
    case 7: monthDisp.innerText = "August"; break; // August
    case 8: monthDisp.innerText = "September"; break; // September
    case 9: monthDisp.innerText = "October"; break; // October
    case 10: monthDisp.innerText = "November"; break; // November
    case 11: monthDisp.innerText = "December"; break; // December
}
monthDisp.innerText += " " + year;

const calendarDays = document.getElementsByClassName("calendar-day");
for (let i = 0; i < calendarDays.length; i++) {
    const day = calendarDays[i];
    if (i < dayWeek) { day.innerHTML = "";

    } else if (i-dayWeek < daysInMonth){
        day.innerHTML = ((i-dayWeek)+1) + "<button class='add-event-button'></button>";
    } else {day.innerHTML = ""}
   
}

// Functionality for adding/editing events form
const goBackButton = document.getElementById("goBack");
const addEventForm = document.getElementById("addEventForm");
const calendar = document.getElementById("calendar");
const eventsPage = document.getElementById("eventsPage");
const addEventContainer = document.getElementById("addEventContainer");

function goBackEvent(e) {
    console.log("goBack triggered");
    eventsPage.setAttribute("hidden", "");
    calendar.removeAttribute("hidden");
    addEventForm.reset();
}

goBackButton.addEventListener("click", goBackEvent);


// Functionality for going to the add events page when clicking an empty day
function addButtonClick(e) {
    console.log("triggered addEvent");
    calendar.setAttribute("hidden", "");
    eventsPage.removeAttribute("hidden");
}

for (let day of calendarDays) {
    let addButton = day.querySelector(".add-event-button");
    if (addButton) {
        addButton.addEventListener("click", addButtonClick);
    }
}

// Define an array to store events
let events = [];

// Store event input fields and reminder list
//let eventDateInput = document.getElementById("eventDate");
let eventTitleInput = document.getElementById("eventName");
let eventTimeInput = document.getElementById("eventTime");
let eventDescriptionInput = document.getElementById("eventDescription");
let eventSubmitInput = document.getElementById("submitAddEvent");
let reminderList = document.getElementById("reminderList");

// Counter to generate unique event IDs
let eventIdCounter = 1;

// Update calendar dots function - currently TODO
function updateReminderList() {
	return; // TODO
}

// Update reminder list function - currently TODO
function updateReminderList() {
	return; // TODO
}

// Function to add events
function addEvent() {
    if (!eventTitleInput || !eventDescriptionInput) {
        console.error("Missing event input elements in HTML.");
        return;
    }

	//let date = eventDateInput.value;
	let title = eventTitleInput.value;
	let time = eventTimeInput.value;
	let description = eventDescriptionInput.value;

    if (!eventTitleInput.validity.valid || !eventTimeInput.validity.valid) {
        alert("Title and time required");
        return;
    }

    // Create a new event object
    const event = {
        id: eventIdCounter++,
        date: date,
		time: time,
        title: title,
        description: description
    };

    events.push(event); // Store event

    // Reset the form
    eventDateInput.value = "";
    eventTitleInput.value = "";
    eventTimeInput.value = "";
    eventDescriptionInput.value = "";

    updateCalendarDots();
    updateReminderList();
}


function addTitleUpdate() {
    if (eventTitleInput.validity.valid) {
        eventSubmitInput.removeAttribute("disabled");
    }
    else {
        eventSubmitInput.setAttribute("disabled", "");
    }
}

function addTimeUpdate() {
    if (eventTimeInput.validity.valid) {
        eventSubmitInput.removeAttribute("disabled");
    }
    else {
        eventSubmitInput.setAttribute("disabled", "");
    }
}

eventTitleInput.addEventListener("input", addTitleUpdate);
eventTimeInput.addEventListener("input", addTimeUpdate);

// Function to delete an event by ID
function deleteEvent(eventId) {
	 events = events.filter(event => event.id !== id);

    updateCalendarDots();
    updateReminderList();
}
