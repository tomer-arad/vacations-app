import React, { Component } from 'react';
import _ from 'lodash';
import Navbar from './layout/Navbar';
import BottomNav from './layout/BottomNav'
import Account from './pages/Account';
import EditVacation from './layout/EditVacation'
import VacationsWrapper from './layout/VacationsWrapper';
import Stats from './pages/Stats';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { connect } from 'react-redux';
import { 
  getUserData,
  getFollowingData,
} from '../actions/UserActions';
import { 
  getVacationsData,
  sortVacations,
} from '../actions/VacationActions';

class MainWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    }
  }

  logout = () => {
    this.props.history.push('/login');
  }

  searchVacation = (value) => this.setState({ searchTerm: value })

  showSortedVacations = (vacations, following) => {
    this.props.sortVacations(vacations, following);
    this.setState({ vacations: this.props.sortedVacations })
  }

  showFilteredVacations = ({ country, destination }) => {
    const { searchTerm } = this.state;
    return destination.toLowerCase().startsWith(searchTerm.toLocaleLowerCase()) || country.toLowerCase().startsWith(searchTerm.toLocaleLowerCase())
  };

  async componentDidMount() {
    await this.props.getUserData();
    this.props.getVacationsData();
    const { currentUser, vacations, following } = this.props;
    this.props.getFollowingData(currentUser.id);
    try {
        const { is_admin, first_name } = currentUser;
        if(!first_name){
          this.logout();
        }
        if(is_admin === 0){
          this.showSortedVacations(vacations, following);
        }
    } catch (err) {
        console.error(err);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { vacations, following, currentUser } = this.props;
    if(prevProps.following !== following && currentUser.is_admin === 0){
      this.showSortedVacations(vacations, following);
    }
  }

  renderVacations(props) {
    const { vacations } = this.props;
    let filteredVacations = vacations.filter(this.showFilteredVacations);

    return <VacationsWrapper {...props} vacations={filteredVacations.length > 0 ? filteredVacations : vacations} />
  }

  render(){

    const { vacations, currentUser } = this.props;
    const addVacation = _.mapValues(_.omit(vacations[0], 'id', 'likes'), () => ''); 
    return (
      <Router>

          <Navbar onChange={this.searchVacation} logout={this.logout} />

          <BottomNav onChange={this.searchVacation} /> <br />

          <div className='home'>

            <Switch>
              <Route path='/account' component={Account} />
              <Route path='/vacations' render={(props) => (
                <div>
                  { vacations.length > 0 && this.renderVacations(props) }
                </div>
              )} />
              <Route path='/stats' render={(props) => (
                <Stats {...props} data={vacations} />
              )} />
            </Switch>

            {currentUser.is_admin > 0 && <EditVacation {...this.props} add="true" data={addVacation} />}
          </div>

      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  const { currentUser, following } = state.userReducer;
  const { vacations, sortedVacations } = state.vacationReducer;
  return {
      vacations: vacations,
      currentUser: currentUser,
      following: following,
      sortedVacations: sortedVacations,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      getVacationsData: () => dispatch(getVacationsData()),
      getUserData: () => dispatch(getUserData()),
      getFollowingData: id => dispatch(getFollowingData(id)),
      sortVacations: (vacations, following) => dispatch(sortVacations(vacations, following)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainWrapper);