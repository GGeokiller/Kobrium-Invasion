import { world, system, BlockPermutation } from "@minecraft/server"

import { Random } from "../utils/random.js"

const METORITE_ID = "kobrium:meteorite"

world.afterEvents.entitySpawn.subscribe(ev => {
    const { entity } = ev

    if (entity.typeId == METORITE_ID) {
        console.warn("Hola Meteorito")
        entity.setOnFire(999)

        const randomDirection = {
            x: (Math.random() - 0.5) * 2,
            y: 0,
            z: (Math.random() - 0.5) * 2
        }

        const magnitude = 0.15
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
        if (eventId == "kobrium:fall") {
            console.warn("explosion")
            const { dimension, location } = entity

            dimension.createExplosion(location, 5, { breaksBlocks: true, causesFire: true, source: entity })

            const radius = 8;
            system.run(() => {
                for (let x = -radius; x < radius; x++) {
                    for (let z = -radius; z < radius; z++) {
                        if (x * x + z * z <= radius * radius) {
                            let block = dimension.getBlockBelow({ x: location.x + x, y: location.y, z: location.z + z }, { maxDistance: 10 });
                            if (!block) { return }

                            if (Random.chance(30)) {
                                block.setPermutation(BlockPermutation.resolve('minecraft:smooth_basalt'));

                            } else if (Random.chance(10)) {
                                block.setPermutation(BlockPermutation.resolve('minecraft:nether_gold_ore'));

                            } else if (Random.chance(10)) {
                                block.setPermutation(BlockPermutation.resolve('minecraft:magma'));

                            } else {
                                block.setPermutation(BlockPermutation.resolve('minecraft:netherrack'));
                            }
                            if (Random.chance(5)) {
                                block.above().setPermutation(BlockPermutation.resolve('minecraft:sculk_sensor'));
                            }

                        }
                    }
                }
            });

            entity.remove()
        }


    }
})