import { Alert, Button, CircularProgress, Container, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import login_img from "../../../images/login.png";

const Register = () => {
    const [loginData, setLoginData] = useState({})
    const { createUser, loading, user, authError } = useAuth()

    const history = useHistory()
    
    const handleFormOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }

    const handleLoginInputSubmit = (e) => {
        if (loginData.password !== loginData.password2) {
            alert("Your password did not match");
            return
        }
        
        createUser(loginData.name, loginData.email, loginData.password, history)
        e.preventDefault();
    };


    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item sx={{ mt: 15, textAlign: "center" }} xs={12} md={6}>
                    <Typography variant="body1" gutterBottom>
                        Login
                    </Typography>

                    {
                        !loading &&
                        <form onSubmit={handleLoginInputSubmit}>
                            <TextField
                                sx={{ width: "75%", m: 1 }}
                                id="standard-basic"
                                label="Your Name"
                                variant="standard"
                                name="name"
                                onBlur={handleFormOnBlur}
                            />
                            <TextField
                                sx={{ width: "75%", m: 1 }}
                                id="standard-basic"
                                label="Email"
                                variant="standard"
                                name="email"
                                type="email"
                                onBlur={handleFormOnBlur}
                            />
                            <TextField
                                sx={{ width: "75%", m: 1 }}
                                type="password"
                                id="standard-basic"
                                label="Your Password"
                                variant="standard"
                                name="password"
                                onBlur={handleFormOnBlur}
                            />
                            <TextField
                                sx={{ width: "75%", m: 1 }}
                                type="password"
                                id="standard-basic"
                                label="Conform Password"
                                variant="standard"
                                name="password2"
                                onBlur={handleFormOnBlur}
                            />
                            <Button
                                sx={{ width: "75%", m: 1 }}
                                type="submit"
                                variant="contained"
                            >
                                REGISTER
                            </Button>
                            <button style={{ border: "none", background: "none" }}>
                                Already Registered?{" "}
                                <Link to="/login">please login</Link>
                            </button>
                        </form>
                    }

                    {user?.email && <Alert severity="success">Successfully Registered</Alert>}
                    {authError && <Alert sx={{mt: 2}} severity="error">{authError}</Alert>}
                    {loading && <CircularProgress sx={{textAlign: 'center', mt: 15}} />}

                </Grid>
                <Grid item xs={12} md={6}>
                    <img style={{ width: "100%" }} src={login_img} alt="" />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Register;
