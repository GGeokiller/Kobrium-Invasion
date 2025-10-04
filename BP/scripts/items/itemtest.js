import { world } from "@minecraft/server"


function spawnDummyBlock(dimension, location, blockTypeId) {
    const dummyBlock = dimension.spawnEntity("eu:dummy_block", location)

    dummyBlock.setDynamicProperty("eu:blockTypeId", blockTypeId)
    dummyBlock.runCommand(`replaceitem entity @s slot.weapon.mainhand 0 ${blockTypeId}`)
    return dummyBlock;
}

//Prueba esta cosa geo es divertido spawnear bloques con gravedad XD
world.afterEvents.itemUse.subscribe(ev => {
    const { itemStack, source } = ev

    if (itemStack.typeId == "minecraft:stick") {

        const { dimension, location } = source
        const belowBlock = dimension.getBlockBelow(location, { maxDistance: 20 })
        spawnDummyBlock(dimension, location, belowBlock.typeId)
    }
})