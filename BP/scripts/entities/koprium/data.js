import { world, system, Entity, EffectTypes, MolangVariableMap, RawMessageError } from "@minecraft/server";

export const KOPRIUM_AMPLIFIER_ID = "koprium:koprium_amplifier"
export const KOPRIUM_ROVER_ID = "koprium:koprium_rover"
export const KOPRIUM_GYRATOR_ID = "koprium:koprium_gyrator"
export const KOPRIUM_DRONE_ID = "koprium:koprium_drone"
export const KOPRIUM_PYLON_ID = "koprium:koprium_pylon"
export const KOPRIUM_MORTAR_ID = "koprium:koprium_mortar"
export const KOPRIUM_PARACORE_ID = "koprium:koprium_paracore"
export const KOPRIUM_BOMBER_ID = "koprium:koprium_bomber"

export const KOPRIUM_SCRAP_ID = "koprium:koprium_scrap"

export const KOPRIUM_ENTITIES_IDS = [
  KOPRIUM_AMPLIFIER_ID,
  KOPRIUM_ROVER_ID,
  KOPRIUM_GYRATOR_ID,
  KOPRIUM_DRONE_ID,
  KOPRIUM_PYLON_ID,
  KOPRIUM_MORTAR_ID,
  KOPRIUM_PARACORE_ID,
  KOPRIUM_BOMBER_ID
];

export const KOPRIUM_ENTITIES_COLLISION_BOX = {
    [KOPRIUM_AMPLIFIER_ID]: {
        width: 0.6,
        height: 0.9
    },
    [KOPRIUM_ROVER_ID]: {
        width: 0.8,
        height: 0.6
    },
    [KOPRIUM_DRONE_ID]: {
        width: 0.9,
        height: 0.9    
    },
    [KOPRIUM_GYRATOR_ID]: {
        width: 0.9,
        height: 0.9    
    },
    [KOPRIUM_PYLON_ID]: {
        width: 1,
        height: 6   
    },
    [KOPRIUM_MORTAR_ID]: {
        width: 0.9,
        height: 1.1   
    },
    [KOPRIUM_BOMBER_ID]: {
        width: 0.5,
        height: 0.5   
    },
}

/// pylon
export const KOPRIUM_ENTITIES_SPAWN_RATE = [
    { entity: KOPRIUM_AMPLIFIER_ID, weight: 1 },
    { entity: KOPRIUM_ROVER_ID, weight: 6 },
    { entity: KOPRIUM_GYRATOR_ID, weight: 3 },
    { entity: KOPRIUM_DRONE_ID, weight: 1 },
    { entity: KOPRIUM_MORTAR_ID, weight: 1 },
    { entity: KOPRIUM_BOMBER_ID, weight: 1 },
];


export const KOPRIUM_ENTITIES_LOOT = {
    [KOPRIUM_AMPLIFIER_ID]: {
        chance: 40, //%
        amount: [1,3] //int
    },
    [KOPRIUM_ROVER_ID]: {
        chance: 10, //%
        amount: [1,2] //int
    },
    [KOPRIUM_GYRATOR_ID]: {
        chance: 30, //%
        amount: [1,3] //int
    },
    [KOPRIUM_DRONE_ID]: {
        chance: 30, //%
        amount: [1,4] //int
    },
    [KOPRIUM_PYLON_ID]: {
        chance: 70, //%
        amount: [2,8] //int
    },
    [KOPRIUM_MORTAR_ID]: {
        chance: 30, //%
        amount: [2,3] //int
    },
    [KOPRIUM_PARACORE_ID]: {
        chance: 100, //%
        amount: [1,5] //int
    },
    [KOPRIUM_BOMBER_ID]: {
        chance: 20, //%
        amount: [1,3] //int
    },
}