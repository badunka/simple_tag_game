const body = document.querySelector('body');

const information = document.createElement('div');
information.classList.add('info');
body.append(information);

const time = document.createElement('time');
information.append(time);

const container = document.createElement('div');
container.classList.add('container');
body.append(container);

const clickBlock = document.createElement('div');
clickBlock.classList.add('clickBlock');
information.append(clickBlock);

let sec = 0;
let min = 0;
let click = 0;

const cellSize = 100;
const empty = {
	value: 0,
	top: 0,
	left: 0
};
const cells = [];
cells.push(empty);

function motion(index) {
	const cell = cells[index];
	const leftDiff = Math.abs(empty.left - cell.left);
	const topDiff = Math.abs(empty.top - cell.top);

	if (leftDiff + topDiff > 1){
		return;
	}
	
	cell.element.style.top = `${empty.top * cellSize}px`;
	cell.element.style.left = `${empty.left * cellSize}px`;

	const emptyLeft = empty.left;
	const emptyTop = empty.top;
	empty.left = cell.left;
	empty.top = cell.top;
	cell.left = emptyLeft;
	cell.top = emptyTop;

	click++;
	showclick();

	const final = cells.every(cell => {
		if (cell.value === 0) {
            return true;
        } else {
		console.log(cell.value, cell.top, cell.left)
		return cell.value - 1 === cell.top * 4 + cell.left;
		}
	})
	
	if (final) {
		alert("You won")
	}
}

const numbers = [...Array(15).keys()]
.sort(() => Math.random() - 0.5);

for (let i = 1; i <= 15; i++) {
	const cell = document.createElement('div');
	cell.className = 'cell';
	const value = numbers[i -1] + 1;
	cell.innerText = value;


	const left = i % 4;
	const top = (i - left) / 4;

	cells.push({
		left: left,
		top: top,
		element: cell,
		value: value
	});


	cell.style.left = `${left * cellSize}%`;
	cell.style.top = `${top * cellSize}%`;
	container.append(cell);

cell.addEventListener('click',() => {
	motion(i)
	
})
}

function showclick() {
    clickBlock.innerHTML = `Количество ходов: ${click}`;
}

function showTime() {
    setTime();
	setTimeout(showTime, 1000);
	sec++
}

function setTime() {
    if (sec === 60) {
        sec = 0;
        min++;
    }

    time.innerHTML = `Время игры: ${addZero(min)}<span>:</span>${addZero(sec)}      `;

	function addZero(n) {
		return (parseInt(n, 10) < 10 ? '0' : '') + n;
	}
}
window.addEventListener('load', () => {
setTime();
showTime()
showclick();
})