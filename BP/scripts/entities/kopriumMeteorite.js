import {world, system} from "@minecraft/server"

const METORITE_ID = "koprium:meteorite"

world.afterEvents.dataDrivenEntityTrigger.subscribe(ev => {
    const { entity, eventId } = ev

    if (entity.typeId == METORITE_ID) {
        /// meteorite fall logic

    }
})