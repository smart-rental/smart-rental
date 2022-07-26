import React, { useEffect, useState } from "react";
import { getAllProperties } from "../../api";
import Error from "../Error/Error";
import HouseCard from "./HouseCard/HouseCard";
import { Grid, Typography } from "@mui/material";

const Houses = () => {
    const [properties, setProperties] = useState([]);
    useEffect(() => {
        getAllProperties()
            .then((res) => {
                setProperties(res.data);
            })
            .catch(() => {
                return (
                    <Error/>
                );
            });
    }, []);
    return (
        <>
            <Typography align="center" variant="h2">List of places to rent from</Typography>
            <Grid container justifyContent="center">
                <>
                    {properties.map((propertyInfo, index) => {
                        return <HouseCard propertyInfo={propertyInfo} key={index}/>;
                    })}
                </>
            </Grid>
        </>
    )
}

export default Houses;