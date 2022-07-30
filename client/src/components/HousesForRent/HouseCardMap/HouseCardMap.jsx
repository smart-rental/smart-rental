import React, { useEffect, useState } from "react";
import Map from "../../Map/Map";
import { Card, CardActionArea, CardContent, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { getPropertyByID } from "../../../api";
import Gallery from "../../Gallery/Gallery";

const HouseCardMap = () => { 
    const { propertyId } = useParams();
    const initialState = {
        location: "",
        images: [],
        built: new Date(),
        squareFeet: "",
        rent: "",
        capacity: "",
        parkingStalls: "",
        pets: "",
        utilities: "",
        bed: "",
        bath: "",
        description: ""
    }
    const [{images, location, built, squareFeet, rent, capacity, pets, utilities, parkingStalls, bed, bath, description}, setProperty] = useState(initialState);
    const petToString = () => {
        return pets ? "Allowed" : "Not Allowed";
    }
    const dateToString = () => {
        const date = new Date(built);
        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1;
        const year = date.getUTCFullYear();
        return `${month}/${day}/${year}`
    }
    useEffect(() => {
        getPropertyByID(propertyId)
            .then((res) => {
                setProperty(res.data);
            })
    })
    return (
        <Grid container spacing={0}>
            <Grid item xs={9}>
                <Map/>
            </Grid>
            <Grid item xs={3}>
                <Card style={{height: "100vh"}}>
                        <div style={{ display: "flex", justifyContent: "center"}}>
                            <Gallery images={images}/>
                        </div>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Location: {location}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Capacity: {capacity}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Parking Stalls: {parkingStalls}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Pets: {petToString()}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Utilities: {utilities}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Bed: {bed}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Bath: {bath}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Square Feet: {squareFeet}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Rent Price: ${rent}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Built: {dateToString()}
                            </Typography>
                            { description ? 
                                <Typography variant="body2" color="text.secondary">
                                    Description: {description}
                                </Typography> : ""}
                        </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default HouseCardMap;