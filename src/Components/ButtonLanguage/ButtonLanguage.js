import React from 'react';
import { gdLanguage } from '../../redux/commonReducer';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

import {
    getLanguage,
    getLanguageButtonSelectLanguage,   
} from '../../redux/selector';

class ButtonLanguage extends React.Component {

    setUserLanguage = (lang) => {
        this.props.gdLanguage(lang)
    }

    render() {
        return <>
            <ButtonToolbar className="form-inline my-2 my-lg-0">
                <ToggleButtonGroup type="radio" name="options" defaultValue='En'>
                    <ToggleButton value='En' variant="outline-light" className="my-2 my-sm-0"
                        style={{width:'70px'}}
                        onClick={() => this.setUserLanguage('en')}
                    >
                        {this.props.langBtn[this.props.lang].enBtn}
                    </ToggleButton>
                    <ToggleButton value='RU' variant="outline-light" className="my-2 my-sm-0"
                        style={{width:'70px'}}
                        onClick={() => this.setUserLanguage('ru')}
                    >
                        {this.props.langBtn[this.props.lang].ruBtn}
                    </ToggleButton>
                </ToggleButtonGroup>
            </ButtonToolbar>
        </>
    }
}

let mapStateToProps = (state) => {
    return {        
        lang: getLanguage(state),
        langBtn: getLanguageButtonSelectLanguage(state),
    }
}

export default compose(
    connect(mapStateToProps, {
        gdLanguage,        
    }),
)(ButtonLanguage);

