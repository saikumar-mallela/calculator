class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear()
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.slice(0,-1);

    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();

    }

    chooseOperation(operation){
        if( this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand.toString() + ' ' + operation.toString();
        this.currentOperand = '';
    }

    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (this.currentOperand = '') 
        {
            computation = prev;
            return;
        }
        switch(this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '/':
                computation = (prev / current).toFixed(2);
                break;
            case '*':
                computation = prev * current;
                break;
            case '%':
                computation = ((prev/100)*current).toFixed(2);
                break;
            default:
                return;
        }
        this.currentOperand = computation
        this.operation = undefined;
        this.previousOperand = '';
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.currentOperand;
        this.previousOperandTextElement.innerText = this.previousOperand;
    }
}

const numButtons = document.querySelectorAll("[data-number]");
const opButtons = document.querySelectorAll("[data-operation]");
const eqButton = document.querySelector("[data-equals]");
const delButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);
numButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});

opButtons.forEach( button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
});

eqButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();

})

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();

})

delButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();

})


