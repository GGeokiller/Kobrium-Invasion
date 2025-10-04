import { world, system, MolangVariableMap, Entity } from "@minecraft/server";

/**
 * 
 * @param {Entity} entity 
 * @param {Location} location 
 * @param {Number} area 
 */

export function createAreaParticle(entity, location, area) {
    let info = new MolangVariableMap()
    info.setFloat("variable.size", area)
    entity.dimension.spawnParticle("koprium:test", location, info)
}

/* world.afterEvents.itemUse.subscribe(data => {
    createAreaParticle(data.source, data.source.location, 10)
}) */