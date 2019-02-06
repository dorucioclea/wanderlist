import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

import { openCopyLinkModal, closeCopyLinkModal } from '../actions/modalActions'
import { fetchTripReports, fetchNextTripReports } from '../actions/tripReportActions'
import { openCountryModal, closeCountryModal } from '../actions/modalActions'
import { openImageModal, closeImageModal } from '../actions/modalActions'
import { openNotAuthModal, closeNotAuthModal } from '../actions/modalActions'
import { removeError } from '../actions/errorActions'
import { toggleFavorite } from '../actions/favoriteActions'

import CountryModal from '../components/CountryModal'
import CopyLinkModal from '../components/CopyLinkModal'
import ImageModal from '../components/ImageModal'
import Filter from '../components/Filter'
import NotAuthModal from '../components/NotAuthModal'
import TripReportTruncated from '../components/TripReportTruncated'

import { DotLoader } from 'react-spinners'

export class Feed extends Component {

  // Returns True if the user has scrolled past the bottom.
  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  // Adds event listener that checks for scrolling.
  componentDidMount() {
    document.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    this.props.removeError();
    document.removeEventListener('scroll', this.onScroll);
  }

  /*
  If the user has scrolled to the bottom, AND there is next URL to load more
  Trip Reports, AND the next Trip Reports are not already being fetched, the
  next Trip Reports will be fetched i.e. infinite scrolling.
  */
  onScroll = () => {
    const element = document.getElementById('scroll');
    if (this.isBottom(element) && this.props.next && !this.props.fetchingNext) {
      this.props.fetchNextTripReports(this.props.next);
    }
  };

  handleClick = (e) => {
    e.preventDefault();
    this.props.toggleFavorite(e.currentTarget.id);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.fetchTripReports(`${process.env.REACT_APP_API_URL}/api/v1/reports/?search=${e.target[0].value}`);
  }

  handleNewestClick = () => {
    this.props.fetchTripReports(`${process.env.REACT_APP_API_URL}/api/v1/reports/?ordering=-pk`)
  }

  handleTopClick = () => {
    this.props.fetchTripReports(`${process.env.REACT_APP_API_URL}/api/v1/reports/`)
  }

  render(){

    let listTripReports = null;
    if (this.props.tripReports){
      listTripReports = this.props.tripReports.map(tripReport =>(
        <div key={tripReport.id} style={{ marginBottom: 20 }}>
          <TripReportTruncated handleClick={this.handleClick} {...tripReport} {...this.props} openCountryModal={this.props.openCountryModal}/>
        </div>
      ));
    }

    return(
      <div id='scroll' className="content" style={{ marginTop: 0 }} >
        <CopyLinkModal {...this.props} />
        <ImageModal {...this.props} />
        <NotAuthModal {...this.props} />
        {this.props.fetched && <CountryModal {...this.props} />}
        <Filter handleSubmit={this.handleSubmit} handleNewestClick={this.handleNewestClick} handleTopClick={this.handleTopClick}/>
        {this.props.fetching && <div><DotLoader size={50} color={'#2196f3'} className="content" /><br/></div>}
        {this.props.fetched && <div>{listTripReports}</div>}
        <div style={{ height: 15 }}/>
        {this.props.fetchingNext && <DotLoader size={50} color={'#2196f3'} className="content" />}
      </div>
    );
  }
}

const mapState = state => {
  return {
    pk: state.user.user.pk,
    authenticated: state.auth.authenticated,
    fetched: state.tripReport.fetched,
    fetching: state.tripReport.fetching,
    next: state.tripReport.tripReports.next,
    fetchingNext: state.tripReport.fetchingNext,
    tripReports: state.tripReport.tripReports.results,
    showCountryModal: state.modal.showCountryModal,
    modalCountry: state.modal.modalCountry,
    showNotAuthModal: state.modal.showNotAuthModal,
    showCopyLinkModal: state.modal.showCopyLinkModal,
    modalLink: state.modal.modalLink,
    showImageModal: state.modal.showImageModal,
    modalImage: state.modal.modalImage,
  };
}

const mapDispatch = dispatch => {
  return bindActionCreators({
    openCountryModal,
    closeCountryModal,
    removeError,
    fetchNextTripReports,
    fetchTripReports,
    toggleFavorite,
    openNotAuthModal,
    closeNotAuthModal,
    openCopyLinkModal,
    closeCopyLinkModal,
    openImageModal,
    closeImageModal,
  }, dispatch);
}

export default connect(mapState, mapDispatch)(Feed);

Feed.propTypes = {
  pk: PropTypes.number,
  authenticated: PropTypes.bool,
  fetched: PropTypes.bool,
  fetching: PropTypes.bool,
  next: PropTypes.string,
  tripReports: PropTypes.array,
  showCountryModal: PropTypes.bool,
  modalCountry: PropTypes.object,
  showNotAuthModal: PropTypes.bool,
  showCopyLinkModal: PropTypes.bool,
  modalLink: PropTypes.string,
  showImageModal: PropTypes.bool,
  modalImage: PropTypes.string,

  openCountryModal: PropTypes.func,
  closeCountryModal: PropTypes.func,
  removeError: PropTypes.func,
  fetchNextTripReports: PropTypes.func,
  fetchTripReports: PropTypes.func,
  toggleFavorite: PropTypes.func,
  openNotAuthModal: PropTypes.func,
  closeNotAuthModal: PropTypes.func,
  openCopyLinkModal: PropTypes.func,
  closeCopyLinkModal: PropTypes.func,
  openImageModal: PropTypes.func,
  closeImageModal: PropTypes.func,
};
