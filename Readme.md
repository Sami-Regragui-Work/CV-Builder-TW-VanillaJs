# 🎓 CV-Builder-TW-VanillaJs Application

A modern and intuitive resume builder application developed with Vanilla JavaScript and TailwindCSS, offering a seamless multi-step form experience with dynamic field management, real-time validation, and professional CV template generation with PDF export capabilities.

## 📋 Table of Contents

-   [Overview](#overview)
-   [Key Features](#key-features)
-   [Technologies Used](#technologies-used)
-   [Project Structure](#project-structure)
-   [Demo](#demo)
-   [Installation](#installation)
-   [Performance Criteria](#performance-criteria)
-   [Implemented User Stories](#implemented-user-stories)
-   [Bonus Features](#bonus-features)
-   [Author](#author)
-   [Acknowledgments](#acknowledgments)
-   [License](#license)

## <div id="overview">🎯 Overview</div>

CV-Builder-TW-VanillaJs is a comprehensive resume builder that guides users through a structured multi-step form to create professional CVs. The application stands out with its dynamic form handling, real-time validation, customizable templates, and the ability to export resumes as PDF or JSON files.

### Key Benefits

-   **📝 Guided Step-by-Step Form**: Multi-step stepper form with clear navigation and progress tracking
-   **⚡ Dynamic Form Fields**: Add/remove multiple entries for skills, languages, education, experience, and certifications
-   **✅ Real-Time Validation**: Instant feedback with format validation for emails, phone numbers, and URLs
-   **🎨 Customizable Templates**: Choose between two professional CV designs with live preview
-   **💾 Data Persistence**: Optional saving of created CVs for future modifications
-   **📄 Multiple Export Options**: Download as PDF or export data as JSON

## <div id="key-features">🛠 Key Features</div>

### 1. **Multi-Step Stepper Form with Validation**

**Personal Information** - Fields for full name, profile photo, email, phone, address, LinkedIn, GitHub, portfolio, etc.

**Professional Details** - Job title and professional summary fields

**Technical & Soft Skills** - Two distinct sections for hard skills and soft skills with dynamic field addition

**Languages** - List of languages with proficiency levels, dynamically expandable

**Hobbies & Interests** - List of hobbies with the ability to add additional entries

**Education** - Academic background details with dynamic forms for multiple degrees

**Professional Experience** - Previous job details with dynamic addition of multiple experiences

**Certifications** - List of certifications with names and associated links, dynamically expandable

### 2. **Progress Tracking**

-   Visual progress bar for each step showing user advancement
-   Dynamic update as user progresses through the form
-   Progress decreases when navigating backward

### 3. **Customizable CV Templates**

-   Two distinct professional CV designs built with TailwindCSS
-   **Real-time live preview**: Both templates displayed simultaneously with user's entered information
-   Templates dynamically populate as user fills the form
-   Side-by-side comparison view for easy template selection
-   Instant template switching capability

### 4. **Save Options**

-   Optional saving of created CVs within the application
-   Retrieve and modify saved CVs for future use
-   Data persistence using localStorage

### 5. **Field Validation**

-   Type-specific validation (email format, phone format, URL validation)
-   Real-time error/success messages during input
-   Prevention of proceeding to next step with invalid data
-   Clear error indicators under each field

### 6. **Dynamic Form Management**

-   Add/remove fields for repetitive information (skills, languages, education, experience)
-   Instant field appearance without page reload
-   Delete added fields before finalizing CV
-   Smooth animations for field addition/removal

### 7. **Export & Download**

-   **PDF Export**: Download professional CV in PDF format maintaining layout
-   **JSON Export**: Generate JSON file containing all CV information (Bonus)
-   **Print Option**: Direct printing capability
-   Preserves chosen template design in exported files

## <div id="technologies-used">💻 Technologies Used</div>

-   **Vanilla JavaScript**: Pure DOM manipulation without frameworks for lightweight performance
-   **HTML5**: Semantic structure with native form validation
-   **TailwindCSS**: Utility-first CSS framework for rapid, responsive UI development and template design
-   **LocalStorage API**: Optional data persistence for CV storage
-   **JSON Manipulation**: Data structuring and export functionality
-   **PDF Generation Library**: For exporting CVs as downloadable PDFs

## <div id="project-structure">📁 Project Structure</div>

```
📦 CV-Builder-TW-VanillaJs
├── 📂 assets/
│   ├── 📂 css/
│   │   ├── 📄 custom.css              # Tailwind import and custom styles (linked in index.html)
│   │   └── 📄 styles.css              # Tailwind CSS output file
│   ├── 📂 images/                     # Screenshots and template previews
│   ├── 📂 js/
│   │   └── 📄 app.js                  # Main application logic with modular functions
│   ├── 📂 templates/
│   │   ├── 📄 template1.html          # Modern minimalist CV design (TailwindCSS)
│   │   └── 📄 template2.html          # Classic professional CV layout (TailwindCSS)
│   └── 📄 localData.json              # Local data storage/configuration
├── 📄 index.html                      # Main HTML with stepper form and template preview area
├── 📄 package-lock.json               # NPM dependency lock file
├── 📄 package.json                    # NPM project configuration
└── 📄 Readme.md                       # Project documentation
```

### File Descriptions

**JavaScript Module (`app.js`):**

The main JavaScript file contains modular functions organized by responsibility:

-   **Stepper Management**: Step-by-step navigation, step visibility, and form progression
-   **Validation Functions**: Implements validation rules for different field types:
    -   Email validation using regex
    -   Phone number format validation
    -   URL validation for LinkedIn, GitHub, portfolio links
    -   Required field checks
-   **Dynamic Forms Handler**: Manages dynamic addition and removal of form fields:
    -   Skills (technical and soft)
    -   Languages with proficiency levels
    -   Education entries
    -   Professional experiences
    -   Certifications
    -   Hobbies
-   **Progress Bar Logic**: Calculates and updates progress percentage based on completed steps
-   **Template Manager**: Handles CV template population and live preview:
    -   Real-time data binding from form to templates
    -   Simultaneous dual-template preview rendering
    -   Template selection and switching
-   **Export Utilities**:
    -   PDF generation from selected template with user data
    -   JSON file creation containing all CV information (Bonus)
-   **App Initialization**: Coordinates all modules and manages global state

**Templates (TailwindCSS-based):**

-   **`template1.html`**: Modern, minimalist CV design with clean typography and contemporary layout built entirely with TailwindCSS utility classes
-   **`template2.html`**: Classic, professional CV layout with traditional structure styled using TailwindCSS utilities

**Note on Template Preview**: Both templates are rendered as mini HTML pages within the main application, displaying side-by-side in a preview container. As users fill the form, both templates update simultaneously with their entered information, allowing real-time comparison before final selection.

**HTML Structure (`index.html`):**

Contains:

-   Multi-step stepper form with 8 progressive steps
-   Progress bar component with percentage indicator
-   Navigation buttons (Previous/Next/Submit)
-   Form sections for each information category with dynamic fields
-   **Dual template preview area** displaying both templates simultaneously
-   Template selection controls
-   Export options interface (PDF/JSON download buttons)

## <div id="demo">📺 Demo</div>

The application is hosted on GitHub Pages and accessible via the following link:  
**[🔗 View the live demo](https://Sami-Regragui-Work.github.io/CV-Builder-TW-VanillaJs/)**

### Screenshots

#### Step 1: Personal Information

_Form for entering basic personal details with photo upload_

#### Step 4: Languages & Hobbies

_Dynamic form fields for adding multiple languages and hobbies_

#### Step 7: CV Preview & Template Selection

_Side-by-side live preview of both CV templates filled with user's information_

#### Final: Export Options

_Download selected template as PDF or export all data as JSON_

## <div id="installation">📥 Installation</div>

### Prerequisites

-   Modern web browser (Chrome, Firefox, Safari, Edge)
-   Node.js and npm (for TailwindCSS compilation if modifying styles)

### Installation Steps

1. **Clone the repository**

    ```bash
    git clone https://github.com/Sami-Regragui-Work/CV-Builder-TW-VanillaJs.git
    cd CV-Builder-TW-VanillaJs
    ```

2. **Install TailwindCSS dependencies (optional, for development)**

    ```bash
    npm install
    ```

3. **Open the project**

    - Option 1: Double-click `index.html` to open in browser
    - Option 2: Use Live Server (VSCode extension) for development
    - Option 3: Visit GitHub Pages: `https://Sami-Regragui-Work.github.io/CV-Builder-TW-VanillaJs/`

4. **Start building your CV**
    - Follow the step-by-step form
    - Fill in your information with real-time validation
    - Add multiple entries for skills, experience, education
    - **Watch both templates preview update live** as you type
    - Compare templates side-by-side before choosing
    - Select your preferred template
    - Download as PDF or export as JSON

## <div id="performance-criteria">⚙️ Performance Criteria</div>

The application meets the following performance criteria:

-   ✅ **Intuitive and Responsive UI**: Clear stepper navigation with visual feedback and mobile-responsive design
-   ✅ **Effective Field Validation**: Ensures data integrity with format-specific validation and clear error messages
-   ✅ **Dynamic Form Updates**: All interactions occur without page refresh through DOM manipulation
-   ✅ **100% Functional Form Management**: Complete stepper with all 8 steps working seamlessly
-   ✅ **Reliable Save Function**: Optional localStorage implementation for CV persistence

### Additional Performance Metrics:

-   ⚡ **Fast Load Time**: Lightweight vanilla JavaScript ensures quick initial load
-   🎯 **Accessibility**: ARIA labels and keyboard navigation support
-   📱 **Fully Responsive**: Works seamlessly on mobile, tablet, and desktop
-   ♿ **WCAG Compliant**: Follows web accessibility guidelines
-   🔄 **Real-Time Template Rendering**: Instant preview updates across both templates as user types

## <div id="implemented-user-stories">✅ Implemented User Stories</div>

### 1. CV Creation

**User Story**: As a user, I want to create a CV by filling out a multi-step form to organize my personal and professional information clearly and structurally.

**Acceptance Criteria:**

-   ✅ Can access the form and see clearly defined steps
-   ✅ Can navigate between steps without losing entered data
-   ✅ Each step is linked to a specific type of information

### 2. Multi-Step Form

**User Story**: As a user, I want to fill out my CV following a form divided into multiple steps so that adding information is guided and simple.

**Acceptance Criteria:**

-   ✅ Can see the name of each step to know what information is requested
-   ✅ "Next" button allows moving to the next step, "Previous" button to go back
-   ✅ Can see a progress bar indicating CV completion advancement

### 3. Dynamic Forms for Multiple Entries

**User Story**: As a user, I want to dynamically add multiple skills, languages, education, professional experiences, and certifications so my CV reflects all my qualifications and experiences.

**Acceptance Criteria:**

-   ✅ In each section requiring repetitive information, an "Add" button allows adding additional fields
-   ✅ New added fields appear instantly without page reload
-   ✅ Can delete added fields if I want to remove information before finalizing CV

### 4. Field Validation

**User Story**: As a user, I want to be notified when entered information doesn't meet the expected format so I can correct errors before submitting the CV.

**Acceptance Criteria:**

-   ✅ During input, each field is validated according to its type (email, URL, phone number)
-   ✅ If an error is detected, a clear error message appears under the concerned field
-   ✅ Cannot proceed to the next step until all required information is valid

### 5. Progress Tracking

**User Story**: As a user, I want to see a progress bar that visually shows me the advancement of my CV creation so I know how many steps remain.

**Acceptance Criteria:**

-   ✅ Progress bar increases with each completed step
-   ✅ Progress displays dynamically as I advance through steps
-   ✅ If I go back, the progress bar decreases to reflect the change

### 6. CV Template Selection

**User Story**: As a user, I want to choose from two CV templates to select the one that best matches my visual preferences.

**Acceptance Criteria:**

-   ✅ After entering my information, I can see a preview of the two available CV templates
-   ✅ **Both templates display simultaneously, filled with my entered information**
-   ✅ Can compare templates side-by-side in real-time
-   ✅ Can select preferred template before final export

### 7. CV Download and Print

**User Story**: As a user, I want to download or print my final CV to send it or use it in an interview.

**Acceptance Criteria:**

-   ✅ Can click a "Download" button to get a PDF version of my CV
-   ✅ Can click a "Print" button to directly print my CV
-   ✅ The PDF file preserves the layout and information from my chosen template

## <div id="bonus-features">🎉 Bonus Features</div>

### Implemented Bonus Features:

-   **📄 JSON Export**: Generate and download a JSON file containing all CV information for data portability
-   **💾 CV Save System**: Optional localStorage implementation to save created CVs for future editing
-   **🎨 Dual Template Preview**: Both templates rendered simultaneously with live data binding
-   **🔍 Real-Time Preview**: Live CV preview updates as user types in any field
-   **📊 Completion Percentage**: Detailed breakdown showing completion status of each section
-   **♿ Enhanced Accessibility**: Full keyboard navigation and screen reader optimization

### Future Enhancement Ideas:

-   **🤝 Collaboration**: Share CV with others for feedback
-   **📧 Email Integration**: Send CV directly via email from the application
-   **🎯 ATS Optimization**: Tips and suggestions for Applicant Tracking System compatibility

## <div id="author">👤 Author</div>

**Sami Regragui**  
Project completed as part of the YouCode Youssoufia training, supervised by Mr. Aymane Benhima

---

## <div id="acknowledgments">🙏 Acknowledgments</div>

Special thanks to:

-   **Mr. Aymane Benhima** - Project supervisor
-   **YouCode Youssoufia** - Training program
-   **TailwindCSS Team** - For the excellent utility-first CSS framework
-   **Open Source Community** - For inspiration and resources

---

## <div id="license">📄 License</div>

This project is an educational project. Can be used for learning purposes without restrictions, or for commercial use with this readme included.

---

**Note**: This application uses Vanilla JavaScript and TailwindCSS, demonstrating mastery of modern web development practices without relying on heavy frameworks. The modular architecture ensures maintainability and scalability for future enhancements.

---

**Tech Stack:** HTML5 | TailwindCSS | Vanilla JavaScript (Native DOM)  
**Final Goal:** A fluid, responsive, accessible app with dual-template live preview, JSON + PDF export capabilities
