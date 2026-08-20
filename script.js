const games = [
    {
        name: "Hollow Knight",
        achievements: 45,
        totalAchievements: 63,
    },
    {
        name: "Minecraft",
        achievements: 72,
        totalAchievements: 122,
    },
    {
        name: "Celeste",
        achievements: 25,
        totalAchievements: 30,
    }
];

for (const game of games) {
    const completion = game.achievements / game.totalAchievements * 100;
    
    console.log(game.name);
    console.log(completion.toFixed(2));
}

const gameList = document.querySelector(".game-list");

for (const game of games) {

    const completion = game.achievements / game.totalAchievements * 100;

    // Game Card
    const gameCard = document.createElement("div");
    gameCard.classList.add("game-card");

    // Game Title
    const gameTitle = document.createElement("h3");
    gameTitle.textContent = game.name;

    // Achievement Text
    const achievementText = document.createElement("p");
    achievementText.textContent = `Achievements: ${game.achievements} / ${game.totalAchievements}`;

    // Progress Bar Container
    const progressBar = document.createElement("div");
    progressBar.classList.add("progress-bar");

    // Progress
    const progress = document.createElement("div");
    progress.classList.add("progress");

    progress.style.width = completion + "%";

    // Completion Text
    const completionText = document.createElement("p");
    completionText.classList.add("progress-text");
    completionText.textContent = `Completion: ${completion.toFixed(2)}%`;

    // Progress to progress bar
    progressBar.appendChild(progress);

    // All game card
    gameCard.appendChild(gameTitle);
    gameCard.appendChild(achievementText);
    gameCard.appendChild(progressBar);
    gameCard.appendChild(completionText);

    // Game card to game list
    gameList.appendChild(gameCard);
}

function showGame(game) {
    console.log(game.name);
    console.log(game.achievements);
    console.log(game.totalAchievements);
}

showGame(games[0]);
showGame(games[1]);
showGame(games[2]);

function createGameCard(game) {
    
}