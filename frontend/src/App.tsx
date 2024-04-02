import {useEffect, useState} from "react";
import axios from "axios";
import {Link, Route, Routes} from "react-router-dom";
import LocationGallery from "./components/LocationGallery.tsx";
import {Location} from './types/Location.ts'
import NewLocation from "./components/NewLocation.tsx";
import Logo from "./assets/BarkDateLogo.png"


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
          <header>
              <div className={"HeaderComponent"}>
                  <div className={"HeaderWrapper"}>
                      <Link to={"/"} className={"HeaderLink"}>
                          <img className={"HeaderLogo"} src={Logo} alt={"Barkdate Logo"}/>
                      </Link>
                  </div>
                  <div className={"HeaderNavigation"}>
                      <Link to={"/new-location"} className={"HeaderNavLink"}>Neuen Standort hinzufügen
                      </Link>
                  </div>
              </div>
          </header>
          <Routes>
              <Route path={"/"} element={
                  location.length > 0
                      ?
                      <LocationGallery locations={location} fetchLocations={fetchLocation}/>
                      :
                      <h1 className={"notfoundtag"}>No locations found</h1>}/>
              <Route path={"/new-location"} element={<NewLocation saveNewLocation={setLocation}/>}/>
          </Routes>
      </>
  )
}
