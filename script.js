const games = [
    {
        id: 1,
        name: "Hollow Knight",
        achievements: 45,
        totalAchievements: 63,
    },
    {
        id: 2,
        name: "Minecraft",
        achievements: 72,
        totalAchievements: 122,
    },
    {
        id: 3,
        name: "Celeste",
        achievements: 25,
        totalAchievements: 30,
    }
];

const gameList = document.querySelector(".game-list");

function createGameCard(game) {
    const completion = game.achievements / game.totalAchievements * 100;

    const gameCard = document.createElement("div");
    gameCard.classList.add("game-card");
    gameCard.dataset.gameId = game.id;

    const gameTitle = document.createElement("h3");
    gameTitle.textContent = game.name;

    const achievementText = document.createElement("p");
    achievementText.textContent = 
    `Achievements: ${game.achievements} / ${game.totalAchievements}`;
    
    const progressBar = document.createElement("div");
    progressBar.classList.add("progress-bar");

    const progress = document.createElement("div");
    progress.classList.add("progress");

    progress.style.width = completion + "%";

    const completionText = document.createElement("p");
    completionText.classList.add("progress-text");
    completionText.textContent = `Completion: ${completion.toFixed(2)}%`;

    progressBar.appendChild(progress);

    gameCard.appendChild(gameTitle);
    gameCard.appendChild(achievementText);
    gameCard.appendChild(progressBar);
    gameCard.appendChild(completionText);

    return gameCard;
};

const gameModal =  document.querySelector(".game-modal");
const modalContent = document.querySelector(".modal-content");
const gameModalDetail = document.querySelector(".game-modal-detail");
const closeButton = document.querySelector(".close-button");
const themeButton = document.querySelector(".theme-button");

themeButton.addEventListener("click", function() {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        themeButton.textContent = "☀️";
    } else {
        themeButton.textContent = "🌙";
    }
});

for (const game of games) {
    const gameCard = createGameCard(game);
    gameList.appendChild(gameCard);

    gameCard.addEventListener("click", function() {
        const gameId = this.dataset.gameId;

        const game = games.find(function (game) {
            return game.id == gameId;
        });

        gameModal.style.display = "flex";

        gameModalDetail.innerHTML = "";

        const title = document.createElement("h3");
        title.textContent = game.name;
        gameModalDetail.appendChild(title);

        const achievementText = document.createElement("p");
        achievementText.textContent = 
        `Achievements: ${game.achievements} / ${game.totalAchievements}`;
        gameModalDetail.appendChild(achievementText);

        const progressBar = document.createElement("div");
        progressBar.classList.add("progress-bar");

        const progress = document.createElement("div");
        progress.classList.add("progress");

        progress.style.width =
        (game.achievements / game.totalAchievements * 100) + "%";

        progressBar.appendChild(progress);

        gameModalDetail.appendChild(progressBar);

        const completionText = document.createElement("p");
        completionText.textContent = 
        `Completion: ${(game.achievements / game.totalAchievements * 100).toFixed(2)}%`;
        gameModalDetail.appendChild(completionText);
    });

    closeButton.addEventListener("click", function() {
    gameModal.style.display = "none";
    });
};