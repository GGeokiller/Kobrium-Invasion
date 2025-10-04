import { world, system, BlockPermutation, Entity, BlockType } from "@minecraft/server"

import { Random } from "../utils/random.js"
import { distance } from "../utils/vec3.js"

const METEORITE_ID = "kobrium:meteorite"
const BLOCK_POLL = [
        { block: 'minecraft:obsidian', probability: 0.4 },
        { block: 'minecraft:magma', probability: 0.5 },
        { block: 'minecraft:basalt', probability: 1 },
        { block: 'minecraft:diamond_block', probability: 0.1 },
]
world.afterEvents.entitySpawn.subscribe(ev => {
    const { entity } = ev

    if (entity.typeId == METEORITE_ID) {
        console.warn("Hola Meteorito")
        entity.setOnFire(999)

        const randomDirection = {
            x: (Math.random() - 0.5) * 1,
            y: 0,
            z: (Math.random() - 0.5) * 1
        }

        const magnitude = 0.05
        const length = Math.sqrt(randomDirection.x ** 2 + randomDirection.y ** 2 + randomDirection.z ** 2)
        const impulse = {
            x: (randomDirection.x / length) * magnitude,
            y: (randomDirection.y / length) * magnitude,
            z: (randomDirection.z / length) * magnitude
        }

        const systemId = system.runInterval(() => {
            if (entity.isValid) {
                entity.applyImpulse(impulse)
            } else {
                system.clearRun(systemId)
            }
        })
    }
})

const EXPLOSION_RADIUS = 10

world.afterEvents.dataDrivenEntityTrigger.subscribe(ev => {
    const { entity, eventId } = ev

    if (entity.typeId == METEORITE_ID) {
        if (eventId == "kobrium:fall") {
            console.warn("explosion")
            const { dimension, location } = entity

            dimension.createExplosion(location, EXPLOSION_RADIUS-3, { breaksBlocks: true, causesFire: false, source: entity, allowUnderwater: true })

            /* const radius = 8;
            system.run(() => {
                for (let x = -radius; x < radius; x++) {
                    for (let z = -radius; z < radius; z++) {
                        if (x * x + z * z <= radius * radius) {
                            let block = dimension.getBlockBelow({ x: location.x + x, y: location.y, z: location.z + z }, { maxDistance: 10 });
                            if (!block) { return }

                            if (Random.chance(30)) {
                                block.setPermutation(BlockPermutation.resolve('minecraft:smooth_basalt'));

                            } else if (Random.chance(10)) {
                                block.setPermutation(BlockPermutation.resolve('minecraft:nether_gold_ore'));

                            } else if (Random.chance(10)) {
                                block.setPermutation(BlockPermutation.resolve('minecraft:magma'));

                            } else {
                                block.setPermutation(BlockPermutation.resolve('minecraft:netherrack'));
                            }
                            if (Random.chance(5)) {
                                block.above().setPermutation(BlockPermutation.resolve('minecraft:sculk_sensor'));
                            }

                        }
                    }
                }
            });
 */
            
            handleExplosion(entity)

            entity.remove()
        }


    }
})

function pickBlock() {
    const totalWeight = BLOCK_POLL.reduce((sum, entry) => sum + entry.probability, 0)
    const r = Math.random() * totalWeight; 
    let cumulative = 0;

    for (const entry of BLOCK_POLL) {
        cumulative += entry.probability;
        if (r < cumulative) return entry.block;
    }

    return BLOCK_POLL[BLOCK_POLL.length - 1].block;
}

/**
 * 
 * @param {Entity} entity 
 */

function handleExplosion(entity) {
    const RADIUS = EXPLOSION_RADIUS

    for (let x = -RADIUS; x <= RADIUS; x++) {
        for (let y = -RADIUS; y <= RADIUS; y++) {
            for (let z = -RADIUS; z <= RADIUS; z++) {
                const distSq = x * x + y * y + z * z
                if (distSq > RADIUS * RADIUS) continue

                const location = {
                    x: entity.location.x + x,
                    y: entity.location.y + y,
                    z: entity.location.z + z
                }

                const block = entity.dimension.getBlock(location)
                if (!block) continue
                if (block.typeId === 'minecraft:air' ||
                    block.typeId === 'minecraft:water' ||
                    block.typeId === 'minecraft:flowing_water') continue

                if (Math.random() < 0.3) continue
                let blockID = pickBlock()
                entity.dimension.setBlockType(location, blockID)
            }
        }
    }
}


