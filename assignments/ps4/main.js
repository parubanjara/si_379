async function getRandomQuestions() {
    const response = await fetch("https://the-trivia-api.com/v2/questions");
    const value = await response.json();
    return value;
}

async function start() {
    const records = await getRandomQuestions();
    let record = records.pop();
    let score = 0;
    const form = document.querySelector('form');
    const button = document.querySelector('#submit-btn');
    let scoreCounter = document.querySelector("#score-counter");

    function displayQuestion(record) {
        let question = record.question.text;
        const correctAnswer = record.correctAnswer;
        let answers = record.incorrectAnswers.concat([correctAnswer]);
        answers = shuffleArray(answers);
        const fieldset = document.querySelector('fieldset');
        fieldset.innerText = "";
        const legend = document.createElement('legend');
        legend.innerText = question;
        fieldset.append(legend);

        for (const answer of answers) {
            const div = document.createElement('div');
            const label = document.createElement('label');
            const input = document.createElement('input');
            label.innerText = answer;
            input.setAttribute('name', 'choices');
            input.setAttribute('value', answer);
            input.setAttribute('type', 'radio');
            div.append(input);
            div.append(label);
            fieldset.append(div);
        }
    }

    button.addEventListener('click', (event) => {
        event.preventDefault();
        const data = new FormData(form);
        const selectedAnswer = data.get('choices');
        const checked = form.querySelector('input:checked + label');

        if (selectedAnswer === record.correctAnswer) {
            checked.classList.add("correct-answer");
            score++;
            scoreCounter.innerText = `Score: ${score}/10`;
        }
        else {
            checked.classList.add("wrong-answer");
            alert(`The correct answer is: ${record.correctAnswer}.`);
        }
        record = records.pop()
        if (record) {
            setTimeout(() => {
                displayQuestion(record);
            }, 2000);
        }
        else {
            button.setAttribute("disabled", "true");
            alert(`Your score is: ${score}/10`);
        }
    });

    displayQuestion(record);
}

start()
