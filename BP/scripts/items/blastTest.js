// import { world, system } from "@minecraft/server";
// import { Vec3 } from "../utils/vec3";
// import { Euforia } from "../utils/euforia";

// const ITEM_ID = "koprium:koprium_sword";

// world.afterEvents.itemUse.subscribe((eventData) => {
//   const item = eventData.itemStack;
//   const player = eventData.source;

//   if (item.typeId === "minecraft:blaze_rod") {
//     const { dimension, location } = player;
//     const view = player.getViewDirection();
//     Euforia.shootProjectile("koprium:blast_projectile", dimension, player.getHeadLocation(), view, {
//       source: player,
//     });
//   }
// });

// world.afterEvents.projectileHitEntity.subscribe((ev) => {
//   const { projectile, location, dimension, source } = ev;

//   if (projectile.typeId === "koprium:blast_projectile") {

//     const target = dimension.getEntities({
//       maxDistance: 20,
//       location: location,
//       excludeTypes: [
//         "minecraft:player",
//         "minecraft:item",
//         "minecraft:xp_orb",
//         "koprium:blast_projectile",
//       ],
//       farthest: 1,
//     })[0];
//     if (target) {
//       //world.sendMessage(target.typeId);
//       //world.sendMessage("disparando ando");
//       Euforia.shootProjectile(
//         "koprium:blast_projectile",
//         dimension,
//         location,
//         Vec3.subtract(target.getHeadLocation(), location),
//         {
//           source: source,
//           velocityMultiplier: 0.07
//         }
//       );
//     }

//     //removemos el original
//     projectile.remove()
//   }
// });

// /* 
// world.afterEvents.entityHurt.subscribe((ev) => {
//   const {
//     damage,
//     damageSource: { damagingEntity, cause },
//     hurtEntity,
//   } = ev;

//   if (damagingEntity.typeId !== "minecraft:player") {
//     return;
//   }

//   const equippableComp = damagingEntity.getComponent("equippable");
//   const mainhandItem = equippableComp.getEquipment("Mainhand");

//   if (mainhandItem !== ITEM_ID) {
//     return;
//   }
//   const { dimension, location } = damagingEntity;
//   const view = damagingEntity.getViewDirection();
//   Euforia.shootProjectile("koprium:blast_projectile", dimension, location, view, {
//     source: damagingEntity,
//   });
// });
//  */
