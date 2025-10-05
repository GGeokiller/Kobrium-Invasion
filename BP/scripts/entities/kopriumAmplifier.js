import { world, system, Entity, EffectTypes, MolangVariableMap } from "@minecraft/server";
import { geo } from "../utils/geo";
import { createAreaParticle } from "../utils/particle";

const KOPRIUM_AMPLIFIER_ID = "koprium:koprium_amplifier"
const KOPRIUM_ENTITIES_COLLISION_BOX = {
    "koprium:koprium_amplifier": {
        height: 1.9,
        width: 0.6
    },
    "minecraft:pig" :{
        width: 0.9,
        height: 0.9
    }
}

system.runInterval(() => {
    geo.getEntitiesFromWorld(KOPRIUM_AMPLIFIER_ID).forEach(entity => {
        try {
            let kopriumEntiies = entity.dimension.getEntities({families: ['koprium'], maxDistance: 10, location: entity.location, excludeTypes: [KOPRIUM_AMPLIFIER_ID]})
            if (kopriumEntiies.length == 0) return;
            kopriumEntiies.forEach(kopriumEntity => {
                kopriumEntity.addEffect(EffectTypes.get('strength'), 30, {amplifier: 1})
                kopriumEntity.addEffect(EffectTypes.get('speed'), 30, {amplifier: 1})
                kopriumEntity.addEffect(EffectTypes.get('resistance'), 30, {amplifier: 0})
                let health = geo.getHealth(kopriumEntity)
                let currentValue = health.currentValue
                let effectiveMax = health.effectiveMax
                if (currentValue <= effectiveMax && currentValue + 2 <= effectiveMax) {
                    let map = new MolangVariableMap()
                    map.setFloat('variable.height', KOPRIUM_ENTITIES_COLLISION_BOX[kopriumEntity?.typeId]?.height ?? 1)
                    map.setFloat('variable.width', KOPRIUM_ENTITIES_COLLISION_BOX[kopriumEntity?.typeId]?.width ?? 1)
                    kopriumEntity.dimension.spawnParticle("koprium:koprium_heal", kopriumEntity.location, map)
                    health.setCurrentValue(currentValue += 2)
                }
            })
            createAreaParticle(entity, entity.location, 10)
        } catch{}
    })
}, 20)