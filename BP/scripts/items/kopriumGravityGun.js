import {world, system, PlayerAimAssist, PaletteColor} from "@minecraft/server"
import { getLocalCoordinates } from "../utils/vec3";
import { geo } from "../utils/geo";
import { geoParticles } from "../utils/particle";
import { Random } from "../utils/random";

let KOPRIUM_GRABVITY_GUN_ID = "koprium:koprium_gravity_gun"
const BLOCK_BLACK_LIST = [
  "minecraft:bedrock",
  "minecraft:barrier",
  "minecraft:mob_spawner",
  "minecraft:chest",
  "minecraft:barrel",
  "minecraft:reinforced_deepslate",
  "minecraft:end_portal_frame",
  "minecraft:torch",
  "minecraft:soul_torch"
];

const ENTITIES_BLACK_LIST = [
    "minecraft:player",
    "minecraft:warden"
]

function spawnDummyBlock(dimension, location, blockTypeId) {
    try {
        const dummyBlock = dimension.spawnEntity("eu:dummy_block", location)

        dummyBlock.setDynamicProperty("eu:blockTypeId", blockTypeId)
        dummyBlock.runCommand(`replaceitem entity @s slot.weapon.mainhand 0 ${blockTypeId}`)
        return dummyBlock;
    }catch{}
}


world.afterEvents.itemStartUse.subscribe(data => {
    let {itemStack, useDuration, source: player} = data
    try {
        if (itemStack?.typeId != KOPRIUM_GRABVITY_GUN_ID) return;
        let hitEntity;
        hitEntity = player?.getEntitiesFromViewDirection({maxDistance: 7})[0]?.entity
        if (!hitEntity) {
            let block = player.getBlockFromViewDirection({ maxDistance: 7, })?.block
            if (BLOCK_BLACK_LIST.includes(block?.typeId)) {return}
            hitEntity = spawnDummyBlock(player.dimension, block.location, block?.typeId)
            if (hitEntity) {
                player.dimension.setBlockType(block.location, "minecraft:air")
            }
        }
        if (!hitEntity || hitEntity?.typeId == "minecraft:player") {console.warn("No block or entity"); return;}
        loopImpulse(hitEntity, player, Random.int(0, 10000))
     } catch{}
})

function loopImpulse(hitEntity, player, randomID) {
    randomID = system.runInterval(() => {
            let distance = 6
            let viewDir = player.getViewDirection()
            let finalLocation = {
                x: player.location.x + viewDir.x * distance,
                y: player.location.y + viewDir.y * distance + 1,
                z: player.location.z + viewDir.z * distance
            }
            if (hitEntity.isValid) {
                geoParticles.VectorLine(geo.sumVectors(player.getHeadLocation(), {x: 0, y: -0.4, z: 0}), finalLocation, "koprium:gravity_gun_particle", hitEntity?.dimension?.id, 0.33, 0)
                geo.impulseToLocation(hitEntity, finalLocation, 1, true)
                
            }
        })
        world.afterEvents.itemReleaseUse.subscribe(data => {
            let {itemStack: releaseItem, source: player2} = data
            if (releaseItem?.typeId != KOPRIUM_GRABVITY_GUN_ID || player2.name != player.name) return;
            try {
                system.clearRun(randomID)
                hitEntity?.clearVelocity()
            } catch{}
    })
}