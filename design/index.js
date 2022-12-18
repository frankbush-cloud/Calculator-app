
class Calculator{
    constructor(previousOperandText, currentOperandText){
        this.previousOperandText = previousOperandText
        this.currentOperandText = currentOperandText
        this.clear()
    }
    //this are methods for the calculator class;
    //function for operation
    clear(){
        this.currentOperand ="";
        this.previousOperand ="";
        this.operation = undefined;
    }

    delete(){
        this.currentOperand = this.currentOperand.slice(0, -1)
    }
    
    appendNumber(number){
         if(number === "." && this.currentOperand.includes('.'))return;
        this.currentOperand = this.currentOperand + number.toString();
    }

    chooseOperation(operation){
        if(this.currentOperand==="")return;
        if(this.previousOperand !== ""){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = '';
    }

    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return

        switch(this.operation){
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev -current
                break
            case '*':
                computation = prev * current
                break
            case '/':
                computation = prev/current
                break
                default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ""

    }
     
    getDisplayNumber(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay=""
        }else{
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if(decimalDigits !=null){
            return `${integerDisplay}.${decimalDigits}`
        } else{
            return integerDisplay
        }
    }

    updateDisplay(){
        this.currentOperandText.innerText = this.getDisplayNumber(this.currentOperand)
        if(this.operation != null){
            this.previousOperandText.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }else {
            this.previousOperandText.innerText = "";
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const resetButton = document.querySelector('[data-all-clear]');
const previousOperandText = document.querySelector('[data-previous-operand]');
const currentOperandText = document.querySelector('[data-current-operand]');
const themeButtonOne = document.querySelector("#theme-btn-one");
const themeButtonTwo = document.querySelector("#theme-btn-two");
const themeButtonThree = document.querySelector("#theme-btn-three");
const themeButton = document.querySelector("#theme-btn-circle");
const themeButtonBackground = document.querySelector(".btn-theme-bckg");
const wrapper = document.querySelector(".wrapper");
const mainContainer = document.querySelector(".main-container");
const screen =document.querySelector(".screen");

// const calcText = document.querySelectorAll(".title-color");


//function to change themes;

function setDisplay(className, colorValue) {
    var items = document.getElementsByClassName(className);
    for (var i=0; i < items.length; i++) {
      items[i].style.color = colorValue;
    }
  }

function setButtonBackground(className, backGroundValue, boxshadowValue){
    var elem = document.getElementsByClassName(className);
    for (var i=0; i < elem.length; i++) {
        elem[i].style.background = backGroundValue;
        elem[i].style.boxshadow = boxshadowValue;
    }
    
}


function changeToThemeOne(){
    themeButtonBackground.style.justifyContent = "flex-start";
    themeButton.style.background = "red";
    mainContainer.style.background = "var(--Desaturated-dark-blue)";
    wrapper.style.background = "var(--Desaturated-dark-blue)";
    screen.style.background = "hsl(224, 36%, 15%)";
    equalsButton.style.background = "red";
    setDisplay("title-color", "white");
    previousOperandText.style.color = "white";
    currentOperandText.style.color = "white";
    setButtonBackground("keys", "var(--Light-grayish-orange)", "0px 7px white")
}

function changeToThemeTwo(){
    themeButtonBackground.style.justifyContent = "center";
    themeButton.style.background = "red";
    mainContainer.style.background = "hsl(30, 25%, 89%)";
    wrapper.style.background = "hsl(30, 25%, 89%)";
    equalsButton.style.background = "red";
    screen.style.background = "white";
    setDisplay("title-color", "black");
    previousOperandText.style.color = "black";
    currentOperandText.style.color = "black";
    setButtonBackground("keys", "hsl(35, 11%, 61%)")
}

function changeToThemeThree(){
    themeButtonBackground.style.justifyContent = "flex-end";
    themeButton.style.background = "hsl(177, 92%, 70%)";
    mainContainer.style.background = "hsl(268, 75%, 9%)";
    wrapper.style.background = "hsl(268, 75%, 9%)";
    equalsButton.style.background = "hsl(176, 100%, 44%)";
    screen.style.background = "hsl(268, 71%, 12%)";
    setDisplay("title-color", "yellow");
    previousOperandText.style.color = "yellow";
    currentOperandText.style.color = "yellow";
    setButtonBackground("keys", "hsl(281, 89%, 26%)", "0px 7px red")
}

const calculator = new Calculator(previousOperandText, currentOperandText)
numberButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay();
    })
})


operationButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay();
    })
});

equalsButton.addEventListener('click', button =>{
    calculator.compute();
    calculator.updateDisplay();
})

resetButton.addEventListener('click', button =>{
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button =>{
    calculator.delete();
    calculator.updateDisplay();
});

themeButtonOne.addEventListener('click', changeToThemeOne)
themeButtonTwo.addEventListener('click', changeToThemeTwo)
themeButtonThree.addEventListener('click', changeToThemeThree)