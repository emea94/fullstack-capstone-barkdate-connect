import DogCard from "./DogCard.tsx";
import {Dog} from "../types/Dog.ts";
import {Col, Container, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";


export default function DogGallery() {

    const [dogs, setDogs] = useState<Dog[]>([])
    const {id} = useParams();


    function fetchDog() {
        console.log(id)
        axios.get("/api/bark-dates/dogs/" + id)
            .then((response) => {
                console.log(response)
                setDogs(response.data);
            })
            .catch((error) => {
                console.error("Error fetching Dogs: ", error);
            });
    }

    useEffect(
        fetchDog,
        [id]
    )

    return (
        <Container fluid>
            <Row xs={1} md={2} lg={3} className="g-5">
                {dogs.map((dog) => (
                    <Col key={dog.id}>
                        <DogCard
                            dog={dog}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
