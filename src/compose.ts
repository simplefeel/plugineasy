export type fn = (ctx: unknown, next?: () => void) => Promise<unknown>

export function compose(plugins: Array<fn>) {
    let index = -1
    return async (ctx: unknown) => {
        async function dispatch(i: number) {
            if (i <= index) {
                return Promise.reject(new Error('next() called multpile times'))
            }
            index = i

            if (plugins.length === i) {
                return
            }

            const fn = plugins[i++]

            return await fn(ctx, dispatch.bind(null, i))
        }
        await dispatch(0)
    }
}
