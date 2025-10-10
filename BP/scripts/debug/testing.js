import { world, system, ItemStack } from "@minecraft/server";
import { geoParticles } from "../utils/particle";
import { geo } from "../utils/geo";

/* world.afterEvents.itemUse.subscribe(data => {
    let { source: player, itemStack } = data
    let viewDirection = player.getViewDirection()

    geoParticles.newDirectionalLine(player.dimension.id, player.location, viewDirection, 100, 0.1, 0.2, 1, 0.2, 1, 10, 5)
}) */

/* world.afterEvents.entityHurt.subscribe(data => {
    let { damageSource: {cause, damagingEntity}, hurtEntity } = data
    if (damagingEntity?.typeId != "minecraft:player") return
    geoParticles.midDirectionalLineBetween(damagingEntity.dimension.id, geo.getEntityCenter(damagingEntity), geo.getEntityCenter(hurtEntity), 0.1, 1, 0, 0, 1, 10, 5)
}) */

// haz la funcion hijo de puta