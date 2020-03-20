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


        };
    }

    componentDidMount = () => {
        let name = JSON.parse(localStorage.getItem('reactUserLogin')).name;
        let hash = JSON.parse(localStorage.getItem('reactUserLogin')).hash;
        let role = JSON.parse(localStorage.getItem('reactUserLogin')).role;

        let paramsUser = {
            'name': name,
            'hash': hash,
            'role': role,
            'action': 'getUsers',
        };
        let queryString = Object.keys(paramsUser).map(key => key + '=' + paramsUser[key]).join('&');
        this.props.gdUsers(queryString);

        let paramsClient = {
            'name': name,
            'hash': hash,
            'role': role,
            'action': 'getClients',
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
            let name = JSON.parse(localStorage.getItem('reactUserLogin')).name;
            let hash = JSON.parse(localStorage.getItem('reactUserLogin')).hash;
            let role = JSON.parse(localStorage.getItem('reactUserLogin')).role;

            let Phone = phone1;
            if (phone2) {
                Phone += ';' + phone2
            }
            if (phone3) {
                Phone += ';' + phone3
            }

            let params = {
                'name': name,
                'hash': hash,
                'role': role,
                'action': 'addNewClient',
                'FirstName': event.target["FirstName"].value.trim(),
                'LastName': event.target["LastName"].value.trim(),
                'City': event.target["City"].value.trim(),
                'Address': event.target["Address"].value.trim(),
                'Phone': Phone,

            };
            let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
            this.props.gdNewUserClient(queryString, params['action']);

            let paramsClient = {
                'name': name,
                'hash': hash,
                'role': role,
                'action': 'getClients',
            };
            let queryStringClient = Object.keys(paramsClient).map(key => key + '=' + paramsClient[key]).join('&');
            this.props.gdClients(queryStringClient);
            this.stopAddNewClientUser();
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
                                <Form.Label>First name</Form.Label>
                                <Form.Control type="text" placeholder="First name" required />
                            </Form.Group>

                            <Form.Group as={Col} controlId="LastName">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control type="text" placeholder="Last name" required />
                            </Form.Group>
                        </Form.Row>
                        <Form.Group controlId="City">
                            <Form.Label>City</Form.Label>
                            <Form.Control placeholder="City" required />
                        </Form.Group>
                        <Form.Group controlId="Address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control placeholder="Address" required />
                        </Form.Group>
                        <Form.Row>
                            <Form.Group as={Col} controlId="Phone1">
                                <Form.Label>Phone 1 - required<br />380507771144</Form.Label>
                                <Form.Control type="number" placeholder="Tel..." required />
                            </Form.Group>
                            <Form.Group as={Col} controlId="Phone2">
                                <Form.Label>Phone 2<br />380507771144</Form.Label>
                                <Form.Control type="number" placeholder="Tel..." />
                            </Form.Group>
                            <Form.Group as={Col} controlId="Phone3">
                                <Form.Label>Phone 3<br />380507771144</Form.Label>
                                <Form.Control type="number" placeholder="Tel..." />
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
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Email" required />
                            </Form.Group>
                            <Form.Group controlId="roleUser">
                                <Form.Label>Role</Form.Label>
                                <Form.Control as="select">
                                    <option>user</option>
                                    <option>admin</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="password1">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" required />
                            </Form.Group>
                            <Form.Group as={Col} controlId="password2">
                                <Form.Label>Repeat password</Form.Label>
                                <Form.Control type="password" placeholder="Repeat password" required />
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
    }
}

export default compose(
    connect(mapStateToProps, {
        gdNewUserClient,
        gdUsers,
        gdClients
    }),
)(AdminPanel);

