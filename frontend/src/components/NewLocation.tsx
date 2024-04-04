import React, {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Location} from '../types/Location.ts'
import axios from "axios";
import "./NewLocation.css"
import {Form, Button, FloatingLabel, ButtonGroup, Card} from 'react-bootstrap';


type Input = {
    city: string,
    venue: string,
    googlePlusCode: string
}

type NewLocationProps = {
    saveNewLocation: React.Dispatch<React.SetStateAction<Location[]>>
}

const initialLocationValue = {city: "", venue: "", googlePlusCode: ""}

export default function NewLocation(props: Readonly<NewLocationProps>) {
    const [locationData, setLocationData] = useState<Input>(
        initialLocationValue)
    const navigate = useNavigate()

    function saveNewLocation() {
        axios.post("/api/bark-dates", locationData)
            .then((response) => {
                console.log(response.data)
                const newLocation = response.data;
                props.saveNewLocation((prevState) => [...prevState, newLocation]);
                navigate("/");
            })
            .catch((error) => console.log(error.message))
    }


    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        alert(locationData.city + " wurde hinzugefügt!")
        saveNewLocation();
    }

    function handleCancel() {
        navigate("/");
    }

    return (
        <div className={"location-content-wrapper"}>
            <Card className={"location-card"}>
                <Card.Body>
                    <Card.Title><h3 className={"location-header"}>Neuer Standort</h3></Card.Title>
                    <Form className={"location-form"} onSubmit={handleSubmit}>
                        <FloatingLabel controlId="floatingCity" label={"Stadt"}>
                            <Form.Control
                                type="text"
                                value={locationData.city}
                                name="city"
                                onChange={event =>
                                    setLocationData({...locationData, city: event.target.value})}
                                maxLength={100}
                                required={true}
                            />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingVenue" label={"Hundewiese oder Park"}>
                            <Form.Control
                                type="text"
                                value={locationData.venue}
                                name="venue"
                                onChange={event =>
                                    setLocationData({...locationData, venue: event.target.value})}
                                maxLength={100}
                                required={true}
                            />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingGooglePlusCode" label={"Google PlusCode oder Url"}>
                            <Form.Control
                                type="text"
                                value={locationData.googlePlusCode}
                                name="googlePlusCode"
                                onChange={event =>
                                    setLocationData({...locationData, googlePlusCode: event.target.value})}
                                maxLength={50}
                                required={true}
                            />
                        </FloatingLabel>
                        <ButtonGroup aria-label="add-location-buttons">
                            <Button className={"btn-submit"} variant="warning" type={"submit"}>Hinzufügen</Button>
                            <Button className={"btn-cancel"} variant="warning" onClick={handleCancel}>Abbrechen</Button>
                        </ButtonGroup>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}
