/* ---------------- Constants for the Input CARD ---------------*/

const inputSection = document.getElementById('input-section');
const inputForm = document.getElementById('inputForm');
const datePicker = document.getElementById('picker');

/* ----------------- Constants for the CountDown card -------------------*/

const countdownElement= document.getElementById('countdown');
const countdownHeader = document.getElementById('countdown-header');
const countdownButton = document.getElementById('countdown-button');
const timeSpreader = document.querySelectorAll('span');

/* ---------------- Constants for the Countdown Card after Completion ---------------*/

const completeElement = document.getElementById('countdown-complete');
const completeInfo = document.getElementById('countdown-complete_info');
const completeButton =  document.getElementById('countdown-complete_button');

/* ----------------- Constants for the Newly Entered Events --------------------------*/

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date; 
let countdownActive;
let countdownSaved;


const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;


/* Setting Minimum Date Value  from Today's date onwards  ------*/

const today = new Date().toISOString().split('T')[0];
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
        inputSection.hidden = true;
        
        /* When the countdown goes into completion */
        if (distance < 0){
            countdownElement.hidden = true;
            clearInterval(countdownActive);
            completeInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completeElement.hidden = false;
        }else{
            /* ---- Else, the state is the countdown still running and it shows */

            countdownHeader.textContent = `${countdownTitle}`;
            timeSpreader[0].textContent = `${days}`;
            timeSpreader[1].textContent = `${hours}`;
            timeSpreader[2].textContent = `${minutes}`;
            timeSpreader[3].textContent = `${seconds}`;
            completeElement.hidden = true;
            countdownElement.hidden = false;
        }
    }, second);
}



function countdownUpdated(e){
    e.preventDefault();

    /* ----------- Saving data to local storage ------------------*/

    countdownTitle = e.target[0].value;
    countdownDate = e.target[1].value;
    countdownSaved = {
        title: countdownTitle,
        date: countdownDate,
    };

    localStorage.setItem('countdown', JSON.stringify(countdownSaved));

    /*  ----------- If the Input form is empty ..then what ? ------- */

    if (countdownDate === ''){
        alert("You cannot leave the date column empty");
    }else{
        /* -------- In case it DATE is entered, then catch the DATE --------*/

        countdownValue = new Date(countdownDate).getTime();
        updateDom();
    }
}


/* ------------------- To set another event after completion  -----------------------*/

function resetCountdown(){
    /* ------ Takes you back to the INPUT FORM  ---------------*/

    countdownElement.hidden = true;
    completeElement.hidden = true;
    inputSection.hidden = false;

    /* ------------Stop the countdown timer ---------------*/
    clearInterval(countdownActive);

    /* ----------------- Then RESET and PREPARE the countdown  for the next Event ----------*/

    countdownTitle = '';
    countdownDate - '';
    localStorage.removeItem('countdown');
}

/* -------------- To Restore the Previous Event Saved from Local Storage -------------*/

function restorePreviousSession(){
    if(localStorage.getItem('countdown')){
        inputSection.hidden = true;
        countdownSaved = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = countdownSaved.title;
        countdownDate = countdownSaved.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDom(); 
    }
}


/* ------------------ Event Activation -----------------------*/

inputForm.addEventListener('submit', countdownUpdated);
countdownElement.addEventListener('click', resetCountdown);
completeButton.addEventListener('click', resetCountdown);


/* ------------------ On Refresh to check the localstorage FIRST ---------------*/

restorePreviousSession();