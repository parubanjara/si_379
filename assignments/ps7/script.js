const addTask = document.querySelector('#add-task');
const description = document.querySelector('#description');
const taskList = document.querySelector('#task-list');
const workSession = document.querySelector('#work-session');
const breakSession = document.querySelector('#break-session');

let taskItemNumber = 0;

function updateTimerBreak(timer) {
    let secondsCountDown = 60;
    let time = parseInt(timer.innerHTML);
    if (time !== 0) {
        time = time - 1;
        secondsCountDown = secondsCountDown - 1
        timer.innerHTML = `${time}:${secondsCountDown}`;
        setTimeout(updateTimerBreak, 1000, timer);
    }
    else {
        timer.innerHTML = '';
        const workSessions = timer.parentElement.querySelector('.work-sessions');
        workSessions.append('○');
    }
}

function updateTimerWork(timer) {
    secondsCountDown = 60;
    let time = parseInt(timer.innerHTML);
    if (time !== 0) {
        time = time - 1;
        secondsCountDown = secondsCountDown - 1
        console.log(time, secondsCountDown);
        timer.innerHTML = `${time}:${secondsCountDown}`;
        setTimeout(updateTimerWork, 1000, timer);
    }
    else {
        timer.innerHTML = timer.getAttribute('break-session');
        setTimeout(updateTimerBreak, 1000, timer);
    }
}

function toggleTimer(event) {
    const button = event.target;
    const taskItemNumber = event.target.getAttribute('task-item');
    const workSessionValue = button.getAttribute('work-session');
    const breakSessionValue = button.getAttribute('break-session');
    const task = taskList.querySelector(`[task-item="${taskItemNumber}"]`);
    const timer = task.querySelector(".timer");
    timer.setAttribute('break-session', breakSessionValue);
    timer.innerHTML = workSessionValue;
    setTimeout(updateTimerWork, 1000, timer);
}

function deleteItem(event) {
    const taskItemNumber = event.target.getAttribute('task-item');
    const task = taskList.querySelector(`[task-item="${taskItemNumber}"]`);
    taskList.removeChild(task);
}

function addTaskClick(event) {

    const task = document.createElement('div');
    task.setAttribute('task-item', taskItemNumber);

    const input = document.createElement('input');
    input.value = description.value;

    const toggleButton = document.createElement('button');
    toggleButton.classList.add('toggle-btn');
    toggleButton.addEventListener('click', toggleTimer);
    toggleButton.append("▷ Start");
    toggleButton.setAttribute("work-session", workSession.value);
    
    toggleButton.setAttribute("break-session", breakSession.value);
    toggleButton.setAttribute('task-item', taskItemNumber);

    const deleteButton = document.createElement('button');
    deleteButton.addEventListener('click', deleteItem);
    deleteButton.classList.add('delete-btn');
    deleteButton.append("🗑");
    deleteButton.setAttribute('task-item', taskItemNumber);

    const timer = document.createElement('span');
    timer.classList.add('timer');
    toggleButton.addEventListener("click", () => {
        timer.style.display = "inline-block";
    });

    const workSessions = document.createElement('span');
    workSessions.classList.add('work-sessions');

    task.appendChild(input);
    task.appendChild(deleteButton);
    task.appendChild(workSessions);
    task.appendChild(timer);
    task.appendChild(toggleButton);
    taskList.appendChild(task);

    taskItemNumber = taskItemNumber + 1;

    const localStorageValue = JSON.parse(localStorage.getItem(taskItemNumber));
    if (localStorageValue) {
        console.log(localStorageValue);
        description.value = localStorageValue['description'];
        workSession.value = localStorageValue['workSession'];
        breakSession.value = localStorageValue['breakSession'];
    }

    localStorage.setItem(taskItemNumber, JSON.stringify({
        'description': description.value,
        'workSession': workSession.value,
        'breakSession': breakSession.value
    }));

    description.value = '';
}

addTask.addEventListener('click', addTaskClick);
