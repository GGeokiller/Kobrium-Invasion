import { world, system, BlockPermutation, Entity, BlockType, EffectTypes, DimensionTypes, Block } from "@minecraft/server"

import { Random } from "../utils/random.js"
import { distance } from "../utils/vec3.js"
//asd
const METEORITE_ID = "koprium:meteorite"
const BLOCK_POLL = [
    { block: 'koprium:meteorite_stone', probability: 3 },
    { block: 'koprium:meteorite_magma_stone', probability: 1 },
    { block: 'koprium:meteorite_gilded_stone', probability: 0.5 },
    { block: 'koprium:koprium_scrap_block', probability: 0.1 },
]

world.afterEvents.entitySpawn.subscribe(ev => {
    const { entity } = ev

    if (entity.typeId !== METEORITE_ID) return;
    console.warn("Hola Meteorito")
    /*     entity.addEffect(EffectTypes.get('invisibility'), 99999, {showParticles: false})
     */
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
})

const EXPLOSION_RADIUS = 10

world.afterEvents.dataDrivenEntityTrigger.subscribe(ev => {
    const { entity, eventId } = ev

    if (entity.typeId == METEORITE_ID) {
        if (eventId == "koprium:fall") {
            const { dimension, location } = entity
            world.getDimension("overworld").runCommand(`tickingarea add 
                ${entity.location.x + 30} 300 ${entity.location.z + 30}
                ${entity.location.x - 30} 0 ${entity.location.z - 30} cosoid`)
            world.sendMessage(`${entity.location.x + 30}, ${entity.location.y + 30}, ${entity.location.z + 30}, ${entity.location.x - 30} ${entity.location.y - 30} ${entity.location.z - 30}`)
            system.runTimeout(() => {
                console.warn("explosion")
                handleExplosion(entity)
                world.getDimension("minecraft:overworld").runCommand("tickingarea remove_all")
                entity.remove()
            }, 1)
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
 * @param {Entity|Block} entity 
 */

function handleExplosion(entity) {
    try {
        entity.dimension.createExplosion(entity.location, EXPLOSION_RADIUS - 3, { breaksBlocks: true, causesFire: false, source: entity, allowUnderwater: true })
    } catch{}
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

                if (Math.random() < 0.2) continue
                let blockID = pickBlock()
                entity.dimension.setBlockType(location, blockID)
            }
        }
    }
}

world.afterEvents.itemUse.subscribe(data => {
    willFall({x: 750, y: 200, z: -1800}, 5)
})

function willFall(location, time=60*5) {
    world.sendMessage({rawtext: [{translate: "meteorite.coordinates"}, {text: `${zxlocationToString(location)}`}, {translate: "meteorite.time"}, {text: timeToHours(time)}]})
    system.runTimeout(() => {
        falling(location)
    }, time*20)
}
//
function falling(location) {
    world.getDimension("overworld").runCommand(`tickingarea add 
    ${location.x + 30} 300 ${location.z + 30}
    ${location.x - 30} 0 ${location.z - 30} sample`)
    system.runTimeout(() => {
        world.getDimension("minecraft:overworld").runCommand("tickingarea remove_all")
    }, 100)
    let fallBlock = world.getDimension("overworld").getTopmostBlock({x: location.x, z: location.z})
    let nearbyPlayers = world.getDimension("overworld").getEntities({type: 'minecraft:player', maxDistance: 64, location: fallBlock.location})
    let closestPlayer = nearbyPlayers[0]
    if (nearbyPlayers.length != 0) {
        closestPlayer.dimension.spawnEntity(METEORITE_ID, {x: location.x, y: 200, z: location.z})
    } else {
        system.runTimeout(() => {
            handleExplosion(fallBlock)
            world.sendMessage("execute")
            world.getDimension("minecraft:overworld").runCommand("tickingarea remove_all")
        }, 20)
    }

}

function zxlocationToString(location) {
    return `${location.x.toFixed(1)}, ${location.z.toFixed(1)}`
}

/**
 * @param {Number} time // segundos
 * @returns {String} "DD:HH:MM:SS"
 */
function timeToHours(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const pad = (num) => String(num).padStart(2, "0");
    //${pad(days)}d : 
    return `§r§c[${pad(minutes)}m : ${pad(seconds)}s ]`;
}