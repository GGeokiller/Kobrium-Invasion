import { world, system } from "@minecraft/server";

export const Euforia = {
  /**
   * Shoots a projectile in a given direction from a specific location.
   *
   * @param {string} projectileId - The ID of the projectile to spawn (e.g., "minecraft:arrow").
   * @param {import('@minecraft/server').Dimension} dimension - The dimension in which to spawn the projectile.
   * @param {import('@minecraft/server').Vector3} location - The starting position of the projectile.
   * @param {import('@minecraft/server').Vector3} direction - The direction vector the projectile will travel.
   * @param {Object} options - Additional options for projectile behavior.
   * @param {import('@minecraft/server').Entity} [options.source] - The entity that owns or fires the projectile.
   * @param {number} [options.velocityMultiplier=1] - Multiplier applied to the direction vector to set projectile speed.
   * @param {number} [options.uncertainty=0] - Adds random deviation to the projectile's trajectory (spread).
   */
  shootProjectile(
    projectileId,
    dimension,
    location,
    direction,
    { source, velocityMultiplier = 1, uncertainty = 0 }
  ) {
    const velocity = {
      x: direction.x * velocityMultiplier,
      y: direction.y * velocityMultiplier,
      z: direction.z * velocityMultiplier,
    };

    const projectile = dimension.spawnEntity(projectileId, location);
    const projectileComp = projectile.getComponent("minecraft:projectile");

    projectileComp?.shoot(velocity, {
      uncertainty,
    });

    if (source) {
      projectileComp.owner = source;
    }
    return projectile;
  },
};
