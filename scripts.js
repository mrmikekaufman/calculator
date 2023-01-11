const numbers = document.querySelectorAll('.num');
const math = document.querySelectorAll('.math');
const topDisplay = document.querySelector('.display-top');
const bottomDisplay = document.querySelector('.display-bottom');
let num1 = '';
let num2 = '';
let operatorValue = '';

numbers.forEach((num) => {
    num.addEventListener('click', () => {
        if (operatorValue === '') {
            num1 += num.textContent;
            topDisplay.textContent = `${num1}`;
        } else {
            num2 += num.textContent;
            bottomDisplay.textContent = `${num2}`;
        }
    })
})

math.forEach((operator) => {
    operator.addEventListener('click', () => {
        operatorValue = operator.textContent;
        topDisplay.textContent = `${num1} ${operatorValue}`;
    })
})


function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    if(operator === '/') {
        divide(num1, num2);
    } else if(operator === '+') {
        add(num1, num2);
    } else if(operator === '-') {
        subtract(num1, num2);
    } else if(operator === '*') {
        multiply(num1, num2);
    }
}