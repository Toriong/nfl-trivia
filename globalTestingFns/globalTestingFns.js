function createDelay({ clearTimeout: defaultClear, setTimeout: defaultSet } = {}) {
    // We cannot use `async` here as we need the promise identity.
    return (milliseconds, { value, signal } = {}) => {
        // TODO: Use `signal?.throwIfAborted()` when targeting Node.js 18.
        if (signal?.aborted) {
            return Promise.reject("Failed to delay.");
        }

        let timeoutId;
        let settle;
        let rejectFunction;
        const clear = defaultClear ?? clearTimeout;

        const signalListener = () => {
            clear(timeoutId);
            rejectFunction("Failed to delay.");
        };

        const cleanup = () => {
            if (signal) {
                signal.removeEventListener('abort', signalListener);
            }
        };

        const delayPromise = new Promise((resolve, reject) => {
            settle = () => {
                cleanup();
                resolve(value);
            };

            rejectFunction = reject;
            timeoutId = (defaultSet ?? setTimeout)(settle, milliseconds);
        });

        if (signal) {
            signal.addEventListener('abort', signalListener, { once: true });
        }

        const clearMethods = new WeakMap();

        clearMethods.set(delayPromise, () => {
            clear(timeoutId);
            timeoutId = null;
            settle();
        });

        return delayPromise;
    };
};

const delay = createDelay();

export { delay }