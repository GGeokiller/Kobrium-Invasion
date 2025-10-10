import { world, system } from "@minecraft/server";

const ENTITY_ID = "koprium:space_wolf"

world.afterEvents.dataDrivenEntityTrigger.subscribe(ev => {
    const { eventId, entity } = ev;

    if (entity.typeId != ENTITY_ID) { return; }


    if (eventId == "koprium:start_dancing") {
        const { dimension, location } = entity
        dimension.playSound("mob.space_wolf.cover_song", location)
    }
});