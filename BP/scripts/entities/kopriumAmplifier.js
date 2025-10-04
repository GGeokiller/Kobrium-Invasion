import { world, system, Entity, EffectTypes } from "@minecraft/server";
import { geo } from "../utils/geo";
import { createAreaParticle } from "../utils/particle";

const KOPRIUM_AMPLIFIER_ID = "koprium:koprium_amplifier"

system.runInterval(() => {
    geo.getEntitiesFromWorld(KOPRIUM_AMPLIFIER_ID).forEach(entity => {
        try {
            entity.dimension.getEntities({families: ['koprium'], maxDistance: 10, location: entity.location/* , excludeTypes: [KOPRIUM_AMPLIFIER_ID] */}).forEach(kopriumEntity => {
                kopriumEntity.addEffect(EffectTypes.get('regeneration'), 20, {showParticles: true, amplifier: 2})
            })
            createAreaParticle(entity, entity.location, 10)
        } catch{}
    })
}, 10)