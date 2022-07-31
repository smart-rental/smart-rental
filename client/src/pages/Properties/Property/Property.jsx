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
import Gallery from "../../../components/Gallery/Gallery";

const Property = ({property: { _id, location, built, squareFeet, images, rent, capacity, parkingStalls, pets, utilities, bed, bath, tenant }, removeProperty, editProperty, addTenant, users}) => {
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

    const dateToString = () => {
        const date = new Date(built);
        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1;
        const year = date.getUTCFullYear();
        return `${month}/${day}/${year}`
    }

    return(
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {location}
            </TableCell>
            <TableCell align="center">{dateToString()}</TableCell>
            <TableCell align="center">${squareFeet}</TableCell>
            <TableCell align="center">${rent}</TableCell>
            <TableCell align="center">{capacity}</TableCell>
            <TableCell align="center">
                <Gallery images={images}/>
            </TableCell>
            <TableCell align="center">{parkingStalls}</TableCell>
            <TableCell align="center">{bed}</TableCell>
            <TableCell align="center">{bath}</TableCell>
            <TableCell align="center">{checkOrX(pets)}</TableCell>
            <TableCell align="center">{utilities}</TableCell>
            <TableCell align="center"><EditIcon onClick={() => {editProperty(_id)}}/></TableCell>
            <TableCell align="center"><DeleteForeverIcon onClick={() => {
                removeProperty(_id);}}/></TableCell>
            <TableCell align="center">{displayTenant()}</TableCell>
            <TableCell align="center"><Link to={`/issue/${_id}`}>Issue</Link></TableCell>
        </TableRow>
    );
}

export default Property;