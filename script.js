// ---------- START EXAM ----------
function startExam() {
    const name = document.getElementById("studentName").value;

    if (name.trim() === "") {
        alert("Please enter your name");
        return;
    }

    localStorage.setItem("studentName", name);
    window.location.href = "quiz.html";
}


// ---------- DISPLAY STUDENT NAME ON QUIZ PAGE ----------
if (document.getElementById("studentDisplay")) {
    const name = localStorage.getItem("studentName");
    document.getElementById("studentDisplay").textContent = name;
    // greeting section
    const greet = document.getElementById("greeting");
    if (greet) {
        greet.textContent = `Good luck, ${name}!`;
    }
}


// ---------- QUESTIONS - 5 SECTIONS (CLASS 2 MATHS) ----------
const sections = {
    "Addition (+)": [
        {type: "statement", q: "7 + 3 =", a: "10"},
        {type: "statement", q: "12 + 5 =", a: "17"},
        {type: "statement", q: "8 + 9 =", a: "17"},
        {type: "statement", q: "15 + 6 =", a: "21"},
        {type: "statement", q: "11 + 14 =", a: "25"},
        {type: "statement", q: "20 + 8 =", a: "28"},
        {type: "statement", q: "13 + 7 =", a: "20"},
        {type: "statement", q: "9 + 6 =", a: "15"},
        {type: "statement", q: "18 + 2 =", a: "20"},
        {type: "statement", q: "5 + 16 =", a: "21"}
    ],
    "Subtraction (-)": [
        {type: "statement", q: "15 - 3 =", a: "12"},
        {type: "statement", q: "20 - 8 =", a: "12"},
        {type: "statement", q: "18 - 5 =", a: "13"},
        {type: "statement", q: "25 - 6 =", a: "19"},
        {type: "statement", q: "30 - 12 =", a: "18"},
        {type: "statement", q: "14 - 7 =", a: "7"},
        {type: "statement", q: "22 - 9 =", a: "13"},
        {type: "statement", q: "16 - 4 =", a: "12"},
        {type: "statement", q: "28 - 10 =", a: "18"},
        {type: "statement", q: "19 - 8 =", a: "11"}
    ],
    "Multiplication (*)": [
        {type: "statement", q: "2 * 3 =", a: "6"},
        {type: "statement", q: "5 * 4 =", a: "20"},
        {type: "statement", q: "6 * 3 =", a: "18"},
        {type: "statement", q: "7 * 2 =", a: "14"},
        {type: "statement", q: "9 * 5 =", a: "45"},
        {type: "statement", q: "8 * 4 =", a: "32"},
        {type: "statement", q: "3 * 8 =", a: "24"},
        {type: "statement", q: "6 * 5 =", a: "30"},
        {type: "statement", q: "4 * 7 =", a: "28"},
        {type: "statement", q: "9 * 2 =", a: "18"}
    ],
    "Measurement": [
        {type: "statement", q: "What is the height of a pencil measured in?", a: "cm"},
        {type: "mc", q: "A book is about 20 cm. Is this length or width?", options: ["Length", "Width", "Height"], a: "0"},
        {type: "statement", q: "1 meter = ___ cm", a: "100"},
        {type: "mc", q: "Which is heavier - 1 kg or 500 grams?", options: ["1 kg", "500 grams", "Both same"], a: "0"},
        {type: "statement", q: "What unit measures the water we drink?", a: "litre"},
        {type: "mc", q: "A glass holds about how much liquid?", options: ["250 ml", "2 litre", "10 litre"], a: "0"},
        {type: "statement", q: "How many grams in 1 kg?", a: "1000"},
        {type: "mc", q: "Which is longer - 50 cm or 1 meter?", options: ["50 cm", "1 meter", "Both same"], a: "1"},
        {type: "statement", q: "A ball weighs 200 grams. How many such balls make 1 kg?", a: "5"},
        {type: "mc", q: "What measures liquids - weight or capacity?", options: ["Weight", "Capacity", "Length"], a: "1"}
    ],
    "Time": [
        {type: "statement", q: "How many days are there in a week?", a: "7"},
        {type: "mc", q: "Which is the first day of the week?", options: ["Saturday", "Sunday", "Monday"], a: "1"},
        {type: "statement", q: "How many months are there in a year?", a: "12"},
        {type: "mc", q: "After March comes which month?", options: ["February", "April", "May"], a: "1"},
        {type: "statement", q: "How many hours are there in one day?", a: "24"},
        {type: "mc", q: "If today is Tuesday, what day will it be after 2 days?", options: ["Wednesday", "Thursday", "Friday"], a: "1"},
        {type: "statement", q: "How many minutes are there in 1 hour?", a: "60"},
        {type: "mc", q: "Which season comes after spring?", options: ["Winter", "Summer", "Autumn"], a: "1"},
        {type: "statement", q: "December is the ___ month of the year.", a: "12"},
        {type: "mc", q: "If the clock shows 3 o'clock, what will it show after 1 hour?", options: ["2 o'clock", "4 o'clock", "5 o'clock"], a: "1"}
    ]
};

// Flatten all questions into single array for backwards compatibility
const questions = Object.values(sections).flat();


// ---------- LOAD QUESTIONS ----------
if (document.getElementById("questionBox")) {

    const box = document.getElementById("questionBox");
    let questionNum = 1;

    Object.entries(sections).forEach(([sectionName, sectionQuestions]) => {
        // Add section heading
        box.innerHTML += `<h3 style="color: #667eea; margin-top: 20px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">${sectionName}</h3>`;
        
        // Add questions for this section
        sectionQuestions.forEach((item, index) => {
            const globalIndex = questionNum - 1;
            
            if (item.type === "statement") {
                // Statement-based question with text input
                box.innerHTML += `
                    <div class="statement-question" style="margin-bottom:20px;">
                        <label><strong>${questionNum}) ${item.q}</strong></label><br>
                        <input type="text" id="q${globalIndex}" style="width: 150px; padding: 5px; margin-top: 5px;">
                    </div>
                `;
            } else if (item.type === "mc") {
                // Multiple choice question
                let optionsHtml = '';
                item.options.forEach((option, optIndex) => {
                    optionsHtml += `
                        <label style="display: block; margin: 8px 0;">
                            <input type="radio" name="q${globalIndex}" value="${optIndex}" id="q${globalIndex}_${optIndex}">
                            ${option}
                        </label>
                    `;
                });
                
                box.innerHTML += `
                    <div class="mc-question" style="margin-bottom:20px;">
                        <label><strong>${questionNum}) ${item.q}</strong></label><br>
                        <div style="margin-top: 10px;">
                            ${optionsHtml}
                        </div>
                    </div>
                `;
            }
            questionNum++;
        });
    });
}


// ---------- SUBMIT ----------
function submitExam() {

    let score = 0;

    questions.forEach((item, index) => {
        let isCorrect = false;
        
        if (item.type === "statement") {
            // For statement-based questions, check text input value
            const ans = document.getElementById("q" + index).value.trim();
            isCorrect = (ans.toLowerCase() === item.a.toLowerCase());
        } else if (item.type === "mc") {
            // For multiple choice, check which radio button is selected
            const selectedRadio = document.querySelector(`input[name="q${index}"]:checked`);
            if (selectedRadio) {
                isCorrect = (selectedRadio.value == item.a);
            }
        }
        
        if (isCorrect) {
            score++;
        }
    });

    localStorage.setItem("score", score);
    window.location.href = "result.html";
}


// ---------- RESULT PAGE ----------
if (document.getElementById("resultBox")) {
    // Prefer values from URL params (shareable link), otherwise fall back to localStorage
    const params = new URLSearchParams(window.location.search);
    const paramName = params.get('name');
    const paramScore = params.get('score');

    const name = paramName || localStorage.getItem("studentName") || 'Student';
    const score = paramScore || localStorage.getItem("score") || 0;
    const totalQuestions = questions.length;

    // Build a shareable absolute URL that points to this result page with name and score
    const shareUrl = `${window.location.origin}${window.location.pathname}?name=${encodeURIComponent(name)}&score=${encodeURIComponent(score)}`;

    document.getElementById("resultBox").innerHTML =
        `<h2>Result</h2>
         <p><strong>Name:</strong> ${name}</p>
         <p><strong>Score:</strong> ${score} / ${totalQuestions}</p>
         <h3>${getRemark(score)}</h3>
         <p style="margin-top:20px; color:#4b0082; font-weight:bold;">🎉 Good luck for your next challenge!</p>

         <div style="margin-top:18px;">
            <label style="font-weight:bold; display:block; margin-bottom:6px;">Shareable result URL:</label>
            <input type="text" id="shareUrlInput" value="${shareUrl}" readonly style="width:100%; padding:8px; box-sizing:border-box;">
            <button id="copyLinkBtn" style="margin-top:8px; padding:8px 12px;">Copy Link</button>
         </div>`;

    // Copy button behavior
    const copyBtn = document.getElementById('copyLinkBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            // try clipboard API, fallback to prompt
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(shareUrl).then(() => {
                    alert('Link copied to clipboard');
                }).catch(() => {
                    window.prompt('Copy this URL:', shareUrl);
                });
            } else {
                window.prompt('Copy this URL:', shareUrl);
            }
        });
    }
}


// ---------- REMARK ----------
function getRemark(score) {

    score = Number(score);

    if (score >= 45) return "🌟 Excellent Performance!";
    if (score >= 35) return "👏 Very Good!";
    if (score >= 25) return "🙂 Good Job!";
    return "📘 Need More Practice!";
}


// ---------- RESTART ----------
function restart() {
    localStorage.clear();
    window.location.href = "index.html";
}


// ---------- RESTART EXAM ----------
function restart() {
    localStorage.clear();
    window.location.href = "index.html";
}