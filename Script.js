function startGame() {

    // Start the game logic
    var hole = document.getElementById("hole");
    var game = document.getElementById("game");
    var result = document.getElementById("result");
    var text = document.getElementById("text");
    var bird = document.getElementById("bird");
    var block = document.getElementById("block");
    var scoreDisplay = document.getElementById("score-display");
    var score = 0;
    var jumping = 0;


    // Hide the welcome screen
    document.getElementById("welcome-screen").style.display = "none";
    // Show the game
    document.getElementById("game").style.display = "block";
    // Hide the Instructions
    // instructions.style.display = 'none';
    // Hide the character container
    document.getElementById("character-container").style.display = 'none';
    // ... Rest of the startGame() function


    hole.addEventListener("animationiteration", RanHole);
    function RanHole() {
        var random = -((Math.random() * 350) + 150);
        hole.style.top = random + "px";
        score++;

        // Display a special message when the score hits a milestone
        if (score % 10 === 0) {
            showScoreDisplay(`Score Milestone: ${score}`);
            changeBackgroundImage("url('bg1.png')");
    }

        // Reset background image when the score hits 30
        // if (score === 30) {
        //     changeBackgroundImage("url('bg2.png')");
        // }
 
        // // Change background image when the score hits 20
        // if (score === 10) {
        //     changeBackgroundImage("url('bg1.png')");
        // }  
        
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
                (birdTop < hTop || birdTop > hTop + 150))
        ) {
            result.style.display = "block";
            text.innerText = `Your final score is : ${score}`;
            game.style.display = "none";
            // score = 0;
        }
    }, 10);

    
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


    // Add this function to show the score display
    function showScoreDisplay(message) {
        scoreDisplay.innerText = message;
        scoreDisplay.style.display = 'block';

        // Hide the score display after a few seconds
        setTimeout(function () {
            scoreDisplay.style.display = 'none';
        }, 2000); // Adjust the timeout value as needed
    }

    // Add this function to change the background image
    function changeBackgroundImage(imageUrl) {
        game.style.backgroundImage = imageUrl;
    }


    function changeCharacter() {
        // Get the selected character value
        var selectedCharacter = document.getElementById("character-select").value;
        // Get the image element
        var characterImg = document.getElementById("character-img");


        // Set the source of the image based on the selected character
        switch (selectedCharacter) {
            case "Angry Red Bird":
                characterImg.src = "Bird4.png"; 
                break;
            case "Santa Bird":
                characterImg.src = "Bird2.png"; 
                break;
            case "Yellow Bird":
                characterImg.src = "Bird.png"; 
                break;
            default:
                characterImg.src = ""; 
        }
    }

    // Initial character load
    changeCharacter();

}

// Display the welcome screen initially
document.getElementById("welcome-screen").style.display = "flex";