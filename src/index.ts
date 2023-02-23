import { EventEmitter } from './listener'

export interface Plugin {
    apply(pluginManager: PluginManager): void
}

export class PluginManager extends EventEmitter {
    private plugins: Record<string, Plugin> = {}

    public register(name: string, plugin: Plugin) {
        if (this.plugins[name]) {
            return
        }
        this.plugins[name] = plugin
        plugin.apply(this)
    }

    public unload(name: string) {
        delete this.plugins[name]
    }

    public getPlugin(name: string) {
        return this.plugins[name]
    }
}
