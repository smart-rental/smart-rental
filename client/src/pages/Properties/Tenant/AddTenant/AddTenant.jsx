import React, { useState } from "react";
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
import Swal from "sweetalert2";
import { addTenant, deleteTenant } from "../../../../api";
import Container from "@mui/material/Container";

const AddTenant = () => {
    let { ownerId, propertyId } = useParams();
    const initialState = {
        name: "",
        email: "",
        phoneNumber: ""   
    };
    const [{ name, email, phoneNumber }, setValues] = useState(initialState);
    const navigate = useNavigate();
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
        setValues({ ...initialState });
        navigate(`/landlord/${ownerId}`);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues((prevState) => ({ ...prevState, [name]: value }));
    };

    const addUser = (e) => {
        e.preventDefault();
        const tenantToAdd = {
            email,
            phoneNumber,
            name
        };
        addTenant(ownerId, propertyId, tenantToAdd)
            .then(() => {
                console.log("entered");
                Swal.fire("Congratulations", "The tenant has been added", "success").then(reset);
            })
            .catch((e) => {
                console.log(e);
                Swal.fire("Try Again", "There does not seem to be a user that matches", "error");
            });
    };
    
    const removeTenant = () => { 
        deleteTenant(ownerId, propertyId)
            .then(() => {
                Swal.fire("Congratulations", "The tenant has been removed", "success").then(reset);
            })
            .catch((e) => {
                console.log(e);
                Swal.fire("Try Again", "There was an error removing the tenant", "error");
            });
    }

    return (
        <form onSubmit={addUser}>
            <Container width="xl">
                <Paper elevation={10} style={paperStyle}>
                    <Grid align="center">
                        <Avatar style={avatarStyle}><HouseIcon/></Avatar>
                        <Typography variant="h5" fontFamily="Noto Sans">Add Tenant</Typography>
                    </Grid>
                    <TextField
                        required
                        style={btnStyle}
                        fullWidth
                        onChange={handleChange}
                        name="name"
                        value={name}
                        id="outlined-required"
                        label="Tenant Name"
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                    <TextField
                        required
                        style={btnStyle}
                        fullWidth
                        onChange={handleChange}
                        name="email"
                        value={email}
                        id="outlined-required"
                        label="Tenant Email"
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                    <TextField
                        required
                        style={btnStyle}
                        fullWidth
                        onChange={handleChange}
                        name="phoneNumber"
                        value={phoneNumber}
                        id="outlined-required"
                        label="Tenant Phone Number"
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                    <Button type="submit" color="primary" variant="contained" style={btnStyle} fullWidth>
                        <Typography fontFamily="Noto Sans">Add</Typography>
                    </Button>
                    <Button sx={{bgcolor: "red"}} variant="contained" style={btnStyle} onClick={() => removeTenant} fullWidth>
                        <Typography fontFamily="Noto Sans">Remove</Typography>
                    </Button>
                </Paper>
            </Container>
        </form>
    );
};

export default (AddTenant);