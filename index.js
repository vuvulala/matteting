class Question {
    constructor(num1, num2, op, placeholder) {
        this.num1 = num1
        this.num2 = num2
        this.op = op
        this.correct_answer = calculate(num1, num2, op)
        this.guessed = "?"

        this.placeholder = placeholder
    }

    update() {
    }

    get_html() {
        let p = document.createElement("p")

        let equation = document.createElement("span")
        if(!this.placeholder)
            equation.innerText = `${this.num1} ${this.op} ${this.num2} = `

        let guess = document.createElement("span")
        if(!this.placeholder)
            guess.innerText = `${this.guessed}`
        
        if(this.guessed == "?") {

        } else if(this.correct_answer == this.guessed) {
            guess.classList.add("correct")
        } else {
            guess.classList.add("incorrect")
            guess.title = this.correct_answer
        }

        p.appendChild(equation)
        p.appendChild(guess)
        return p
    }
}


/** @type HTMLInputElement */
let answer_input_el = document.querySelector("#answer_text")
let history_container = document.querySelector("#history")

const questions = []
for(let i = 0; i < 5; i++) {
    questions.push(new Question(0, 0, "+", true))
}

function sync_questions() {
    history_container.innerHTML = ""

    for(let el of questions) {
        history_container.appendChild(el.get_html())
    }
}

function calculate(n1, n2, op) {
    switch(op) {
        case "+": return n1 + n2
        case "-": return n1 - n2
        case "*": return n1 * n2
        case "/": return n1 / n2
    }
}




function append_question(question) {
    questions.shift()
    questions.push(question)
    sync_questions()
}

function rand_int(from, to) {
    return Math.floor(Math.random() * Math.abs(from - to)) + from
}

function create_new_question() {
    let op = ["+", "-", "*", "/"][rand_int(0, 4)]
    let question = ""
    for(let i = 0; i < 100; i++) {
        let num1 = rand_int(-10, 10)
        let num2 = rand_int(-10, 10)
        if(op == "/") {
            num1 = num2 * num1
        }
        question = new Question(num1, num2, op)
        if(question.correct_answer == Math.floor(question.correct_answer)) {
            return question
        }
        console.log(question)
    }
    return new Question(0, 0, "-", true)
}

function register_answer(answer) {
    let current_question = questions[questions.length-1]
    current_question.guessed = answer
    current_question.update()

    append_question(create_new_question())
}

answer_input_el.addEventListener("keypress", (ev) => {
    if(ev.key != "Enter") return
    console.log(answer_input_el.value)
    register_answer(answer_input_el.value)
    answer_input_el.value = ""
})

append_question(create_new_question())