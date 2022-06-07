import React, { useEffect, useState } from "react";
import {
    Grid,
    Paper,
    Avatar,
    TextField,
    Button,
    Typography
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import HouseIcon from "@mui/icons-material/House";
import MenuItem from "@mui/material/MenuItem";
import Swal from "sweetalert2";
import { editProperty, getProperty } from "../../../../api";

const EditProperty = () => {
    let { ownerId, propertyId } = useParams();
    const navigate = useNavigate();
    const initialState = {
        propertyLocation: "",
        propertyCreated: new Date(),
        propertyValue: "",
        rentPerMonth: "",
        maxCapacity: "",
        parkingStalls: "",
        contract: "",
        propertyImage: ""
    };
    const [utilities, setUtilities] = React.useState("");
    const [pets, setPets] = React.useState("");
    const [{ propertyLocation, propertyCreated, propertyValue, rentPerMonth, maxCapacity, parkingStalls, contract, propertyImage }, setValues] = useState(initialState);

    useEffect(() => {
        getProperty(ownerId, propertyId).then((res) => {
            const { location, propertyCreated, propertyValue, rentPerMonth, maxCapacity, propertyImage, parkingStalls, pets, utilities, contract } = res.data[0];
            setValues({
                propertyLocation: location,
                propertyCreated,
                propertyValue,
                rentPerMonth,
                maxCapacity,
                parkingStalls,
                pets,
                contract,
                propertyImage
            });
            setPets(pets);
            setUtilities(utilities);
        });
    }, []);

    const handleUtilitiesChange = (event) => {
        setUtilities(event.target.value);
    };

    const handlePetsChange = (event) => {
        setPets(event.target.value);
    };

    const paperStyle = {
        padding: 20,
        margin: "20px auto"
    };

    const avatarStyle = {
        backgroundColor: "#26a69a"
    };

    const btnStyle = {
        margin: "8px 0"
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues((prevState) => ({ ...prevState, [name]: value }));
    };

    const updateProperty = (e) => {
        e.preventDefault();
        const propertyToEdit = {
            location: propertyLocation,
            propertyCreated,
            propertyValue,
            rentPerMonth,
            maxCapacity,
            parkingStalls,
            pets,
            utilities,
            contract,
            propertyImage,
            ownerId
        };
        editProperty(ownerId, propertyId, propertyToEdit)
            .then(() => {
                Swal.fire("Congratulations", "Your property has been updated", "success");
                navigate(`/landlord/${ownerId}`);
            })
            .catch(() => {
                Swal.fire("Try Again", "Your property has not been added", "error");
            });
    };    

    return (
        <form onSubmit={updateProperty}>
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align="center">
                        <Avatar style={avatarStyle}><HouseIcon/></Avatar>
                        <Typography variant="h5" fontFamily="Noto Sans">Edit Property</Typography>
                        <Typography variant="h5" fontFamily="Noto Sans">Properties that have not been rented out will be
                            displayed for renters to see</Typography>
                    </Grid>
                    <TextField
                        required
                        style={btnStyle}
                        fullWidth
                        onChange={handleChange}
                        name="propertyLocation"
                        id="outlined-required"
                        label="Property Location"
                        value={propertyLocation}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                    <TextField
                        id="outlined-required"
                        label="Property Built"
                        onChange={handleChange}
                        name="propertyCreated"
                        style={btnStyle}
                        value={new Date(propertyCreated).toISOString().split('T')[0]}
                        type="date"
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                    <TextField
                        id="outlined-number"
                        label="Property Value"
                        type="number"
                        onChange={handleChange}
                        name="propertyValue"
                        fullWidth
                        value={propertyValue}
                        style={btnStyle}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                    <TextField
                        id="outlined-number"
                        label="Rent Per Month"
                        onChange={handleChange}
                        name="rentPerMonth"
                        type="number"
                        fullWidth
                        value={rentPerMonth}
                        style={btnStyle}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                    <TextField
                        id="outlined-number"
                        label="Max Capacity"
                        onChange={handleChange}
                        name="maxCapacity"
                        value={maxCapacity}
                        type="number"
                        fullWidth
                        style={btnStyle}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                    <TextField
                        id="outlined-number"
                        label="Parking Stalls"
                        type="number"
                        onChange={handleChange}
                        value={parkingStalls}
                        name="parkingStalls"
                        fullWidth
                        style={btnStyle}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                    <TextField
                        fullWidth
                        id="select"
                        label="Pets"
                        value={pets}
                        style={btnStyle}
                        onChange={handlePetsChange}
                        select
                        required
                        InputLabelProps={{
                            shrink: true
                        }}
                    >
                        <MenuItem value={true}>Allowed</MenuItem>
                        <MenuItem value={false}>Not Allowed</MenuItem>
                    </TextField>
                    <TextField
                        fullWidth
                        id="select"
                        label="Utilities"
                        value={utilities}
                        style={btnStyle}
                        onChange={handleUtilitiesChange}
                        select
                        required
                        InputLabelProps={{
                            shrink: true
                        }}>
                        <MenuItem value={"Water & Electricity"}>Water & Electricity</MenuItem>
                        <MenuItem value={"Only Electricity"}>Only Electricity</MenuItem>
                        <MenuItem value={"Only Water"}>Only Water</MenuItem>
                        <MenuItem value={"None"}>None</MenuItem>
                    </TextField>
                    <TextField
                        required
                        fullWidth
                        style={btnStyle}
                        id="outlined-required"
                        onChange={handleChange}
                        name="contract"
                        value={contract}
                        label="Upload Contract Images"
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                    <TextField
                        required
                        fullWidth
                        style={btnStyle}
                        id="outlined-required"
                        onChange={handleChange}
                        name="propertyImage"
                        value={propertyImage}
                        label="Upload Property Images"
                        InputLabelProps={{
                            shrink: true
                        }}
                    />

                    {/*<label htmlFor="contained-button-file">*/}
                    {/*    <Input accept="image/*" id="contained-button-file" multiple type="file" />*/}
                    {/*    <Button variant="contained" style={{ btnStyle, marginRight: "20px" }} component="span">*/}
                    {/*        Upload Contract Images*/}
                    {/*    </Button>*/}
                    {/*</label>*/}
                    {/*<label htmlFor="contained-button-file">*/}
                    {/*    <Input accept="image/*" id="contained-button-file" multiple type="file" />*/}
                    {/*    <Button variant="contained" style={btnStyle} component="span">*/}
                    {/*        Upload Property Images*/}
                    {/*    </Button>*/}
                    {/*</label>*/}
                    <Button type="submit" color="primary" variant="contained" style={btnStyle} fullWidth>
                        <Typography fontFamily="Noto Sans">Submit</Typography>
                    </Button>
                </Paper>
            </Grid>
        </form>
    );
};

export default (EditProperty);