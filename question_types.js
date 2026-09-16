// ============================================================
// THE ULTIMATE QUIZ — QUESTION TYPES
// ============================================================

const QUESTION_TYPE_CONFIG = {
    classic: {
        label: "CLASSIC QUESTION",
        icon: "🎯"
    },
    song: {
        label: "NAME THAT SONG",
        icon: "🎵"
    }
};

// ============================================================
// NAME THAT SONG BANK
// ============================================================
//
// This version uses recognisable 1980s hits plus modern pop.
// Audio is loaded as the short preview supplied by Apple's iTunes
// Search API. No copyrighted audio files are bundled into the site.
//
// Preview availability can vary by country and can change over time.
// The quiz falls back to another song if a preview is unavailable.
// ============================================================

const SONG_QUESTIONS = [
    // -------------------------
    // 1980s POPULAR
    // -------------------------
    {
        id: "song-80-01",
        era: "80s",
        title: "Take on Me",
        artist: "a-ha",
        answers: ["Take on Me", "The Power of Love", "Everybody Wants to Rule the World", "Wake Me Up Before You Go-Go"]
    },
    {
        id: "song-80-02",
        era: "80s",
        title: "Billie Jean",
        artist: "Michael Jackson",
        answers: ["Billie Jean", "Beat It", "Man in the Mirror", "Like a Virgin"]
    },
    {
        id: "song-80-03",
        era: "80s",
        title: "Wake Me Up Before You Go-Go",
        artist: "Wham!",
        answers: ["Wake Me Up Before You Go-Go", "Faith", "Girls Just Want to Have Fun", "Karma Chameleon"]
    },
    {
        id: "song-80-04",
        era: "80s",
        title: "Girls Just Want to Have Fun",
        artist: "Cyndi Lauper",
        answers: ["Girls Just Want to Have Fun", "Material Girl", "I Wanna Dance with Somebody", "Walking on Sunshine"]
    },
    {
        id: "song-80-05",
        era: "80s",
        title: "Livin' on a Prayer",
        artist: "Bon Jovi",
        answers: ["Livin' on a Prayer", "You Give Love a Bad Name", "Summer of '69", "The Final Countdown"]
    },
    {
        id: "song-80-06",
        era: "80s",
        title: "Don't Stop Believin'",
        artist: "Journey",
        answers: ["Don't Stop Believin'", "Africa", "Every Breath You Take", "Livin' on a Prayer"]
    },
    {
        id: "song-80-07",
        era: "80s",
        title: "Africa",
        artist: "Toto",
        answers: ["Africa", "Rosanna", "Take on Me", "Don't Stop Believin'"]
    },
    {
        id: "song-80-08",
        era: "80s",
        title: "Every Breath You Take",
        artist: "The Police",
        answers: ["Every Breath You Take", "With or Without You", "Careless Whisper", "Hungry Like the Wolf"]
    },
    {
        id: "song-80-09",
        era: "80s",
        title: "Never Gonna Give You Up",
        artist: "Rick Astley",
        answers: ["Never Gonna Give You Up", "Together Forever", "You Spin Me Round", "Faith"]
    },
    {
        id: "song-80-10",
        era: "80s",
        title: "I Wanna Dance with Somebody",
        artist: "Whitney Houston",
        answers: ["I Wanna Dance with Somebody", "How Will I Know", "Girls Just Want to Have Fun", "Like a Prayer"]
    },
    {
        id: "song-80-11",
        era: "80s",
        title: "Sweet Child o' Mine",
        artist: "Guns N' Roses",
        answers: ["Sweet Child o' Mine", "Paradise City", "Pour Some Sugar on Me", "Every Rose Has Its Thorn"]
    },
    {
        id: "song-80-12",
        era: "80s",
        title: "The Final Countdown",
        artist: "Europe",
        answers: ["The Final Countdown", "Jump", "Don't Stop Believin'", "We Built This City"]
    },
    {
        id: "song-80-13",
        era: "80s",
        title: "Karma Chameleon",
        artist: "Culture Club",
        answers: ["Karma Chameleon", "True", "Wake Me Up Before You Go-Go", "Tainted Love"]
    },
    {
        id: "song-80-14",
        era: "80s",
        title: "Careless Whisper",
        artist: "George Michael",
        answers: ["Careless Whisper", "Faith", "Everything She Wants", "Every Breath You Take"]
    },
    {
        id: "song-80-15",
        era: "80s",
        title: "Like a Prayer",
        artist: "Madonna",
        answers: ["Like a Prayer", "Material Girl", "Papa Don't Preach", "Into the Groove"]
    },

    // -------------------------
    // MODERN POP
    // -------------------------
    {
        id: "song-modern-01",
        era: "Modern",
        title: "Blinding Lights",
        artist: "The Weeknd",
        answers: ["Blinding Lights", "Save Your Tears", "Starboy", "Stay"]
    },
    {
        id: "song-modern-02",
        era: "Modern",
        title: "As It Was",
        artist: "Harry Styles",
        answers: ["As It Was", "Watermelon Sugar", "Adore You", "Late Night Talking"]
    },
    {
        id: "song-modern-03",
        era: "Modern",
        title: "Espresso",
        artist: "Sabrina Carpenter",
        answers: ["Espresso", "Please Please Please", "Feather", "Taste"]
    },
    {
        id: "song-modern-04",
        era: "Modern",
        title: "Birds of a Feather",
        artist: "Billie Eilish",
        answers: ["Birds of a Feather", "bad guy", "Happier Than Ever", "Therefore I Am"]
    },
    {
        id: "song-modern-05",
        era: "Modern",
        title: "Good Luck, Babe!",
        artist: "Chappell Roan",
        answers: ["Good Luck, Babe!", "Pink Pony Club", "HOT TO GO!", "Casual"]
    },
    {
        id: "song-modern-06",
        era: "Modern",
        title: "Beautiful Things",
        artist: "Benson Boone",
        answers: ["Beautiful Things", "In the Stars", "Slow It Down", "Before You"]
    },
    {
        id: "song-modern-07",
        era: "Modern",
        title: "Flowers",
        artist: "Miley Cyrus",
        answers: ["Flowers", "Used to Be Young", "Midnight Sky", "Wrecking Ball"]
    },
    {
        id: "song-modern-08",
        era: "Modern",
        title: "Houdini",
        artist: "Dua Lipa",
        answers: ["Houdini", "Levitating", "New Rules", "Dance the Night"]
    },
    {
        id: "song-modern-09",
        era: "Modern",
        title: "Levitating",
        artist: "Dua Lipa",
        answers: ["Levitating", "Don't Start Now", "Houdini", "Physical"]
    },
    {
        id: "song-modern-10",
        era: "Modern",
        title: "Anti-Hero",
        artist: "Taylor Swift",
        answers: ["Anti-Hero", "Cruel Summer", "Blank Space", "Lavender Haze"]
    },
    {
        id: "song-modern-11",
        era: "Modern",
        title: "good 4 u",
        artist: "Olivia Rodrigo",
        answers: ["good 4 u", "drivers license", "vampire", "deja vu"]
    },
    {
        id: "song-modern-12",
        era: "Modern",
        title: "Stay",
        artist: "The Kid LAROI & Justin Bieber",
        answers: ["Stay", "Without You", "Peaches", "Ghost"]
    },
    {
        id: "song-modern-13",
        era: "Modern",
        title: "Shape of You",
        artist: "Ed Sheeran",
        answers: ["Shape of You", "Bad Habits", "Perfect", "Castle on the Hill"]
    },
    {
        id: "song-modern-14",
        era: "Modern",
        title: "Watermelon Sugar",
        artist: "Harry Styles",
        answers: ["Watermelon Sugar", "As It Was", "Adore You", "Sign of the Times"]
    },
    {
        id: "song-modern-15",
        era: "Modern",
        title: "Dance The Night",
        artist: "Dua Lipa",
        answers: ["Dance The Night", "Houdini", "Levitating", "One Kiss"]
    }
].map(song => ({
    ...song,
    question: "Which song is this?",
    answer: song.title,
    correct: song.title,
    type: "song",
    audio: null,
    audioTitle: null,
    audioArtist: null
}));

const songPreviewCache = new Map();

function normaliseSongText(value = "") {
    return String(value)
        .toLowerCase()
        .replace(/[’‘]/g, "'")
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, " ")
        .trim();
}

async function lookupSongPreview(song) {
    if (!song) return null;

    if (songPreviewCache.has(song.id)) {
        return songPreviewCache.get(song.id);
    }

    const query = `${song.title} ${song.artist}`;
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&country=GB&limit=10`;

    try {
        const response = await fetch(url, {
            method: "GET",
            cache: "force-cache"
        });

        if (!response.ok) {
            throw new Error(`iTunes lookup failed with ${response.status}`);
        }

        const data = await response.json();
        const targetTitle = normaliseSongText(song.title);
        const targetArtist = normaliseSongText(song.artist);

        const match = (data.results || []).find(result => {
            const resultTitle = normaliseSongText(result.trackName);
            const resultArtist = normaliseSongText(result.artistName);

            return result.previewUrl &&
                (resultTitle === targetTitle || resultTitle.includes(targetTitle) || targetTitle.includes(resultTitle)) &&
                (resultArtist.includes(targetArtist) || targetArtist.includes(resultArtist));
        }) || (data.results || []).find(result => result.previewUrl);

        const previewUrl = match?.previewUrl || null;

        if (previewUrl) {
            song.audio = previewUrl;
            song.audioTitle = match.trackName;
            song.audioArtist = match.artistName;
        }

        songPreviewCache.set(song.id, previewUrl);
        return previewUrl;
    } catch (error) {
        console.warn(`Could not load preview for ${song.title}:`, error);
        songPreviewCache.set(song.id, null);
        return null;
    }
}

async function getSongQuestionById(id) {
    const song = SONG_QUESTIONS.find(item => item.id === id) || null;
    if (!song) return null;

    await lookupSongPreview(song);
    return song;
}

async function getRandomSongQuestion(usedQuestionIds = new Set()) {
    const used = usedQuestionIds instanceof Set
        ? usedQuestionIds
        : new Set(usedQuestionIds || []);

    const available = SONG_QUESTIONS.filter(song => !used.has(song.id));

    if (!available.length) return null;

    // Shuffle first so unavailable previews don't always produce the same song.
    const shuffled = [...available];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    for (const song of shuffled) {
        const preview = await lookupSongPreview(song);
        if (preview) return song;
    }

    return null;
}
