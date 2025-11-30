const today = new Date(); // Gets current day
const month = today.getMonth() // Based on the day, gets the month
const year = today.getFullYear() // Based on the day, gets the year
const firstDay = new Date(year, month, 1); //Gets first day of the month
const dayWeek = firstDay.getDay(); // Gets the day of the week
const daysInMonth = new Date(year, month+1, 0).getDate() // i'll be honest, idk

let monthName = ''
const monthDisp = document.getElementById("Month")
console.log(month)
switch(month) {
    case 0: monthName = "January"; break; // Jan
    case 1: monthName = "Feburary"; break; // Feburary
    case 2: monthName = "March"; break; // March
    case 3: monthName = "April"; break; // April
    case 4: monthName = "May"; break; // May
    case 5: monthName = "June"; break; // June
    case 6: monthName = "July"; break; // July
    case 7: monthName = "August"; break; // August
    case 8: monthName = "September"; break; // September
    case 9: monthName = "October"; break; // October
    case 10: monthName = "November"; break; // November
    case 11: monthName = "December"; break; // December
}
monthDisp.innerText = `${monthName}, ${year}`;

const calendarDays = document.getElementsByClassName("calendar-day");
for (let i = 0; i < calendarDays.length; i++) {
    const day = calendarDays[i];
    if (i < dayWeek) { day.innerHTML = ""; day.setAttribute("disabled", "");

    } else if (i-dayWeek < daysInMonth){
        day.innerHTML = ((i-dayWeek)+1) + "<button class='add-event-button'></button>";
        day.setAttribute("day", i-dayWeek +1);
    } else { day.innerHTML = ""; day.setAttribute("disabled", ""); }
   
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
    let day = e.target.parentElement.getAttribute("day");
    let eventPageLabel = document.getElementById("eventsPageLabel")
    eventPageLabel.innerText = `Add/Edit Event for (${monthName}, ${day})`
    eventsPage.setAttribute("day", day);

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
function updateCalendarDots() {
	return; // TODO
}

function updateCalendarItems() {
    
    // Remove all existing events from the calendar page
    for (let event of document.getElementsByClassName("calendar-event")) {
        event.remove();
        console.log("removed event to update calendar");
    }
    
    // Loop events table to add HTML elements in calendar page accordingly
    let calendarDays = document.getElementsByClassName("calendar-day");
    
    for (let i = 0; i < calendarDays.length; i++) {
        let day = calendarDays[i];
        if (i < dayWeek) { day.innerHTML = ""; day.setAttribute("disabled", ""); }
        
        else if (i-dayWeek < daysInMonth) {
            day.innerHTML = ((i-dayWeek)+1);
            day.setAttribute("day", i-dayWeek+1);
        } else { day.innerHTML = ""; day.setAttribute("disabled", ""); }
        
        day.setAttribute("extraHTML", "");
    }
    
    for (let event of events) {
        
        let calendarDays2 = Array.from(calendarDays);
        calendarDays2 = calendarDays2.filter((value) => value.getAttribute("day") == event.date.day);
        console.log(calendarDays2);
        
        if (calendarDays2.length > 0) {
            let currentDay = calendarDays2[0];
            currentDay.setAttribute("extraHTML", currentDay.getAttribute("extraHTML") + `<button class='calendar-event'>${event.title}</button>`);

        } else {
            console.log("nothing in calendarDays2 filtered");
        }
    }
    
    for (let day of calendarDays) {
        let disabled = day.getAttribute("disabled");
        if (disabled == null) {
            console.log("true");
            day.setAttribute("extraHTML", day.getAttribute("extraHTML") + "<button class='add-event-button'></button>");
            day.innerHTML += day.getAttribute("extraHTML");
            day.querySelector(".add-event-button").addEventListener("click", addButtonClick);
        }
        
        day.removeAttribute("extraHTML");
    }
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

	let day = eventsPage.getAttribute("day");
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
        date: {day: day, month: month},
		time: time,
        title: title,
        description: description
    };

    events.push(event); // Store event

    // Reset the form
    eventTitleInput.value = "";
    eventTimeInput.value = "";
    eventDescriptionInput.value = "";


    console.log(event)
    updateCalendarItems();
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
addEventForm.addEventListener("submit", function(e) {
    e.preventDefault();
    addEvent();
    eventsPage.setAttribute("hidden", "");
    calendar.removeAttribute("hidden");
    addEventForm.reset();
})

// Function to delete an event by ID
function deleteEvent(eventId) {
	 events = events.filter(event => event.id !== id);

    updateCalendarDots();
    updateReminderList();
}
