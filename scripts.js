const numbers = document.querySelectorAll('.num');
const math = document.querySelectorAll('.math');
const topDisplay = document.querySelector('.display-top');
const bottomDisplay = document.querySelector('.display-bottom');
const deleteNumber = document.querySelector('.delete');
const clear = document.querySelector('.clear');
const equals = document.querySelector('.equals');

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
        active = true;
        operatorValue = operator.textContent;
        topDisplay.textContent = `${num1} ${operatorValue}`;
        bottomDisplay.textContent = '';
    })
})

equals.addEventListener('click', () => {
    let active = true;
    if(active === false) {
        equals.disabled;
    }
    topDisplay.textContent = `${num1} ${operatorValue} ${num2}`;
    total = operate(operatorValue, num1, num2);
    bottomDisplay.textContent = total;
    num1 = '';
    num2 = '';
    num1 = total;
    active = false;
})

clear.addEventListener('click', () => {
    num1 = '';
    num2 = '';
    operatorValue = '';
    topDisplay.textContent = '';
    bottomDisplay.textContent = '';
})

deleteNumber.addEventListener('click', () => {
    bottomDisplay.textContent = bottomDisplay.textContent.slice(0,-1);
    num2 = bottomDisplay.textContent;

})

function add(num1, num2) {
    return parseInt(num1) + parseInt(num2);
}

function subtract(num1, num2) {
    return parseInt(num1) - parseInt(num2);
}

function multiply(num1, num2) {
    return parseInt(num1) * parseInt(num2);
}

function divide(num1, num2) {
    return parseInt(num1) / parseInt(num2);
}

function operate(operator, num1, num2) {
    if(operator === '/') {
        return divide(num1, num2);
    } else if(operator === '+') {
        return add(num1, num2);
    } else if(operator === '-') {
        return subtract(num1, num2);
    } else if(operator === '*') {
        return multiply(num1, num2);
    }
}