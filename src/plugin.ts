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

export type PluginSettingsItem = {
    key: string
    description: string
    type: 'string' | 'number' | 'boolean'
    default: string | number | boolean
    interface: `${string}.${string}.${string}`
}

export type PluginSettings = PluginSettingsItem[]

export default class {
    private meta: PluginMeta
    private settings: PluginSettings

    constructor(meta: PluginMeta, settings?: PluginSettings) {
        this.meta = meta
        this.settings = settings || []
    }

    public getMeta(): PluginMeta {
        return this.meta
    }

    public getSettings(): PluginSettings {
        return this.settings
    }
}
