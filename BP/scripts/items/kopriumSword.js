import { world, system } from "@minecraft/server";
import { geo } from "../utils/geo";
import { Random } from "../utils/random";
import { geoParticles } from "../utils/particle";

world.afterEvents.entityHurt.subscribe(data => {
    let {hurtEntity, damageSource: {damagingEntity}} = data;
    if (damagingEntity?.typeId !== "minecraft:player") return;
    if (geo.getMainItem(damagingEntity)?.typeId !== "koprium:koprium_sword") return;
    if (Math.random() > 0.25) return;
    let randomEffect = geo.getRandomPositiveEffect();
    damagingEntity.addEffect(randomEffect, Random.int(50, 200), {amplifier: Random.int(0, 4)});
    geoParticles.VectorLine(geo.fixPlayerLocation(damagingEntity), geo.getEntityCenter(hurtEntity), "koprium:koprium_sword_effects", damagingEntity.dimension.id, 0.1, 0);
});