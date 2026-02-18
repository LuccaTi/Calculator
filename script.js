let input = document.querySelector(".calculator-input");
let digitsAndOperatorsDiv = document.querySelector(".digits-and-operators");

let firstNumber = '';
let operator = '';
let secondNumber = '';
let shouldResetDisplay = false;

for (const calcButton of digitsAndOperatorsDiv.children) {

    const content = calcButton.textContent;
    let operators = ['+', '-', '*', '/'];

    if (operators.includes(content)) {
        calcButton.addEventListener("click", () => handleOperator(content));
    } else if (content === '=') {
        calcButton.addEventListener("click", solveTheOperation);
    } else if (content === 'Clear') {
        calcButton.addEventListener("click", clearTheOperation);
    } else {
        calcButton.addEventListener("click", () => handleDigit(content));
    }

}

function handleDigit(digit) {
    if (shouldResetDisplay) {
        input.value = '';
        shouldResetDisplay = false;
    }
    input.value += digit;
}

function handleOperator(op) {
    if (firstNumber !== '' && input.value !== firstNumber) {
        solveTheOperation();
    }

    firstNumber = input.value;
    operator = op;
    shouldResetDisplay = true;
}

function solveTheOperation() {
    if (operator === '' || shouldResetDisplay) return; // Não faz nada se não houver operação pendente

    secondNumber = input.value;

    let firstValue = Number(firstNumber);
    let secondValue = Number(secondNumber);

    // Proteção contra divisão por zero
    if (operator === '/' && secondValue === 0) {
        alert("Error: Division by zero is not allowed.");
        clearTheOperation();
        return;
    }

    input.value = operate(operator, firstValue, secondValue);

    // Prepara para a próxima operação
    firstNumber = input.value;
    operator = '';
    shouldResetDisplay = true;
}

function clearTheOperation() {
    input.value = "";
    firstNumber = '';
    secondNumber = '';
    operator = '';
    shouldResetDisplay = false;
}

// Nova função "Operate" que centraliza a lógica
function operate(op, a, b) {
    a = Number(a);
    b = Number(b);
    switch (op) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return null;
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function resetCalculatorVariables() {
    firstNumber = '';
    secondNumber = '';
    operator = '';
}