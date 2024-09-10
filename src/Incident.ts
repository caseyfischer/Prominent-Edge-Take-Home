export type Incident = {
    fileName: string,
    details: IncidentDetails,
    latitude: number,
    longitude: number,
    placeName: string | undefined
    startTime: Date,
    endTime: Date,
}

export type IncidentDetails = {
    description: IncidentDescription,
    weather: object | undefined
}

export type IncidentDescription = {
    hour_of_day: string | undefined
}

// in a real world setting these would be much more built-out based on what data we need to get
// from the input files. for now i've just put in strictly the fields that i'm using
