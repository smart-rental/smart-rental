import React from "react";
import { Button, Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material";
import Gallery from "../../Gallery/Gallery";
import { useNavigate } from "react-router-dom";

const HouseCard = ({propertyInfo: { location, propertyImage, maxCapacity, parkingStalls, pets, utilities, propertyCreated, rentPerMonth, _id } }) => {
    const navigate = useNavigate();
    const petToString = () => { 
        return pets ? "Allowed" : "Not Allowed";
    }
    return (
        <Card sx={{ maxWidth: 345 }}>
                <div style={{ display: "flex", justifyContent: "center"}}>
                    <Gallery images={propertyImage}/>
                </div>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Location: {location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Capacity: {maxCapacity}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Parking Stalls: {parkingStalls}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Pets: {petToString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Utilities: {utilities}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Rent Price: ${rentPerMonth}
                    </Typography>
                </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={() => {
                    navigate(`/map/${location}/${_id}`);
                }}>
                    Click for more information
                </Button>
            </CardActions>
        </Card>
    )
}

export default HouseCard;