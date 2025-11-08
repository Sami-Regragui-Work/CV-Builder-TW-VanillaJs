document.addEventListener("DOMContentLoaded", main);

let forms;
let stepNum;

const mainTitle = document.getElementById("main__title");
const nextBtn = document.getElementById("next-btn");
const stepper = document.getElementById("main__stepper");
const aside = document.getElementById("main__aside");
const previousBtn = document.getElementById("previous-btn");
// const

const fetchData = (callback) => {
    fetch("assets/localData.json")
        .then((res) => res.json())
        .then((data) => (forms = data))
        .catch((err) => console.log(`Fetch error: ${err}`))
        .then(() => callback());
};

const updateMainTitle = (step = null) => {
    // TODO: main title change
    mainTitle.textContent = !step
        ? "Start Making Cv easily now"
        : `Please share your ${step.textContent}`;
};

const fillStepper = () => {
    // console.log(forms);
    forms.forEach((form) => {
        let li = document.createElement("li");
        li.textContent = form.title;
        li.setAttribute("data-id", form.id);
        stepper.appendChild(li);
    });
};

const nextAction = (e) => {
    // e.target;
    e.preventDefault();
    if (e.target.classList.contains("makeCv")) {
        e.target.classList.remove("makeCv");
        aside.classList.remove("hidden");
        e.target.textContent = "Next";
        previousBtn.classList.remove("hidden");
        stepNum = 0;
    } else {
        previousBtn.removeAttribute("disabled");
    }
    stepNum++;
    let step = stepper.querySelector(`[data-id='${stepNum}']`);
    step.classList.add("currentStep", "passedStep");

    // let nextStep = step.nextElementSibling;
    // let nextStep = stepNum;
    // nextStep.classList.add("currentStep", "passedStep");
    // step.classList.remove("currentStep");
    // if (step.textContent === "1")
    let previousStep = step.previousElementSibling;
    // console.log(stepNum);
    if (previousStep) previousStep.classList.remove("currentStep");
    if (stepNum < 10) updateMainTitle(step);
    else if (stepNum == 11) e.target.disabled = true;
};

const previousAction = (e) => {
    e.preventDefault();
    stepNum--;
    let step = stepper.querySelector(`[data-id='${stepNum}']`);
    step.classList.add("currentStep");
    let nextStep = step.nextElementSibling;
    // console.log(stepNum);
    nextStep.classList.remove("passedStep");
    nextStep.classList.remove("currentStep");
    if (stepNum == 1) e.target.disabled = true;
    else if (stepNum == 10) nextBtn.disabled = false;
    if (stepNum < 10) updateMainTitle(step);
};

const navigateStepper = (e) => {
    console.log(stepNum);
    if (
        e.target.tagName === "LI" &&
        e.target.getAttribute("data-id") != stepNum
    ) {
        li = e.target;
        li.classList.add("currentStep");
        let currentStepNum = Number(li.getAttribute("data-id"));
        console.log(currentStepNum);

        stepper.querySelectorAll("li").forEach((step) => {
            let stepId = step.getAttribute("data-id");
            console.log("stepId: " + stepId);
            if (stepId == stepNum) {
                console.log(
                    "previous current step found: " + stepId + " " + stepNum
                );
                step.classList.remove("currentStep");
            }
            if (stepId > currentStepNum) {
                console.log("remove passedStep from nexts");
                step.classList.remove("passedStep");
            }
            if (stepNum < stepId && stepId <= currentStepNum) {
                console.log("add passedStep to missing previous");
                step.classList.add("passedStep");
            }
        });

        stepNum = currentStepNum;
        if (stepNum == 1) previousBtn.disabled = true;
        else if (stepNum > 1) previousBtn.disabled = false;
        if (stepNum < 11) nextBtn.disabled = false;
        else if (stepNum == 11) nextBtn.disabled = true;
        if (stepNum < 10) updateMainTitle(li);
    }
};

function main() {
    // TODO: call other functions for initial appearance and event listeners
    updateMainTitle();
    nextBtn.textContent = "Make Cv";
    fetchData(fillStepper);

    nextBtn.addEventListener("click", nextAction);
    previousBtn.addEventListener("click", previousAction);
    stepper.addEventListener("click", navigateStepper);
}
