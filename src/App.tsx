import './App.css'
import { APIProvider, Map } from '@vis.gl/react-google-maps';

function App() {
    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string

    return (
        <>
            <APIProvider apiKey={API_KEY}>
                <Map
                    style={{ width: '60vw', height: '60vh' }}
                    defaultCenter={{ lat: 37.5407, lng: -77.4360 }}
                    defaultZoom={11}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                />
            </APIProvider>
        </>
    )
}

export default App
