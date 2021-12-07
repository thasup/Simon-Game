let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];

const nextSequence = () => {
    const generateRandomNumber = (min, max) =>  {
        return Math.floor(Math.random() * (max - min) + min);
    };

    let randomNumber = generateRandomNumber(3, 0);

    let randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
};

nextSequence();