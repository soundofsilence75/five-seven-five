const App = {
  fridges: [],
  activeFridge: {},

  registerUser: function(username, password) {
    $.ajax({
      method: "POST",
      url: "http://localhost:8080/api/auth/register",
      contentType: "application/json",
      data: JSON.stringify({ username: username, password: password })
    })
      .done(function (result) {
        console.log(result);
        HTMLRenderer.showSection(".form--login");
      })
      .fail(function () {
        // HTMLRenderer.showErr();
      });
  },

  loginUser: function(username, password) {
    console.log(`${username} ${password}`);
    $.ajax({
      method: "POST",
      url: "http://localhost:8080/api/auth/login",
      contentType: "application/json",
      data: JSON.stringify({ username: username, password: password })
    })
      .done(function (result) {
        const {authToken} = result;
        localStorage.setItem("token", authToken);
        HTMLRenderer.showSection(".fridge");
        // const authToken = localStorage.getItem("token");
      })
      .fail(function () {
        // HTMLRenderer.showErr();
      });
  },

  getFridges: function() {
    $.ajax({
      method: "GET",
      url: "http://localhost:8080/fridges",
      contentType: "application/json"
    })
      .done(function (result) {
        App.populateFridges(result);
      })
      .fail(function () {
        // HTMLRenderer.showErr();
      });
  },

  addFridge: function(wordBank, poem) {
    const token = localStorage.getItem("token");
    
    $.ajax({
      method: "POST",
      url: "http://localhost:8080/fridges",
      contentType: "application/json",
      data: JSON.stringify({ wordBank: wordBank, poem: poem }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .done(function (result) {
      })
      .fail(function () {
        // HTMLRenderer.showErr();
      });
  },

  reset: function() {
    this.getFridges();
  },

  getRandomFridge: function() {
    let randomFridge = this.fridges[Math.floor(Math.random() * this.fridges.length)];

    return randomFridge;
  },

  saveFridge: function(wordbank, poem) {
    let newFridge = {
      wordBank: wordbank,
      poem: poem,
      authors: ["newguy123"]
    };
    
    this.fridges.push(newFridge);
    return newFridge;
  },

  getRandomWords: function(words, count) {
    let randomWords = [];

    for (let partOfSpeech in WORD_BANK) {
      for (let i = 0; i < count; i++) {
        let wordToAdd = WORD_BANK[partOfSpeech][Math.floor(Math.random() * WORD_BANK[partOfSpeech].length)];
        randomWords.push(wordToAdd);
      }
    }
    return randomWords;
  },

  populateFridges(data) {
    App.fridges = [];
    data.forEach((item, index) => {
      App.fridges.push(item);
    });
    // TODO - clean this up
    EventListeners.startListeners();
    HTMLRenderer.displayFridge(this.getRandomFridge());
  }
};

$(App.reset());