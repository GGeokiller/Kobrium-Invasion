import { world } from "@minecraft/server";

const BLOCK_ID = "koprium:koprium_teleport_pad";
const MAX_SCAN = 16;


function findNextPad(dim, startX, startY, startZ, dy) {
    let y = startY;
    for (let i = 0; i < MAX_SCAN; i++) {
        y += dy;
        const b = dim.getBlock({ x: startX, y, z: startZ });
        if (!b) break;
        if (b.typeId == BLOCK_ID) {
            return b;
        }
    }
    return null;
}

function tpOnTop(player, dim, blockLoc) {

    //player.clearVelocity();
    player.teleport(blockLoc, { dimension: dim });
    player.playSound("mob.endermen.portal");

}

world.afterEvents.playerButtonInput.subscribe(ev => {
    const { button, newButtonState, player } = ev;
    if (newButtonState != "Pressed") return;

    const isJump = button == "Jump";
    const isSneak = button == "Sneak";

    if (!isJump && !isSneak) return;

    const under = player.dimension.getBlock({ x: player.location.x, y: player.location.y - 1, z: player.location.z });

    if (!under || under.typeId != BLOCK_ID) return;

    const dim = player.dimension;
    const { x, y, z } = under.location;

    const dir = isJump ? 1 : -1;
    const padBlock = findNextPad(dim, x, y, z, dir);


    if (!padBlock) return;

    const padLocation = padBlock.above().center()
    tpOnTop(player, dim, padLocation);
});
