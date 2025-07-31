import type {
    CanvasSourceSpecification,
    SourceSpecification
} from 'maplibre-gl'
import type { PluginMeta } from '../plugin'
import Plugin from '../plugin'

export const type = 'map-source-v0'

export interface MapSourceV0Config {
    id: string
    source: SourceSpecification | CanvasSourceSpecification
}

export default class extends Plugin {
    private config: MapSourceV0Config

    constructor(meta: PluginMeta, config: MapSourceV0Config) {
        super(meta)
        this.config = config
    }

    public getConfig(): MapSourceV0Config {
        return this.config
    }
}
