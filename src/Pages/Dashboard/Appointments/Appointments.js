import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import useAuth from "../../../hooks/useAuth";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Appointments = ({ date }) => {
    const { user, token } = useAuth();
    const [appointments, setAppointments] = useState([]);
    useEffect(() => {
        fetch(`https://doctors-portal-95794.herokuapp.com/appointments?email=${user?.email}&date=${date.toLocaleDateString()}`, {
            headers: {
                'authorization': `Bearer ${token}`,
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setAppointments(data)
                console.log("My Email ----------> ", user?.email, date.toLocaleDateString());
            });
    }, [user.email, date, token]);
    


    return (
        <div>
            {!user.email ? (
                <div style={{ textAlign: "center" }}>
                    <CircularProgress sx={{ mt: 15 }} />
                </div>
            ) : (
                <div>
                        <h3 style={{textAlign: 'center'}}>Appointment: {appointments.length}</h3>
                    <TableContainer component={Paper}>
                        <Table sx={{}} aria-label="appointments table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">Time</TableCell>
                                    <TableCell align="right">Service</TableCell>
                                    <TableCell align="right">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {appointments.map((row) => (
                                    <TableRow
                                        key={row._id}
                                        sx={{
                                            "&:last-child td, &:last-child th":
                                                {
                                                    border: 0,
                                                },
                                        }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.patientName}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.time}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.serviceName}
                                        </TableCell>
                                        <TableCell align="right"></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}
        </div>
    );
};

export default Appointments;
