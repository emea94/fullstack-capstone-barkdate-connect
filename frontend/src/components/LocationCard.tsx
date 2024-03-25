import {useNavigate} from "react-router-dom";
import {Location} from '../types/Location.ts'

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
            <h3 className={"LocationCity"}>{props.location.city}</h3>
            <h4 className={"LocationVenue"}>{props.location.venue}</h4>
            <h4 className={"LocationPin"}>{props.location.googlePlusCode}</h4>
        </div>
    );
}
