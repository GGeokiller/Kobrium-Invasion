import { world, system, EntityDamageCause, Entity } from "@minecraft/server";
import { geo } from "../utils/geo";
import { geoParticles } from "../utils/particle";
import { Random } from "../utils/random";

world.afterEvents.entityHurt.subscribe(data => {
    let {hurtEntity, damageSource: {damagingEntity, cause}, damage} = data;
    if (damagingEntity?.typeId !== "minecraft:player" || cause != EntityDamageCause.entityAttack) return;
    if (geo.getMainItem(damagingEntity)?.typeId !== "koprium:koprium_sword") return;
    if (Math.random() > 0.25) return;
    try {
        startSwordLightningChain(hurtEntity, damagingEntity, undefined, undefined, damage);
        } catch { return; }
});
/**
 * 
 * @param {Entity} target 
 * @returns 
 */
function startSwordLightningChain(target, damagingEntity, excludedEntitiesId = [], iteration = 0, damage = 10) { 
    try {
        let [closestTarget, newExcludedIds] = getClosestTarget(target, excludedEntitiesId);
        excludedEntitiesId = newExcludedIds;
        target.dimension.spawnParticle("koprium:koprium_sword_shock", geo.getEntityCenter(target));
        
        target.applyDamage(damage, {cause: EntityDamageCause.lightning, damagingEntity: damagingEntity});
        target.dimension.playSound("koprium_sword.shock", target.location, {volume: 32, pitch: 1.2 + iteration * 0.1});
        if (!closestTarget) return;
        geoParticles.midDirectionalLineBetween("koprium:korpium_sword_lightning", target.dimension.id, geo.getEntityCenter(target), geo.getEntityCenter(closestTarget), Random.number(0.1, 0.5), 0, 1, 0, 1, 1, 1);
        system.runTimeout(() => {
            startSwordLightningChain(closestTarget, damagingEntity, excludedEntitiesId, iteration + 1, damage * 0.8);
        }, 2)
    } catch {}
}
/**
 * 
 * @param {Entity} entity 
 * @param {[]} excludedEntitiesId 
 * @return {[Entity, []]}
 */
function getClosestTarget(entity, excludedEntitiesId = []) {
    excludedEntitiesId.push(entity.id);
    const closest = entity.dimension
        .getEntities({
            location: entity.location,
            maxDistance: 16,
            excludeFamilies: ['player', 'villager'],
            families: ['monster']
        })
        .filter(e => !excludedEntitiesId.includes(e.id))[0];
    return [closest, excludedEntitiesId];
}
