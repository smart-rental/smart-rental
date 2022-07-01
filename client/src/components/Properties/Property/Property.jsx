import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Property = ({property: { _id, location, propertyCreated, propertyValue, rentPerMonth, maxCapacity, propertyImage, parkingStalls, pets, utilities, tenant }, removeProperty, editProperty, addTenant, users}) => {
    const checkOrX = (bool) => {
        return bool ? <CheckCircleIcon/> : <CancelIcon/>
    }

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    //Move this to the backend
    //This finds a user that matches the tenant id
    const displayTenant = () => {
        let isTenant = null;
        if (tenant) {
            isTenant = users.find(user => user._id === tenant._id);
        }
        return isTenant == null ? <PersonAddAltIcon onClick={() => {
            addTenant(_id);}}/> : <Link to={`/editTenant/${isLoggedIn}/${_id}`}>{isTenant.name}</Link>;
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
            <TableCell align="center"><EditIcon onClick={() => {editProperty(_id)}}/></TableCell>
            <TableCell align="center"><DeleteForeverIcon onClick={() => {
                removeProperty(_id);}}/></TableCell>
            <TableCell align="center">{displayTenant()}</TableCell>
            <TableCell align="center">Issue</TableCell>
        </TableRow>
    );
}

export default Property; 