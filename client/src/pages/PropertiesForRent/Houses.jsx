import React, { useEffect, useState } from "react";
import { getAllProperties } from "../../api";
import HouseCard from "./HouseCard/HouseCard";
import { Grid } from "@mui/material";
import Error from "../../components/Error/Error";

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
            <Grid container 
                  style={{marginTop: "20px"}} 
                  justifyContent="center" 
                  alignItems="center"
                  direction="column"
                  spacing={2}
            >
                    {properties.map((propertyInfo, index) => {
                        return (
                            <Grid item minWidth={1000} key={index}>
                                <HouseCard propertyInfo={propertyInfo}/>
                            </Grid>
                        );
                    })}
            </Grid>
        </>
    )
}

export default Houses;