import { world, system, Entity } from "@minecraft/server";
import { geo } from "../utils/geo";
import { createAreaParticle } from "../utils/particle";

const KOPRIUM_AMPLIFIER_ID = "koprium:koprium_amplifier"

system.runInterval(() => {
    geo.getEntitiesFromWorld(KOPRIUM_AMPLIFIER_ID).forEach(entity => {
        createAreaParticle(entity, entity.location, 10)
    })
}, 10)