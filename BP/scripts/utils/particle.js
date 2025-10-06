import { world, system, MolangVariableMap, Entity, DimensionType } from "@minecraft/server";

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

export const geoParticles = {
    /**
     * 
     * @param {Location} location1 
     * @param {Location} location2 
     * @param {string} particleId 
     * @param {DimensionType|String} dimensionId 
     * @param {Number} steps 
     * @param {number} time 
     */
    VectorLine(location1,  location2,  particleId,  dimensionId,  steps,  time) {
        let distance = Math.sqrt(
            Math.pow(location2.x - location1.x, 2) +
            Math.pow(location2.y - location1.y, 2) +
            Math.pow(location2.z - location1.z, 2)
        );

        let incrementX = (location2.x - location1.x) / distance;
        let incrementY = (location2.y - location1.y) / distance;
        let incrementZ = (location2.z - location1.z) / distance;

        for (let i = 0; i <= distance; i += steps) {
                let x3 = location1.x + incrementX * i;
                let y3 = location1.y + incrementY * i;
                let z3 = location1.z + incrementZ * i;
                let location3 = { x: x3, y: y3, z: z3 };
                system.runTimeout(() => {
                    try {
                        world.getDimension(dimensionId).spawnParticle(particleId, location3);
                    } catch {}
            }, i * time);
        }
    }
}

/* world.afterEvents.itemUse.subscribe(data => {
    createAreaParticle(data.source, data.source.location, 10)
}) */