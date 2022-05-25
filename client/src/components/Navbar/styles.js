import { makeStyles } from "@mui/material";

export default makeStyles(() => ({ 
   link: { 
       color: "white",
       textDecoration: "none"
   },
    
    typography: {
        mr: 2,
        display: { xs: 'none', md: 'flex' },
        fontFamily: 'Noto Sans',
        fontWeight: 700,
        letterSpacing: '.3rem',
        color: 'inherit',
        textDecoration: 'none',
    },
    
    box: {
        flexGrow: 1, 
        display: { xs: 'flex', md: 'none' }
    },
    
    menu: {
        display: { xs: 'block', md: 'none' }
    },
    
    menuItem: {
     color: "black", textDecoration: "none" 
    },
    
    mobileButton: { 
       marginRight: "20px"
    },
    
    mobileTypography: { 
       color: "white",
        fontFamily: "Noto Sans",
    },
    
    mobileBox: { 
       flexGrow: 0
    }
}));