import { world, system } from "@minecraft/server";

const POLISH_COW_ID = "koprium:moon_cow"

world.afterEvents.dataDrivenEntityTrigger.subscribe(ev => {
    const { eventId, entity } = ev;

    if (entity.typeId != POLISH_COW_ID) { return; }


    if (eventId == "koprium:start_polish_cow") {
        const { dimension, location } = entity
        dimension.playSound("mob.polish_cow.cover_song", location)
    }
});