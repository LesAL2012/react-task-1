import React from 'react';
import { gdLogOut } from '../../redux/commonReducer';

import {
  getLanguage,
  getLanguageButtonLogOut,
  getAuth,
} from '../../redux/selector';

import { compose } from 'redux';
import { connect } from 'react-redux';

import { Button } from 'react-bootstrap';

class ButtonLogOut extends React.Component {

  render() {    
    return <>
      {
        this.props.auth === true
        &&
        <div className="form-inline my-2 my-lg-0">
          <Button
            onClick={this.props.gdLogOut}
            variant="outline-light" className="my-2 my-sm-0" type="submit"
          >
            {JSON.parse(localStorage.getItem('reactUserLogin')).name}
            &nbsp;-&nbsp;
            {this.props.logOutBtn[this.props.lang].logOutBtn}
          </Button>
        </div>
      }
    </>
  }
}

let mapStateToProps = (state) => {
  return {
    auth: getAuth(state),
    lang: getLanguage(state),
    logOutBtn: getLanguageButtonLogOut(state),
  }
}

export default compose(
  connect(mapStateToProps, {
    gdLogOut,
  }),
)(ButtonLogOut);