import { system, world } from '@minecraft/server';

system.beforeEvents.startup.subscribe(({ itemComponentRegistry }) => {

    itemComponentRegistry.registerCustomComponent('eu:consume_effects', {
        onConsume(ev, arg) {
            const { source } = ev;
            const params = arg.params;

            for (const { name, duration, amplifier = 0, showParticles = true } of params) {
                source.addEffect(name, duration, { amplifier, showParticles });
            }
        }
    });

    //maneja la durabilidad de una herramienta al romper un bloque
    itemComponentRegistry.registerCustomComponent('eu:generic_tool', {
        onMineBlock(ev) {
            const { source } = ev
            const equippable = source.getComponent("minecraft:equippable");

            const mainhand = equippable.getEquipmentSlot("Mainhand");
            if (!mainhand.hasItem()) return;

            if (source.getGameMode() == "Creative") return;

            const itemStack = mainhand.getItem();

            const durability = itemStack.getComponent("minecraft:durability");
            if (!durability) return;

            const enchantable = itemStack.getComponent("minecraft:enchantable");
            const unbreakingLevel = enchantable?.getEnchantment("unbreaking")?.level;

            const damageChance = durability.getDamageChance(unbreakingLevel) / 100;

            if (Math.random() > damageChance) return;

            const shouldBreak = durability.damage == durability.maxDurability;

            if (shouldBreak) {
                mainhand.setItem(undefined);
                source.playSound("random.break");
            } else {
                durability.damage++;
                mainhand.setItem(itemStack);
            }
        }
    });
});
