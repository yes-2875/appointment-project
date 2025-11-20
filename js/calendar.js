const today = new Date();
const month = today.getMonth()
const year = today.getFullYear()
const firstDay = new Date(year, month, 1);
const dayWeek = firstDay.getDay();
const daysInMonth = new Date(year, month+1, 0).getDate()

const calendarDays = document.getElementsByClassName("calendar-day");

switch(month) {
    case 0: // January
    case 1: // Feburary
    case 2: // March
    case 3: // April
    case 4: // May
    case 5: // June
    case 6: // July
    case 7: // August
    case 8: // September
    case 9: // October
    case 10: // November
    case 11: // December
}


for (let i = 0; i < calendarDays.length; i++) {
    const day = calendarDays[i];
    if (i < dayWeek) { day.innerText = ""

    } else if (i-dayWeek < daysInMonth){
        day.innerText = (i-dayWeek)+1

    } else {day.innerText = ""}
}