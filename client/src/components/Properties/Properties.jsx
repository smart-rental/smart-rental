import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";
import { deleteProperty, getProperty, updateProperty } from "../../api";
import { useNavigate, useParams } from "react-router-dom";
import Property from "./Property/Property";
import Swal from "sweetalert2";

const table = {
    margin: "100px auto"
}

const Properties = () => {
    const [properties, setProperties] = useState([]);
    const params = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        getProperty(params.id)
            .then((res) => {
                setProperties(res.data);
            })
            .catch((e) => {
                console.log(e);})
    });

    const removeProperty = (propertyId) => {
        deleteProperty(propertyId)
            .then(() => {
                setProperties(properties.filter(property => property._id === propertyId));
                Swal.fire("Property Deleted", `The property has been deleted`, 'success');
            })
            .catch((e) => {
                console.log(e);
                Swal.fire("Error", "There was an error deleting your property", "error");
            });
    }
    
    const editProperty = (propertyId) => { 
        updateProperty(propertyId)
            .then(() => {
                // navigate(`/editProperty/${propertyId}`);
                navigate(`/home`);
            })
            .catch((e) => {
                console.log(e);
                 Swal.fire("Error", "Trouble accessing the selected page", "error");               
            });
    }
    
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
                        <TableCell align="center">Edit</TableCell>
                        <TableCell align="center">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {properties.map((property) => (
                        <Property property={property} removeProperty={removeProperty} editProperty={editProperty} key={property._id}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Properties;