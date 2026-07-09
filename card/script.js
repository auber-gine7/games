// ======================
// プレイヤー
// ======================

const player = structuredClone(characters.warrior);

player.hp = player.maxHp;
player.energy = player.maxEnergy;
player.block = 0;

// ======================
// 敵
// ======================

const enemy = structuredClone(enemies.slime);

enemy.hp = enemy.maxHp;
enemy.block = 0;
enemy.moveIndex = 0;

// ======================
// デッキ
// ======================

player.drawPile = shuffle([...player.starterDeck]);
player.discardPile = [];
player.hand = [];

// ======================
// 初期表示
// ======================

updatePlayerUI();
updateEnemyUI();

drawCards(5);

document
    .getElementById("end-turn")
    .addEventListener("click", endTurn);