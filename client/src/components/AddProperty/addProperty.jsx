import React, { useState } from "react";
import {
    Grid,
    Paper,
    Avatar,
    TextField,
    Button,
    Typography,
    InputAdornment,
    OutlinedInput,
    Radio,
    InputLabel, FormControl, FilledInput, FormControlLabel, RadioGroup, FormLabel
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from "react-router-dom";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import { Input, Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import HouseIcon from '@mui/icons-material/House';
import styled from "@emotion/styled";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers";

const AddProperty = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        propertyLocation: '',
        owner: '',
        propertyCreated: new Date(),
        propertyValue: 0,
        rentPerMonth: 0,
        maxCapacity: 0,
        parkingStalls: 0,
        pets: false,
        utilities: false,
        tenant: false,
        contract: '',
        propertyImage: '',
    });

    const paperStyle = {
        padding: 20,
        margin: "20px auto"
    }

    const avatarStyle = {
        backgroundColor: "#26a69a"
    }

    const linkStyling = { textDecoration: "none"};

    const btnStyle = {
        margin: '8px 0'
    }

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    }

    const Input = styled('input')({
        display: 'none',
    });

    const createProperty = (e) => {
        e.preventDefault();
        const { name, email, password, userType, phoneNumber } = values;
        const userLogin = {
            name,
            email,
            phoneNumber,
            password,
            userType

        }
        if (values.password === values.confirmPassword) {
            //Call the backend
            axios.post('http://localhost:5000/api/users', userLogin)
                .then(res => { console.log(res.data.message); navigate("/login"); })
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
                        id="outlined-required"
                        label="Property Location"
                        defaultValue=""
                    />
                    <TextField
                        id="outlined-number"
                        label="Property Value"
                        type="number"
                        fullWidth
                        style={btnStyle}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="outlined-number"
                        label="Rent Per Month"
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
                        fullWidth
                        style={btnStyle}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        required
                        fullWidth
                        style={btnStyle}
                        id="outlined-required"
                        label="Pets"
                        defaultValue=""
                    />
                    <TextField
                        required
                        fullWidth
                        style={btnStyle}
                        id="outlined-required"
                        label="Utilities"
                        defaultValue=""
                    />
                    <TextField
                        required
                        fullWidth
                        style={btnStyle}
                        id="outlined-required"
                        label="Tenant"
                        defaultValue=""
                    />
                    <label htmlFor="contained-button-file">
                        <Input accept="image/*" id="contained-button-file" multiple type="file" />
                        <Button variant="contained" style={{ btnStyle, marginRight: "20px" }} component="span">
                            Upload Contract Images
                        </Button>
                    </label>
                    <label htmlFor="contained-button-file">
                        <Input accept="image/*" id="contained-button-file" multiple type="file" />
                        <Button variant="contained" style={btnStyle} component="span">
                            Upload Property Images
                        </Button>
                    </label>
                    <Button type="submit" color="primary" variant="contained" style={btnStyle} fullWidth>
                        <Typography fontFamily="Noto Sans">Submit</Typography>
                    </Button>
                </Paper>
            </Grid>
        </form>
    )
}

export default AddProperty;