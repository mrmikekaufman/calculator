let numbers = document.querySelectorAll('.num');
let math = document.querySelectorAll('.math');
let topDisplay = document.querySelector('.display-top');
let bottomDisplay = document.querySelector('.display-bottom');
let deleteNumber = document.querySelector('.delete');
let clear = document.querySelector('.clear');
let equals = document.querySelector('.equals');
let decimal = document.querySelector('.decimal');

let num1 = '';
let num2 = '';
let operatorValue = '';
equals.disabled = false; //only disable equals if clicked twice in a row

//click corresponding button on each keyup
window.onkeydown = function (event) {
    if(event.key == 'Enter') {
        event.preventDefault();
        equals.click();
    }
    numbers.forEach((num) => {
        if(num.textContent == event.key) {
            num.click();
        }
    })

    math.forEach((operator) => {
        if(operator.textContent == event.key) {
            operator.click();
        }
    })
    if(event.key == 'Backspace') {
        deleteNumber.click();
    }
    if(event.key == 'Escape') {
        clear.click();
    }
    if(event.key == '.') {
        decimal.click();
    }
}



numbers.forEach((num) => {
    num.addEventListener('click', () => {
        equals.disabled = false;
        if (operatorValue === '') { //before operator has been pressed, add current numbers to num1 and display on top
            num1 += num.textContent;
            topDisplay.textContent = `${num1}`;
        } else {
            num2 += num.textContent; //after operator has been pressed, add current numbers to num2 and display on bottom
            bottomDisplay.textContent = `${num2}`;
        }
    })
})

math.forEach((operator) => {
    operator.addEventListener('click', () => {
        equals.disabled = false;
        decimal.disabled = false;
        if(topDisplay.textContent !== '' && bottomDisplay.textContent !== '' && num2 !== '') { //when displays are filled, operate on next operator click
            num1 = operate(operatorValue, num1, num2);
            num2 = '';
        }
        if(num1 === 'error') { //when trying to divide by 0, operate returns 'error'
            clearCalculator();
        } else {
            operatorValue = operator.textContent;
            topDisplay.textContent = `${num1} ${operatorValue}`;
            bottomDisplay.textContent = '';
        }
    })
})

function updateDisplay(key) {
    if (operatorValue === '') { //before operator has been pressed, add current numbers to num1 and display on top
        num1 += key;
        topDisplay.textContent = `${num1}`;
    } else {
        num2 += key; //after operator has been pressed, add current numbers to num2 and display on bottom
        bottomDisplay.textContent = `${num2}`;
    }
}

decimal.addEventListener('click', () => {
    if (topDisplay.textContent.includes('.') === true && bottomDisplay.textContent === '' && operatorValue === ''){
        decimal.disabled = true;
    } else if (topDisplay.textContent.includes('.') === false) {
        updateDisplay(decimal.textContent);
    } else if (bottomDisplay.textContent.includes('.') === false) {
        updateDisplay(decimal.textContent);
    }
})


equals.addEventListener('click', () => {
    equals.disabled = true;//equals disabled after first click, re-enabled on any other key press
    decimal.disabled = false;
    topDisplay.textContent = `${num1} ${operatorValue} ${num2}`;
    let total = operate(operatorValue, num1, num2);
    if(total === 'error') {
        clearCalculator();
    } else {
        bottomDisplay.textContent = total;
        num1 = '';
        num2 = '';
        num1 = total; //allows continuing calculations on total
    }
})

function clearCalculator() {
    num1 = '';
    num2 = '';
    operatorValue = '';
    topDisplay.textContent = '';
    bottomDisplay.textContent = '';
}

clear.addEventListener('click', () => {
    equals.disabled = false;
    decimal.disabled = false;
    clearCalculator();
})

deleteNumber.addEventListener('click', () => {
    equals.disabled = false;
    if (bottomDisplay.textContent === '' && operatorValue === '') { //bottom display empty and no operator pressed, delete from top display
        topDisplay.textContent = topDisplay.textContent.slice(0,-1);
        num1 = topDisplay.textContent;
    }else if (bottomDisplay.textContent === '' && operatorValue !== '') { //bottom display empty, but operator pressed, delete operator
        topDisplay.textContent = topDisplay.textContent.slice(0,-1);
        operatorValue = '';
    } else {
        bottomDisplay.textContent = bottomDisplay.textContent.slice(0,-1); //delete from bottom display
        num2 = bottomDisplay.textContent;
    }
})

function add(num1, num2) {
    return parseFloat(num1) + parseFloat(num2);
}

function subtract(num1, num2) {
    return parseFloat(num1) - parseFloat(num2);
}

function multiply(num1, num2) {
    return parseFloat(num1) * parseFloat(num2);
}

function divide(num1, num2) {
return parseFloat(num1) / parseFloat(num2);

}

function operate(operator, num1, num2) {
    if(operator === '' || num2 === '') {
        return num1;
    } else if(operator === '/' && num2 === '0') {
        alert('HEY! DON\'T DIVIDE BY 0!');
        return 'error';
    } else if(operator === '/') {
        return +divide(num1, num2).toFixed(2);
    } else if(operator === '+') {
        return +add(num1, num2).toFixed(2);
    } else if(operator === '-') {
        return +subtract(num1, num2).toFixed(2);
    } else if(operator === '*') {
        return +multiply(num1, num2).toFixed(2);
    } 
}