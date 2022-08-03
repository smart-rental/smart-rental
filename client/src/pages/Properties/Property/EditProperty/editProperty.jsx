import React, { useEffect, useState } from "react";
import {
    Avatar,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Paper,
    TextareaAutosize,
    TextField,
    Typography
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import HouseIcon from "@mui/icons-material/House";
import MenuItem from "@mui/material/MenuItem";
import Swal from "sweetalert2";
import { editProperty, getProperty } from "../../../../api";
import PlacesAutoComplete from "../../../../components/PlacesAutoComplete/PlacesAutoComplete";
import ListImage from "../../../../components/ListImage/ListImage";
import { FileUpload } from "@mui/icons-material";

const EditProperty = () => {
    let { ownerId, propertyId } = useParams();
    const navigate = useNavigate();
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
    const [indexToDelete, setIndexToDelete] = useState([]);
    const [{ location, built, squareFeet, rent, capacity, parkingStalls, bed, bath, description }, setValues] = useState(initialState);

    useEffect(() => {
        getProperty(ownerId, propertyId).then((res) => {
            const { location, built, squareFeet, images, rent, capacity, parkingStalls, pets, utilities, bed, bath, post, description } = res.data;
            setValues({
                location,
                built,
                squareFeet,
                rent,
                capacity,
                parkingStalls,
                bed,
                bath,
                description
            });
            setSelectedFilesArray(images);
            const imageArray = images.map((image) => {
                return `http://localhost:5000/${image.filePath}`;
            });
            setSelectedFiles(imageArray);
            setPets(pets);
            setPost(post);
            setUtilities(utilities);
        });
    }, [ownerId, propertyId]);

    const handleUtilitiesChange = (event) => {
        setUtilities(event.target.value);
    }

    const handlePost = (event) => {
        setPost(event.target.checked);
    }

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

    const updateProperty = (e) => {
        e.preventDefault();
        const propertyData = new FormData();
        for (const index of indexToDelete) {
            if (typeof index === "object") {
                propertyData.append("indexToDelete", index.filePath);
            }
        }
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
        propertyData.append("ownerId", ownerId);
        editProperty(ownerId, propertyId, propertyData)
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
                    <   PlacesAutoComplete
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
                        value={new Date(built).toISOString().split('T')[0]}
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
                        value={capacity}
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
                        />} label="Post this property on our website so others can find it"/>
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
                        setIndexToDelete={setIndexToDelete}
                    />
                    <Button type="submit" color="primary" variant="contained" style={btnStyle} fullWidth>
                        <Typography fontFamily="Noto Sans">Submit</Typography>
                    </Button>
                </Paper>
            </Grid>
        </form>
    );
};

export default (EditProperty);