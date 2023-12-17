
// Add this function to your existing Script.js
function startGame() {
    // Hide the welcome screen
    document.getElementById("welcome-screen").style.display = "none";

    // Show the game
    document.getElementById("game").style.display = "block";

    instructions.style.display = 'none';
    // ... Rest of the startGame() function

    // Start the game logic
    // ... (your existing game logic)
    var hole = document.getElementById("hole");
    var game = document.getElementById("game");
    var result = document.getElementById("result");
    var text = document.getElementById("text");
    var bird = document.getElementById("bird");
    var block = document.getElementById("block");
    var score = 0;
    var jumping = 0;


    hole.addEventListener("animationiteration", RanHole);

function RanHole() {
    var random = -((Math.random() * 350) + 150);
    hole.style.top = random + "px";
    score++;
}

var fall = setInterval(function () {
    var birdTop = parseInt(window.getComputedStyle(bird).getPropertyValue("top"));
    if (jumping === 0) {
        bird.style.top = (birdTop + 2) + "px";
    }
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    var hTop = 500 + holeTop;
    if (
        birdTop > 450 ||
        (blockLeft < 50 &&
            blockLeft > -50 &&
            (birdTop < hTop || birdTop > hTop + 160))
    ) {
        result.style.display = "block";
        text.innerText = `Your final score is : ${score}`;
        game.style.display = "none";
        // score = 0;
    }
}, 15);

window.addEventListener("keydown", hop);
window.addEventListener("touchstart", hop);

function hop() {
    jumping = 1;

    var birdTop = parseInt(window.getComputedStyle(bird).getPropertyValue("top"));
    if (birdTop > 6) {
        bird.style.top = birdTop - 60 + "px";
    }
    setTimeout(function () {
        jumping = 0;
    }, 100);
}

}

// Display the welcome screen initially
document.getElementById("welcome-screen").style.display = "flex";


let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the default behavior to avoid showing the browser's install prompt
    event.preventDefault();

    // Stash the event so it can be triggered later
    deferredPrompt = event;

    // Show your own custom install button or prompt
    // For example, you can display a button with an "Add to Home Screen" message
    showInstallButton();
});

function showInstallButton() {
    // Show your custom install button and handle the user's interaction
    // For example, display a button that triggers the installation when clicked
    // Make sure to provide a user-friendly message
    const installButton = document.getElementById('install-button');

    if (installButton) {
        installButton.style.display = 'block';

        installButton.addEventListener('click', () => {
            // Trigger the installation
            deferredPrompt.prompt();

            // Wait for the user to respond to the prompt
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }

                // Reset the deferredPrompt variable
                deferredPrompt = null;

                // Hide the install button
                installButton.style.display = 'none';
            });
        });
    }
}
