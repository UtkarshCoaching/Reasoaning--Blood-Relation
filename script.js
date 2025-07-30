document.addEventListener('DOMContentLoaded', () => {
    const nameInputScreen = document.getElementById('nameInputScreen');
    const userNameInput = document.getElementById('userNameInput');
    const proceedToStartScreenButton = document.getElementById('proceedToStartScreenButton');
    const nameInputMessage = document.getElementById('nameInputMessage');

    const startScreen = document.getElementById('startScreen');
    const totalQuestionsInfo = document.getElementById('totalQuestionsInfo');
    const fullMarksInfo = document.getElementById('fullMarksInfo');
    const quizTimeLimitInput = document.getElementById('quizTimeLimitInput'); // কুইজের মোট সময় ইনপুট
    const startButton = document.getElementById('startButton');

    const quizScreen = document.getElementById('quizScreen');
    const globalTimerDisplay = document.getElementById('globalTimer'); // গ্লোবাল টাইমার ডিসপ্লে
    const questionTimerRect = document.getElementById('questionTimerRect'); // আয়তাকার প্রশ্ন টাইমার বার
    const questionTimerText = document.getElementById('questionTimerText'); // আয়তাকার প্রশ্ন টাইমার টেক্সট (এখন শুধু টেক্সট দেখাবে, কাউন্টডাউন নয়)
    const scoreDisplay = document.getElementById('scoreDisplay');
    const questionIndexDisplay = document.getElementById('questionIndexDisplay'); // এই লাইনটি সঠিক করা হয়েছে
    const questionTextBox = document.getElementById('questionTextBox');
    const optionsContainer = document.getElementById('optionsContainer');
    const feedbackMessage = document.getElementById('feedbackMessage');
    const nextButton = document.getElementById('nextButton');
    const skipButton = document.getElementById('skipButton');
    const submitButton = document.getElementById('submitButton');

    const resultScreen = document.getElementById('resultScreen');
    const finalScore = document.getElementById('finalScore');
    const correctAnswers = document.getElementById('correctAnswers');
    const wrongAnswers = document.getElementById('wrongAnswers');
    const skippedQuestions = document.getElementById('skippedQuestions');
    const finalTotalQuestions = document.getElementById('finalTotalQuestions');
    const yourPercentage = document.getElementById('yourPercentage');
    const percentageBarFill = document.getElementById('percentageBarFill');
    const showAllAnswersButton = document.getElementById('showAllAnswersButton');
    const showCorrectAnswersButton = document.getElementById('showCorrectAnswersButton');
    const showWrongAnswersButton = document.getElementById('showWrongAnswersButton');
    const showSkippedQuestionsButton = document.getElementById('showSkippedQuestionsButton');
    const detailedAnswersContainer = document.getElementById('detailedAnswersContainer');
    const detailedAnswersTitle = document.getElementById('detailedAnswersTitle');
    const questionsList = document.getElementById('questionsList');
    const backToResultsButton = document.getElementById('backToResultsButton');
    const rankList = document.getElementById('rankList');

    // Original questions array
    const originalQuestions = [
        
  [
  {
    "question": "ছবিতে এক ব্যক্তিকে দেখিয়ে রমেশ সীমাকে বলল, \"তাঁর মা হল তোমার বাবার একমাত্র কন্যা।\" সীমা ব্যক্তিটির কে হয়?",
    "options": ["বোন", "কন্যা", "স্ত্রী", "মা"],
    "answer": "মা",
    "userAnswer": null,
    "status": null
  },
  {
    "question": "এক মহিলাকে দেখিয়ে বান্তি বলল, \"মহিলাটি হল আমার মায়ের ছেলের বাবার বোন\"। মহিলাটি বান্তির কে হয়?",
    "options": ["মাসি", "দিদি", "পিসি", "পিসতুতো বোন"],
    "answer": "পিসি",
    "userAnswer": null,
    "status": null
  },
  {
    "question": "এক ভদ্রলোককে নিজের স্বামীর সঙ্গে পরিচয় করিয়ে দিয়ে রমলা বললেন, \"ওঁর ভাইয়ের বাবা হল আমার ঠাকুরদার একমাত্র পুত্র\"। রমলা ওই লোকটির কে হন?",
    "options": ["পিসি", "বোন", "মাসি", "ঠাকুমা"],
    "answer": "বোন",
    "userAnswer": null,
    "status": null
  },
  {
    "question": "চন্দ্রা একটি ছেলেকে দেখিয়ে বলল, \"ছেলেটি আমার কাকার বাবার মেয়ের ছেলে\"। ছেলেটি চন্দ্রার কে হয়?",
    "options": ["ভাইপো", "বাবা", "ভাই", "কাকা"],
    "answer": "ভাই",
    "userAnswer": null,
    "status": null
  },
  {
    "question": "আবীরকে দেখিয়ে সোমা বলল, \"সে হল আমার বাবার একমাত্র মেয়ের মায়ের একমাত্র ভাইয়ের পুত্র!\" আবীর সোমার কে হয়?",
    "options": ["নিজের ভাই", "মামা", "মামাতো ভাই", "কাকা"],
    "answer": "মামাতো ভাই",
    "userAnswer": null,
    "status": null
  },
  {
    "question": "অঞ্জন বলল \"এই মেয়েটি হল আমার বাবার একমাত্র নাতির স্ত্রীর কন্যা।\" অঞ্জন এই মেয়েটির কে হয়?",
    "options": ["মামা", "কাকা", "বাবা", "ঠাকুরদা"],
    "answer": "ঠাকুরদা",
    "userAnswer": null,
    "status": null
  },
  {
    "question": "ছবিতে এক মহিলাকে দেখিয়ে শঙ্কর বলল, 'আমার বাবার দুই সন্তান। এই মহিলার কন্যার পিসি হল আমার মায়ের কন্যা।' শঙ্কর মহিলাটির কে হন?",
    "options": ["পুত্র", "শ্বশুর", "স্বামী", "ভাসুর"],
    "answer": "স্বামী",
    "userAnswer": null,
    "status": null
  },
  {
    "question": "রাজুর দিকে লক্ষ করে অসীমা বলল \"আমার কোনো কাকা নেই। রাজুর ভাইয়ের মামা হল আমার ঠাকুরদার একমাত্র পুত্র\"। রাজু, অসীমার কে হয়?",
    "options": ["আপন ভাই", "পিসেমশাই", "পিসতুতো ভাই", "মামা"],
    "answer": "পিসতুতো ভাই",
    "userAnswer": null,
    "status": null
  },
  {
    "question": "ফোটোতে এক ভদ্রলোককে দেখিয়ে রমা বলল, \"তার বোনের বাবা হল আমার ঠাকুরদার একমাত্র পুত্র\"। রমা ভদ্রলোকের কে হন?",
    "options": ["বোন", "মা", "কাকিমা", "কন্যা"],
    "answer": "বোন",
    "userAnswer": null,
    "status": null
  },
  {
    "question": "ফোটোতে একটি ছেলেকে দেখিয়ে ঐশি বলল, \"সে হল আমার বোনের ভাইয়ের বাবার একমাত্র পুত্র\"। ঐশি ছেলেটির কে হয়?",
    "options": ["পিসি", "মা", "কাকিমা", "বোন"],
    "answer": "বোন",
    "userAnswer": null,
    "status": null
  },
  {
    "question": "এক মহিলাকে দেখিয়ে রাজেশ বলল, \"তার ঠাকুরদার একমাত্র কন্যা হল আমার স্ত্রী\"। রাজেশ মহিলাটির কে হন?",
    "options": ["মেসোমশাই", "পিসেমশাই", "কাকা", "বাবা"],
    "answer": "পিসেমশাই",
    "userAnswer": null,
    "status": null
  },
  {
    "question": "Q হল R-এর ভাই। T হল S-এর মা। P হল Q-এর বাবা। S হল R-এর বোন। নীচের কোনটি সঠিক নয়?",
    "options": ["P হল T-এর স্বামী", "T হল Q-এর মা", "P হল R-এর বাবা", "P হল R-এর ভাই"],
    "answer": "P হল R-এর ভাই",
    "userAnswer": null,
    "status": null
  },
  {
    "question": "A হল B-এর বোন। B হল C-এর বাবা। D হল B-এর মা। F হল E-এর কন্যা। E হল D-এর একমাত্র পুত্রবধূ। নীচের কোনটি সঠিক নয়?",
    "options": ["D হল F-এর ঠাকুমা", "F হল A-এর ভাইয়ের মেয়ে", "A হল C-এর মাসি", "E হল C-এর মা"],
    "answer": "A হল C-এর মাসি",
    "userAnswer": null,
    "status": null
  },
  {
    "question": "A ও E দুই ভাই। C হল B-এর স্ত্রী। D হল C-এর ভাই। D হল E-এর পুত্র। নীচের কোনটি সঠিক নয়?",
    "options": ["E হল B-এর শ্বশুর", "B হল D-এর ভগিনীপতি", "C হল E-এর কন্যা", "C হল A-এর ভাইপো"],
    "answer": "C হল A-এর ভাইপো",
    "userAnswer": null,
    "status": null
  },
  {
    "question": "P হল A-এর স্বামী। N হল Q-এর মা। M হল L-এর ঠাকুরদা। A হল M-এর একমাত্র পুত্রবধূ। Q হল L-এর পিসি। নীচের কোনটি সঠিক নয়?",
    "options": ["L হল N-এর নাতি", "A হল L-এর কাকিমা", "Q হল A-এর ননদ (স্বামীর বোন)", "M হল P-এর বাবা"],
    "answer": "A হল L-এর কাকিমা",
    "userAnswer": null,
    "status": null
  },
  {
    "question": "A ও P স্বামী-স্ত্রী। Q হল A-এর পুত্র। G হল P-এর মা। P ও R দুই ভাই। M হল R-এর বাবা। নীচের কোনটি সঠিক?",
    "options": ["R হল Q-এর মামা", "G হল A-এর শ্বশুর", "A হল M-এর কন্যা", "Q হল R-এর ভাইপো"],
    "answer": "Q হল R-এর ভাইপো",
    "userAnswer": null,
    "status": null
  }
]
    ];

    let questions = []; // This will hold the shuffled questions

    let currentQuestionIndex = 0;
    let score = 0;
    let correctCount = 0;
    let wrongCount = 0;
    let skippedCount = 0;

    let globalTimerInterval; // গ্লোবাল টাইমার ইন্টারভ্যাল
    let quizTotalTimeInSeconds = 0; // কুইজের মোট সময় সেকেন্ডে
    let remainingQuizTime = 0; // অবশিষ্ট কুইজের সময় সেকেন্ডে

    let userName = '';

    const RANKING_LIMIT = 5;
    const QUIZ_ID = "static_gk_quiz_9"; // কুইজের একটি নির্দিষ্ট ID

    // Fisher-Yates (Knuth) shuffle algorithm
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

   function shuffleOptions(question) {
        const correctAnswerText = question.answer; // সঠিক উত্তরের টেক্সট সংরক্ষণ করুন (যেমন, "149")
        const currentOptions = [...question.options]; // বর্তমান অপশনগুলোর একটি কপি তৈরি করুন শাফেল করার জন্য

        // Fisher-Yates (Knuth) shuffle algorithm
        // এই অংশটি shuffleArray ফাংশনের লজিক ব্যবহার করবে
        for (let i = currentOptions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [currentOptions[i], currentOptions[j]] = [currentOptions[j], currentOptions[i]];
        }

        question.options = currentOptions; // প্রশ্নের অপশনগুলোকে শাফেল করা অ্যারে দিয়ে আপডেট করুন

        // শাফেল করা অপশনগুলোর মধ্যে আসল সঠিক উত্তরের টেক্সটের নতুন ইনডেক্স খুঁজুন
        question.answer = currentOptions.indexOf(correctAnswerText); // এখন answer হবে নতুন শাফেল করা অ্যারেতে সঠিক উত্তরের ইনডেক্স
    }

    // Prepare questions (shuffle and reset status)
    function prepareQuestions() {
        // Create a deep copy of original questions to avoid modifying the source
        questions = JSON.parse(JSON.stringify(originalQuestions));

        shuffleArray(questions); // Shuffle the order of questions

        questions.forEach(q => {
            shuffleOptions(q); // Shuffle options for each question
            q.userAnswer = null;
            q.status = null;
        });
    }

    // স্টার্ট স্ক্রিনের তথ্য আপডেট করুন
    function updateStartScreenInfo() {
        totalQuestionsInfo.textContent = originalQuestions.length; // Use originalQuestions length for total info
        fullMarksInfo.textContent = originalQuestions.length;
    }

    // স্ক্রিন পরিবর্তন ফাংশন
    function showScreen(screen) {
        nameInputScreen.classList.remove('active');
        startScreen.classList.remove('active');
        quizScreen.classList.remove('active');
        resultScreen.classList.remove('active');
        detailedAnswersContainer.style.display = 'none'; // নিশ্চিত করুন যে এটি শুরুতে লুকানো থাকে

        screen.classList.add('active');
    }

    // নাম ইনপুট স্ক্রিন থেকে স্টার্ট স্ক্রিনে যাওয়ার জন্য
    proceedToStartScreenButton.addEventListener('click', () => {
        userName = userNameInput.value.trim();
        if (userName === '') {
            nameInputMessage.textContent = "অনুগ্রহ করে আপনার নাম লিখুন।";
        } else {
            nameInputMessage.textContent = "";
            showScreen(startScreen);
            updateStartScreenInfo();
            // loadRanking(); // Firebase initialized না হলে এটি সমস্যা করতে পারে
        }
    });

    // কুইজ শুরু করুন
    startButton.addEventListener('click', () => {
        if (originalQuestions.length === 0) {
            alert("কুইজের প্রশ্ন নেই। অনুগ্রহ করে প্রশ্ন যুক্ত করুন।");
            return;
        }

        const enteredQuizTime = parseInt(quizTimeLimitInput.value);
        if (isNaN(enteredQuizTime) || enteredQuizTime <= 0) {
            alert("অনুগ্রহ করে কুইজের জন্য একটি বৈধ মোট সময় (মিনিটে) দিন।");
            return;
        }
        quizTotalTimeInSeconds = enteredQuizTime * 60; // মিনিটকে সেকেন্ডে রূপান্তর করুন

        prepareQuestions(); // Shuffle questions and options before starting
        
        showScreen(quizScreen);
        currentQuestionIndex = 0;
        score = 0;
        correctCount = 0;
        wrongCount = 0;
        skippedCount = 0;

        startGlobalTimer(); // গ্লোবাল টাইমার শুরু করুন
        displayQuestion(); // প্রথম প্রশ্ন দেখান এবং তার টাইমার শুরু করুন
    });

    // প্রশ্ন প্রদর্শন করুন
    function displayQuestion() {
        feedbackMessage.textContent = ''; // ফিডব্যাক মেসেজ খালি রাখুন
        optionsContainer.innerHTML = '';
        nextButton.style.display = 'inline-block';
        skipButton.style.display = 'inline-block';
        submitButton.style.display = 'none';

        if (currentQuestionIndex < questions.length) {
            const q = questions[currentQuestionIndex];
            questionIndexDisplay.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
            questionTextBox.innerHTML = `<p>${q.question}</p>`;

            if (typeof MathJax !== 'undefined' && MathJax.Hub) {
                setTimeout(() => MathJax.Hub.Queue(["Typeset", MathJax.Hub, "questionTextBox"]), 0);
            }

            q.options.forEach((option, index) => {
                const button = document.createElement('button');
                button.classList.add('option-button');
                button.innerHTML = option;

                if (typeof MathJax !== 'undefined' && MathJax.Hub) {
                    setTimeout(() => MathJax.Hub.Queue(["Typeset", MathJax.Hub, button]), 0);
                }

                button.dataset.index = index;
                button.addEventListener('click', () => selectOption(button, index, q.answer));
                optionsContainer.appendChild(button);

                if (q.userAnswer !== null && q.userAnswer === index) {
                    button.classList.add('selected'); // নির্বাচিত অপশন হাইলাইট করুন
                }
            });
            startQuestionTimer(); // প্রতি প্রশ্নের টাইমার (শুধুমাত্র ভিজ্যুয়াল রিসেট) শুরু করুন
        } else {
            showResult(); // সকল প্রশ্ন শেষ হলে ফলাফল দেখান
        }
    }

    // অপশন নির্বাচন করুন
    function selectOption(selectedButton, selectedIndex, correctAnswer) {
        const optionButtons = document.querySelectorAll('.option-button');
        optionButtons.forEach(button => {
            button.classList.remove('selected'); // সব অপশন থেকে 'selected' ক্লাস সরান
        });

        // শুধুমাত্র নির্বাচিত অপশনটি হাইলাইট করুন
        selectedButton.classList.add('selected');

        // ব্যবহারকারীর উত্তর সংরক্ষণ করুন কিন্তু স্ট্যাটাস চূড়ান্ত করবেন না
        questions[currentQuestionIndex].userAnswer = selectedIndex;

        // শেষ প্রশ্ন হলে সাবমিট বাটন দেখান, অন্যথায় নেক্সট বাটন
        if (currentQuestionIndex === questions.length - 1) {
            nextButton.style.display = 'none';
            skipButton.style.display = 'none';
            submitButton.style.display = 'inline-block';
        } else {
            nextButton.style.display = 'inline-block';
            skipButton.style.display = 'inline-block';
        }

        // ফিডব্যাক মেসেজ খালি রাখুন (যদি আগে কোনো মেসেজ থাকে)
        feedbackMessage.textContent = '';
    }

    // গ্লোবাল টাইমার শুরু করুন
    function startGlobalTimer() {
        remainingQuizTime = quizTotalTimeInSeconds;
        updateGlobalTimerDisplay();

        globalTimerInterval = setInterval(() => {
            remainingQuizTime--;
            updateGlobalTimerDisplay();

            if (remainingQuizTime <= 0) {
                clearInterval(globalTimerInterval);
                feedbackMessage.textContent = 'মোট সময় শেষ! কুইজ শেষ হয়েছে।';
                feedbackMessage.style.color = 'orange';
                showResult(); // সময় শেষ হলে ফলাফল দেখান
            }
        }, 1000);
    }

    // গ্লোবাল টাইমার ডিসপ্লে আপডেট করুন
    function updateGlobalTimerDisplay() {
        const minutes = Math.floor(remainingQuizTime / 60);
        const seconds = remainingQuizTime % 60;
        globalTimerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    // প্রশ্ন টাইমার শুরু করুন (আয়তাকার টাইমার - এটি এখন কাউন্টডাউন করবে না)
    function startQuestionTimer() {
        questionTimerText.textContent = '';
        questionTimerRect.style.animation = 'none';
        void questionTimerRect.offsetWidth;
        questionTimerRect.style.width = '100%';
        questionTimerRect.style.backgroundColor = '#28a745'; // ডিফল্ট রঙ (যেমন সবুজ)
    }

    // পরবর্তী প্রশ্নে যান বা ফলাফল দেখান
    function nextOrSubmitQuestion() {
        const currentQuestion = questions[currentQuestionIndex];

        // যদি কোনো অপশন সিলেক্ট করা না থাকে, তাহলে স্কিপ হিসেবে গণ্য করুন
        if (currentQuestion.userAnswer === null) {
            currentQuestion.status = 'skipped';
            // skippedCount++; // এই লাইনটি calculateFinalScoreAndStatus এ ডুপ্লিকেট হবে
        } else {
            // যদি উত্তর দেওয়া থাকে, তবে স্ট্যাটাস সেট করুন
            if (currentQuestion.userAnswer === currentQuestion.answer) {
                currentQuestion.status = 'correct';
            } else {
                currentQuestion.status = 'wrong';
            }
        }

        if (currentQuestionIndex === questions.length - 1) {
            showResult();
        } else {
            currentQuestionIndex++;
            displayQuestion();
        }
    }

    // নেক্সট বাটন ক্লিক
    nextButton.addEventListener('click', () => {
        nextOrSubmitQuestion();
    });

    // স্কিপ বাটন ক্লিক
    skipButton.addEventListener('click', () => {
        // স্কিপ বাটনে ক্লিক করলে, যদি উত্তর না দেওয়া থাকে, তবে স্কিপ হিসাবে চিহ্নিত করুন
        if (questions[currentQuestionIndex].userAnswer === null) {
             questions[currentQuestionIndex].status = 'skipped';
             // skippedCount++; // এই লাইনটি calculateFinalScoreAndStatus এ ডুপ্লিকেট হবে
        }
        nextOrSubmitQuestion();
    });

    // সাবমিট বাটন ক্লিক (শেষ প্রশ্নের জন্য)
    submitButton.addEventListener('click', () => {
        // সাবমিট বাটনে ক্লিক করলে, যদি উত্তর না দেওয়া থাকে, তবে স্কিপ হিসাবে চিহ্নিত করুন
        if (questions[currentQuestionIndex].userAnswer === null) {
            questions[currentQuestionIndex].status = 'skipped';
            // skippedCount++; // এই লাইনটি calculateFinalScoreAndStatus এ ডুপ্লিকেট হবে
        }
        showResult();
    });

    // ফলাফল প্রদর্শন করুন
    function showResult() {
        clearInterval(globalTimerInterval); // গ্লোবাল টাইমার বন্ধ করুন
        calculateFinalScoreAndStatus(); // ফলাফল দেখানোর আগে স্কোর ও স্ট্যাটাস গণনা করুন
        showScreen(resultScreen);

        finalScore.textContent = score.toFixed(2);
        correctAnswers.textContent = correctCount;
        wrongAnswers.textContent = wrongCount;
        skippedQuestions.textContent = skippedCount;
        finalTotalQuestions.textContent = questions.length;

        const percentage = (score / questions.length) * 100;
        yourPercentage.textContent = percentage.toFixed(2) + '%';
        percentageBarFill.style.width = percentage.toFixed(2) + '%';
        if (percentage >= 80) {
            percentageBarFill.style.backgroundColor = '#28a745';
        } else if (percentage >= 50) {
            percentageBarFill.style.backgroundColor = '#ffc107';
        } else {
            percentageBarFill.style.backgroundColor = '#dc3545';
        }

        saveMaxScoreToFirebase(score); // পরিবর্তিত ফাংশন কল
        loadRanking();
    }

    // কুইজের শেষে সমস্ত প্রশ্নের সঠিক/ভুল স্ট্যাটাস গণনা
    function calculateFinalScoreAndStatus() {
        score = 0;
        correctCount = 0;
        wrongCount = 0;
        skippedCount = 0;

        questions.forEach(q => {
            if (q.userAnswer !== null) { // যদি উত্তর দেওয়া থাকে
                if (q.userAnswer === q.answer) {
                    score++;
                    correctCount++;
                    q.status = 'correct';
                } else {
                    wrongCount++;
                    q.status = 'wrong';
                }
            } else { // যদি উত্তর না দেওয়া থাকে (এড়িয়ে যাওয়া বা সময় শেষ)
                skippedCount++; // স্কিপড কাউন্ট বাড়ান
                q.status = 'skipped'; // স্ট্যাটাস সেট করুন
            }
        });
    }

    // সর্বোচ্চ স্কোর Firebase-এ সংরক্ষণ করুন
    function saveMaxScoreToFirebase(currentScore) {
        // ফায়ারবেস initialized না হলে বা userName না থাকলে সেভ স্কিপ করুন
        if (typeof firebase === 'undefined' || typeof database === 'undefined' || !userName) {
            console.warn("Firebase or database not initialized, or user name not set. Skipping score save.");
            return;
        }

        const userScoreRef = database.ref('quizRankings/' + QUIZ_ID).orderByChild('userName').equalTo(userName);

        userScoreRef.once('value')
            .then(snapshot => {
                let existingUser = null;
                snapshot.forEach(childSnapshot => {
                    existingUser = childSnapshot;
                    return true; // লুপ বন্ধ করতে
                });

                if (existingUser) {
                    const existingScore = existingUser.val().score;
                    if (currentScore > existingScore) {
                        // যদি বর্তমান স্কোর আগের স্কোরের চেয়ে বেশি হয়, তবে আপডেট করুন
                        existingUser.ref.update({
                            score: currentScore,
                            timestamp: Date.now()
                        }).then(() => {
                            console.log(`User ${userName}'s score updated to ${currentScore}`);
                        }).catch(error => {
                            console.error("Error updating score to Firebase: ", error);
                            alert("স্কোর আপডেট করতে সমস্যা হয়েছে। Firebase সংযোগ পরীক্ষা করুন।");
                        });
                    } else {
                        console.log(`User ${userName}'s current score ${currentScore} is not higher than existing score ${existingScore}. Not updating.`);
                    }
                } else {
                    // যদি ব্যবহারকারী না থাকে, তবে নতুন এন্ট্রি যোগ করুন
                    database.ref('quizRankings/' + QUIZ_ID).push({
                        userName: userName,
                        score: currentScore,
                        timestamp: Date.now()
                    }).then(() => {
                        console.log(`New user ${userName}'s score saved: ${currentScore}`);
                    }).catch(error => {
                        console.error("Error saving new user score to Firebase: ", error);
                        alert("নতুন স্কোর সংরক্ষণ করতে সমস্যা হয়েছে। Firebase সংযোগ পরীক্ষা করুন।");
                    });
                }
            })
            .catch(error => {
                console.error("Error checking existing score in Firebase: ", error);
                alert("স্কোর চেক করতে সমস্যা হয়েছে। Firebase সংযোগ পরীক্ষা করুন।");
            });
    }


    function loadRanking() {
        if (typeof firebase === 'undefined' || typeof database === 'undefined') {
            console.warn("Firebase or database not initialized. Skipping ranking load.");
            return;
        }
        const quizRef = database.ref('quizRankings/' + QUIZ_ID);
        // ব্যবহারকারীর নাম এবং সর্বোচ্চ স্কোরের উপর ভিত্তি করে লোড করুন
        quizRef.orderByChild('score').limitToLast(50).on('value', snapshot => {
            const scoresMap = {}; // এক ইউজার থেকে সর্বোচ্চ স্কোর রাখতে
            snapshot.forEach(childSnapshot => {
                const data = childSnapshot.val();
                if (!scoresMap[data.userName] || data.score > scoresMap[data.userName].score) {
                    scoresMap[data.userName] = {
                        score: data.score,
                        timestamp: data.timestamp
                    };
                }
            });
            const scores = Object.keys(scoresMap).map(userName => ({
                userName: userName,
                score: scoresMap[userName].score
            }));

            scores.sort((a, b) => b.score - a.score);
            displayRanking(scores.slice(0, RANKING_LIMIT));
        }, error => {
            console.error("Error loading ranking from Firebase: ", error);
        });
    }

    function displayRanking(scores) {
        rankList.innerHTML = '';
        if (scores.length === 0) {
            const li = document.createElement('li');
            li.textContent = 'কোনো স্কোর পাওয়া যায়নি।';
            rankList.appendChild(li);
            return;
        }
        scores.forEach((s, index) => {
            const li = document.createElement('li');
            li.textContent = `${index + 1}. ${s.userName}: ${s.score} পয়েন্ট`;
            rankList.appendChild(li);
        });
    }

    function showDetailedAnswers(filter) {
        console.log("showDetailedAnswers called with filter:", filter);
        console.log("Current questions array:", questions);
        
        // নিশ্চিত করুন যে বিস্তারিত উত্তর দেখানোর আগে সমস্ত স্ক্রিন লুকানো আছে
        nameInputScreen.classList.remove('active');
        startScreen.classList.remove('active');
        quizScreen.classList.remove('active');
        resultScreen.classList.remove('active'); // এই লাইনটি নিশ্চিত করবে যে রেজাল্ট স্ক্রিন লুকানো আছে

        detailedAnswersContainer.style.display = 'block'; // বিস্তারিত উত্তর কন্টেইনার দৃশ্যমান করুন

        questionsList.innerHTML = ''; // তালিকা খালি করুন
        let filteredQuestions = [];

        if (filter === 'all') {
            detailedAnswersTitle.textContent = 'সমস্ত প্রশ্নের উত্তর';
            filteredQuestions = questions;
        } else if (filter === 'correct') {
            detailedAnswersTitle.textContent = 'সঠিক উত্তরগুলি';
            filteredQuestions = questions.filter(q => q.status === 'correct');
        } else if (filter === 'wrong') {
            detailedAnswersTitle.textContent = 'ভুল উত্তরগুলি';
            filteredQuestions = questions.filter(q => q.status === 'wrong');
        } else if (filter === 'skipped') {
            detailedAnswersTitle.textContent = 'এড়িয়ে যাওয়া প্রশ্নগুলি';
            filteredQuestions = questions.filter(q => q.status === 'skipped');
        }

        console.log("Filtered questions for", filter, ":", filteredQuestions);

        if (filteredQuestions.length === 0) {
            const listItem = document.createElement('li');
            listItem.textContent = `এই বিভাগে কোনো প্রশ্ন পাওয়া যায়নি।`;
            questionsList.appendChild(listItem);
        } else {
            filteredQuestions.forEach((q, index) => {
                const listItem = document.createElement('li');
                let statusClass = '';
                let statusText = '';

                if (q.status === 'correct') {
                    statusClass = 'correct-status';
                    statusText = 'সঠিক';
                } else if (q.status === 'wrong') {
                    statusClass = 'wrong-status';
                    statusText = 'ভুল';
                } else if (q.status === 'skipped') {
                    statusClass = 'skipped-status';
                    statusText = 'এড়িয়ে যাওয়া';
                }

                let questionHtml = `
                    <div class="question-header">
                        <span class="question-number">${index + 1}.</span>
                        <span class="question-text">${q.question}</span>
                        <span class="status-indicator ${statusClass}">${statusText}</span>
                    </div>
                    <ul class="detailed-options">
                `;

                q.options.forEach((option, optIndex) => {
                    let optionClass = '';
                    if (optIndex === q.answer) {
                        optionClass = 'correct-answer-highlight';
                    }
                    if (q.userAnswer !== null && optIndex === q.userAnswer && optIndex === q.answer) {
                        optionClass = 'selected-correct';
                    } else if (q.userAnswer !== null && optIndex === q.userAnswer && optIndex !== q.answer) {
                        optionClass = 'selected-wrong';
                    }
                    questionHtml += `<li class="${optionClass}">${option}</li>`;
                });

                questionHtml += `</ul>`;
                listItem.innerHTML = questionHtml;
                questionsList.appendChild(listItem);

                if (typeof MathJax !== 'undefined' && MathJax.Hub) {
                    setTimeout(() => MathJax.Hub.Queue(["Typeset", MathJax.Hub, listItem]), 0);
                }
            });
        }
    }

    showAllAnswersButton.addEventListener('click', () => showDetailedAnswers('all'));
    showCorrectAnswersButton.addEventListener('click', () => showDetailedAnswers('correct'));
    showWrongAnswersButton.addEventListener('click', () => showDetailedAnswers('wrong'));
    showSkippedQuestionsButton.addEventListener('click', () => showDetailedAnswers('skipped'));
    backToResultsButton.addEventListener('click', () => {
        detailedAnswersContainer.style.display = 'none';
        showScreen(resultScreen);
    });

    // Initial screen setup
    showScreen(nameInputScreen);
});