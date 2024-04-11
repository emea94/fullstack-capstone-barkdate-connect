import {Location} from '../types/Location.ts'
import "./LocationCard.css"
import axios from "axios";
import {useState} from "react";
import LocationImg from "../assets/BarkDate-Location.jpg"
import {Button, ButtonGroup, Card, CardGroup, Container, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

type LocationCardProps = {
    saveNewLocation: (updatedLocations: Location[]) => void,
    location: Location,
    locations: Location[]
}

type LocationInput = {
    city: string,
    venue: string,
    googlePlusCode: string
}


export default function LocationCard(props: Readonly<LocationCardProps>) {
    const [isEditable, setIsEditable] = useState<boolean>(false);

    const [formData, setFormData] = useState<LocationInput>({
        city: props.location.city,
        venue: props.location.venue,
        googlePlusCode: props.location.googlePlusCode
    });
    const navigate = useNavigate();

    function handleEdit() {
        setIsEditable(true)
    }

    function navigateToDetail() {
        navigate("/dogs/" + props.location.id)
    }

    function handleCancel() {
        setFormData({
            city: props.location.city,
            venue: props.location.venue,
            googlePlusCode: props.location.googlePlusCode
        });
        setIsEditable(false);
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

    function deleteLocation() {
        if (window.confirm("Bist du dir sicher, dass die Location gelöscht werden soll?"))
            axios.delete("/api/bark-dates/" + props.location.id)
                .then(() => {
                    props.saveNewLocation(props.locations.filter((location) => location.id !== props.location.id))
                })
                .catch((error) => console.log(error.message))
    }

    return (
        <Container className={"LocationCard"} fluid={"sm"}>
            <CardGroup>
                <Card>
                    <Card.Img className="location-card-img" variant="top" src={LocationImg}/>
                    <Card.Body>
                        {isEditable
                            ? (
                                <div className={"location-edit-wrapper"}>
                                    <Form>
                                        <Form.Group controlId="formCity">
                                            <Form.Label>Stadt</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={formData.city}
                                                onChange={event => setFormData({...formData, city: event.target.value})}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formVenue">
                                            <Form.Label>Hundewiese oder Park</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={formData.venue}
                                                onChange={event => setFormData({
                                                    ...formData,
                                                    venue: event.target.value
                                                })}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formGooglePlusCode">
                                            <Form.Label>Google PlusCode oder Url</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={formData.googlePlusCode}
                                                onChange={event => setFormData({
                                                    ...formData,
                                                    googlePlusCode: event.target.value
                                                })}
                                            />
                                        </Form.Group>

                                        <div className={"location-edit-button"}>
                                            <ButtonGroup>
                                                <Button variant="warning" onClick={handleEditSave}>Speichern</Button>
                                                <Button variant="warning" onClick={handleCancel}>Abbrechen</Button>
                                            </ButtonGroup>
                                        </div>
                                    </Form>
                                </div>
                            )
                            :
                            (
                                <div className={"location-wrapper"}>
                                    <Card.Title>{props.location.city}</Card.Title>
                                    <Card.Subtitle>{props.location.venue}</Card.Subtitle>
                                    <Card.Text>{props.location.googlePlusCode}</Card.Text>
                                    {!isEditable &&
                                        <div className={"location-button"}>
                                            <ButtonGroup>
                                                <Button variant="warning" onClick={handleEdit}>Bearbeiten</Button>
                                                <Button variant="warning" onClick={navigateToDetail}>Zu den Hunden</Button>
                                                <Button variant="danger" onClick={deleteLocation}>Löschen</Button>
                                            </ButtonGroup>
                                        </div>
                                    }
                                </div>
                            )
                        }
                    </Card.Body>
                </Card>
            </CardGroup>
        </Container>
    )
}
