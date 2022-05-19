import React, { useEffect, useState } from "react";
import {
    Avatar,
    Button,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Paper,
    Typography
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Signin = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: '',
        password: '',
        showPassword: false
    });
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/auth")
            .then(res => { 
                if (res.data.length > 0) {
                    setUsers(res.data);
                }
            })
            .catch((e) => {
                console.log(e);});
    });

    const paperStyle = { 
        padding: 20,
        height: "70vh",
        width: 280,
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
        const { email, password } = values;
        const userLogin = {
            email,
            password
        }
        let userInfo = users.find(users => users.email === values.email);
        //Call the backend
        axios.post('http://localhost:5000/api/auth', userLogin)
            .then(res => { console.log(res.data.message); navigate(`/landlord/${userInfo._id}`); })
            .catch(e => { console.log(e.message); });
        
    }

    return (
        <form onSubmit={submitLogin}>
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align="center">
                        <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                        <Typography variant="h5" fontFamily="Noto Sans">Sign in</Typography>
                    </Grid>
                    <FormControl style={{ marginBottom: "10px", marginTop: "10px" }} fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
                        <OutlinedInput variant="standard" value={values.email} onChange={handleChange('email')} label="Email" placeholder="Enter email" fullWidth required/>
                    </FormControl>
                    <FormControl fullWidth>
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
                    <Button type="submit" color="primary" variant="contained" style={btnStyle} fullWidth><Typography fontFamily="Noto Sans">Sign in</Typography></Button>
                    <Typography fontFamily="Noto Sans">
                        Don't have an account? &nbsp;
                        <Link to="/signup" style={linkStyling}>
                            Sign up
                        </Link>
                    </Typography>
                </Paper>
            </Grid>
        </form>
    )
}

export default Signin;