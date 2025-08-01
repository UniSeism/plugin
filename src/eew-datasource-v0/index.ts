import type { PluginMeta, PluginSettings } from '../plugin'
import Plugin from '../plugin'
import type EEWSchemaV0 from './schema/v0'

export const type = 'eew-datasource-v0'

export interface EewDatasourceV0Config {
    id: string
    axiosConfig: {
        url: string
        method: 'GET' | 'POST'
        params?: Record<string, any>
        data?: Record<string, string>
    }
    converter: (data: any) => EEWSchemaV0
}

export default class extends Plugin {
    private config: EewDatasourceV0Config

    constructor(
        meta: PluginMeta,
        config: EewDatasourceV0Config,
        settings?: PluginSettings
    ) {
        super(meta, settings)
        this.config = config
    }

    public getConfig(): EewDatasourceV0Config {
        return this.config
    }
}
