import { world, system, BlockVolume } from "@minecraft/server";
import { Vec3 } from "../utils/vec3";

const HEIGHT = 5;
const WIDTH = 5;

world.beforeEvents.playerBreakBlock.subscribe((data) => {
  let { player, block, itemStack, dimension } = data;
  if (itemStack?.typeId !== "koprium:koprium_pickaxe") return;
  if (Math.random() > 0.1) return;

  const volume = new BlockVolume(
    { x: block.location.x - WIDTH, y: block.location.y - HEIGHT, z: block.location.z - WIDTH },
    { x: block.location.x + WIDTH, y: block.location.y + HEIGHT, z: block.location.z + WIDTH }
  );
  const listBlocks = dimension.getBlocks(volume, {});
  for (const coord of listBlocks.getBlockLocationIterator()) {
    const currentBlock = dimension.getBlock(coord);
    if (currentBlock.typeId.includes("ore")) {
      system.run(() => {
        dimension.spawnEntity(
          "koprium:dummy_ore_outline_block",
          Vec3.subtract(currentBlock.center(), { x: 0, y: 1, z: 0 })
        );
      });
    }
  }
});
