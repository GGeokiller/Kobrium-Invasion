import { world, system, MolangVariableMap } from "@minecraft/server";
import { KOPRIUM_ENTITIES_IDS, KOPRIUM_PARACORE_ID, KOPRIUM_ENTITIES_COLLISION_BOX } from "./data.js";
import { geo } from "../../utils/geo.js";
import { geoParticles } from "../../utils/particle.js";
import { Random } from "../../utils/random.js";

let KOPRIUM_ENTITIES_IDS_V2 = KOPRIUM_ENTITIES_IDS.filter(id => id != KOPRIUM_PARACORE_ID)

system.runInterval(() => {
    for (const entity of world.getDimension("overworld").getEntities({ type: KOPRIUM_PARACORE_ID })) {
        let paracoreTag = entity.getTags().find(tag => tag.startsWith("paracore_"))
        let immortalEntity = world.getDimension("overworld").getEntities({ tags: [paracoreTag], excludeTypes: [KOPRIUM_PARACORE_ID], maxDistance: 64, location: entity.location })[0]
        immortalEntity.addTag("hasParacore")
        let variableMap = new MolangVariableMap()
        variableMap.setFloat("height", KOPRIUM_ENTITIES_COLLISION_BOX[immortalEntity.typeId].height)
        variableMap.setFloat("width", KOPRIUM_ENTITIES_COLLISION_BOX[immortalEntity.typeId].width)
        immortalEntity.dimension.spawnParticle("koprium:koprium_paracore_effect", immortalEntity.location, variableMap)
        geoParticles.midDirectionalLineBetween("koprium:koprium_pylon_spawn_line", entity.dimension.id, geo.getEntityCenter(entity), geo.getEntityCenter(immortalEntity), Random.number(0.1, 0.2), 1, 0.2, 0.2, 1, 2, 1);
    }
}, 5)

world.afterEvents.entitySpawn.subscribe(data => {
    let { entity } = data;
    if (!KOPRIUM_ENTITIES_IDS_V2.includes(entity.typeId)) return;
    if (Math.random() > 0.1) return;
    let randomId = Random.int(1, 15)
    entity.addTag(`paracore_${randomId}`)
    let paracore = entity.dimension.spawnEntity(KOPRIUM_PARACORE_ID, entity.location);
    paracore.addTag(`paracore_${randomId}`)
})

world.afterEvents.dataDrivenEntityTrigger.subscribe(data => {
    const { entity, eventId } = data
    if (eventId !== "koprium:paracore_death") return;
    if (entity.typeId != KOPRIUM_PARACORE_ID) return;
    let paracoreTag = entity.getTags().find(tag => tag.startsWith("paracore_"))
    world.getDimension("overworld").getEntities({ tags: [paracoreTag], excludeTypes: [KOPRIUM_PARACORE_ID], maxDistance: 128, location: entity.location }).forEach(e => {
        if (!e) return;
        e.removeTag("hasParacore")
    })
    
})

/* world.afterEvents.entityDie.subscribe(data => {
    let { entity } = data;
    if (entity?.typeId != KOPRIUM_PARACORE_ID) return;
    
},) */