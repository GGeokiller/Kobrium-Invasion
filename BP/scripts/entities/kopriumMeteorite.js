import { world, system } from "@minecraft/server"

import { Random } from "../utils/random.js"

const METORITE_ID = "kobrium:meteorite"

world.afterEvents.entitySpawn.subscribe(ev => {
    const { entity } = ev

    if (entity.typeId == METORITE_ID) {
        world.sendMessage("Hola Meteorito")

        const randomDirection = {
            x: (Math.random() - 0.5) * 2,
            y: 0,
            z: (Math.random() - 0.5) * 2
        }

        const magnitude = 0.2
        const length = Math.sqrt(randomDirection.x ** 2 + randomDirection.y ** 2 + randomDirection.z ** 2)
        const impulse = {
            x: (randomDirection.x / length) * magnitude,
            y: (randomDirection.y / length) * magnitude,
            z: (randomDirection.z / length) * magnitude
        }

        const systemId = system.runInterval(() => {
            if (entity.isValid) {
                entity.applyImpulse(impulse)
            } else {
                system.clearRun(systemId)
            }
        })
    }
})

world.afterEvents.dataDrivenEntityTrigger.subscribe(ev => {
    const { entity, eventId } = ev

    if (entity.typeId == METORITE_ID) {
        world.sendMessage("explosion")
        entity.remove()
        /// meteorite fall logic

    }
})