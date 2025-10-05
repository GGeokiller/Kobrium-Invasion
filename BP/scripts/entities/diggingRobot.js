import { world, system } from "@minecraft/server";



const DIGGING_ROBOT_ID = "koprium:digging_robot_projectile"

const BREAKABLE_BLOCKS = [
    "minecraft:dirt",
    "minecraft:coarse_dirt",
    "minecraft:grass_block",
    "minecraft:sand",
    "minecraft:podzol",
    "minecraft:gravel"
];


/**
 * Devuelve coordenadas de un area circular en el plano XZ
 */
function getBlocksInCircle(center, radius) {
    const blocks = [];
    const { x: cx, y: cy, z: cz } = center;

    for (let x = -radius; x <= radius; x++) {
        for (let z = -radius; z <= radius; z++) {
            if (Math.sqrt(x * x + z * z) <= radius) {
                blocks.push({ x: cx + x, y: cy, z: cz + z });
            }
        }
    }
    return blocks;
}

function destroyBlock(entity, pos) {
    entity.runCommand(`setblock ${pos.x} ${pos.y} ${pos.z} air destroy`);
}

world.afterEvents.dataDrivenEntityTrigger.subscribe(ev => {
    const { eventId, entity } = ev;

    if (entity.typeId != DIGGING_ROBOT_ID) { return; }

    if (!entity.isValid) { return; }

    if (eventId == "koprium:destroy_ground") {
        //el for extra es para que no se quede atorado al lanzarlo contra una pared xD
        //nunca habia usado un for que decremente en vez de incrementar
        for (let i = 0; i >= -1; --i) {
            const dim = entity.dimension;
            const center = {
                x: Math.floor(entity.location.x),
                y: Math.floor(entity.location.y) + i,
                z: Math.floor(entity.location.z)
            };

            const radius = 2;
            const blocks = getBlocksInCircle(center, radius);

            for (const pos of blocks) {
                const block = dim.getBlock(pos);

                //block.hasTag()
                if (block && (block.typeId.includes("ore") || block.hasTag("iron_tier_destructible") || block.hasTag("minecraft:is_axe_item_destructible") || block.hasTag("minecraft:is_hoe_item_destructible") || block.hasTag("minecraft:is_shovel_item_destructible") || block.hasTag("stone"))) {
                    destroyBlock(entity, pos);
                }
            }
        }

    }
});

/* 
world.afterEvents.itemUse.subscribe(ev => {
    const { itemStack, source } = ev

    const { dimension, location } = source

    destroyBlock(source, { x: location.x, y: location.y - 1, z: location.z })

})
 */
/*No hay particula de romperse me obligaron a usar comando
    const LOOT_TABLE_MANAGER = world.getLootTableManager()
    const DIGGABLE_TOOL = new ItemStack("minecraft:iron_pickaxe")

    const { dimension, location } = source
    const block = source.getBlockStandingOn()
    const loot = LOOT_TABLE_MANAGER.generateLootFromBlock(block, DIGGABLE_TOOL)
    loot.forEach(item => {
        dimension.spawnItem(item, location)
    })
    block.setType("air")

 */