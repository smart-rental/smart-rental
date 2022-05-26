import { makeStyles } from "@mui/material/styles";

export default makeStyles((theme) => ({
    paper: {
        padding: 20,
        height: "70vh",
        width: 280,
        margin: "20px auto"
    },

    avatar: {
        backgroundColor: "green"
    },

    link: {
        textDecoration: "none"
    },

    btnStyle: {
        margin: theme.spacing(1)
    },

    formControl: {
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1)
    }
}));