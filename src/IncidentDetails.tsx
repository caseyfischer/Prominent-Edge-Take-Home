import { InfoWindow } from "@vis.gl/react-google-maps";
import type { Incident } from './Incident';
import { Dispatch, SetStateAction } from "react";

type Props = {
    incident: Incident | undefined,
    setOpen: Dispatch<SetStateAction<boolean>>,
}

function IncidentDetails({ incident, setOpen }: Props) {
    return (
        <InfoWindow
            className='info'
            position={incident ? { lat: incident.latitude, lng: incident.longitude } : undefined}
            onClose={() => { setOpen(false) }}
            pixelOffset={[0, -30]}
            headerContent={<h2>{incident?.placeName}</h2>}
        >
            <pre>
                {incident && JSON.stringify(incident.details, undefined, 4)}
            </pre>
        </InfoWindow>
    )
}

export default IncidentDetails