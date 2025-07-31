import type { LngLatLike, StyleSpecification } from 'maplibre-gl'
import type { PluginMeta } from '../plugin'
import Plugin from '../plugin'
export const type = 'map-config-v0'

export type MapConfigV0Config = {
    style: string | StyleSpecification
    center: LngLatLike
    zoom: number
}

export default class extends Plugin {
    private config: MapConfigV0Config

    constructor(meta: PluginMeta, config: MapConfigV0Config) {
        super(meta)
        this.config = config
    }

    public getConfig(): MapConfigV0Config {
        return this.config
    }
}
