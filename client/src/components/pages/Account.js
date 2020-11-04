import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { connect } from 'react-redux';
import { 
  deleteVacation,
  likeVacation
} from '../../actions/VacationActions';
import {
  getFollowingData,
} from '../../actions/UserActions';


const useStyles = makeStyles((theme) => ({
    account: {
        display: 'block',
        width: '600px',
        margin: 'auto',
        marginTop: '20px',
    },
    media: {
        margin: 'auto',
        textAlign: 'center',
        paddingTop: '50%',
        borderRadius: '50%',
        width: '50%',
    },
    expand: {
        position: 'relative',
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
        }),
    },
    title: {
        fontWeight: 300
    },
    subtitle: {
        fontWeight: 200
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    about: {
        fontSize: 30,
        fontWeight: 300,
    }
}));

const Account = ({ currentUser }) => {

    const { first_name, last_name, avatar } = currentUser;

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <div>
            <Card className={classes.account}>

                <CardContent>
                    <Typography className={classes.title} variant="h5" color="textPrimary" component="p">
                        <b>First Name:</b> {first_name}
                    </Typography>
                    <Typography className={classes.subtitle} variant="h5" color="textPrimary" component="p">
                    <b>Last Name:</b> {last_name}
                    </Typography>
                </CardContent>

                <CardMedia
                    className={classes.media}
                    image={avatar}
                    title="image"
                />
            <CardActions>
                <IconButton
                    className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon/>
                </IconButton>

            </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent className={classes.about}>
                        <Typography variant="body1" component="p">
                        <b>About:</b> Write Somthing...
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </div>
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
    deleteVacation: (id) => dispatch(deleteVacation(id)),
    likeVacation: (vacation, currentUser, following) => dispatch(likeVacation(vacation, currentUser, following)),
    getFollowingData: (id) => dispatch(getFollowingData(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);