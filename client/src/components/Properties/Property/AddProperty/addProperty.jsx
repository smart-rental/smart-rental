import React, { useState } from "react";
import {
    Grid,
    Paper,
    Avatar,
    TextField,
    Button,
    Typography
} from "@mui/material";
import { useParams } from "react-router-dom";
import HouseIcon from "@mui/icons-material/House";
import MenuItem from "@mui/material/MenuItem";
import Swal from "sweetalert2";
import { addProperty } from "../../../../api";

const AddProperty = () => {
    let { id } = useParams();
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
    const [pet, setPets] = React.useState("");
    const [{ propertyLocation, propertyCreated, propertyValue, rentPerMonth, maxCapacity, parkingStalls, contract, propertyImage }, setValues] = useState(initialState);

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
    
    const reset = () => {
        setPets("");
        setUtilities("");
        setValues({ ...initialState });
    };
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues((prevState) => ({ ...prevState, [name]: value }));
    };

    const createProperty = (e) => {
        e.preventDefault();
        const propertyToAdd = {
            location: propertyLocation,
            propertyCreated,
            propertyValue,
            rentPerMonth,
            maxCapacity,
            parkingStalls,
            pets: pet,
            utilities,
            contract,
            propertyImage,
            ownerId: id
        };
        addProperty(id, propertyToAdd)
            .then(() => {
                Swal.fire("Congratulations", "Your property has been added", "success").then(reset);
            })
            .catch((e) => {
                console.log(e);
                Swal.fire("Try Again", "Your property has not been added", "error");
            });
    };

    return (
        <form onSubmit={createProperty}>
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align="center">
                        <Avatar style={avatarStyle}><HouseIcon/></Avatar>
                        <Typography variant="h5" fontFamily="Noto Sans">Add Property</Typography>
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
                        value={propertyCreated}
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
                        value={pet}
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

export default (AddProperty);