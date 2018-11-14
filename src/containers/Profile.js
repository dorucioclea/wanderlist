import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ProfileModal from '../components/ProfileModal'
import { openProfileModal, closeProfileModal } from '../actions/modalActions'
import { putUserData } from '../actions/userActions'
import { fetchCountry } from '../actions/countryActions'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'

class Profile extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    let userCountryList = this.props.userCountries.map(country => country.id);
    this.props.putUserData(
      e.target.username.value,
      e.target.email.value,
      userCountryList,
      Number(e.target.country.value)
    );
    this.props.closeProfileModal();
  }

  render(){

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>
    }

    return(
      <div className="content">
        {errorMessage}
        <h1>{this.props.user.username}</h1>
        {this.props.user.home && <Avatar style={{width: 150, height: 150}} sizes='150px' src={this.props.user.home.flag} alt=""/>}
        <br/>
        <ProfileModal handleSubmit={this.handleSubmit} {...this.props} errorMessage={this.errorMessage}/>
        <Button variant="contained" color="primary" onClick={() => this.props.openProfileModal(this.props.user)}>Edit Profile</Button>
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.user.user,
    userCountries: state.user.user.countries,
    searchedCountry: state.country.country,
    showProfileModal: state.modal.showProfileModal,
    modalProfile: state.modal.modalProfile
  };
}

const mapDispatch = dispatch => {
  return {
    fetchCountry: (query) => dispatch(fetchCountry(query)),
    putUserData: (username, email, countries, home) => dispatch(putUserData(username, email, countries, home)),
    openProfileModal: (user) => dispatch(openProfileModal(user)),
    closeProfileModal: () => dispatch(closeProfileModal())
  };
}

export default connect(mapState, mapDispatch)(Profile);

Profile.propTypes = {
  user: PropTypes.object,
  userCountries: PropTypes.array,
  searchedCountry: PropTypes.array,
  showProfileModal: PropTypes.bool,
  modalProfile: PropTypes.object,
  fetchCountry: PropTypes.func,
  putUserData: PropTypes.func,
  openProfileModal: PropTypes.func,
  closeProfileModal: PropTypes.func
};
