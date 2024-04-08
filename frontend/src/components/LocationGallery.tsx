import LocationCard from "./LocationCard.tsx";
import {Location} from '../types/Location.ts'
import {useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";

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
        <Container fluid>
            <Row xs={1} md={2} lg={3} className="g-4">
                {locations.map((location) => (
                    <Col key={location.id}>
                        <LocationCard
                            location={location}
                            locations={locations}
                            saveNewLocation={saveNewLocation}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
