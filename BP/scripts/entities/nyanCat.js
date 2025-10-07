import { world, system } from "@minecraft/server";

const ENTITY_ID = "koprium:alien_cat"

world.afterEvents.dataDrivenEntityTrigger.subscribe(ev => {
    const { eventId, entity } = ev;

    if (entity.typeId != ENTITY_ID) { return; }


    if (eventId == "koprium:start_dancing") {
        const { dimension, location } = entity
        dimension.playSound("mob.alien_cat.cover_song", location)
    }
});