import { world, system, DimensionTypes } from "@minecraft/server";

export const geo = {
    /**
     * 
     * @param {string} entityId 
     */
    getEntitiesFromWorld(entityId) {
        let entities = []
        for (const dimension of DimensionTypes.getAll()) {
            for (let entity of world.getDimension(dimension.typeId).getEntities({type: entityId})) {
                entities.push(entity)
            }
        }
        return entities;
    }
}