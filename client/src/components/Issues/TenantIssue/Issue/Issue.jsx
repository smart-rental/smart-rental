import React, { useEffect, useState } from "react";
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { getPropertyByID, updateIssue } from "../../../../api";
import { useSelector } from "react-redux";

const Issue = ({
                   issue: { _id, issueImage, issueType, issueDescription, status, propertyId },
                   removeIssue,
                   editIssue,
                   updateStatus
               }) => {
    const [location, setLocation] = useState("");
    const userType = useSelector((state) => state.users.userType);
    const findStatus = () => {
        return status ? "Completed" : "In Progress";
    };

    //gets the property using the property location
    useEffect(() => {
        getPropertyByID(propertyId)
            .then(r => {
                if (r.data) {
                    setLocation(r.data.location);
                }
            })
            .catch(e => {
                console.log(e);
            });
    });

    const issue = {
        issueType,
        issueImage,
        issueDescription,
        status: true,
        propertyId
    };

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
                        Description: {issueDescription}
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
                    {userType === "Landlord" ?
                        <Button size="small" onClick={() => updateStatus(_id, issue)}>Done</Button> :
                        <Button size="small" onClick={() => removeIssue(_id)}>
                            Delete
                        </Button>}
                </CardActions>

            </Card>
        </Grid>
    );
};

export default Issue;