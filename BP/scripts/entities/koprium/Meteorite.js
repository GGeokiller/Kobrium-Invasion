import { world, system, BlockPermutation, Entity, BlockType, EffectTypes, DimensionTypes, Block, PlaceJigsawError, EffectType, ScriptEventCommandMessageAfterEvent } from "@minecraft/server"

import { Random } from "../../utils/random.js"
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
    console.warn("§aHola Meteorito")
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
                ${entity.location.x + 50} 300 ${entity.location.z + 50}
                ${entity.location.x - 50} 0 ${entity.location.z - 50} cosoid`)
            system.runTimeout(() => {
                console.warn("§aExplosion")
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
    } catch { }
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
    entity.dimension.spawnEntity("koprium:alien_wandering_trader", { x: entity.location.x, y: entity.location.y + 1, z: entity.location.z })
    entity.dimension.spawnEntity("koprium:alien_cat", { x: entity.location.x, y: entity.location.y + 1, z: entity.location.z })
    entity.dimension.spawnEntity("koprium:alien_cat", { x: entity.location.x, y: entity.location.y + 1, z: entity.location.z })
    entity.dimension.spawnEntity("koprium:moon_cow", { x: entity.location.x, y: entity.location.y + 1, z: entity.location.z })
    entity.dimension.spawnEntity("koprium:moon_cow", { x: entity.location.x, y: entity.location.y + 1, z: entity.location.z })
}

/// {MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE
/// MENTAL ILLNESS STARTING HERE}


system.runInterval(() => {
    let timeOfDay = world.getTimeOfDay()
    if (timeOfDay > 12000) {
        if (!world.getDynamicProperty("dayset")) {
            world.setDynamicProperty("dayset", false)
        }
        if (world.getDynamicProperty("dayset") == true) return;
        let randomX = Random.number(-5000, 5000)
        let randomZ = Random.number(-5000, 5000)
        willFall({ x: Math.floor(randomX), y: 200, z: Math.floor(randomZ) }, 30)
        world.setDynamicProperty("dayset", true)
    } else {
        world.setDynamicProperty("dayset", false)
    }
})

function willFall(location, time = 60 * 5) {
    world.sendMessage({ rawtext: [{ text: "§c<< ! >>\n" }, { translate: "meteorite.coordinates" }, { text: `${zxlocationToString(location)} ` }, { translate: "meteorite.time" }, { text: timeToHours(time) }, { text: "\n<< ! >>" }] })
    system.runTimeout(() => {
        falling2(location)
    }, time * 20)
}
//
// function falling(location) {
//     world.getDimension("overworld").runCommand(`tickingarea add 
//     ${location.x + 50} 300 ${location.z + 50}
//     ${location.x - 50} 0 ${location.z - 50} sample`)
//     let randomPlayer = world.getPlayers()[0]
//     let randomPlayerLocation = randomPlayer.location
//     let randomPlayerDimension = randomPlayer.dimension
//     randomPlayer.teleport({ x: location.x, y: 80, z: location.z }, { dimension: DimensionTypes.get('overworld') })
//     randomPlayer.addEffect(EffectTypes.get('resistance'), 20, { amplifier: 5, showParticles: false })
//     system.runTimeout(() => {
//         randomPlayer.teleport(randomPlayerLocation, { dimension: randomPlayerDimension })
//     }, 50)
//     system.runTimeout(() => {
//         world.getDimension("minecraft:overworld").runCommand("tickingarea remove_all")
//     }, 100)
//     system.runTimeout(() => {
//         let fallBlock = world.getDimension("overworld").getTopmostBlock({ x: location.x, z: location.z })
//         world.sendMessage(`${JSON.stringify(fallBlock.location)}`)
//         let nearbyPlayers = world.getDimension("overworld").getEntities({ type: 'minecraft:player', maxDistance: 64, location: fallBlock.location })
//         let closestPlayer = nearbyPlayers[0]
//         if (nearbyPlayers.length != 0) {
//             closestPlayer.dimension.spawnEntity(METEORITE_ID, { x: location.x, y: 200, z: location.z })
//         } else {
//             system.runTimeout(() => {
//                 handleExplosion(fallBlock)
//                 //fallBlock.dimension.spawnEntity("koprium:alien_wandering_trader", { x: location.x, y: location.y + 1, z: location.z })
//                 system.runTimeout(() => {
//                     world.getDimension("minecraft:overworld").runCommand("tickingarea remove_all")
//                 }, 50)
//             }, 20)
//         }
//     }, 100)
// }

/**
 * 
 * @param {import("@minecraft/server").Vector3} location 
 */

function falling2(location) {
    world.sendMessage({ rawtext: [{ text: "§c<< ! >>\n" }, { translate: "meteorite.is_falling" }, { text: `${zxlocationToString(location)} ` }, { text: "\n<< ! >>" }] })
    let overworld = world.getDimension("overworld")
    overworld.runCommand(`tickingarea add 
    ${location.x + 50} 300 ${location.z + 50}
    ${location.x - 50} 0 ${location.z - 50} sample`);

    let randomPlayer = world.getPlayers()[0]
    let tickingDummy = randomPlayer.dimension.spawnEntity("koprium:ticking_dummy", randomPlayer.location)
    let tickingDummyLocation = tickingDummy.location
    let tickingDummyDimension = tickingDummy.dimension

    tickingDummy.teleport(location, { dimension: overworld })

    let systemSet = system.runInterval(() => {
        let topBlock = overworld.getTopmostBlock({ x: location.x, z: location.z })
        if (!topBlock || topBlock.location.y == 319) {
            console.warn(`§g[falling2] No block found at X:${location.x}, Z:${location.z}`)
        } else {
            system.clearRun(systemSet)
            system.clearJob(systemSet)
            console.warn(`§a[falling2] Block found, returning Ticking Dummy (waiting 10 seconds to load chunks)`)
            for (let i = 0; i < 10; i++) { system.runTimeout(() => { console.warn(`... ${i} ...`) }, i * 20) }
            console.warn(`§a[falling2] Top Block at ${zyxlocationToString(topBlock.location)}`)

            system.runTimeout(() => {
                console.warn(`§a[falling2] Chunks loaded successfully`)
                let nearbyPlayers = world.getDimension("overworld").getEntities({
                    type: 'minecraft:player',
                    maxDistance: 64,
                    location: topBlock.location
                })
                let closestPlayer = nearbyPlayers[0]

                /// SI HAY JUGADOR CERCA
                if (nearbyPlayers.length != 0) {
                    console.warn(`§a[falling2] Player detected nearby, spawning meteorite`)
                    closestPlayer.dimension.spawnEntity(METEORITE_ID, { x: location.x, y: 200, z: location.z })
                    /// SI NO LO HAY
                } else {
                    console.warn(`§a[falling2] No player nearby, handling explosion manually`)
                    handleExplosion(topBlock)
                    console.warn(`§a[falling2] Explosion process maybe worked`)
                    system.runTimeout(() => {
                        world.getDimension("minecraft:overworld").runCommand("tickingarea remove_all")
                        console.warn(`§a[falling2] All ticking areas removed`)
                    }, 50)
                }
                system.runTimeout(() => {
                    tickingDummy.remove()
                    console.warn(`§a[falling2] Ticking Dummy removed`)
                }, 100)
            }, 200)
        }
    })
}


function zxlocationToString(location) {
    return `[x: ${location.x.toFixed(1)}, z: ${location.z.toFixed(1)}]`
}

function zyxlocationToString(location) {
    return `[x: ${location.x.toFixed(1)}, y: ${location.y.toFixed(1)}, z: ${location.z.toFixed(1)}]`
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