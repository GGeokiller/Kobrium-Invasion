import { world, system, MolangVariableMap, Entity, GameMode, EntityDamageCause } from "@minecraft/server";
import { KOPRIUM_ENTITIES_IDS, KOPRIUM_PARACORE_ID, KOPRIUM_ENTITIES_COLLISION_BOX } from "./data.js";
import { geo } from "../../utils/geo.js";
import { geoParticles } from "../../utils/particle.js";
import { Random } from "../../utils/random.js";

let KOPRIUM_ENTITIES_IDS_V2 = KOPRIUM_ENTITIES_IDS.filter(id => id != KOPRIUM_PARACORE_ID)

system.runInterval(() => {
    for (const entity of world.getDimension("overworld").getEntities({ type: KOPRIUM_PARACORE_ID })) {
        try {
            let players = entity.dimension.getPlayers({location: entity.location, maxDistance: 5, gameMode: GameMode.Survival})
            let closestPlayer = players[0]
            if (closestPlayer && Math.random() < 0.1 && entity.isOnGround) {
                entity.applyImpulse({x: Random.number(-2, 2), y: Random.number(1, 2), z: Random.number(-2,2)})
                players.forEach(player => {
                    player.applyDamage(8, {cause: EntityDamageCause.entityAttack, damagingEntity: entity})
                })
                entity.playAnimation("animation.koprium_paracore.scape")
                entity.dimension.spawnParticle("koprium:koprium_paracore_scape", geo.sumVectors(entity.location, {x:0, y: 1, z: 0}))
            }

            let paracoreTag = entity.getTags().find(tag => tag.startsWith("paracore_"))
            if (!paracoreTag) {entity.addTag(`paracore_${Random.int(1, 15)}`)}
            paracoreTag = entity.getTags().find(tag => tag.startsWith("paracore_"))
            let immortalEntity = world?.getDimension("overworld")?.getEntities({ tags: [paracoreTag], excludeTypes: [KOPRIUM_PARACORE_ID], maxDistance: 64, location: entity.location })[0]
            if (!immortalEntity) {
                immortalEntity = getNewImmortalEntity(entity, paracoreTag)
                immortalEntity.addTag(paracoreTag)
            }
            if (!immortalEntity) {console.warn("§c< ! > NO ENTITY FOUND < ! > [scripts/entities/koprium/paracore-20]'"); entity.remove(); return;}
            immortalEntity.addTag("hasParacore")
            let variableMap = new MolangVariableMap()
            variableMap.setFloat("height", KOPRIUM_ENTITIES_COLLISION_BOX[immortalEntity.typeId].height)
            variableMap.setFloat("width", KOPRIUM_ENTITIES_COLLISION_BOX[immortalEntity.typeId].width)
            immortalEntity.dimension.spawnParticle("koprium:koprium_paracore_effect", immortalEntity.location, variableMap)
            geoParticles.midDirectionalLineBetween("koprium:koprium_pylon_spawn_line", entity.dimension.id, geo.sumVectors(geo.getEntityCenter(entity), {x:0,y:0.9*1.25,z:0}), geo.getEntityCenter(immortalEntity), Random.number(0.1, 0.2), 0.2, 1, 0.2, 1, 2, 1);
        } catch{}
    }
}, 5)

/**
 * 
 * @param {Entity} entity 
 * @param {[]} paracoreTag 
 */
function getNewImmortalEntity(entity, paracoreTag, excludedEntityIds = []) {
    console.warn(`§gLooking for a candidate for: ${entity?.typeId}, with tag: ${paracoreTag}, and excludedIds: ${JSON.stringify(excludedEntityIds)}`)
    const entities = entity.dimension.getEntities({
        families: ["koprium"],
        excludeTypes: [KOPRIUM_PARACORE_ID],
        excludeTags: ["hasParacore"],
        maxDistance: 32,
        location: entity.location
    });

    if (entities.length == 0) {
        console.warn("§cNo candidate removing...")
        entity.remove();
    }

    for (const e of entities) {
        if (excludedEntityIds.includes(e.id)) continue;

        if (e.getTags().find(tag => tag.startsWith("paracore_")) || e.hasTag("hasParacore")) {
            excludedEntityIds.push(e.id);
            const result = getNewImmortalEntity(entity, paracoreTag, excludedEntityIds);
            if (result) return result;
            continue;
        }
        console.warn(`§aFound candidate entity for ${e.typeId}`)
        return e;
    }

    return undefined;
}


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
    if (!paracoreTag) return;
    entity.addTag("paracoreDeath")
    world.getDimension("overworld").getEntities({ tags: [paracoreTag], excludeTypes: [KOPRIUM_PARACORE_ID], maxDistance: 128, location: entity.location }).forEach(e => {
        if (!e) return;
        e.removeTag("hasParacore")
    })
})

world.beforeEvents.entityRemove.subscribe(data => {
    let {removedEntity} = data
    if (removedEntity?.typeId != KOPRIUM_PARACORE_ID) return;
    if (removedEntity.hasTag("paracoreDeath")) return;
    
        let paracoreTag = removedEntity.getTags().find(tag => tag.startsWith("paracore_"))
        world.getDimension("overworld").getEntities({tags:[paracoreTag],excludeTypes:[KOPRIUM_PARACORE_ID],maxDistance:128,location:removedEntity.location}).forEach(e=>
            system.run(() => {
                try {
                e.removeTag(paracoreTag)
                } catch{}
            })
        );
})

/* world.afterEvents.entityDie.subscribe(data => {
    let { entity } = data;
    if (entity?.typeId != KOPRIUM_PARACORE_ID) return;
    
},) */