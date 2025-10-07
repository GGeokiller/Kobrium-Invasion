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
const rare = "§r§1Rare"
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
const mainHandSlot = '§r§iWhen in Mainhand:'
const offHandSlot = '§r§iWhen in Offhand:'
const sellValue = '§r§iSell Value:'
const onKillEntity = '§r§iWhen killing an Entity:'
const CALIDAD_REEMPLAZA_ESTO = "Default_quality"

let rarities = [common, uncommon, rare, epic, legendary, mythic, murasama, trinket]

const ItemArray = [
    /// CUSTOM
    new loreItem("koprium:", [`§r§7Rarity: ${common} ${trinket}`, " ", trinketSlot, '§r§9You will get the saturation effect every so often.']),
    /// VANILLA

    new loreItem("minecraft:stick", [`§r§7Rarity: ${mythic}`, " ", "§r§5lorepalo"]),
    new loreItem("minecraft:", [`§r§7Rarity: ${CALIDAD_REEMPLAZA_ESTO}`, " ", "§r§5"]),
    new loreItem("minecraft:", [`§r§7Rarity: ${CALIDAD_REEMPLAZA_ESTO}`, " ", "§r§5"]),
    new loreItem("minecraft:", [`§r§7Rarity: ${CALIDAD_REEMPLAZA_ESTO}`, " ", "§r§5"]),
    new loreItem("minecraft:", [`§r§7Rarity: ${CALIDAD_REEMPLAZA_ESTO}`, " ", "§r§5"]),
    new loreItem("minecraft:", [`§r§7Rarity: ${CALIDAD_REEMPLAZA_ESTO}`, " ", "§r§5"]),
];

world.afterEvents.playerInventoryItemChange.subscribe(data => {
    let {itemStack, inventoryType, slot, player} = data
    if (inventoryType != "Inventory" && inventoryType != "Hotbar") return;
    const findLore = ItemArray.find(x => x.itemId == itemStack?.typeId);
    const lore = itemStack?.getLore();
    if (!findLore/*  || !itemStack || lore?.length != 0 */) return
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

world.afterEvents.entitySpawn.subscribe((ev) => {
    try {
        let entity = ev.entity;
        if (entity.typeId == "minecraft:item") {
            let itemCom = entity.getComponent("item")?.itemStack
            let item = itemCom
            let findLore = ItemArray.find(x => x.itemId == item?.typeId);
            let lore = item?.getLore();
            if (lore?.length <= 0 && findLore) {
                let tags = entity.getTags()
                item.setLore(findLore.lore)
                let nuevoItem = entity?.dimension?.spawnItem(item, entity?.location)
                for (const tag of tags) {
                    nuevoItem.addTag(tag)
                }
                entity.remove()
            }
        }
    } catch { }
})
