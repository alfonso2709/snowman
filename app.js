// ADD YOUR ARRAY OF WORDS HERE
var words = ["BLIZZARD", "FROSTYFLAKES", "HOLIDAY", "SNOWMAN", "HOMEALONE", "RUDOLPH", "CHRISTMAS", "CAROLING", "BLACKFRIDAY", "WINTERFEST",];

var snowmanParts = [".hat", ".face", ".scarf", ".hands", ".body-top", ".body-middle", ".body-bottom"];
var randomWord = getRandomWord(words);
var keyboardContainer = document.querySelector('#keyboard-container');
keyboardContainer.addEventListener("click", handleKeyboardClick);

generateHiddenWord(randomWord);

function handleKeyboardClick(event){
  var clickedElement = event.target;

  if (!clickedElement.classList.contains("letter") || clickedElement.classList.contains("selected")) return;

  clickedElement.classList.add("selected");
  
  var clickedLetter = clickedElement.textContent;
  var hasMatch = checkForMatch(clickedLetter);

  if (!hasMatch) {
    // What function do we call??
    removeSnowmanPart();
    checkForLoser();
  } else {
    // What function do we call??
    checkForWinner();
  }
}

function checkForMatch(clickedLetter) {
 var hiddenLetterElements = document.querySelectorAll(".hidden");
 var hasMatch = false;
 
 hiddenLetterElements.forEach(hiddenLetterElement => {
  var hiddenLetter = hiddenLetterElement.textContent;
  // console.log(hiddenLetter, clickedLetter)
    if (hiddenLetter === clickedLetter) {
      hiddenLetterElement.classList.remove("hidden");
      hasMatch = true;
    }
  
 })
 return hasMatch;
}

function removeSnowmanPart() {
  var snowmanPart = snowmanParts.shift();
  var partsToRemove = document.querySelectorAll(snowmanPart);
  
  partsToRemove.forEach(partToRemove =>{
    partToRemove.remove();

  })
}


function generateHiddenWord(word) {
  var letters = word.split("");
  var emptyLetterContainer = document.querySelector("#empty-letter-container");

  var lettersHTML = "";
  for (var letter of letters) {
    var letterHTML = `<p class="letter-container"><span class="letter hidden">${letter}</span></p>`;
    lettersHTML += letterHTML;
  }

  emptyLetterContainer.innerHTML = lettersHTML;
}

function getRandomWord(words) {
  var randomIndex = Math.floor(Math.random() * words.length);
  var randomWord = words[randomIndex];
  return randomWord;
}

// CHECK FOR LOSER FUNCTION HERE
function checkForLoser() {
    if (snowmanParts.length === 0) {
        var snowmanContainer = document.querySelector("#snowman-container");
        snowmanContainer.innerHTML = "<h2>You lost, your trash bro!</h2>";
        keyboardContainer.innerHTML = "<h2>Better luck next time, The word was: " + randomWord + "</h2>";
    }
};

// CHECK FOR WINNER FUNCTION HERE
function checkForWinner() {
    var hiddenLetterElements = document.querySelectorAll(".hidden");

    if (hiddenLetterElements.length === 0) {
        keyboardContainer.innerHTML = "<h2>YOU WIN! Nice Job bro</h2>";
    }
};