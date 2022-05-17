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
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        userType: '',
        showPassword: false
    });
    
    const paperStyle = {
        padding: 20,
        height: "80vh",
        width: 300,
        margin: "20px auto"
    }
    
    const avatarStyle = {
        backgroundColor: "green"
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

    const submitLogin = (e) => {
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
        <form onSubmit={submitLogin}>
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align="center">
                        <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                        <Typography variant="h5" fontFamily="Noto Sans">Sign up</Typography>
                    </Grid>
                    <FormControl style={{ marginBottom: "10px", marginTop: "10px" }} fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
                        <OutlinedInput variant="standard" value={values.email} onChange={handleChange('email')} label="Email" placeholder="Enter email" fullWidth required/>
                    </FormControl>
                    <FormControl style={{ marginBottom: "10px", marginTop: "10px" }} fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">Name</InputLabel>
                        <OutlinedInput variant="standard" value={values.name} onChange={handleChange('name')} label="Name" placeholder="Enter name" fullWidth required/>
                    </FormControl>
                    <FormControl style={{ marginBottom: "10px", marginTop: "10px" }} fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">Phone</InputLabel>
                        <OutlinedInput variant="standard" value={values.phoneNumber} onChange={handleChange('phoneNumber')} label="Email" placeholder="Enter phone number xxxxxxxxxx" fullWidth required/>
                    </FormControl>
                    <FormControl style={{ marginBottom: "10px", marginTop: "10px" }} fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput variant="standard" value={values.password} onChange={handleChange('password')} label="Password" placeholder="Enter password"  type={values.showPassword ? 'text' : 'password'}  endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }  fullWidth required/>
                    </FormControl>
                    <FormControl style={{ marginBottom: "10px", marginTop: "10px" }} fullWidth>
                        <OutlinedInput variant="standard" value={values.confirmPassword} onChange={handleChange('confirmPassword')} label="Password" placeholder="Re-enter password"  type={values.showPassword ? 'text' : 'password'}  endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }  fullWidth required/>
                    </FormControl>
                    <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group">UserType</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={values.userType}
                            row
                            onChange={handleChange('userType')}
                        >
                            <FormControlLabel value="Landlord" control={<Radio />} label="Landlord" />
                            <FormControlLabel value="Tenant" control={<Radio />} label="Tenant" />
                        </RadioGroup>
                    </FormControl>
                    <Button type="submit" color="primary" variant="contained" style={btnStyle} fullWidth><Typography fontFamily="Noto Sans">Sign up</Typography></Button>
                    <Typography fontFamily="Noto Sans">
                        Already have an account? &nbsp;
                        <Link to="/login" style={linkStyling}>
                            Sign in
                        </Link>
                    </Typography>
                </Paper>
            </Grid>
        </form>
    )
}

export default Signup;