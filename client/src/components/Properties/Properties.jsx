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
const checkOrX = (bool) => { 
    return bool ? <CheckCircleIcon/> : <CancelIcon/>
}

export default function BasicTable() {
    return (
        <TableContainer component={Paper} style={table}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                <TableHead>
                    <TableRow>
                        <TableCell>Location</TableCell>
                        <TableCell align="right">Date built</TableCell>
                        <TableCell align="right">Property Value</TableCell>
                        <TableCell align="right">Rent per month</TableCell>
                        <TableCell align="right">Max Capacity</TableCell>
                        <TableCell align="right">Images</TableCell>
                        <TableCell align="right">Parking Stalls</TableCell>
                        <TableCell align="right">Pets</TableCell>
                        <TableCell align="right">Utilities</TableCell>
                        <TableCell align="right">Contracts</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.location}
                            </TableCell>
                            <TableCell align="right">{new Date(row.propertyCreated).toLocaleDateString()}</TableCell>
                            <TableCell align="right">${row.propertyValue}</TableCell>
                            <TableCell align="right">${row.rentPerMonth}</TableCell>
                            <TableCell align="right">{row.maxCapacity}</TableCell>
                            <TableCell align="right">{row.propertyImage}</TableCell>
                            <TableCell align="right">{row.parkingStalls}</TableCell>
                            <TableCell align="right">{checkOrX(row.pets)}</TableCell>
                            <TableCell align="right">{checkOrX(row.utilities)}</TableCell>
                            <TableCell align="right">{row.contract}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}