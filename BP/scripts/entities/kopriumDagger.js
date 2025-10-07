import { world, system } from "@minecraft/server"

const KOPRIUM_DAGGER_ID = "koprium:koprium_dagger"
const KOPRIUM_DAGGER_PROJECTILE_ID = "koprium:koprium_dagger_projectile"

world.afterEvents.itemUse.subscribe(data => {
    let { itemStack, source: player } = data
    if (itemStack?.typeId != KOPRIUM_DAGGER_ID) return;
    player.playSound("entity.koprium_dagger.throw", { volume: 0.25, pitch: 1 })
})

world.afterEvents.projectileHitBlock.subscribe(data => {
    let { projectile } = data
    let blockhit = data.getBlockHit()
    if (projectile?.typeId != KOPRIUM_DAGGER_PROJECTILE_ID) return;
    blockhit.block.dimension.playSound("entity.koprium_dagger.hit", blockhit.block.location, { volume: 3, pitch: 1 })
    //projectile.remove()
})

world.afterEvents.projectileHitEntity.subscribe(data => {
    let { projectile } = data
    let hitEntity = data.getEntityHit().entity
    if (projectile?.typeId != KOPRIUM_DAGGER_PROJECTILE_ID) return;
    hitEntity.dimension.playSound("entity.koprium_dagger.hit", hitEntity.location, { volume: 3, pitch: 1 })
})