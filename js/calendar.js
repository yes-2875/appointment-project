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