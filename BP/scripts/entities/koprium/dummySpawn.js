import { world, system, Entity, EffectTypes, MolangVariableMap, RawMessageError } from "@minecraft/server";
import { Random } from "../../utils/random";

let KOPRIUM_DUMMY_SPAWN_ID = "koprium:koprium_dummy_spawn"

function pickEntity() {
    const totalWeight = KOPRIUM_ENTITIES_SPAWN_RATE.reduce((sum, e) => sum + e.weight, 0);
    const r = Math.random() * totalWeight;
    let cumulative = 0;
    for (const entry of KOPRIUM_ENTITIES_SPAWN_RATE) {
        cumulative += entry.weight;
        if (r < cumulative) return entry.entity;
    }
    return KOPRIUM_ENTITIES_SPAWN_RATE[KOPRIUM_ENTITIES_SPAWN_RATE.length - 1].entity;
}

world.afterEvents.entitySpawn.subscribe(data => {
    let {entity} = data
    if (entity?.typeId != KOPRIUM_DUMMY_SPAWN_ID) return;
    let randomAmount = Random.int(2, 4, 1)
    for (let i = 1; i < randomAmount; i ++) {
        let randomKopriumEntityId = pickEntity
        entity.dimension.spawnEntity(randomKopriumEntityId, entity.location)
    }
    entity.remove()
})