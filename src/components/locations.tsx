import { useEffect, useState } from "react";
import { Map } from "./map"
import { LatLng } from "leaflet";

export function Locations() {
  const [currentLocation, setCurrentLocation] = useState<LatLng>();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setCurrentLocation(new LatLng(position.coords.latitude, position.coords.longitude))
    }, e => console.log(e));
  });

  return (
    <div className="locations">
      {currentLocation ?
        <Map currentLocation={currentLocation} />
        :
        <p>geolocation unavailable</p>
      }
    </div>
  )
}