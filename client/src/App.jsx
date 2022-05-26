import { BrowserRouter, Route, Routes, Outlet, useParams } from "react-router-dom";
import Navbar from '../src/components/Navbar/navbar';
import Login from './components/Signin/signin';
import Signup from '../src/components/Signup/signup';
import Home from '../src/components/Home/home';
import Landlord from './components/Properties/Properties';
import AddProperty from './components/AddProperty/addProperty';
import { ThemeProvider } from "@emotion/react";
import { Provider, useSelector } from "react-redux";
import store from "./Store";
import { customTheme } from "./styles";

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
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    return isLoggedIn ? <Outlet/> : <Login/>
}

export default App;