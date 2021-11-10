import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button, Container, Typography } from "@mui/material";
import './AppointmentBanner.css';

import doctor from '../../../images/doctor.png'

const AppointmentBanner = () => {
    return (
        <Box className="appointment-bg" style={{width: '100%'}} sx={{ flexGrow: 1 }}>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <img style={{width: 400, marginTop: '-110px' }} src={doctor} alt="" />
                    </Grid>
                    <Grid item xs={12} md={6} sx={{display: "flex", justifyContent: 'flex-start', alignItems: 'center'}}>
                        <Box>
                            <Typography variant="h6" style={{color: "#10CFEB"}} sx={{mb: 2}} >Appointment</Typography>
                            <Typography style={{color: "white"}} variant="h4">Make an Appointment Today</Typography>
                            <Typography style={{color: "white", fontSize: 16, fontWeight: 300}} variant="h6" sx={{my: 2}} >It is a long established fact that a reader will be distractedby the readable content of a page when looking at its</Typography>
                            <Button variant="contained" style={{backgroundColor: "#10CFEB"}} sx={{my: 2}} >Learn More</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default AppointmentBanner;
