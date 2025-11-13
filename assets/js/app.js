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
    // DONE: main title change
    mainTitle.textContent = !step
        ? "Start Making Cv easily now"
        : `Please share your ${step.textContent}`;
};

const fillStepper = () => {
    // console/.log(forms);
    forms.forEach((form) => {
        const li = document.createElement("li");
        li.textContent = form.title;
        li.setAttribute("data-id", form.id);
        stepper.appendChild(li);
    });
};

// const createInput = (infos) => {
//     const input = document.createElement("input");
//     input.type = infos.type;

//     if (infos.type === "file") {
//         input.accept = "image/*";
//         input.className =
//             "block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"; // this style is from ai
//     } else {
//         input.className =
//             "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"; // same here

//         if (infos.placeHolder) {
//             input.placeholder = infos.placeHolder;
//         }
//     }

//     input.id = infos.label;
//     input.required = infos.required;
//     input.value = infos.data;

//     return input;
// };

// const createLabelInputDiv = (infos) => {
//     const labInpDiv = document.createElement("div");

//     // if (infos.type === "file")
//     labInpDiv.className =
//         infos.type === "file"
//             ? "flex flex-col items-center gap-2 w-full"
//             : "flex flex-col items-start gap-2 w-full";

//     const lab = document.createElement("label");
//     lab.htmlFor = infos.label;
//     lab.className = "text-2xl font-bold text-(--title-black-clr)";
//     lab.textContent = infos.label;

//     if (infos.required) {
//         const requiredSpan = document.createElement("span");
//         requiredSpan.className = "text-(--danger-clr) ml-1";
//         requiredSpan.textContent = "*";
//         lab.appendChild(requiredSpan);
//     }

//     const inp = createInput(infos);

//     labInpDiv.appendChild(lab);
//     labInpDiv.appendChild(inp);
//     return labInpDiv;
// };

// const fillForm = () => {
//     dynamicForm.innerHTML = "";
//     if (stepNum > 9) return;
//     const inputsArr = forms.filter((aForm) => aForm.id == stepNum)[0]
//         .formReaders;
//     console/.log();
//     inputsArr.forEach((row) => {
//         const labInpDiv = createLabelInputDiv(row);
//         dynamicForm.appendChild(labInpDiv);
//     });
// };

const createImgFileReader = (reader) => {
    const colInner = document.createElement("div");

    colInner.className = "flex flex-col items-center gap-2 w-full";

    const fileReader = document.createElement("input");
    fileReader.type = "file";
    fileReader.accept = "image/*";
    fileReader.id = reader.label;
    fileReader.required = reader.required;
    fileReader.className = "hidden";

    const imgLabel = document.createElement("label");
    imgLabel.htmlFor = reader.label;
    imgLabel.className =
        "w-48 h-48 border-2 border-dashed border-(--secondary-text-clr) rounded-2xl flex items-center justify-center cursor-pointer hover:border-(--secondary-grad-clr) hover:bg-(--title-white-clr) transition-all overflow-hidden"; // ai

    const preview = document.createElement("div");
    preview.className = "w-full h-full flex items-center justify-center";

    const placeHolder = document.createElement("span");
    placeHolder.textContent = "Click to upload";
    placeHolder.className =
        "text-2xl text-(--secondary-text-clr) font-semibold";

    preview.appendChild(placeHolder);

    imgLabel.appendChild(preview);

    fileReader.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            const aReader = new FileReader();
            aReader.addEventListener("load", (event) => {
                preview.innerHTML = "";

                const img = document.createElement("img");
                img.src = event.target.result; // aReader.result
                img.className = "w-full h-full object-fit";
                preview.appendChild(img);

                reader.data = event.target.result;
            });
            aReader.readAsDataURL(file);
        }
    });

    // if (reader.data) {
    //     preview.innerHTML = "";
    //     const img = document.createElement("img");
    //     img.src = reader.data;
    //     img.className = "w-full h-full object-fit";
    //     preview.appendChild(img);
    // }
    colInner.appendChild(fileReader);
    colInner.appendChild(imgLabel);

    return colInner;
};

const createTextInput = (reader) => {
    const input = document.createElement("input");
    input.type = reader.type;
    input.className =
        "w-full px-4 py-3 text-2xl border-2 border-(--secondary-text-clr) text-(--title-black-clr) rounded-2xl focus:ring-2 focus:ring-(--secondary-grad-clr) focus:border-(--secondary-grad-clr) outline-none transition-all"; // ai

    if (reader.placeHolder) {
        input.placeholder = reader.placeHolder;
    }

    input.id = reader.label;
    input.required = reader.required;
    input.value = reader.data || "";

    return input;
};

const createMultyValuesInput = (reader) => {
    const colInner = document.createElement("div");
    colInner.className = "flex flex-col gap-2 w-full";

    const input = document.createElement("input");
    input.type = "text";
    input.className =
        "w-full px-4 py-3 text-2xl border-2 border-(--secondary-text-clr) text-(--title-black-clr) rounded-2xl focus:ring-2 focus:ring-(--secondary-grad-clr) focus:border-(--secondary-grad-clr) outline-none transition-all"; //ai
    input.placeholder = reader.placeHolder;
    input.id = reader.label;
    input.setAttribute("data-type", "tags");

    const tags = document.createElement("div");
    tags.className = "flex flex-wrap gap-2 w-full";
    tags.setAttribute("data-tags-for", reader.label);

    colInner.appendChild(input);
    colInner.appendChild(tags);

    return colInner;
};

const createQuillReader = (reader) => {
    const colInner = document.createElement("div");
    colInner.className = "w-full";

    const editor = document.createElement("div");
    editor.id = `editor-${reader.label}`;
    editor.className =
        "bg-(--title-white-clr) border-2 border-(--secondary-text-clr) rounded-2xl";
    editor.setAttribute("data-type", "richtext");

    colInner.appendChild(editor);

    setTimeout(() => {
        new Quill(`#editor-${reader.label}`, {
            theme: "snow",
            placeholder: reader.placeHolder,
            modules: {
                toolbar: [
                    ["bold", "italic", "underline"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["clean"],
                ],
            },
        });

        const qlContainer = document.querySelector(".ql-container");
        const qlEditor = document.querySelector(".ql-container");
        // console.log(container);
        qlContainer.style.height = "auto";
        qlEditor.classList.add("min-h-38");
    }, 0);

    return colInner;
};

const createTag = (value) => {
    const tag = document.createElement("div");
    tag.className =
        "flex items-center gap-2 px-4 py-2 bg-(--primary-grad-clr) text-(--title-white-clr) rounded-2xl text-xl"; //ai
    tag.setAttribute("data-tag-value", value);

    const textDiv = document.createElement("div");
    textDiv.textContent = value;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "x";
    removeBtn.className =
        "text-2xl font-bold hover:text-(--secondary-clr) cursor-pointer"; //ai
    removeBtn.type = "button";
    removeBtn.setAttribute("data-action", "remove-tag");

    tag.appendChild(textDiv);
    tag.appendChild(removeBtn);

    return tag;
};

const fillCol = (reader) => {
    const col = document.createElement("div");
    col.className = "flex flex-col gap-2 w-full";
    col.classList.add(reader.type === "file" ? "items-center" : "items-start");

    const lab = document.createElement("label");
    if (reader.type !== "richtext") lab.htmlFor = reader.label;
    lab.className = "text-2xl font-bold text-(--title-black-clr)";
    lab.textContent = reader.label;

    if (reader.required) {
        const requiredSpan = document.createElement("span");
        requiredSpan.className = "text-(--secondary-clr) ml-1";
        requiredSpan.textContent = "*";
        lab.appendChild(requiredSpan);
    }

    let readerElem;

    switch (reader.type) {
        case "file":
            readerElem = createImgFileReader(reader);
            break;
        case "tags":
            readerElem = createMultyValuesInput(reader);
            break;
        case "richtext":
            readerElem = createQuillReader(reader);
            break;
        default:
            readerElem = createTextInput(reader);
            break;
    }

    const errSpan = document.createElement("span");
    errSpan.className = "text-(--secondary-clr) text-xl hidden";
    errSpan.setAttribute("error-for", reader.label);

    col.appendChild(lab);
    col.appendChild(readerElem);
    col.appendChild(errSpan);

    return col;
};

const formRow = (reader, oldRow = null) => {
    const newCol = fillCol(reader);
    if (!oldRow) {
        // new row
        const newRow = document.createElement("div");
        newRow.className = "flex w-full";
        const maxCol = reader.cols;
        if (maxCol > 1) newRow.classList.add(`gap-${5 - 0.5 * maxCol}`);

        newRow.appendChild(newCol);
        return newRow;
    }
    oldRow.appendChild(newCol);
    return oldRow;
};

const fillForm = () => {
    dynamicForm.innerHTML = "";
    dynamicForm.classList.add("min-h-[355px]");
    if (stepNum > 9) return;
    // const readersArr = forms.filter((aForm) => aForm.id == stepNum)[0]
    //     .formReaders;
    const readersArr = forms.at(stepNum - 1).formReaders;
    // console/.log(readersArr);

    let newRow = null;
    let cols = 0;
    // let maxCol = readersArr
    //     .map((attrs) => attrs.cols)
    //     .reduce((bigger, col) => Math.max(bigger, col), -1);
    let maxCol = null;

    readersArr.forEach((reader) => {
        // when to create a NEW row
        if (!newRow | (cols == maxCol) | (reader.cols == 1)) {
            newRow = formRow(reader); // formRow(reader, oldRow = null)
            dynamicForm.appendChild(newRow);
            cols = 0;
            maxCol = reader.cols;
            // newRow = true;
            // console/.log(`new row should have ${maxCol} cols`);
            // console/.log(`how many cols in this row ${cols + 1}`);
        } else {
            newRow = formRow(reader, newRow);
            // console/.log(`how many cols in the previous row ${cols + 1}`);
        }
        cols++;
    });
};

const nextProgressBar = () => {
    const step = stepper.querySelector(`[data-id='${stepNum}']`);
    step.classList.add("currentStep", "passedStep");
    const previousStep = step.previousElementSibling;
    // console/.log(stepNum);
    if (previousStep) previousStep.classList.remove("currentStep");
    if (stepNum < 10) updateMainTitle(step);
};

const nextAction = (e) => {
    // DONE: next button click logic
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
    const step = stepper.querySelector(`[data-id='${stepNum}']`);
    step.classList.add("currentStep");
    const nextStep = step.nextElementSibling;
    // console/.log(stepNum);
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
    // console/.log(stepNum);
    if (
        e.target.tagName === "LI" &&
        e.target.getAttribute("data-id") != stepNum
    ) {
        li = e.target;
        li.classList.add("currentStep");
        const currentStepNum = Number(li.getAttribute("data-id"));
        // console/.log(currentStepNum);

        stepper.querySelectorAll("li").forEach((step) => {
            const stepId = step.getAttribute("data-id");
            // console/.log("stepId: " + stepId);
            if (stepId == stepNum) {
                // console/.log("previous current step found: " + stepId + " " + stepNum);
                step.classList.remove("currentStep");
            }
            if (stepId > currentStepNum) {
                // console/.log("remove passedStep from nexts");
                step.classList.remove("passedStep");
            }
            if (stepNum < stepId && stepId <= currentStepNum) {
                // console/.log("add passedStep to missing previous");
                step.classList.add("passedStep");
            }
        });

        stepNum = currentStepNum;
        if (stepNum == 1) previousBtn.disabled = true;
        else if (stepNum > 1) previousBtn.disabled = false;
        if (stepNum < 11) nextBtn.disabled = false;
        else if (stepNum == 11) nextBtn.disabled = true;
        if (stepNum < 10) updateMainTitle(li);

        fillForm();
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
