import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button, Container, Typography } from "@mui/material";
import './Banner.css';

import chair from "../../../images/chair.png";

const verticalCenter = {
    display: 'flex',
    alignItems: 'center',
    height: '400px',
}

const Banner = () => {
    return (
        <Container className="banner_bg" sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} style={{...verticalCenter}} >
                    <Box>
                        <Typography style={{fontWeight: 600}} variant="h4">Your New Smile <br/> Starts Here</Typography>
                        <Typography variant="h6" sx={{ my: 2, fontSize: 16, color: 'gray', fontWeight: 300}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil asperiores velit illum enim incidunt doloremque vitae impedit at accusantium tenetur.</Typography>
                        <Button variant="contained" style={{backgroundColor: "#10CFEB"}} sx={{my: 2}} >Get Appointment</Button>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} style={verticalCenter}>
                    <img style={{ width: "400px" }} src={chair} alt=""/>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Banner;
