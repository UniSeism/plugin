export type Identifier = `${string}.${string}.${string}`

export interface Schema {
    identifier: Identifier
}

export interface Issuer {
    agency: {
        code: number | null
        name: string | null
    }
    system: {
        code: string | null
        name: string | null
    }
}

export interface Report {
    serial: number | null
    isCancel: boolean | null
    isDrill: boolean | null
    isExercise: boolean | null
    isWarning: boolean | null
    isFinal: boolean | null
    issuer: Issuer
    time: number
}

export interface Magnitude {
    identifier: Identifier
    value: number
}

export interface Location {
    latitude: number | null
    longitude: number | null
    depth: number | null
}

export interface Place {
    code: number | null
    name: string | null
    landOrSea: 'land' | 'sea' | null
}

export interface Hypocenter {
    isEstimate: boolean | null
    place: Place
    location: Location
    magnitude?: Magnitude[]
}

export interface Intensity {
    identifier: Identifier
    value: string | number
}

export interface IntensityFromTo {
    from: Intensity[]
    to: Intensity[]
}

export interface EstimatedIntensityLocation {
    type: 'area' | 'point'
    code: number | null
    name: string
}

export interface EstimatedIntensityArrival {
    time: number
    status: {
        code: number | null
        value: string | null
    }
}

export interface EstimatedIntensity {
    location: EstimatedIntensityLocation
    intensity: IntensityFromTo
    arrival: EstimatedIntensityArrival
    isWarning: boolean | null
}

export interface Earthquake {
    id: string
    time: number
    hypocenter: Hypocenter
    maxIntensity?: IntensityFromTo
    estimatedIntensity?: EstimatedIntensity[]
}

export type Accuracy = {
    path: `$.${string}`
} & (
    | {
          type: 'release'
          method: {
              code: number | null
              value: string
          }
      }
    | {
          type: 'change'
          reason: {
              code: number | null
              value: string
          }
          description: {
              code: number | null
              value: string
          }
      }
)

export default interface EEWSchemaV0 {
    schema: Schema
    report: Report
    earthquake: Earthquake
    accuracy?: Accuracy[]
}
