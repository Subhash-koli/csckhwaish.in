// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAVxPp06sGBi108kWO0IRI_Ehios49AZX4",
    authDomain: "khwaish-2024.firebaseapp.com",
    databaseURL: "https://khwaish-2024-default-rtdb.firebaseio.com",
    projectId: "khwaish-2024",
    storageBucket: "khwaish-2024.firebasestorage.app",
    messagingSenderId: "632947052618",
    appId: "1:632947052618:web:859664a8bcfea685a1d6b3",
    measurementId: "G-K7RML37RYR"
    };

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database(app);

function initMultiStepForm() {
    const slidePage = document.querySelector(".form-outer form");
    const nextButtons = document.querySelectorAll(".next");
    const prevButtons = document.querySelectorAll(".prev");
    const submitButton = document.getElementById("submitButton");
    const steps = document.querySelectorAll(".step");
    const pages = document.querySelectorAll(".page");
    let currentStep = 1;

    function goToStep(step) {
        slidePage.style.marginLeft = `-${(step - 1) * 100}%`;
        steps.forEach((stepElem, index) => {
            stepElem.querySelector('.bullet').classList.toggle('active', index < step);
            stepElem.querySelector('.check').classList.toggle('active', index < step - 1);
        });
        currentStep = step;
    }

    function validatePageInputs(page) {
        const inputs = page.querySelectorAll("input");
        let valid = true;
        inputs.forEach(input => {
            if (!input.checkValidity()) {
                valid = false;
                input.classList.add("invalid-input");
            } else {
                input.classList.remove("invalid-input");
            }
        });
        return valid;
    }

    nextButtons.forEach((button, index) => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            if (validatePageInputs(pages[index])) goToStep(currentStep + 1);
        });
    });

    prevButtons.forEach((button, index) => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            goToStep(currentStep - 1);
        });
    });

    submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (validatePageInputs(pages[currentStep - 1])) {
            const userData = {
                fullName: document.getElementById("fullName").value,
                email: document.getElementById("email").value,
                phone: document.getElementById("phone").value,
                address: document.getElementById("address").value,
                username: document.getElementById("username").value
            };

            database.ref("users").push(userData)
                .then(() => {
                    alert("Registration successful!");
                    goToStep(1);
                    document.getElementById("registrationForm").reset();
                })
                .catch(error => {
                    alert("Error: " + error.message);
                });
        }
    });
}

