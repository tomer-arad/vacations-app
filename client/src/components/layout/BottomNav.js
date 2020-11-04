import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FavoriteIcon from '@material-ui/icons/Favorite';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { 
    getVacationsData,
    getUserVacations
} from '../../actions/VacationActions';

const useStyles = makeStyles((theme) => ({
      root: {
        flexGrow: 1,
        backgroundColor: '#381a37',
    },
    lables: {
        color: '#d8d8d8'
    },
    search: {
        position: 'relative',
        height: '70%',
        borderRadius: theme.shape.borderRadius,
        marginTop:'10px',
        color: 'white',
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
      },
}));

function BottomNav({ getVacationsData, getUserVacations, following, currentUser, onChange }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const { is_admin } = currentUser;

  const handleFavorits = () => {
        getUserVacations(following);
    }

    const handleHome = () => {
        getVacationsData();
    }

  return (
    <Grid container>
        <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
            setValue(newValue);
        }}
        showLabels
        className={classes.root}
        >
            <BottomNavigationAction className={classes.lables} onClick={handleHome} component={Link} to={'/vacations'} label="Home" icon={<HomeOutlinedIcon />} />
            {is_admin === 0 && <BottomNavigationAction className={classes.lables} onClick={handleFavorits} label="Favorites" icon={<FavoriteIcon />} />}
            {is_admin > 0 && <BottomNavigationAction className={classes.lables} component={Link} to={'/stats'} label="Stats" icon={<EqualizerOutlinedIcon />} />}
            <Grid item className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="Search Vacation…"
                    classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={({target: {value}}) => onChange(value)}
                />
            </Grid>
        </BottomNavigation>
    </Grid>
  );
}

const mapStateToProps = (state) => {
    const { currentUser, following } = state.userReducer;
    return {
        currentUser: currentUser,
        following: following,
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        getVacationsData: () => dispatch(getVacationsData()),
        getUserVacations: (following) => dispatch(getUserVacations(following)),
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(BottomNav);