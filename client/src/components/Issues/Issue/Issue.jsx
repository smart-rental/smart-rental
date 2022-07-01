import React, { useEffect, useState } from "react";
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { getPropertyByID } from "../../../api";

const Issue = ({issue: { _id, issueImage, issueType, issueDescription, status, propertyId }, removeIssue, editIssue}) => {
    const [location , setLocation] = useState("");
    const findStatus = () => { 
        if (status) {
            return "not done";
        }
        return "done"
    }

    useEffect(() => { 
        getPropertyByID(propertyId)
            .then(r => {
                setLocation(r.data.location);
            })
            .catch(e => {
                console.log(e);});
    }, []);
    
    return (
        <Grid item>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={issueImage}
                    alt="issue image"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {issueType}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {issueDescription}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Status: {findStatus()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Property Location: {location}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => editIssue(_id)}>
                        Edit
                    </Button>
                    <Button size="small" onClick={() => removeIssue(_id)}>
                        Delete
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default Issue;