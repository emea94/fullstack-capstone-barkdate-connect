import React, {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Location} from '../types/Location.ts'
import axios from "axios";
import "./NewLocation.css"

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
    const [submittedLocationData, setSubmittedLocationData] = useState<Input[]>([])
    const navigate = useNavigate()

    function saveNewLocation() {
        axios.post("/api/bark-dates", locationData)
            .then((response) => {
                console.log(response.data)
                setSubmittedLocationData([...submittedLocationData, locationData])
                props.saveNewLocation((prevState) => [...prevState, response.data])
                navigate("/")
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
            <div className={"location-form-wrapper"}>
                <form className={"location-form"} onSubmit={handleSubmit}>
                    <label>
                        <h3 className={"location-header"}>Neuer Standort </h3>
                        <input
                            type="text"
                            value={locationData.city}
                            name="city"
                            onChange={event =>
                                setLocationData({...locationData, city: event.target.value})}
                            maxLength={100}
                            placeholder={"Stadt oder Ort"}
                            required={true}
                        />
                        <input
                            type="text"
                            value={locationData.venue}
                            name="venue"
                            onChange={event =>
                                setLocationData({...locationData, venue: event.target.value})}
                            maxLength={100}
                            placeholder={"Hundewiese oder Park"}
                            required={true}
                        />
                        <input
                            type="text"
                            value={locationData.googlePlusCode}
                            name="googlePlusCode"
                            onChange={event =>
                                setLocationData({...locationData, googlePlusCode: event.target.value})}
                            maxLength={50}
                            placeholder={"Google PlusCode oder Url"}
                            required={true}
                        />
                    </label>
                    <button className={"btn-submit"} type={"submit"}>Hinzufügen</button>
                </form>
                <button className={"btn-cancel"} onClick={handleCancel}>Abbrechen</button>
            </div>
        </div>
    );
}
