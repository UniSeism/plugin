import moment from 'moment'
import type { PluginMeta, PluginSettings } from '../plugin'
import type { EewDatasourceV0Config } from './index'
import EewDatasourceV0Plugin from './index'
import type EEWSchemaV0 from './schema/v0'
import type { EstimatedIntensity } from './schema/v0'

const meta: PluginMeta = {
    name: 'Wolfx JMA EEW Datasource',
    identifier: 'im.seis.plugin.wolfx.jma.eew',
    version: '0.0.1',
    description: 'Wolfx JMA EEW Datasource',
    author: 'seis.im',
    type: 'eew-datasource-v0'
}

const converter = (data: any): EEWSchemaV0 => {
    return {
        schema: {
            identifier: 'im.seis.schema.eew'
        },
        report: {
            serial: data.Serial,
            isCancel: data.isCancel,
            isDrill: false,
            isExercise: data.isTraining,
            isWarning: data.isWarn,
            isFinal: data.isFinal,
            issuer: {
                agency: {
                    code: null,
                    name: data.Issue.Source
                },
                system: {
                    code: null,
                    name: '緊急地震速報'
                }
            },
            time: moment(data.AnnouncedTime.replaceAll('/', '-'))
                .utcOffset(9)
                .toDate()
                .getTime()
        },
        earthquake: {
            id: data.EventID,
            time: moment(data.OriginTime.replaceAll('/', '-'))
                .utcOffset(9)
                .toDate()
                .getTime(),
            hypocenter: {
                isEstimate: data.isAssumption,
                place: {
                    code: null,
                    name: data.Hypocenter,
                    landOrSea: data.isSea ? 'sea' : 'land'
                },
                location: {
                    latitude: data.Latitude,
                    longitude: data.Longitude,
                    depth: data.Depth
                }
            },
            maxIntensity: {
                from: [
                    {
                        identifier: 'im.seis.intensity.jma.shindo',
                        value: data.MaxIntensity
                    }
                ],
                to: [
                    {
                        identifier: 'im.seis.intensity.jma.shindo',
                        value: data.MaxIntensity
                    }
                ]
            },
            estimatedIntensity: data.WarnArea.map(
                (area: any): EstimatedIntensity => ({
                    location: {
                        type: 'area',
                        code: null,
                        name: area.Chiiki
                    },
                    intensity: {
                        from: [
                            {
                                identifier: 'im.seis.intensity.jma.shindo',
                                value: area.Shindo2
                            }
                        ],
                        to: [
                            {
                                identifier: 'im.seis.intensity.jma.shindo',
                                value: area.Shindo1
                            }
                        ]
                    },
                    arrival: {
                        time: moment(area.Time.replaceAll('/', '-'))
                            .utcOffset(9)
                            .toDate()
                            .getTime(),
                        status: {
                            code: null,
                            value: null
                        }
                    },
                    isWarning: area.Type === '警報' ? true : false
                })
            )
        },
        accuracy: [
            {
                type: 'release',
                path: '$.earthquake.hypocenter.place.value',
                method: {
                    code: null,
                    value: data.Accuracy.Epicenter
                }
            },
            {
                type: 'release',
                path: '$.earthquake.hypocenter.location.depth',
                method: {
                    code: null,
                    value: data.Accuracy.Depth
                }
            },
            {
                type: 'release',
                path: '$.earthquake.hypocenter.magnitude[0].value',
                method: {
                    code: null,
                    value: data.Accuracy.Magnitude
                }
            },
            {
                type: 'change',
                path: '$.earthquake.estimatedIntensity',
                reason: {
                    code: null,
                    value: data.MaxIntChange.Reason
                },
                description: {
                    code: null,
                    value: data.MaxIntChange.String
                }
            }
        ]
    }
}

const config: EewDatasourceV0Config = {
    id: 'eew-datasource-v0',
    axiosConfig: {
        url: 'https://api.wolfx.jp/jma_eew.json',
        method: 'GET',
        params: {
            time: new Date().getTime()
        }
    },
    converter
}

const settings: PluginSettings = [
    {
        key: 'interval',
        description: '轮询计时器 (ms)',
        type: 'number',
        default: 1000,
        interface: 'im.seis.library.axios.interval'
    }
]

export default new EewDatasourceV0Plugin(meta, config, settings)
