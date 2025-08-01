import { type as eewDatasourceV0Type } from './eew-datasource-v0'
import { type as mapConfigV0Type } from './map-config-v0'
import { type as mapLayerV0Type } from './map-layer-v0'
import { type as mapSourceV0Type } from './map-source-v0'

export type PluginType =
    | typeof mapConfigV0Type
    | typeof mapLayerV0Type
    | typeof mapSourceV0Type
    | typeof eewDatasourceV0Type
