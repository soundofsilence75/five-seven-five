const MOCK_VERSES = 
{
    edges: 
    [
        {
            id: "111",
            text: "petals fall slowly",
            author: "haikudude1",
            date: 14700000123
        },
        {
            id: "112",
            text: "becoming much more",
            author: "haikudude12",
            date: 14700000123
        },
        {
            id: "113",
            text: "and crying we go",
            author: "haikudude13434",
            date: 14700000123
        },
        {
            id: "117",
            text: "let's be together",
            author: "haikudude123423423",
            date: 14700000123
        },
        {
            id: "118",
            text: "you smell like dandruff",
            author: "haikudude112313",
            date: 14700000123
        },
        {
            id: "119",
            text: "I hear your teardrops",
            author: "haikudude144314",
            date: 14700000123
        }
    ],
    
    centers:
    [
       {
            id: "114",
            text: "nothing matters more or less",
            author: "haikudude1434343",
            date: 14700000123
        },
        {
            id: "115",
            text: "you need seven syllables",
            author: "haikudude11111",
            date: 14700000123
        },
        {
            id: "116",
            text: "haikus are so confusing",
            author: "haikudude1231241",
            date: 14700000123
        } 
    ],
};

const App = {
    haikus: [],
    
    reset: function() {
        // this.seedData(this.haikus);
    },

    getRecentHaikus: function() {
        setTimeout(() => { callbackFn(MOCK_VERSES)}, 1000);
    },

    createHaiku: function(parts) {
        let newHaiku = {
            beginning: parts[0],
            middle: parts[1],
            ending: parts[2]
        };

        this.haikus.push(newHaiku);
        // HTMLRenderer.displayNewHaiku(newHaiku);
        return newHaiku;
    },

    getRandomVerse: function(data) {
        let randomVerse;

        randomVerse = data[Math.floor(Math.random() * data.length)];
        return randomVerse;
    },

    createVerse: function(verse) {        
        let newVerse = {
            id: 190880,
            text: verse,
            author: "newAuthor",
            date: 190909
        };
        
        // TODO - validate this is a valid verse
        // this.insertVerse(newVerse);
        return newVerse;
    },

    insertVerse: function(newVerse) {
        console.log("insertVerse" + newVerse.text);
        
        const {edges, centers} = MOCK_VERSES;
        let partsToInsert = [this.getRandomVerse(edges), this.getRandomVerse(centers), this.getRandomVerse(edges)];

        // choose a list randomly
        let lines = [edges, centers];
        let randomIndex = Math.floor(Math.random() * lines.length);
        let randomLine = lines[randomIndex];

        // put our verse into that list
        randomLine.push(newVerse);

        // replace the appropriate part with our new verse
        for (let i = 0; i < partsToInsert.length; i++) {
            if (i === randomIndex) {
                partsToInsert[i] = newVerse;
            }
        }
        // create a new haiku with our verse and two other verses

        return [partsToInsert[0], partsToInsert[1], partsToInsert[2]];
    },

    seedData: function(data) {
        const seedCount = 3;

        for (let i = 0; i < seedCount; i++) {
            this.createHaiku([this.getRandomVerse(MOCK_VERSES.edges), this.getRandomVerse(MOCK_VERSES.centers), this.getRandomVerse(MOCK_VERSES.edges)]);
        }

        HTMLRenderer.displayHaikus(this.haikus);
    }
};

const HTMLRenderer = {
    displayHaikus: function(data) {
        $(".haikus").empty();
        data.forEach((item, index) => {
            $(".haikus").append(`
                <div class="haiku">
                    <p>${item.beginning.text}</p>
                    <p>${item.middle.text}</p>
                    <p>${item.ending.text}</p>
                </div>
            `);
        });
    },

    displayNewHaiku: function(haiku) {
        $(".haikus").append(`
                <div class="haiku">
                    <p>${haiku.beginning.text}</p>
                    <p>${haiku.middle.text}</p>
                    <p>${haiku.ending.text}</p>
                </div>
        `);
    }
};

const EventListeners = {
    handleHaikuFormSubmit: function() {
        $(".verse-form").on("submit", function(event) {
            event.preventDefault();
            let newVerse = $(".verse__textbox").val();
            
            // App.createVerse(newVerse);
            HTMLRenderer.displayNewHaiku(App.createHaiku(App.insertVerse(App.createVerse(newVerse))));
            $(".verse__textbox").val("");
        });
    },

    handleHaikuClear: function() {
        $(".verse__clear").click(function() {
            $(".haikus").empty();
        });
    }
};

EventListeners.handleHaikuFormSubmit();
EventListeners.handleHaikuClear();

$(App.reset());