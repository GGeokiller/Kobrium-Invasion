import {world, system, ItemStack} from "@minecraft/server"
import { KOPRIUM_ENTITIES_LOOT, KOPRIUM_ENTITIES_IDS, KOPRIUM_SCRAP_ID } from "./data"
import { Random } from "../../utils/random";

world.afterEvents.entityDie.subscribe(data => {
    let {deadEntity, damageSource: {cause, damagingEntity}} = data
    if (!KOPRIUM_ENTITIES_IDS.includes(deadEntity?.typeId)) return;
    let chance = KOPRIUM_ENTITIES_LOOT[deadEntity?.typeId].chance
    if (Random.int(1, 100) > chance) return;
    let amount = KOPRIUM_ENTITIES_LOOT[deadEntity?.typeId].amount

    let itemAmount = Random.int(amount[0], amount[1])

    deadEntity.dimension.spawnItem(new ItemStack(KOPRIUM_SCRAP_ID, itemAmount), deadEntity.location)
})