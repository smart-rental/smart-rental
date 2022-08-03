import React, { useState } from "react";
import {
    Grid,
    Paper,
    Avatar,
    TextField,
    Button,
    Typography, Checkbox, FormControlLabel, TextareaAutosize
} from "@mui/material";
import { useParams } from "react-router-dom";
import HouseIcon from "@mui/icons-material/House";
import MenuItem from "@mui/material/MenuItem";
import Swal from "sweetalert2";
import { addProperty } from "../../../../api";
import PlacesAutoComplete from "../../../../components/PlacesAutoComplete/PlacesAutoComplete";
import Container from "@mui/material/Container";
import ListImage from "../../../../components/ListImage/ListImage";
import { FileUpload } from "@mui/icons-material";

const AddProperty = () => {
    let { id } = useParams();
    const initialState = {
        location: "",
        built: new Date(),
        squareFeet: "",
        rent: "",
        capacity: "",
        parkingStalls: "",
        bed: "",
        description: "",
        bath: "",
    };
    const [utilities, setUtilities] = React.useState("");
    const [pets, setPets] = React.useState("");
    const [post, setPost] = React.useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedFilesArray, setSelectedFilesArray] = useState([]);
    const [{ location, built, squareFeet, rent, capacity, parkingStalls, bed, bath, description }, setValues] = useState(initialState);

    const handleUtilitiesChange = (event) => {
        setUtilities(event.target.value);
    };

    const handlePetsChange = (event) => {
        setPets(event.target.value);
    };
    
    const handlePost = (event) => { 
        setPost(event.target.checked);
    }
    
    const handleFileChange = (event) => {
        const selectedFiles = event.target.files;
        const selectedFilesArray = Array.from(selectedFiles);
        const imageArray = selectedFilesArray.map((image) => {
            return URL.createObjectURL(image);
        });
        setSelectedFilesArray(prevState => prevState.concat(selectedFilesArray));
        setSelectedFiles(prevState => prevState.concat(imageArray));
    }

    const handleChange = (event) => {
        let { name, value } = event.target;
        const numbersInput = ["squareFeet", "rent", "capacity", "parkingStalls", "bed", "bath"];
        if (numbersInput.includes(name) && value < 0) {
            value = 0;
        }
        setValues((prevState) => ({ ...prevState, [name]: value }));
    };

    const paperStyle = {
        padding: 80,
        marginTop: "20px"
    };

    const avatarStyle = {
        backgroundColor: "#26a69a"
    };

    const btnStyle = {
        margin: "8px 0"
    };

    const reset = () => {
        setPets("");
        setUtilities("");
        setPost("");
        setSelectedFilesArray([]);
        setSelectedFiles([]);
        setValues({ ...initialState });
    };

    const createProperty = (e) => {
        e.preventDefault();
        const propertyData = new FormData();
        for (const image of selectedFilesArray) {
            propertyData.append("images", image);
        }
        propertyData.append("location", location);
        propertyData.append("built", built.toString());
        propertyData.append("squareFeet", squareFeet);
        propertyData.append("rent", rent);
        propertyData.append("capacity", capacity);
        propertyData.append("parkingStalls", parkingStalls);
        propertyData.append("pets", pets);
        propertyData.append("utilities", utilities);
        propertyData.append("bed", bed);
        propertyData.append("bath", bath);
        propertyData.append("post", post);
        propertyData.append("description", description);
        propertyData.append("ownerId", id);
        addProperty(id, propertyData)
            .then(() => {
                Swal.fire("Congratulations", "Your property has been added", "success").then(reset);
            })
            .catch((e) => {
                console.log(e);
                Swal.fire("Try Again", "Your property has not been added", "error");
            });
    };

    return (
        <form onSubmit={createProperty}>
            <Container maxWidth="xl">
                <Paper elevation={10} style={paperStyle}>
                    <Grid align="center">
                        <Avatar style={avatarStyle}><HouseIcon/></Avatar>
                        <Typography variant="h5" fontFamily="Noto Sans">Add Property</Typography>
                    </Grid>
                    <PlacesAutoComplete
                        name="location"
                        label="Property Location"
                        handleChange={setValues}
                        style={btnStyle}
                        valueProp={location}
                    />
                    <TextField
                        id="outlined-required"
                        label="Property Built"
                        onChange={handleChange}
                        name="built"
                        style={btnStyle}
                        type="date"
                        fullWidth
                        value={built}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                    <TextField
                        id="outlined-number"
                        label="Square Feet"
                        type="number"
                        onChange={handleChange}
                        name="squareFeet"
                        fullWidth
                        value={squareFeet}
                        style={btnStyle}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                    <TextField
                        id="outlined-number"
                        label="Rent Per Month"
                        onChange={handleChange}
                        name="rent"
                        type="number"
                        fullWidth
                        value={rent}
                        style={btnStyle}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                    <TextField
                        id="outlined-number"
                        label="Max Capacity"
                        onChange={handleChange}
                        name="capacity"
                        type="number"
                        fullWidth
                        value={capacity}
                        style={btnStyle}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                    <TextField
                        id="outlined-number"
                        label="Bath"
                        onChange={handleChange}
                        name="bath"
                        type="number"
                        fullWidth
                        value={bath}
                        style={btnStyle}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                    <TextField
                        id="outlined-number"
                        label="Bedrooms"
                        onChange={handleChange}
                        name="bed"
                        type="number"
                        fullWidth
                        value={bed}
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
                        name="parkingStalls"
                        fullWidth
                        value={parkingStalls}
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
                        rows={8}
                        fullWidth
                        multiline
                        onChange={handleChange}
                        name="description"
                        value={description}
                        placeholder="Brief description of your property (optional)"
                    />
                    <FormControlLabel
                        style={btnStyle}
                        control={<Checkbox
                            checked={post}
                            onChange={handlePost}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />} 
                        label="Post this property on our website so others can find it"
                    />
                    <br/>
                    <Button variant="contained" style={btnStyle} endIcon={<FileUpload/>} component="label">
                        <Typography variant="contained">
                            Upload Issue Images
                        </Typography>
                        <input onChange={handleFileChange} hidden multiple type="file" />
                    </Button>
                    <ListImage
                        selectedFiles={selectedFiles}
                        selectedFilesArray={selectedFilesArray}
                        setSelectedFiles={setSelectedFiles}
                        setSelectedFilesArray={setSelectedFilesArray}
                    />
                    <Button type="submit" color="primary" variant="contained" fullWidth style={btnStyle} >
                        <Typography fontFamily="Noto Sans">Submit</Typography>
                    </Button>
                </Paper>
            </Container>
        </form>
    );
};

export default (AddProperty);