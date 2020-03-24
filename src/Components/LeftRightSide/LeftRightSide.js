import React from 'react';
import css from './LeftRightSide.module.css';

import {
    gdTask,
    gdNewUserClient,
    gdClients
} from '../../redux/commonReducer';

import {
    getClients,
    getClientsNames,
    getClientsCity,
    getTasks,
    getLanguageButtonMainArea,
    getLanguage,
    getLanguagefieldsOfTask,
    getTotalClient
} from '../../redux/selector';

import { compose } from 'redux';
import { connect } from 'react-redux';

import { Button, Table, Accordion, Card, Form, Col } from 'react-bootstrap';

class LeftRightSide extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: JSON.parse(localStorage.getItem('reactUserLogin')).name,
            hash: JSON.parse(localStorage.getItem('reactUserLogin')).hash,
            role: JSON.parse(localStorage.getItem('reactUserLogin')).role,

            userId: null,

            filterFirstName: 'ALL',
            filterCity: 'ALL',

            paginationClientOnPage: 5,
            paginationActivePage: 1,


            displayTask: 'd-block',
            displayAddTask: 'd-none',
            displayEditTask: 'd-none',
            displayEditClient: 'd-none',

            sortTask: 'taskName',
            desc: null,

            idTask: null,
        };
    }


    componentDidUpdate = (prevProps) => {
        if (this.props.clients !== prevProps.clients) {
            this.selectClient(this.props.clients[0].id);
            this.getTaskUserId(this.props.clients[0].id);
        }
    }

    setFirsNameFilter = (event) => {

        let paramsClient = null;
        if (event.target.value === 'ALL' || event.target.value === 'Выбрать ВСЕ') {
            this.setState({ filterFirstName: 'ALL' });
            paramsClient = {
                'name': this.state.name,
                'hash': this.state.hash,
                'role': this.state.role,
                'action': 'getClients',
                'filterName': 'ALL',
                'filterCity': this.state.filterCity,
                'limit': this.state.paginationClientOnPage,
                'page': 1,
            };
        } else {
            this.setState({ filterFirstName: event.target.value });
            paramsClient = {
                'name': this.state.name,
                'hash': this.state.hash,
                'role': this.state.role,
                'action': 'getClients',
                'filterName': event.target.value,
                'filterCity': this.state.filterCity,
                'limit': this.state.paginationClientOnPage,
                'page': 1,
            };
        }

        let queryStringClient = Object.keys(paramsClient).map(key => key + '=' + paramsClient[key]).join('&');
        this.props.gdClients(queryStringClient);
        this.setState({ paginationActivePage: 1 });
    }

    setCityFilter = (event) => {
        let paramsClient = null;
        if (event.target.value === 'ALL' || event.target.value === 'Выбрать ВСЕ') {
            this.setState({ filterCity: 'ALL' });
            paramsClient = {
                'name': this.state.name,
                'hash': this.state.hash,
                'role': this.state.role,
                'action': 'getClients',
                'filterName': this.state.filterFirstName,
                'filterCity': 'ALL',
                'limit': this.state.paginationClientOnPage,
                'page': 1,
            };
        } else {
            this.setState({ filterCity: event.target.value });
            paramsClient = {
                'name': this.state.name,
                'hash': this.state.hash,
                'role': this.state.role,
                'action': 'getClients',
                'filterName': this.state.filterFirstName,
                'filterCity': event.target.value,
                'limit': this.state.paginationClientOnPage,
                'page': 1,
            };
        }

        let queryStringClient = Object.keys(paramsClient).map(key => key + '=' + paramsClient[key]).join('&');
        this.props.gdClients(queryStringClient);
        this.setState({ paginationActivePage: 1 });
    }

    selectClient = (id) => {
        this.setState({ userId: id })
        this.getTaskUserId(id);
        this.stopAddNewTask();
        this.stopEditNewTask();
        this.stopEditNewClient();
    }

    setClientOnPage = (event) => {
        this.setState({ paginationClientOnPage: event.target.value });
        let paramsClient = {
            'name': this.state.name,
            'hash': this.state.hash,
            'role': this.state.role,
            'action': 'getClients',
            'filterName': this.state.filterFirstName,
            'filterCity': this.state.filterCity,
            'limit': event.target.value,
            'page': 1,
        };
        let queryStringClient = Object.keys(paramsClient).map(key => key + '=' + paramsClient[key]).join('&');
        this.props.gdClients(queryStringClient);

        this.setState({ paginationActivePage: 1 });
    }

    setPage = (element) => {
        this.setState({ paginationActivePage: element });

        let paramsClient = {
            'name': this.state.name,
            'hash': this.state.hash,
            'role': this.state.role,
            'action': 'getClients',
            'filterName': this.state.filterFirstName,
            'filterCity': this.state.filterCity,
            'limit': this.state.paginationClientOnPage,
            'page': element,
        };
        let queryStringClient = Object.keys(paramsClient).map(key => key + '=' + paramsClient[key]).join('&');
        this.props.gdClients(queryStringClient);
    }

    getTaskUserId = (id) => {
        let paramsUser = {
            'name': this.state.name,
            'hash': this.state.hash,
            'role': this.state.role,
            'action': 'getTaskUserId',
            'id': id,
        };
        let queryString = Object.keys(paramsUser).map(key => key + '=' + paramsUser[key]).join('&');
        this.props.gdTask(queryString);
    }

    addNewTask = () => {
        this.setState({ displayTask: 'd-none' })
        this.setState({ displayAddTask: 'd-block' })

    }
    editNewTask = (idTask) => {
        this.setState({ displayTask: 'd-none' })
        this.setState({ displayEditTask: 'd-block' })
        this.setState({ idTask: idTask })
    }
    editNewClient = (event) => {
        event.stopPropagation();
        this.setState({ displayTask: 'd-none' })
        this.setState({ displayEditClient: 'd-block' })
    }

    stopAddNewTask = () => {
        this.setState({ displayTask: 'd-block' })
        this.setState({ displayAddTask: 'd-none' })
    }
    stopEditNewTask = () => {
        this.setState({ displayTask: 'd-block' })
        this.setState({ displayEditTask: 'd-none' })
    }
    stopEditNewClient = () => {
        this.setState({ displayTask: 'd-block' })
        this.setState({ displayEditClient: 'd-none' })
    }

    addTask = (event) => {
        event.preventDefault();       

        let paramsUser = {
            'name': this.state.name,
            'hash': this.state.hash,
            'role': this.state.role,
            'action': 'addNewTask',
            'idClient': this.state.userId,

            'taskName': event.target['taskName'].value.trim(),
            'description': event.target['description'].value.trim(),
            'date': event.target['date'].value,
            'startTime': event.target['startTime'].value,
            'endTime': event.target['endTime'].value,

        };
        let queryString = Object.keys(paramsUser).map(key => key + '=' + paramsUser[key]).join('&');
        this.props.gdNewUserClient(queryString, paramsUser['action']);
        this.stopAddNewTask();

    }
    editTask = (event) => {

        event.preventDefault();
        
        let paramsUser = {
            'name': this.state.name,
            'hash': this.state.hash,
            'role': this.state.role,
            'action': 'editTask',
            'idClient': this.state.userId,
            'WHERE_ID_TASK': this.state.idTask,

            'taskName': event.target['taskNameEdit'].value.trim(),
            'description': event.target['descriptionEdit'].value.trim(),
            'date': event.target['dateEdit'].value,
            'startTime': event.target['startTimeEdit'].value,
            'endTime': event.target['endTimeEdit'].value,

        };
        let queryString = Object.keys(paramsUser).map(key => key + '=' + paramsUser[key]).join('&');
        this.props.gdNewUserClient(queryString, paramsUser['action']);
        this.stopEditNewTask();


    }

    deleteTask = (idTask) => {
        let paramsUser = {
            'name': this.state.name,
            'hash': this.state.hash,
            'role': this.state.role,
            'action': 'deleteTask',
            'idClient': this.state.userId,
            'WHERE_ID_TASK': idTask,
        };
        let queryString = Object.keys(paramsUser).map(key => key + '=' + paramsUser[key]).join('&');
        this.props.gdNewUserClient(queryString, paramsUser['action']);
    }

    deleteClient = () => {
        let paramsUser = {
            'name': this.state.name,
            'hash': this.state.hash,
            'role': this.state.role,
            'action': 'deleteClient',
            'idClient': this.state.userId,
            'limit': this.state.paginationClientOnPage,
            'page': 1,
        };
        let queryString = Object.keys(paramsUser).map(key => key + '=' + paramsUser[key]).join('&');
        this.props.gdNewUserClient(queryString, paramsUser['action']);
        this.getTaskUserId(this.state.userId);
        
        this.setState({ paginationActivePage: 1 });
    }

    editClient = (event) => {

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
                'idClient': this.state.userId,
                'action': 'editClient',
                'FirstName': event.target["FirstName"].value.trim(),
                'LastName': event.target["LastName"].value.trim(),
                'City': event.target["City"].value.trim(),
                'Address': event.target["Address"].value.trim(),
                'Phone': Phone,
                'limit': this.state.paginationClientOnPage,
                'page': 1,
            };
            let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');

            this.props.gdNewUserClient(queryString, params['action']);
            this.stopEditNewClient();
           
            this.setState({ paginationActivePage: 1 });
        }
    }

    //https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
    compareValues = (key, order = 'asc') => {
        return function innerSort(a, b) {
            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                // property doesn't exist on either object
                return 0;
            }

            const varA = (typeof a[key] === 'string')
                ? a[key].toUpperCase() : a[key];
            const varB = (typeof b[key] === 'string')
                ? b[key].toUpperCase() : b[key];

            let comparison = 0;
            if (varA > varB) {
                comparison = 1;
            } else if (varA < varB) {
                comparison = -1;
            }
            return (
                (order === 'desc') ? (comparison * -1) : comparison
            );
        };
    }

    sortTaskName = () => {
        if (this.state.sortTask !== 'taskName' && this.state.desc === null) {
            this.setState({ sortTask: 'taskName' })
        } else if (this.state.sortTask !== 'taskName' && this.state.desc !== null) {
            this.setState({ sortTask: 'taskName' })
            this.setState({ desc: null })
        } else if (this.state.sortTask === 'taskName' && this.state.desc === null) {
            this.setState({ desc: 'desc' })
        } else if (this.state.sortTask === 'taskName' && this.state.desc !== null) {
            this.setState({ desc: null })
        }
    }

    sortIdTask = () => {
        if (this.state.sortTask !== 'idTask' && this.state.desc === null) {
            this.setState({ sortTask: 'idTask' })
        } else if (this.state.sortTask !== 'idTask' && this.state.desc !== null) {
            this.setState({ sortTask: 'idTask' })
            this.setState({ desc: null })
        } else if (this.state.sortTask === 'idTask' && this.state.desc === null) {
            this.setState({ desc: 'desc' })
        } else if (this.state.sortTask === 'idTask' && this.state.desc !== null) {
            this.setState({ desc: null })
        }
    }

    sortDate = () => {
        if (this.state.sortTask !== 'date' && this.state.desc === null) {
            this.setState({ sortTask: 'date' })
        } else if (this.state.sortTask !== 'date' && this.state.desc !== null) {
            this.setState({ sortTask: 'date' })
            this.setState({ desc: null })
        } else if (this.state.sortTask === 'date' && this.state.desc === null) {
            this.setState({ desc: 'desc' })
        } else if (this.state.sortTask === 'date' && this.state.desc !== null) {
            this.setState({ desc: null })
        }
    }

    render() {        
        return <>
            < hr />
            <div className="row mb-2" >
                <div className="col-lg-7 col-md-12 col-sm-12" >
                    <div className="row" >
                        <div className="col-9 text-center mb-2" >
                            {
                                this.props.totalClient !== null
                                &&
                                this.props.totalClient.numberPages.map(element =>
                                    this.state.paginationActivePage === element
                                        ?
                                        <Button key={element} variant="primary" className="m-1"
                                            onClick={() => this.setPage(element)}
                                        >
                                            {element}
                                        </Button>
                                        :
                                        <Button key={element} variant="secondary" className="m-1"
                                            onClick={() => this.setPage(element)}
                                        >
                                            {element}
                                        </Button>
                                )
                            }
                        </div>

                        <div className="col-3 mb-2" >
                            {this.props.mainArea.clientOnPage[this.props.lang].clientOnPageBtn}&nbsp;
                        <select
                                onChange={(event) => this.setClientOnPage(event)}
                                defaultValue={5}
                            >
                                <option >5</option>
                                <option >10</option>
                                <option >20</option>

                            </select>
                        </div>
                    </div>

                    <Table className={css.tableText} striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th className="align-middle text-center">
                                    {this.props.mainArea.tableID[this.props.lang].tableIDBtn}
                                </th>
                                <th className="align-down text-center">
                                    {this.props.mainArea.tableFN[this.props.lang].tableFNBtn}
                                    <select
                                        onChange={(event) => this.setFirsNameFilter(event)}
                                        defaultValue={this.props.mainArea.filterAll[this.props.lang].filterAllBtn}
                                    >
                                        <option >{this.props.mainArea.filterAll[this.props.lang].filterAllBtn}</option>
                                        {
                                            this.props.clientNames !== null
                                            &&
                                            this.props.clientNames.map(element =>
                                                <option key={element}>{element}</option>
                                            )
                                        }
                                    </select>
                                </th>
                                <th className="align-middle text-center">
                                    {this.props.mainArea.tableLN[this.props.lang].tableLNBtn}
                                </th>
                                <th className="align-down text-center">
                                    {this.props.mainArea.tableCity[this.props.lang].tableCityBtn}
                                    <select
                                        onChange={(event) => this.setCityFilter(event)}
                                        defaultValue={this.props.mainArea.filterAll[this.props.lang].filterAllBtn}
                                    >
                                        <option >{this.props.mainArea.filterAll[this.props.lang].filterAllBtn}</option>
                                        {
                                            this.props.clientCity !== null
                                            &&
                                            this.props.clientCity.map(element =>
                                                <option key={element}>{element}</option>
                                            )
                                        }
                                    </select>
                                </th>
                                <th className="align-middle text-center">
                                    {this.props.mainArea.tablePh[this.props.lang].tablePhBtn}
                                </th>

                                {
                                    JSON.parse(localStorage.getItem('reactUserLogin')).role === 'admin'
                                    &&
                                    <th className="align-middle text-center">
                                        {this.props.mainArea.tableEDC[this.props.lang].tableEDCBtn}
                                    </th>
                                }

                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.clients !== null && this.props.clients !== undefined
                                &&
                                this.props.clients.map(element =>


                                    element.id === this.state.userId
                                        ?
                                        <tr key={element.id} onClick={() => this.selectClient(element.id)}
                                            className="font-weight-bold text-danger" style={{ cursor: 'pointer' }}>
                                            <td>{element.id}</td>
                                            <td>{element.FirstName}</td>
                                            <td>{element.LastName}</td>
                                            <td>{element.City}</td>
                                            <td>{
                                                element.Phone.split(';').map(
                                                    (tel, index) =>
                                                        index < element.Phone.split(';').length - 1
                                                            ?
                                                            <li className="list-inline-item" key={tel + Math.random()}>
                                                                <a className="text-xs-center"
                                                                    href={"tel:+" + tel}>
                                                                    {tel}
                                                                </a>;
                                                    </li>
                                                            :
                                                            <li className="list-inline-item" key={tel + Math.random()}>
                                                                <a className="text-xs-center"
                                                                    href={"tel:+" + tel}>
                                                                    {tel}
                                                                </a>
                                                            </li>
                                                )
                                            }</td>
                                            {
                                                JSON.parse(localStorage.getItem('reactUserLogin')).role === 'admin'
                                                &&
                                                <th className="align-middle text-center">
                                                    <Button onClick={(event) => this.editNewClient(event)} variant="warning w-100 p-0 m-0 mb-1 border border-dark">
                                                        <span className={css.tableButton}>{this.props.mainArea.edit[this.props.lang].editBtn}</span>
                                                    </Button>
                                                    <br />
                                                    <Button
                                                        onClick={() => {
                                                            if (window.confirm('Are you sure you wish to delete this item?'))
                                                                this.deleteClient()
                                                        }
                                                        }
                                                        variant="danger w-100 p-0 m-0 border border-dark">
                                                        <span className={css.tableButton}>{this.props.mainArea.delete[this.props.lang].deleteBtn}</span>
                                                    </Button>
                                                </th>
                                            }
                                        </tr>
                                        :
                                        <tr key={element.id} onClick={() => this.selectClient(element.id)} style={{ cursor: 'pointer' }}>
                                            <td>{element.id}</td>
                                            <td>{element.FirstName}</td>
                                            <td>{element.LastName}</td>
                                            <td>{element.City}</td>
                                            <td>{
                                                element.Phone.split(';').map(
                                                    (tel, index) =>
                                                        index < element.Phone.split(';').length - 1
                                                            ?
                                                            <li className="list-inline-item" key={tel + Math.random()}>
                                                                <a className="text-xs-center"
                                                                    href={"tel:+" + tel}>
                                                                    {tel}
                                                                </a>;
                                                    </li>
                                                            :
                                                            <li className="list-inline-item" key={tel + Math.random()}>
                                                                <a className="text-xs-center"
                                                                    href={"tel:+" + tel}>
                                                                    {tel}
                                                                </a>
                                                            </li>
                                                )
                                            }</td>
                                            {
                                                JSON.parse(localStorage.getItem('reactUserLogin')).role === 'admin'
                                                &&
                                                <th className="align-middle text-center"><Button variant="secondary" className="w-100 p-0 m-0">
                                                    <span className={css.tableButton}>{this.props.mainArea.editDelete[this.props.lang].editDeleteBtn}</span>
                                                </Button></th>
                                            }
                                        </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </div>

                <div className="col-lg-5 col-md-12 col-sm-12" >
                    <div className={"row mb-3"}>
                        <div className={"col-lg-9 col-md-8 col-sm-8 col-12 mb-1 " + this.state.displayTask}>
                            <Button onClick={this.sortTaskName} className="mx-1 mb-1" variant="info" size='sm'>
                                <i className="fas fa-sort-numeric-up"></i>{this.props.mainArea.taskName[this.props.lang].taskNameBtn}
                            </Button>
                            <Button onClick={this.sortIdTask} className="mx-1 mb-1" variant="info" size='sm'>
                                <i className="fas fa-sort-numeric-up"></i>{this.props.mainArea.idTask[this.props.lang].idTaskBtn}
                            </Button>
                            <Button onClick={this.sortDate} className="mx-1 mb-1" variant="info" size='sm'>
                                <i className="fas fa-sort-numeric-up"></i>{this.props.mainArea.date[this.props.lang].dateBtn}
                            </Button>
                        </div>
                        <div className={"col-lg-3 col-md-4 col-sm-4 col-12 mb-1 " + this.state.displayTask}>
                            <Button onClick={this.addNewTask} variant="success" size='sm' className="float-right mb-1 mx-1">
                                {this.props.mainArea.addTask[this.props.lang].addTaskBtn}
                            </Button>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className={this.state.displayTask + ' w-100 ' + css.tableText}>
                            <Accordion defaultActiveKey="0" className="mx-2 ">
                                {
                                    this.props.tasks !== null
                                    &&
                                    this.props.tasks.sort(this.compareValues(this.state.sortTask, this.state.desc)).map(element =>

                                        element.idTask !== null
                                        &&
                                        <Card key={element.idTask} className="mb-1 border border-dark ">
                                            <Accordion.Toggle as={Card.Header} eventKey={element.idTask} style={{ cursor: 'pointer' }}>
                                                <div className="row">
                                                    <div className="col-4">
                                                        <b>{this.props.fieldsOfTask.idTask[this.props.lang].idTaskField}</b> - {element.idTask}
                                                    </div>
                                                    <div className="col-4 text-right">
                                                        <Button onClick={() => this.editNewTask(element.idTask)} variant="secondary " size='sm'>
                                                            <span className={css.tableButton}>{this.props.mainArea.edit[this.props.lang].editBtn}</span>
                                                        </Button>
                                                    </div>
                                                    <div className="col-4 text-right">
                                                        <Button onClick={() => {
                                                            if (window.confirm('Are you sure you wish to delete this item?'))
                                                                this.deleteTask(element.idTask)
                                                        }
                                                        } variant="danger" size='sm'>
                                                            <span className={css.tableButton}>{this.props.mainArea.delete[this.props.lang].deleteBtn}</span>
                                                        </Button>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-7">
                                                        <b>{this.props.fieldsOfTask.taskName[this.props.lang].taskNameField}</b> - {element.taskName}
                                                    </div>
                                                    <div className="col-5 border-left border-secondary">
                                                        <b>{this.props.fieldsOfTask.address[this.props.lang].addressField}</b> {element.Address}
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-4">
                                                        <b>{this.props.fieldsOfTask.date[this.props.lang].dateField}</b> {element.date}
                                                    </div>
                                                    <div className="col-4 border-left border-secondary">
                                                        <b>{this.props.fieldsOfTask.startTime[this.props.lang].startTimeField}</b> {element.startTime}
                                                    </div>
                                                    <div className="col-4 border-left border-secondary">
                                                        <b>{this.props.fieldsOfTask.endTime[this.props.lang].endTimeField}</b> {element.endTime}
                                                    </div>
                                                </div>

                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey={element.idTask}>
                                                <Card.Body>
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <b>{this.props.fieldsOfTask.taskDescription[this.props.lang].taskDescriptionField}</b> {element.taskDescription}
                                                            <hr />
                                                        </div>
                                                        <div className="col-6">
                                                            <b>{this.props.fieldsOfTask.dateCreation[this.props.lang].dateCreationField}</b><br />
                                                            {new Date(+element.dateCreation * 1000).toLocaleString()}
                                                        </div>
                                                        <div className="col-6">
                                                            <b>{this.props.fieldsOfTask.dateEdit[this.props.lang].dateEditField}</b><br />
                                                            {new Date(+element.dateLastEdit * 1000).toLocaleString()}
                                                        </div>

                                                    </div>

                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    )
                                }
                            </Accordion>
                        </div>

                        <div className={this.state.displayAddTask + ' w-100 mx-2'}>
                            <Form onSubmit={this.addTask}>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="taskName">
                                        <Form.Label>{this.props.fieldsOfTask.taskName[this.props.lang].taskNameField}</Form.Label>
                                        <Form.Control type="text" placeholder={this.props.fieldsOfTask.taskName[this.props.lang].taskNameField} required />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="description">
                                        <Form.Label>{this.props.fieldsOfTask.taskDescription[this.props.lang].taskDescriptionField}</Form.Label>
                                        <Form.Control as="textarea" rows="3" placeholder={this.props.fieldsOfTask.taskDescription[this.props.lang].taskDescriptionField} required />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="date">
                                        <Form.Label>{this.props.fieldsOfTask.date[this.props.lang].dateField}</Form.Label>
                                        <Form.Control type="date" required />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="startTime">
                                        <Form.Label>{this.props.fieldsOfTask.startTime[this.props.lang].startTimeField}</Form.Label>
                                        <Form.Control type="time" required />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="endTime">
                                        <Form.Label>{this.props.fieldsOfTask.endTime[this.props.lang].endTimeField}</Form.Label>
                                        <Form.Control type="time" required />
                                    </Form.Group>
                                </Form.Row>
                                <div className="row">
                                    <div className="col-12">
                                        <Button variant="primary" type="submit" className="float-left">

                                            {this.props.mainArea.addTask[this.props.lang].addTaskBtn}
                                        </Button>
                                        <Button variant="secondary" className="float-right"
                                            onClick={this.stopAddNewTask}
                                        >
                                            {this.props.mainArea.cancel[this.props.lang].cancelBtn}
                                        </Button>
                                    </div>
                                </div>
                            </Form>
                        </div>

                        <div className={this.state.displayEditTask + ' w-100 mx-2'}>
                            {
                                this.props.tasks !== null
                                &&
                                this.props.tasks.map(element =>
                                    element.idTask === this.state.idTask
                                    &&
                                    <Form onSubmit={this.editTask} key={element.idTask}>
                                        <Form.Row>
                                            <Form.Group as={Col} controlId="taskNameEdit">
                                                <h6>{this.props.fieldsOfTask.taskEditId[this.props.lang].taskEditIdField} {element.idTask}</h6>
                                                <Form.Label>{this.props.fieldsOfTask.taskName[this.props.lang].taskNameField}</Form.Label>
                                                <Form.Control type="text" defaultValue={element.taskName} required />
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} controlId="descriptionEdit">
                                                <Form.Label>{this.props.fieldsOfTask.taskDescription[this.props.lang].taskDescriptionField}</Form.Label>
                                                <Form.Control as="textarea" rows="3" defaultValue={element.taskDescription} required />
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} controlId="dateEdit">
                                                <Form.Label>{this.props.fieldsOfTask.date[this.props.lang].dateField}</Form.Label>
                                                <Form.Control type="date" defaultValue={element.date} required />
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="startTimeEdit">
                                                <Form.Label>{this.props.fieldsOfTask.startTime[this.props.lang].startTimeField}</Form.Label>
                                                <Form.Control type="time" defaultValue={element.startTime} required />
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="endTimeEdit">
                                                <Form.Label>{this.props.fieldsOfTask.endTime[this.props.lang].endTimeField}</Form.Label>
                                                <Form.Control type="time" defaultValue={element.endTime} required />
                                            </Form.Group>
                                        </Form.Row>
                                        <div className="row">
                                            <div className="col-12">
                                                <Button variant="primary" type="submit" className="float-left">
                                                    {this.props.mainArea.editTask[this.props.lang].editTaskBtn}
                                                </Button>
                                                <Button variant="secondary" className="float-right"
                                                    onClick={this.stopEditNewTask}
                                                >
                                                    {this.props.mainArea.cancel[this.props.lang].cancelBtn}
                                                </Button>
                                            </div>
                                        </div>
                                    </Form>
                                )
                            }
                        </div>

                        <div className={this.state.displayEditClient + ' w-100 mx-2'}>
                            {
                                this.props.clients !== null
                                &&
                                this.props.clients.map(element =>
                                    element.id === this.state.userId
                                    &&
                                    <Form onSubmit={this.editClient} key={element.id}>
                                        <h6>Editing Client: id  - {element.id}</h6>
                                        <Form.Row>
                                            <Form.Group as={Col} controlId="FirstName">
                                                <Form.Label>First name</Form.Label>
                                                <Form.Control type="text" defaultValue={element.FirstName} required />
                                            </Form.Group>

                                            <Form.Group as={Col} controlId="LastName">
                                                <Form.Label>Last name</Form.Label>
                                                <Form.Control type="text" defaultValue={element.LastName} required />
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Group controlId="City">
                                            <Form.Label>City</Form.Label>
                                            <Form.Control defaultValue={element.City} required />
                                        </Form.Group>
                                        <Form.Group controlId="Address">
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control defaultValue={element.Address} required />
                                        </Form.Group>


                                        <Form.Row key={Math.random()}>
                                            <Form.Group as={Col} controlId="Phone1" key={0}>
                                                <Form.Label><i className="fas fa-phone"></i> - 1 (required)<br />380507771144</Form.Label>
                                                <Form.Control className="px-1" type="number" defaultValue={
                                                    element.Phone.split(';')[0]
                                                } required />
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="Phone2" key={1}>
                                                <Form.Label><i className="fas fa-phone"></i> - 2<br />380507771144</Form.Label>
                                                <Form.Control className="px-1" type="number" defaultValue={
                                                    element.Phone.split(';')[1]
                                                } />
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="Phone3" key={2}>
                                                <Form.Label><i className="fas fa-phone"></i> - 3<br />380507771144</Form.Label>
                                                <Form.Control className="px-1" type="number" defaultValue={
                                                    element.Phone.split(';')[2]
                                                } />
                                            </Form.Group>
                                        </Form.Row>
                                        <div className="row">
                                            <div className="col-12">
                                                <Button variant="primary" type="submit" className="float-left">
                                                    {this.props.mainArea.editClient[this.props.lang].editClientBtn}
                                                </Button>
                                                <Button variant="secondary" className="float-right"
                                                    onClick={this.stopEditNewClient}
                                                >
                                                    {this.props.mainArea.cancel[this.props.lang].cancelBtn}
                                                </Button>
                                            </div>
                                        </div>
                                    </Form>
                                )
                            }

                        </div>

                    </div>
                </div>
            </div>
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        lang: getLanguage(state),
        clients: getClients(state),
        clientNames: getClientsNames(state),
        clientCity: getClientsCity(state),
        tasks: getTasks(state),
        mainArea: getLanguageButtonMainArea(state),
        fieldsOfTask: getLanguagefieldsOfTask(state),
        totalClient: getTotalClient(state),
    }
}

export default compose(
    connect(mapStateToProps, {
        gdTask,
        gdNewUserClient,
        gdClients
    }),
)(LeftRightSide);

