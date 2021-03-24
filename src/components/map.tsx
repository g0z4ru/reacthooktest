import L from "leaflet";
import "leaflet/dist/leaflet.css"
import { useEffect, useRef, useState } from "react";
const locationIcon = L.icon({
    iconUrl: "/logo192.png"
});

export function Map({ currentLocation }: { currentLocation: L.LatLng }) {
    const mapRef = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<L.Map>();
    const [mapLoaded, setMapLoaded] = useState<boolean>(false);
    const [marker, setMarker] = useState<L.Marker>();

    useEffect(() => {
        let _map = L.map(mapRef.current as HTMLDivElement);
        L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
            attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
        }).addTo(_map);
        setMap(_map);
        setMapLoaded(true);
    }, []);

    useEffect(() => {
        if (map) {
            console.log("a")
            setMap(map.setView(currentLocation, 15));
        }
        setMarker(L.marker(currentLocation, { icon: locationIcon }));
    }, [currentLocation.lat, currentLocation.lng, mapLoaded]);

    useEffect(() => {
        if (map && marker) {
            marker.addTo(map)
        }
    }, [marker, mapLoaded]);

    return <div id="map" ref={mapRef}></div>;
}