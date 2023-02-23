# 简介

基于事件总线的插件系统，能够快速的让你的应用拥有插件机制，从而变得可扩展

## 安装

`npm install plugineasy --save-dev`

## 使用

```js
const pluginManager = new PluginManager()

pluginManager.register('plugin-a', new APlugin())
pluginManager.register('plugin-b', new BPlugin())

class APlugin implements Plugin {
    apply(pluginManager) {
        this.pluginManager = pluginManager
        pluginManager.on('start', async (data, next) => {
            console.log('[ data ] >', data + '_a')
            await next()
        })
    }
}

class BPlugin implements Plugin {
    public apply(pluginManager) {
        this.pluginManager = pluginManager
        pluginManager.on('start', async (data, next) => {
            console.log('[ data ] >', data + '_b')
            await next()
        })
    }
}

pluginManager.emitSeries('start', 'Hello').catch((error) => {})

// ouput:
// [ data ] > Hello_a
// [ data ] > Hello_b

```

## API

### pluginManager

- register

  types: (name: string, plugin: Plugin)=>void

  desc: 注册插件

- on

  types: (name: string, handler: fn)=>void

  desc: 监听事件

- emit

  types: (name:string,data?:any)=>void

  desc: 事件回调异步执行

- emitSeries

  types: (name:string,data?:any)=>Promise

  desc: 事件回调同步执行

- emitWaterfall

  types: (name:string,data?:any)=>Promise

  desc: 事件回调同步执行，且将上一个回调的结果当做参数传给下一个回调

- off

  types: (name: string, handler: fn)=>void

  desc: 移除事件
