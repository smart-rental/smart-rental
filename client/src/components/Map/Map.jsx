import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { getGeocode } from "../../api";
import Error from "../Error/Error";
import { useParams } from "react-router-dom";

const Map = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    });
    const { propertyLocation } = useParams();
    const [geoCodeData, setGeoCodeData] = useState({});
    useEffect(() => {
        getGeocode(propertyLocation)
            .then((res) => {
                console.log(res);
                setGeoCodeData(res.data.results[0].geometry.location);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    if (!isLoaded) {
        return (
            <CircularProgress/>
        );
    }
    return (
        <>
            {propertyLocation ? 
                <Mappers lat={parseFloat(geoCodeData.lat)} lng={parseFloat(geoCodeData.lng)}/> :
                <Error/>}
            
        </>
    );
};

function Mappers({ lat, lng }) {
    return (
        <GoogleMap zoom={15} center={{ lat, lng }} options={{ gestureHandling: "none" }}
                   mapContainerStyle={{ width: "100", height: "100vh" }}>
            <Marker position={{ lat, lng }}/>
        </GoogleMap>
    );
}

export default Map;