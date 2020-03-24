import React from 'react';

import {
    gdNewUserClient,
    gdUsers,
    gdClients,
} from '../../redux/commonReducer';
import {
    getLanguage,
    getLanguageButtonAdminPanel,
    getUsers,
    getClients,
    getLanguageAdminField,

} from '../../redux/selector';

import { compose } from 'redux';
import { connect } from 'react-redux';

import { Button, Form, Col } from 'react-bootstrap';

class AdminPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayAddUser: 'd-none',
            displayAddClient: 'd-none',
            filterName: 'ALL',

            name: JSON.parse(localStorage.getItem('reactUserLogin')).name,
            hash: JSON.parse(localStorage.getItem('reactUserLogin')).hash,
            role: JSON.parse(localStorage.getItem('reactUserLogin')).role,
        };
    }

    componentDidMount = () => {
        let paramsUser = {
            'name': this.state.name,
            'hash': this.state.hash,
            'role': this.state.role,
            'action': 'getUsers',
        };
        let queryString = Object.keys(paramsUser).map(key => key + '=' + paramsUser[key]).join('&');
        this.props.gdUsers(queryString);

        let paramsClient = {
            'name': this.state.name,
            'hash': this.state.hash,
            'role': this.state.role,
            'filterName': this.state.filterName,
            'action': 'getClients',
            'filterCity': 'ALL',
            'limit': 5,
            'page': 1,
        };
        let queryStringClient = Object.keys(paramsClient).map(key => key + '=' + paramsClient[key]).join('&');
        this.props.gdClients(queryStringClient);
    }

    newUser = () => {
        this.setState({ displayAddUser: 'd-block' });
        this.setState({ displayAddClient: 'd-none' });
    }

    newClient = () => {
        this.setState({ displayAddUser: 'd-none' });
        this.setState({ displayAddClient: 'd-block' });
    }

    stopAddNewClientUser = () => {
        this.setState({ displayAddUser: 'd-none' });
        this.setState({ displayAddClient: 'd-none' });
    }


    addClientToDB = (event) => {
        event.preventDefault();

        let regexp = /^380\d{2}\d{3}\d{2}\d{2}$/;
        let phone1 = event.target["Phone1"].value;
        let phone2 = event.target["Phone2"].value;
        let phone3 = event.target["Phone3"].value;

        if (!regexp.test(phone1)) {
            alert('Phone number 1 - is not valid')
        }
        else if (phone2 && !regexp.test(phone2)) {
            alert('Phone number 2 - is not valid')
        }
        else if (phone3 && !regexp.test(phone3)) {
            alert('Phone number 3 - is not valid')
        }
        else {

            let Phone = phone1;
            if (phone2) {
                Phone += ';' + phone2
            }
            if (phone3) {
                Phone += ';' + phone3
            }

            let params = {
                'name': this.state.name,
                'hash': this.state.hash,
                'role': this.state.role,
                'action': 'addNewClient',
                'FirstName': event.target["FirstName"].value.trim(),
                'LastName': event.target["LastName"].value.trim(),
                'City': event.target["City"].value.trim(),
                'Address': event.target["Address"].value.trim(),
                'Phone': Phone,

            };
            let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
            this.props.gdNewUserClient(queryString, params['action']);

            window.location.href = "/";

        }
    }

    addUserToDB = (event) => {
        event.preventDefault();
        let email = event.target["email"].value.trim();
        let password1 = event.target["password1"].value.trim();
        let password2 = event.target["password2"].value.trim();
        let roleUser = event.target["roleUser"].value;

        let users = [];
        this.props.users.forEach(element => users.push(element.email));

        if (users.includes(email)) {
            alert('This user (' + email + ') already exists')
        } else if (password1 !== password2) {
            alert('Passwords do not match')
        } else {

            let name = JSON.parse(localStorage.getItem('reactUserLogin')).name;
            let hash = JSON.parse(localStorage.getItem('reactUserLogin')).hash;
            let role = JSON.parse(localStorage.getItem('reactUserLogin')).role;

            let params = {
                'name': name,
                'hash': hash,
                'role': role,
                'action': 'addNewUser',
                'email': email,
                'password': password1,
                'roleUser': roleUser
            };
            let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
            this.props.gdNewUserClient(queryString, params['action']);
            this.stopAddNewClientUser();
        }
    }

    render() {
        return <>

            {
                JSON.parse(localStorage.getItem('reactUserLogin')).role === 'admin'
                &&
                <div className="row" >
                    <div className="col-lg-6 col-md-6 col-sm-6 mb-2 text-center" >
                        <Button variant="info"
                            style={{ width: '220px' }}
                            onClick={this.newUser}
                        >
                            {this.props.adminBtn[this.props.lang].addUserBtn}
                        </Button>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 mb-2 text-center" >
                        <Button variant="info"
                            style={{ width: '220px' }}
                            onClick={this.newClient}
                        >
                            {this.props.adminBtn[this.props.lang].addClientBtn}
                        </Button>
                    </div>
                </div>
            }

            <div className={"row " + this.state.displayAddClient} >
                <div className="col-lg-12" >
                    <hr />
                </div>
                <div className="col-lg-12" >

                    <Form onSubmit={this.addClientToDB}>
                        <Form.Row>
                            <Form.Group as={Col} controlId="FirstName">
                                <Form.Label>{this.props.adminField.firstName[this.props.lang].firstNameField}</Form.Label>
                                <Form.Control type="text" placeholder={this.props.adminField.firstName[this.props.lang].firstNameField} required />
                            </Form.Group>

                            <Form.Group as={Col} controlId="LastName">
                                <Form.Label>{this.props.adminField.lastName[this.props.lang].lastNameField}</Form.Label>
                                <Form.Control type="text" placeholder={this.props.adminField.lastName[this.props.lang].lastNameField} required />
                            </Form.Group>
                        </Form.Row>
                        <Form.Group controlId="City">
                            <Form.Label>{this.props.adminField.city[this.props.lang].cityField}</Form.Label>
                            <Form.Control placeholder={this.props.adminField.city[this.props.lang].cityField} required />
                        </Form.Group>
                        <Form.Group controlId="Address">
                            <Form.Label>{this.props.adminField.address[this.props.lang].addressField}</Form.Label>
                            <Form.Control placeholder={this.props.adminField.address[this.props.lang].addressField} required />
                        </Form.Group>
                        <Form.Row>
                            <Form.Group as={Col} controlId="Phone1">
                                <Form.Label><i className="fas fa-phone"></i> 1 - {this.props.adminField.required[this.props.lang].requiredField}<br />380507771144</Form.Label>
                                <Form.Control type="number" placeholder={this.props.adminField.tel[this.props.lang].telField} required />
                            </Form.Group>
                            <Form.Group as={Col} controlId="Phone2">
                                <Form.Label><i className="fas fa-phone"></i> 2<br />380507771144</Form.Label>
                                <Form.Control type="number" placeholder={this.props.adminField.tel[this.props.lang].telField} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="Phone3">
                                <Form.Label><i className="fas fa-phone"></i> 3<br />380507771144</Form.Label>
                                <Form.Control type="number" placeholder={this.props.adminField.tel[this.props.lang].telField} />
                            </Form.Group>
                        </Form.Row>

                        <div className="row">
                            <div className="col-12">
                                <Button variant="primary" type="submit" className="float-left">
                                    {this.props.adminBtn[this.props.lang].addNewClientBtn}
                                </Button>
                                <Button variant="secondary" className="float-right"
                                    onClick={this.stopAddNewClientUser}
                                >
                                    {this.props.adminBtn[this.props.lang].cancelBtn}
                                </Button>
                            </div>
                        </div>
                    </Form>


                </div>
            </div>
            <div className={"row " + this.state.displayAddUser} >
                <div className="col-lg-12" >
                    <hr />
                </div>
                <div className="col-lg-12" >

                    <Form onSubmit={this.addUserToDB}>
                        <Form.Row>
                            <Form.Group as={Col} controlId="email">
                                <Form.Label>{this.props.adminField.email[this.props.lang].emailField}</Form.Label>
                                <Form.Control type="email" placeholder="Email" required />
                            </Form.Group>
                            <Form.Group controlId="roleUser">
                                <Form.Label>{this.props.adminField.role[this.props.lang].roleField}</Form.Label>
                                <Form.Control as="select">
                                    <option>user</option>
                                    <option>admin</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="password1">
                                <Form.Label>{this.props.adminField.password[this.props.lang].passwordField}</Form.Label>
                                <Form.Control type="password" placeholder="Password" required />
                            </Form.Group>
                            <Form.Group as={Col} controlId="password2">
                                <Form.Label>{this.props.adminField.repeatPassword[this.props.lang].repeatPasswordField}</Form.Label>
                                <Form.Control type="password" placeholder={this.props.adminField.repeatPassword[this.props.lang].repeatPasswordField} required />
                            </Form.Group>
                        </Form.Row>


                        <div className="row">
                            <div className="col-12">
                                <Button variant="primary" type="submit" className="float-left">
                                    {this.props.adminBtn[this.props.lang].addNewUserBtn}
                                </Button>
                                <Button variant="secondary" className="float-right"
                                    onClick={this.stopAddNewClientUser}
                                >
                                    {this.props.adminBtn[this.props.lang].cancelBtn}
                                </Button>
                            </div>
                        </div>
                    </Form>


                </div>
            </div>



        </>
    }
}

let mapStateToProps = (state) => {
    return {
        clients: getClients(state),
        users: getUsers(state),
        lang: getLanguage(state),
        adminBtn: getLanguageButtonAdminPanel(state),
        adminField: getLanguageAdminField(state),
    }
}

export default compose(
    connect(mapStateToProps, {
        gdNewUserClient,
        gdUsers,
        gdClients
    }),
)(AdminPanel);

