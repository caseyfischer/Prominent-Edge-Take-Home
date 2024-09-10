import './App.css'
import { APIProvider, Map, MapControl, ControlPosition, Marker } from '@vis.gl/react-google-maps';
import { useFilePicker } from 'use-file-picker';
import { useState } from 'react';
import type { Incident } from './Incident';
import IncidentDetails from './IncidentDetails';
import { WeatherUtils } from './WeatherUtils';

function App() {
    // this isn't a secure way to use the API key (it's exposed to the client)
    const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;

    const [incident, setIncident] = useState<Incident | undefined>(undefined);
    const [infoOpen, setInfoOpen] = useState<boolean>(false);
    const toggleInfoWindow = () => {
        setInfoOpen(!infoOpen);
    }

    const { openFilePicker } = useFilePicker({
        accept: '.json',
        multiple: false,
        onFilesRejected: ({ errors }) => {
            alert(`Import failed with errors:\n\n${errors}\n\nPlease try again while wearing tinfoil hat!`);
        },
        onFilesSuccessfullySelected: ({ filesContent }) => {
            // this library seems to have missing type annotations for this callback..?
            try {
                // the file picker component gives us an array regardless of number of files, hence the [0]
                const fileName = filesContent[0].name;
                const json = JSON.parse(filesContent[0].content);
                const lat = json.address.latitude;
                const lng = json.address.longitude;

                const newIncident: Incident = {
                    fileName,
                    details: json,
                    latitude: lat,
                    longitude: lng,
                    placeName: json.address.common_place_name,
                    startTime: new Date(json.description.event_opened),
                    endTime: new Date(json.description.event_closed),
                }
                WeatherUtils.enrichIncident(newIncident).then((enrichedIncident) => {
                    setIncident(enrichedIncident);
                    console.log(enrichedIncident);
                    setInfoOpen(true);
                })
            } catch (e) {
                alert(`Import failed with error:\n\n${e}\n\nTry again while wearing tinfoil hat`);
            }
        }
    });

    return (
        <>
            <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
                <Map
                    style={{ width: '100vw', height: '100vh' }}
                    defaultCenter={{ lat: 37.5407, lng: -77.4360 }}
                    defaultZoom={11}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                    center={incident ? { lat: incident.latitude, lng: incident.longitude } : null}
                >
                    <MapControl position={ControlPosition.TOP_LEFT}>
                        <button id="fileButton" onClick={openFilePicker}>Select File</button>
                    </MapControl>
                    {
                        incident && <>
                            <Marker
                                position={{ lat: incident.latitude, lng: incident.longitude }}
                                onClick={toggleInfoWindow}
                            />

                            {infoOpen && <IncidentDetails incident={incident} setOpen={setInfoOpen} />}
                        </>
                    }
                    <MapControl position={ControlPosition.LEFT_CENTER}>
                        <div>foo!</div>
                    </MapControl>
                </Map>
            </APIProvider>
        </>
    )
}

export default App
