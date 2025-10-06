import { world, system, Entity, EffectTypes, MolangVariableMap, RawMessageError } from "@minecraft/server";

export const KOPRIUM_ENTITIES_SPAWN_RATE = [
    { entity: "koprium:koprium_amplifier", weight: 0.5 },
    { entity: "koprium:koprium_rover", weight: 3 },
    { entity: "koprium:koprium_gyrator", weight: 2 },
    { entity: "koprium:koprium_drone", weight: 1 },
];

export const KOPRIUM_ENTITIES_COLLISION_BOX = {
    "koprium:koprium_amplifier": {
        width: 0.6,
        height: 0.9
    },
    "koprium:koprium_rover":{
        width: 0.8,
        height: 0.6
    }
}