let quizData = [];
let currentQuestion = 0;
let answers = {};
let quizTopic = '';
let quizFile = '';

// Get quiz topic from URL
function getQuizFileFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('topic');
}

// Initialize quiz
async function initQuiz() {
    console.log('Initializing quiz with file:', quizFile);
    quizTopic = quizFile.replace('.json', '').replace(/_/g, ' ');
    document.getElementById('quiz-title').textContent = quizTopic;
    
    try {
        const filePath = `json/${quizFile}`;
        console.log('Fetching quiz from:', filePath);
        const response = await fetch(filePath);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        quizData = await response.json();
        console.log('Quiz data loaded successfully, questions:', quizData.length);
        
        // Load saved state
        loadState();
        
        // Render first question
        renderQuestion();
    } catch (error) {
        console.error('Error loading quiz:', error);
        document.getElementById('quiz-container').innerHTML = 
            `<div class="loading">
                <p>ไม่สามารถโหลดข้อสอบได้</p>
                <p style="font-size: 0.9em; color: #666; margin-top: 10px;">
                    ไฟล์: ${quizFile}<br>
                    ข้อผิดพลาด: ${error.message}
                </p>
            </div>`;
    }
}

function loadState() {
    const stateKey = `quiz_state_${quizTopic}`;
    const savedState = localStorage.getItem(stateKey);
    
    if (savedState) {
        const state = JSON.parse(savedState);
        currentQuestion = state.currentQuestion || 0;
        answers = state.answers || {};
    }
}

function saveState() {
    const stateKey = `quiz_state_${quizTopic}`;
    const state = {
        currentQuestion,
        answers
    };
    localStorage.setItem(stateKey, JSON.stringify(state));
}

function renderQuestion() {
    if (currentQuestion >= quizData.length) {
        showResult();
        return;
    }
    
    const question = quizData[currentQuestion];
    const hasAnswered = answers.hasOwnProperty(currentQuestion);
    
    const container = document.getElementById('quiz-container');
    container.innerHTML = `
        <div class="question-number">คำถามที่ ${currentQuestion + 1} / ${quizData.length}</div>
        <div class="question-text">${question.text}</div>
        <div class="answers" id="answers-container"></div>
        ${hasAnswered ? `
            <div class="explanation">
                <div class="explanation-title">💡 คำอธิบาย</div>
                <div class="explanation-text">${question.info || 'ไม่มีคำอธิบาย'}</div>
            </div>
        ` : ''}
        <div class="quiz-actions">
            ${currentQuestion > 0 ? '<button id="prev-btn" class="btn-secondary">← ก่อนหน้า</button>' : ''}
            ${hasAnswered ? '<button id="next-btn" class="btn-primary">ถัดไป →</button>' : ''}
        </div>
    `;
    
    renderAnswers(question, hasAnswered);
    updateProgress();
    
    // Event listeners
    if (document.getElementById('prev-btn')) {
        document.getElementById('prev-btn').addEventListener('click', prevQuestion);
    }
    if (document.getElementById('next-btn')) {
        document.getElementById('next-btn').addEventListener('click', nextQuestion);
    }
}

function renderAnswers(question, hasAnswered) {
    const answersContainer = document.getElementById('answers-container');
    
    question.answers.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = answer.text;
        btn.disabled = hasAnswered;
        
        if (hasAnswered) {
            if (answer.correct) {
                btn.classList.add('correct');
            } else if (answers[currentQuestion] === index) {
                btn.classList.add('incorrect');
            }
        } else if (answers[currentQuestion] === index) {
            btn.classList.add('selected');
        }
        
        btn.addEventListener('click', () => selectAnswer(index));
        answersContainer.appendChild(btn);
    });
}

function selectAnswer(answerIndex) {
    answers[currentQuestion] = answerIndex;
    saveState();
    renderQuestion();
}

function nextQuestion() {
    currentQuestion++;
    saveState();
    renderQuestion();
}

function prevQuestion() {
    currentQuestion--;
    saveState();
    renderQuestion();
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
}

function showResult() {
    document.getElementById('quiz-container').classList.add('hidden');
    const resultContainer = document.getElementById('result-container');
    resultContainer.classList.remove('hidden');
    
    let correctCount = 0;
    quizData.forEach((question, index) => {
        const userAnswer = answers[index];
        if (userAnswer !== undefined && question.answers[userAnswer].correct) {
            correctCount++;
        }
    });
    
    const percentage = Math.round((correctCount / quizData.length) * 100);
    
    document.getElementById('score-display').innerHTML = `
        <div style="font-size: 3em; color: #667eea; font-weight: 700;">${percentage}%</div>
        <div class="score-detail">${correctCount} / ${quizData.length} ข้อถูกต้อง</div>
    `;
}

// Event listeners
document.getElementById('back-btn').addEventListener('click', () => {
    window.location.href = 'index.html';
});

document.getElementById('reset-btn').addEventListener('click', () => {
    if (confirm('ต้องการรีเซ็ตความก้าวหน้าและเริ่มใหม่?')) {
        const stateKey = `quiz_state_${quizTopic}`;
        localStorage.removeItem(stateKey);
        currentQuestion = 0;
        answers = {};
        renderQuestion();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Get quiz file from URL
    quizFile = getQuizFileFromURL();
    
    console.log('URL parameters:', window.location.search);
    console.log('quizFile value:', quizFile);
    
    if (!quizFile) {
        console.error('No quiz file specified in URL, redirecting to index');
        window.location.href = 'index.html';
        return;
    }
    
    if (document.getElementById('retry-btn')) {
        document.getElementById('retry-btn').addEventListener('click', () => {
            const stateKey = `quiz_state_${quizTopic}`;
            localStorage.removeItem(stateKey);
            window.location.reload();
        });
    }
    
    if (document.getElementById('home-btn')) {
        document.getElementById('home-btn').addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
    
    initQuiz();
});
