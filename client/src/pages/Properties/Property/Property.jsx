import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PersonIcon from '@mui/icons-material/Person';
import { Link, useNavigate } from "react-router-dom";
import Gallery from "../../../components/Gallery/Gallery";
import Kebab from "../../../components/Kebab/Kebab";

const Property = ({property: { _id, location, built, squareFeet, images, rent, capacity, parkingStalls, pets, utilities, bed, bath, tenant }, landlordId, removeProperty, users}) => {
    const checkOrX = (bool) => {
        return bool ? <CheckCircleIcon style={{color: "green"}}/> : <CancelIcon style={{color: "red"}}/>
    }

    //Move this to the backend
    //This finds a user that matches the tenant id
    const displayTenant = () => {
        let isTenant = null;
        if (tenant) {
            isTenant = users.find(user => user._id === tenant._id);
        }
        return isTenant == null ? {
            navigationLink: `/addTenant/${landlordId}/${_id}`,
            name: "Add Tenant",
            icon: <PersonAddAltIcon/>
        } : {
            navigationLink: `/editTenant/${landlordId}/${_id}`,
            name: "Edit Tenant",
            icon: <PersonIcon/>
        };
    }
    const options = [
        {
            navigationLink: `/editProperty/${landlordId}/${_id}`,
            name: "Edit",
            icon: <EditIcon/>
        },
        displayTenant()
    ]

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
            <TableCell align="center" component="th" scope="row">
                {location}
            </TableCell>
            <TableCell align="center">{dateToString()}</TableCell>
            <TableCell align="center">{squareFeet}</TableCell>
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
            <TableCell align="center"><Link to={`/issue/${_id}`} style={{textDecoration: "none" }}>Manage Issues</Link></TableCell>
            <TableCell align="center"><DeleteForeverIcon style={{color: "#cc0000"}} onClick={() => {
                removeProperty(_id);}}/></TableCell>
            <TableCell align="center">
                <Kebab
                    options={options}
                />
            </TableCell>
        </TableRow>
    );
}

export default Property;