import { world, system, ItemStack, EntityEquippableComponent, EquipmentSlot } from "@minecraft/server";

world.afterEvents.entitySpawn.subscribe(ev => {
    let damager = ev.entity;
    if (damager.typeId == "one:damage") {
        damager.applyImpulse({x:0, y: 0.5, z: 0})
    }
})

world.afterEvents.entityHurt.subscribe(data => {
    let {hurtEntity, damage, damageSource: {damagingEntity, cause},} = data

    if (damagingEntity?.typeId != 'minecraft:player') return;
    if (cause == "override") return;

    let headHeight = hurtEntity.getHeadLocation().y

    let entityHealth = hurtEntity.getComponent("minecraft:health")

    let damageEntity = hurtEntity.dimension.spawnEntity("one:damage", {x: hurtEntity.location.x, y: headHeight - 1, z: hurtEntity.location.z})
    let nameTag = ""
    nameTag = `${damage.toFixed(1)}`
    damageEntity.nameTag = `< ${nameTag} >`
})