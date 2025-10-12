import { world, system, Entity, ItemStack } from "@minecraft/server";
import {Random} from ".././utils/random"
import { geo } from "../utils/geo";

const FALLEN_STAR_ID = "koprium:fallen_star"
const SPAWN_CHANCE_PER_ITERATION = 1.0

world.afterEvents.entitySpawn.subscribe(data => {
    let {entity} = data
    if (entity?.typeId != FALLEN_STAR_ID) return;
    entity.applyImpulse({x: Random.number(-0.5, 0.5), y: Random.number(-4.5, -1.8), z: Random.number(-0.5, 0.5)})
    let intervalowey = system.runInterval(() => {
        if (!entity.isValid) {
            system.clearRun(intervalowey)
            return;
        }
        entity.applyImpulse({x: Random.number(-0.2, 0.2), y: 0, z: Random.number(-0.2, 0.2)})
    }, 2)
})

system.runInterval(() => {
    if (Math.random() > SPAWN_CHANCE_PER_ITERATION) return;
    let isStarFall = world.getDynamicProperty("isStarFall") ?? false
    if (!isStarFall) return;
    for (const player of world.getPlayers()) {
        if (player.dimension.id != 'minecraft:overworld') continue;
        spawnStar(player)
    }
}, 400)

/**
 * 
 * @param {Entity} entity 
 */
function spawnStar(entity) {
    let randomZX = {x: Random.number(-20, 20), y: 0, z: Random.number(-20, 20)}
    let appenedLocs = geo.sumVectors(entity.location, randomZX)
    let finalLocation = {x: appenedLocs.x, y: 230, z: appenedLocs.z}
    entity.dimension.spawnEntity(FALLEN_STAR_ID, finalLocation)
}

world.afterEvents.projectileHitBlock.subscribe(data => {
    let {projectile } = data
    if (projectile?.typeId != FALLEN_STAR_ID) return;
    let block = data.getBlockHit().block
    block.dimension.spawnItem(new ItemStack("koprium:star", 1), geo.sumVectors(block.center(), {x:0, y:1, z:0}))
})