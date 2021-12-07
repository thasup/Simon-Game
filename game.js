const buttonColors = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];

const nextSequence = () => {
    const generateRandomNumber = (min, max) =>  {
        return Math.floor(Math.random() * (max - min) + min);
    };

    let randomNumber = generateRandomNumber(3, 0);

    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100);

    const playSound = (name) => {
        let audio = new Audio(`./sounds/${name}.mp3`);
        audio.play();
    };

    playSound(`${randomChosenColor}`);
};

$('.btn').click(() => {
    let userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);

    playSound(`${userChosenColor}`);
});

const animatePress = (currentColor) => {
    $(this).addClass('pressed');

    setTimeout((
        $(this).removeClass('pressed')
    ), 100);
};