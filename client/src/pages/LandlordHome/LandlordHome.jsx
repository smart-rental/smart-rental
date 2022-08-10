import React from "react";
import { Grid, Typography } from "@mui/material";

const LandlordHome = () => {
    return (
        <Grid container direction="row" justifyContent="space-around" alignItems="center">
            <Grid item>
                <Typography>
                    Properties Owned
                </Typography>
            </Grid>
            <Grid item>
                <Typography>
                    Total Property Value
                </Typography>
            </Grid>
            <Grid item>
                <Typography>
                    Total Occupied Homes
                </Typography>
            </Grid>
        </Grid>
    );
};

export default LandlordHome;