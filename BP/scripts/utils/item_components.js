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

});
