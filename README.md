# appointment-project
**https://yes-2875.github.io/appointment-project**
CPAN113/FJS Group Project

## Purpose
The purpose of this project was to allow users to plan out their time for the month, scheduling appointments, tasks, work, etc.
The reminder panel notifies the user on screen of upcoming events

## Features
There are two main features:
1. **Calendar view**
    - Displays all the days of the current month, as well as the name of the month and the year.
    - Allows the user to click on a day to add an event, sending them to the event panel.
    - The user may also click on an existing event to edit (send back to event page), delete it or cancel this operation using the X button on the modals.
    - **Reminder panel** exists to notify the user of events that are about to begin or starting very soon.
<br>

2. **Adding events**
    - Allows the user to input an event title, the time, and a description for their event.
    - The user can also cancel, in the case of a miss-click.
    - These events make use of the HTML5 Web Storage API to **store persistent data** in the browser. If the user refreshes or leaves the site, the events remian there.

### Project Board
Here is a link 

### Demonstration Video
Click this preview image to watch the video:

[![Watch the video](https://img.youtube.com/vi/RgPK6yPTZjQ/0.jpg)](https://www.youtube.com/watch?v=RgPK6yPTZjQ)


## Installation Instructions
To install, you need to have the following files in your website:
1. All files in the 'js' folder
2. index.html
3. styles.css

## The Team

- **Mirza (yes-2785)**
    - Main Frontend Dev
    - Project lead
    - Added majority of HTML and CSS styling for the calendar and event addition page.
    - Helped in Backend with events
    - Managed and maintained the GitHub page, making sure merges are valid and functional.
    - Assisted in planning
<br>

- **Stanley (stanng66)**
    - Backend/Frontend Dev
    - Added CSS and HTML for current day indicator (blue dot)
    - Added CSS and JS for reminder banner
    - Adjusted CSS and HTML for edit event modal (added a nice transition and cleaned up styling)
    - Set up the JS backbone for adding events
    - Assisted in planning
<br>

- **Ethan (QuarantinedCheese)**
    - Backend Dev
    - Filled out README
    - Added JS for calendar setup (finding date, getting month+year, counting days, graying out days not included in current month)
    - Several other minor additions in collaboration with Mirza
    - Assisted in planning
<br>

- **Prabu (dheshva2020)**
    - Implemented saving and loading event data
    - Created initial HTML and CSS structure of events modal
    - Enhanced styles for calendar events and input focus
