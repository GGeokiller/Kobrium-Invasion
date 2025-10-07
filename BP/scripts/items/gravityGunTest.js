import { world, system, BlockPermutation, ItemComponentTypes } from "@minecraft/server";

import * as Vec3 from "../utils/vec3"


const ITEM_ID = "koprium:test_gun"

function spawnDummyBlock(dimension, location, blockTypeId) {
    const dummyBlock = dimension.spawnEntity("eu:dummy_block", location)

    dummyBlock.setDynamicProperty("eu:blockTypeId", blockTypeId)
    dummyBlock.runCommand(`replaceitem entity @s slot.weapon.mainhand 0 ${blockTypeId}`)
    return dummyBlock;
}


let SYSTEM_ID;


function getLocalCoordinates(player, distance = 5) {
    const origin = player.location;
    const view = player.getViewDirection();

    return {
        x: origin.x + view.x * distance,
        y: origin.y + view.y * distance,
        z: origin.z + view.z * distance
    };
}



function applyImpulseToward(entity, targetPosition, strength = 0.5) {
    const origin = entity.location;

    const direction = {
        x: targetPosition.x - origin.x,
        y: targetPosition.y - origin.y,
        z: targetPosition.z - origin.z
    };

    const magnitude = Math.sqrt(direction.x ** 2 + direction.y ** 2 + direction.z ** 2);
    if (magnitude === 0) return;

    const normalized = {
        x: direction.x / magnitude,
        y: direction.y / magnitude,
        z: direction.z / magnitude
    };

    const impulse = {
        x: normalized.x * strength,
        y: normalized.y * strength,
        z: normalized.z * strength
    };

    entity.applyImpulse(impulse);
}


world.afterEvents.itemStartUse.subscribe(ev => {
    const { itemStack, source, useDuration } = ev;

    if (itemStack?.typeId !== ITEM_ID) return;

    const { dimension, location } = source

    const block = source.getBlockFromViewDirection({ maxDistance: 5 }).block
    const typeId = block.typeId
    block.setType("minecraft:air")




    system.run(() => {
        const dummyBlock = spawnDummyBlock(dimension, getLocalCoordinates(source, 3), typeId)


        SYSTEM_ID = system.runInterval(() => {

            const localCoordinates = getLocalCoordinates(source, 3)

            //source.applyImpulse({ x: 0, y: 0, z: 0 })

            //applyImpulseToward(dummyBlock, localCoordinates)
            //dummyBlock.teleport(localCoordinates)
            //console.warn(block.typeId)
        })
        world.sendMessage("Inicio para mi " + useDuration)
    })


});



world.afterEvents.itemReleaseUse.subscribe(ev => {
    const { itemStack, source, useDuration } = ev;

    if (itemStack?.typeId !== ITEM_ID) return;

    system.clearRun(SYSTEM_ID)

    console.warn("Termino para mi " + useDuration)

});