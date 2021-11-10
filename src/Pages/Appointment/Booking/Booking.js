import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import Paper from "@mui/material/Paper";
import BookingModal from "../BookingModal/BookingModal";

const Booking = ({ booking, date, setBookingSuccess }) => {
    const { name, time, space } = booking;
    const [openBooking, setOpenBooking] = React.useState(false);
    const handleBookingOpen = () => setOpenBooking(true);
    const handleBookingClose = () => setOpenBooking(false);

    return (
        <>
            <Grid item xs={12} sm={6} md={4} sx={{py: 3, px: 1}} style={{textAlign: 'center'}}>
                <Paper elevation={3} sx={{ py: 4 }}>
                    <Typography sx={{ fontWeight: 600, fontSize: '28px', color: '#1CC7C1' }} variant="h6" gutterBottom component="div">{name}</Typography>
                    <Typography variant="h6" gutterBottom component="div" style={{ fontSize: '20px' }}>{time}</Typography>
                    <Typography variant="caption" display="block" gutterBottom sx={{py: 1}}>{space} SPACE AVAILABLE</Typography>
                    <Button onClick={handleBookingOpen} variant="contained" style={{backgroundColor: '#1CC7C1'}}>BOOK APPOINTMENT</Button>
                </Paper>
            </Grid>
            <BookingModal
                booking={booking}
                date={date}
                openBooking={openBooking}
                handleBookingClose={handleBookingClose}
                setBookingSuccess={setBookingSuccess}
            ></BookingModal>
        </>
    );
};

export default Booking;
