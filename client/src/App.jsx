import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import Navbar from '../src/components/Navbar/navbar';
import Login from './components/Signin/signin';
import Signup from '../src/components/Signup/signup';
import Home from '../src/components/Home/home';
import Landlord from './components/Properties/Properties';
import AddProperty from './components/Properties/Property/AddProperty/addProperty';
import { ThemeProvider } from "@emotion/react";
import { Provider, useSelector } from "react-redux";
import store from "./Store";
import { customTheme } from "./styles";
import EditProperty from "./components/Properties/Property/EditProperty/editProperty";
import AddTenant from "./components/Properties/Property/AddTenant/AddTenant";
import EditTenant from "./components/Properties/Property/EditTenant/EditTenant";
import Issues from "./components/Issues/Issues";
import AddIssue from "./components/Issues/TenantIssue/AddIssue/addIssue";
import EditIssue from "./components/Issues/TenantIssue/EditIssue/editIssue";

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
                            <Route path="/editProperty/:ownerId/:propertyId" element={<EditProperty/>}/>
                            <Route path="/addTenant/:ownerId/:propertyId" element={<AddTenant/>}/>
                            <Route path="/editTenant/:ownerId/:propertyId" element={<EditTenant/>}/>
                            <Route path="/issue" element={<Issues/>}/>
                            <Route path="/issue/:propertyId" element={<Issues/>}/>
                            <Route path="/addIssue/:tenantId" element={<AddIssue/>}/>
                            <Route path="/editIssue/:tenantId/:issueId" element={<EditIssue/>}/>
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