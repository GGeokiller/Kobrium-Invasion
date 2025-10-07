import { world, system } from "@minecraft/server";

import { geo } from "../utils/geo";
import { geoParticles } from "../utils/particle";


const ITEM_ID = "koprium:koprium_gravity_gun"

function spawnDummyBlock(dimension, location, blockTypeId) {
    const dummyBlock = dimension.spawnEntity("eu:dummy_block", location)

    dummyBlock.setDynamicProperty("eu:blockTypeId", blockTypeId)
    dummyBlock.runCommand(`replaceitem entity @s slot.weapon.mainhand 0 ${blockTypeId}`)
    return dummyBlock;
}


let SYSTEM_ID;

world.afterEvents.itemStartUse.subscribe(ev => {
    const { itemStack, source } = ev;

    if (itemStack?.typeId !== ITEM_ID) return;

    const { dimension, location } = source

    const block = source.getBlockFromViewDirection({ maxDistance: 5, }).block
    const typeId = block.typeId
    block.setType("minecraft:air")

    system.run(() => {
        const dummyBlock = spawnDummyBlock(dimension, location, typeId)

        SYSTEM_ID = system.runInterval(() => {
            const distance = 3
            const viewDir = source.getViewDirection()
            const finalLocation = {
                x: source.location.x + viewDir.x * distance,
                y: source.location.y + viewDir.y * distance + 1,
                z: source.location.z + viewDir.z * distance
            }
            if (dummyBlock.isValid) {
                geoParticles.VectorLine(geo.sumVectors(source.getHeadLocation(), { x: 0, y: -0.4, z: 0 }), finalLocation, "koprium:gravity_gun_particle", dummyBlock?.dimension?.id, 0.33, 0)
                geo.impulseToLocation(dummyBlock, finalLocation, 1, true)
            }
        })
    })


});



world.afterEvents.itemReleaseUse.subscribe(ev => {
    const { itemStack } = ev;

    if (itemStack?.typeId !== ITEM_ID) return;

    system.clearRun(SYSTEM_ID)

});