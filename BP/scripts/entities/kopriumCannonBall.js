import { world, system } from "@minecraft/server";
import { geo } from "../utils/geo";

const CANNONBALL_ID = "koprium:koprium_mortar_cannon_ball"

world.afterEvents.dataDrivenEntityTrigger.subscribe(data => {
    let {eventId, entity} = data;
    if (eventId !== "koprium:cannon_ball_fall") return;
    if (entity.typeId !== CANNONBALL_ID) return;
    if (!entity.isValid) return;
    entity.dimension.createExplosion(entity.location, 1, {source: entity})
    entity.remove()
})

world.afterEvents.entitySpawn.subscribe(data => {
    let { entity } = data;
    if (entity.typeId !== CANNONBALL_ID) return;
    system.runTimeout(() => {
        if (!entity.isValid) return;
        entity.clearVelocity();
        let closestPlayer = entity.dimension.getEntities({type: "minecraft:player", location: entity.location, maxDistance: 32})[0];
        if (!closestPlayer) return;
        entity.triggerEvent("koprium:to_player")
        geo.impulseToLocation(entity, closestPlayer.getHeadLocation(), 0.5)
    }, 30)
    system.runTimeout(() => {
        if (!entity.isValid) return;
        entity.remove();
    }, 80)
})