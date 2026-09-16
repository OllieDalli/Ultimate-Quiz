// ============================================================
// WIGAN QUIZZERS - QUESTION TYPES
// ============================================================
// Add future question types here. The game only randomises across
// types that have a working implementation in this file/app.js.

const QUESTION_TYPE_CONFIG = {
    classic: {
        label: "Classic Question",
        icon: "🎯"
    },
    song: {
        label: "Name That Song",
        icon: "🎵"
    }
};

// Song clips should be your own licensed/permissioned audio files.
// Put them in an /audio folder in the GitHub repository and update
// the entries below. Each clip is intended to be 5 seconds long.
const SONG_QUESTIONS = [
    {
        id: "song-001",
        type: "song",
        question: "Name that song",
        audio: "audio/song-01.mp3",
        answers: [
            "Song 1",
            "Song 2",
            "Song 3",
            "Song 4"
        ],
        correct: "Song 1"
    },
    {
        id: "song-002",
        type: "song",
        question: "Name that song",
        audio: "audio/song-02.mp3",
        answers: [
            "Song 5",
            "Song 6",
            "Song 7",
            "Song 8"
        ],
        correct: "Song 5"
    },
    {
        id: "song-003",
        type: "song",
        question: "Name that song",
        audio: "audio/song-03.mp3",
        answers: [
            "Song 9",
            "Song 10",
            "Song 11",
            "Song 12"
        ],
        correct: "Song 9"
    },
    {
        id: "song-004",
        type: "song",
        question: "Name that song",
        audio: "audio/song-04.mp3",
        answers: [
            "Song 13",
            "Song 14",
            "Song 15",
            "Song 16"
        ],
        correct: "Song 13"
    },
    {
        id: "song-005",
        type: "song",
        question: "Name that song",
        audio: "audio/song-05.mp3",
        answers: [
            "Song 17",
            "Song 18",
            "Song 19",
            "Song 20"
        ],
        correct: "Song 17"
    },
    {
        id: "song-006",
        type: "song",
        question: "Name that song",
        audio: "audio/song-06.mp3",
        answers: [
            "Song 21",
            "Song 22",
            "Song 23",
            "Song 24"
        ],
        correct: "Song 21"
    }
];

function getSongQuestionById(id) {
    return SONG_QUESTIONS.find(question => question.id === id) || null;
}

function getRandomSongQuestion(usedIds = new Set()) {
    const available = SONG_QUESTIONS.filter(
        question => !usedIds.has(question.id)
    );

    if (!available.length) return null;

    return available[Math.floor(Math.random() * available.length)];
}
