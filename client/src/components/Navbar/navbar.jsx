import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router-dom";

const ResponsiveAppBar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const linkStyling = {color: "white", textDecoration: "none"};
    const userId = localStorage.getItem('id');
    console.log(userId);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="sticky" color="primary">
            {/*Desktop Version*/}
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'Noto Sans',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <Link to="/" style={linkStyling}>Smart Rentals</Link>
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <MenuItem>
                                <Typography textAlign="center"><Link style={{ color: "black", textDecoration: "none" }} to="/">Who are we?</Link></Typography>
                            </MenuItem>
                            <MenuItem>
                                <Typography textAlign="center"><Link style={{ color: "black", textDecoration: "none" }} to="/">Info</Link></Typography>
                            </MenuItem>
                            <MenuItem>
                                <Typography textAlign="center"><Link style={{ color: "black", textDecoration: "none" }} to="/landlord">Manage Properties</Link></Typography>
                            </MenuItem>
                            <MenuItem>
                                <Typography textAlign="center"><Link style={{ color: "black", textDecoration: "none" }} to="/addProperty">Add Property</Link></Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    
                    {/*Mobile Version*/}
                    <Typography
                        variant="h5"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <Link to="/" style={linkStyling}>Rental</Link>
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Link style={linkStyling} to="/">
                            <Button style={{ marginRight: "20px" }} size="large">
                                <Typography textAlign="center" style={{color: "white"}} fontFamily="Noto Sans">Who are we?</Typography>
                            </Button>
                        </Link>
                        <Link style={linkStyling} to="/">
                            <Button style={{ marginRight: "20px" }} size="large">
                                <Typography textAlign="center" style={{color: "white"}} fontFamily="Noto Sans">Info</Typography>
                            </Button>
                        </Link>
                        <Link style={linkStyling} to={`/landlord/${userId}`}>
                            <Button style={{ marginRight: "20px" }} size="large">
                                <Typography textAlign="center" style={{color: "white"}} fontFamily="Noto Sans">Manage Properties</Typography>
                            </Button>
                        </Link>
                        <Link style={linkStyling} to={`/addProperty/${userId}`}>
                            <Button style={{ marginRight: "20px" }} size="large">
                                <Typography textAlign="center" style={{color: "white"}} fontFamily="Noto Sans">Add Property</Typography>
                            </Button>
                        </Link>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Link style={linkStyling} to="/login">
                            <Button variant="contained"  color="secondary" style={{ marginRight: "20px" }} size="large">
                                <Typography textAlign="center" style={{color: "white"}} fontFamily="Noto Sans">Login</Typography>
                            </Button>
                        </Link>
                            <Link style={linkStyling} to="/signup">
                                <Button variant="contained"  size="large">
                                    <Typography textAlign="center" fontFamily="Noto Sans">Sign up</Typography>
                                </Button>
                            </Link>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;