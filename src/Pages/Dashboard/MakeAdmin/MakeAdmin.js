import { Alert, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";

const MakeAdmin = () => {
    const [email, setEmail] = useState('')
    const [success, setSuccess] = useState(false)
    const { token } = useAuth();

    const successTime = () => {
        setSuccess(false)
    }

    const handleOnBlur = e => {
        setEmail(e.target.value)
    }

    const handleAdminSubmit = (e) => {
        const user = { email };
        fetch('https://doctors-portal-95794.herokuapp.com/users/admin', {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    setSuccess(true);
                    setTimeout(successTime, 5000)
                }
            })
        e.target.email.value = ""
        e.preventDefault();
    };

    return (
        <div style={{textAlign: 'center'}}>
            <h2>Make an Admin</h2>
            <form onSubmit={handleAdminSubmit}>
                <TextField
                    sx={{width: '40%', my: 3}}
                    id="standard-basic"
                    label="Email"
                    name="email"
                    variant="standard"
                    type="email"
                    placeholder="Enter Email"
                    onBlur={handleOnBlur}
                />
                <br/>
                <Button sx={{width: '40%'}} style={{textTransform: 'capitalize'}} type="submit" variant="contained">Make Admin</Button>
            </form>
            {success && <Alert sx={{mt: 3}} severity="success">Made Admin Successfully</Alert>}
        </div>
    );
};

export default MakeAdmin;
