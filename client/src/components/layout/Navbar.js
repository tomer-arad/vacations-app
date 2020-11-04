import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Background from '../../media/nav4.jpg'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundImage: `url(${Background})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: '300px',
  },
  title: {
    fontSize: '60px',
    color: 'white',
    margin: 'auto',
    display: 'flex',
    marginTop: 50,
    fontFamily: 'Ubuntu',
    textShadow: '-1px 2px 0 #000, 2px 2px 0 #000',
  },
  button: {
    color: 'white',
    position: 'relative',
    top: 10,
    width: '90%',
    height: '90%',
    textAlign: 'center'
  },
  userIcon: {
    height: 40,
    width: 40,
  }
}));

function Navbar({ logout, currentUser }) {

  const { is_admin } = currentUser;
  
  const classes = useStyles();
  const userMenuRef = React.useRef(null);
  const [userMenuOpen, setRightOpen] = React.useState(false);

  const rightToggle = () => {
    setRightOpen((rightOpen) => !rightOpen);
  };

  const handleClose = (event) => {
    if (userMenuRef.current && userMenuRef.current.contains(event.target)) {
      setRightOpen(false)
    }
  };

  const rightOpen = React.useRef(userMenuOpen);

  React.useEffect(() => {
    if (rightOpen.current === true && userMenuOpen === false) {
      userMenuRef.current.focus();
    }
    rightOpen.current = userMenuOpen;
  }, [userMenuOpen]);


  const handleListKeyDown = (event) => {
    if (event.target.name === 'accountMenu') {
      event.preventDefault();
      setRightOpen(false);
    }
  }

  const handleFirstName = (user) => {
    const { first_name } = user;
    if(first_name){
      return first_name.charAt(0).toUpperCase() + first_name.slice(1)
    }
  }

  const handleLogout = async () => {
    try {
        await axios.get('/auth/logout');
        logout()
    } catch(err) {
        console.log(err)
    }
  }
  
  return (
    <Grid container className={classes.root} position="static">

      <Grid className={classes.title} item xs={12} sm={12} md={11} lg={11}>
        <MenuItem className={classes.title} component={Link} to={'/vacations'}>
          {is_admin > 0 ? `Good to see you Admin!` : `Going Somwhere ${handleFirstName(currentUser)}?`}
        </MenuItem>
      </Grid>

      <Grid className={classes.button} item xs={12} sm={12} md={1} lg={1}>
        <IconButton
          aria-label="account of current user"
          ref={userMenuRef}
          aria-controls={userMenuOpen ? 'account-menu' : undefined}
          aria-haspopup="true"
          onClick={rightToggle}
          color='inherit'
        >
          <AccountCircle className={classes.userIcon} />
        </IconButton>

        <Popper open={userMenuOpen} anchorEl={userMenuRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>

                <MenuList name='accountMenu' autoFocusItem={userMenuOpen} id="account-menu" onKeyDown={handleListKeyDown}>
                  <MenuItem component={Link} to={'/account'} onClick={handleClose}>Account</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>

              </ClickAwayListener>
            </Paper>
          </Grow>
          )}
        </Popper>

      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  const { currentUser } = state.userReducer;
  return {
      currentUser: currentUser,
  }
}

export default connect(mapStateToProps, null)(Navbar);