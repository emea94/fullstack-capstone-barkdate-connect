import {Dog} from "../types/Dog.ts";
import {Button, Card, Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

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
                <Card.Body>
                    <Card.Title>{props.dog.name}</Card.Title>
                    <Card.Text>{props.dog.age}</Card.Text>
                    <Card.Text>{props.dog.size}</Card.Text>
                    <Card.Text>{props.dog.weight}</Card.Text>
                    <Card.Text>{props.dog.participationBarkdate}</Card.Text>
                    <Card.Link>{props.dog.dogLink}</Card.Link>
                    <Card.Text>{props.dog.organizationName}</Card.Text>
                </Card.Body>
                <Button className="HomeButton" onClick={navigateToHome}>Back</Button>
            </Card>
        </Container>
    )
}
