import { Alert, Button, CircularProgress, Container, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import login_img from "../../../images/login.png";

const Login = () => {
    const [loginData, setLoginData] = useState({})
    const { user, loginUser, loading, authError, googleSignIn } = useAuth();

    const location = useLocation();
    const history = useHistory()
    

    // get login form data
    const handleFormOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }

    // login form
    const handleLoginInputSubmit = (e) => {
        loginUser(loginData.email, loginData.password, location, history);
        e.preventDefault();
    };

    // google popup sign
    const handleGoogleSignIn = () => {
        googleSignIn(location, history);
    }


    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item sx={{ mt: 15, textAlign: 'center'}} xs={12} md={6}>
                    <Typography variant="body1" gutterBottom>
                        Login
                    </Typography>
                    <form onSubmit={handleLoginInputSubmit}>
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            label="Standard"
                            variant="standard"
                            name="email"
                            type="email"
                            onBlur={handleFormOnBlur}
                        />
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            type="password"
                            id="standard-basic"
                            label="Your Password"
                            variant="standard"
                            name="password"
                            onBlur={handleFormOnBlur}
                        />
                        <Button sx={{ width: '75%', m: 1 }} type="submit" variant="contained">LOGIN</Button>
                        <button style={{border:'none', background: 'none'}}>New User? <Link to="/register">please register</Link></button>
                    </form>
                    
                    <hr style={{marginTop: '40px', marginBottom: '15px'}} />
                    <Button onClick={handleGoogleSignIn} style={{textTransform: 'capitalize'}} variant="contained">Google SignIn</Button>
                    
                    {user?.email && <Alert sx={{mt: 3}} severity="success">Login Successfully</Alert>}
                    {authError && <Alert severity="error">{authError}</Alert>}
                        <br />
                    {loading && <CircularProgress sx={{textAlign: 'center', mt: 10}} />}
                    
                </Grid>
                <Grid item xs={12} md={6}>
                    <img style={{ width: "100%" }} src={login_img} alt=""/>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;
