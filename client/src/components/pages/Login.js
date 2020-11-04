import React, { Component } from 'react';
import axios from 'axios';
import Background from '../../media/nav3.jpg'
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
    textField: {
        backgroundColor: '#fff4d0e7',
        borderRadius: 10
    },
    link: {
        color: 'white',
        fontWeight: 200,
        fontSize: 20,
        textShadow: '-1px -1px 0 #000, 0.5px -1px 0 #000, -0.5px 1px 0 #000, 0.5px 1px 0 #000',
    },
    title: {
        fontWeight: 400,
    },
    avatar: {
       background: '#86179cbe'
    },
    form: {
        width: '100%',
    },
    submit: {
        backgroundColor: '#86179cbe'
    },
};

export class Login extends Component {
    state = {
        username: '',
        password: '',
        error: false
    }

    onChange = (field, value) => {
        this.setState({[field]: value})
    }

    onClick = async () => {
        const { username, password } = this.state;
        try {
            await axios.post('/auth/login', { username, password });
            this.props.history.push('/vacations');
        } catch(err) {
            this.setState({ error: true });
            this.props.history.push('/');
            console.error(err);
        }
    }

    render() {
        const { error } = this.state;
        return (
            <Grid style={classes.root}>
                <div style={classes.paper}>
                    <Avatar style={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography style={classes.title} variant="h4">
                        Login
                    </Typography>
                    <div style={classes.form} >
                        <Grid item>
                        <TextField
                            style={classes.textField}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            autoComplete="username"
                            autoFocus
                            onChange={({target : {value}}) => this.onChange('username', value)}
                            onKeyDown={(e) => e.keyCode === 13 && this.onClick()}
                        />
                        </Grid>
                        <Grid item>
                        <TextField
                            style={classes.textField}
                            variant="outlined"
                            margin="normal"
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
                        <Grid item xs={12}>
                            { error &&  <Alert severity="error">Invalid Username/Password</Alert>}
                        </Grid>
                        <br/>
                        <Grid item>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={classes.submit}
                            onClick={() => this.onClick()}
                        >
                            Login!
                        </Button>
                        </Grid>
                        <br/>
                        <Grid container justify="flex-end">
                            <Link style={classes.link} to="/signup" variant="body2">
                                {"Don't have an account yet? Sign Up"}
                            </Link>
                        </Grid>
                    </div>
                </div>
            </Grid>
        )
    }
}

export default Login;