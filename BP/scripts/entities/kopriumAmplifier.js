import { world, system, Entity, EffectTypes } from "@minecraft/server";
import { geo } from "../utils/geo";
import { createAreaParticle } from "../utils/particle";

const KOPRIUM_AMPLIFIER_ID = "koprium:koprium_amplifier"

system.runInterval(() => {
    geo.getEntitiesFromWorld(KOPRIUM_AMPLIFIER_ID).forEach(entity => {
            entity.dimension.getEntities({families: ['koprium'], maxDistance: 10, location: entity.location/* , excludeTypes: [KOPRIUM_AMPLIFIER_ID] */}).forEach(kopriumEntity => {
                let health = geo.getHealth(kopriumEntity)
                let currentValue = health.currentValue
                let effectiveMax = health.effectiveMax
                if (currentValue <= effectiveMax && currentValue + 2 <= effectiveMax) {
                    
                    health.setCurrentValue(currentValue += 2)
                }
            })
            createAreaParticle(entity, entity.location, 10)
    })
}, 10)