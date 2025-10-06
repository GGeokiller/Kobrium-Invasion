import { world, system, Entity, EffectTypes, MolangVariableMap } from "@minecraft/server";
import { geo } from "../utils/geo";
import { createAreaParticle } from "../utils/particle";
import { EditorMode } from "@minecraft/server-editor";

const KOPRIUM_PYLON_ID = "koprium:koprium_pylon"

world.afterEvents.dataDrivenEntityTrigger.subscribe(data => {
    const { entity, eventId } = data
    if (eventId !== "koprium:inside_range") return;
    if (entity.hasTag("spawningKoprium")) return;
    entity.addTag("spawningKoprium")

    
})