function updatePlayerUI() {

    document.getElementById("player-hp").textContent =
        `HP : ${player.hp} / ${player.maxHp}`;

    document.getElementById("player-energy").textContent =
        `⚡ ${player.energy}/${player.maxEnergy}　🛡️ ${player.block}`;

}

function updateEnemyUI() {

    document.getElementById("enemy-name").textContent =
        enemy.name;

    document.getElementById("enemy-hp").textContent =
        `HP : ${enemy.hp} / ${enemy.maxHp} 🛡️ ${enemy.block}`;

    const move = enemy.moves[enemy.moveIndex];

    const action = document.getElementById("enemy-action");

    switch(move.type){

        case "attack":
            action.textContent = `⚔️ ${move.value}`;
            break;

        case "block":
            action.textContent = `🛡️ ${move.value}`;
            break;

    }

}

function renderHand() {

    const handDiv = document.getElementById("hand");

    handDiv.innerHTML = "";

    player.hand.forEach((cardId, index) => {

        const card = cards[cardId];

        const cardElement = document.createElement("div");

        cardElement.className = "card";

        cardElement.innerHTML = `
            <h3>${card.name}</h3>
            <p>Cost : ${card.cost}</p>
            <p>${card.description}</p>
        `;

        // カードをクリックしたら使用
        cardElement.addEventListener("click", () => {

            playCard(index);

        });

        handDiv.appendChild(cardElement);

    });

}

function showPopup(title, buttonText){

    document
        .getElementById("popup-title")
        .textContent = title;

    document
        .getElementById("popup-button")
        .textContent = buttonText;

    document
        .getElementById("popup")
        .classList.remove("hidden");

}