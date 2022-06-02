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
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { getUsers, validateUser } from "../../api";
import Swal from "sweetalert2";
import classes from "./styles";
import { useDispatch } from "react-redux";
import authActions from "../../Store/slices/auth-slice";

const Signin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        email: "",
        password: "",
        showPassword: false
    });
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers()
            .then(res => {
                if (res.data.length > 0) {
                    setUsers(res.data);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

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

    const submitLogin = (e) => {
        e.preventDefault();
        const { email, password } = values;
        const userCredentials = {
            email,
            password
        };
        let userInfo = users.find(users => users.email === values.email);
        //Call the backend
        validateUser(userCredentials)
            .then(() => {
                // localStorage.setItem("id", userInfo._id);
                navigate(`/`);
                dispatch(authActions.actions.login(userInfo._id));                
            })
            .catch(() => Swal.fire("Try Again", "It seems you have entered the wrong password or email", "error"));
    };

    return (
        <form onSubmit={submitLogin}>
            <Grid>
                <Paper elevation={10} style={classes.paper}>
                    <Grid align="center">
                        <Avatar style={classes.avatar}><LockOutlinedIcon/></Avatar>
                        <Typography variant="h5" fontFamily="Noto Sans">Sign in</Typography>
                    </Grid>
                    <FormControl style={classes.formControl} fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
                        <OutlinedInput variant="standard" value={values.email} onChange={handleChange("email")}
                                       label="Email" placeholder="Enter email" fullWidth required/>
                    </FormControl>
                    <FormControl fullWidth>
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
                    <Button type="submit" color="primary" variant="contained" style={classes.btnStyle} fullWidth><Typography
                        fontFamily="Noto Sans">Sign in</Typography></Button>
                    <Typography fontFamily="Noto Sans">
                        Don't have an account? &nbsp;
                        <Link to="/signup" style={classes.link}>
                            Sign up
                        </Link>
                    </Typography>
                </Paper>
            </Grid>
        </form>
    );
};

export default Signin;