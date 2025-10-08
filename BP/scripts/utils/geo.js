import {
  world,
  system,
  DimensionTypes,
  Entity,
  EntityHealthComponent,
  EntityInventoryComponent,
  ItemStack,
  EquipmentSlot,
} from "@minecraft/server";

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
};
