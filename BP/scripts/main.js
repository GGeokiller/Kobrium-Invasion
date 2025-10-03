import { world, system } from "@minecraft/server"
import "./entities/entityControl"
//import "./items/itemControl"

system.run(() => {
    world.sendMessage("Hello World")
})

