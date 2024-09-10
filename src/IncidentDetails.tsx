import { InfoWindow } from "@vis.gl/react-google-maps";
import type { Incident } from './Incident';
import { Dispatch, SetStateAction } from "react";

type Props = {
    loading: boolean
    incident: Incident | undefined,
    setOpen: Dispatch<SetStateAction<boolean>>
}

function IncidentDetails({ loading, incident, setOpen }: Props) {
    return (
        <InfoWindow
            className='info'
            position={incident ? { lat: incident.latitude, lng: incident.longitude } : undefined}
            onClose={() => { setOpen(false) }}
            pixelOffset={[0, -30]}
            headerContent={<h2>{incident?.placeName}</h2>}
        >
            {!loading && <pre>
                {incident && JSON.stringify(incident.content, undefined, 4)}
            </pre>}
        </InfoWindow>
    )
}

export default IncidentDetails