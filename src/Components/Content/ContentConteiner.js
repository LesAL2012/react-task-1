import React, { Suspense, lazy } from 'react';
import { Switch, Route } from "react-router-dom";
import css from './Content.module.css';
import MainContainer from '../Main/MainConteiner';

const LogIn = lazy(() => import('../LogIn/LogIn'));

const ContentContainer = (props) => {

  return (
    <div className="container" >
      <div className={css.content} >
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" render={() => <MainContainer />} />
            <Route exact path="/login" render={() => <LogIn />} />
          </Switch>
        </Suspense>
      </div >
    </div >
  )
}

export default ContentContainer;
