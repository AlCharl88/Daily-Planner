// execute (.ready) once the DOM is ready
$(document).ready(function() {
//create an array of events
var events = [];
//Click event on the saveBtn and execute the function to get the values from the sibling and parent
$(".saveBtn").on("click", function() {
var value = $(this).siblings(".description").val();
var time = $(this).parent().attr("id");
var datePicked = moment().format("MMM Do, YYYY");

//push the values in the variable events
events.push({description: value, time: time, date: datePicked});

//save the values in local storage

localStorage.setItem("events", JSON.stringify(events));
});

function timeUpdate() {
//get current hour
var currentTime = moment().hours();
// for each time-block, execute the function, add class past, present or future
$(".time-block").each(function() {
var blockTime = parseInt($(this).attr("id").split("-")[1]);

if(currentTime > blockTime) {
    $(this).addClass("past");
} else if (currentTime === blockTime) {
    $(this).removeClass("past");
    $(this).addClass("present");
} else {
    $(this).removeClass("past");
    $(this).removeClass("present");
    $(this).addClass("future");
}
});

}

timeUpdate();

//check and exectute timeUpdate every 30 secondes

var secondsLeft = 30;
function setTime() {
    setInterval(function() {
        secondsLeft--;
        if(secondsLeft === 0) {
            timeUpdate();
            secondsLeft = 30;
        }
    }, 1000);
} 

setTime();

//reset for a new day
var currentDay = moment().format("dddd, MMMM Do, YYYY");
for (i = 0; i < events.length; i++) {
    if(currentDay.isAfter(events[i].date)) {
        events[i].description = "";
        events[i].time = "";
        events[i].date = "";
        events.length = 0;
    }
}

// load saved events from data storage and have it persist when the page is refreshed
var savedEvents = JSON.parse(localStorage.getItem("events"));
if(savedEvents !== null) {
    events = savedEvents;
}

for (i = 0; i < events.length; i++) {
    var userEntry = events[i].description;
    $("#" + events[i].time).children(".description").text(userEntry);
}

});

// disply today date
var today = moment();
$("#currentDay").text(today.format("dddd, MMMM Do, YYYY"));