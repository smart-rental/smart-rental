import React, { useEffect, useState } from "react";
import {
    Grid,
    Paper,
    Avatar,
    Button,
    Typography,
    InputAdornment,
    OutlinedInput,
    Radio,
    InputLabel, FormControl, FormControlLabel, RadioGroup, FormLabel
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { createUser, getUsers } from "../../api";
import Swal from "sweetalert2";
import classes from "./styles";
import { useDispatch } from "react-redux";
import authActions from "../../Store/slices/auth-slice";

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        userType: "",
        showPassword: false
    });

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const retrieveNewUser = (userLogin) => {
        getUsers().then((response) => {
            let users = response.data.find(users => users.email === userLogin.email);
            console.log(users);
            navigate(`/`);
            dispatch(authActions.actions.login(users._id));
        });
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
        };
        createUser(userLogin)
            .then(() => {
                retrieveNewUser(userLogin);
            })
            .catch((res) => {
                if (res.data.message === "User with given email already Exist!") {
                    Swal.fire("Email already exits", "Seems that a user with given email already exits", "error");
                }
            });
    };

    return (
        <form onSubmit={submitLogin}>
            <Grid>
                <Paper elevation={10} style={classes.paper}>
                    <Grid align="center">
                        <Avatar style={classes.avatar}><LockOutlinedIcon/></Avatar>
                        <Typography variant="h5" fontFamily="Noto Sans">Sign up</Typography>
                    </Grid>
                    <FormControl style={classes.formControl} fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
                        <OutlinedInput variant="standard" value={values.email} onChange={handleChange("email")}
                                       label="Email" placeholder="Enter email" fullWidth required/>
                    </FormControl>
                    <FormControl style={classes.formControl} fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">Name</InputLabel>
                        <OutlinedInput variant="standard" value={values.name} onChange={handleChange("name")}
                                       label="Name" placeholder="Enter name" fullWidth required/>
                    </FormControl>
                    <FormControl style={classes.formControl} fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">Phone</InputLabel>
                        <OutlinedInput variant="standard" value={values.phoneNumber}
                                       onChange={handleChange("phoneNumber")} label="Email"
                                       placeholder="Enter phone number xxxxxxxxxx" fullWidth required/>
                    </FormControl>
                    <FormControl style={classes.formControl} fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput variant="standard" value={values.password} onChange={handleChange("password")}
                                       label="Password" placeholder="Enter password"
                                       type={values.showPassword ? "text" : "password"} endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        } fullWidth required/>
                    </FormControl>
                    <FormControl style={classes.formControl} fullWidth>
                        <OutlinedInput variant="standard" value={values.confirmPassword}
                                       onChange={handleChange("confirmPassword")} label="Password"
                                       placeholder="Re-enter password" type={values.showPassword ? "text" : "password"}
                                       endAdornment={
                                           <InputAdornment position="end">
                                               <IconButton
                                                   aria-label="toggle password visibility"
                                                   onClick={handleClickShowPassword}
                                                   onMouseDown={handleMouseDownPassword}
                                                   edge="end"
                                               >
                                                   {values.showPassword ? <VisibilityOff/> : <Visibility/>}
                                               </IconButton>
                                           </InputAdornment>
                                       } fullWidth required/>
                    </FormControl>
                    <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group">UserType</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={values.userType}
                            row
                            onChange={handleChange("userType")}
                        >
                            <FormControlLabel value="Landlord" control={<Radio/>} label="Landlord"/>
                            <FormControlLabel value="Tenant" control={<Radio/>} label="Tenant"/>
                        </RadioGroup>
                    </FormControl>
                    <Button type="submit" color="primary" variant="contained" style={classes.btnStyle} fullWidth><Typography
                        fontFamily="Noto Sans">Sign up</Typography></Button>
                    <Typography fontFamily="Noto Sans">
                        Already have an account? &nbsp;
                        <Link to="/login" style={classes.link}>
                            Sign in
                        </Link>
                    </Typography>
                </Paper>
            </Grid>
        </form>
    );
};

export default Signup;