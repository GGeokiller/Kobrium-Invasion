import { world, system, Entity, EffectTypes, MolangVariableMap, RawMessageError } from "@minecraft/server";
import { geoParticles } from "../../utils/particle";
import { KOPRIUM_ENTITIES_SPAWN_RATE } from "./data";
import { Random } from "../../utils/random";
import { geo } from "../../utils/geo";

const KOPRIUM_PYLON_ID = "koprium:koprium_pylon"

world.afterEvents.dataDrivenEntityTrigger.subscribe(data => {
    const { entity, eventId } = data
    if (eventId !== "koprium:detect_player") return;
    if (entity.hasTag("spawningKoprium")) return;
    entity.addTag("spawningKoprium")
    entity.dimension.spawnParticle("koprium:detect_player", fixPylonLocation(entity))
    for (let i = 0; i < 10; i++) {
        system.runTimeout(() => {
            spawnRandomKoprium(entity, 5, 24)
        }, 20 * i)
    }
})



function pickEntity() {
    const totalWeight = KOPRIUM_ENTITIES_SPAWN_RATE.reduce((sum, e) => sum + e.weight, 0);
    const r = Math.random() * totalWeight;
    let cumulative = 0;
    for (const entry of KOPRIUM_ENTITIES_SPAWN_RATE) {
        cumulative += entry.weight;
        if (r < cumulative) return entry.entity;
    }
    return KOPRIUM_ENTITIES_SPAWN_RATE[KOPRIUM_ENTITIES_SPAWN_RATE.length - 1].entity;
}

/**
 * @param {Entity} entity
 * @param {Number} minRange
 * @param {Number} maxRange
 */

function spawnRandomKoprium(entity, minRange, maxRange) {
    try {
        const { x, y, z } = entity.location;

        let dx, dy, dz, lenSq;
        do {
            dx = Math.random() * 2 - 1;
            dy = Math.random() * 2 - 1;
            dz = Math.random() * 2 - 1;
            lenSq = dx * dx + dy * dy + dz * dz;
        } while (lenSq > 1 || lenSq === 0); 

        const len = Math.sqrt(lenSq);
        dx /= len;
        dy /= len;
        dz /= len;

        const radius = minRange + Math.random() * (maxRange - minRange);

        const randomLocation = {
            x: x + dx * radius,
            y: y + dy * radius,
            z: z + dz * radius,
        };

        const finalLocation = {
            x : randomLocation.x,
            y : entity.dimension.getTopmostBlock({x: randomLocation.x, z: randomLocation.z}).y + 1,
            z : randomLocation.z
        }

        const entityId = pickEntity();

        let spawnedEntity = entity.dimension.spawnEntity(entityId, finalLocation, {spawnEvent: 'minecraft:entity_spawned'});
        entity.playAnimation("animation.koprium_pylon.spawn_entities")
        entity.dimension.playSound("mob.kobrium_pylon.spawn_entity", fixPylonLocation(entity), {pitch: Random.number(0.8, 1.2), volume: 4})
        /* geoParticles.VectorLine(fixPylonLocation(entity), spawnedEntity.location, "koprium:koprium_pylon_point", entity.dimension.id, 0.5, 0) */
        geoParticles.midDirectionalLineBetween("koprium:koprium_pylon_spawn_line", entity.dimension.id, fixPylonLocation(entity), geo.getEntityCenter(spawnedEntity), Random.number(0.1, 0.3), 0.2, 0.8, 0.2, 1, 10, 3)
    } catch{}
}

/**
 * 
 * @param {Entity} entity 
 */

function fixPylonLocation(entity) {
    return {x: entity.location.x, y: entity.location.y + + (49.5/8), z: entity.location.z}
}