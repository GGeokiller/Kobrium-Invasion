import { world, system } from "@minecraft/server"
import "./entities/entityControl"
import "./items/itemControl"

system.run(() => {
    world.sendMessage("Hello World")
})

world.afterEvents.dataDrivenEntityTrigger.subscribe(ev => {
    const { entity, eventId } = ev

    if (entity.typeId == "eu:meteorite_fall" && ) {

    }
})