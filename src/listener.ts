import { compose, fn } from './compose'

export class EventEmitter {
    private handlers: Record<string, Array<fn>>
    constructor() {
        this.handlers = {}
    }
    public on(name: string, handler: fn) {
        if (!this.handlers[name]) {
            this.handlers[name] = []
        }
        this.handlers[name]?.push(handler)
    }
    public emit(event: string, data?: unknown) {
        if (this.handlers[event]) {
            this.handlers[event]?.forEach((handler) => {
                handler(data)
            })
        }
    }
    public async emitSeries(name: string, data?: unknown) {
        if (this.handlers[name]) {
            await compose(this.handlers[name])(data)
        }
    }
    public async emitWaterfall(name: string, data?: unknown) {
        if (this.handlers[name]) {
            for (const event of this.handlers[name]) {
                data = await event(data)
            }
        }
    }
    public off(name: string, handler: fn) {
        if (this.handlers[name]) {
            const index = this.handlers[name].indexOf(handler)
            if (index >= 0) {
                this.handlers[name].splice(index, 1)
            }
        }
    }
}
