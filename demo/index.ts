/* eslint-disable max-classes-per-file */
import { PluginManager, Plugin } from '../src/index'

class APlugin implements Plugin {
    // @ts-ignore
    private pluginManager: PluginManager
    public apply(pluginManager: PluginManager) {
        this.pluginManager = pluginManager
        pluginManager.on('start', async (data, next) => {
            console.log('[ data ] >', data + '_a')
            setTimeout(async () => {
                await next!()
            }, 2000)
        })
        // setTimeout(() => {
        //     pluginManager.emit('plugin-b', 'hello,b')
        // }, 3000)
    }
}

class BPlugin implements Plugin {
    // @ts-ignore
    private pluginManager: PluginManager
    public apply(pluginManager: PluginManager) {
        this.pluginManager = pluginManager
        pluginManager.on('start', async (data, next) => {
            console.log('[ data ] >', data + '_b')
            await next!()
        })
    }
}

const pluginManager = new PluginManager()

pluginManager.register('plugin-a', new APlugin())
pluginManager.register('plugin-b', new BPlugin())

// pluginManager.emit('start', 'Hello')
pluginManager.emitSeries('start', 'Hello').catch((error) => {
    console.log('[ error ] >', error)
})
