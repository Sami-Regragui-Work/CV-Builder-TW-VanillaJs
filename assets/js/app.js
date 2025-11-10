document.addEventListener("DOMContentLoaded", main);
/**
 * @type {Array} - taken from data json
 */
let forms;
/**
 * @type {Number} - tracking stepper form steps
 */
let stepNum;

// ids
const mainTitle = document.getElementById("main__title");
const nextBtn = document.getElementById("next-btn");
const stepper = document.getElementById("main__stepper");
const aside = document.getElementById("main__aside");
const previousBtn = document.getElementById("previous-btn");
const dynamicForm = document.querySelector(".form__replaceable");

/**
 * @function fetchData - fetch data from local json file to build form and progress bar later
 * @param {function} callback - to call fillStepper after the fetch ends
 */
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

const createInput = (infos) => {
    let input = document.createElement("input");
    input.type = infos.type;

    if (infos.type === "file") {
        input.accept = "image/*";
        input.className =
            "block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"; // this style is from ai
    } else {
        input.className =
            "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"; // same here

        if (infos.placeHolder) {
            input.placeholder = infos.placeHolder;
        }
    }

    input.id = infos.label;
    input.required = infos.required;
    input.value = infos.data;

    return input;
};

const createLabelInputDiv = (infos) => {
    let labInpDiv = document.createElement("div");

    // if (infos.type === "file")
    labInpDiv.className =
        infos.type === "file"
            ? "flex flex-col items-center gap-2 w-full"
            : "flex flex-col items-start gap-2 w-full";

    let lab = document.createElement("label");
    lab.htmlFor = infos.label;
    lab.className = "text-2xl font-bold text-(--title-black-clr)";
    lab.textContent = infos.label;

    if (infos.required) {
        let requiredSpan = document.createElement("span");
        requiredSpan.className = "text-(--danger-clr) ml-1";
        requiredSpan.textContent = "*";
        lab.appendChild(requiredSpan);
    }

    let inp = createInput(infos);

    labInpDiv.appendChild(lab);
    labInpDiv.appendChild(inp);
    return labInpDiv;
};

const fillForm = () => {
    dynamicForm.innerHTML = "";
    if (stepNum > 9) return;
    let inputsArr = forms.filter((aForm) => aForm.id == stepNum)[0].formInputs;
    console.log();
    inputsArr.forEach((row) => {
        let labInpDiv = createLabelInputDiv(row);
        dynamicForm.appendChild(labInpDiv);
    });
};

const nextProgressBar = () => {
    let step = stepper.querySelector(`[data-id='${stepNum}']`);
    step.classList.add("currentStep", "passedStep");
    let previousStep = step.previousElementSibling;
    // console.log(stepNum);
    if (previousStep) previousStep.classList.remove("currentStep");
    if (stepNum < 10) updateMainTitle(step);
};

const nextAction = (e) => {
    // TODO: next button click logic
    // prevent default
    // change its text once
    // show sidebar once
    // enable previous when step is 2
    // disable itself when at last step
    // move the progress bar to next
    e.preventDefault();

    if (e.target.classList.contains("makeCv")) {
        e.target.classList.remove("makeCv");
        aside.classList.remove("hidden");
        e.target.textContent = "Next";
        previousBtn.classList.remove("hidden");
        stepNum = 0;
    }

    stepNum++;
    if (stepNum == 2) previousBtn.disabled = false;
    else if (stepNum == 11) e.target.disabled = true;

    nextProgressBar();
    fillForm();
};

const previousProgressBar = () => {
    let step = stepper.querySelector(`[data-id='${stepNum}']`);
    step.classList.add("currentStep");
    let nextStep = step.nextElementSibling;
    // console.log(stepNum);
    nextStep.classList.remove("passedStep");
    nextStep.classList.remove("currentStep");
    if (stepNum < 10) updateMainTitle(step);
};

const previousAction = (e) => {
    e.preventDefault();

    stepNum--;
    if (stepNum == 1) e.target.disabled = true;
    else if (stepNum == 10) nextBtn.disabled = false;

    previousProgressBar();
    fillForm();
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
