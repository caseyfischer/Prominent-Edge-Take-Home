import { Incident } from "./Incident";
import axios from "axios";
import moment from "moment";

export class WeatherUtils {
    // this should really live only on the server. i'm just saving time by leaving it here
    // (you will need to define VITE_METEOSTAT_API_KEY in your .env file to make this work)
    static #METEOSTAT_API_KEY = import.meta.env.VITE_METEOSTAT_API_KEY as string;
    static #METEOSTAT_URL = "http://localhost:5173/weatherr";
    static #TIMEZONE = "US/Eastern"; // this would be dynamic IRL

    private static formatDate(date: Date): string {
        return moment(date).format('YYYY-MM-DD');
    }

    static async enrichIncident(incident: Incident): Promise<Incident> {
        try {
            const hourOfDay = incident.details.description.hour_of_day;

            // don't bother with the round trip if there's already weather data attached
            // to this incident
            if (incident.details.weather !== undefined || hourOfDay === undefined) {
                return incident;
            }

            const results = await axios.get(WeatherUtils.#METEOSTAT_URL, {
                headers: {
                    "x-rapidapi-host": "meteostat.p.rapidapi.com",
                    "x-rapidapi-key": WeatherUtils.#METEOSTAT_API_KEY
                },
                params: {
                    lat: incident.latitude,
                    lon: incident.longitude,
                    start: WeatherUtils.formatDate(incident.startTime),
                    end: WeatherUtils.formatDate(incident.endTime),
                    tz: WeatherUtils.#TIMEZONE
                }
            })

            // format returned from the API is payload.data.data :/
            const relevantChunk = results.data.data[hourOfDay];

            // make a new copy of the incident to avoid potential weirdness with
            // react's rerendering trigger (may not actually be necessary)
            const newDetails = {
                ...incident.details,
                weather: relevantChunk
            }
            const newIncident = {
                ...incident,
                details: newDetails
            }
            return newIncident;
        } catch (e) {

            // irl we would want to capture this failure and surface it to the user
            console.log(`failed to enrich incident data \nerror:\n\n${e}`);
            return incident;
        }
    }
}
