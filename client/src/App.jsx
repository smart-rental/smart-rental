import { BrowserRouter, Route, Routes, Outlet, useParams } from "react-router-dom";
import Navbar from '../src/components/Navbar/navbar';
import Login from './components/Signin/signin';
import Signup from '../src/components/Signup/signup';
import Home from '../src/components/Home/home';
import Landlord from './components/Landlord/landlord';
import AddProperty from './components/AddProperty/addProperty';
import { ThemeProvider } from "@emotion/react";
import axios from "axios";
import { useState } from "react";
import { Provider, useDispatch } from "react-redux";
import store from "./Store";


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
    return (
        <Provider store={store}>
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
        </Provider>
    );
}

const ProtectedRoutes = () => { 
    const isAuth = localStorage.getItem('id');
    return isAuth ? <Outlet/> : <Login/>
}

export default App;