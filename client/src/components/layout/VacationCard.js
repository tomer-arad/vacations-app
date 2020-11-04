import React, { Fragment } from 'react';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditVacation from './EditVacation';

import { connect } from 'react-redux';
import { 
  deleteVacation,
  likeVacation
} from '../../actions/VacationActions';
import {
  getFollowingData,
} from '../../actions/UserActions';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    textAlign: 'center',
    margin: '15px',
  },
  date: {
    textAlign: 'center', 
    fontFamily: 'Ubuntu',
    fontWeight: 500
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  actions: {
    fontSize: 'large',
    width: '100%',
    textAlign: 'center',
    color: 'rgb(0, 110, 48)',
    fontWeight: 'bold',
  },
  expand: {
    position: 'relative',
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  about: {
    textAlign:'left',
  }
}));

const stringWithCap = (str) => str.charAt(0).toUpperCase() + str.slice(1);

function VacationCard({ vacation, following, user, deleteVacation, likeVacation, getFollowingData }) {

  const { id, country, likes, destination, description, starts, ends, price, image } = vacation;
  const { is_admin } = user;
  const fromDate = new Date(starts).toDateString();
  const toDate = new Date(ends).toDateString();
  const isFollowing = _.includes(following, id);

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const onLike = async () => {
    await likeVacation(vacation, user, following);
    return getFollowingData(user.id);
  }

  return (
      <div className={classes.root}>
        <Card>

          <CardHeader
              title={stringWithCap(destination)}
              subheader={stringWithCap(country)}
              style={{fontFamily: 'Ubuntu'}}
          />
          <CardContent>
              <Typography className={classes.date} variant="body1" color="textPrimary" component="p">
                  {fromDate} - {toDate}
              </Typography>
          </CardContent>
          <CardMedia
              className={classes.media}
              image={image}
              title="image"
          />

          <CardActions>
            {is_admin === 0 && <Fragment>
              <IconButton onClick={() => onLike()} aria-label="add to favorites">
                {isFollowing ? <FavoriteIcon color='error' /> : <FavoriteIcon color='disabled' />} 
              </IconButton>
              {likes}
              <CardContent className={classes.actions}>
                  Only {price}$
              </CardContent>
            </Fragment>}

            {is_admin > 0 && <Fragment>
              <IconButton id={id} onClick={() => deleteVacation(id)} aria-label="delete vacation">
                <DeleteIcon /> 
              </IconButton>
              <CardContent className={classes.actions}>
                <EditVacation edit="true" data={vacation} />
              </CardContent>
            </Fragment>}

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

          <Collapse className={classes.about} in={expanded} timeout="auto" unmountOnExit>
            <CardContent >
                <Typography variant="body1" color="textPrimary" component="p">
                  <b>About:</b> {description}
                </Typography>
            </CardContent>
          </Collapse>
          
        </Card>
      </div>
    );
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteVacation: (id) => dispatch(deleteVacation(id)),
    likeVacation: (vacation, currentUser, following) => dispatch(likeVacation(vacation, currentUser, following)),
    getFollowingData: (id) => dispatch(getFollowingData(id)),
    }
  }

export default connect(null, mapDispatchToProps)(VacationCard);