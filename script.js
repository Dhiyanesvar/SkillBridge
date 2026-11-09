// ==================================
// SKILLBRIDGE - DATA STORAGE
// ==================================

let skills = JSON.parse(
    localStorage.getItem("skills")
) || [];

let questions = JSON.parse(
    localStorage.getItem("questions")
) || [];

let requests = JSON.parse(
    localStorage.getItem("requests")
) || [];


// ==================================
// SKILL EXCHANGE ELEMENTS
// ==================================

const studentName = document.getElementById("studentName");

const department = document.getElementById("department");

const year = document.getElementById("year");

const skillType = document.getElementById("skillType");

const skillName = document.getElementById("skillName");

const skillDescription = document.getElementById("skillDescription");

const addSkillBtn = document.getElementById("addSkillBtn");

const skillList = document.getElementById("skillList");

const skillSearch = document.getElementById("skillSearch");

const skillFilter = document.getElementById("skillFilter");


// ==================================
// ADD A NEW SKILL
// ==================================

addSkillBtn.addEventListener("click", function() {

    let name = studentName.value.trim();

    let dept = department.value.trim();

    let studentYear = year.value;

    let type = skillType.value;

    let skill = skillName.value.trim();

    let description = skillDescription.value.trim();


    if (
        name === "" ||
        dept === "" ||
        studentYear === "" ||
        skill === "" ||
        description === ""
    ) {

        alert("Please fill in all fields!");

        return;

    }


    let newSkill = {

        id: Date.now(),

        student: name,

        department: dept,

        year: studentYear,

        type: type,

        name: skill,

        description: description

    };


    skills.push(newSkill);

    localStorage.setItem(
        "skills",
        JSON.stringify(skills)
    );


    studentName.value = "";
    department.value = "";
    year.value = "";
    skillName.value = "";
    skillDescription.value = "";


    displaySkills();

});


// ==================================
// DISPLAY SKILLS
// ==================================

function displaySkills() {

    skillList.innerHTML = "";

    let searchText = skillSearch.value.toLowerCase();

    let filterType = skillFilter.value;


    let filteredSkills = skills.filter(function(skill) {

        let matchesSearch =

            skill.name.toLowerCase().includes(searchText) ||

            skill.description.toLowerCase().includes(searchText) ||

            skill.student.toLowerCase().includes(searchText) ||

            skill.department.toLowerCase().includes(searchText);


        let matchesType =

            filterType === "All" ||

            skill.type === filterType;


        return matchesSearch && matchesType;

    });


    if (filteredSkills.length === 0) {

        skillList.textContent = "No matching skills found.";

        skillList.className = "empty-message";

        return;

    }

    skillList.className = "skill-list";


    filteredSkills.forEach(function(skill) {

        let card = document.createElement("div");

        card.className = "skill-item";


        let badge = document.createElement("span");

        badge.className = "badge";

        badge.textContent = skill.type === "Teach"
            ? "Can Teach"
            : "Wants to Learn";


        let heading = document.createElement("h3");

        heading.textContent = skill.name;


        let description = document.createElement("p");

        description.textContent = skill.description;


        let info = document.createElement("p");

        info.className = "student-info";

        info.textContent =

            skill.student + " | " +

            skill.department + " | " +

            skill.year;


        let connectBtn = document.createElement("button");

        connectBtn.textContent = "Connect";


        connectBtn.addEventListener("click", function() {

            sendRequest(skill);

        });


        card.appendChild(badge);

        card.appendChild(heading);

        card.appendChild(description);

        card.appendChild(info);

        card.appendChild(connectBtn);


        skillList.appendChild(card);

    });

}


// ==================================
// SEARCH AND FILTER
// ==================================

skillSearch.addEventListener("input", displaySkills);

skillFilter.addEventListener("change", displaySkills);


// ==================================
// CONNECT REQUEST
// ==================================

function sendRequest(skill) {

    let request = {

        skillId: skill.id,

        student: skill.student,

        skill: skill.name,

        date: new Date().toLocaleString()

    };


    requests.push(request);


    localStorage.setItem(
        "requests",
        JSON.stringify(requests)
    );


    alert(
        "Connection request saved for " +
        skill.student +
        "!"
    );

}


// ==================================
// HELPLOOP ELEMENTS
// ==================================

const questionName = document.getElementById("questionName");

const questionTitle = document.getElementById("questionTitle");

const questionDescription = document.getElementById("questionDescription");

const postQuestionBtn = document.getElementById("postQuestionBtn");

const questionList = document.getElementById("questionList");


// ==================================
// POST A QUESTION
// ==================================

postQuestionBtn.addEventListener("click", function() {

    let name = questionName.value.trim();

    let title = questionTitle.value.trim();

    let description = questionDescription.value.trim();


    if (
        name === "" ||
        title === "" ||
        description === ""
    ) {

        alert("Please fill in all fields!");

        return;

    }


    let newQuestion = {

        id: Date.now(),

        student: name,

        title: title,

        description: description,

        responses: []

    };


    questions.push(newQuestion);


    localStorage.setItem(
        "questions",
        JSON.stringify(questions)
    );


    questionName.value = "";

    questionTitle.value = "";

    questionDescription.value = "";


    displayQuestions();

});


// ==================================
// DISPLAY QUESTIONS
// ==================================

function displayQuestions() {

    questionList.innerHTML = "";


    if (questions.length === 0) {

        questionList.textContent =
            "No questions yet. Be the first to ask!";

        questionList.className = "empty-message";

        return;

    }


    questionList.className = "question-list";


    questions.forEach(function(question) {

        let card = document.createElement("div");

        card.className = "question-card";


        let author = document.createElement("span");

        author.className = "badge";

        author.textContent = "Asked by " + question.student;


        let title = document.createElement("h3");

        title.textContent = question.title;


        let description = document.createElement("p");

        description.textContent = question.description;


        card.appendChild(author);

        card.appendChild(title);

        card.appendChild(description);


        // DISPLAY RESPONSES

        question.responses.forEach(function(response) {

            let responseCard = document.createElement("div");

            responseCard.className = "response";

            responseCard.textContent =
                response.student + ": " + response.message;

            card.appendChild(responseCard);

        });


        // RESPONSE INPUT

        let responseName = document.createElement("input");

        responseName.placeholder = "Your name";


        let responseInput = document.createElement("input");

        responseInput.placeholder = "Write your response...";


        let responseBtn = document.createElement("button");

        responseBtn.textContent = "Reply";


        responseBtn.addEventListener("click", function() {

            let name = responseName.value.trim();

            let message = responseInput.value.trim();


            if (name === "" || message === "") {

                alert("Please enter your name and response!");

                return;

            }


            question.responses.push({

                student: name,

                message: message

            });


            localStorage.setItem(
                "questions",
                JSON.stringify(questions)
            );


            displayQuestions();

        });


        card.appendChild(responseName);

        card.appendChild(responseInput);

        card.appendChild(responseBtn);


        questionList.appendChild(card);

    });

}


// ==================================
// LOAD SAVED DATA
// ==================================

displaySkills();

displayQuestions();