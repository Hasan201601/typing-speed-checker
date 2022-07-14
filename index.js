const sentences = [
  "Joe waited for the train, but the train was late.",
  "I looked for Mary and Samantha at the bus station, but they arrived at the station before noon and left on the bus before I arrived.",
  "Mary and Samantha arrived at the bus station before noon, and they left on the bus before I arrived.",
  "Mary and Samantha left on the bus before I arrived, so I did not see them at the bus station.",
  "Because Mary and Samantha arrived at the bus station before noon, I did not see them at the station.",
  "While he waited at the train station, Joe realized that the train was late.",
  "After they left on the bus, Mary and Samantha realized that Joe was waiting at the train station.",
];

const message = document.getElementById("message");
const editor = document.getElementById("editor");
const btn = document.getElementById("btn");

let startTime, endTime;

const playGame = () => {
  let randomNumber = Math.floor(Math.random() * sentences.length);
  message.innerText = sentences[randomNumber];
  let date = new Date();
  startTime = date.getTime();
  btn.innerText = "Done";
};

const endGame = () => {
  let date = new Date();
  endTime = date.getTime();

  const totalTime = (endTime - startTime) / 1000;
  const minute = 60;

  let userInput = editor.value;
  let wordCount = wordCounter(userInput);
  let speed = Math.round((wordCount / totalTime) * minute);

  let result = `You have typed ${speed} words per minute.`;
  result += compareWords(userInput, message.innerText);
  message.innerHTML = result;
};

const compareWords = (userInput, message) => {
  const wordsTyped = userInput.split(" ");
  const messageWords = message.split(" ");
  let count = 0;
  for (let i = 0; i < wordsTyped.length; i++) {
    if (wordsTyped[i] === messageWords[i]) {
      count++;
    }
  }

  let errorWords = messageWords.length - count;
  let score = `${count} words out of ${messageWords.length} are correctly typed words and ${errorWords} are <span style="color: red">error</span> words`;

  return score;
};

const wordCounter = function (str) {
  const words = str.split(" ");
  return words.length;
};

btn.addEventListener("click", function () {
  if (this.innerText == "Start") {
    editor.disabled = false;
    editor.value = "";
    playGame();
  } else if (this.innerText == "Done") {
    editor.disabled = true;
    btn.innerText = "Start";
    endGame();
  }
});
