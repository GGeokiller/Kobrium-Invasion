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
    },
    /**
     * 
     * @param {String} particleId particle id
     * @param {String} dimenionId dimension id
     * @param {import("@minecraft/server").Vector3} location location
     * @param {import("@minecraft/server").Vector3} direction direction
     * @param {Number} sizeX sizeX
     * @param {Number} sizeY sizeY
     * @param {Number} r red
     * @param {Number} g green
     * @param {Number} b blue
     * @param {Number} a alpha
     * @param {Number} amount amount
     * @param {Number} lifeTime lifeTime
     */
    newDirectionalLine(particleId, dimenionId, location, direction, sizeX, sizeY, r, g, b, a, amount, lifeTime) {
        let molangVariables = new MolangVariableMap();
        molangVariables.setFloat("variable.dir_x", direction.x);
        molangVariables.setFloat("variable.dir_y", direction.y);
        molangVariables.setFloat("variable.dir_z", direction.z);
        molangVariables.setFloat("variable.size_x", sizeX);
        molangVariables.setFloat("variable.size_y", sizeY);
        molangVariables.setFloat("variable.r", r);
        molangVariables.setFloat("variable.g", g);
        molangVariables.setFloat("variable.b", b);
        molangVariables.setFloat("variable.a", a);
        molangVariables.setFloat("variable.amount", amount);
        molangVariables.setFloat("variable.life_time", lifeTime);
        try {
            world.getDimension(dimenionId).spawnParticle(particleId, location, molangVariables);
        } catch {}
    },
    /**
     * 
     * @param {String} particleId particle id
     * @param {String} dimensionId dimension id
     * @param {import("@minecraft/server").Vector3} location1 location1
     * @param {import("@minecraft/server").Vector3} location2 location2
     * @param {Number} sizeY sizeY
     * @param {Number} r red
     * @param {Number} g green
     * @param {Number} b blue
     * @param {Number} a alpha
     * @param {Number} amount amount
     * @param {Number} lifeTime lifeTime
     */
    midDirectionalLineBetween(particleId, dimensionId, location1, location2, sizeY, r, g, b, a, amount, lifeTime) {
    let direction = {
        x: location2.x - location1.x,
        y: location2.y - location1.y,
        z: location2.z - location1.z
    };

    let midPoint = {
        x: (location1.x + location2.x) / 2,
        y: (location1.y + location2.y) / 2,
        z: (location1.z + location2.z) / 2
    };

    let distance = Math.sqrt(
        Math.pow(direction.x, 2) +
        Math.pow(direction.y, 2) +
        Math.pow(direction.z, 2)
    );

    for (let i = 0; i < amount; i += 1) {
        this.newDirectionalLine(
        particleId,
        dimensionId,
        midPoint,
        direction,
        distance/2,
        sizeY,
        r, g, b, a,
        1,
        lifeTime
    );
        }
    }   
}

// variable.dir_x;variable.dir_y;variable.dir_z;variable.size_x;variable.size_y;variable.r;variable.g;variable.b;variable.a;variable.amount;variable.life_time;