import { world, system, ItemStack, DimensionTypes } from "@minecraft/server";
export {rarities}

class loreItem {
    constructor(itemId, lore) {
        this.itemId = itemId;
        this.lore = lore;
    }
}

/// unc = §aUncommon
/// rare = §1Rare
/// epic = §5Epic
/// leg = §6Legendary
/// myt = §bMythic
const common = "§r§iCommon"
const uncommon = "§r§aUncommon"
const rare = "§r§9Rare"
const epic = "§r§5Epic"
const legendary = "§r§6Legendary"
const mythic = "§r§bMythic"
const murasama = "§r§4Murasama"
const trinket = "§r§9[Trinket]"
const unique = "§r§u[Unique]"
const trinketSlot = '§r§iWhen in Trinket Slot:'
const headSlot = '§r§iWhen in Head:'
const chestSlot = '§r§iWhen in Chest:'
const legsSlot = '§r§iWhen in Legs:'
const feetSlot = '§r§iWhen in Feet:'
const fullSet = '§r§iWhen full armor set:'
const fullKopriumSet = '§r§iWhen Full Koprium Armor Set:'
const mainHandSlot = '§r§iWhen in Mainhand:'
const offHandSlot = '§r§iWhen in Offhand:'
const onKillEntity = '§r§iWhen killing an Entity:'
const onAttackEntity = '§r§iWhen Attacking an Entity:'
const onMiningBlock = '§r§iWhen Mining a Block:'
const rightClickOrInteract = '§r§iWhen Used:'
const and = '§r§iand'
const CALIDAD_REEMPLAZA_ESTO = "Default_quality"

let rarities = [common, uncommon, rare, epic, legendary, mythic, murasama, trinket]

const kopriumArmorAura = "§l§aK§2o§ap§2r§ai§2u§am §aA§2r§am§2o§ar §aA§2u§ar§2a";
const kopriumArmorAuraInfo = `§r§9[${kopriumArmorAura}§r§9]:\nThe next hit you take releases an energy pulse that repels nearby enemies.`;

const ItemArray = [
    /// CUSTOM
    new loreItem("koprium:", [`§r§7Rarity: ${common} ${trinket}`, " ", trinketSlot, '§r§9']),
    new loreItem("koprium:digging_robot_throwable", [`§r§7Rarity: ${rare}`, " ", "§r§9Throws a drill that mines up to 10 blocks down."]),
    new loreItem("koprium:comet_stone", [`§r§7Rarity: ${epic}`, " ", "§r§9Summons a meteorite at a random location within 60 blocks of the player"]),
    new loreItem("koprium:koprium_helmet", [`§r§7Rarity: ${rare}`, " ", fullKopriumSet, `§r§9Enables the ability to use the ${kopriumArmorAura}§r§9 with the Koprium Drive.`, ``, `${kopriumArmorAuraInfo}`]),
    new loreItem("koprium:koprium_chestplate", [`§r§7Rarity: ${rare}`, " ", fullKopriumSet, `§r§9Enables the ability to use the ${kopriumArmorAura}§r§9 with the Koprium Drive.`, ``, `${kopriumArmorAuraInfo}`]),
    new loreItem("koprium:koprium_leggings", [`§r§7Rarity: ${rare}`, " ", fullKopriumSet, `§r§9Enables the ability to use the ${kopriumArmorAura}§r§9 with the Koprium Drive.`, ``, `${kopriumArmorAuraInfo}`]),
    new loreItem("koprium:koprium_boots", [`§r§7Rarity: ${rare}`, " ", fullKopriumSet, `§r§9Enables the ability to use the ${kopriumArmorAura}§r§9 with the Koprium Drive.`, ``, `${kopriumArmorAuraInfo}`]),
    new loreItem("koprium:bucket_cheese", [`§r§7Rarity: ${rare}`, " ", "§r§9"]),
    new loreItem("koprium:bucket_cheese", [`§r§7Rarity: ${rare}`, " ", "§r§9Might not be a good idea to drink it."]),
    new loreItem("koprium:energy_core", [`§r§7Rarity: ${rare}`, " ", "§r§9Contains power from the stars."]),
    new loreItem("koprium:koprium_dagger", [`§r§7Rarity: ${rare}`, " ", "§r§9Throws a dagger that deals 2 to 8 damage."]),
    new loreItem("koprium:red_light_saber", [`§r§7Rarity: ${epic}`, " ", "§r§9"]),
    new loreItem("koprium:koprium_gravity_gun", [`§r§7Rarity: ${legendary}`, " ", rightClickOrInteract, "§r§9Drags entities and blocks around"]),
    new loreItem("koprium:koprium_drive", [`§r§7Rarity: ${epic}`, " ", rightClickOrInteract, `§r§9Activates the ${kopriumArmorAura}.`, ``, `${kopriumArmorAuraInfo}`]),
    new loreItem("koprium:koprium_sword", [`§r§7Rarity: ${rare}`, " ", onAttackEntity, "§r§925% chance to trigger a Koprium Lightning Chain."]),
    new loreItem("koprium:koprium_scrap", [`§r§7Rarity: ${uncommon}`, " ", "§r§9Used for crafting Koprium items."]),
    new loreItem("koprium:koprium_pickaxe", [`§r§7Rarity: ${rare}`, " ", onMiningBlock, "§r§910% to grand temporal Xray"]),
    new loreItem("koprium:meteorite_gilded_stone", [`§r§7Rarity: ${rare}`, " ", "§r§9Drops golden nuggets when mined."]),
    new loreItem("koprium:meteorite_ash", [`§r§7Rarity: ${uncommon}`, " ", "§r§9Ash from a fallen meteorite."]),
    new loreItem("koprium:landmine", [`§r§7Rarity: ${rare}`, " ", "§r§9Explodes when stepped on."]),
    new loreItem("koprium:koprium_teleport_pad", [`§r§7Rarity: ${rare}`, " ", "§r§9Teleports you between pads placed above or below each other."]),
    new loreItem("koprium:koprium_scrap_block", [`§r§7Rarity: ${rare}`, " ", "§r§9Drops Koprium Scrap when mined."]),
    new loreItem("koprium:meteorite_magma_stone", [`§r§7Rarity: ${uncommon}`, " ", "§r§9Can create lava when broken."]),
    new loreItem("koprium:meteorite_stone", [`§r§7Rarity: ${uncommon}`, " ", "§r§9Stone from the skies."]),
    /// VANILLA
    new loreItem("minecraft:", [`§r§7Rarity: ${CALIDAD_REEMPLAZA_ESTO}`, " ", ""])
];

world.afterEvents.playerInventoryItemChange.subscribe(data => {
    let {itemStack, inventoryType, slot, player} = data
    if (inventoryType != "Inventory" && inventoryType != "Hotbar") return;
    const findLore = ItemArray.find(x => x.itemId == itemStack?.typeId);
    const lore = itemStack?.getLore();
    if (!findLore || !itemStack || lore?.length != 0) return
    itemStack.setLore(findLore.lore);
    player.getComponent("inventory").container.setItem(slot, itemStack)
})

// system.runInterval(() => {
//     for (const player of world.getPlayers()) {
//         const playerContainer = player.getComponent("inventory").container
//         for (let i = 0; i < playerContainer.size; i++) {
//             const item = playerContainer.getItem(i);
//             const findLore = ItemArray.find(x => x.itemId == item?.typeId);
//             const lore = item?.getLore();
//             if (!findLore/*  || !item || lore?.length != 0 */) continue
//             item.setLore(findLore.lore);
//             playerContainer.setItem(i, item);
//         }
//     }
// }, 300)

// world.afterEvents.entitySpawn.subscribe((ev) => {
//     try {
//         let entity = ev.entity;
//         if (entity.typeId == "minecraft:item") {
//             let itemCom = entity.getComponent("item")?.itemStack
//             let item = itemCom
//             let findLore = ItemArray.find(x => x.itemId == item?.typeId);
//             let lore = item?.getLore();
//             if (lore?.length <= 0 && findLore) {
//                 let tags = entity.getTags()
//                 item.setLore(findLore.lore)
//                 let nuevoItem = entity?.dimension?.spawnItem(item, entity?.location)
//                 for (const tag of tags) {
//                     nuevoItem.addTag(tag)
//                 }
//                 entity.remove()
//             }
//         }
//     } catch { }
// })
