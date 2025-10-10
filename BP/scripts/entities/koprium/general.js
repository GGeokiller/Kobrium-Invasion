import {world, system} from "@minecraft/server";

import { KOPRIUM_ENTITIES_IDS } from "./data.js";

world.afterEvents.entitySpawn.subscribe(({ entity }) => {
    if (!KOPRIUM_ENTITIES_IDS.includes(entity?.typeId)) return;
    try {
        let health = entity.getComponent("health");
        let max = health.effectiveMax;
        let current = health.currentValue;

        let entityName = entity.typeId.replace(/minecraft:|koprium:/, "");
        entityName = entityName.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");


        entity.nameTag = `§n§l${entityName} [${current.toFixed(1)}/${max.toFixed(1)}]`;
    } catch { }
});

world.afterEvents.entityHealthChanged.subscribe(({ entity, newValue, oldValue }) => {
    if (!KOPRIUM_ENTITIES_IDS.includes(entity?.typeId)) return;
    try {
        let health = entity?.getComponent("health");
        let max = health.effectiveMax;
        let current = health.currentValue;

        let entityName = entity.typeId.replace(/minecraft:|koprium:/, "");
        entityName = entityName.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

        entity.nameTag = `§n§l${entityName} [${current.toFixed(1)}/${max.toFixed(0)}]`;
    } catch{}
})