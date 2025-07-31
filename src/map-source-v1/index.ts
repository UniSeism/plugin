import type { LngLatLike, StyleSpecification } from 'maplibre-gl'
import type { PluginMeta } from '../plugin'
import Plugin from '../plugin'
export const type = 'map-source-v1'

export type MapSourceV1Config = {
    style: string | StyleSpecification
    center: LngLatLike
    zoom: number
}

export default class extends Plugin {
    private config: MapSourceV1Config

    constructor(meta: PluginMeta, config: MapSourceV1Config) {
        super(meta)
        this.config = config
    }

    public getConfig(): MapSourceV1Config {
        return this.config
    }
}
