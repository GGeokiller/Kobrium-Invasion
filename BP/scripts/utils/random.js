export const Random = {
    random: () => Math.random(),

    number(min, max) {
        return Math.random() * (max - min) + min;
    },

    int(min, max, step = 1) {
        const range = Math.floor((max - min) / step);
        return min + step * Math.floor(Math.random() * (range + 1));
    },
    chance(percent) {
        return Math.random() * 100 < percent;
    },


    boolean(prob = 0.5) {
        return Math.random() < prob;
    },

    shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    },

    toShuffled(arr) {
        return Random.shuffle([...arr]);
    },

    pick(arr) {
        if (!arr.length) return undefined;
        return arr[Math.floor(Math.random() * arr.length)];
    },

    take(arr, count) {
        const copy = Random.toShuffled(arr);
        return copy.slice(0, count);
    },

    sample(arr, options = {}) {
        const weights = options.weights || arr.map(() => 1);
        const total = weights.reduce((a, b) => a + b, 0);
        let r = Math.random() * total;
        for (let i = 0; i < arr.length; i++) {
            if (r < weights[i]) return arr[i];
            r -= weights[i];
        }
        return arr[arr.length - 1];
    },
    bigint(min, max) {
        min = BigInt(min);
        max = BigInt(max);
        return min + BigInt(Math.floor(Math.random() * Number(max - min + 1n)));
    },
    // Bytes aleatorios
    bytes(count) {
        const buf = new Uint8Array(count);
        crypto.getRandomValues(buf);
        return buf;
    },

    fillBytes(buf) {
        crypto.getRandomValues(buf);
        return buf;
    }
};
