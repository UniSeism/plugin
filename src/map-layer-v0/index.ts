import type { AddLayerObject } from 'maplibre-gl'
import type { PluginMeta } from '../plugin'
import Plugin from '../plugin'

export const type = 'map-layer-v0'

export type MapLayerV0Config = AddLayerObject

export default class extends Plugin {
    private config: MapLayerV0Config

    constructor(meta: PluginMeta, config: MapLayerV0Config) {
        super(meta)
        this.config = config
    }

    public getConfig(): MapLayerV0Config {
        return this.config
    }
}
