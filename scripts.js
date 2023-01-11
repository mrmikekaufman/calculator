const operators = document.querySelectorAll('.op');

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        alert(operator.textContent * 2);
    })
})