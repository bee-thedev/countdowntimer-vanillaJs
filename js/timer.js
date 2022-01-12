/* ---------------- Constants for the Input CARD ---------------*/

const inputSelection = document.getElementById("input-selection");
const inputForm = document.getElementById("inputForm");
const datePicker = document.getElementById("picker");

/* ----------------- Constants for the CountDown card -------------------*/

const countdownEle= document.getElementById("countdown");
const countdownHeader = document.getElementById("countdown-header");
const countdownButton = document.getElementById("countdown-button");
const timeSpreader = document.querySelectorAll("span");

/* ---------------- Constants for the Countdown Card after Completion ---------------*/

const completeElement = document.getElementById("countdown-complete");
const completeInfo = document.getElementById("countdown-complete_info");
const completeButton =  document.getElementById("countdown-complete_button");

/* ----------------- Constants for the Newly Entered Events --------------------------*/

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date; 
let countdownActive;
let savedCountdown;


const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;


/* Setting Minimum Date Value  from Today's date onwards  ------*/

const date = new Date().toString.split('T')[0];
datePicker.setAttribute('min', today);


/* ------- Countdown Fill-up ----------------*/

function updateDom(){
    countdownActive = setInterval(()=>{
        const timeRightNow = new Date().getTime();
        const distance = countdownValue - timeRightNow;
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day)/hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);

        /*  Once the counter is placed for the Event the input gooes into Hiding */
        inputSelection.hidden = true;
        
        /* When the countdown goes into completion */
        if (distance < 0){
            countdownEle.hidden = true;
            clearInterval(countdownActive);
            completeInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completeElement.hidden = false;
        }else{
            /* ---- Else, the state is the countdown still running and it shows */

            countdownHeader.textContent = `${countdownTitle}`;
            timeSpreader.textContent = `${days}`;
            timeSpreader.textContent = `${hours}`;
            timeSpreader.textContent = `${minutes}`;
            timeSpreader.textContent = `${seconds}`;
            completeElement.hidden = true;
            completeInfo.hidden = false;
        }
    }, seconds);
}


