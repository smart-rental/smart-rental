import React from 'react';
import { Grid, Typography } from "@mui/material";
import Issue from "./Issue/Issue";


const Issues = () => {
    return (
        <div>
            <Typography align="center">
                HERE IS A LIST OF YOUR ISSUES
            </Typography>
            <Grid container justifyContent="center" alignItems="center" direction="row" spacing={2}>
                <Issue/>
            </Grid>
        </div>
    );
};

export default Issues;