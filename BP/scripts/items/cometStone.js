import { world, system } from "@minecraft/server";
import { Random } from "../utils/random.js";
import { geo } from "../utils/geo.js";

const ITEM_ID = "koprium:comet_stone";
const MIN_DISTANCE = 20;
const MAX_DISTANCE = 30;

world.afterEvents.itemUse.subscribe((ev) => {
  const { itemStack, source } = ev;

  if (itemStack?.typeId === ITEM_ID) {
    const { location, dimension } = source;

    const distance = Random.number(MIN_DISTANCE, MAX_DISTANCE);

    const angle = Random.number(0, Math.PI * 2);

    const xOffset = distance * Math.cos(angle);
    const zOffset = distance * Math.sin(angle);

    const newX = location.x + xOffset;
    const newY = location.y + 10;
    const newZ = location.z + zOffset;

    dimension.spawnEntity("koprium:meteorite", {
      x: newX,
      y: newY,
      z: newZ,
    });

    geo.clearMainItem(source);

    world.sendMessage({
      rawtext: [
        { text: "§c<< ! >>\n" },
        { translate: "meteorite.coordinates" },
        { text: `${zxlocationToString({ x: newX, z: newZ })} ` },
        { text: "\n<< ! >>" },
      ],
    });
  }
});

function zxlocationToString(location) {
  return `[x: ${location.x.toFixed(1)}, z: ${location.z.toFixed(1)}]`;
}
