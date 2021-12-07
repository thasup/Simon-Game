// Declared global variables
const buttonColors = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let randomChosenColor;
let userChosenColor;
let started = false;

// ====================
// Set Helper Functions
// ====================

// Set function that play sound when execute
const playSound = (name) => {
    let audio = new Audio(`./sounds/${name}.mp3`);
    audio.play();
};

// Set function that add class 'pressed' temporarily when clicked button
const animatePress = (currentColor) => {
    $(`#${currentColor}`).addClass('pressed');

    setTimeout(() => {
        $(`#${currentColor}`).removeClass('pressed')
    }, 100);
};

// ====================
// Set Main Functions
// ====================

// Set function that reset game when execute
const startOver = () => {
    level = 0;
    gamePattern = [];
};

// Set function that reset game when execute
const nextSequence = () => {
    userClickedPattern = [];
    // Set function that random number
    const generateRandomNumber = (min, max) =>  {
        return Math.floor(Math.random() * (max - min) + min);
    };

    // Random number between 3 to 0
    let randomNumber = generateRandomNumber(3, 0);

    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    // Animate flash button
    $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100);
    // Play button sound 
    playSound(`${randomChosenColor}`);

    // Increase level before function end
    level++
    // Change game level
    $('#level-title').text(`Level ${level}`);
};

// Set function that check answer
const checkAnswer = (currentLevel) => {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {

            // Delay 1 secound before increase another level
            setTimeout(() => {
                nextSequence();
            }, 1000);
        };
    } else {
        // Play wrong sound 
        playSound('wrong');

        // Add class 'game-over' temporarily when clicked wrong button
        $(`body`).addClass('game-over');
        setTimeout(() => {
            $(`body`).removeClass('game-over')
        }, 200);

        // Show game over
        $('#level-title').text(`Game Over`);
        started = false;
    }
};

// ============
// Begin Events
// ============

// // Add eventlistening to click on start/restart button
$('#start').click(() => {

    // Run if started equal to false
    if (!started) {
        startOver();
        $('#level-title').text(`Level ${level}`);
        $('#start').text('Restart Game');
        nextSequence();
        started = true;
    } 
    // Restart if need
    else { 
        startOver();
        $('#level-title').text(`Level ${level}`);
        nextSequence();
    }
});

// Add eventlistening to click on color button
$('.btn').click(function() {
    userChosenColor = $(this).attr('id');
    
    userClickedPattern.push(userChosenColor);

    animatePress(userChosenColor);
    playSound(`${userChosenColor}`);
    
    checkAnswer(userClickedPattern.length-1);
});

// Show some hint
$('img').click(() => {
    console.log(`gamePattern : ${gamePattern}`);
    console.log(`userClickedPattern : ${userClickedPattern}`);
})