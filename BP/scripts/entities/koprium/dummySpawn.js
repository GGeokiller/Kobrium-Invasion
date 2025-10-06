// import { world, system, Entity, EffectTypes, MolangVariableMap, RawMessageError, GameRule, GameRules } from "@minecraft/server";
// import { Random } from "../../utils/random";
// import { KOPRIUM_ENTITIES_SPAWN_RATE } from "./data";

// let SPAWN_RATE = KOPRIUM_ENTITIES_SPAWN_RATE
// SPAWN_RATE.push({ entity: "koprium:koprium_pylon", weight: 0.2 })

// system.runInterval(() => {
//     if (!["Hard", "Normal", "Easy"].includes(world.getDifficulty()) || !world.gameRules.doMobSpawning) return;
//     // console.warn("Try to spawn kopriumGroup")
//     for (let player of world.getPlayers()) {
//         if (Random.int(1, 100) > 1) return;
//         if (player.dimension.id != 'minecraft:overworld') continue;
//         let kopriumEntitiesAmount = world.getDimension("overworld").getEntities({families: ["koprium"], maxDistance: 64, location: player.location}).length ?? 0
//         //console.warn(`Tried to spawn in ${undefined} with ${kopriumEntitiesAmount} amount`)
//         if (kopriumEntitiesAmount >= 15) return;
//         let randomLocation = getRandomLocation(player, 32, 48)
//         //console.warn(`Spawned in ${JSON.stringify(randomLocation)} with ${kopriumEntitiesAmount} amount`)
//         spawnGroup(player, randomLocation)
//     }
// }, 10)

// /**
//  * 
//  * @param {Entity} entity 
//  * @param {Number} minRange 
//  * @param {Number} maxRange 
//  * @returns 
//  */

// function getRandomLocation(entity, minRange, maxRange) {
//     try {
//         const { x, y, z } = entity.location;

//         let dx, dy, dz, lenSq;
//         do {
//             dx = Math.random() * 2 - 1;
//             dy = Math.random() * 2 - 1;
//             dz = Math.random() * 2 - 1;
//             lenSq = dx * dx + dy * dy + dz * dz;
//         } while (lenSq > 1 || lenSq === 0); 

//         const len = Math.sqrt(lenSq);
//         dx /= len;
//         dy /= len;
//         dz /= len;

//         const radius = minRange + Math.random() * (maxRange - minRange);

//         const randomLocation = {
//             x: x + dx * radius,
//             y: y + dy * radius,
//             z: z + dz * radius,
//         };

//         const finalLocation = {
//             x : randomLocation.x,
//             y : entity.dimension.getTopmostBlock({x: randomLocation.x, z: randomLocation.z}).y + 1,
//             z : randomLocation.z
//         }
//         const blockType = entity.dimension.getBlock(finalLocation).above(1)?.typeId;
//         if (["minecraft:water", "minecraft:lava"].includes(blockType)) {
//             console.log("Tried to spawn but failed, liquid")
//             return undefined;
//         }
//         return finalLocation;
//     } catch {}
// }

// /**
//  * 
//  * @param {Entity} entity 
//  * @param {import("@minecraft/server").Vector3} location 
//  * @param {Number} amount 
//  */

// function spawnGroup(entity, location) {
//     if (location == undefined) return;
//     let randomAmount = Random.int(2, 4)
//     for (let i = 0; i < randomAmount; i++) {
//         entity.dimension.spawnEntity(pickEntity(), location)
//     }
// }

// function pickEntity() {
//     const totalWeight = KOPRIUM_ENTITIES_SPAWN_RATE.reduce((sum, e) => sum + e.weight, 0);
//     const r = Math.random() * totalWeight;
//     let cumulative = 0;
//     for (const entry of KOPRIUM_ENTITIES_SPAWN_RATE) {
//         cumulative += entry.weight;
//         if (r < cumulative) return entry.entity;
//     }
//     return KOPRIUM_ENTITIES_SPAWN_RATE[KOPRIUM_ENTITIES_SPAWN_RATE.length - 1].entity;
// }
// /*
// world.afterEvents.entitySpawn.subscribe(data => {
//     let {entity} = data
//     if (entity?.typeId != KOPRIUM_DUMMY_SPAWN_ID) return;
//     let randomAmount = Random.int(2, 4, 1)
//     for (let i = 1; i < randomAmount; i ++) {
//         let randomKopriumEntityId = pickEntity()
//         entity.dimension.spawnEntity(randomKopriumEntityId, entity.location)
//         world.sendMessage(`Spawn at: ${JSON.stringify(entity.location)}`)
//     }
//     entity.remove()
// }) */