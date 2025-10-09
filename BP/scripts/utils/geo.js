import {
  world,
  system,
  DimensionTypes,
  Entity,
  EntityHealthComponent,
  EntityInventoryComponent,
  ItemStack,
  EquipmentSlot,
  Player,
  EffectType,
  EffectTypes,
} from "@minecraft/server";

export const PositiveEffects = [
  "absorption",
  "conduit_power",
  "fire_resistance",
  "health_boost",
  "instant_health",
  "jump_boost",
  "regeneration",
  "resistance",
  "saturation",
  "strength",
  "water_breathing",
  "night_vision",
  "speed",
  "invisibility",
]

export const geo = {
  /**
   *
   * @param {string} entityId
   * @returns {[Entity]}
   */
  getEntitiesFromWorld(entityId, tags = [], excludeTags = []) {
    let entities = [];
    for (const dimension of DimensionTypes.getAll()) {
      for (let entity of world
        .getDimension(dimension.typeId)
        .getEntities({ type: entityId, tags: tags, excludeTags: excludeTags })) {
        entities.push(entity);
      }
    }
    return entities;
  },

  /**
   *
   * @param {Entity} entity
   * @returns {EntityHealthComponent}
   */

  getHealth(entity) {
    return entity.getComponent("health");
  },

  /**
   *
   * @param {Entity} entity
   * @returns {EntityInventoryComponent}
   */
  getInventory(entity) {
    return entity.getComponent("inventory");
  },

  /**
   * @param {import('@minecraft/server').Player} player
   * @returns {boolean}
   */
  hasItemInMainHand(player, itemId) {
    const container = player.getComponent("inventory").container;
    const hasItem =
      player.getComponent("equippable").getEquipment(EquipmentSlot.Mainhand)?.typeId == itemId;
    if (hasItem) {
      return true;
    } else {
      return false;
    }
  },
  /**
   *
   * @param {Entity} entity
   * @returns {ItemStack}
   */
  getMainItem(entity) {
    return entity.getComponent("equippable").getEquipment(EquipmentSlot.Mainhand);
  },
  /**
   *
   * @param {Entity} entity
   */
  clearMainItem(entity) {
    if (entity.getGameMode() == "Creative") return;
    entity.getComponent("equippable").setEquipment(EquipmentSlot.Mainhand, undefined);
  },
  /**
   *
   * @param {Entity} entity
   * @param {import("@minecraft/server").Vector3} location
   * @param {Number} strength
   */
  impulseToLocation(entity, location, strength = 1, clearVelocity = false) {
    const dx = location.x - entity.location.x;
    const dy = location.y - entity.location.y;
    const dz = location.z - entity.location.z;

    const length = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (clearVelocity) {
      entity.clearVelocity();
    }
    entity.applyImpulse({
      x: (dx / length) * strength,
      y: (dy / length) * strength,
      z: (dz / length) * strength,
    });
  },
  /**
   *
   * @param {import("@minecraft/server").Vector3} location1
   * @param {import("@minecraft/server").Vector3} location2
   */
  sumVectors(location1, location2) {
    let dx = location1.x + location2.x;
    let dy = location1.y + location2.y;
    let dz = location1.z + location2.z;
    return { x: dx, y: dy, z: dz };
  },
  /**
   *
   * @param {Player} player
   * @param {String} itemId
   * @returns
   */
  hasArmorPiece(player, itemId) {
    const eq = player.getComponent("equippable");
    if (!eq) return false;

    const hasItem =
      eq.getEquipment(EquipmentSlot.Head)?.typeId === itemId ||
      eq.getEquipment(EquipmentSlot.Chest)?.typeId === itemId ||
      eq.getEquipment(EquipmentSlot.Legs)?.typeId === itemId ||
      eq.getEquipment(EquipmentSlot.Feet)?.typeId === itemId;

    return hasItem;
  },
  /**
   * 
   * @param {Player} player 
   * @param {Number} amount 
   * @param {String} itemId 
   * @returns 
   */
  removeItem(player, amount, itemId) {
    let con = player.getComponent(EntityComponentTypes.Inventory).container
    let success = false
    for (let i = 0; i < con.size; i++) {
      let item = con.getItem(i)
      if (item?.typeId == undefined || item?.typeId != itemId/*  || item?.amount <= 1 */) continue
      system.run(() => {
      if (item.amount > 1) {
        item.amount = item.amount -= amount
        con.setItem(i, item)
      } else {
        con.setItem(i, undefined)
      }
      })
      success = true
      return success;
    }
    return success;
  },
  /**
   * 
   * @param {Player} player 
   * @returns {import("@minecraft/server").Vector3}
   */
  fixPlayerLocation(player) {
    return {x: player.location.x, y: player.location.y + 0.9, z: player.location.z}
  },
  /**
   * 
   * @param {Entity} entity 
   * @returns {import("@minecraft/server").Vector3}
   */
  getEntityCenter(entity) {
    const head = entity.getHeadLocation();
    return {x: entity.location.x, y: (entity.location.y + head.y) / 2, z: entity.location.z}
  },
  /**
   * 
   * @returns {String}
   */
  getRandomPositiveEffect() {
    return PositiveEffects[Math.floor(Math.random() * PositiveEffects.length)]
  }
};