import {useEffect, useState} from "react";
import axios from "axios";
import {Link, Route, Routes} from "react-router-dom";
import LocationGallery from "./components/LocationGallery.tsx";
import type {Location} from './types/Location.ts'
import NewLocation from "./components/NewLocation.tsx";
import Logo from "./assets/BarkDateLogo.png"
import {Nav, Navbar} from "react-bootstrap";
import DogGallery from "./components/DogGallery.tsx";

export default function App() {
    const [location, setLocation] = useState<Location[]>([])


    useEffect(() => {
        fetchLocation();
    }, []);

    const fetchLocation = () => {
        axios.get('/api/bark-dates')
            .then(response => {
                setLocation(response.data);
            })
            .catch(error => {
                console.error('Error fetching Locations: ', error);
            });
    }

    return (
        <>
            <Navbar expand="lg">
                <Navbar.Brand>
                    <Link to={"/"} className={"header-link"}>
                        <img className={"header-logo"} src={Logo} alt={"Barkdate Logo"}/>
                    </Link>
                </Navbar.Brand>
                <Nav className="ml-auto">
                    <Link to={"/"} className={"header-nav-link"}>Home</Link>
                    <Link to={"/new-location"} className={"header-nav-link"}>Standort hinzufügen</Link>
                </Nav>
            </Navbar>

            <Routes>
                <Route path={"/"} element={
                    location.length > 0
                        ?
                        <LocationGallery locations={location} fetchLocations={fetchLocation}/>
                        :
                        <h1 className={"notfoundtag"}>No locations found</h1>}/>
                <Route path={"/new-location"} element={<NewLocation saveNewLocation={setLocation}/>}/>
                <Route path={"/dogs/:id"} element={<DogGallery/>
                }/>
            </Routes>
        </>
    )
}
