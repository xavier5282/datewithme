// ===============================
// STEP NAVIGATION
// ===============================

const steps = document.querySelectorAll(".step");
const progressBar = document.getElementById("progressBar");

let currentStep = 0;
let selectedDateType = "";

// Show current step
function showStep(index) {

    steps.forEach(step => {
        step.classList.remove("active");
    });

    steps[index].classList.add("active");

    // Progress Bar
    const progress = ((index + 1) / 6) * 100;
    progressBar.style.width = progress + "%";

}

// Next Step
function nextStep() {

    // Validation

    if (currentStep === 1) {

        const date = document.getElementById("date").value;

        if (!date) {
            alert("Please choose a date ❤️");
            return;
        }

    }

    if (currentStep === 2) {

        const time = document.getElementById("time").value;

        if (!time) {
            alert("Please choose a time ❤️");
            return;
        }

    }

    if (currentStep === 3) {

        if (selectedDateType === "") {

            alert("Please choose a date type ❤️");
            return;

        }

    }

    if (currentStep === 4) {

        const name = document.getElementById("name").value;

        if (name.trim() === "") {

            alert("Please enter your name ❤️");

            return;

        }

    }

    currentStep++;

    showStep(currentStep);

}

// ===============================
// NO BUTTON POPUP
// ===============================

const popup = document.getElementById("popup");

document.getElementById("noBtn").onclick = function () {

    popup.style.display = "flex";

}

document.getElementById("closePopup").onclick = function () {

    popup.style.display = "none";

}

// ===============================
// DATE TYPE CARD
// ===============================

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("click", function () {

        cards.forEach(c => c.classList.remove("selected"));

        this.classList.add("selected");

        selectedDateType = this.dataset.value;

    });

});

// ===============================
// FLOATING HEARTS
// ===============================

const hearts = document.querySelector(".hearts");

function createHeart() {

    const heart = document.createElement("div");

    heart.classList.add("heart");

    heart.innerHTML = "💖";

    heart.style.left = Math.random() * 100 + "%";

    heart.style.fontSize = (20 + Math.random() * 25) + "px";

    heart.style.animationDuration = (5 + Math.random() * 5) + "s";

    hearts.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 10000);

}

setInterval(createHeart, 400);

// ===============================
// SEND BUTTON
// ===============================

document.getElementById("sendBtn").addEventListener("click", function () {

    const sendBtn = this;

    sendBtn.innerHTML = "Sending...";
    sendBtn.disabled = true;

const templateParams = {
    name: document.getElementById("name").value,
    date: document.getElementById("date").value,
    time: document.getElementById("time").value,
    date_type: selectedDateType,
    message: document.getElementById("message").value
};

emailjs.send(
    "service_hxcx4vz",
    "template_e62wxak",
    templateParams
)
.then(function (response) {

    console.log("SUCCESS!", response);

    document.getElementById("step6").classList.remove("active");
    document.getElementById("success").classList.add("active");

    progressBar.style.width = "100%";

})
.catch(function (error) {

    console.error("EMAILJS ERROR:", error);
    alert("Failed to send.\n" + JSON.stringify(error));

    sendBtn.innerHTML = "Send Date Request 💌";
    sendBtn.disabled = false;

});
});

// ===============================
// START
// ===============================

showStep(currentStep);