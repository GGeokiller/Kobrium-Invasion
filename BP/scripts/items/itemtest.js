// import { world, system, BlockPermutation } from "@minecraft/server";

// const RADIUS = 6;// max
// const RING_DELAY = 2;
// const LAYER_OFFSET = 0;
// const HORIZ_SPEED = 0.6;
// const UP_SPEED = 0.8;
// const AIR = "minecraft:air";



// function spawnDummyBlock(dimension, location, blockTypeId) {
//     const dummyBlock = dimension.spawnEntity("eu:dummy_block", location)

//     dummyBlock.setDynamicProperty("eu:blockTypeId", blockTypeId)
//     dummyBlock.runCommand(`replaceitem entity @s slot.weapon.mainhand 0 ${blockTypeId}`)
//     return dummyBlock;
// }


// function normOut(dx, dz, base = HORIZ_SPEED) {
//     const len = Math.hypot(dx, dz) || 1;
//     const s = base / len;
//     const jitter = (Math.random() - 0.5) * 0.15;//ruido
//     return { x: dx * s + jitter, y: UP_SPEED, z: dz * s + jitter };
// }



// function processRing(dimension, cx, cy, cz, r, rPrev) {
//     const r2 = r * r;
//     const rPrev2 = rPrev * rPrev;

//     for (let dx = -r; dx <= r; dx++) {
//         for (let dz = -r; dz <= r; dz++) {
//             const d2 = dx * dx + dz * dz;
//             if (d2 > r2 || d2 <= rPrev2) continue;

//             const x = cx + dx;
//             const z = cz + dz;
//             const y = cy + LAYER_OFFSET;

//             const b = dimension.getBlock({ x, y, z });
//             if (!b) continue;

//             //const id = b.typeId;
//             //if (!id || id == "minecraft:air") continue; // nada que lanzar

//             try {
//                 const dummy = spawnDummyBlock(dimension, b.center(), "koprium:meteorite_ash");
//                 //b.setType(AIR);
//                 dummy.applyImpulse(normOut(dx, dz));
//             } catch {
//             }
//         }
//     }
// }

// world.afterEvents.itemUse.subscribe(ev => {
//     const { itemStack, source } = ev;
//     if (!source?.isValid) return;

//     if (itemStack?.typeId != "minecraft:stick") return;

//     console.warn("a")
//     const dim = source.dimension;

//     const standing = source.getBlockStandingOn();
//     if (!standing) return;

//     const cx = Math.floor(standing.location.x);
//     const cy = Math.floor(standing.location.y);
//     const cz = Math.floor(standing.location.z);

//     for (let r = 1; r <= RADIUS; r++) {
//         const rPrev = r - 1;
//         system.runTimeout(() => processRing(dim, cx, cy, cz, r, rPrev), r * RING_DELAY);
//     }
// });
