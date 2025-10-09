import { world, system } from "@minecraft/server";
import { geo } from "../utils/geo";
import { Random } from "../utils/random";
import { geoParticles } from "../utils/particle";

world.beforeEvents.playerBreakBlock.subscribe(data => {
    let {player, block, itemStack} = data;
    if (itemStack?.typeId !== "koprium:koprium_pickaxe") return;
    if (Math.random() > 0.10) return;
    system.run(() => {
        player.addEffect("haste", Random.int(40, 120), {amplifier: Random.int(0, 4)});
        geoParticles.VectorLine(geo.fixPlayerLocation(player), block.center(), "koprium:koprium_pickaxe_haste", player.dimension.id, 0.1, 0);
    })
});