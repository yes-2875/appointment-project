const today = new Date(); // Gets current day
const month = today.getMonth() // Based on the day, gets the month
const year = today.getFullYear() // Based on the day, gets the year
const firstDay = new Date(year, month, 1); //Gets first day of the month
const dayWeek = firstDay.getDay(); // Gets the day of the week
const daysInMonth = new Date(year, month+1, 0).getDate() // i'll be honest, idk

let monthName = '';
const monthDisp = document.getElementById("Month");
console.log(month);

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

monthDisp.innerText = `${monthName} ${year}`;

const calendarDays = document.getElementsByClassName("calendar-day");
for (let i = 0; i < calendarDays.length; i++) {
    const day = calendarDays[i];

    if (i < dayWeek) { day.innerHTML = ""; day.setAttribute("disabled", "");

    } else if (i-dayWeek < daysInMonth){
        day.innerHTML = ((i-dayWeek)+1) + "<button class='add-event-button'></button>";
        day.setAttribute("day", i-dayWeek +1);

        if(i-dayWeek+1 == today.getDate()) {
            day.classList.add("today");
        }
    } else { day.innerHTML = ""; day.setAttribute("disabled", ""); }

}

// Functionality for adding/editing events form
const goBackButton = document.getElementById("cancelEditEventBtn");
const closeModal = document.getElementById("closeModalBtn");
const closeEditModal = document.getElementById("closeEditModalBtn");

const addEventForm = document.getElementById("editEventForm");
const calendar = document.getElementById("calendar");
const editEventModal = document.getElementById("editEventModal");
const editEventBtn = document.getElementById("editEventBtn");
const deleteEventBtn = document.getElementById("deleteEventBtn");

const eventModal = document.getElementById("eventModal");
const eventModalName = document.getElementById("modalEventName");
const eventModalTime = document.getElementById("modalEventTime");
const eventModalDescription = document.getElementById("modalEventDescription");
const eventPageLabel = document.getElementById("eventsPageLabel");
//const addEventContainer = document.getElementById("addEventContainer");

// Store event input fields and reminder list
//let eventDateInput = document.getElementById("eventDate");
let eventTitleInput = document.getElementById("editEventName");
let eventTimeInput = document.getElementById("editEventTime");
let eventDescriptionInput = document.getElementById("editEventDescription");
let eventSubmitInput = document.getElementById("saveEditEventBtn");
let reminderList = document.getElementById("reminderList");

function goBackEvent(e) {
    console.log("goBack triggered");
    editEventModal.setAttribute("hidden", "");
    eventModal.setAttribute("hidden", "");
    //calendar.removeAttribute("hidden");
    addEventForm.reset();
}

goBackButton.addEventListener("click", goBackEvent);
closeModal.addEventListener("click", goBackEvent);
closeEditModal.addEventListener("click", goBackEvent);


// Functionality for going to the add events page when clicking an empty day
function addButtonClick(e) {
    let day = e.target.parentElement.getAttribute("day");
    eventPageLabel.innerText = `Add Event for ${monthName} ${day}`;
    editEventModal.setAttribute("day", day);
    editEventModal.removeAttribute("editing");
    console.log("triggered addEvent");
    //calendar.setAttribute("hidden", "");
    editEventModal.removeAttribute("hidden");
}

for (let day of calendarDays) {
    let addButton = day.querySelector(".add-event-button");
    if (addButton) {
        addButton.addEventListener("click", addButtonClick);
    }
}

// Functionality for going to the edit events module when clicking an existing calendar event
function eventButtonClick(e) {
    let id = e.target.getAttribute("eventId");
    id = parseInt(id);
    eventModal.removeAttribute("hidden");
    eventModal.setAttribute("eventId", id);
    
    let event = events.find(value => value.id == id);
    if (event != null) {
        eventModalName.innerHTML = event.title;
        eventModalTime.innerHTML = event.time + " ⏲";
        eventModalDescription.innerHTML = event.description;
        
    } else {
        console.log("This event id does not exist.");
    }
}

// Functionality for deleting the specified event with a button in the edit events modal.
function deleteButtonClick(e) {
    let id = eventModal.getAttribute("eventId");
    id = parseInt(id);
    
    if (id != null) {
        deleteEvent(id);
        eventModal.setAttribute("hidden", "");
        eventModal.removeAttribute("eventId");
    }
}

function editButtonClick(e) {
    let id = eventModal.getAttribute("eventId");
    id = parseInt(id);
    
    let event = events.find(value => value.id == id);
    
    editEventModal.setAttribute("editing", "");
    editEventModal.setAttribute("eventId", id);
    eventPageLabel.innerText = `Edit Event for ${monthName} ${event.date.day}`;
    addEventForm.reset();
    
    eventTitleInput.value = event.title;
    eventDescriptionInput.value = event.description;
    eventTimeInput.value = event.time;
    
    addTitleUpdate();
    addTimeUpdate();
    
    editEventModal.removeAttribute("hidden");
    eventModal.setAttribute("hidden", "");
    
}

deleteEventBtn.addEventListener("click", deleteButtonClick);
editEventBtn.addEventListener("click", editButtonClick);

// Define an array to store events
let events = [];
loadEvents();

// Counter to generate unique event IDs. Accommodate for loaded events to prevent discrepancies in IDs
let eventIdCounter = events.length +1;

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
        //console.log(calendarDays2);

        if (calendarDays2.length > 0) {
            let currentDay = calendarDays2[0];
            currentDay.setAttribute("extraHTML", currentDay.getAttribute("extraHTML") + `<button class='calendar-event' eventId="${event.id}">${event.title}</button>`);

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
    
    for (let event of document.getElementsByClassName("calendar-event")) {
        event.addEventListener("click", eventButtonClick);
    }
}

// Function to add events
function addEvent() {
    if (!eventTitleInput || !eventDescriptionInput) {
        console.error("Missing event input elements in HTML.");
        return;
    }

	let day = editEventModal.getAttribute("day");
	let title = eventTitleInput.value;
	let time = eventTimeInput.value;
	let description = eventDescriptionInput.value;

    if (!eventTitleInput.validity.valid || !eventTimeInput.validity.valid) {
        alert("Title and time required");
        return;
    }
    
    if (editEventModal.hasAttribute("editing")) {
        let id = editEventModal.getAttribute("eventId");
        id = parseInt(id);
        
        let event = events.find(value => value.id == id);
        event.time = time;
        event.title = title;
        event.description = description;
        
    } else {
        // Create a new event object
        const event = {
            id: eventIdCounter++,
            date: {day: day, month: month},
            time: time,
            title: title,
            description: description
        };
        
        events.push(event); // Store event
    }

    // Reset the form
    eventTitleInput.value = "";
    eventTimeInput.value = "";
    eventDescriptionInput.value = "";
    
    editEventModal.removeAttribute("editing");
    editEventModal.removeAttribute("eventId");
    
    console.log(event);
    updateCalendarItems();

    //updateCalendarDots();
    //updateReminderList();
    saveEvents();
}


function addTitleUpdate() {
    if (eventTitleInput.validity.valid) {
        eventSubmitInput.removeAttribute("disabled");
    }
    else {
        eventSubmitInput.setAttribute("disabled", "");
    }
}

function saveEvents() {
    localStorage.setItem("events", JSON.stringify(events));
    console.log("called saveEvents()");
}

function loadEvents() {
    
    let saved = localStorage.getItem("events");
    //console.log(saved);
    
    if (saved != null) {
        events = JSON.parse(saved);
        // Reset the ids so that adding a new event ID in between after deleting some does not create duplicate IDs
        for (let i = 0; i < events.length; i++) {
            console.log(i);
            events[i].id = i+1;
        }
        
        console.log("Loaded events");
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
    editEventModal.setAttribute("hidden", "");
    addEventForm.reset();
})

// Function to delete an event by ID
function deleteEvent(eventId) {
    
	events = events.filter(event => event.id !== eventId);
    for (let i = 0; i < events.length; i++) {
        console.log(i);
        events[i].id = i+1;
    }
    eventIdCounter = events.length +1;
        
    saveEvents();
    //updateCalendarDots();
    updateCalendarItems();
    //updateReminderList();
}

// Function to show notification banner
function showNotification(message) {
    const banner = document.getElementById("notificationBanner");
    const msg = document.getElementById("bannerMessage");

    msg.textContent = message;
    banner.removeAttribute("hidden");

    setTimeout(() => {
        banner.setAttribute("hidden", "");
    }, 5000);
}

// notification continue here
// Function to check for existing/upcoming events in the events array
function checkUpcomingEvents() {
    const now = new Date();

    events.forEach(event => {
        const eventDateTime = new Date( // Create Date object for event
            year,
            event.date.month,
            event.date.day,
            Number(event.time.split(":")[0]),
            Number(event.time.split(":")[1])
        );

        const diffMs = eventDateTime.getTime() - now.getTime(); // Difference in milliseconds
        const diffMinutes = Math.floor(diffMs / 60000); // Convert to minutes
        //console.log(diffMs);
        //console.log(diffMinutes);

        if (diffMinutes <= 10 && diffMinutes > 2) {
            showNotification(`"${event.title}" starts in ${diffMinutes} minutes`); // 10-minute reminder
        }
        else if ( (diffMinutes >= 0 && diffMinutes <= 2) || (diffMinutes < 0 && diffMinutes >= -2)) {
            showNotification(`"${event.title}" is starting now`); // Event starting now
        }
    });
}

updateCalendarItems();
setInterval(checkUpcomingEvents, 60000);
checkUpcomingEvents();
