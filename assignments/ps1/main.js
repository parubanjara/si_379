let score = 0;

let scoreDisplay = document.querySelector("#score");

// Write code that *every second*, picks a random unwhacked hole (use getRandomUnwhackedHoleId)
// and adds the "needs-whack" class
const interval = setInterval(() => {
    console.log('TODO: Add the "needs-whack" class to a random hole');
    let unwhackedHoleID = getRandomUnwhackedHoleId();
    // console.log("unwhackedwholeid: ", unwhackedHoleID);

    const unwhackedHole = document.querySelector(`#${unwhackedHoleID}`);
    // console.log("unwhackedhole: ", unwhackedHole);

    unwhackedHole.classList.add("needs-whack");

    // console.log(unwhackedHole.classList.add("needs-whack"))
}, 1000);

for(const id of getAllHoleIds()) {
    // console.log("id:", id);
    const element = document.querySelector(`#${id}`);
    // console.log("element", element)

    // Write code that adds a "click" listener to the element with this id
    element.addEventListener("click", () => {

//     When the user clicks on it, *if* the element has class "needs-whack" then:
        if (element.classList.contains("needs-whack")){

//          1. Remove the "needs-whack" class
            element.classList.remove("needs-whack");

//          2. Add the "animating-whack" class *for 500 milliseconds*
            element.classList.add("animating-whack");

            setTimeout(() => {
                element.classList.remove("animating-whack")
            }, 500);

//          3. Increment the score by 1 (and update the score display)
            score++
            scoreDisplay.innerText = score;

//          4. If the score is 45 or higher, stop the game (by clearing the interval)
            if (score >= 45) {
                clearInterval(interval);
            }
        };
        
    });
    
    console.log(`TODO: Add a click listener for #${id} here`);
}

/**
 * @returns a random ID of a hole that is "idle" (doesn't currently contain a mole/buckeye). If there are none, returns null
 */
function getRandomUnwhackedHoleId() {
    const inactiveHoles = document.querySelectorAll('.hole:not(.needs-whack)');  // Selects elements that have class "hole" but **not** "needs-whack"

    if(inactiveHoles.length === 0) {
        return null;
    } else {
        const randomIndex = Math.floor(Math.random() * inactiveHoles.length);
        return inactiveHoles[randomIndex].getAttribute('id');
    }
}

/**
 * @returns a list of IDs (as strings) for each hole DOM element
 */
function getAllHoleIds() {
    const allHoles = document.querySelectorAll('.hole'); 
    const ids = [];
    for(const hole of allHoles) {
        ids.push(hole.getAttribute('id'));
    }
    return ids;
}