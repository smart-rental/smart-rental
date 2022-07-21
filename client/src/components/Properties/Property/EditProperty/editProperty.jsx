import React, { useEffect, useState } from "react";
import { Avatar, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import HouseIcon from "@mui/icons-material/House";
import MenuItem from "@mui/material/MenuItem";
import Swal from "sweetalert2";
import { editProperty, getProperty } from "../../../../api";

const EditProperty = () => {
    let { ownerId, propertyId } = useParams();
    const navigate = useNavigate();
    const initialState = {
        propertyLocation: "",
        propertyCreated: new Date(),
        propertyValue: "",
        rentPerMonth: "",
        maxCapacity: "",
        parkingStalls: "",
        contract: "",
        propertyImage: ""
    };
    const [utilities, setUtilities] = React.useState("");
    const [pets, setPets] = React.useState("");
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedFilesArray, setSelectedFilesArray] = useState([]);
    const [indexToDelete, setIndexToDelete] = useState([]);
    const [{ propertyLocation, propertyCreated, propertyValue, rentPerMonth, maxCapacity, parkingStalls, contract }, setValues] = useState(initialState);

    useEffect(() => {
        getProperty(ownerId, propertyId).then((res) => {
            const { location, propertyCreated, propertyValue, rentPerMonth, propertyImage, maxCapacity, parkingStalls, pets, utilities, contract, tenant } = res.data;
            setValues({
                propertyLocation: location,
                propertyCreated,
                propertyValue,
                rentPerMonth,
                maxCapacity,
                parkingStalls,
                pets,
                contract,
                tenant,
            });
            setSelectedFilesArray(propertyImage);
            const imageArray = propertyImage.map((image) => {
                return `http://localhost:5000/${image.filePath}`;
            });
            setSelectedFiles(imageArray);
            setPets(pets);
            setUtilities(utilities);
        });
    }, [ownerId, propertyId]);

    const handleUtilitiesChange = (event) => {
        setUtilities(event.target.value);
    };

    const handleFileChange = (event) => {
        const selectedFiles = event.target.files;
        const selectedFilesArray = Array.from(selectedFiles);
        setSelectedFilesArray(prevState => prevState.concat(selectedFilesArray));
        const imageArray = selectedFilesArray.map((image) => {
            return URL.createObjectURL(image);
        });
        setSelectedFiles(prevState => prevState.concat(imageArray));
    };
    
    const handlePetsChange = (event) => {
        setPets(event.target.value);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues((prevState) => ({ ...prevState, [name]: value }));
    };
    
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

    console.log(indexToDelete);
    const updateProperty = (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const image of selectedFilesArray) {
            formData.append("propertyImage", image);
        }
        for (const index of indexToDelete) { 
            formData.set("indexToDelete", index);
        }
        formData.append("location", propertyLocation);
        formData.append("propertyCreated", propertyCreated.toString());
        formData.append("propertyValue", propertyValue);
        formData.append("rentPerMonth", rentPerMonth);
        formData.append("maxCapacity", maxCapacity);
        formData.append("parkingStalls", parkingStalls);
        formData.append("pets", pets);
        formData.append("utilities", utilities);
        formData.append("contract", "someContract");
        formData.append("ownerId", ownerId);
        editProperty(ownerId, propertyId, formData)
            .then((r) => {
                console.log(r);
                Swal.fire("Congratulations", "Your property has been updated", "success");
                navigate(`/landlord/${ownerId}`);
            })
            .catch((e) => {
                Swal.fire("Try Again", "Your property has not been added", "error");
                console.log(e);
            });
    };    

    return (
        <form onSubmit={updateProperty}>
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align="center">
                        <Avatar style={avatarStyle}><HouseIcon/></Avatar>
                        <Typography variant="h5" fontFamily="Noto Sans">Edit Property</Typography>
                        <Typography variant="h5" fontFamily="Noto Sans">Properties that have not been rented out will be
                            displayed for renters to see</Typography>
                    </Grid>
                    <TextField
                        required
                        style={btnStyle}
                        fullWidth
                        onChange={handleChange}
                        name="propertyLocation"
                        id="outlined-required"
                        label="Property Location"
                        value={propertyLocation}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                    <TextField
                        id="outlined-required"
                        label="Property Built"
                        onChange={handleChange}
                        name="propertyCreated"
                        style={btnStyle}
                        value={new Date(propertyCreated).toISOString().split('T')[0]}
                        type="date"
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                    <TextField
                        id="outlined-number"
                        label="Property Value"
                        type="number"
                        onChange={handleChange}
                        name="propertyValue"
                        fullWidth
                        value={propertyValue}
                        style={btnStyle}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                    <TextField
                        id="outlined-number"
                        label="Rent Per Month"
                        onChange={handleChange}
                        name="rentPerMonth"
                        type="number"
                        fullWidth
                        value={rentPerMonth}
                        style={btnStyle}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                    <TextField
                        id="outlined-number"
                        label="Max Capacity"
                        onChange={handleChange}
                        name="maxCapacity"
                        value={maxCapacity}
                        type="number"
                        fullWidth
                        style={btnStyle}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                    <TextField
                        id="outlined-number"
                        label="Parking Stalls"
                        type="number"
                        onChange={handleChange}
                        value={parkingStalls}
                        name="parkingStalls"
                        fullWidth
                        style={btnStyle}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                    <TextField
                        fullWidth
                        id="select"
                        label="Pets"
                        value={pets}
                        style={btnStyle}
                        onChange={handlePetsChange}
                        select
                        required
                        InputLabelProps={{
                            shrink: true
                        }}
                    >
                        <MenuItem value={true}>Allowed</MenuItem>
                        <MenuItem value={false}>Not Allowed</MenuItem>
                    </TextField>
                    <TextField
                        fullWidth
                        id="select"
                        label="Utilities"
                        value={utilities}
                        style={btnStyle}
                        onChange={handleUtilitiesChange}
                        select
                        required
                        InputLabelProps={{
                            shrink: true
                        }}>
                        <MenuItem value={"Water & Electricity"}>Water & Electricity</MenuItem>
                        <MenuItem value={"Only Electricity"}>Only Electricity</MenuItem>
                        <MenuItem value={"Only Water"}>Only Water</MenuItem>
                        <MenuItem value={"None"}>None</MenuItem>
                    </TextField>
                    <TextField
                        required
                        fullWidth
                        style={btnStyle}
                        id="outlined-required"
                        onChange={handleChange}
                        name="contract"
                        value={contract}
                        label="Upload Contract Images"
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                    <input
                        type="file"
                        style={btnStyle}
                        id="outlined-required"
                        onChange={handleFileChange}
                        name="propertyImage"
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
                    <Button type="submit" color="primary" variant="contained" style={btnStyle} fullWidth>
                        <Typography fontFamily="Noto Sans">Submit</Typography>
                    </Button>
                </Paper>
            </Grid>
        </form>
    );
};

export default (EditProperty);