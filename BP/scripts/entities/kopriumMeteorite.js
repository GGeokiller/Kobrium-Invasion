import {world, system, Entity} from "@minecraft/server"
import {Random} from "../ultis/random"
const METORITE_ID = "kobrium:meteorite"

world.afterEvents.dataDrivenEntityTrigger.subscribe(ev => {
    const { entity, eventId } = ev

    world.sendMessage(`${entity.typeId}`)
    if (entity.typeId == METORITE_ID) {
        /// meteorite fall logic
        world.sendMessage("asdkhjasd")
        meteoriteExplode(entity)
        entity.remove()
    }
})

/**
 * 
 * @param {Entity} entity 
 */

function meteoriteExplode(entity) {
    entity.dimension.createExplosion(entity.location, 5)
}

world.beforeEvents.explosion.subscribe(ev => {
    const { source } = ev
    //world.sendMessage(source.typeId)
    if (source.typeId == 'eu:sculk_tnt') {
        const radius = 4;
        const { dimension, location } = source
        system.run(() => {
            for (let x = -radius; x < radius; x++) {
                for (let z = -radius; z < radius; z++) {
                    if (x * x + z * z <= radius * radius) {
                        let block = dimension.getBlockBelow({ x: location.x + x, y: location.y, z: location.z + z }, { maxDistance: 10 });
                        if (!block) { return }

                        if (Random.int(1, 10) > 1) {
                            block.setPermutation(BlockPermutation.resolve('minecraft:sculk'));

                        } else {
                            block.setPermutation(BlockPermutation.resolve('minecraft:sculk_catalyst'));
                        }
                        if (Random.int(1, 20) == 1) {
                            block.above().setPermutation(BlockPermutation.resolve('minecraft:sculk_sensor'));
                        }

                    }
                }
            }
        });
    }
})