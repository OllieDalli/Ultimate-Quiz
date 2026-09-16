const QUESTIONS = [

    // ========================================================
    // EASY
    // ========================================================

    {
        id: "easy-001",
        difficulty: "easy",
        question: "What is the capital city of England?",
        answers: [
            "London",
            "Manchester",
            "Birmingham",
            "Liverpool"
        ],
        correct: "London"
    },

    {
        id: "easy-002",
        difficulty: "easy",
        question: "How many days are there in a week?",
        answers: [
            "5",
            "6",
            "7",
            "8"
        ],
        correct: "7"
    },

    {
        id: "easy-003",
        difficulty: "easy",
        question: "Which animal is known as man's best friend?",
        answers: [
            "Cat",
            "Dog",
            "Horse",
            "Rabbit"
        ],
        correct: "Dog"
    },

    {
        id: "easy-004",
        difficulty: "easy",
        question: "How many sides does a triangle have?",
        answers: [
            "2",
            "3",
            "4",
            "5"
        ],
        correct: "3"
    },

    {
        id: "easy-005",
        difficulty: "easy",
        question: "What colour do you get when you mix red and white?",
        answers: [
            "Purple",
            "Pink",
            "Orange",
            "Brown"
        ],
        correct: "Pink"
    },

    {
        id: "easy-006",
        difficulty: "easy",
        question: "How many months are there in a year?",
        answers: [
            "10",
            "11",
            "12",
            "13"
        ],
        correct: "12"
    },

    {
        id: "easy-007",
        difficulty: "easy",
        question: "Which sport is played at Wimbledon?",
        answers: [
            "Football",
            "Tennis",
            "Cricket",
            "Rugby"
        ],
        correct: "Tennis"
    },

    {
        id: "easy-008",
        difficulty: "easy",
        question: "What is the largest planet in our solar system?",
        answers: [
            "Earth",
            "Saturn",
            "Jupiter",
            "Neptune"
        ],
        correct: "Jupiter"
    },

    {
        id: "easy-009",
        difficulty: "easy",
        question: "How many legs does a spider have?",
        answers: [
            "6",
            "8",
            "10",
            "12"
        ],
        correct: "8"
    },

    {
        id: "easy-010",
        difficulty: "easy",
        question: "Which ocean is between Africa and Australia?",
        answers: [
            "Atlantic Ocean",
            "Pacific Ocean",
            "Indian Ocean",
            "Arctic Ocean"
        ],
        correct: "Indian Ocean"
    },


    // ========================================================
    // MEDIUM
    // ========================================================

    {
        id: "medium-001",
        difficulty: "medium",
        question: "Which planet is known as the Red Planet?",
        answers: [
            "Venus",
            "Mars",
            "Jupiter",
            "Mercury"
        ],
        correct: "Mars"
    },

    {
        id: "medium-002",
        difficulty: "medium",
        question: "Who painted the Mona Lisa?",
        answers: [
            "Vincent van Gogh",
            "Leonardo da Vinci",
            "Pablo Picasso",
            "Michelangelo"
        ],
        correct: "Leonardo da Vinci"
    },

    {
        id: "medium-003",
        difficulty: "medium",
        question: "How many players are on the pitch for one football team at the start of a match?",
        answers: [
            "9",
            "10",
            "11",
            "12"
        ],
        correct: "11"
    },

    {
        id: "medium-004",
        difficulty: "medium",
        question: "Which country is home to the city of Barcelona?",
        answers: [
            "Portugal",
            "Italy",
            "Spain",
            "France"
        ],
        correct: "Spain"
    },

    {
        id: "medium-005",
        difficulty: "medium",
        question: "Which English city is famous for The Beatles?",
        answers: [
            "Leeds",
            "Liverpool",
            "Bristol",
            "Sheffield"
        ],
        correct: "Liverpool"
    },

    {
        id: "medium-006",
        difficulty: "medium",
        question: "What is the chemical symbol for gold?",
        answers: [
            "Go",
            "Gd",
            "Au",
            "Ag"
        ],
        correct: "Au"
    },

    {
        id: "medium-007",
        difficulty: "medium",
        question: "Which country won the FIFA World Cup in 2018?",
        answers: [
            "Germany",
            "Brazil",
            "France",
            "Argentina"
        ],
        correct: "France"
    },

    {
        id: "medium-008",
        difficulty: "medium",
        question: "How many sides does a hexagon have?",
        answers: [
            "5",
            "6",
            "7",
            "8"
        ],
        correct: "6"
    },

    {
        id: "medium-009",
        difficulty: "medium",
        question: "What is the longest river in the United Kingdom?",
        answers: [
            "River Thames",
            "River Trent",
            "River Severn",
            "River Mersey"
        ],
        correct: "River Severn"
    },

    {
        id: "medium-010",
        difficulty: "medium",
        question: "Which band released the song 'Bohemian Rhapsody'?",
        answers: [
            "The Beatles",
            "Queen",
            "Oasis",
            "The Rolling Stones"
        ],
        correct: "Queen"
    },


    // ========================================================
    // HARD
    // ========================================================

    {
        id: "hard-001",
        difficulty: "hard",
        question: "Which element has the chemical symbol W?",
        answers: [
            "Tungsten",
            "Tin",
            "Titanium",
            "Tantalum"
        ],
        correct: "Tungsten"
    },

    {
        id: "hard-002",
        difficulty: "hard",
        question: "In which year did the Battle of Hastings take place?",
        answers: [
            "1066",
            "1060",
            "1072",
            "1086"
        ],
        correct: "1066"
    },

    {
        id: "hard-003",
        difficulty: "hard",
        question: "What is the largest internal organ in the human body?",
        answers: [
            "Heart",
            "Liver",
            "Lung",
            "Kidney"
        ],
        correct: "Liver"
    },

    {
        id: "hard-004",
        difficulty: "hard",
        question: "Which Shakespeare play features the characters Rosencrantz and Guildenstern?",
        answers: [
            "Macbeth",
            "Hamlet",
            "Othello",
            "King Lear"
        ],
        correct: "Hamlet"
    },

    {
        id: "hard-005",
        difficulty: "hard",
        question: "What is the smallest country in the world by area?",
        answers: [
            "Monaco",
            "Vatican City",
            "San Marino",
            "Liechtenstein"
        ],
        correct: "Vatican City"
    },

    {
        id: "hard-006",
        difficulty: "hard",
        question: "Which scientist developed the theory of general relativity?",
        answers: [
            "Isaac Newton",
            "Albert Einstein",
            "Galileo Galilei",
            "Niels Bohr"
        ],
        correct: "Albert Einstein"
    },

    {
        id: "hard-007",
        difficulty: "hard",
        question: "What is the capital city of Kazakhstan?",
        answers: [
            "Almaty",
            "Astana",
            "Bishkek",
            "Tashkent"
        ],
        correct: "Astana"
    },

    {
        id: "hard-008",
        difficulty: "hard",
        question: "Which element has the atomic number 26?",
        answers: [
            "Copper",
            "Iron",
            "Zinc",
            "Nickel"
        ],
        correct: "Iron"
    },

    {
        id: "hard-009",
        difficulty: "hard",
        question: "Who wrote the novel '1984'?",
        answers: [
            "Aldous Huxley",
            "George Orwell",
            "J.R.R. Tolkien",
            "Ernest Hemingway"
        ],
        correct: "George Orwell"
    },

    {
        id: "hard-010",
        difficulty: "hard",
        question: "Which ancient civilisation built Machu Picchu?",
        answers: [
            "Romans",
            "Aztecs",
            "Inca",
            "Egyptians"
        ],
        correct: "Inca"
    }

];


// ============================================================
// GET QUESTIONS BY DIFFICULTY
// ============================================================

function getQuestionsForDifficulty(difficulty) {

    return QUESTIONS.filter(
        question =>
            question.difficulty === difficulty
    );
}


// ============================================================
// GET RANDOM QUESTION
// ============================================================

function getRandomQuestion(difficulty) {

    const available =
        getQuestionsForDifficulty(
            difficulty
        );


    if (!available.length) {
        return null;
    }


    return available[
        Math.floor(
            Math.random() *
            available.length
        )
    ];
}