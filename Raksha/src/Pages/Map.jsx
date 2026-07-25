import React, { useState, useEffect, useCallback } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import '../App.css';
import AOS from "aos";


const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 28.6139,
  lng: 77.209,
};

// dark theme styling to match the site's look
const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#0a0e17" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#0a0e17" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#8b93a7" }] },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#1c2233" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#131826" }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#0d1220" }],
  },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [{ color: "#232a3a" }],
  },
];

function Maps() {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    // watchPosition keeps the marker updated as the user moves
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocationError(null);
      },
      (error) => {
        setLocationError(
          "Could not access your location. Please allow location permissions."
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5000,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  const mapCenter = currentLocation || defaultCenter;

  const onMapLoad = useCallback((map) => {
    // map instance available here if needed later
  }, []);

  return (
    <section className="maps-page">
      <div className="maps-header">
        <div className="maps-badge">
          <span className="badge-dot"></span>
          Live City Map
        </div>
        <h1 className="maps-title">Track Every Corner Of Your City</h1>
        <p className="maps-subtitle">
          Real-time map view of your safety circle, safe zones, and active
          alerts — all in one place.
        </p>
      </div>

      <div className="maps-frame">
        <div className="maps-real-container">
          {loadError && (
            <div className="maps-status-message">
              Failed to load Google Maps. Check your API key.
            </div>
          )}

          {!isLoaded && !loadError && (
            <div className="maps-status-message">Loading map...</div>
          )}

          {isLoaded && (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={mapCenter}
              zoom={currentLocation ? 15 : 5}
              onLoad={onMapLoad}
              options={{
                styles: darkMapStyle,
                disableDefaultUI: false,
                zoomControl: true,
                streetViewControl: false,
                mapTypeControl: false,
              }}
            >
              {currentLocation && (
                <Marker
                  position={currentLocation}
                  title="Your current location"
                />
              )}
            </GoogleMap>
          )}
        </div>

        {locationError && (
          <p className="maps-location-error">{locationError}</p>
        )}
      </div>

      <div className="maps-grid">
        <div className="maps-card">
          <h3>Live Location Pins</h3>
          <p>
            See exactly where every member of your safety circle is, updated
            in real time as they move.
          </p>
        </div>
        <div className="maps-card">
          <h3>Safe Zone Markers</h3>
          <p>
            Mark home, work, or school as safe zones and get notified when
            someone enters or leaves.
          </p>
        </div>
        <div className="maps-card">
          <h3>Route History</h3>
          <p>
            Review past routes and travel patterns to spot anything unusual
            before it becomes a problem.
          </p>
        </div>
        <div className="maps-card">
          <h3>Incident Heatmap</h3>
          <p>
            View reported incidents near you so you can plan safer routes
            through your city.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Maps;