import React, { useState } from "react";
import { Avatar, Button, Grid, Paper, TextareaAutosize, TextField, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FeedbackIcon from '@mui/icons-material/Feedback';
import { useSelector } from "react-redux";
import { addIssue } from "../../../api";
import Swal from "sweetalert2";

const AddIssue = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const initialState = { 
        issueType: "",
        issueImage: "",
        issueDescription: ""
    }

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
    
    const [{issueType, issueImage, issueDescription}, setValues] = useState(initialState);
    
    const handleChange = (event) => { 
        const {name, value} = event.target;
        setValues((prevState) => ({ ...prevState, [name]: value}));
    }
    
    const reset = () => { 
        setValues(initialState);
    }
    
    const createIssue = (e) => {
        e.preventDefault();
        const issue = { 
            issueType,
            issueImage,
            issueDescription
        }
        addIssue(isLoggedIn, issue)
            .then((res) => {
                console.log(res);
                Swal.fire("Congratulations", "Your issue has been created and will be addressed shortly by your landlord", "success");
                reset();
            })
            .catch((e) => {
                if (e.response.status === 404) {
                    Swal.fire("Error", "You have not been added to a property. <br/> If this is a mistake please contact your landlord to add you to their list of properties", "error");
                } else { 
                    Swal.fire("Error", "There was an issue adding your error", "error");
                }
            })
    }
    
    return (
        <form onSubmit={createIssue}>
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align="center">
                        <Avatar style={avatarStyle}><FeedbackIcon/></Avatar>
                        <Typography variant="h5" fontFamily="Noto Sans">Create An Issue</Typography>
                        <Typography variant="h5" fontFamily="Noto Sans">
                            Issues will be automatically sent to your landlord.
                        </Typography>
                    </Grid>
                    <TextField
                        fullWidth
                        style={btnStyle}
                        id="select"
                        label="Issue Type"
                        select
                        name="issueType"
                        value={issueType}
                        onChange={handleChange}
                        required
                        InputLabelProps={{
                            shrink: true
                        }}>
                        <MenuItem value={"Plumbing"}>Plumbing</MenuItem>
                        <MenuItem value={"Electrical"}>Electrical</MenuItem>
                        <MenuItem value={"Structural Damage"}>Structural Damage</MenuItem>
                        <MenuItem value={"Heating"}>Heating</MenuItem>
                        <MenuItem value={"Roof Leaks"}>Roof Leaks</MenuItem>
                        <MenuItem value={"Other"}>Other</MenuItem>
                    </TextField>
                    <TextField
                        required
                        fullWidth
                        style={btnStyle}
                        id="outlined-required"
                        onChange={handleChange}
                        name="issueImage"
                        value={issueImage}
                        label="Upload Issue Image"
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                    <TextareaAutosize
                        aria-label="minimum height"
                        minRows={8}
                        onChange={handleChange}
                        name="issueDescription"
                        value={issueDescription}
                        placeholder="Brief description of your issue (optional)"
                        style={{ width: 1904 }}
                    />
                    <Button type="submit" color="primary" variant="contained" fullWidth style={btnStyle}>
                        <Typography fontFamily="Noto Sans">Submit</Typography>
                    </Button>
                </Paper>
            </Grid>
        </form>
    );
};

export default AddIssue;