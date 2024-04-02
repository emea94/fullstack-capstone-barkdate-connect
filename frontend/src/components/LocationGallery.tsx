import LocationCard from "./LocationCard.tsx";
import {Location} from '../types/Location.ts'

type LocationGalleryProps = {
    locations: Location[],
    fetchLocations: () => void
}
export default function LocationGallery(props: Readonly<LocationGalleryProps>) {

    return (
        <div className={"LocationGallery"}>
            <div>
                {props.locations.map(location =>
                    <LocationCard key={location.id} location={location}/>)}
            </div>
        </div>
    );
}
