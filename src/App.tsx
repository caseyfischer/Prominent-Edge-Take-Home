import './App.css'
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { useFilePicker } from 'use-file-picker';
import { useState } from 'react';

type Incident = {
    name: string,
    content: string
}

function App() {
    // this isn't a secure way to use the API key (it's exposed to the client)
    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;
    const [incident, setIncident] = useState<Incident | undefined>(undefined);

    const { openFilePicker, loading } = useFilePicker({
        accept: '.json',
        multiple: false,
        onFilesRejected: ({ errors }) => {
            alert(`Import failed with errors:\n\n${errors}\n\nPlease try again while wearing tinfoil hat!`);
        },
        onFilesSuccessfullySelected: ({ filesContent }) => {
            // this library seems to have missing type annotations for this callback..?
            try {
                console.log('onFilesSuccessfullySelected', filesContent);
                const fileName = filesContent[0].name;
                const json = filesContent[0].content;
                const newIncident: Incident = {
                    name: fileName,
                    content: json
                }
                setIncident(newIncident);
            } catch (e) {
                alert(`Import failed with error:\n\n${e}!\n\nTry again while wearing tinfoil hat`);
            }
        }
    });

    return (
        <>
            <button onClick={openFilePicker}>Select File</button>
            <APIProvider apiKey={API_KEY}>
                <Map
                    style={{ width: '60vw', height: '60vh' }}
                    defaultCenter={{ lat: 37.5407, lng: -77.4360 }}
                    defaultZoom={11}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                >
                    <Marker position={{ lat: 37.5407, lng: -77.4360 }} />
                </Map>
            </APIProvider>
            <pre>
                {!loading && incident && incident.content}
            </pre>
        </>
    )
}

export default App
