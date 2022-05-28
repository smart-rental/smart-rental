import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const Property = ({property: { location, propertyCreated, propertyValue, rentPerMonth, maxCapacity, propertyImage, parkingStalls, pets, utilities }}) => {
    const checkOrX = (bool) => {
        return bool ? <CheckCircleIcon/> : <CancelIcon/>
    }

    return(
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {location}
            </TableCell>
            <TableCell align="center">{new Date(propertyCreated).toLocaleDateString()}</TableCell>
            <TableCell align="center">${propertyValue}</TableCell>
            <TableCell align="center">${rentPerMonth}</TableCell>
            <TableCell align="center">{maxCapacity}</TableCell>
            <TableCell align="center">{propertyImage}</TableCell>
            <TableCell align="center">{parkingStalls}</TableCell>
            <TableCell align="center">{checkOrX(pets)}</TableCell>
            <TableCell align="center">{utilities}</TableCell>
        </TableRow>
    );
}

export default Property; 