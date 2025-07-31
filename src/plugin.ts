import type { PluginType } from './types'

export type PluginIdentifier = `${string}.${string}.${string}`

export interface PluginMeta {
    name: string
    identifier: PluginIdentifier
    version: string
    description: string
    author: string
    type: PluginType
}

export default class {
    private meta: PluginMeta

    constructor(meta: PluginMeta) {
        this.meta = meta
    }

    public getMeta(): PluginMeta {
        return this.meta
    }
}
