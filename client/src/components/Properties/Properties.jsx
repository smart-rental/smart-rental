import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useEffect, useState } from "react";
import { getProperty } from "../../api";
import { useParams } from "react-router-dom";
import Property from "./Property/Property";

function createData(location, owner, propertyCreated, propertyValue, rentPerMonth, maxCapacity, propertyImage, parkingStalls, pets, utilities, contract) {
    return { location, owner, propertyCreated, propertyValue, rentPerMonth, maxCapacity, propertyImage, parkingStalls, pets, utilities, contract };
}

const rows = [
    createData('location', 'John Foo', '2000-04-28T09:00:00Z', 1000, 4, 10, 'images', 10, true, true, 'contract'),
    createData('location', 'John Foo', '2010-05-23T09:00:00Z', 1000, 4, 10, 'images', 4, true, true, 'contract'),
    createData('location', 'John Foo', '2016-09-29T09:00:00Z', 1000, 4, 10, 'images', 3, false, true, 'contract'),
    createData('location', 'John Foo', '2015-07-21T09:00:00Z', 1000, 4, 10, 'images', 2, true, true, 'contract'),
    createData('location', 'John Foo', '2014-03-24T09:00:00Z', 1000, 4, 10, 'images', 1, true, true, 'contract'),
    createData('location', 'John Foo', '2012-05-26T09:00:00Z', 1000, 4, 10, 'images', 5, true, true, 'contract'),
    createData('location', 'John Foo', '2009-05-20T09:00:00Z', 1000, 4, 10, 'images', 6, true, true, 'contract'),
];

const table = {
    margin: "100px auto"
}

const Properties = () => {
    const [properties, setProperties] = useState([]);
    const params = useParams();
    useEffect(() => {
        getProperty(params.id)
            .then((res) => {
                if (res.data.length > 0) {
                    setProperties(res.data);
                }
            })
            .catch((e) => {
                console.log(e);})
    }, [params]);

    return (
        <TableContainer component={Paper} style={table} sx={{ maxHeight: '1000px'}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                <TableHead>
                    <TableRow>
                        <TableCell>Location</TableCell>
                        <TableCell align="center">Date built</TableCell>
                        <TableCell align="center">Property Value</TableCell>
                        <TableCell align="center">Rent per month</TableCell>
                        <TableCell align="center">Max Capacity</TableCell>
                        <TableCell align="center">Images</TableCell>
                        <TableCell align="center">Parking Stalls</TableCell>
                        <TableCell align="center">Pets</TableCell>
                        <TableCell align="center">Utilities</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {properties.map((property, index) => (
                        <Property property={property} key={index}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Properties;