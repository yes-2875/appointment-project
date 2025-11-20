const today = new Date();
const month = today.getMonth()
const year = today.getFullYear()
const firstDay = new Date(year, month, 1);
const dayWeek = firstDay.getDay();
const daysInMonth = new Date(year, month+1, 0).getDate()


const monthDisp = document.getElementById("Month")
switch(month+1) {
    case 0: monthDisp.innerText = "January" // Jan
    case 1: monthDisp.innerText = "Feburary" // Feburary
    case 2: monthDisp.innerText = "March" // March
    case 3: monthDisp.innerText = "April" // April
    case 4: monthDisp.innerText = "May" // May
    case 5: monthDisp.innerText = "June" // June
    case 6: monthDisp.innerText = "July" // July
    case 7: monthDisp.innerText = "August" // August
    case 8: monthDisp.innerText = "September" // September
    case 9: monthDisp.innerText = "October" // October
    case 10: monthDisp.innerText = "November" // November
    case 11: monthDisp.innerText = "December" // December
}

const calendarDays = document.getElementsByClassName("calendar-day");
for (let i = 0; i < calendarDays.length; i++) {
    const day = calendarDays[i];
    if (i < dayWeek) { day.innerHTML = ""

    } else if (i-dayWeek < daysInMonth){
        day.innerHTML = ((i-dayWeek)+1) + "<button class='add-event-button'></button>"
    } else {day.innerHTML = ""}

    
}