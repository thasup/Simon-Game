const buttonColors = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let randomChosenColor;
let userChosenColor;

// Set function that play sound when execute
const playSound = (name) => {
    let audio = new Audio(`./sounds/${name}.mp3`);
    audio.play();
};

$('#start').click(() => {
    $('#level-title').text(`Level 0`);
    nextSequence();
});

const nextSequence = () => {
    userClickedPattern = [];
    // Set function that random number
    const generateRandomNumber = (min, max) =>  {
        return Math.floor(Math.random() * (max - min) + min);
    };

    let randomNumber = generateRandomNumber(3, 0);
    console.log(randomNumber);

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

const animatePress = (currentColor) => {
    $(`#${currentColor}`).addClass('pressed');

    setTimeout(() => {
        $(`#${currentColor}`).removeClass('pressed')
    }, 100);
};

$('#up-level').click(nextSequence);

$('.btn').click(function() {
    userChosenColor = $(this).attr('id');
    // console.log(`userChosenColor : ${userChosenColor}`)
    userClickedPattern.push(userChosenColor);

    animatePress(userChosenColor);
    playSound(`${userChosenColor}`);

    // console.log(`length : ${userClickedPattern.length-1}`)
    // console.log(`randomChosenColor : ${randomChosenColor}`);
    
    checkAnswer(userClickedPattern.length-1);

    
});

const checkAnswer = (currentLevel) => {
    if (userChosenColor[currentLevel] === randomChosenColor[currentLevel]) {
        console.log('pass');
        if (gamePattern.length === userClickedPattern.length) {
            console.log('success');
            setTimeout(() => {
                nextSequence();
            }, 1000);
        };
    } else {
        console.log('wrong');
        return false;
    }

    
};

$('img').click(() => {
    console.log(gamePattern);
    console.log(userClickedPattern);
})