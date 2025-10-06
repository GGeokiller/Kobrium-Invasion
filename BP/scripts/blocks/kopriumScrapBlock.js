import {world, system, ItemStack, GameMode} from "@minecraft/server"
import { Random } from "../utils/random"
let KORPRIUM_SCRAP_BLOCK_ID = "koprium:koprium_scrap_block"
let KOPRIUM_SCRAP_ID = "koprium:koprium_scrap"

world.beforeEvents.playerBreakBlock.subscribe(data => {
    let {player, itemStack, block} = data
    if (block.typeId != KORPRIUM_SCRAP_BLOCK_ID) return;
    if (!itemStack?.typeId.includes("pickaxe") || player.getGameMode() != GameMode.Survival) return;
        let fortuneLevel = itemStack?.getComponent("enchantable")?.getEnchantment('fortune')?.level ?? 0
        system.run(() => {
            if (itemStack?.getComponent("enchantable")?.getEnchantment('silk_touch')?.level >= 1) {
                /* block.dimension.spawnItem(new ItemStack(METEORITE_GILDED_STONE, 1), block.center()) */
            } else {
                let totalDrop = Random.int(1, 1 + fortuneLevel)
                let totalXP = Random.int(10, 40, 1)
    
                for (let i = 0; i < totalXP; i ++) {
                    block.dimension.spawnEntity("minecraft:xp_orb", block.center())
                }
                block.dimension.spawnItem(new ItemStack(KOPRIUM_SCRAP_ID, totalDrop), block.center())
            }
        })
})