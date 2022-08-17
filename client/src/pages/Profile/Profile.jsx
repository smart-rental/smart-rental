import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, Button, Grid, TextField, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import Swal from "sweetalert2";
import { getUser, updateUser } from "../../api";
import { useSelector } from "react-redux";
import LandLordStripeButton from "../../components/LandlordStripeButton/LandLordStripeButton";
import TenantStripeButton from "../../components/TenantStripeButton/TenantStripeButton";

const Profile = () => {
    const { ownerId } = useParams();
    const userType = useSelector((state) => state.users.userType);
    const initial_state = {
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        stripe_account: ""
    }
    const [{name, email, phoneNumber, password, stripe_account}, setData] = useState(initial_state);
    const [submit, setSubmit] = useState(false);
    const [previousPassword, setPreviousPassword] = useState("");
    useEffect(() => {
        let isMounted = true;
        async function getData() {
            const data = await getUser(ownerId);
            setData(data.data);
            setPreviousPassword(data.data.password);
        }
        getData();
        return () => {
            isMounted = false;
        }
    }, [submit, ownerId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            previousPassword === password ? await updateUser(ownerId, {name, email, phoneNumber}) : await updateUser(ownerId, {name, email, phoneNumber, password})
            await Swal.fire("", "Account Information Changed", "success");
        } catch (e) {
            console.log(e);
        } finally {
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <Container>
                <Grid align="center" sx={{ mt: 2, mb: 2 }}>
                    <Avatar sx={{ bgcolor: "#26a69a" }}><AccountCircleIcon/></Avatar>
                    <Typography variant="h5" fontFamily="Noto Sans">Account Profile</Typography>
                </Grid>
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 2
                }}>
                    <TextField label="Name" name="name" onChange={handleChange} value={name}
                               InputLabelProps={{ shrink: true }}/>
                </Box>
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 2
                }}>
                    <TextField label="Email" name="email" type="email" onChange={handleChange} value={email}
                               InputLabelProps={{ shrink: true }}/>
                </Box>
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 2
                }}>
                    <TextField label="Phone Number" name="phoneNumber" type="tel" pattern="^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$" onChange={handleChange} value={phoneNumber}
                               InputLabelProps={{ shrink: true }}/>
                </Box>
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 2
                }}>
                    <TextField label="Password" type="password" name="password" onChange={handleChange} value={password}
                               InputLabelProps={{ shrink: true }}/>
                </Box>
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Button type="submit" variant="contained" color="primary"
                            sx={{ borderRadius: "15px" }}>
                        <Typography fontFamily="Noto Sans">
                            Update Profile
                        </Typography>
                    </Button>
                </Box>
                {userType === "Landlord" ? <LandLordStripeButton stripe_account={stripe_account} setSubmit={setSubmit} ownerId={ownerId}/> 
                    : <TenantStripeButton stripe_account={stripe_account} setSubmit={setSubmit} ownerId={ownerId}/>}
            </Container>
        </form>
    );
};



export default Profile;