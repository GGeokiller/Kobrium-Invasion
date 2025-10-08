import { world, system, Entity } from "@minecraft/server";
import { KOPRIUM_MORTAR_ID } from "./data.js";
import { Random } from "../../utils/random.js";
import { geo } from "../../utils/geo.js";

world.afterEvents.dataDrivenEntityTrigger.subscribe(data => {
    let { eventId, entity } = data;
    if (eventId !== "koprium:mortar_has_target") return;
    if (entity.typeId !== KOPRIUM_MORTAR_ID) return;

    let target = entity.target ?? entity.dimension.getEntities({
        type: "minecraft:player",
        location: entity.location,
        maxDistance: 32
    })[0];
    if (!target) return;
    spawnCannonBalls(entity, Random.int(2,4))
});

/**
 * 
 * @param {Entity} entity 
 * @param {Number} amount 
 */

function spawnCannonBalls (entity, amount) {
    for (let i = 0; i < amount; i++) {
        system.runTimeout(() => { 
            let cannonBall = entity.dimension.spawnEntity("koprium:koprium_mortar_cannon_ball", geo.sumVectors(entity.location, { x: 0, y: 2, z: 0 }));
            cannonBall.applyImpulse({x: Random.number(-1, 1), y: 1, z: Random.number(-1, 1)});
            entity.dimension.spawnParticle("koprium:koprium_mortar_shoot", geo.sumVectors(entity.location, { x: 0, y: 1, z: 0 }))
            entity.playAnimation("animation.koprium_mortar.shoot")
            entity.dimension.playSound("entity.koprium_mortar.shoot", entity.location, { volume: 1, pitch: Random.number(0.8, 1.2) });
        }, i * 20);
    }
}
