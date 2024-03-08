const ClickElement = document.getElementById('number');
let n = 0;
ClickElement.textContent = `you clicked the button ${n} times`;

function add() {
   n += 1;
   ClickElement.textContent = `you clicked the button ${n} times`;
}
