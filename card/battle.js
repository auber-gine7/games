function shuffle(array) {

    for (let i = array.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

function drawCards(amount) {

    for (let i = 0; i < amount; i++) {

        if (player.drawPile.length === 0) {

            player.drawPile = shuffle([...player.discardPile]);
            player.discardPile = [];
        }

        if (player.drawPile.length === 0) {
            return;
        }

        const cardId = player.drawPile.pop();
        player.hand.push(cardId);
    }

    renderHand();
}

function playCard(index) {

    const cardId = player.hand[index];
    const card = cards[cardId];

    // エネルギー不足
    if (player.energy < card.cost) {
        return;
    }

    // エネルギー消費
    player.energy -= card.cost;

    // カード効果
    switch (card.type) {

        case "attack": {

            let damage = card.damage;

            if (enemy.block >= damage) {

                enemy.block -= damage;

            } else {

                damage -= enemy.block;
                enemy.block = 0;

                enemy.hp -= damage;

                if (enemy.hp < 0) {
                    enemy.hp = 0;
                }

            }

            break;
        }

            case "defense":

        player.block += card.block;

        break;

    case "skill":

        if(card.energy){
            player.energy += card.energy;
        }

        break;

}

    // 捨て札へ送る
    player.hand.splice(index, 1);
    player.discardPile.push(cardId);

    // UI更新
    updatePlayerUI();
    updateEnemyUI();
    renderHand();

    checkBattleEnd();
}

function enemyTurn() {

    enemy.block = 0;

    const move = enemy.moves[enemy.moveIndex];

    switch(move.type){

case "attack":

    let damage = move.value;

    if(player.block >= damage){

        player.block -= damage;

    }else{

        damage -= player.block;

        player.block = 0;

        player.hp -= damage;

        if(player.hp < 0){
            player.hp = 0;
        }

    }

    break;

        case "block":

            enemy.block += move.value;

            break;

    }

    enemy.moveIndex++;

    if(enemy.moveIndex >= enemy.moves.length){
        enemy.moveIndex = 0;
    }

    checkBattleEnd();

}

function endTurn(){

    // 手札を全部捨てる
    player.discardPile.push(...player.hand);
    player.hand = [];

    // 敵ターン
    enemyTurn();

    // 敵ターン終了後にブロックが消える
    player.block = 0;

    // エネルギー回復
    player.energy = player.maxEnergy;

    // ドロー
    drawCards(5);

    // UI更新
    updatePlayerUI();
    updateEnemyUI();

}

function checkBattleEnd(){

    if(enemy.hp <= 0){

        showPopup("Victory!", "次へ");

        return;
    }

    if(player.hp <= 0){

        showPopup("Game Over", "タイトルへ");

        return;
    }

}