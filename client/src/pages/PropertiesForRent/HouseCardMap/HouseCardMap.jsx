import React, { useEffect, useState } from "react";
import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { getPropertyByID, getUsers } from "../../../api";
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
import BuildIcon from '@mui/icons-material/Build';
import { OtherHouses } from "@mui/icons-material";
import Box from "@mui/material/Box";

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
    const [{images, location, built, squareFeet, rent, capacity, pets, utilities, parkingStalls, bed, bath, description, ownerId}, setProperty] = useState(initialState);
    const [{landlordName, phoneNumber, email}, setLandlord] = useState({
        landlordName: "", 
        phoneNumber: "",
        email: ""
    })

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
        getUsers().then(r => {
            const data = r.data.filter(user => user._id === ownerId);
            const {name, phoneNumber, email} = data[0];
            setLandlord({
                landlordName: name,
                phoneNumber, 
                email
            })
        })
    }, [ownerId, propertyId]);

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
                                <OtherHouses/>
                                <Typography>
                                    Utilities: {utilities}
                                </Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center" gap={1}>
                                <BuildIcon/>
                                <Typography>
                                    Built: {dateToString()}
                                </Typography>
                            </Stack>
                            { description ?
                                <Stack direction="row" alignItems="center" gap={1}>
                                    <Typography>
                                        Description: {description}
                                    </Typography>
                                </Stack>: "" }
                        </CardContent>
                    <Stack justifyContent="center" alignItems="center">
                        <Box>
                            <Typography variant="h5">
                                Contact Information
                            </Typography>
                            <Typography>
                                LandLord: {landlordName}
                            </Typography>
                            <Typography>
                                Phone Number: {phoneNumber}
                            </Typography>
                            <Typography>
                                Email: {email}
                            </Typography>
                        </Box>
                    </Stack>
                </Card>
            </Grid>
        </Grid>
    );
}

export default HouseCardMap;