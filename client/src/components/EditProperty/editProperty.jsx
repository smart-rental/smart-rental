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
import { editProperty, getProperty } from "../../api";

const EditProperty = () => {
    let { ownerId, propertyId } = useParams();
    const [utilities, setUtilities] = React.useState("");
    const [pet, setPets] = React.useState("");
    const [values, setValues] = useState({
        propertyLocation: "",
        propertyCreated: new Date(),
        propertyValue: 0,
        rentPerMonth: 0,
        maxCapacity: 0,
        parkingStalls: 0,
        pets: false,
        tenant: "",
        contract: "",
        propertyImage: ""
    });

    getProperty(ownerId, propertyId).then((res) => {
        console.log(res.data[0]);
        const { location, propertyCreated, propertyValue, rentPetMonth, maxCapacity, propertyImage, parkingStalls, pets, utilities, contract, tenant } = res.data[0];
        setValues({
            propertyLocation: location,
            propertyCreated: propertyCreated,
            propertyValue: propertyValue,
            rentPerMonth: rentPetMonth,
            maxCapacity: maxCapacity,
            parkingStalls: parkingStalls,
            pets: pets,
            tenant: tenant,
            contract: contract,
            propertyImage: propertyImage
        });
        setPets(pets);
        setUtilities(utilities);
    });
    
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

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const reset = () => {
        setValues({...values, propertyLocation: ""});
        console.log(values);
        setPets("");
        setUtilities("");
    };
    const createProperty = (e) => {
        e.preventDefault();
        const {
            propertyLocation,
            propertyCreated,
            propertyValue,
            rentPerMonth,
            maxCapacity,
            parkingStalls,
            tenant,
            contract,
            propertyImage
        } = values;
        const propertyToAdd = {
            location: propertyLocation,
            propertyCreated,
            propertyValue,
            rentPerMonth,
            maxCapacity,
            parkingStalls,
            pets: pet,
            utilities,
            tenant,
            contract,
            propertyImage,
            ownerId
        };
        editProperty(ownerId, propertyId)
            .then(() => {
                Swal.fire("Congratulations", "Your property has been added", "success");
                reset();
            })
            .catch(() => {
                Swal.fire("Try Again", "Your property has not been added", "error");
            });
    };

    return (
        <form onSubmit={createProperty}>
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
                        onChange={handleChange("propertyLocation")}
                        id="outlined-required"
                        label="Property Location"
                        defaultValue=""
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                    <TextField
                        id="outlined-required"
                        label="Property Built"
                        onChange={handleChange("propertyCreated")}
                        style={btnStyle}
                        defaultValue=""
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
                        onChange={handleChange("propertyValue")}
                        fullWidth
                        style={btnStyle}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                    <TextField
                        id="outlined-number"
                        label="Rent Per Month"
                        onChange={handleChange("rentPerMonth")}
                        type="number"
                        fullWidth
                        style={btnStyle}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                    <TextField
                        id="outlined-number"
                        label="Max Capacity"
                        onChange={handleChange("maxCapacity")}
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
                        onChange={handleChange("maxCapacity")}
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
                        label="Tenant"
                        onChange={handleChange("tenant")}
                        defaultValue=""
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                    <TextField
                        required
                        fullWidth
                        style={btnStyle}
                        id="outlined-required"
                        onChange={handleChange("contract")}
                        label="Upload Contract Images"
                        defaultValue=""
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                    <TextField
                        required
                        fullWidth
                        style={btnStyle}
                        id="outlined-required"
                        onChange={handleChange("propertyImage")}
                        label="Upload Property Images"
                        defaultValue=""
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