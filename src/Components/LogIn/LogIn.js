import React from 'react';
import { gdLogin } from '../../redux/commonReducer';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { getAuth, getLanguage,  getLanguageLogin } from '../../redux/selector';

class LogIn extends React.Component {

    logIn = (event) => {
        event.preventDefault();
        let name = event.target["formBasicEmail"].value.trim();
        let pass = event.target["formBasicPassword"].value.trim();
        this.props.gdLogin(name, pass);
    }

    render() {       
        console.log(this.props.login[this.props.lang].forEnterUser)
        return <>
            {
                this.props.auth === false
                    ?
                    <div>
                        <Form onSubmit={this.logIn}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="email" defaultValue="adminTask1@ent" />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="password" defaultValue="Admin111" />
                            </Form.Group>

                            <p><span className="text-primary font-weight-bold">
                            {this.props.login[this.props.lang].forEnterUser}
                                </span><br />
                                <b>Login:</b> userTask4@ent<br />
                                <b>Password:</b> 4
                            </p>
                            <p><span className="text-primary font-weight-bold">
                            {this.props.login[this.props.lang].forEnterAdmin}
                                </span><br />
                                <b>Login:</b> adminTask1@ent<br />
                                <b>Password:</b> Admin111
                            </p>
                            <Button variant="primary" type="submit">
                                Submit
                        </Button>
                        </Form>
                    </div>
                    :
                    <Redirect to="/" />
            }

        </>
    }

}


let mapStateToProps = (state) => {
    return {
        auth: getAuth(state),
        lang: getLanguage(state),
        login: getLanguageLogin(state),
    }
}

export default compose(
    connect(mapStateToProps, {
        gdLogin,
    }),
)(LogIn);




