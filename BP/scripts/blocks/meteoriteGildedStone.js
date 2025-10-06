import { world, system, BlockTypes, BlockStateType, BlockType, ItemStack, BlockComponent, GameMode } from "@minecraft/server";
import { Random } from "../utils/random";

const METEORITE_GILDED_STONE = "koprium:meteorite_gilded_stone"

world.beforeEvents.playerBreakBlock.subscribe(data => {
    let {player, block, itemStack} = data
    if (block.typeId != METEORITE_GILDED_STONE) return;
    if (!itemStack?.typeId.includes("pickaxe") || player.getGameMode() != GameMode.Survival) return;
    let fortuneLevel = itemStack?.getComponent("enchantable")?.getEnchantment('fortune')?.level ?? 0
    system.run(() => {
        if (itemStack?.getComponent("enchantable")?.getEnchantment('silk_touch')?.level >= 1) {
            /* block.dimension.spawnItem(new ItemStack(METEORITE_GILDED_STONE, 1), block.center()) */
        } else {
            let totalDrop = Random.int(10, 16, 1) * (fortuneLevel + 1)
            let totalXP = Random.int(10, 40, 1)

            for (let i = 0; i < totalXP; i ++) {
                block.dimension.spawnEntity("minecraft:xp_orb", block.center())
            }
            block.dimension.spawnItem(new ItemStack("minecraft:gold_nugget", totalDrop), block.center())
        }
    })
})