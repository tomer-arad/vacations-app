import React from 'react';
import VacationCard from './VacationCard';
import Grid from '@material-ui/core/Grid';

import { connect } from 'react-redux';


const VacationsWrapper = ({ vacations, currentUser, following } ) => {
    return (
        <div>
            <Grid container>
                {vacations.map((vacation, idx) => <Grid key={idx} className="home" item sm={12} md={6} lg={4} xl={3}>
                    <VacationCard key={idx} user={currentUser} following={following} vacation={vacation} />
                </Grid>)}
            </Grid>
        </div>
    )
}

const mapStateToProps = (state) => {
    const { currentUser, following } = state.userReducer;
    return {
        currentUser: currentUser,
        following: following,
    }
  }

export default connect(mapStateToProps, null)(VacationsWrapper);