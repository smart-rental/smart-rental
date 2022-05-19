import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(location, owner, propertyCreated, propertyValue, rentPerMonth, maxCapacity, propertyImage, parkingStalls, pets, utilities, contract) {
    return { location, owner, propertyCreated, propertyValue, rentPerMonth, maxCapacity, propertyImage, parkingStalls, pets, utilities, contract };
}

const rows = [
    createData('location', 'John Foo', '2022-04-28T09:00:00Z', 1000, 4, '', 3, true, true, true, ''),
];

export default function BasicTable() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.location}</TableCell>
                            <TableCell align="right">{row.owner}</TableCell>
                            <TableCell align="right">{row.propertyCreated}</TableCell>
                            <TableCell align="right">${row.propertyValue}</TableCell>
                            <TableCell align="right">${row.rentPerMonth}</TableCell>
                            <TableCell align="right">{row.maxCapacity}</TableCell>
                            <TableCell align="right">{row.images}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}