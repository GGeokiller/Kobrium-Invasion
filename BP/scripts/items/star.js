import { world, system } from "@minecraft/server";


const ITEM_ID = "koprium:star";


world.afterEvents.itemUse.subscribe((ev) => {
  const { itemStack, source } = ev;

  if (itemStack?.typeId !== ITEM_ID) { return; }

  source.dimension.playSound("item.star.use", source.location)
});


