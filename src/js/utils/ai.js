import { TYPE_STABLES, TYPE_TRAINER, TYPE_TRANSPORT } from "./constants";

export function shouldBuyItem (player, item) {

    const playerMoney = player.get('money');
    let toWithdraw = 0;

    if (item.get('type') === TYPE_TRAINER) {
        toWithdraw = 4000;
    } else if (item.get('type') === TYPE_STABLES || item.get('type') === TYPE_TRANSPORT) {
        toWithdraw = 3000;
    } else {
        toWithdraw = item.getIn(['horse', 'initialPrice']);
    }

    if (playerMoney - toWithdraw > 0) {
        // we can actually buy this
        return true;
    }

    return false;
}