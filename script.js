const games = [
    {
        id: 1,
        name: "Hollow Knight",
        developer: "Team Cherry",
        genre: ["Action", "Platformer", "Metroidvania"],
        releaseDate: "2017-02-24",
        description: `Hollow Knight is a classically styled 2D action
        adventure across a vast interconnected world. Explore twisting caverns,
        ancient cities and deadly wastes; battle tainted creatures and befriend
        Bizarre bugs; and solve ancient mysteries at the kingdom's heart."`,
        coverImage: "images/games/hollow-knight.jpg",
        totalAchievements: 63
    },

    {
        id: 2,
        name: "Coffee Talk",
        developer: "Toge Productions",
        genre: ["Visual Novel", "Story Rich", "Pixel"],
        releaseDate: "2020-01-30",
        description: `Coffee Talk is a game about listening to people's problems
        and helping them by serving up a warm drink out of the ingredients you have in
        stock. It is a game that depicts lives as humanly as possible, while having a
        cast that is more than just humans.`,
        coverImage: "images/games/coffee-talk.jpg",
        totalAchievements: 20
    },

    {
        id: 3,
        name: "Celeste",
        developer: "Maddy Makes Games Inc.",
        genre: ["Action", "Platformer", "Pixel"],
        releaseDate: "2018-01-25",
        description: `Help Madeline survive her inner demons on her journey to the
        top of Celeste Mountain, in this super-tight, hand-crafted platformer from
        the creators of multiplayer classic TowerFall.`,
        coverImage: "images/games/celeste.jpg",
        totalAchievements: 30
    }
];

const achievements = [
    {
        id: 1,
        gameId: 1,
        name: "Falsehood",
        description: "Defeat the False Knight",
        type: "game"
    },

    {
        id: 2,
        gameId: 1,
        name: "Test of Resolve",
        description: "Defeat Hornet in Greenpath",
        type: "game"
    }
]

const userAchievements = [
    {
        userId: 1,
        achievementId: 1,
        unlockedAt: "2026-08-22"
    },
    {
        userId: 1,
        achievementId: 2,
        unlockedAt: "2026-08-22"
    }
]

function getUserGameProgress(userId, gameId) {
    const gameAchievements = achievements.filter(function (achievement) {
        return achievement.gameId === gameId;
    });

    const unlockedAchievements = userAchievements.filter(function (userAchievement) {
        return userAchievement.userId === userId &&
            gameAchievements.some(function (achievement) {
                return achievement.id === userAchievement.achievementId;
            });
    });

    return unlockedAchievements.length;
}

console.log(getUserGameProgress(1, 1));

const hollowKnightAchievements = achievements.filter(function (achievement) {
    return achievement.gameId === 1;
});

console.log(hollowKnightAchievements);

const unlockedAchievements = userAchievements.filter(function (userAchievement) {
    return userAchievement.userId === 1;
});

console.log(unlockedAchievements);

function getGameAchievements(gameId) {
    return achievements.filter(function(achievement) {
        return achievement.gameId === gameId;
    });
}

console.log(getGameAchievements(1));

function getUserAchievements(userId, gameId) {
    const gameAchievements = getGameAchievements(gameId);

    return gameAchievements.map(function (achievement) {
        const unlocked = userAchievements.some(function (userAchievement) {
            return userAchievement.userId === userId &&
                userAchievement.achievementId === achievement.id;
        });

        return {
            ...achievement,
            unlocked: unlocked
        };
    });
}

console.log(getUserAchievements(1, 1));

function renderAchievements(userId, gameId) {
    const gameAchievements = getUserAchievements(userId, gameId);

    let html = "";

    for (const achievement of gameAchievements) {
        html += `
            <div class="achievement-item">
                <h3>${achievement.name}</h3>
                <p>${achievement.description}</p>
                <p>${achievement.unlocked ? "✓ Unlocked" : "🔒 Locked"}</p>
            </div>
        `;
    }
    
    return html;
}

console.log(renderAchievements(1, 1));

const gameList = document.querySelector(".game-list");

function createGameCard(game) {
    const unlockedCount = getUserGameProgress(1, game.id);
    const completion = unlockedCount / game.totalAchievements * 100;

    const gameCard = document.createElement("div");
    gameCard.classList.add("game-card");
    gameCard.dataset.gameId = game.id;

    const gameTitle = document.createElement("h3");
    gameTitle.textContent = game.name;

    const achievementText = document.createElement("p");
    achievementText.textContent = 
    `Achievements: ${unlockedCount} / ${game.totalAchievements}`;
    
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

function showGameDetail(game) {
    const unlockedCount = getUserGameProgress(1, game.id);
    const completion = unlockedCount / game.totalAchievements * 100;

    gameModal.style.display = "flex";

    gameModalDetail.innerHTML = `
        <img src="${game.coverImage}" alt="${game.name}">

            <h2>${game.name}</h2>

            <p><strong>Developer:</strong> ${game.developer}</p>

            <p><strong>Genre:</strong> ${game.genre.join(", ")}</p>

            <p><strong>Release Date:</strong> ${game.releaseDate}</p>

            <p>${game.description}</p>

            <p>Achievements: ${unlockedCount} / ${game.totalAchievements}</p>

            <p>Completion: ${completion.toFixed(2)}%</p>

            <div class="achievement-list">
                ${renderAchievements(1, game.id)}
            </div>
        `; 
}

for (const game of games) {
    const gameCard = createGameCard(game);
    gameList.appendChild(gameCard);

    gameCard.addEventListener("click", function() {
        showGameDetail(game);
    });

    closeButton.addEventListener("click", function() {
    gameModal.style.display = "none";
    });
};