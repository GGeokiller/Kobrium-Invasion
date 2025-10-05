import { world, system } from "@minecraft/server";


system.beforeEvents.startup.subscribe(ev => {
    ev.blockComponentRegistry.registerCustomComponent('koprium:landmine', {

        onStepOn(ev, arg) {
            const { block, dimension } = ev
            const {
                radius = 1,
                breaksBlocks = true,
                causesFire = true
            } = arg.params;

            dimension.createExplosion(block.location, radius, { breaksBlocks: breaksBlocks, causesFire: causesFire })

        },
        onPlayerBreak(ev, arg) {
            const { block, dimension } = ev
            const {
                radius = 1,
                breaksBlocks = true,
                causesFire = true
            } = arg.params;

            dimension.createExplosion(block.location, radius, { breaksBlocks: breaksBlocks, causesFire: causesFire })
        }
    })
})