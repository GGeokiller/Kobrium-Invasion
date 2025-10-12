import {world, system} from "@minecraft/server"
import { Random } from "../utils/random"
import { willFall } from "../entities/koprium/Meteorite"

let METEORITE_CHANCE = 1.0
let STAR_NIGHT_CHANCE = 1.0

system.runInterval(() => {
    const timeOfDay = world.getTimeOfDay();
    const isNight = timeOfDay > 12000;
    const prevIsNight = world.getDynamicProperty("isNight") ?? false;

    if (isNight !== prevIsNight) {
        world.setDynamicProperty("isNight", isNight);

        if (isNight) {
            if (Math.random() < METEORITE_CHANCE) spawnMeteorite();
            if (Math.random() < STAR_NIGHT_CHANCE) {
                world.sendMessage({ rawtext: [{ text: "§g<< ! >>\n" }, { translate: "starfall.active" },{ text: "\n<< ! >>" }] })
                world.setDynamicProperty("isStarFall", true);
            } else {
                world.setDynamicProperty("isStarFall", false);
            }
        } else {
            world.setDynamicProperty("isStarFall", false);
        }
    }
}, 100);


function spawnMeteorite() {
    let randomX = Random.number(-5000, 5000)
    let randomZ = Random.number(-5000, 5000)
    willFall({ x: Math.floor(randomX), y: 200, z: Math.floor(randomZ) }, 30)
}