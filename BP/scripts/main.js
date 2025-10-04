import { world, system } from "@minecraft/server"
import "./entities/entityControl"
import "./items/itemControl"
import "./blocks/blockControl"
import "./utils/item_components"

system.run(() => {
    world.sendMessage("Hello World")
})

/// hola de geo
// hola de euforia