import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from '@mui/material/TextField';
import useAuth from "../../../hooks/useAuth";


const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const BookingModal = ({openBooking, handleBookingClose, booking, date, setBookingSuccess}) => {
    const { name, time } = booking;
    const { user } = useAuth()

    const initialInfo = {
        patientName: user.displayName,
        patientPhone: "",
        patientEmail: user.email,
    }
    const [bookingInfo, setBookingInfo] = useState(initialInfo);
    
    const handleFormOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newInfo = { ...bookingInfo };
        newInfo[field] = value;
        setBookingInfo(newInfo);
        e.preventDefault()
    }


    const handleBookingSubmit = e => {
        // collect data
        const appointment = {
            ...bookingInfo,
            time,
            serviceName: name,
            date: date.toLocaleDateString(),
        }
        // send to the server
        fetch('https://doctors-portal-95794.herokuapp.com/appointments', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(appointment)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    setBookingSuccess(true)
                }
            });

        handleBookingClose()
        e.preventDefault()
    }

    return (
        <div>
            <Modal
                open={openBooking}
                onClose={handleBookingClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" >{name}</Typography>
                    <form onSubmit={handleBookingSubmit}>
                        <TextField
                            disabled
                            sx={{ width: '90%', m: 1}}
                            id="outlined-size-small"
                            defaultValue={time}
                            size="small"
                        />
                        <TextField
                            name="patientName"
                            sx={{ width: '90%', m: 1}}
                            id="outlined-size-small"
                            defaultValue={user.displayName}
                            size="small"
                            type="text"
                            placeholder="Your Name"
                            onBlur={handleFormOnBlur}
                        />
                        <TextField
                            name="patientPhone"
                            sx={{ width: '90%', m: 1}}
                            id="outlined-size-small"
                            size="small"
                            type='tel'
                            placeholder="Phone Number"
                            onBlur={handleFormOnBlur}
                        />
                        <TextField
                            name='patientEmail'
                            sx={{ width: '90%', m: 1}}
                            id="outlined-size-small"
                            defaultValue={user.email}
                            size="small"
                            type="email"
                            placeholder="Your Email"
                            onBlur={handleFormOnBlur}
                        />
                        <TextField
                            disabled
                            sx={{ width: '90%', m: 1}}
                            id="outlined-size-small"
                            defaultValue={date.toDateString()}
                            size="small"
                        />
                        <Button type="submit" variant="contained" style={{backgroundColor: '#1CC7C1'}}>SEND</Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default BookingModal;
