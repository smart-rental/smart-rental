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
import Swal from "sweetalert2";
import { addTenant, deleteTenant, getProperty } from "../../../../api";

const EditTenant = () => {
    let { ownerId, propertyId } = useParams();
    const navigate = useNavigate();
    const [{ name, phoneNumber, email }, setValues] = useState({});

    useEffect(() => {
        getProperty(ownerId, propertyId)
            .then((res) => {
                if (res) {
                    setValues(res.data.tenant); 
                }
            })
            .catch((e) => {console.log(e);})
    }, [ownerId, propertyId]);

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

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues((prevState) => ({ ...prevState, [name]: value }));
    };

    const addUser = (e) => {
        e.preventDefault();
        const tenantToAdd = {
            phoneNumber,
            name,
            email
        };
        addTenant(ownerId, propertyId, tenantToAdd)
            .then(() => {
                Swal.fire("Congratulations", "The tenant has been added", "success")
                    .then(navigate);
            })
            .catch((e) => {
                console.log(e);
                Swal.fire("Try Again", "There does not seem to be a user that matches", "error");
            });
    };

    const removeTenant = () => {
        deleteTenant(ownerId, propertyId)
            .then(() => {
                Swal.fire("Congratulations", "The tenant has been removed", "success")
                    .then(navigate(`/landlord/${ownerId}`));
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
            <Grid>
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
                        id="outlined-required"
                        label="Tenant Name"
                        value={name}
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
                        id="outlined-required"
                        label="Tenant Email"
                        value={email}
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
                        id="outlined-required"
                        label="Tenant Phone Number"
                        value={phoneNumber}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                    <Button type="submit" color="primary" variant="contained" style={btnStyle} fullWidth onClick={addUser}>
                        <Typography fontFamily="Noto Sans">Add</Typography>
                    </Button>
                    <Button type="submit" sx={{ bgcolor: "red" }} variant="contained" style={btnStyle} onClick={removeTenant} fullWidth>
                        <Typography fontFamily="Noto Sans">Remove</Typography>
                    </Button>
                </Paper>
            </Grid>
    );
};

export default (EditTenant);