import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './index.css'

export default function NavBar({ title, showBackIcon }) {
  const backHome = () => {
    window.location = "/all-report";
  }
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-0 py-3">
      <div class="container-xl">

        <a class="navbar-brand d-flex" href="#">
        
          {
            showBackIcon && (
              <button class="btn btn-sm btn-outline-light rounded-circle mx-3 " onClick={backHome}>
              <i className="fa fa-long-arrow-left"></i>
              </button>
            )
          }
     
         
         
          <div className=" nav-title">  {title}</div>
        </a>

    <a href="/" class="d-flex align-items-lg-center mt-3 mt-lg-0">
    <img src="https://i.ibb.co/6vYxk8n/logo.png" class="h-8" alt="..."></img>
    <p class="h6 mx-2 " style={{color:'white',paddingTop:'5px'}}>BIZFIZ</p>
  </a>

      </div>
    </nav>
  )
}


// export default function NavBar({title, showBackIcon}) {
//   const backHome = ()=>{
//     window.location = "/";
//   }
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static">
//         <Toolbar>
//             {showBackIcon && (
//           <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             sx={{ mr: 2 }}
//             onClick={backHome}
//           >
//             <ArrowBackIcon />
//           </IconButton>
//             )}
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//            {title}
//           </Typography>
//           {/* <Button color="inherit">Login</Button> */}
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// }