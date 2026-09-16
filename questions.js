// ============================================================
// THE ULTIMATE QUIZ — EXPANDED CLASSIC QUESTION BANK
// 120 questions: 40 Easy, 40 Medium, 40 Hard
// ============================================================

const QUESTIONS = [
    {
        id: "classic-001",
        difficulty: "easy",
        question: 'What is the capital of France?',
        answers: ['Paris', 'Madrid', 'Rome', 'Berlin'],
        correct: 'Paris'
    },
    {
        id: "classic-002",
        difficulty: "easy",
        question: 'Which planet is known as the Red Planet?',
        answers: ['Mars', 'Venus', 'Jupiter', 'Mercury'],
        correct: 'Mars'
    },
    {
        id: "classic-003",
        difficulty: "easy",
        question: 'How many days are there in a leap year?',
        answers: ['366', '365', '364', '367'],
        correct: '366'
    },
    {
        id: "classic-004",
        difficulty: "easy",
        question: 'What is the largest ocean on Earth?',
        answers: ['Pacific Ocean', 'Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean'],
        correct: 'Pacific Ocean'
    },
    {
        id: "classic-005",
        difficulty: "easy",
        question: 'Which animal is known as the king of the jungle?',
        answers: ['Lion', 'Tiger', 'Elephant', 'Gorilla'],
        correct: 'Lion'
    },
    {
        id: "classic-006",
        difficulty: "easy",
        question: 'What colour do you get by mixing red and white?',
        answers: ['Pink', 'Purple', 'Orange', 'Brown'],
        correct: 'Pink'
    },
    {
        id: "classic-007",
        difficulty: "easy",
        question: 'How many sides does a hexagon have?',
        answers: ['6', '5', '7', '8'],
        correct: '6'
    },
    {
        id: "classic-008",
        difficulty: "easy",
        question: 'Which country is famous for the pyramids at Giza?',
        answers: ['Egypt', 'Greece', 'Mexico', 'Turkey'],
        correct: 'Egypt'
    },
    {
        id: "classic-009",
        difficulty: "easy",
        question: 'What is the freezing point of water in Celsius?',
        answers: ['0°C', '10°C', '32°C', '-10°C'],
        correct: '0°C'
    },
    {
        id: "classic-010",
        difficulty: "easy",
        question: 'Which sport uses a bat, ball and wickets?',
        answers: ['Cricket', 'Baseball', 'Hockey', 'Rugby'],
        correct: 'Cricket'
    },
    {
        id: "classic-011",
        difficulty: "easy",
        question: 'What is the largest mammal?',
        answers: ['Blue whale', 'Elephant', 'Giraffe', 'Great white shark'],
        correct: 'Blue whale'
    },
    {
        id: "classic-012",
        difficulty: "easy",
        question: 'Which gas do humans need to breathe?',
        answers: ['Oxygen', 'Carbon dioxide', 'Hydrogen', 'Helium'],
        correct: 'Oxygen'
    },
    {
        id: "classic-013",
        difficulty: "easy",
        question: 'How many continents are there?',
        answers: ['7', '5', '6', '8'],
        correct: '7'
    },
    {
        id: "classic-014",
        difficulty: "easy",
        question: 'Which instrument has black and white keys?',
        answers: ['Piano', 'Violin', 'Trumpet', 'Flute'],
        correct: 'Piano'
    },
    {
        id: "classic-015",
        difficulty: "easy",
        question: 'What is the main ingredient in guacamole?',
        answers: ['Avocado', 'Cucumber', 'Pea', 'Spinach'],
        correct: 'Avocado'
    },
    {
        id: "classic-016",
        difficulty: "easy",
        question: 'Which Disney character is a wooden puppet?',
        answers: ['Pinocchio', 'Aladdin', 'Dumbo', 'Bambi'],
        correct: 'Pinocchio'
    },
    {
        id: "classic-017",
        difficulty: "easy",
        question: 'What is the tallest animal in the world?',
        answers: ['Giraffe', 'Elephant', 'Camel', 'Moose'],
        correct: 'Giraffe'
    },
    {
        id: "classic-018",
        difficulty: "easy",
        question: 'Which country gave the Statue of Liberty to the United States?',
        answers: ['France', 'Spain', 'Italy', 'Canada'],
        correct: 'France'
    },
    {
        id: "classic-019",
        difficulty: "easy",
        question: 'How many hours are in a day?',
        answers: ['24', '12', '18', '36'],
        correct: '24'
    },
    {
        id: "classic-020",
        difficulty: "easy",
        question: 'Which metal has the chemical symbol Au?',
        answers: ['Gold', 'Silver', 'Iron', 'Copper'],
        correct: 'Gold'
    },
    {
        id: "classic-021",
        difficulty: "easy",
        question: 'What is the name of the fairy in Peter Pan?',
        answers: ['Tinker Bell', 'Wendy', 'Tiger Lily', 'Cinderella'],
        correct: 'Tinker Bell'
    },
    {
        id: "classic-022",
        difficulty: "easy",
        question: 'Which ocean lies between Africa and Australia?',
        answers: ['Indian Ocean', 'Pacific Ocean', 'Atlantic Ocean', 'Arctic Ocean'],
        correct: 'Indian Ocean'
    },
    {
        id: "classic-023",
        difficulty: "easy",
        question: 'What is the largest planet in our solar system?',
        answers: ['Jupiter', 'Saturn', 'Earth', 'Neptune'],
        correct: 'Jupiter'
    },
    {
        id: "classic-024",
        difficulty: "easy",
        question: 'Which country is shaped roughly like a boot?',
        answers: ['Italy', 'Portugal', 'Greece', 'Croatia'],
        correct: 'Italy'
    },
    {
        id: "classic-025",
        difficulty: "easy",
        question: 'How many legs does a spider have?',
        answers: ['8', '6', '10', '12'],
        correct: '8'
    },
    {
        id: "classic-026",
        difficulty: "easy",
        question: 'What is the currency of the United Kingdom?',
        answers: ['Pound sterling', 'Euro', 'Dollar', 'Franc'],
        correct: 'Pound sterling'
    },
    {
        id: "classic-027",
        difficulty: "easy",
        question: 'Which famous wizard attends Hogwarts?',
        answers: ['Harry Potter', 'Percy Jackson', 'Frodo Baggins', 'Luke Skywalker'],
        correct: 'Harry Potter'
    },
    {
        id: "classic-028",
        difficulty: "easy",
        question: 'What is the opposite of nocturnal?',
        answers: ['Diurnal', 'Annual', 'Seasonal', 'Aquatic'],
        correct: 'Diurnal'
    },
    {
        id: "classic-029",
        difficulty: "easy",
        question: 'Which fruit is traditionally used to make cider?',
        answers: ['Apple', 'Pear', 'Grape', 'Plum'],
        correct: 'Apple'
    },
    {
        id: "classic-030",
        difficulty: "easy",
        question: 'What is H2O commonly known as?',
        answers: ['Water', 'Hydrogen', 'Oxygen', 'Salt'],
        correct: 'Water'
    },
    {
        id: "classic-031",
        difficulty: "easy",
        question: 'Which planet is closest to the Sun?',
        answers: ['Mercury', 'Venus', 'Earth', 'Mars'],
        correct: 'Mercury'
    },
    {
        id: "classic-032",
        difficulty: "easy",
        question: 'What is the capital of Japan?',
        answers: ['Tokyo', 'Kyoto', 'Osaka', 'Seoul'],
        correct: 'Tokyo'
    },
    {
        id: "classic-033",
        difficulty: "easy",
        question: 'Which bird is often associated with delivering messages?',
        answers: ['Pigeon', 'Swan', 'Eagle', 'Penguin'],
        correct: 'Pigeon'
    },
    {
        id: "classic-034",
        difficulty: "easy",
        question: 'How many players does a football team have on the pitch at one time?',
        answers: ['11', '9', '10', '12'],
        correct: '11'
    },
    {
        id: "classic-035",
        difficulty: "easy",
        question: 'Which vegetable is used to make traditional chips?',
        answers: ['Potato', 'Carrot', 'Parsnip', 'Turnip'],
        correct: 'Potato'
    },
    {
        id: "classic-036",
        difficulty: "easy",
        question: 'What is the hardest natural substance?',
        answers: ['Diamond', 'Granite', 'Quartz', 'Steel'],
        correct: 'Diamond'
    },
    {
        id: "classic-037",
        difficulty: "easy",
        question: 'Which famous bear loves marmalade sandwiches?',
        answers: ['Paddington Bear', 'Winnie-the-Pooh', 'Yogi Bear', 'Baloo'],
        correct: 'Paddington Bear'
    },
    {
        id: "classic-038",
        difficulty: "easy",
        question: 'What is the capital of Spain?',
        answers: ['Madrid', 'Barcelona', 'Seville', 'Valencia'],
        correct: 'Madrid'
    },
    {
        id: "classic-039",
        difficulty: "easy",
        question: 'Which sense organ is used for hearing?',
        answers: ['Ear', 'Eye', 'Nose', 'Tongue'],
        correct: 'Ear'
    },
    {
        id: "classic-040",
        difficulty: "easy",
        question: 'Which month comes immediately after September?',
        answers: ['October', 'August', 'November', 'December'],
        correct: 'October'
    },
    {
        id: "classic-041",
        difficulty: "easy",
        question: 'Which shape has three sides?',
        answers: ['Triangle', 'Square', 'Pentagon', 'Circle'],
        correct: 'Triangle'
    },
    {
        id: "classic-042",
        difficulty: "easy",
        question: 'Which planet do we live on?',
        answers: ['Earth', 'Mars', 'Venus', 'Jupiter'],
        correct: 'Earth'
    },
    {
        id: "classic-043",
        difficulty: "medium",
        question: 'Who painted the Mona Lisa?',
        answers: ['Leonardo da Vinci', 'Michelangelo', 'Raphael', 'Caravaggio'],
        correct: 'Leonardo da Vinci'
    },
    {
        id: "classic-044",
        difficulty: "medium",
        question: 'Which year did the Titanic sink?',
        answers: ['1912', '1905', '1918', '1923'],
        correct: '1912'
    },
    {
        id: "classic-045",
        difficulty: "medium",
        question: 'What is the chemical symbol for sodium?',
        answers: ['Na', 'So', 'Sd', 'Sn'],
        correct: 'Na'
    },
    {
        id: "classic-046",
        difficulty: "medium",
        question: 'Which country hosted the 2012 Summer Olympics?',
        answers: ['United Kingdom', 'China', 'Brazil', 'Australia'],
        correct: 'United Kingdom'
    },
    {
        id: "classic-047",
        difficulty: "medium",
        question: 'Who wrote Pride and Prejudice?',
        answers: ['Jane Austen', 'Emily Brontë', 'George Eliot', 'Mary Shelley'],
        correct: 'Jane Austen'
    },
    {
        id: "classic-048",
        difficulty: "medium",
        question: 'Which river runs through London?',
        answers: ['River Thames', 'River Mersey', 'River Severn', 'River Tyne'],
        correct: 'River Thames'
    },
    {
        id: "classic-049",
        difficulty: "medium",
        question: 'What is the smallest prime number?',
        answers: ['2', '1', '3', '0'],
        correct: '2'
    },
    {
        id: "classic-050",
        difficulty: "medium",
        question: 'Which planet has the most prominent ring system?',
        answers: ['Saturn', 'Uranus', 'Neptune', 'Jupiter'],
        correct: 'Saturn'
    },
    {
        id: "classic-051",
        difficulty: "medium",
        question: 'Who was the first person to walk on the Moon?',
        answers: ['Neil Armstrong', 'Buzz Aldrin', 'Yuri Gagarin', 'Michael Collins'],
        correct: 'Neil Armstrong'
    },
    {
        id: "classic-052",
        difficulty: "medium",
        question: 'Which element has atomic number 26?',
        answers: ['Iron', 'Copper', 'Zinc', 'Nickel'],
        correct: 'Iron'
    },
    {
        id: "classic-053",
        difficulty: "medium",
        question: 'What is the longest river in South America?',
        answers: ['Amazon River', 'Paraná River', 'Orinoco River', 'São Francisco River'],
        correct: 'Amazon River'
    },
    {
        id: "classic-054",
        difficulty: "medium",
        question: 'Which Shakespeare play features Rosencrantz and Guildenstern?',
        answers: ['Hamlet', 'Macbeth', 'Othello', 'King Lear'],
        correct: 'Hamlet'
    },
    {
        id: "classic-055",
        difficulty: "medium",
        question: 'What is the capital of Canada?',
        answers: ['Ottawa', 'Toronto', 'Vancouver', 'Montreal'],
        correct: 'Ottawa'
    },
    {
        id: "classic-056",
        difficulty: "medium",
        question: 'Which artist released the album Back to Black?',
        answers: ['Amy Winehouse', 'Adele', 'Duffy', 'Lily Allen'],
        correct: 'Amy Winehouse'
    },
    {
        id: "classic-057",
        difficulty: "medium",
        question: 'What is the largest desert in the world by area?',
        answers: ['Antarctic Desert', 'Sahara', 'Gobi', 'Arabian Desert'],
        correct: 'Antarctic Desert'
    },
    {
        id: "classic-058",
        difficulty: "medium",
        question: 'Which blood type is known as the universal red-cell donor?',
        answers: ['O negative', 'AB positive', 'A positive', 'B negative'],
        correct: 'O negative'
    },
    {
        id: "classic-059",
        difficulty: "medium",
        question: "What is the name of Sherlock Holmes's brother?",
        answers: ['Mycroft Holmes', 'Moriarty Holmes', 'Gregory Holmes', 'Albert Holmes'],
        correct: 'Mycroft Holmes'
    },
    {
        id: "classic-060",
        difficulty: "medium",
        question: 'Which country is home to the ancient city of Petra?',
        answers: ['Jordan', 'Lebanon', 'Syria', 'Egypt'],
        correct: 'Jordan'
    },
    {
        id: "classic-061",
        difficulty: "medium",
        question: 'Who composed The Four Seasons?',
        answers: ['Antonio Vivaldi', 'Johann Bach', 'Mozart', 'Handel'],
        correct: 'Antonio Vivaldi'
    },
    {
        id: "classic-062",
        difficulty: "medium",
        question: 'What is the capital of New Zealand?',
        answers: ['Wellington', 'Auckland', 'Christchurch', 'Hamilton'],
        correct: 'Wellington'
    },
    {
        id: "classic-063",
        difficulty: "medium",
        question: "Which gas makes up most of Earth's atmosphere?",
        answers: ['Nitrogen', 'Oxygen', 'Carbon dioxide', 'Argon'],
        correct: 'Nitrogen'
    },
    {
        id: "classic-064",
        difficulty: "medium",
        question: 'Which film won the Best Picture Oscar for 1994?',
        answers: ['Forrest Gump', 'Pulp Fiction', 'The Shawshank Redemption', 'Four Weddings and a Funeral'],
        correct: 'Forrest Gump'
    },
    {
        id: "classic-065",
        difficulty: "medium",
        question: 'What is the square root of 144?',
        answers: ['12', '10', '14', '16'],
        correct: '12'
    },
    {
        id: "classic-066",
        difficulty: "medium",
        question: 'Which sea separates Europe and Africa?',
        answers: ['Mediterranean Sea', 'Baltic Sea', 'Black Sea', 'North Sea'],
        correct: 'Mediterranean Sea'
    },
    {
        id: "classic-067",
        difficulty: "medium",
        question: 'Who wrote The Hobbit?',
        answers: ['J. R. R. Tolkien', 'C. S. Lewis', 'George R. R. Martin', 'Philip Pullman'],
        correct: 'J. R. R. Tolkien'
    },
    {
        id: "classic-068",
        difficulty: "medium",
        question: 'Which country uses the yen?',
        answers: ['Japan', 'China', 'South Korea', 'Thailand'],
        correct: 'Japan'
    },
    {
        id: "classic-069",
        difficulty: "medium",
        question: 'What is the largest internal organ in the human body?',
        answers: ['Liver', 'Heart', 'Lung', 'Kidney'],
        correct: 'Liver'
    },
    {
        id: "classic-070",
        difficulty: "medium",
        question: 'Which composer wrote Für Elise?',
        answers: ['Ludwig van Beethoven', 'Mozart', 'Chopin', 'Brahms'],
        correct: 'Ludwig van Beethoven'
    },
    {
        id: "classic-071",
        difficulty: "medium",
        question: 'Which city is known as the Eternal City?',
        answers: ['Rome', 'Athens', 'Paris', 'Venice'],
        correct: 'Rome'
    },
    {
        id: "classic-072",
        difficulty: "medium",
        question: 'What is the study of earthquakes called?',
        answers: ['Seismology', 'Geology', 'Meteorology', 'Volcanology'],
        correct: 'Seismology'
    },
    {
        id: "classic-073",
        difficulty: "medium",
        question: 'Which British monarch reigned during most of the 19th century?',
        answers: ['Queen Victoria', 'Queen Elizabeth I', 'King George III', 'King Edward VII'],
        correct: 'Queen Victoria'
    },
    {
        id: "classic-074",
        difficulty: "medium",
        question: 'What is the capital of Iceland?',
        answers: ['Reykjavik', 'Oslo', 'Helsinki', 'Copenhagen'],
        correct: 'Reykjavik'
    },
    {
        id: "classic-075",
        difficulty: "medium",
        question: 'Which metal is liquid at room temperature?',
        answers: ['Mercury', 'Lead', 'Tin', 'Aluminium'],
        correct: 'Mercury'
    },
    {
        id: "classic-076",
        difficulty: "medium",
        question: 'Who directed Jurassic Park?',
        answers: ['Steven Spielberg', 'James Cameron', 'George Lucas', 'Ridley Scott'],
        correct: 'Steven Spielberg'
    },
    {
        id: "classic-077",
        difficulty: "medium",
        question: 'Which country has the maple leaf on its flag?',
        answers: ['Canada', 'Australia', 'New Zealand', 'Ireland'],
        correct: 'Canada'
    },
    {
        id: "classic-078",
        difficulty: "medium",
        question: 'What is the largest moon of Saturn?',
        answers: ['Titan', 'Europa', 'Ganymede', 'Triton'],
        correct: 'Titan'
    },
    {
        id: "classic-079",
        difficulty: "medium",
        question: 'Which novel begins with the line about being born with a caul?',
        answers: ['David Copperfield', 'Oliver Twist', 'Great Expectations', 'Bleak House'],
        correct: 'David Copperfield'
    },
    {
        id: "classic-080",
        difficulty: "medium",
        question: 'What is the capital of Morocco?',
        answers: ['Rabat', 'Casablanca', 'Marrakesh', 'Fez'],
        correct: 'Rabat'
    },
    {
        id: "classic-081",
        difficulty: "medium",
        question: 'Which vitamin is produced in the skin in response to sunlight?',
        answers: ['Vitamin D', 'Vitamin C', 'Vitamin B12', 'Vitamin K'],
        correct: 'Vitamin D'
    },
    {
        id: "classic-082",
        difficulty: "medium",
        question: 'Which scientist is associated with the discovery of penicillin?',
        answers: ['Alexander Fleming', 'Louis Pasteur', 'Joseph Lister', 'Edward Jenner'],
        correct: 'Alexander Fleming'
    },
    {
        id: "classic-083",
        difficulty: "medium",
        question: 'Which country is home to Mount Fuji?',
        answers: ['Japan', 'China', 'South Korea', 'Indonesia'],
        correct: 'Japan'
    },
    {
        id: "classic-084",
        difficulty: "medium",
        question: 'What is the Roman numeral for 50?',
        answers: ['L', 'C', 'X', 'D'],
        correct: 'L'
    },
    {
        id: "classic-085",
        difficulty: "hard",
        question: 'Which treaty formally ended the First World War between Germany and the Allied Powers?',
        answers: ['Treaty of Versailles', 'Treaty of Utrecht', 'Treaty of Tordesillas', 'Treaty of Paris'],
        correct: 'Treaty of Versailles'
    },
    {
        id: "classic-086",
        difficulty: "hard",
        question: 'What is the SI unit of electric resistance?',
        answers: ['Ohm', 'Volt', 'Watt', 'Ampere'],
        correct: 'Ohm'
    },
    {
        id: "classic-087",
        difficulty: "hard",
        question: 'Who wrote One Hundred Years of Solitude?',
        answers: ['Gabriel García Márquez', 'Pablo Neruda', 'Jorge Luis Borges', 'Mario Vargas Llosa'],
        correct: 'Gabriel García Márquez'
    },
    {
        id: "classic-088",
        difficulty: "hard",
        question: 'Which mathematician proved the incompleteness theorems?',
        answers: ['Kurt Gödel', 'Alan Turing', 'David Hilbert', 'John von Neumann'],
        correct: 'Kurt Gödel'
    },
    {
        id: "classic-089",
        difficulty: "hard",
        question: "What is the deepest known point in Earth's oceans?",
        answers: ['Challenger Deep', 'Tonga Trench', 'Java Trench', 'Puerto Rico Trench'],
        correct: 'Challenger Deep'
    },
    {
        id: "classic-090",
        difficulty: "hard",
        question: 'Which empire was ruled by Mansa Musa?',
        answers: ['Mali Empire', 'Songhai Empire', 'Ghana Empire', 'Ottoman Empire'],
        correct: 'Mali Empire'
    },
    {
        id: "classic-091",
        difficulty: "hard",
        question: 'What is the capital of Bhutan?',
        answers: ['Thimphu', 'Kathmandu', 'Lhasa', 'Paro'],
        correct: 'Thimphu'
    },
    {
        id: "classic-092",
        difficulty: "hard",
        question: 'Which element has the chemical symbol W?',
        answers: ['Tungsten', 'Tin', 'Titanium', 'Tantalum'],
        correct: 'Tungsten'
    },
    {
        id: "classic-093",
        difficulty: "hard",
        question: 'Who composed The Planets?',
        answers: ['Gustav Holst', 'Ralph Vaughan Williams', 'Edward Elgar', 'Claude Debussy'],
        correct: 'Gustav Holst'
    },
    {
        id: "classic-094",
        difficulty: "hard",
        question: 'Which philosopher wrote Critique of Pure Reason?',
        answers: ['Immanuel Kant', 'Georg Hegel', 'Friedrich Nietzsche', 'Arthur Schopenhauer'],
        correct: 'Immanuel Kant'
    },
    {
        id: "classic-095",
        difficulty: "hard",
        question: 'What is the largest artery in the human body?',
        answers: ['Aorta', 'Pulmonary artery', 'Carotid artery', 'Femoral artery'],
        correct: 'Aorta'
    },
    {
        id: "classic-096",
        difficulty: "hard",
        question: 'Which ancient civilization developed cuneiform writing?',
        answers: ['Sumerians', 'Phoenicians', 'Minoans', 'Hittites'],
        correct: 'Sumerians'
    },
    {
        id: "classic-097",
        difficulty: "hard",
        question: 'What is the approximate speed of light in a vacuum?',
        answers: ['300,000 km/s', '30,000 km/s', '3,000 km/s', '3,000,000 km/s'],
        correct: '300,000 km/s'
    },
    {
        id: "classic-098",
        difficulty: "hard",
        question: 'Which battle in 1066 marked the Norman conquest of England?',
        answers: ['Battle of Hastings', 'Battle of Stamford Bridge', 'Battle of Agincourt', 'Battle of Bosworth Field'],
        correct: 'Battle of Hastings'
    },
    {
        id: "classic-099",
        difficulty: "hard",
        question: 'Who painted The Persistence of Memory?',
        answers: ['Salvador Dalí', 'Joan Miró', 'Pablo Picasso', 'René Magritte'],
        correct: 'Salvador Dalí'
    },
    {
        id: "classic-100",
        difficulty: "hard",
        question: 'Which moon is famous for its subsurface ocean and geysers?',
        answers: ['Enceladus', 'Io', 'Callisto', 'Titan'],
        correct: 'Enceladus'
    },
    {
        id: "classic-101",
        difficulty: "hard",
        question: 'What is the capital of Kazakhstan?',
        answers: ['Astana', 'Almaty', 'Bishkek', 'Tashkent'],
        correct: 'Astana'
    },
    {
        id: "classic-102",
        difficulty: "hard",
        question: 'Which novel features the character Sethe?',
        answers: ['Beloved', 'Invisible Man', 'Their Eyes Were Watching God', 'The Color Purple'],
        correct: 'Beloved'
    },
    {
        id: "classic-103",
        difficulty: "hard",
        question: 'What is the name of the boundary around a black hole beyond which light cannot escape?',
        answers: ['Event horizon', 'Photon sphere', 'Accretion disk', 'Singularity'],
        correct: 'Event horizon'
    },
    {
        id: "classic-104",
        difficulty: "hard",
        question: 'Which scientist formulated the uncertainty principle?',
        answers: ['Werner Heisenberg', 'Erwin Schrödinger', 'Max Planck', 'Niels Bohr'],
        correct: 'Werner Heisenberg'
    },
    {
        id: "classic-105",
        difficulty: "hard",
        question: 'Which language has the most native speakers worldwide?',
        answers: ['Mandarin Chinese', 'Spanish', 'English', 'Hindi'],
        correct: 'Mandarin Chinese'
    },
    {
        id: "classic-106",
        difficulty: "hard",
        question: 'What is the smallest bone in the human body?',
        answers: ['Stapes', 'Malleus', 'Incus', 'Hyoid'],
        correct: 'Stapes'
    },
    {
        id: "classic-107",
        difficulty: "hard",
        question: 'Which Roman emperor issued the Edict of Milan with Licinius?',
        answers: ['Constantine the Great', 'Augustus', 'Nero', 'Hadrian'],
        correct: 'Constantine the Great'
    },
    {
        id: "classic-108",
        difficulty: "hard",
        question: 'Which country contains the region of Transylvania?',
        answers: ['Romania', 'Hungary', 'Serbia', 'Bulgaria'],
        correct: 'Romania'
    },
    {
        id: "classic-109",
        difficulty: "hard",
        question: 'Who wrote The Waste Land?',
        answers: ['T. S. Eliot', 'W. B. Yeats', 'Ezra Pound', 'James Joyce'],
        correct: 'T. S. Eliot'
    },
    {
        id: "classic-110",
        difficulty: "hard",
        question: 'What is the name of the process by which plants lose water vapour through leaves?',
        answers: ['Transpiration', 'Respiration', 'Osmosis', 'Translocation'],
        correct: 'Transpiration'
    },
    {
        id: "classic-111",
        difficulty: "hard",
        question: 'Which physicist developed the equations describing electromagnetism in classical form?',
        answers: ['James Clerk Maxwell', 'Michael Faraday', 'André-Marie Ampère', 'Heinrich Hertz'],
        correct: 'James Clerk Maxwell'
    },
    {
        id: "classic-112",
        difficulty: "hard",
        question: 'Which city was formerly known as Constantinople?',
        answers: ['Istanbul', 'Athens', 'Alexandria', 'Antioch'],
        correct: 'Istanbul'
    },
    {
        id: "classic-113",
        difficulty: "hard",
        question: 'What is the capital of Suriname?',
        answers: ['Paramaribo', 'Georgetown', 'Cayenne', 'Belmopan'],
        correct: 'Paramaribo'
    },
    {
        id: "classic-114",
        difficulty: "hard",
        question: 'Which composer wrote the opera The Magic Flute?',
        answers: ['Wolfgang Amadeus Mozart', 'Giuseppe Verdi', 'Richard Wagner', 'Gioachino Rossini'],
        correct: 'Wolfgang Amadeus Mozart'
    },
    {
        id: "classic-115",
        difficulty: "hard",
        question: 'Which Greek epic poem is attributed to Homer and centres on Achilles?',
        answers: ['Iliad', 'Odyssey', 'Aeneid', 'Argonautica'],
        correct: 'Iliad'
    },
    {
        id: "classic-116",
        difficulty: "hard",
        question: 'What is the term for animals active mainly at dawn and dusk?',
        answers: ['Crepuscular', 'Nocturnal', 'Diurnal', 'Cathemeral'],
        correct: 'Crepuscular'
    },
    {
        id: "classic-117",
        difficulty: "hard",
        question: 'Which 17th-century scientist coined the term cell after observing cork?',
        answers: ['Robert Hooke', 'Antonie van Leeuwenhoek', 'Robert Boyle', 'William Harvey'],
        correct: 'Robert Hooke'
    },
    {
        id: "classic-118",
        difficulty: "hard",
        question: 'Which country was formerly known as Abyssinia?',
        answers: ['Ethiopia', 'Eritrea', 'Sudan', 'Somalia'],
        correct: 'Ethiopia'
    },
    {
        id: "classic-119",
        difficulty: "hard",
        question: 'What is the chemical formula for sulfuric acid?',
        answers: ['H₂SO₄', 'HCl', 'HNO₃', 'H₂CO₃'],
        correct: 'H₂SO₄'
    },
    {
        id: "classic-120",
        difficulty: "hard",
        question: 'Which art movement is associated with Monet and Renoir?',
        answers: ['Impressionism', 'Cubism', 'Surrealism', 'Expressionism'],
        correct: 'Impressionism'
    },
    {
        id: "classic-121",
        difficulty: "hard",
        question: 'Which medieval document limited the power of the English king in 1215?',
        answers: ['Magna Carta', 'Domesday Book', 'Bill of Rights', 'Petition of Right'],
        correct: 'Magna Carta'
    },
    {
        id: "classic-122",
        difficulty: "hard",
        question: 'Who was the first woman to win a Nobel Prize?',
        answers: ['Marie Curie', 'Dorothy Hodgkin', 'Rosalind Franklin', 'Ada Yonath'],
        correct: 'Marie Curie'
    },
    {
        id: "classic-123",
        difficulty: "hard",
        question: 'What is the largest of the four Galilean moons of Jupiter?',
        answers: ['Ganymede', 'Io', 'Europa', 'Callisto'],
        correct: 'Ganymede'
    }
];

function getQuestionsForDifficulty(difficulty) {
    return QUESTIONS.filter(question => question.difficulty === difficulty);
}

function getRandomQuestion(difficulty) {
    const available = getQuestionsForDifficulty(difficulty);
    if (!available.length) return null;
    return available[Math.floor(Math.random() * available.length)];
}
