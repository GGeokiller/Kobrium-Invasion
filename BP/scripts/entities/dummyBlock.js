import { world, system } from "@minecraft/server"


const BLOCK_BLACKLIST = [
    "minecraft:water",
    "minecraft:air",
    "minecraft:lava",
    "minecraft:bedrock"
]


world.afterEvents.dataDrivenEntityTrigger.subscribe(ev => {
    const { entity, eventId } = ev

    if (entity.typeId == "eu:dummy_block") {
        if (eventId == "eu:on_ground") {
            //world.sendMessage(" toque piso")
            const { dimension, location } = entity
            const blockTypeId = entity.getDynamicProperty("eu:blockTypeId")
            dimension.setBlockType(location, blockTypeId)
        }

    }
})