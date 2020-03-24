import React from 'react';
import { Redirect } from 'react-router-dom';
import AdminPanel from '../AdminPanel/AdminPanel';
import LeftRightSide from '../LeftRightSide/LeftRightSide';
import { gdAuth } from '../../redux/commonReducer';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { getAuth } from '../../redux/selector';

class MainContainer extends React.Component {

  componentDidMount() {
    this.props.gdAuth();
  }




  render() {
    //console.log(this.props)
    return <>
      {
        this.props.auth === true
          ?
          <div className="row">
            <div className="col-12">    
              <AdminPanel />
            </div>
            <hr />
            <div className="col-12">
              <LeftRightSide />
            </div>            
          </div >
          :
          <Redirect to="/login" />
      }


    </>
  }

}


let mapStateToProps = (state) => {
  return {
    auth: getAuth(state),
  }
}

export default compose(
  connect(mapStateToProps, {
    gdAuth,
  }),
)(MainContainer);




