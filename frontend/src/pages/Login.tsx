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


const Login = (props: Props) => {
    const classes = useStyles();
    const [username, setUsername] = useState('user');
    const [password, setPassword] = useState('test_user');
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

    const login = async () => {
        setError('');
        if (!AuthLogic.validateLoginParams(username, password)) {
            setError('Please enter username and password.');
            return;
        }
        setisLoading(true);
        try {
            const token = await AuthLogic.login(username, password);
            setUsernameInStore(username);
            setToken(token);
            props.history.push('/');
        }
        catch (err) {
            if (err.response?.status === 401) {
                setError('Username or password is incorrect.');
            }
            else {
                setError('Login failed');
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
                        Login
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
                        type="password"
                        label="Password*"
                        variant="filled"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={passwordChangeHandler}
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
                                    <Button variant="contained" size="large" style={{ marginRight: "15px" }} onClick={login}>Login</Button>
                                    <Link to="/signup">
                                        <Button variant="contained" size="large">Sign Up</Button>
                                    </Link>
                                </>
                        }
                    </Box>
                </CardActions>
            </Card>
        </Box>
    )
}

export default Login
