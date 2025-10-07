import {world, system} from "@minecraft/server"
import { getLocalCoordinates } from "../utils/vec3";
import { geo } from "../utils/geo";
import { geoParticles } from "../utils/particle";

let KOPRIUM_GRABVITY_GUN_ID = "koprium:koprium_gravity_gun"

world.afterEvents.itemStartUse.subscribe(data => {
    let {itemStack, useDuration, source: player} = data
    if (itemStack?.typeId != KOPRIUM_GRABVITY_GUN_ID) return;
    let hitEntity = player?.getEntitiesFromViewDirection({maxDistance: 7})[0]?.entity
    if (!hitEntity || hitEntity?.typeId == "minecraft:player") return;
    let intervalo = system.runInterval(() => {
        let distance = 6
        let viewDir = player.getViewDirection()
        let finalLocation = {
            x: player.location.x + viewDir.x * distance,
            y: player.location.y + viewDir.y * distance + 1,
            z: player.location.z + viewDir.z * distance
        }
        if (hitEntity.isValid) {
            geoParticles.VectorLine(geo.sumVectors(player.getHeadLocation(), {x: 0, y: -0.4, z: 0}), finalLocation, "koprium:gravity_gun_particle", hitEntity?.dimension?.id, 0.33, 0)
            geo.impulseToLocation(hitEntity, finalLocation, 1, true)
            
        }
    })
    world.afterEvents.itemReleaseUse.subscribe(data => {
        let {itemStack: releaseItem} = data
        if (releaseItem?.typeId != KOPRIUM_GRABVITY_GUN_ID) return;
        system.clearRun(intervalo)
        hitEntity.clearVelocity()
    })
})