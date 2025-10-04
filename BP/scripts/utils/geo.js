import { world, system, DimensionTypes, Entity, EntityHealthComponent, EntityInventoryComponent } from "@minecraft/server";

export const geo = {
    /**
     * 
     * @param {string} entityId 
     * @returns {[Entity]}
     */
    getEntitiesFromWorld(entityId, tags = [], excludeTags = []) {
        let entities = []
            for (const dimension of DimensionTypes.getAll()) {
                for (let entity of world.getDimension(dimension.typeId).getEntities({type: entityId, tags: tags, excludeTags: excludeTags})) {
                    entities.push(entity)
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
        return entity.getComponent("health")
    },

    /**
     * 
     * @param {Entity} entity 
     * @returns {EntityInventoryComponent}
     */
    getInventory(entity) {
        return entity.getComponent("inventory")
    }
}