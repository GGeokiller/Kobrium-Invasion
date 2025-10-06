import { world, system, BlockTypes, BlockStateType, BlockType } from "@minecraft/server";

const METEORITE_MAGMA_STONE = "koprium:meteorite_magma_stone"

world.beforeEvents.playerBreakBlock.subscribe(data => {
    let {player, block, itemStack} = data
    if (block.typeId != METEORITE_MAGMA_STONE) return;
    if (Math.random() > 0.1)
    system.run(() => {
        player.dimension.setBlockType(block.location, 'minecraft:flowing_lava')
    })
})