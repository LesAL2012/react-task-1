import React from 'react';
import css from './App.module.css';
import HeaderContainer from '../Header/HeaderContainer';
import FooterContainer from '../Footer/FooterContainer';
import ContentContainer from '../Content/ContentConteiner';
import { Navbar } from 'react-bootstrap';


import ButtonLogOut from '../ButtonLogOut/ButtonLogOut';
import ButtonLanguage from '../ButtonLanguage/ButtonLanguage';

import { compose } from 'redux';
import { connect } from 'react-redux';


function App(props) {
  return (

    <div className={css.AppWrapper} tyle={{ maxWidth: '1170px', margin: '0 auto' }}  >

      <HeaderContainer />

      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <div className='container text-white' >
        
          <ButtonLanguage />

          <ButtonLogOut />
          
        </div >
      </Navbar>

      <div className={css.content} >
        <ContentContainer />
      </div >

      <div className={css.footer} >
        <FooterContainer />
      </div >

    </div >

  );
}

let mapStateToProps = (state) => {
  return {
    
  }
}

export default compose(
  connect(mapStateToProps, {
  }),
)(App);
