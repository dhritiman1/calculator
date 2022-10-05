const displayResult = document.querySelector('.result');
const displayCurrNo = document.querySelector('.current-number');
const clear = document.querySelector('.clear');
const del = document.querySelector('.delete');
const pointBtn = document.querySelector('.button-no.point');

let a = '';
let b = '';
let number = '';
let result = '';
let currOperator = '';

const buttons = document.querySelectorAll('.button-no');
buttons.forEach((button) => {
    button.addEventListener('click', function (e) {
        if (number.includes('.')) {
            if (button.id === '.') {
                displayResult.textContent += '';
                displayCurrNo.textContent += '';
                number += ''
            } else {
                displayResult.textContent += button.id;
                displayCurrNo.textContent += button.id;
                number += button.id;
            }
        } else {
            displayResult.textContent += button.id;
            displayCurrNo.textContent += button.id;
            number += button.id;
        }
    });
});

const operators = document.querySelectorAll('.operator');
operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        let displayResultTextContent = displayResult.textContent;
        if (displayResultTextContent.includes('+') ||
            displayResultTextContent.includes('*') ||
            displayResultTextContent.includes('/')
        ) {
            displayResult.textContent += '';
        } else {
            displayResult.textContent += operator.id;
        }

        displayCurrNo.textContent = '';
        if (result != '') {
            a = result;
            b = '';
        }
        if (a != '' && b == '') {
            b = number;
        } else if (a == '' && b != '') {
            a = number;
        } else {
            a = number;
        }

        number = '';

        if (a != '' && b != '') {
            calculate(a, currOperator, b);
            displayResult.textContent += operator.id;
        }
        currOperator = operator.id;
    });
});

function calculate(a, currOperator, b) {
    a = Number(a);
    b = Number(b);

    if (currOperator === '+') {
        result = a + b;
    }
    else if (currOperator === '-') {
        result = a - b;
    }
    else if (currOperator === '*') {
        result = a * b;
    }
    else if (currOperator === '/') {
        result = a / b;
    } else {
        displayCurrNo.textContent = '';
        a = '';
        b = '';
        number = '';
    }
    displayResult.textContent = (Math.round(result * 10000000)) / 10000000;
}

clear.addEventListener('click', clearAll);
function clearAll(e) {
    displayCurrNo.textContent = '';
    displayResult.textContent = '';
    number = '';
    result = '';
    currOperator = '';
    a = '';
    b = '';
}

del.addEventListener('click', backspace);
function backspace(e) {
    let currNO = displayCurrNo.textContent;
    let currRes = displayResult.textContent;
    displayCurrNo.textContent = currNO.substring(0, currNO.length - 1);
    displayResult.textContent = currRes.substring(0, currRes.length - 1);
    number = currNO.substring(0, currNO.length - 1);
}

//keyboard support

document.addEventListener('keydown', (event) => {
    if(!isNaN(event.key) && event.key !== ' '){
		document.getElementById(`${event.key}`).click();
	} else if (['/', '+', '-', '*','Enter','='].includes(event.key)) {
        if(event.key === 'Enter' || event.key === '=') {
            document.getElementsByClassName('operator equals').click();
        }else {
            document.getElementById(`${event.key}`).click();
        }
    } else if (event.key === 'Delete') {
        clearAll();
    } else if (event.key === 'Backspace') {
        backspace();
    }else if(event.key === '.'){
        document.getElementById('.').click();
    }
});
