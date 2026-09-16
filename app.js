// ============================================================
// WIGAN QUIZZERS
// app.js
// ============================================================

const POINTS = {
    easy: 1,
    medium: 2,
    hard: 3
};

let game = null;
let players = [];

let myPlayerId = null;
let isHost = false;

let selectedQuestion = null;
let currentRoundType = "classic";
let songRoundFinished = false;
let songDeadlineHandled = false;
let songAnswerWatcher = null;
let songRevealTimeout = null;
let songPreStartTimeout = null;

// Important answer protection
let answerSubmitted = false;
let renderedQuestionId = null;
let loadingSongQuestionId = null;
let movingToNextPlayer = false;

let timerInterval = null;
let nextPlayerTimeout = null;
let gambleTimerInterval = null;
let gambleReadyWatchInterval = null;
let answerFeedbackKey = null;
let answerFeedbackTimeout = null;

// ============================================================
// ANSWER FEEDBACK STYLES
// ============================================================

(function addAnswerFeedbackStyles() {
    if (document.getElementById("answer-feedback-styles")) return;

    const style = document.createElement("style");
    style.id = "answer-feedback-styles";
    style.textContent = `
        .answer-button.answer-selected-amber {
            background: #f59e0b !important;
            border-color: #f59e0b !important;
            color: #111827 !important;
            animation: answerAmberFlash 0.25s ease-in-out 2;
        }

        .answer-button.answer-correct {
            background: #22c55e !important;
            border-color: #22c55e !important;
            color: #ffffff !important;
            animation: answerGreenFlash 0.45s ease-in-out 2;
        }

        .answer-button.answer-wrong {
            background: #ef4444 !important;
            border-color: #ef4444 !important;
            color: #ffffff !important;
            animation: answerRedFlash 0.45s ease-in-out 2;
        }

        @keyframes answerAmberFlash {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.65; }
        }

        @keyframes answerGreenFlash {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.65; }
        }

        @keyframes answerRedFlash {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.65; }
        }

    `;

    document.head.appendChild(style);
})();

(function addGambleScreenStyles() {
    if (document.getElementById("gamble-screen-styles")) return;

    const style = document.createElement("style");
    style.id = "gamble-screen-styles";
    style.textContent = `
        #gamble-phase {
            max-width: 620px;
            margin: 0 auto;
        }

        #gamble-phase .slot-machine {
            margin: 22px auto;
            padding: 24px;
            border-radius: 22px;
            background: rgba(255,255,255,0.055);
            border: 1px solid rgba(255,255,255,0.10);
            box-shadow: 0 18px 45px rgba(0,0,0,0.18);
        }

        #gamble-phase .slot-reels {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
        }

        #gamble-phase .slot-reels > div {
            min-height: 92px;
            display: grid;
            place-items: center;
            font-size: 3.1rem;
            border-radius: 16px;
            background: rgba(0,0,0,0.25);
            border: 1px solid rgba(255,255,255,0.10);
        }

        #gamble-phase .slot-result {
            margin-top: 16px;
            min-height: 24px;
            font-weight: 700;
            text-align: center;
        }

        #gamble-phase .gamble-buttons {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            margin-top: 18px;
        }

        #gamble-phase .gamble-buttons button {
            min-height: 52px;
            font-weight: 800;
        }

        #gamble-phase .gamble-stake {
            margin: 18px 0 4px;
            text-align: center;
        }

        #gamble-phase .gamble-stake label {
            display: block;
            margin-bottom: 8px;
            font-weight: 800;
        }

        #gamble-phase #gamble-stake {
            width: 120px;
            padding: 10px 12px;
            text-align: center;
            font-size: 1.1rem;
            font-weight: 800;
            border-radius: 10px;
        }

        #gamble-phase #multiplier-info {
            margin-top: 8px;
            font-weight: 700;
            opacity: 0.9;
        }

        #gamble-phase #keep-button.ready-complete {
            opacity: 0.75;
        }

        #gamble-ready-status {
            margin-top: 18px;
            display: grid;
            gap: 8px;
        }

        .gamble-ready-player {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            padding: 10px 14px;
            border-radius: 12px;
            background: rgba(255,255,255,0.045);
            border: 1px solid rgba(255,255,255,0.07);
        }

        .gamble-ready-badge {
            font-size: 0.75rem;
            font-weight: 800;
            opacity: 0.65;
        }

        .gamble-ready-badge.is-ready {
            color: #22c55e;
            opacity: 1;
        }

        @media (max-width: 600px) {
            #gamble-phase .gamble-buttons {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(style);
})();

let gambleTransitioning = false;

let gameChannel = null;
let playersChannel = null;
let answersChannel = null;


// ============================================================
// START
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
    setupHomeButtons();
    setupForms();
    setupGameButtons();
    setupSongPlayButton();
    tryReconnect();
});


// ============================================================
// HOME BUTTONS
// ============================================================

function setupHomeButtons() {

    const showCreate = document.getElementById("show-create");
    const showJoin = document.getElementById("show-join");

    const backCreate = document.getElementById("back-create");
    const backJoin = document.getElementById("back-join");


    if (showCreate) {
        showCreate.addEventListener("click", () => {
            showScreen("create-screen");
        });
    }


    if (showJoin) {
        showJoin.addEventListener("click", () => {
            showScreen("join-screen");
        });
    }


    if (backCreate) {
        backCreate.addEventListener("click", () => {
            showScreen("home-screen");
        });
    }


    if (backJoin) {
        backJoin.addEventListener("click", () => {
            showScreen("home-screen");
        });
    }
}


// ============================================================
// FORMS
// ============================================================

function setupForms() {

    const createForm = document.getElementById("create-form");
    const joinForm = document.getElementById("join-form");


    if (createForm) {
        createForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            await createGame();
        });
    }


    if (joinForm) {
        joinForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            await joinGame();
        });
    }
}


// ============================================================
// GAME BUTTONS
// ============================================================

function setupGameButtons() {

    // Start game
    const startButton =
        document.getElementById("start-game-button");

    if (startButton) {
        startButton.addEventListener("click", async () => {
            await startGame();
        });
    }


    // Difficulty buttons
    document
        .querySelectorAll(".difficulty")
        .forEach(button => {

            button.addEventListener("click", async () => {

                const difficulty =
                    button.dataset.difficulty;

                await chooseDifficulty(difficulty);
            });
        });


    // Gamble
    const gambleButton =
        document.getElementById("gamble-button");

    if (gambleButton) {
        gambleButton.addEventListener("click", async () => {
            await gamblePoints();
        });
    }

    const gambleStake = document.getElementById("gamble-stake");
    if (gambleStake) {
        gambleStake.addEventListener("input", () => {
            updateGambleMultiplierPreview();
        });
    }


    // Ready up
    const keepButton =
        document.getElementById("keep-button");

    if (keepButton) {
        keepButton.textContent = "✓ Ready Up";
        keepButton.addEventListener("click", async () => {
            await readyUp();
        });
    }




    // Continue from leaderboard
    const continueButton =
        document.getElementById("continue-button");

    if (continueButton && continueButton.dataset.bound !== "true") {
        continueButton.dataset.bound = "true";
        continueButton.addEventListener("click", async () => {
            await continueFromLeaderboard();
        });
    }


    // Play again
    const newRoundButton =
        document.getElementById("new-round-button");

    if (newRoundButton) {
        newRoundButton.addEventListener("click", async () => {

            if (!isHost) return;

            await startNextRound();
        });
    }
}


// ============================================================
// SCREEN CONTROL
// ============================================================

function showScreen(screenId) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {
            screen.classList.remove("active");
        });


    const screen =
        document.getElementById(screenId);


    if (screen) {
        screen.classList.add("active");
    }
}


// ============================================================
// CREATE GAME
// ============================================================

async function createGame() {

    const nameInput =
        document.getElementById("host-name");

    if (!nameInput) return;

    const name =
        nameInput.value.trim();


    if (!name) {
        alert("Please enter your name.");
        return;
    }


    const gameId =
        crypto.randomUUID();

    const playerId =
        crypto.randomUUID();

    const code =
        generateGameCode();


    const { data: newGame, error: gameError } =
        await supabaseClient
            .from("games")
            .insert({
                id: gameId,
                code: code,
                host_id: playerId,
                phase: "lobby",
                round: 1,
                current_player_id: null,
                current_difficulty: null,
                current_question_id: null,
                current_answer: null,
                question_started_at: null,
                current_round_type: "classic",
                round_type_order: createRandomRoundTypeOrder(12),
                bonus_round: Math.floor(Math.random() * 10) + 1,
                bonus_used: false,
                bonus_checked_round: null
            })
            .select()
            .single();


    if (gameError) {

        console.error(
            "Could not create game:",
            gameError
        );

        alert(
            "Could not create the game. Check your Supabase settings."
        );

        return;
    }


    const { error: playerError } =
        await supabaseClient
            .from("players")
            .insert({
                id: playerId,
                game_id: gameId,
                name: name,
                points: 0,
                rounds_picked: [],
                has_gambled: false,
                gamble_result: null,
                gamble_payout: 0
            });


    if (playerError) {

        console.error(
            "Could not create player:",
            playerError
        );

        alert("Could not create your player.");

        return;
    }


    game = newGame;
    myPlayerId = playerId;
    isHost = true;


    sessionStorage.setItem(
        "wigan_quizzers_game_id",
        gameId
    );

    sessionStorage.setItem(
        "wigan_quizzers_player_id",
        playerId
    );


    await loadPlayers();

    setupRealtime();

    updateLobby();

    showScreen("lobby-screen");
}


// ============================================================
// JOIN GAME
// ============================================================

async function joinGame() {

    const codeInput =
        document.getElementById("join-code");

    const nameInput =
        document.getElementById("player-name");


    if (!codeInput || !nameInput) return;


    const code =
        codeInput.value
            .trim()
            .toUpperCase();

    const name =
        nameInput.value.trim();


    if (!code) {
        alert("Please enter the game code.");
        return;
    }


    if (!name) {
        alert("Please enter your name.");
        return;
    }


    const { data: foundGame, error } =
        await supabaseClient
            .from("games")
            .select("*")
            .eq("code", code)
            .single();


    if (error || !foundGame) {

        console.error(
            "Game lookup failed:",
            error
        );

        alert("Game not found.");

        return;
    }


    if (foundGame.phase !== "lobby") {

        alert(
            "This game has already started."
        );

        return;
    }


    const playerId =
        crypto.randomUUID();


    const { error: playerError } =
        await supabaseClient
            .from("players")
            .insert({
                id: playerId,
                game_id: foundGame.id,
                name: name,
                points: 0,
                rounds_picked: [],
                has_gambled: false,
                gamble_result: null,
                gamble_payout: 0
            });


    if (playerError) {

        console.error(
            "Could not join game:",
            playerError
        );

        alert(
            "Could not join the game."
        );

        return;
    }


    game = foundGame;
    myPlayerId = playerId;
    isHost = false;


    sessionStorage.setItem(
        "wigan_quizzers_game_id",
        game.id
    );

    sessionStorage.setItem(
        "wigan_quizzers_player_id",
        playerId
    );


    await loadPlayers();

    setupRealtime();

    updateLobby();

    showScreen("lobby-screen");
}


// ============================================================
// RECONNECT
// ============================================================

async function tryReconnect() {

    const gameId =
        sessionStorage.getItem(
            "wigan_quizzers_game_id"
        );

    const playerId =
        sessionStorage.getItem(
            "wigan_quizzers_player_id"
        );


    if (!gameId || !playerId) {
        showScreen("home-screen");
        return;
    }


    const { data: savedGame, error } =
        await supabaseClient
            .from("games")
            .select("*")
            .eq("id", gameId)
            .single();


    if (error || !savedGame) {

        sessionStorage.removeItem(
            "wigan_quizzers_game_id"
        );

        sessionStorage.removeItem(
            "wigan_quizzers_player_id"
        );

        showScreen("home-screen");

        return;
    }


    game = savedGame;
    myPlayerId = playerId;
    isHost = game.host_id === playerId;


    await loadPlayers();

    const me =
        players.find(
            player => player.id === myPlayerId
        );


    if (!me) {

        sessionStorage.removeItem(
            "wigan_quizzers_game_id"
        );

        sessionStorage.removeItem(
            "wigan_quizzers_player_id"
        );

        showScreen("home-screen");

        return;
    }


    setupRealtime();

    updateLobby();

    updateGameState();
}


// ============================================================
// GAME CODE
// ============================================================

function generateGameCode() {

    const characters =
        "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    let code = "";


    for (let i = 0; i < 5; i++) {

        code +=
            characters[
                Math.floor(
                    Math.random() *
                    characters.length
                )
            ];
    }


    return code;
}


// ============================================================
// LOAD PLAYERS
// ============================================================

async function loadPlayers() {

    if (!game) return;


    const { data, error } =
        await supabaseClient
            .from("players")
            .select("*")
            .eq("game_id", game.id)
            .order("joined_at", {
                ascending: true
            });


    if (error) {

        console.error(
            "Could not load players:",
            error
        );

        return;
    }


    players = data || [];


    renderPlayers();
    renderLeaderboard();
    renderFinalLeaderboard();
    updateCurrentPlayer();
}


// ============================================================
// REALTIME
// ============================================================

function setupRealtime() {

    if (!game) return;


    if (gameChannel) {
        supabaseClient.removeChannel(
            gameChannel
        );
    }


    if (playersChannel) {
        supabaseClient.removeChannel(
            playersChannel
        );
    }




    gameChannel =
        supabaseClient
            .channel(
                `game-${game.id}`
            )
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "games",
                    filter: `id=eq.${game.id}`
                },
                payload => {

                    if (!payload.new) return;

                    game = payload.new;

                    updateGameState();
                }
            )
            .subscribe();


    playersChannel =
        supabaseClient
            .channel(
                `players-${game.id}`
            )
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "players",
                    filter: `game_id=eq.${game.id}`
                },
                async () => {

                    await loadPlayers();

                    updateGameState();
                }
            )
            .subscribe();




}


// ============================================================
// SHARED ANSWER FEEDBACK
// ============================================================

function showSharedAnswerFeedback() {
    if (!game || game.phase !== "question") return;
    if (!selectedQuestion) return;
    if (!game.current_answer) return;

    const answer = String(game.current_answer);
    const key = `${game.id}:${game.round}:${game.current_question_id}:${answer}`;

    if (answerFeedbackKey === key) return;
    answerFeedbackKey = key;

    if (answerFeedbackTimeout) {
        clearTimeout(answerFeedbackTimeout);
        answerFeedbackTimeout = null;
    }

    const buttons = document.querySelectorAll(".answer-button");
    buttons.forEach(button => {
        button.classList.remove(
            "answer-selected-amber",
            "answer-correct",
            "answer-wrong"
        );
    });

    let selectedButton = null;
    buttons.forEach(button => {
        if (button.dataset.answer === answer) {
            selectedButton = button;
            button.classList.add("answer-selected-amber");
        }
    });

    const correct = answer === selectedQuestion.correct;

    answerFeedbackTimeout = setTimeout(() => {
        buttons.forEach(button => {
            button.classList.remove("answer-selected-amber");
        });

        if (selectedButton) {
            selectedButton.classList.add(
                correct ? "answer-correct" : "answer-wrong"
            );
        }

        if (!correct) {
            buttons.forEach(button => {
                if (button.dataset.answer === selectedQuestion.correct) {
                    button.classList.add("answer-correct");
                }
            });
        }
    }, 1000);
}


// ============================================================
// LOBBY
// ============================================================

function updateLobby() {

    const code =
        document.getElementById(
            "lobby-code"
        );


    if (code && game) {
        code.textContent =
            game.code;
    }


    const hostBadge =
        document.getElementById(
            "host-badge"
        );


    if (hostBadge) {

        if (isHost) {
            hostBadge.classList.remove(
                "hidden"
            );
        } else {
            hostBadge.classList.add(
                "hidden"
            );
        }
    }


    const startButton =
        document.getElementById(
            "start-game-button"
        );


    if (startButton) {

        if (isHost && game?.phase === "lobby") {
            startButton.classList.remove(
                "hidden"
            );
        } else {
            startButton.classList.add(
                "hidden"
            );
        }
    }


    const playerCount =
        document.getElementById(
            "player-count"
        );


    if (playerCount) {
        playerCount.textContent =
            players.length;
    }
}


// ============================================================
// RENDER PLAYERS
// ============================================================

function renderPlayers() {

    const list =
        document.getElementById(
            "players-list"
        );


    if (!list) return;


    list.innerHTML = "";


    players.forEach(player => {

        const row =
            document.createElement("div");

        row.className =
            "player-card";


        if (player.id === myPlayerId) {
            row.classList.add("me");
        }


        row.innerHTML = `
            <div class="player-name">
                ${escapeHtml(player.name)}
            </div>
        `;


        list.appendChild(row);
    });


    const count =
        document.getElementById(
            "player-count"
        );


    if (count) {
        count.textContent =
            players.length;
    }
}


// ============================================================
// UPDATE GAME STATE
// ============================================================

function updateGameState() {

    if (!game) return;

    const roundNumber =
        document.getElementById(
            "round-number"
        );


    if (roundNumber) {
        roundNumber.textContent =
            game.round || 1;
    }


    updateCurrentPlayer();

    if (game.phase !== "question") {
        answerFeedbackKey = null;
        if (answerFeedbackTimeout) {
            clearTimeout(answerFeedbackTimeout);
            answerFeedbackTimeout = null;
        }
    }

    switch (game.phase) {

        case "lobby":
            showScreen("lobby-screen");
            updateLobby();
            break;


        case "selecting":
            showScreen("game-screen");
            showGamePhase("selection-phase");
            handleSelectionPhase();
            break;


        case "difficulty":
            showScreen("game-screen");
            showGamePhase("difficulty-phase");
            handleDifficultyPhase();
            break;


        case "question":
            showScreen("game-screen");
            showGamePhase("question-phase");
            handleQuestionPhase();
            break;


        case "song-reveal":
            showScreen("game-screen");
            showGamePhase("question-phase");
            handleSongRevealPhase();
            break;


        case "leaderboard":
            showScreen("game-screen");
            showGamePhase("leaderboard-phase");
            handleLeaderboardPhase();
            break;


        case "gamble":
            showScreen("game-screen");
            showGamePhase("gamble-phase");
            handleGamblePhase();
            break;


        case "final":
            showScreen("game-screen");
            showGamePhase("final-phase");
            handleFinalPhase();
            break;
    }
}


// ============================================================
// SHOW GAME PHASE
// ============================================================

function showGamePhase(phaseId) {

    document
        .querySelectorAll(".game-phase")
        .forEach(phase => {
            phase.classList.add("hidden");
        });


    const phase =
        document.getElementById(phaseId);


    if (phase) {
        phase.classList.remove("hidden");
    }
}


// ============================================================
// CURRENT PLAYER
// ============================================================

function updateCurrentPlayer() {

    const name =
        document.getElementById(
            "selected-player-name"
        );


    const currentPlayer =
        players.find(
            player =>
                player.id ===
                game?.current_player_id
        );


    if (name) {
        name.textContent =
            currentPlayer?.name || "-";
    }


    const score =
        document.getElementById(
            "game-score"
        );


    const me =
        players.find(
            player =>
                player.id ===
                myPlayerId
        );


    if (score && me) {
        score.textContent =
            `${me.points || 0} points`;
    }
}


// ============================================================
// START GAME
// ============================================================

async function startGame() {

    if (!isHost) return;

    if (!players.length) {
        alert("There are no players.");
        return;
    }


    await beginRound();
}


// ============================================================
// BEGIN ROUND
// ============================================================

async function beginRound() {

    if (!isHost) return;


    movingToNextPlayer = false;
    answerSubmitted = false;
    renderedQuestionId = null;


    clearTimers();


    // Reset everyone for the new round
    for (const player of players) {

        await supabaseClient
            .from("players")
            .update({
                rounds_picked: [],
                has_gambled: false,
                gamble_result: null,
                gamble_payout: 0
            })
            .eq("id", player.id);
    }


    const roundType = getRoundTypeForRound(game.round);
    currentRoundType = roundType;

    await supabaseClient
        .from("games")
        .update({
            phase: roundType === "song" ? "question" : "selecting",
            current_player_id: null,
            current_difficulty: null,
            current_question_id: null,
            current_answer: null,
            question_started_at: null,
            current_round_type: roundType
        })
        .eq("id", game.id);

    game = { ...game, current_round_type: roundType, phase: roundType === "song" ? "question" : "selecting", current_question_id: null, current_answer: null, question_started_at: null };

    if (roundType === "song") {
        await startSongRound();
        return;
    }


    await loadPlayers();


    setTimeout(async () => {
        await selectNextPlayer();
    }, 700);
}


// ============================================================
// SELECT NEXT PLAYER
// ============================================================

async function selectNextPlayer() {

    if (!isHost) return;

    if (movingToNextPlayer) return;

    movingToNextPlayer = true;

    try {

        // Always read the latest database state. We do not rely
        // on a possibly stale players array when deciding whether
        // the round is finished.
        const { data: latestPlayers, error: playersError } =
            await supabaseClient
                .from("players")
                .select("*")
                .eq("game_id", game.id)
                .order("joined_at", { ascending: true });

        if (playersError) {
            console.error("Could not load players for selection:", playersError);
            return;
        }

        players = latestPlayers || [];
        renderPlayers();
        renderLeaderboard();
        renderFinalLeaderboard();
        updateCurrentPlayer();

        if (!players.length) {
            console.error("No players found while selecting the next player.");
            return;
        }

        const round = Number(game.round || 1);

        // rounds_picked is retained as the fast/simple round tracker,
        // but we normalise values because Supabase/old data can contain
        // either numbers or strings.
        let availablePlayers = players.filter(player => {

            const picked = Array.isArray(player.rounds_picked)
                ? player.rounds_picked.map(Number)
                : [];

            return !picked.includes(round);
        });

        // If old/stale rounds_picked data says everybody has played,
        // verify against the actual answers table before showing the
        // leaderboard. This prevents a bad/stale rounds_picked value
        // from ending the round after the first question.
        if (!availablePlayers.length) {

            const { data: roundAnswers, error: answersError } =
                await supabaseClient
                    .from("answers")
                    .select("player_id")
                    .eq("game_id", game.id)
                    .eq("round", round);

            if (answersError) {
                console.error("Could not verify round answers:", answersError);
                return;
            }

            const answeredIds = new Set(
                (roundAnswers || []).map(answer => answer.player_id)
            );

            availablePlayers = players.filter(
                player => !answeredIds.has(player.id)
            );

            // Only show the leaderboard when every player has actually
            // submitted an answer for this round.
            if (!availablePlayers.length) {

                const { error: leaderboardError } =
                    await supabaseClient
                        .from("games")
                        .update({
                            phase: "leaderboard",
                            current_player_id: null,
                            current_difficulty: null,
                            current_question_id: null,
                            question_started_at: null
                        })
                        .eq("id", game.id);

                if (leaderboardError) {
                    console.error("Could not move to leaderboard:", leaderboardError);
                }

                return;
            }
        }

        // Random order, with each player selected only once per round.
        const selectedPlayer =
            availablePlayers[
                Math.floor(Math.random() * availablePlayers.length)
            ];

        const existingPicked =
            Array.isArray(selectedPlayer.rounds_picked)
                ? selectedPlayer.rounds_picked
                : [];

        const pickedRounds = [
            ...existingPicked.filter(value => Number(value) !== round),
            round
        ];

        const { error: playerUpdateError } =
            await supabaseClient
                .from("players")
                .update({
                    rounds_picked: pickedRounds
                })
                .eq("id", selectedPlayer.id);

        if (playerUpdateError) {
            console.error("Could not mark player as picked:", playerUpdateError);
            return;
        }

        const { error: gameUpdateError } =
            await supabaseClient
                .from("games")
                .update({
                    phase: "difficulty",
                    current_player_id: selectedPlayer.id,
                    current_difficulty: null,
                    current_question_id: null,
                    current_answer: null,
                    question_started_at: null
                })
                .eq("id", game.id);

        if (gameUpdateError) {
            console.error("Could not move to difficulty phase:", gameUpdateError);
            return;
        }

        // Keep the local state immediately in sync as well as relying on
        // realtime, so the host cannot accidentally run another selection.
        game = {
            ...game,
            phase: "difficulty",
            current_player_id: selectedPlayer.id,
            current_difficulty: null,
            current_question_id: null,
            current_answer: null,
            question_started_at: null
        };

        updateGameState();

    } catch (error) {

        console.error("Unexpected error selecting next player:", error);

    } finally {

        movingToNextPlayer = false;
    }
}


// ============================================================
// SELECTION PHASE
// ============================================================

function handleSelectionPhase() {

    const message =
        document.getElementById(
            "selection-message"
        );

    if (message) {
        message.textContent =
            "The next player is being selected.";
    }

    // There is deliberately only ONE place that selects a player:
    // the host. No delayed duplicate calls are made here.
    if (!isHost || movingToNextPlayer) return;

    selectNextPlayer();
}


// ============================================================
// DIFFICULTY PHASE
// ============================================================

function handleDifficultyPhase() {

    const currentPlayer =
        players.find(
            player =>
                player.id ===
                game.current_player_id
        );


    const eyebrow =
        document.querySelector(
            "#difficulty-phase .eyebrow"
        );


    const heading =
        document.querySelector(
            "#difficulty-phase h1"
        );


    if (game.current_player_id === myPlayerId) {

        if (eyebrow) {
            eyebrow.textContent =
                "IT'S YOUR TURN";
        }


        if (heading) {
            heading.textContent =
                "Choose your difficulty";
        }

    } else {

        if (eyebrow) {
            eyebrow.textContent =
                "PLAYER TURN";
        }


        if (heading) {
            heading.textContent =
                `${currentPlayer?.name || "Player"} is choosing`;
        }
    }


    const selectedDifficulty =
        String(game.current_difficulty || "").toLowerCase();

    document
        .querySelectorAll(".difficulty")
        .forEach(button => {

            const buttonDifficulty =
                String(button.dataset.difficulty || "").toLowerCase();

            button.disabled =
                game.current_player_id !==
                myPlayerId;

            // current_difficulty is stored in Supabase, so every
            // connected player sees the same selected difficulty.
            button.classList.toggle(
                "difficulty-selected",
                Boolean(selectedDifficulty) &&
                buttonDifficulty === selectedDifficulty
            );
        });
}


// ============================================================
// CHOOSE DIFFICULTY
// ============================================================

async function chooseDifficulty(difficulty) {

    if (!game) return;


    if (game.current_player_id !== myPlayerId) {
        return;
    }


    if (!POINTS[difficulty]) {
        return;
    }


    const questions =
        getQuestionsForDifficulty(
            difficulty
        );


    if (!questions?.length) {

        alert(
            "There are no questions for this difficulty."
        );

        return;
    }


    // Never reuse a question anywhere in the same game.
    const { data: usedAnswers, error: usedAnswersError } =
        await supabaseClient
            .from("answers")
            .select("question_id")
            .eq("game_id", game.id);

    if (usedAnswersError) {
        console.error(
            "Could not check used questions:",
            usedAnswersError
        );

        alert("Could not select a question. Please try again.");
        return;
    }

    const usedQuestionIds =
        new Set(
            (usedAnswers || [])
                .map(answer => answer.question_id)
                .filter(Boolean)
        );

    const unusedQuestions =
        questions.filter(
            question => !usedQuestionIds.has(question.id)
        );

    if (!unusedQuestions.length) {
        alert(
            `There are no unused ${difficulty} questions left in this game.`
        );
        return;
    }

    selectedQuestion =
        unusedQuestions[
            Math.floor(
                Math.random() *
                unusedQuestions.length
            )
        ];

    // Reserve the question immediately so it cannot be selected again
    // if the player refreshes or leaves before answering.
    const { error: reservationError } =
        await supabaseClient
            .from("answers")
            .upsert({
                game_id: game.id,
                player_id: myPlayerId,
                round: game.round,
                question_id: selectedQuestion.id,
                difficulty: difficulty,
                answer: "",
                correct: false,
                points_awarded: 0
            }, {
                onConflict: "player_id,round"
            });

    if (reservationError) {
        console.error(
            "Could not reserve question:",
            reservationError
        );

        alert("Could not select the question. Please try again.");
        return;
    }


    answerSubmitted = false;
    renderedQuestionId = null;


    const { error: difficultyError } =
        await supabaseClient
            .from("games")
            .update({
                phase: "question",
                current_round_type: "classic",
                current_difficulty: difficulty,
                current_question_id:
                    selectedQuestion.id,
                current_answer: null,
                question_started_at:
                    new Date().toISOString()
            })
            .eq("id", game.id);

    if (difficultyError) {
        console.error(
            "Could not save difficulty:",
            difficultyError
        );
        alert("Could not save the difficulty. Please try again.");
        return;
    }

    // Update the local state immediately as well as relying on Realtime.
    // This makes the selected difficulty visible consistently while the
    // other players receive the same value through the games channel.
    game = {
        ...game,
        phase: "question",
        current_round_type: "classic",
        current_difficulty: difficulty,
        current_question_id: selectedQuestion.id,
        current_answer: null,
        question_started_at: new Date().toISOString()
    };

    updateGameState();
}


// ============================================================
// QUESTION PHASE
// ============================================================

function handleQuestionPhase() {

    const questionId = game.current_question_id;
    currentRoundType = game.current_round_type || getRoundTypeForRound(game.round);

    // Classic questions must never inherit a stale song-round type from the
    // previous round. The database value set by chooseDifficulty() is the
    // authoritative value for this question.
    if (currentRoundType === "song") {
        handleSongQuestionPhase();
        return;
    }

    if (renderedQuestionId === questionId) {
        updateAnswerButtons();
        showSharedAnswerFeedback();
        return;
    }

    const questions = getQuestionsForDifficulty(game.current_difficulty);
    if (!questions?.length) return;

    selectedQuestion = questions.find(question => question.id === questionId);
    if (!selectedQuestion) {
        console.error("Question not found:", questionId);
        return;
    }

    renderedQuestionId = questionId;
    answerSubmitted = false;
    renderQuestion();
    startTimer();
}


// ============================================================
// SONG PLAYBACK
// ============================================================

function setupSongPlayButton() {
    const button = document.getElementById("song-play-button");
    const audio = document.getElementById("song-audio");

    if (!button || !audio || button.dataset.bound === "true") return;

    button.dataset.bound = "true";

    button.addEventListener("click", async () => {
        if (!selectedQuestion?.audio) return;

        try {
            audio.src = selectedQuestion.audio;
            audio.currentTime = 0;
            await audio.play();
            button.textContent = "⏸ Playing Clip";
        } catch (error) {
            console.warn("Could not play song clip:", error);
            button.textContent = "▶ Play Clip";
        }
    });

    audio.addEventListener("ended", () => {
        button.textContent = "↻ Replay Clip";
    });
}

// ============================================================
// QUESTION TYPE SYSTEM
// ============================================================

function createRandomRoundTypeOrder(totalRounds = 12) {
    const base = [];
    const classicCount = Math.ceil(totalRounds / 2);
    const songCount = Math.floor(totalRounds / 2);

    for (let i = 0; i < classicCount; i++) base.push("classic");
    for (let i = 0; i < songCount; i++) base.push("song");

    // Fisher-Yates shuffle, retrying if two identical types end up together.
    // With an even split this gives every game its own mixed sequence rather
    // than forcing a fixed Classic/Song/Classic/Song pattern.
    for (let attempt = 0; attempt < 100; attempt++) {
        const order = [...base];
        for (let i = order.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [order[i], order[j]] = [order[j], order[i]];
        }

        let valid = true;
        for (let i = 1; i < order.length; i++) {
            if (order[i] === order[i - 1]) {
                valid = false;
                break;
            }
        }

        if (valid) return order;
    }

    return base;
}

function getRoundTypeForRound(round) {
    const configured = Array.isArray(game?.round_type_order)
        ? game.round_type_order
        : [];

    if (configured.length) {
        return configured[(Number(round || 1) - 1) % configured.length] || "classic";
    }

    return "classic";
}

function getRoundTypeLabel(type) {
    return type === "song" ? "NAME THAT SONG" : "CLASSIC QUESTION";
}

async function startSongRound() {
    if (!isHost || !game) return;

    const usedQuestionIds = new Set();
    const { data: usedAnswers, error } = await supabaseClient
        .from("answers")
        .select("question_id")
        .eq("game_id", game.id);

    if (error) {
        console.error("Could not check used song questions:", error);
        return;
    }

    (usedAnswers || []).forEach(row => {
        if (row.question_id) usedQuestionIds.add(row.question_id);
    });

    const songQuestion = await getRandomSongQuestion(usedQuestionIds);
    if (!songQuestion) {
        alert("There are no unused song questions left. Add more songs to question_types.js.");
        return;
    }

    selectedQuestion = songQuestion;
    renderedQuestionId = null;
    answerSubmitted = false;
    songRoundFinished = false;
    songDeadlineHandled = false;

    // Give everyone the same shared start time. Each browser uses this
    // timestamp rather than the moment its realtime event arrives.
    const startAt = new Date(Date.now() + 1500);

    await supabaseClient
        .from("games")
        .update({
            phase: "question",
            current_round_type: "song",
            current_player_id: null,
            current_difficulty: null,
            current_question_id: songQuestion.id,
            current_answer: null,
            question_started_at: startAt.toISOString()
        })
        .eq("id", game.id);
}

async function handleSongQuestionPhase() {
    const questionId = game.current_question_id;

    if (loadingSongQuestionId === questionId) return;
    if (renderedQuestionId === questionId && selectedQuestion?.id === questionId) {
        updateSongAnswerControls();
        return;
    }

    loadingSongQuestionId = questionId;

    const songQuestion = await getSongQuestionById(questionId);
    if (!songQuestion) {
        loadingSongQuestionId = null;
        console.error("Song question or audio preview not found:", questionId);
        return;
    }

    selectedQuestion = songQuestion;
    renderedQuestionId = questionId;
    answerSubmitted = false;
    songRoundFinished = false;
    songDeadlineHandled = false;

    renderQuestion();
    loadingSongQuestionId = null;
    startSongTimer();
    startSongAnswerWatcher();
}

function getSongTiming() {
    const startMs = new Date(game?.question_started_at || 0).getTime();
    const durationMs = 10000;
    return {
        startMs,
        endMs: startMs + durationMs,
        durationMs
    };
}

function updateSongAnswerControls() {
    const timing = getSongTiming();
    const now = Date.now();
    const open = game?.phase === "question" &&
        timing.startMs > 0 &&
        now >= timing.startMs &&
        now < timing.endMs &&
        !answerSubmitted;

    document.querySelectorAll(".answer-button").forEach(button => {
        button.disabled = !open;
    });
}

function startSongTimer() {
    clearInterval(timerInterval);
    if (songPreStartTimeout) clearTimeout(songPreStartTimeout);

    const timer = document.getElementById("timer");
    const timing = getSongTiming();
    if (!timing.startMs) return;

    const tick = () => {
        const now = Date.now();
        const remaining = Math.max(0, Math.ceil((timing.endMs - now) / 1000));
        const beforeStart = now < timing.startMs;

        if (timer) {
            timer.textContent = beforeStart ? "10" : String(remaining);
        }

        updateSongAnswerControls();

        if (now >= timing.endMs) {
            clearInterval(timerInterval);
            timerInterval = null;
            finishSongRoundIfNeeded();
        }
    };

    tick();

    const delay = Math.max(0, timing.startMs - Date.now());
    songPreStartTimeout = setTimeout(() => {
        updateSongAnswerControls();
    }, delay);

    timerInterval = setInterval(tick, 100);

    const audio = document.getElementById("song-audio");
    if (audio) {
        audio.src = selectedQuestion?.audio || "";
        audio.currentTime = 0;

        setTimeout(() => {
            if (game?.phase !== "question" || game.current_round_type !== "song") return;
            audio.currentTime = 0;
            audio.play().then(() => {
                const button = document.getElementById("song-play-button");
                if (button) button.textContent = "⏸ Playing Clip";
            }).catch(() => {
                // Browser autoplay may be blocked. The Play Clip button remains available.
            });
        }, delay);
    }
}

function startSongAnswerWatcher() {
    if (songAnswerWatcher) clearInterval(songAnswerWatcher);
    if (!isHost) return;

    songAnswerWatcher = setInterval(() => {
        if (!game || game.phase !== "question" || game.current_round_type !== "song") {
            clearInterval(songAnswerWatcher);
            songAnswerWatcher = null;
            return;
        }
        finishSongRoundIfNeeded();
    }, 250);
}

async function finishSongRoundIfNeeded() {
    if (!isHost || songRoundFinished || songDeadlineHandled || !game) return;
    if (game.phase !== "question" || game.current_round_type !== "song") return;

    const timing = getSongTiming();
    const now = Date.now();

    const { data: latestAnswers, error } = await supabaseClient
        .from("answers")
        .select("player_id")
        .eq("game_id", game.id)
        .eq("round", game.round);

    if (error) {
        console.error("Could not check song answers:", error);
        return;
    }

    const answeredPlayers = new Set((latestAnswers || []).map(row => row.player_id));
    const everyoneAnswered = players.length > 0 && answeredPlayers.size >= players.length;
    const expired = timing.endMs > 0 && now >= timing.endMs;

    if (!everyoneAnswered && !expired) return;

    songDeadlineHandled = true;
    songRoundFinished = true;
    clearInterval(timerInterval);
    timerInterval = null;
    if (songAnswerWatcher) {
        clearInterval(songAnswerWatcher);
        songAnswerWatcher = null;
    }

    // Reveal the correct answer only after everyone has answered or the
    // shared 10-second answering window has expired.
    const { error: revealError } = await supabaseClient
        .from("games")
        .update({
            phase: "song-reveal",
            current_answer: selectedQuestion?.correct || null,
            current_player_id: null,
            current_difficulty: null
        })
        .eq("id", game.id)
        .eq("phase", "question");

    if (revealError) {
        console.error("Could not reveal song answer:", revealError);
    }
}

function handleSongRevealPhase() {
    clearInterval(timerInterval);
    timerInterval = null;
    if (songAnswerWatcher) {
        clearInterval(songAnswerWatcher);
        songAnswerWatcher = null;
    }

    if (songRevealTimeout) clearTimeout(songRevealTimeout);

    if (selectedQuestion && selectedQuestion.id === game.current_question_id) {
        renderQuestion();
    }

    document.querySelectorAll(".answer-button").forEach(button => {
        button.disabled = true;
        button.classList.remove("answer-selected-amber", "answer-wrong");
        if (button.dataset.answer === game.current_answer) {
            button.classList.add("answer-correct");
        }
    });

    const result = document.getElementById("answer-result");
    if (result) {
        result.textContent = `Correct answer: ${game.current_answer || "—"}`;
        result.className = "answer-result answer-correct-result";
    }

    const timer = document.getElementById("timer");
    if (timer) timer.textContent = "✓";

    if (isHost) {
        songRevealTimeout = setTimeout(async () => {
            if (!game || game.phase !== "song-reveal") return;
            await supabaseClient
                .from("games")
                .update({
                    phase: "leaderboard",
                    current_answer: null,
                    current_question_id: null,
                    question_started_at: null
                })
                .eq("id", game.id)
                .eq("phase", "song-reveal");
        }, 2500);
    }
}

// ============================================================
// MOVE TO NEXT PLAYER
// ============================================================

async function moveToNextPlayer() {

    // Kept for compatibility with any older button/timer references.
    // All real player selection now goes through selectNextPlayer().
    if (!isHost) return;

    await selectNextPlayer();
}


// ============================================================
// LEADERBOARD
// ============================================================

function ensureLeaderboardContinueButton() {
    let button = document.getElementById("continue-button");
    if (button) return button;

    const phase = document.getElementById("leaderboard-phase");
    if (!phase) return null;

    button = document.createElement("button");
    button.id = "continue-button";
    button.type = "button";
    button.className = "primary-button";
    button.textContent = "Start Next Round";
    button.style.setProperty("display", "block", "important");
    button.style.setProperty("visibility", "visible", "important");
    button.style.width = "100%";
    button.style.marginTop = "24px";
    phase.appendChild(button);

    if (button.dataset.bound !== "true") {
        button.dataset.bound = "true";
        button.addEventListener("click", async () => {
            await continueFromLeaderboard();
        });
    }

    return button;
}


async function handleLeaderboardPhase() {
    clearTimers();
    renderLeaderboard();

    if (!game) return;

    // Never trust a stale local host flag. The database game row is authoritative.
    isHost = game.host_id === myPlayerId;

    const button = ensureLeaderboardContinueButton();
    if (!button) return;

    const bonusIsDue =
        !game.bonus_used &&
        Number(game.bonus_round) === Number(game.round);

    if (isHost) {
        button.classList.remove("hidden");
        button.disabled = false;
        button.style.setProperty("display", "block", "important");
        button.style.setProperty("visibility", "visible", "important");
        button.textContent = bonusIsDue
            ? "Continue to Bonus Gamble"
            : "Start Next Round";
    } else {
        button.classList.add("hidden");
        button.style.setProperty("display", "none", "important");
    }
}


// Called only by the host from the leaderboard screen.
async function continueFromLeaderboard() {

    if (!isHost || !game || game.phase !== "leaderboard") return;

    const continueButton =
        document.getElementById("continue-button");

    if (continueButton) {
        continueButton.disabled = true;
        continueButton.textContent = "Loading…";
    }

    try {
        const bonusIsDue =
            !game.bonus_used &&
            Number(game.bonus_round) === Number(game.round);

        if (bonusIsDue) {
            await beginGamblePhase();
            return;
        }

        await startNextRound();

    } finally {
        // Re-enable only if the game is still on the leaderboard.
        if (continueButton && game?.phase === "leaderboard") {
            continueButton.disabled = false;
            continueButton.textContent = "Start Next Round";
        }
    }
}


function renderLeaderboard() {

    const leaderboard =
        document.getElementById(
            "leaderboard"
        );


    if (!leaderboard) return;


    const sorted =
        [...players].sort(
            (a, b) =>
                (b.points || 0) -
                (a.points || 0)
        );


    leaderboard.innerHTML = "";


    sorted.forEach(
        (player, index) => {

            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "leaderboard-row";


            if (
                player.id ===
                myPlayerId
            ) {

                row.classList.add(
                    "me"
                );
            }


            row.innerHTML = `
                <div class="leaderboard-position">
                    ${index + 1}
                </div>

                <div class="leaderboard-name">
                    ${escapeHtml(player.name)}
                </div>

                <div class="leaderboard-points">
                    ${player.points || 0}
                </div>
            `;


            leaderboard.appendChild(
                row
            );
        }
    );
}


// ============================================================
// START GAMBLE
// ============================================================

async function beginGamblePhase() {

    if (!isHost) return;


    await supabaseClient
        .from("players")
        .update({
            has_gambled: false,
            gamble_result: null,
            gamble_payout: 0,
            ready_up: false
        })
        .eq(
            "game_id",
            game.id
        );


    // Store the exact gamble deadline in the existing timestamp field so
    // every player sees the same 20-second countdown.
    const gambleDeadline =
        new Date(Date.now() + 20000).toISOString();

    await supabaseClient
        .from("games")
        .update({
            phase: "gamble",
            question_started_at: gambleDeadline,
            bonus_used: true
        })
        .eq(
            "id",
            game.id
        );
}


// ============================================================
// GAMBLE PHASE
// ============================================================

function getGambleMultiplier(stake) {
    if (stake >= 7) return 5;
    if (stake >= 5) return 4;
    if (stake >= 3) return 3;
    return 2;
}

function updateGambleMultiplierPreview() {
    const me = players.find(player => player.id === myPlayerId);
    const input = document.getElementById("gamble-stake");
    const info = document.getElementById("multiplier-info");

    if (!me || !input || !info) return;

    const max = Math.max(0, Number(me.points || 0));
    input.max = String(max);

    let stake = Number(input.value || 1);
    if (max > 0) {
        stake = Math.min(Math.max(1, stake), max);
        input.value = String(stake);
    }

    const multiplier = getGambleMultiplier(stake);
    info.textContent = max > 0
        ? `${stake} point${stake === 1 ? "" : "s"} staked · ${multiplier}× multiplier if you hit`
        : "You have no points to gamble.";
}

function handleGamblePhase() {

    const me = players.find(player => player.id === myPlayerId);
    if (!me) return;

    const gambleButton = document.getElementById("gamble-button");
    const keepButton = document.getElementById("keep-button");
    const stakeInput = document.getElementById("gamble-stake");

    const canGamble =
        !me.has_gambled &&
        !me.ready_up &&
        (me.points || 0) > 0;

    if (stakeInput) {
        stakeInput.max = String(Math.max(1, me.points || 1));
        stakeInput.disabled = !canGamble;
        if (!stakeInput.value || Number(stakeInput.value) < 1) {
            stakeInput.value = "1";
        }
        if (Number(stakeInput.value) > Number(stakeInput.max)) {
            stakeInput.value = stakeInput.max;
        }
    }

    if (gambleButton) {
        gambleButton.disabled = !canGamble;
        gambleButton.textContent = me.has_gambled
            ? "🎰 Gamble Complete"
            : "🎰 Spin Bonus";
    }

    if (keepButton) {
        keepButton.textContent = me.ready_up ? "✓ Ready" : "✓ Ready Up";
        keepButton.disabled = !!me.ready_up;
        keepButton.classList.toggle("ready-complete", !!me.ready_up);
    }

    const result = document.getElementById("slot-result");
    if (result) {
        if (me.ready_up) {
            result.textContent = "You're ready! Waiting for everyone else…";
        } else if (me.has_gambled) {
            result.textContent = me.gamble_result === "Kept"
                ? "Points kept — ready up when you're done."
                : `${me.gamble_result || ""} · ${me.gamble_payout || 0} points won · Ready up when you're done.`;
        } else {
            result.textContent = canGamble
                ? "Choose your stake. A bigger stake gives a bigger multiplier."
                : "You have no points to gamble. Ready up to continue.";
        }
    }

    updateGambleMultiplierPreview();
    renderGambleReadyStatus();
    startGambleTimer();
    startGambleReadyWatcher();
}


// ============================================================
// KEEP
// ============================================================

async function readyUp() {

    const me =
        players.find(
            player =>
                player.id ===
                myPlayerId
        );

    if (!me) return;
    if (me.ready_up) return;

    const { error } =
        await supabaseClient
            .from("players")
            .update({
                ready_up: true
            })
            .eq(
                "id",
                myPlayerId
            );

    if (error) {
        console.error("Could not ready up:", error);
        alert("Could not ready you up. Please try again.");
        return;
    }

    await loadPlayers();
    await checkEveryoneReady();
}


// ============================================================
// GAMBLE
// ============================================================


async function gamblePoints() {

    const me = players.find(player => player.id === myPlayerId);
    if (!me || me.has_gambled || me.ready_up) return;

    const stakeInput = document.getElementById("gamble-stake");
    const availablePoints = Math.max(0, Number(me.points || 0));
    const stake = Number(stakeInput?.value || 0);

    if (!Number.isInteger(stake) || stake < 1 || stake > availablePoints) {
        alert(`Choose a whole-number stake between 1 and ${availablePoints} points.`);
        return;
    }

    const multiplier = getGambleMultiplier(stake);

    const symbols = ["💎", "⭐", "🔔", "🍋", "🍒"];
    const reel1 = symbols[Math.floor(Math.random() * symbols.length)];
    const reel2 = symbols[Math.floor(Math.random() * symbols.length)];
    const reel3 = symbols[Math.floor(Math.random() * symbols.length)];

    const triple = reel1 === reel2 && reel2 === reel3;
    const winnings = triple ? stake * multiplier : 0;
    const finalPoints = availablePoints - stake + winnings;
    const result = `${reel1}${reel2}${reel3}`;

    const reelOne = document.getElementById("reel-1");
    const reelTwo = document.getElementById("reel-2");
    const reelThree = document.getElementById("reel-3");
    if (reelOne) reelOne.textContent = reel1;
    if (reelTwo) reelTwo.textContent = reel2;
    if (reelThree) reelThree.textContent = reel3;

    const { error } = await supabaseClient
        .from("players")
        .update({
            points: finalPoints,
            has_gambled: true,
            gamble_result: result,
            gamble_payout: winnings,
            ready_up: false
        })
        .eq("id", myPlayerId);

    if (error) {
        console.error("Could not save gamble:", error);
        alert("Could not save your gamble. Please try again.");
        return;
    }

    const slotResult = document.getElementById("slot-result");
    if (slotResult) {
        slotResult.textContent = triple
            ? `${result} — ${stake} staked × ${multiplier} = ${winnings} points won!`
            : `${result} — ${stake} points lost.`;
    }

    await loadPlayers();
    await checkEveryoneReady();
}


// ============================================================
// CHECK EVERYONE HAS CHOSEN
// ============================================================

async function checkEveryoneReady() {

    if (!game || game.phase !== "gamble") return;

    const { data: latestPlayers, error } =
        await supabaseClient
            .from("players")
            .select("*")
            .eq("game_id", game.id)
            .order("joined_at", { ascending: true });

    if (error) {
        console.error("Could not check ready status:", error);
        return;
    }

    players = latestPlayers || [];
    renderGambleReadyStatus();

    const everyoneReady =
        players.length > 0 &&
        players.every(player => player.ready_up === true);

    if (!everyoneReady || !isHost) return;

    await finishGamblePhase();
}


function startGambleReadyWatcher() {

    if (gambleReadyWatchInterval) {
        clearInterval(gambleReadyWatchInterval);
        gambleReadyWatchInterval = null;
    }

    if (!isHost || !game || game.phase !== "gamble") return;

    gambleReadyWatchInterval = setInterval(async () => {

        if (!isHost || !game || game.phase !== "gamble") {
            clearInterval(gambleReadyWatchInterval);
            gambleReadyWatchInterval = null;
            return;
        }

        await checkEveryoneReady();
    }, 500);
}


function renderGambleReadyStatus() {

    const phase =
        document.getElementById("gamble-phase");

    if (!phase) return;

    let status =
        document.getElementById("gamble-ready-status");

    if (!status) {
        status = document.createElement("div");
        status.id = "gamble-ready-status";
        const buttons = phase.querySelector(".gamble-buttons");
        if (buttons) {
            buttons.insertAdjacentElement("afterend", status);
        } else {
            phase.appendChild(status);
        }
    }

    status.innerHTML = players.map(player => `
        <div class="gamble-ready-player">
            <span>${escapeHtml(player.name)}</span>
            <span class="gamble-ready-badge ${player.ready_up ? "is-ready" : ""}">
                ${player.ready_up ? "✓ Ready" : "Waiting"}
            </span>
        </div>
    `).join("");
}


// ============================================================
// GAMBLE TIMER
// ============================================================

function ensureGambleTimerElement() {

    let timer =
        document.getElementById("gamble-timer");

    if (timer) return timer;

    const phase =
        document.getElementById("gamble-phase");

    if (!phase) return null;

    timer = document.createElement("div");
    timer.id = "gamble-timer";
    timer.setAttribute("aria-live", "polite");
    timer.style.fontSize = "2rem";
    timer.style.fontWeight = "800";
    timer.style.textAlign = "center";
    timer.style.margin = "12px 0";
    timer.style.padding = "10px 18px";
    timer.style.borderRadius = "12px";
    timer.style.background = "rgba(255,255,255,0.08)";

    const heading = phase.firstElementChild;
    if (heading) {
        phase.insertBefore(timer, heading.nextSibling);
    } else {
        phase.prepend(timer);
    }

    return timer;
}


function startGambleTimer() {

    const timer = ensureGambleTimerElement();

    if (!timer || !game) return;

    if (!game.question_started_at) {
        timer.textContent = "20";
        return;
    }

    if (gambleTimerInterval) return;

    const tick = async () => {

        if (!game || game.phase !== "gamble") {
            clearGambleTimer();
            return;
        }

        const deadline =
            new Date(game.question_started_at).getTime();

        const remaining =
            Math.max(0, deadline - Date.now());

        const seconds =
            Math.ceil(remaining / 1000);

        timer.textContent = `${seconds}s`;

        if (seconds <= 5) {
            timer.style.background = "rgba(220, 38, 38, 0.25)";
        } else {
            timer.style.background = "rgba(255,255,255,0.08)";
        }

        if (remaining <= 0) {
            clearGambleTimer();

            if (isHost) {
                await finishGamblePhase();
            }
        }
    };

    tick();
    gambleTimerInterval = setInterval(tick, 250);
}


function clearGambleTimer() {

    if (gambleTimerInterval) {
        clearInterval(gambleTimerInterval);
        gambleTimerInterval = null;
    }

    if (gambleReadyWatchInterval) {
        clearInterval(gambleReadyWatchInterval);
        gambleReadyWatchInterval = null;
    }
}


async function finishGamblePhase() {

    if (!isHost || !game) return;
    if (gambleTransitioning) return;
    if (game.phase !== "gamble") return;

    gambleTransitioning = true;
    clearGambleTimer();

    try {
        // If the 20-second safety timer expires, automatically ready up
        // anyone who has not done so. Their points are left unchanged.
        const { error: playerError } =
            await supabaseClient
                .from("players")
                .update({
                    ready_up: true
                })
                .eq("game_id", game.id)
                .eq("ready_up", false);

        if (playerError) {
            console.error(
                "Could not finish gamble phase:",
                playerError
            );
            return;
        }

        await startNextRound();

    } finally {
        gambleTransitioning = false;
    }
}


// ============================================================
// NEXT ROUND
// ============================================================

async function startNextRound() {

    if (!isHost) return;

    clearGambleTimer();


    const nextRound =
        (game.round || 1) + 1;


    const nextRoundType = getRoundTypeForRound(nextRound);
    currentRoundType = nextRoundType;

    await supabaseClient
        .from("games")
        .update({
            round: nextRound,
            phase: nextRoundType === "song" ? "question" : "selecting",
            current_player_id: null,
            current_difficulty: null,
            current_question_id: null,
            current_answer: null,
            question_started_at: null,
            current_round_type: nextRoundType
        })
        .eq("id", game.id);


    await supabaseClient
        .from("players")
        .update({
            rounds_picked: [],
            has_gambled: false,
            gamble_result: null,
            gamble_payout: 0,
            ready_up: false
        })
        .eq(
            "game_id",
            game.id
        );


    await loadPlayers();


    game = { ...game, round: nextRound, current_round_type: nextRoundType, phase: nextRoundType === "song" ? "question" : "selecting", current_question_id: null, current_answer: null, question_started_at: null };

    if (nextRoundType === "song") {
        await startSongRound();
    } else {
        setTimeout(async () => {
            await selectNextPlayer();
        }, 700);
    }
}


// ============================================================
// FINAL
// ============================================================

function handleFinalPhase() {

    renderFinalLeaderboard();
}


function renderFinalLeaderboard() {

    const leaderboard =
        document.getElementById(
            "final-leaderboard"
        );


    if (!leaderboard) return;


    const sorted =
        [...players].sort(
            (a, b) =>
                (b.points || 0) -
                (a.points || 0)
        );


    leaderboard.innerHTML = "";


    sorted.forEach(
        (player, index) => {

            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "leaderboard-row";


            row.innerHTML = `
                <div class="leaderboard-position">
                    ${index + 1}
                </div>

                <div class="leaderboard-name">
                    ${escapeHtml(player.name)}
                </div>

                <div class="leaderboard-points">
                    ${player.points || 0}
                </div>
            `;


            leaderboard.appendChild(
                row
            );
        }
    );
}


// ============================================================
// CLEAR TIMERS
// ============================================================

function clearTimers() {

    if (timerInterval) {

        clearInterval(
            timerInterval
        );

        timerInterval = null;
    }


    if (nextPlayerTimeout) {

        clearTimeout(
            nextPlayerTimeout
        );

        nextPlayerTimeout = null;
    }

    clearGambleTimer();
    if (songAnswerWatcher) { clearInterval(songAnswerWatcher); songAnswerWatcher = null; }
    if (songRevealTimeout) { clearTimeout(songRevealTimeout); songRevealTimeout = null; }
    if (songPreStartTimeout) { clearTimeout(songPreStartTimeout); songPreStartTimeout = null; }
}


// ============================================================
// ESCAPE HTML
// ============================================================

function escapeHtml(value) {

    return String(value ?? "")
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );
}
