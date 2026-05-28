// A little interactivity for the page.
const messages = [
  "You clicked the button! 🎉",
  "Nice — you're getting the hang of this.",
  "JavaScript is fun, right?",
  "Keep going, you're a developer now! 🚀",
];

let count = 0;

const button = document.getElementById("cta");
const message = document.getElementById("message");

button.addEventListener("click", () => {
  message.textContent = messages[count % messages.length];
  count++;
});
