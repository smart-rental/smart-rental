import React from "react";
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Gallery from "../../../components/Gallery/Gallery";

const HouseCard = ({propertyInfo: { _id, location, squareFeet, images, rent, capacity, bed, bath } }) => {
    const navigate = useNavigate();
    return (
        <Card sx={{ maxWidth: 345 }}>
                <div style={{ display: "flex", justifyContent: "center"}}>
                    <Gallery images={images}/>
                </div>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Location: {location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Capacity: {capacity}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Bed: {bed}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Bath: {bath}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Square Feet: {squareFeet}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Rent Price: ${rent}
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