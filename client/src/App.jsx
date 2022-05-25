import { BrowserRouter, Route, Routes, Outlet, useParams } from "react-router-dom";
import Navbar from '../src/components/Navbar/navbar';
import Login from './components/Signin/signin';
import Signup from '../src/components/Signup/signup';
import Home from '../src/components/Home/home';
import Landlord from './components/Landlord/landlord';
import AddProperty from './components/AddProperty/addProperty';
import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";
import { ThemeProvider } from "@emotion/react";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from 'react-redux';


const customTheme = createTheme({
    palette: {
        primary: {
            main: "#26a69a"
        },
        secondary: {
            main: "#80cbc4"
        },
        error: red,
        warning: { main: "#b71c1c" },
        typography: {
            fontFamily: [
                'Noto Sans',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
        },
    }
});


const App = function () { 
    const [currentId, setCurrentId] = useState(0); 
    const dispatch = useDispatch();
    return (
        <ThemeProvider theme={customTheme}>
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route element={<ProtectedRoutes/>}>
                        <Route path="/landlord/:id" element={<Landlord/>}/>
                        <Route path="/addProperty/:id" element={<AddProperty/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>

    );
}

const useAuth = () => {
    const [users, setUsers] = useState([]);
    let { id } = useParams();
    axios.get("http://localhost:5000/api/auth")
        .then(res => {
            if (res.data.length > 0) {
                setUsers(res.data);
            }
        })
        .catch((e) => {
            });
    let isUserLoggedIn = (users.find(user => user._id === id));
    return isUserLoggedIn !== undefined;
}

const ProtectedRoutes = () => { 
    const isAuth = useAuth();
    return isAuth ? <Outlet/> : <Login/>
}

export default App;