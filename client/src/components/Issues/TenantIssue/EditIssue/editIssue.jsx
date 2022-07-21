import React, { useEffect, useState } from "react";
import { Avatar, Button, Grid, Paper, TextareaAutosize, TextField, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FeedbackIcon from '@mui/icons-material/Feedback';
import { useSelector } from "react-redux";
import { retrieveIssue, updateIssue } from "../../../../api";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

const EditIssue = () => {
    const navigate = useNavigate();
    const userType = useSelector((state) => state.users.userType);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const { issueId } = useParams();
    let initialState = {
        issueType: "",
        issueImage: "",
        issueDescription: ""
    }
    const [{issueType, issueDescription}, setValues] = useState(initialState);
    const [issueImage, setIssueImage] = useState("");
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedFilesArray, setSelectedFilesArray] = useState([]);
    const [indexToDelete, setIndexToDelete] = useState([]);
    const [res, setRes] = useState("");
    useEffect(() => {
        retrieveIssue(issueId)
            .then((res) => {
                setRes(res.data);
                setValues({
                    issueType: res.data.issueType,
                    issueDescription: res.data.issueDescription
                })
                setSelectedFilesArray(res.data.issueImage);
                const imageArray = res.data.issueImage.map((image) => {
                    return `http://localhost:5000/${image.filePath}`;
                });
                setSelectedFiles(imageArray);
                setIssueImage(res.data.issueImage);
            })
            .catch((e) => {
                console.log(e);
            })
    }, []);

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

    const handleFileChange = (event) => {
        const selectedFiles = event.target.files;
        const selectedFilesArray = Array.from(selectedFiles);
        setSelectedFilesArray(prevState => prevState.concat(selectedFilesArray));
        const imageArray = selectedFilesArray.map((image) => {
            return URL.createObjectURL(image);
        });
        setSelectedFiles(prevState => prevState.concat(imageArray));
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setValues((prevState) => ({ ...prevState, [name]: value}));
    }

    const changeIssue = (e) => {
        e.preventDefault();
        const { status, propertyId } = res;
        const issueData = new FormData();
        for (const image of selectedFilesArray) {
            issueData.append("issueImage", image);
        }
        for (const index of indexToDelete) {
            issueData.set("indexToDelete", index);
        }
        issueData.append("issueType", issueType);
        issueData.append("issueDescription", issueDescription);
        issueData.append("status", status);
        issueData.append("propertyId", propertyId);
        updateIssue(issueId, issueData)
            .then(() => {
                Swal.fire("Congratulations", "Your issue has been successfully edited", "success")
                    .then(() => {
                        window.history.back()
                    });
            })
            .catch((e) => {
                if (e.response.status === 404) {
                    Swal.fire("Error", "You have not been added to a property. <br/> If this is a mistake please contact your landlord to add you to their list of properties", "error");
                } else {
                    Swal.fire("Error", "There was an issue adding your error", "error");
                    console.log(e);
                }
            })
    }

    return (
        <form onSubmit={changeIssue}>
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align="center">
                        <Avatar style={avatarStyle}><FeedbackIcon/></Avatar>
                        <Typography variant="h5" fontFamily="Noto Sans">Edit Issue</Typography>
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
                    <TextareaAutosize
                        aria-label="minimum height"
                        minRows={8}
                        onChange={handleChange}
                        name="issueDescription"
                        value={issueDescription}
                        placeholder="Brief description of your issue (optional)"
                        style={{ width: 1904 }}
                    />
                    <input
                        type="file"
                        style={btnStyle}
                        id="outlined-required"
                        onChange={handleFileChange}
                        name="issueImage"
                        multiple
                    />
                    {selectedFiles && selectedFiles.map((image, index) => {
                        return (
                            <div key={index}>
                                <img
                                    src={image}
                                    alt="error"/>
                                <Button onClick={() => {
                                    setSelectedFiles(selectedFiles.filter((e, ind) => ind !== index))
                                    setSelectedFilesArray(selectedFilesArray.filter((e, ind) => ind !== index));
                                    setIndexToDelete(prevState => [...prevState, index]);
                                }}>
                                    Delete Image
                                </Button>
                            </div>
                        )
                    })}
                    <Button type="submit" color="primary" variant="contained" fullWidth style={btnStyle}>
                        <Typography fontFamily="Noto Sans">Submit</Typography>
                    </Button>
                </Paper>
            </Grid>
        </form>
    );
};

export default EditIssue;