// ===============================
// STEP NAVIGATION
// ===============================

const steps = document.querySelectorAll(".step");
const progressBar = document.getElementById("progressBar");

let dressCode = "";
let paymentType = "";
let currentStep = 0;
let selectedDateType = "";
let selectedDate = "";

// Show current step
function showStep(index) {

    steps.forEach(step => step.classList.remove("active"));

    if (steps[index]) {
        steps[index].classList.add("active");
    }

    const progress = ((index + 1) / 6) * 100;
    progressBar.style.width = progress + "%";
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Next Step
function nextStep() {

    // STEP 2 validation (Calendar)

    if (currentStep === 1) {

        if (selectedDate === "") {

            alert("Please choose a date ❤️");
            return;

        }

    }

    // STEP 3 validation (Time)

    if (currentStep === 2) {

        const time = document.getElementById("time").value;

        if (!time) {

            alert("Please choose a time ❤️");
            return;

        }

    }

    // STEP 4 validation (Date Type)

    if (currentStep === 3) {

        if (selectedDateType === "") {

            alert("Please choose a date type ❤️");
            return;

        }

    }

    // STEP 5 validation (Name)

    if (currentStep === 4) {

        const name = document.getElementById("name").value.trim();

        if (name === "") {

            alert("Please enter your name ❤️");
            return;

        }

    }

    currentStep++;

    showStep(currentStep);

}

// ===============================
// NO BUTTON
// ===============================

const popup = document.getElementById("popup");

document.getElementById("noBtn").onclick = () => {

    popup.style.display = "flex";

};

document.getElementById("closePopup").onclick = () => {

    popup.style.display = "none";

};

// ===============================
// DATE TYPE
// ===============================

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("click", () => {

        cards.forEach(c => c.classList.remove("selected"));

        card.classList.add("selected");

        selectedDateType = card.dataset.value;

        card.animate([
            { transform: "scale(.9)" },
            { transform: "scale(1.05)" },
            { transform: "scale(1)" }
        ], {
            duration: 300
        });

    });

});
document.querySelectorAll("[data-dress]").forEach(item=>{

item.onclick=function(){

document.querySelectorAll("[data-dress]").forEach(x=>x.classList.remove("active"));

this.classList.add("active");

dressCode=this.dataset.dress;

}

});

document.querySelectorAll("[data-pay]").forEach(item=>{

item.onclick=function(){

document.querySelectorAll("[data-pay]").forEach(x=>x.classList.remove("active"));

this.classList.add("active");

paymentType=this.dataset.pay;

}

});

// ===============================
// FLOATING HEARTS
// ===============================

const hearts = document.querySelector(".hearts");

function createHeart() {

    if (window.innerWidth <= 640 && Math.random() > 0.6) {
        return;
    }

    const heart = document.createElement("div");

    heart.className = "heart";

    heart.innerHTML = "💖";

    heart.style.left = Math.random() * 100 + "%";

    heart.style.fontSize = (18 + Math.random() * 18) + "px";

    heart.style.animationDuration = (5 + Math.random() * 4) + "s";
    heart.style.willChange = "transform, opacity";

    hearts.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 9000);

}

setInterval(createHeart, window.innerWidth <= 640 ? 900 : 400);

// ===============================
// EMAILJS
// ===============================

document.getElementById("sendBtn").addEventListener("click", function () {

    const btn = this;

    btn.disabled = true;

    btn.innerHTML = "Sending...";

const templateParams = {

    name: document.getElementById("name").value,

    date: selectedDate,

    time: document.getElementById("time").value,

    date_type: selectedDateType,

    location: document.getElementById("location").value,

    maps: document.getElementById("maps").value,

    dress: dressCode,

    payment: paymentType,

    message: document.getElementById("message").value

};

    emailjs.send(
        "service_hxcx4vz",
        "template_e62wxak",
        templateParams
    )

    .then(() => {

        currentStep = 6;

        showStep(currentStep);

        progressBar.style.width = "100%";

    })

    .catch((error) => {

        console.log(error);

        alert("Email failed.");

        btn.disabled = false;

        btn.innerHTML = "Send Date Request 💌";

    });

});

// ===============================
// PREMIUM CALENDAR
// ===============================

const monthYear = document.getElementById("monthYear");
const calendarDays = document.getElementById("calendarDays");
const selectedDateText = document.getElementById("selectedDateText");

const prevMonth = document.getElementById("prevMonth");
const nextMonth = document.getElementById("nextMonth");

let today = new Date();
today.setHours(0, 0, 0, 0);

let month = today.getMonth();

let year = today.getFullYear();

const months = [

"January","February","March","April","May","June",

"July","August","September","October","November","December"

];

function renderCalendar() {

    calendarDays.innerHTML = "";

    monthYear.innerHTML = months[month] + " " + year;

    const firstDay = new Date(year, month, 1).getDay();

    const totalDays = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {

        const empty = document.createElement("div");

        empty.className = "day empty";

        calendarDays.appendChild(empty);

    }

    for (let d = 1; d <= totalDays; d++) {

        const day = document.createElement("div");

        day.className = "day";

        day.innerHTML = d;

        const thisDate = new Date(year, month, d);
        const isPastDate = thisDate < today;

        // Highlight today

        if (

            d === today.getDate() &&

            month === today.getMonth() &&

            year === today.getFullYear()

        ) {

            day.classList.add("today");

        }

        if (isPastDate) {
            day.classList.add("disabled");
        }

        day.onclick = function () {

            if (this.classList.contains("disabled")) {
                return;
            }

            document.querySelectorAll(".day").forEach(x => {

                x.classList.remove("selected");

            });

            this.classList.add("selected");

            selectedDate = thisDate.toISOString().split("T")[0];

            selectedDateText.innerHTML = thisDate.toLocaleDateString(

                "en-US",

                {

                    weekday: "long",

                    day: "numeric",

                    month: "long",

                    year: "numeric"

                }

            );

        };

        calendarDays.appendChild(day);

    }

}

prevMonth.onclick = () => {

    month--;

    if (month < 0) {

        month = 11;

        year--;

    }

    renderCalendar();

};

nextMonth.onclick = () => {

    month++;

    if (month > 11) {

        month = 0;

        year++;

    }

    renderCalendar();

};

renderCalendar();

// ===============================
// START
// ===============================

showStep(currentStep);

// ===============================
// INTRO
// ===============================

window.addEventListener("load", () => {

    setTimeout(() => {

        const intro = document.getElementById("intro");

        intro.style.opacity = "0";

        setTimeout(() => {

            intro.style.display = "none";

        }, 1000);

    }, 3000);

});