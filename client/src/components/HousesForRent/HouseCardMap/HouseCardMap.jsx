import React, { useEffect, useState } from "react";
import Map from "../../Map/Map";
import { Card, CardActionArea, CardContent, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { getPropertyByID } from "../../../api";
import Gallery from "../../Gallery/Gallery";

const HouseCardMap = () => { 
    const { propertyId } = useParams();
    const initialState = { 
        propertyImage: [],
        location: "",
        maxCapacity: "",
        parkingStalls: "",
        pets: "",
        utilities: "",
        rentPerMonth: ""
    }
    const [{propertyImage, location, maxCapacity, parkingStalls, pets, utilities, rentPerMonth}, setProperty] = useState(initialState);
    const petToString = () => {
        return pets ? "Allowed" : "Not Allowed";
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
                            <Gallery images={propertyImage}/>
                        </div>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Location: {location}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Capacity: {maxCapacity}
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
                                Rent Price: ${rentPerMonth}
                            </Typography>
                        </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default HouseCardMap;