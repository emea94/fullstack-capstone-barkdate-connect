import {Location} from '../types/Location.ts'
import "./LocationCard.css"
import axios from "axios";
import {useState} from "react";

type LocationCardProps = {
    saveNewLocation: (updatedLocations: Location[]) => void,
    location: Location,
    locations: Location[]
}

type Input = {
    city: string,
    venue: string,
    googlePlusCode: string
}

export default function LocationCard(props: Readonly<LocationCardProps>) {
    const [isEditable, setIsEditable] = useState<boolean>(false);
    const [formData, setFormData] = useState<Input>({
        city: props.location.city,
        venue: props.location.venue,
        googlePlusCode: props.location.googlePlusCode
    });

    function handleEdit() {
        setIsEditable(true)
    }

    function updateLocation(locations: Location[], newLocation: Location) {
        return locations.map((location) => {
            if (location.id === newLocation.id) {
                return newLocation;
            }
            return location;
        })
    }

    function handleEditSave() {
        axios.put("/api/bark-dates/" + props.location.id, formData)
            .then((response) => {
                setIsEditable(false);
                const updatedLocations = updateLocation(props.locations, response.data);
                props.saveNewLocation(updatedLocations);
            })
            .catch((error) => console.log(error.message))
    }

    return (
        <div className={"LocationCard"}>
            <div className={isEditable ? "LocationDetailEdit" : "LocationDetail"}>
                {isEditable
                    ? (
                        <div className={"location-edit-wrapper"}>
                            <input
                                type={"text"}
                                value={formData.city}
                                onChange={event => setFormData({...formData, city: event.target.value})}
                            />
                            <input
                                type={"text"}
                                value={formData.venue}
                                onChange={event => setFormData({...formData, venue: event.target.value})}
                            />
                            <input
                                type={"text"}
                                value={formData.googlePlusCode}
                                onChange={event => setFormData({...formData, googlePlusCode: event.target.value})}
                            />
                            <button onClick={handleEditSave}>Speichern</button>
                            <button onClick={() => {
                                setIsEditable(false);
                            }}>Abbrechen
                            </button>
                        </div>
                    )
                    :
                    (
                        <div className={"location-wrapper"}>
                            <div className={"LocationCity"}>{props.location.city}</div>
                            <div className={"LocationVenue"}>{props.location.venue}</div>
                            <div className={"LocationPin"}>{props.location.googlePlusCode}</div>
                            {!isEditable &&
                                <div>
                                    <button onClick={handleEdit}>Bearbeiten</button>
                                </div>
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}
