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
    const [propertyImage, setPropertyImage] = React.useState("");
    const [{ propertyLocation, propertyCreated, propertyValue, rentPerMonth, maxCapacity, parkingStalls, contract }, setValues] = useState(initialState);

    useEffect(() => {
        getProperty(ownerId, propertyId).then((res) => {
            const { location, propertyCreated, propertyValue, rentPerMonth, propertyImage, maxCapacity, parkingStalls, pets, utilities, contract, tenant } = res.data;
            setValues({
                propertyLocation: location,
                propertyCreated,
                propertyValue,
                rentPerMonth,
                maxCapacity,
                parkingStalls,
                pets,
                contract,
                tenant,
            });
            setPropertyImage(propertyImage);
            setPets(pets);
            setUtilities(utilities);
        });
    }, [ownerId, propertyId]);

    const handleUtilitiesChange = (event) => {
        setUtilities(event.target.value);
    };

    const handleFileChange = (event) => {
        setPropertyImage(event.target.files);
    };
    
    const handlePetsChange = (event) => {
        setPets(event.target.value);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
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

    const updateProperty = (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const image of propertyImage) {
            formData.append("propertyImage", image);
        }
        formData.append("location", propertyLocation);
        formData.append("propertyCreated", propertyCreated.toString());
        formData.append("propertyValue", propertyValue);
        formData.append("rentPerMonth", rentPerMonth);
        formData.append("maxCapacity", maxCapacity);
        formData.append("parkingStalls", parkingStalls);
        formData.append("pets", pets);
        formData.append("utilities", utilities);
        formData.append("contract", "someContract");
        formData.append("ownerId", ownerId);
        editProperty(ownerId, propertyId, formData)
            .then((r) => {
                console.log(r);
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
                    <input
                        type="file"
                        style={btnStyle}
                        id="outlined-required"
                        onChange={handleFileChange}
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

export default (EditProperty);