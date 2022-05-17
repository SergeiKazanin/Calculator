class Calculator {
    constructor(previousOperandtextElement, currentOperandtextElement) {
        this.previousOperandtextElement = previousOperandtextElement
        this.currentOperandtextElement = currentOperandtextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    appendNamber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()

    }
    chooseOperation(operation) {
        if (this.chooseOperation === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '/':
                computation = prev / current
                break
            case '*':
                computation = prev * current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigit = parseFloat(stringNumber.split('.')[0])
        const decimalDigit = stringNumber.split('.')[1]
        let integerDislay
        if (isNaN(integerDigit)) {
            integerDislay = ''
        } else {
            integerDislay = integerDigit.toLocaleString('en',
                { maximumFractionDigits: 0 })
        }
        if (decimalDigit != null) {
            return `${integerDislay}.${decimalDigit}`
        } else {
            return integerDislay
        }
    }
    updateDisplay() {
        this.currentOperandtextElement.innerText =
            this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandtextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }else{
            this.previousOperandtextElement.innerText = ''
        }
    }

}

const numberButtotns = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandtextElement = document.querySelector('[data-previos-operand]')
const currentOperandtextElement = document.querySelector('[data-current-operand]')


const calculator = new Calculator(previousOperandtextElement, currentOperandtextElement)

numberButtotns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNamber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})


