import React, { useEffect, useState } from "react";
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { getPropertyByID, updateIssue } from "../../../../api";
import { useSelector } from "react-redux";

const Issue = ({
                   issue: { _id, issueImage, issueType, issueDescription, status, propertyId },
                   removeIssue,
                   editIssue, 
               }) => {
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
                        Status: {status}
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