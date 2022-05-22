import React, { useState } from "react";
import {
    Grid,
    Paper,
    Avatar,
    TextField,
    Button,
    Typography, InputLabel, Select, FormControl
} from "@mui/material";
import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";
import HouseIcon from '@mui/icons-material/House';
import styled from "@emotion/styled";
import MenuItem from "@mui/material/MenuItem";

const AddProperty = () => {
    const navigate = useNavigate();
    const [utilities, setUtilities] = React.useState('');
    const [pet, setPets] = React.useState('');
    const [values, setValues] = useState({
        propertyLocation: '',
        propertyCreated: new Date(),
        propertyValue: 0,
        rentPerMonth: 0,
        maxCapacity: 0,
        parkingStalls: 0,
        pets: false,
        tenant: '',
        contract: '',
        propertyImage: '',
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
    }

    const avatarStyle = {
        backgroundColor: "#26a69a"
    }

    const btnStyle = {
        margin: '8px 0'
    }

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    }

    const Input = styled('input')({
        display: 'none',
    });
    
    let { id } = useParams();

    const createProperty = (e) => {
        e.preventDefault();
        console.log(id);
        const { propertyLocation, propertyCreated, propertyValue, rentPerMonth, maxCapacity, parkingStalls, tenant, contract, propertyImage } = values;
        const userLogin = {
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
            ownerId: id
        }
        if (values.password === values.confirmPassword) {
            //Call the backend
            axios.post(`http://localhost:5000/api/property/${id}`, userLogin)
                .then(res => { console.log(res); })
                .catch(e => { console.log(e); });
        } else {
            throw `Parameter is not the same`;
        }

    }

    return (
        <form onSubmit={createProperty}>
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align="center">
                        <Avatar style={avatarStyle}><HouseIcon/></Avatar>
                        <Typography variant="h5" fontFamily="Noto Sans">Add Property</Typography>
                        <Typography variant="h5" fontFamily="Noto Sans">Properties that have not been rented out will be displayed for renters to see</Typography>
                    </Grid>
                    <TextField
                        required
                        style={btnStyle}
                        fullWidth
                        onChange={handleChange('propertyLocation')}
                        id="outlined-required"
                        label="Property Location"
                        defaultValue=""
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="outlined-required"
                        label="Property Built"
                        onChange={handleChange('propertyCreated')}
                        style={btnStyle}
                        defaultValue=""
                        type="date"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="outlined-number"
                        label="Property Value"
                        type="number"
                        onChange={handleChange('propertyValue')}
                        fullWidth
                        style={btnStyle}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="outlined-number"
                        label="Rent Per Month"
                        onChange={handleChange('rentPerMonth')}
                        type="number"
                        fullWidth
                        style={btnStyle}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="outlined-number"
                        label="Max Capacity"
                        onChange={handleChange('maxCapacity')}
                        type="number"
                        fullWidth
                        style={btnStyle}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="outlined-number"
                        label="Parking Stalls"
                        type="number"
                        onChange={handleChange('maxCapacity')}
                        fullWidth
                        style={btnStyle}
                        InputLabelProps={{
                            shrink: true,
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
                            shrink: true,
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
                            shrink: true,
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
                        onChange={handleChange('tenant')}
                        defaultValue=""
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        required
                        fullWidth
                        style={btnStyle}
                        id="outlined-required"
                        onChange={handleChange('contract')}
                        label="Upload Contract Images"
                        defaultValue=""
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        required
                        fullWidth
                        style={btnStyle}
                        id="outlined-required"
                        onChange={handleChange('propertyImage')}
                        label="Upload Property Images"
                        defaultValue=""
                        InputLabelProps={{
                            shrink: true,
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
    )
}

export default (AddProperty);