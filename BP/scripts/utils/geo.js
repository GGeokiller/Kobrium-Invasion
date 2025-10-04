import { world, system, DimensionTypes } from "@minecraft/server";

export const geo = {
    /**
     * 
     * @param {string} entityId 
     */
    getEntitiesFromWorld(entityId, tags = [], excludeTags = []) {
        let entities = []
            for (const dimension of DimensionTypes.getAll()) {
                for (let entity of world.getDimension(dimension.typeId).getEntities({type: entityId, tags: tags, excludeTags: excludeTags})) {
                    entities.push(entity)
                }
            }
        return entities;
    }
}