import { world, system } from "@minecraft/server"

system.run(() => {
    world.sendMessage("Hello World")
})