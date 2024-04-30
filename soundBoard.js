const keys = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

const timestamps = [];

timestamps.unshift(getTimestamp());

function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomKey() {
    return keys[getRandomNumber(0, keys.length - 1)]
}

function targetRandomKey() {
    const key = document.getElementById(getRandomKey());
    key.classList.add("selected");
    let start = Date.now()
}

function getTimestamp() {
    return Math.floor(Date.now() / 1000)
}

document.addEventListener("keyup", event => {
    playSound(event);
    const keyPressed = String.fromCharCode(event.keyCode);
    const keyElement = document.getElementById(keyPressed);
    const highlightedKey = document.querySelector(".selected");

    keyElement.classList.add("hit")
    keyElement.addEventListener('animationend', () => {
        keyElement.classList.remove("hit")
    })

    if (keyPressed === highlightedKey.innerHTML) {
        timestamps.unshift(getTimestamp());
        const elapsedTime = timestamps[0] - timestamps[1];
        console.log(`Character per minute ${60 / elapsedTime}`)
        highlightedKey.classList.remove("selected");
        targetRandomKey();
    }
})

targetRandomKey();



function playSound(event) {

    const keyFrequencies = {
        'q': 27.5,
        'w': 187.4,
        'e': 440,
        'r': 493.88,
        't': 523.25,
        'y': 587.33,
        'u': 659.25,
        'i': 698.46,
        'o': 783.99,
        'p': 880,
        'a': 1626.5,
        's': 1786.4,
        'd': 1946.3,
        'f': 2106.2,
        'g': 2266.1,
        'h': 2426,
        'j': 2585.9,
        'k': 2745.8,
        'l': 2905.7,
        'z': 3065.6,
        'x': 3225.5,
        'c': 3385.4,
        'v': 3545.3,
        'b': 3705.2,
        'n': 3865.1,
        'm': 4025,

    };


    const keyPressed = event.key.toLowerCase();

    // Check if the pressed key has a corresponding frequency
    if (keyFrequencies[keyPressed]) {
        // Create an oscillator node
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();

        // Set the oscillator frequency
        oscillator.frequency.setValueAtTime(keyFrequencies[keyPressed], audioContext.currentTime);

        // Connect the oscillator to the audio context's destination (speakers)
        oscillator.connect(audioContext.destination);

        // Start and stop the oscillator to play the sound
        oscillator.start();
        oscillator.stop(audioContext.currentTime + .5); // Adjust the duration as needed
    }
}