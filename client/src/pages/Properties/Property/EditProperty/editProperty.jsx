import React, { useEffect, useState } from "react";
import {
    Avatar, Backdrop,
    Button,
    Checkbox, CircularProgress, Divider,
    FormControlLabel,
    Grid, InputAdornment, Stack,
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
import Container from "@mui/material/Container";
import AmenitiesAutoComplete from "../../../../components/AmenitiesAutoComplete/AmenitiesAutoComplete";
import YearPicker from "../../../../components/YearPicker/YearPicker";

const EditProperty = () => {
    let { ownerId, propertyId } = useParams();
    const navigate = useNavigate();
    const initialState = {
        location: "",
        built: "",
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
    const [amenities, setAmenities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [imagesToDelete, setImagesToDelete] = useState([]);
    const [{ location, built, squareFeet, rent, capacity, parkingStalls, bed, bath, description }, setValues] = useState(initialState);

    useEffect(() => {
        getProperty(ownerId, propertyId).then((res) => {
            const { location, built, squareFeet, images, rent, capacity, parkingStalls, pets, utilities, bed, bath, post, description, amenities } = res.data;
            setValues({
                location,
                built: { year: built },
                squareFeet,
                rent,
                capacity,
                parkingStalls,
                bed,
                bath,
                description
            });
            setSelectedFiles(images);
            setPets(pets);
            setPost(post);
            const amen = amenities.map((a) => { 
                return {amenities: a};
            });
            setAmenities(amen);
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
        const filesGiven = event.target.files;
        for (const file of filesGiven) {
            previewFile(file);
        }
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setSelectedFiles(prev => [...prev, reader.result]);
        }
    }
    
    const handlePetsChange = (event) => {
        setPets(event.target.value);
    };

    const handleChange = (event) => {
        let { name, value } = event.target;
        const numbersInput = ["squareFeet", "rent", "capacity", "parkingStalls", "bed", "bath"];
        if (numbersInput.includes(name) && value < 0) {
            value = 0;
        }
        setValues((prevState) => ({ ...prevState, [name]: value }));
    };
    
    const avatarStyle = {
        backgroundColor: "#26a69a"
    };

    const btnStyle = {
        margin: "8px 0"
    };

    const backdrop = () => {
        return (
            <>
                {
                    loading &&
                    <Backdrop open={loading} sx={{zIndex: 1}}>
                        <CircularProgress color="primary"/>
                    </Backdrop>
                }
            </>
        )
    }

    const updateProperty = (e) => {
        e.preventDefault();
        setLoading(true);
        const amentieArray = [];
        for (const amenity of amenities) {
            amentieArray.push(amenity.amenities);
        }
        const propertyData = {
            images: selectedFiles,
            amenities: amentieArray,
            imagesToDelete,
            location,
            built: built.year,
            squareFeet,
            rent,
            capacity,
            parkingStalls,
            pets,
            utilities,
            bed,
            bath,
            post,
            description,
            ownerId
        };
        editProperty(ownerId, propertyId, propertyData)
            .then(() => {
                setLoading(false);
                Swal.fire("Congratulations", "Your property has been updated", "success");
                navigate(`/landlord/${ownerId}`);
            })
            .catch((e) => {
                setLoading(false);
                Swal.fire("Try Again", "Your property has not been added", "error");
                console.log(e);
            });
    };
    return (
        <form onSubmit={updateProperty}>
            {backdrop()}
            <Container>
                <Grid>
                    <Grid align="center" style={{ marginTop: "20px" }}>
                        <Avatar style={avatarStyle}><HouseIcon/></Avatar>
                        <Typography variant="h5" fontFamily="Noto Sans">Edit Property</Typography>
                    </Grid>
                    <Typography variant="h6" component="h2" sx={{mt: 2}}>
                        Property Information
                    </Typography>
                    <Divider/>
                    <PlacesAutoComplete name="location" label="Property Location" handleChange={setValues} style={btnStyle} valueProp={location}/>
                    <Stack direction="row" spacing={3} sx={{mt: 2}}>
                        <YearPicker value={built} name="built" setYearBuilt={setValues}/>
                        <TextField required label="Square Feet" type="number" onChange={handleChange} name="squareFeet" fullWidth value={squareFeet} InputLabelProps={{ shrink: true }}/>
                        <TextField required label="Rent Per Month" onChange={handleChange} name="rent" type="number" fullWidth value={rent} InputLabelProps={{ shrink: true }} InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}/>
                        <TextField required label="Max Capacity" onChange={handleChange} name="capacity" type="number" fullWidth value={capacity} InputLabelProps={{ shrink: true }}/>
                        <TextField required label="Bath" onChange={handleChange} name="bath" type="number" fullWidth value={bath} InputLabelProps={{shrink: true}}/>
                        <TextField required label="Bedrooms" onChange={handleChange} name="bed" type="number" fullWidth value={bed} InputLabelProps={{shrink: true}}/>
                    </Stack>
                    <Typography variant="h6" component="h2" sx={{mt: 1}}>
                        Features
                    </Typography>
                    <Divider/>
                    <Stack direction="row" spacing={3} sx={{mt: 2}}>
                        <TextField required label="Parking Stalls" type="number" onChange={handleChange} name="parkingStalls" fullWidth value={parkingStalls} InputLabelProps={{shrink: true}}/>
                        <TextField fullWidth id="select" label="Pets" value={pets} onChange={handlePetsChange} select required InputLabelProps={{ shrink: true }}>
                            <MenuItem value={"true"}>Allowed</MenuItem>
                            <MenuItem value={"false"}>Not Allowed</MenuItem>
                        </TextField>
                        <TextField fullWidth id="select" label="Utilities" value={utilities} onChange={handleUtilitiesChange} select required InputLabelProps={{ shrink: true }}>
                            <MenuItem value={"Water & Electricity"}>Water & Electricity</MenuItem>
                            <MenuItem value={"Electricity"}>Electricity</MenuItem>
                            <MenuItem value={"Water"}>Water</MenuItem>
                            <MenuItem value={"None"}>None</MenuItem>
                        </TextField>
                    </Stack>
                    <Typography variant="h6" component="h2" sx={{mt: 1}}>
                        Amenities
                    </Typography>
                    <Divider/>
                    <AmenitiesAutoComplete value={amenities} setAmenities={setAmenities}/>
                    <TextField label="Property Description" rows={8} fullWidth multiline onChange={handleChange} name="description" value={description} placeholder="Brief description of your property (optional)" InputLabelProps={{ shrink: true }}/>
                    <FormControlLabel style={btnStyle} label="Post this property on our website so others can find it" control={<Checkbox checked={post} onChange={handlePost} inputProps={{ "aria-label": "controlled" }}/>}/>
                    <br/>
                    <Button variant="contained" style={btnStyle} endIcon={<FileUpload/>} component="label">
                        <Typography variant="contained">
                            Upload Issue Images
                        </Typography>
                        <input onChange={handleFileChange} hidden multiple type="file" />
                    </Button>
                    <ListImage
                        selectedFiles={selectedFiles}
                        setSelectedFiles={setSelectedFiles}
                        imagesToDelete={imagesToDelete}
                        setImagesToDelete={setImagesToDelete}
                    />
                    <Button type="submit" color="primary" variant="contained" style={btnStyle} fullWidth>
                        <Typography fontFamily="Noto Sans">Submit</Typography>
                    </Button>
                </Grid>
            </Container>
        </form>
    );
};

export default (EditProperty);