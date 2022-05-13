import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from '../src/components/Navbar/navbar';
import Login from './components/Signin/signin';
import Signup from '../src/components/Signup/signup';
import Home from '../src/components/Home/home';

const App = function () { 
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;