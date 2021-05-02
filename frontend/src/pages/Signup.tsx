import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Card, Typography, Button, CardContent, CardActions, Box, Divider, TextField, CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

import useAuthStore, { setTokenSelector, setUsernameSelector, resetAuthSelector } from '../stores/AuthStore';
import AuthLogic from '../logic/AuthLogic';

interface Props extends RouteComponentProps { }

const useStyles = makeStyles({
    root: {
        maxWidth: '600px',
        width: '90vw',
        textAlign: 'center'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    bottomMargin: {
        marginBottom: 12,
    },
});

const Signup = (props: Props) => {
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setisLoading] = useState(false);
    const [error, setError] = useState('');
    const setUsernameInStore = useAuthStore(setUsernameSelector);
    const setToken = useAuthStore(setTokenSelector);
    const resetAuth = useAuthStore(resetAuthSelector);

    const usernameChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setUsername(event.currentTarget.value);
    }

    const passwordChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setPassword(event.currentTarget.value);
    }

    const password2ChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setPassword2(event.currentTarget.value);
    }

    const emailChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setEmail(event.currentTarget.value);
    }

    const register = async () => {
        setError('');
        if (!AuthLogic.validateSignupParams(username, password, password2)) {
            setError('Please enter username, password and confirm password.');
            return;
        }
        if (password != password2) {
            setError('Confirm password did not match.');
            return;
        }
        setisLoading(true);
        try {
            const token = await AuthLogic.signup(username, password, password2, email);
            setUsernameInStore(username);
            setToken(token);
            props.history.push('/');
        }
        catch (err) {
            if (err.response?.data) {
                const resp = err.response.data;
                let errMsg = '';
                for (const key of Object.keys(resp)) {
                    errMsg += resp[key].join(' ') + ' ';
                }
                setError(errMsg);
            }
            else if (err.message) {
                setError(err.message);
            }
            else {
                setError('Signup failed');
            }
        }
        finally {
            setisLoading(false);
        }
    }

    useEffect(() => {
        resetAuth();
    }, []);

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <Card className={classes.root}>
                <CardContent>
                    <Typography variant="h3" component="h1" className={classes.bottomMargin}>
                        Sign Up
                    </Typography>
                    <Divider />
                    <TextField
                        type="text"
                        label="Username*"
                        variant="filled"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={usernameChangeHandler}
                        disabled={isLoading}
                    />
                    <br />
                    <TextField
                        type="email"
                        label="Email Address"
                        variant="filled"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={emailChangeHandler}
                        disabled={isLoading}
                    />
                    <br />
                    <TextField
                        type="password"
                        label="Password*"
                        variant="filled"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={passwordChangeHandler}
                        disabled={isLoading}
                    />
                    <br />
                    <TextField
                        type="password"
                        label="Confirm Password*"
                        variant="filled"
                        fullWidth
                        margin="normal"
                        value={password2}
                        onChange={password2ChangeHandler}
                        disabled={isLoading}
                    />

                    {
                        error ? <Alert severity="error">{error}</Alert> : null
                    }
                </CardContent>
                <CardActions>
                    <Box className={classes.bottomMargin} display="flex" justifyContent="center" alignItems="center" width="100%" >
                        {
                            isLoading ? <CircularProgress /> :
                                <>
                                    <Button variant="contained" size="large" style={{ marginRight: "15px" }} onClick={register}>Sign up</Button>
                                </>
                        }
                    </Box>
                </CardActions>
            </Card>
        </Box>
    )
}

export default Signup
