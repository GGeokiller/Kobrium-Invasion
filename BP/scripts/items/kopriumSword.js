import { world, system, EntityDamageCause, Entity } from "@minecraft/server";
import { geo } from "../utils/geo";
import { geoParticles } from "../utils/particle";
import { Random } from "../utils/random";

world.afterEvents.entityHurt.subscribe(data => {
    let {hurtEntity, damageSource: {damagingEntity, cause}} = data;
    if (damagingEntity?.typeId !== "minecraft:player" || cause != EntityDamageCause.entityAttack) return;
    if (geo.getMainItem(damagingEntity)?.typeId !== "koprium:koprium_sword") return;
    if (Math.random() > 1.25) return;
    try {
        startSwordLightningChain(hurtEntity, damagingEntity);
        } catch { return; }
});
/**
 * 
 * @param {Entity} target 
 * @returns 
 */
function startSwordLightningChain(target, damagingEntity, excludedEntitiesId = []) { 
    let [closestTarget, newExcludedIds] = getClosestTarget(target, excludedEntitiesId);
    excludedEntitiesId = newExcludedIds;
    if (!closestTarget) return;
    geoParticles.midDirectionalLineBetween("koprium:korpium_sword_lightning", target.dimension.id, geo.getEntityCenter(target), geo.getEntityCenter(closestTarget), 0.2, 1, 1, 1, 1, 1, 1);
    target.applyDamage(5, {cause: EntityDamageCause.lightning, damagingEntity: damagingEntity});
    target.dimension.playSound("item.koprium_sword.shock", target.location, {volume: 0.12, pitch: Random.number(0.8, 1.2)});
    system.runTimeout(() => {
        startSwordLightningChain(closestTarget, damagingEntity, excludedEntitiesId);
    }, 3)
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
            maxDistance: 32,
            excludeFamilies: ['player', 'villager'],
            families: ['monster']
        })
        .filter(e => !excludedEntitiesId.includes(e.id))[0];
    return [closest, excludedEntitiesId];
}
