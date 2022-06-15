import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import Issue from "./Issue/Issue";
import { useSelector } from "react-redux";
import { deleteIssue, retrieveIssues } from "../../api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const Issues = () => {
    const [issues, setIssues] = useState([]);
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    useEffect(() => {
        retrieveIssues(isLoggedIn)
            .then((res) => { 
                setIssues(res.data);
            })
            .catch((e) => {
                console.log(e);
            });
    },[]);
    
    const editIssue = (issueId) => { 
        navigate(`/editIssue/${isLoggedIn}/${issueId}`);
    }
    
    const removeIssue = (issueId) => {
        deleteIssue(isLoggedIn, issueId)
            .then(() => {
                setIssues(issues.filter(issue => issue._id !== issueId));
                Swal.fire("Issue Deleted", `The issue has been deleted`, 'success');
            })
            .catch((e) => {
                console.log(e);
            });
    }
    return (
        <div>
            <Typography variant="h3" align="center">
                HERE IS A LIST OF YOUR ISSUES
            </Typography>
            <Grid container justifyContent="center" alignItems="center" direction="row" spacing={4}>
                {issues.map((issue, index) => (
                    <Issue key={index} issue={issue} removeIssue={removeIssue} editIssue={editIssue}/>
                ))}
            </Grid>
        </div>
    );
};

export default Issues;