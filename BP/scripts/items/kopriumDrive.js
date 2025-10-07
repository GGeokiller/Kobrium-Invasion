import {world, system} from "@minecraft/server"
import { geo } from "../utils/geo"

const KOPRIUM_DRIVE_ID = "koprium:koprium_drive"
const KOPRIUM_HELMET = "koprium:koprium_helmet"
const KOPRIUM_CHESTPLATE = "koprium:koprium_chestplate"
const KOPRIUM_LEGGINGS = "koprium:koprium_leggings"
const KOPRIUM_BOOTS = "koprium:koprium_boots"


world.afterEvents.itemUse.subscribe(data => {
    let {itemStack, source: player} = data
    if (itemStack?.typeId != KOPRIUM_DRIVE_ID) return;
    if (player.hasTag("kopriumDriveActive")) return;
    let cooldown = itemStack.getComponent("cooldown")
    let remaining = cooldown.getCooldownTicksRemaining(player)
    if (remaining > 0) return;
    if ( !geo.hasArmorPiece(player, KOPRIUM_HELMET) || !geo.hasArmorPiece(player, KOPRIUM_CHESTPLATE) || !geo.hasArmorPiece(player, KOPRIUM_LEGGINGS) || !geo.hasArmorPiece(player, KOPRIUM_BOOTS)) return;
    system.runTimeout(() => { 
        player.playSound("item.koprium_drive.ready", {volume: 1, pitch: 1})
    }, 600)
    cooldown.startCooldown(player)
    player.addTag("kopriumDriveActive")
    player.dimension.playSound("item.koprium_drive.activate", player.location, {volume: 1, pitch: 1})
})

system.runInterval(() => {
    for (const player of world.getPlayers()) {
        if (!player.hasTag("kopriumDriveActive")) continue
        player.dimension.spawnParticle("koprium:koprium_armor_effect", player.location)
}}, 1)

world.afterEvents.entityHurt.subscribe(data => {
    let {damageSource, hurtEntity} = data
    if (hurtEntity?.typeId != "minecraft:player") return;
    let player = hurtEntity
    if (!player.hasTag("kopriumDriveActive")) return;
    player.removeTag("kopriumDriveActive")
    player.dimension.spawnParticle("koprium:koprium_armor_explode", player.location)
    player.dimension.getEntities({excludeTypes: ["minecraft:player"], maxDistance: 13, location: player.location}).forEach(entity => {
    geo.impulseToLocation(entity, player.location, -5)
    entity.addEffect("slowness", 60, {amplifier: 1, showParticles: false})
    })
    player.dimension.playSound("item.koprium_drive.break", player.location, {volume: 1, pitch: 0.5})
})