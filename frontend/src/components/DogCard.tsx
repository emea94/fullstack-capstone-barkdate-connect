import {Dog} from "../types/Dog.ts";
import {Button, Card, Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import DogImg from "../assets/BarkDate-Dog.jpg";
import "./DogCard.css";

type DogCardProps = {
    dog: Dog,
}

export default function DogCard(props: Readonly<DogCardProps>) {

    const navigate = useNavigate();

    function navigateToHome() {
        navigate("/");
    }


    return (
        <Container fluid>
            <Card className="dog-card">
                <Card.Img className="dog-card-img" variant="top" src={DogImg}/>
                <Card.Body>
                    <Card.Title>Name: {props.dog.name}</Card.Title>
                    <Card.Text>Alter: {props.dog.age}</Card.Text>
                    <Card.Text>Größe (in cm): {props.dog.size}</Card.Text>
                    <Card.Text>Gewicht (in kg): {props.dog.weight}</Card.Text>
                    <Card.Text>Teilnahme: {props.dog.participationBarkdate}, {props.dog.location}</Card.Text>
                    <Card.Text>Tierschutzverein: {props.dog.organizationName}</Card.Text>
                    <Card.Link>Link: {props.dog.dogLink}</Card.Link>
                    <Button variant="warning" className="HomeButton" onClick={navigateToHome}>Zurück</Button>
                </Card.Body>
            </Card>
        </Container>
    )
}
