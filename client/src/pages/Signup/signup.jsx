import React, { useState } from "react";
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
import userActions from "../../Store/slices/users-slice";

const Signup = () => {
    const { paper, avatar, link, topMargin, formControl } = classes;
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
            let userInfo = response.data.find(users => users.email === userLogin.email);
            navigate(`/`);
            dispatch(authActions.actions.login(userInfo._id));
            dispatch(userActions.actions.setUserType(userInfo.userType));
        });
    };

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
                switch (res.response.status) {
                    case 409:
                        Swal.fire("Email already exits", "Seems that a user with given email already exits", "error");
                        break;
                    case 500:
                        Swal.fire("This ones on us", "Looks like there was an internal server error", "error");
                        break;
                    case 400:
                        let message = "";
                        for (const response of res.response.data.message) {
                            message = `${response.message}`;
                        }
                        Swal.fire("", `${message}`, "error");
                }
            });
    };

    return (
        <form onSubmit={submitLogin}>
            <Grid>
                <Paper elevation={10} style={paper}>
                    <Grid align="center">
                        <Avatar style={avatar}><LockOutlinedIcon/></Avatar>
                        <Typography variant="h5" fontFamily="Noto Sans">Sign up</Typography>
                    </Grid>
                    <FormControl style={formControl} fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
                        <OutlinedInput variant="standard" value={values.email} onChange={handleChange("email")}
                                       label="Email" placeholder="Enter email" fullWidth required/>
                    </FormControl>
                    <FormControl style={formControl} fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">Name</InputLabel>
                        <OutlinedInput variant="standard" value={values.name} onChange={handleChange("name")}
                                       label="Name" placeholder="Enter name" fullWidth required/>
                    </FormControl>
                    <FormControl style={formControl} fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">Phone</InputLabel>
                        <OutlinedInput variant="standard" value={values.phoneNumber}
                                       onChange={handleChange("phoneNumber")} label="Email"
                                       placeholder="Enter phone number xxxxxxxxxx" fullWidth required/>
                    </FormControl>
                    <FormControl style={formControl} fullWidth>
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
                    <FormControl style={formControl} fullWidth>
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
                    <Button type="submit" color="primary" variant="contained" style={topMargin}
                            fullWidth>
                        <Typography
                            fontFamily="Noto Sans"
                        >
                            Sign up
                        </Typography>
                    </Button>
                    <Typography style={topMargin} fontFamily="Noto Sans">
                        Already have an account? &nbsp;
                        <Link to="/login" style={link}>
                            Sign in
                        </Link>
                    </Typography>
                </Paper>
            </Grid>
        </form>
    );
};

export default Signup;