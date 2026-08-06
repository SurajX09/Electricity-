// ======================================
// Power Cut Calculator
// Part 1
// ======================================

// Current Language
let currentLanguage = "en";

// Translation Object
const translations = {

    en: {

        title: "Power Cut Calculator",
        subtitle: "Calculate total power outage duration instantly.",

        startLabel: "Power Cut Start Time",
        endLabel: "Power Restored Time",

        hour: "Hour",
        minute: "Minute",
        period: "AM / PM",

        calculate: "Calculate",
        reset: "Reset",

        resultTitle: "Total Power Cut Duration",

        footer: "CREATED BY FEBO-CT",

        fillError: "Please fill all fields.",

        sameError: "Start and end times cannot be the same.",

        select: "Select",

        am: "AM",

        pm: "PM"

    },

    mr: {

        title: "वीज खंड कालावधी गणक",

        subtitle: "वीज किती वेळ बंद होती ते लगेच मोजा.",

        startLabel: "वीज जाण्याची वेळ",

        endLabel: "वीज येण्याची वेळ",

        hour: "तास",

        minute: "मिनिट",

        period: "AM / PM",

        calculate: "मोजा",

        reset: "रीसेट",

        resultTitle: "एकूण वीज बंद कालावधी",

        footer: "FEBO-CT सह तयार केले",

        fillError: "कृपया सर्व माहिती भरा.",

        sameError: "दोन्ही वेळा समान असू शकत नाहीत.",

        select: "निवडा",

        am: "AM",

        pm: "PM"

    }

};

// DOM Elements

const startHour = document.getElementById("startHour");
const startMinute = document.getElementById("startMinute");
const startPeriod = document.getElementById("startPeriod");

const endHour = document.getElementById("endHour");
const endMinute = document.getElementById("endMinute");
const endPeriod = document.getElementById("endPeriod");

const resultCard = document.getElementById("resultCard");
const result = document.getElementById("result");
const error = document.getElementById("error");

// Populate Hour Dropdown

function populateHours(select){

    select.innerHTML = "";

    let first = document.createElement("option");

    first.value = "";

    first.textContent = translations[currentLanguage].select;

    select.appendChild(first);

    for(let i=1;i<=12;i++){

        const option = document.createElement("option");

        option.value = i;

        option.textContent = String(i).padStart(2,"0");

        select.appendChild(option);

    }

}

// Populate Minute Dropdown

function populateMinutes(select){

    select.innerHTML = "";

    let first = document.createElement("option");

    first.value = "";

    first.textContent = translations[currentLanguage].select;

    select.appendChild(first);

    for(let i=0;i<60;i++){

        const option = document.createElement("option");

        option.value = i;

        option.textContent = String(i).padStart(2,"0");

        select.appendChild(option);

    }

}

// Initialize Dropdowns

populateHours(startHour);
populateHours(endHour);

populateMinutes(startMinute);
populateMinutes(endMinute);

// Convert to Minutes

function convertToMinutes(hour, minute, period){

    hour = Number(hour);

    minute = Number(minute);

    if(period==="AM" && hour===12){

        hour = 0;

    }

    if(period==="PM" && hour!==12){

        hour += 12;

    }

    return hour*60 + minute;

}

// Change Language

function changeLanguage(lang){

    currentLanguage = lang;

    const t = translations[lang];

    document.getElementById("title").textContent = t.title;
    document.getElementById("subtitle").textContent = t.subtitle;

    document.getElementById("startLabel").textContent = t.startLabel;
    document.getElementById("endLabel").textContent = t.endLabel;

    document.getElementById("hour1Label").textContent = t.hour;
    document.getElementById("hour2Label").textContent = t.hour;

    document.getElementById("minute1Label").textContent = t.minute;
    document.getElementById("minute2Label").textContent = t.minute;

    document.getElementById("ampm1Label").textContent = t.period;
    document.getElementById("ampm2Label").textContent = t.period;

    document.getElementById("calculateBtn").textContent = t.calculate;
    document.getElementById("resetBtn").textContent = t.reset;

    document.getElementById("resultTitle").textContent = t.resultTitle;

    document.getElementById("footer").textContent = t.footer;

    document.getElementById("englishBtn").classList.remove("active");
    document.getElementById("marathiBtn").classList.remove("active");

    if(lang==="en"){

        document.getElementById("englishBtn").classList.add("active");

    }else{

        document.getElementById("marathiBtn").classList.add("active");

    }

    populateHours(startHour);
    populateHours(endHour);

    populateMinutes(startMinute);
    populateMinutes(endMinute);

}

// ======================================
// Part 2
// ======================================

// Format Result

function formatResult(totalMinutes) {

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (currentLanguage === "en") {

        let text = "";

        if (hours > 0) {
            text += `${hours} ${hours === 1 ? "Hour" : "Hours"}`;
        }

        if (hours > 0 && minutes > 0) {
            text += " ";
        }

        if (minutes > 0) {
            text += `${minutes} ${minutes === 1 ? "Minute" : "Minutes"}`;
        }

        if (hours === 0 && minutes === 0) {
            text = "0 Minutes";
        }

        return text;
    }

    // Marathi

    let text = "";

    if (hours > 0) {
        text += `${hours} तास`;
    }

    if (hours > 0 && minutes > 0) {
        text += " ";
    }

    if (minutes > 0) {
        text += `${minutes} मिनिटे`;
    }

    if (hours === 0 && minutes === 0) {
        text = "0 मिनिटे";
    }

    return text;
}

// Show Error

function showError(message) {

    error.textContent = message;
    resultCard.classList.add("hidden");

}

// Clear Error

function clearError() {

    error.textContent = "";

}

// Calculate Duration

function calculateDuration() {

    clearError();

    // Validation

    if (
        startHour.value === "" ||
        startMinute.value === "" ||
        startPeriod.value === "" ||

        endHour.value === "" ||
        endMinute.value === "" ||
        endPeriod.value === ""
    ) {

        showError(translations[currentLanguage].fillError);
        return;

    }

    let start = convertToMinutes(
        startHour.value,
        startMinute.value,
        startPeriod.value
    );

    let end = convertToMinutes(
        endHour.value,
        endMinute.value,
        endPeriod.value
    );

    // Same Time

    if (start === end) {

        showError(translations[currentLanguage].sameError);
        return;

    }

    // Overnight Calculation

    if (end < start) {

        end += 24 * 60;

    }

    const duration = end - start;

    result.textContent = formatResult(duration);

    resultCard.classList.remove("hidden");

}

// Reset Form

function resetForm() {

    startHour.selectedIndex = 0;
    startMinute.selectedIndex = 0;
    startPeriod.selectedIndex = 0;

    endHour.selectedIndex = 0;
    endMinute.selectedIndex = 0;
    endPeriod.selectedIndex = 0;

    clearError();

    resultCard.classList.add("hidden");

}

// Events

document
    .getElementById("calculateBtn")
    .addEventListener("click", calculateDuration);

document
    .getElementById("resetBtn")
    .addEventListener("click", resetForm);

document
    .getElementById("englishBtn")
    .addEventListener("click", () => {

        changeLanguage("en");

    });

document
    .getElementById("marathiBtn")
    .addEventListener("click", () => {

        changeLanguage("mr");

    });

// Initialize

changeLanguage("en");
resultCard.classList.add("hidden");