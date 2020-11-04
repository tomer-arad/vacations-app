import React, { Component } from 'react';
import axios from 'axios';
import Background from '../../media/nav2.jpg';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography'; 
import Alert from '@material-ui/lab/Alert';
import { Link } from 'react-router-dom';

const classes = {
    root: {
        borderRadius: 20,
        width: '50%',
        margin: 'auto',
        padding: 20,
        backgroundImage: `url(${Background})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        height: '100%',
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '50%',
        margin: 'auto',
        marginTop: '20px',
    },
    title: {
        fontWeight: 300,
        color: 'white',
        textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000',
    },
    textField: {
        backgroundColor: '#d0f9ffe7',
        borderRadius: 10
    },
    avatar: {
      background: '#86179cbe'
    },
    link: {
        color: 'black',
        fontWeight: 200,
        fontSize: 20,
        textShadow: '-1px -0.5px 0 #ffffff, 0.5px -1px 0 #ffffff, -0.5px 1px 0 #ffffff, 0.5px 1px 0 #ffffff',
    },
    form: {
      width: '100%'
    },
    submit: {
      backgroundColor: '#86179cbe'
    },
  };


export class SignUp extends Component {
    state = {
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        confirm: '',
        errorType: null
    }

    onChange = (field, value) => {
        this.setState({[field]: value})
    }

    onClick = async () => {
        const { firstName, lastName, username, password, confirm } = this.state;
        try {
            await axios.post('/auth/signup', { firstName, lastName, username, password }).catch(err => {
                throw err;
            })
            if(password && username && password === confirm ) {
                this.props.history.push('/login');
            }
        } catch(err) {
            console.log(err.response.data)
            this.setState({ errorType: err.response.data })
        }
    }

    render() {
        const { confirm, password, errorType } = this.state;
        return (
            <Grid style={classes.root}>
                <div style={classes.paper}>
                    <Avatar style={classes.avatar}>
                    <LockOutlinedIcon />
                    </Avatar>
                    <Typography style={classes.title} variant="h3">
                        Sign up
                    </Typography>
                    <br/>
                    <div style={classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {errorType === 'String Problem' && <Alert severity="error">Missing names (letters only)</Alert>}
                            {errorType === 'Username Problem' && <Alert severity="error">Invalid Username (at least 1 letter)</Alert>}
                            {errorType === 'Password Problem' && <Alert severity="error">Invalid Password (minimum: 4 Charts, 1 Uppercase, 1 Lowercase, 1 Digit)</Alert>}
                        </Grid>
                        <Grid item md={12} lg={6}>
                        <TextField
                            style={classes.textField}
                            autoComplete="fname"
                            variant="outlined"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            autoFocus
                            onChange={({target: {value}}) => this.onChange('firstName', value)}
                            onKeyDown={(e) => e.keyCode === 13 && this.onClick()}
                        />
                        </Grid>
                        <Grid item md={12} lg={6}>
                        <TextField
                            style={classes.textField}
                            variant="outlined"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            autoComplete="lname"
                            onChange={({target: {value}}) => this.onChange('lastName', value)}
                            onKeyDown={(e) => e.keyCode === 13 && this.onClick()}
                        />
                        </Grid>
                        <Grid item md={12}>
                        <TextField
                            style={classes.textField}
                            variant="outlined"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            autoComplete="username"
                            onChange={({target: {value}}) => this.onChange('username', value)}
                            onKeyDown={(e) => e.keyCode === 13 && this.onClick()}
                        />
                        </Grid>
                        <Grid item md={12} lg={6}>
                        <TextField
                            style={classes.textField}
                            variant="outlined"
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={({target: {value}}) => this.onChange('password', value)}
                            onKeyDown={(e) => e.keyCode === 13 && this.onClick()}
                        />
                        </Grid>
                        <Grid item md={12} lg={6}>
                        <TextField
                            style={classes.textField}
                            variant="outlined"
                            required
                            fullWidth
                            label="Confirm Password"
                            type="password"
                            id="confirm"
                            autoComplete="current-password"
                            onChange={({target: {value}}) => this.onChange('confirm', value)}
                            onKeyDown={(e) => e.keyCode === 13 && this.onClick()}
                        />
                        </Grid>
                        <Grid item xs={12}>
                            { confirm && confirm !== password &&  <Alert severity="error">Passwords Don't Match</Alert>}
                            { confirm && confirm === password && <Alert severity="success">Passwords Match!</Alert>}
                        </Grid>
                    </Grid>
                    <br/>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={classes.submit}
                        onClick={() => this.onClick()}
                    >
                        Sign Up
                    </Button>
                    <br/><br/>
                    <Grid container justify="flex-end">
                        <Link style={classes.link} to="/login" variant="body2">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                    </div>
                </div>
            </Grid>
        )
    }
}

export default SignUp;
