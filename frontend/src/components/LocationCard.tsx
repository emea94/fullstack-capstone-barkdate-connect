import {useNavigate} from "react-router-dom";
import {Location} from '../types/Location.ts'
import "./LocationCard.css"

type LocationCardProps = {
    location: Location,
}

export default function LocationCard(props: Readonly<LocationCardProps>) {
    const navigate = useNavigate()

    function navigateToDetail(){
        navigate("/locations/" + props.location.id)
    }

    return (
        <div className={"LocationCard"} onClick={navigateToDetail}>
            <div className={"LocationCity"}>{props.location.city}</div>
            <div className={"LocationVenue"}>{props.location.venue}</div>
            <div className={"LocationPin"}>{props.location.googlePlusCode}</div>
        </div>
    );
}
