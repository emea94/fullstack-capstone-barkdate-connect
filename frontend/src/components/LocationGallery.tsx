import LocationCard from "./LocationCard.tsx";
import {Location} from '../types/Location.ts'
import {useEffect, useState} from "react";

type LocationGalleryProps = {
    locations: Location[],
    fetchLocations: () => void
}
export default function LocationGallery(props: Readonly<LocationGalleryProps>) {

    const [locations, setLocations] = useState<Location[]>(props.locations);

    function saveNewLocation(updatedLocations: Location[]) {
        setLocations(updatedLocations);
    }

    useEffect(() => {
        setLocations(props.locations);
    }, [props.locations]);

    return (
        <div className={"LocationGallery"}>
            <div>
                {locations.map(location =>
                    <LocationCard
                        key={location.id}
                        location={location}
                        locations={locations}
                        saveNewLocation={saveNewLocation}
                    />
                )}
            </div>
        </div>
    );
}
