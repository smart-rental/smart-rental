import React, { useEffect, useState } from "react";
import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { getPropertyByID } from "../../../api";
import Gallery from "../../../components/Gallery/Gallery";
import Map from "../../../components/Map/Map";
import PlaceIcon from "@mui/icons-material/Place";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import StraightenIcon from "@mui/icons-material/Straighten";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import PetsIcon from '@mui/icons-material/Pets';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
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
        return pets ? <CheckCircleIcon/> : <CancelIcon/>;
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
                <Card style={{height: "93vh"}}>
                        <div style={{ display: "flex", justifyContent: "center"}}>
                            <Gallery images={images}/>
                        </div>
                        <CardContent>
                            <Stack direction="row" alignItems="center" gap={1}>
                                <PlaceIcon/>
                                <Typography>
                                    {location}
                                </Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center" gap={1}>
                                <PeopleOutlineIcon/>
                                <Typography>
                                    Capacity: {capacity}
                                </Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center" gap={1}>
                                <BedIcon/>
                                <Typography>
                                    Bed: {bed}
                                </Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center" gap={1}>
                                <BathtubIcon/>
                                <Typography>
                                    Bath: {bath}
                                </Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center" gap={1}>
                                <StraightenIcon/>
                                <Typography>
                                    Square Feet: {squareFeet}
                                </Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center" gap={1}>
                                <AttachMoneyIcon/>
                                <Typography>
                                    Rent Price: ${rent}
                                </Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center" gap={1}>
                                <LocalParkingIcon/>
                                <Typography>
                                    Parking Stalls: {parkingStalls}
                                </Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center" gap={1}>
                                <PetsIcon/>
                                <Typography>
                                    Pets: {petToString()}
                                </Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center" gap={1}>
                                <PetsIcon/>
                                <Typography>
                                    Utilities: {utilities}
                                </Typography>
                            </Stack>
                            <Typography variant="body2" color="text.secondary">
                                Built: {dateToString()}
                            </Typography>
                            { description ? 
                                <Typography variant="body2" color="text.secondary">
                                    Description: {description}
                                </Typography> : ""}
                            <Typography>
                                Contact Information
                            </Typography>
                            <Typography>
                                Apply
                            </Typography>
                        </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default HouseCardMap;