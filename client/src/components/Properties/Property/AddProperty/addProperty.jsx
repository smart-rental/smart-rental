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
    };
    const [utilities, setUtilities] = React.useState("");
    const [pet, setPets] = React.useState("");
    const [propertyImage, setPropertyImage] = React.useState("");
    const imageInputRef = React.useRef();
    const [{ propertyLocation, propertyCreated, propertyValue, rentPerMonth, maxCapacity, parkingStalls }, setValues] = useState(initialState);

    const handleUtilitiesChange = (event) => {
        setUtilities(event.target.value);
    };

    const handlePetsChange = (event) => {
        setPets(event.target.value);
    };

    const handleFileChange = (event) => {
        setPropertyImage(event.target.files);
    }

    const handleChange = (event) => {
        let { name, value } = event.target;
        const numbersInput = ["propertyValue", "rentPerMonth", "maxCapacity", "parkingStalls"];
        if (numbersInput.includes(name) && value < 0) {
            value = 0;
        }
        setValues((prevState) => ({ ...prevState, [name]: value }));
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
        imageInputRef.current.value = "";
        setValues({ ...initialState });
    };

    const createProperty = (e) => {
        e.preventDefault();
        const propertyData = new FormData();
        for (const image of propertyImage) {
            propertyData.append("propertyImage", image);
        }
        propertyData.append("location", propertyLocation);
        propertyData.append("propertyCreated", propertyCreated.toString());
        propertyData.append("propertyValue", propertyValue);
        propertyData.append("rentPerMonth", rentPerMonth);
        propertyData.append("maxCapacity", maxCapacity);
        propertyData.append("parkingStalls", parkingStalls);
        propertyData.append("pets", pet);
        propertyData.append("utilities", utilities);
        propertyData.append("contract", "someContract");
        propertyData.append("ownerId", id);
        addProperty(id, propertyData)
            .then((r) => {
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
                        type="date"
                        fullWidth
                        value={propertyCreated}
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
                        type="number"
                        fullWidth
                        value={maxCapacity}
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
                        name="parkingStalls"
                        fullWidth
                        value={parkingStalls}
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
                    <input
                        type="file"
                        style={btnStyle}
                        id="outlined-required"
                        onChange={handleFileChange}
                        ref={imageInputRef}
                        name="propertyImage"
                        multiple
                    />
                    <Button type="submit" color="primary" variant="contained" style={btnStyle} fullWidth>
                        <Typography fontFamily="Noto Sans">Submit</Typography>
                    </Button>
                </Paper>
            </Grid>
        </form>
    );
};

export default (AddProperty);