import React from 'react';

import {
    gdTask,
    gdNewUserClient,
    gdClients
} from '../../redux/commonReducer';

import {
    getClients,
    getTasks,
    getLanguageButtonMainArea,
    getLanguage
} from '../../redux/selector';

import { compose } from 'redux';
import { connect } from 'react-redux';

import { Button, Table, Accordion, Card, Form, Col } from 'react-bootstrap';

class LeftRightSide extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: null,

            paginationClientOnPage: 5,
            paginationCountUser: null,
            paginationPages: null,
            paginationPagesFirstIndex: 0,
            paginationPagesLastIndex: 4,

            paginationActivePage: 1,
            paginationClientList: null,
            paginationTable: null,

            filterFirstName: null,
            filterCity: null,
            filterListFirstName: null,
            filterListCity: null,

            displayTask: 'd-block',
            displayAddTask: 'd-none',
            displayEditTask: 'd-none',
            displayEditClient: 'd-none',

            sortTask: 'taskName',
            desc: null,

            idTask: null,
        };
    }


    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.clients !== prevProps.clients) {
            this.selectClient(this.props.clients[0].id);
            this.paginationData();
        }

        if (this.state.filterFirstName !== prevState.filterFirstName || this.state.filterCity !== prevState.filterCity) {
            this.paginationData();
        }

        if (this.state.paginationCountUser !== prevState.paginationCountUser || this.state.paginationClientOnPage !== prevState.paginationClientOnPage) {
            this.paginationData();
        }

    }

    selectClient = (id) => {
        this.setState({ userId: id })
        this.getTaskUserId(id);
    }

    paginationData = () => {
        if (this.state.paginationCountUser !== null) {
            let clientCounter = this.state.paginationCountUser;

            let arrPages = [];
            for (let i = 1; i <= Math.ceil(clientCounter / this.state.paginationClientOnPage); i++) {
                arrPages.push(i)
            }
            this.setState({ paginationPages: arrPages });
            this.setPage(1);
        }
        this.setClients();
    }

    setPage = (page) => {
        this.setState({ paginationActivePage: page });

        let firstIndex = (page - 1) * this.state.paginationClientOnPage;
        let lastIndex = page * this.state.paginationClientOnPage - 1;
        let lastIndexTrue = '';
        this.setState({ paginationPagesFirstIndex: firstIndex });
        if (lastIndex < this.state.paginationClientList.length) {
            lastIndexTrue = lastIndex;
        } else {
            lastIndexTrue = this.state.paginationClientList.length - 1;
        }
        this.setState({ paginationPagesLastIndex: lastIndexTrue });

        this.setClients();
        let paginationTableData = [];
        for (let i = firstIndex; i <= lastIndexTrue; i++) {
            paginationTableData.push(this.state.paginationClientList[i]);
        }

        this.setState({ paginationTable: paginationTableData });

        if (JSON.stringify(paginationTableData) !== '[]') {
            this.selectClient(paginationTableData[0].id);
        }

    }

    setClientOnPage = (event) => {
        this.setState({ paginationClientOnPage: event.target.value });
        this.setClients();
    }

    setClients = () => {
        let clients = this.props.clients;

        let filterToFirstName = [];
        let filterToClientsCity = [];


        if (this.state.filterFirstName !== null) {
            clients.map(element =>
                element.FirstName === this.state.filterFirstName
                &&
                filterToFirstName.push(element)
            )
        } else {
            clients.map(element => filterToFirstName.push(element))
        }

        if (this.state.filterCity !== null) {
            filterToFirstName.map(element =>
                element.City === this.state.filterCity
                &&
                filterToClientsCity.push(element)
            )
        } else {
            filterToFirstName.map(element => filterToClientsCity.push(element))
        }

        this.setState({ paginationClientList: filterToClientsCity });
        this.setState({ paginationCountUser: filterToClientsCity.length });

        if (JSON.stringify(filterToClientsCity) !== '[]') {
            this.selectClient(filterToClientsCity[0].id)
        }


        const compareNumbers = (a, b) => {
            return a - b;
        }
        let arrFistName = [];
        clients.map(element => arrFistName.push(element.FirstName));
        let FirstName = new Set(arrFistName);
        let FirstNamefilter = Array.from(FirstName).sort(compareNumbers);
        let arrCity = [];
        clients.map(element => arrCity.push(element.City));
        let City = new Set(arrCity);
        let Cityfilter = Array.from(City).sort(compareNumbers);

        this.setState({ filterListFirstName: FirstNamefilter });
        this.setState({ filterListCity: Cityfilter });
    }

    setFirsNameFilter = (event) => {
        if (event.target.value === 'ALL' || event.target.value === 'Выбрать ВСЕ') {
            this.setState({ filterFirstName: null })
        } else {
            this.setState({ filterFirstName: event.target.value })
        }
        this.setClients();
    }
    setCityFilter = (event) => {
        if (event.target.value === 'ALL' || event.target.value === 'Выбрать ВСЕ') {
            this.setState({ filterCity: null })
        } else {
            this.setState({ filterCity: event.target.value })
        }
        this.setClients();
    }

    getTaskUserId = (id) => {
        let name = JSON.parse(localStorage.getItem('reactUserLogin')).name;
        let hash = JSON.parse(localStorage.getItem('reactUserLogin')).hash;
        let role = JSON.parse(localStorage.getItem('reactUserLogin')).role;

        let paramsUser = {
            'name': name,
            'hash': hash,
            'role': role,
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
    editNewClient = () => {
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
        let name = JSON.parse(localStorage.getItem('reactUserLogin')).name;
        let hash = JSON.parse(localStorage.getItem('reactUserLogin')).hash;
        let role = JSON.parse(localStorage.getItem('reactUserLogin')).role;

        let paramsUser = {
            'name': name,
            'hash': hash,
            'role': role,
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
        let name = JSON.parse(localStorage.getItem('reactUserLogin')).name;
        let hash = JSON.parse(localStorage.getItem('reactUserLogin')).hash;
        let role = JSON.parse(localStorage.getItem('reactUserLogin')).role;

        let paramsUser = {
            'name': name,
            'hash': hash,
            'role': role,
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
        let name = JSON.parse(localStorage.getItem('reactUserLogin')).name;
        let hash = JSON.parse(localStorage.getItem('reactUserLogin')).hash;
        let role = JSON.parse(localStorage.getItem('reactUserLogin')).role;

        let paramsUser = {
            'name': name,
            'hash': hash,
            'role': role,
            'action': 'deleteTask',
            'idClient': this.state.userId,
            'WHERE_ID_TASK': idTask,
        };
        let queryString = Object.keys(paramsUser).map(key => key + '=' + paramsUser[key]).join('&');
        this.props.gdNewUserClient(queryString, paramsUser['action']);
    }

    deleteClient = () => {
        let name = JSON.parse(localStorage.getItem('reactUserLogin')).name;
        let hash = JSON.parse(localStorage.getItem('reactUserLogin')).hash;
        let role = JSON.parse(localStorage.getItem('reactUserLogin')).role;

        let paramsUser = {
            'name': name,
            'hash': hash,
            'role': role,
            'action': 'deleteClient',
            'idClient': this.state.userId,
        };
        let queryString = Object.keys(paramsUser).map(key => key + '=' + paramsUser[key]).join('&');
        this.props.gdNewUserClient(queryString, paramsUser['action']);
        this.getTaskUserId(this.state.userId);
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
                'idClient': this.state.userId,
                'action': 'editClient',
                'FirstName': event.target["FirstName"].value.trim(),
                'LastName': event.target["LastName"].value.trim(),
                'City': event.target["City"].value.trim(),
                'Address': event.target["Address"].value.trim(),
                'Phone': Phone,
            };
            let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');

            this.props.gdNewUserClient(queryString, params['action']);
            this.stopEditNewClient();

            let paramsClient = {
                'name': name,
                'hash': hash,
                'role': role,
                'action': 'getClients',
            };
            let queryStringClient = Object.keys(paramsClient).map(key => key + '=' + paramsClient[key]).join('&');
            this.props.gdClients(queryStringClient);
        }
    }

    render() {

        console.log(this.props.mainArea)

        return <>
            < hr />
            <div className="row mb-2" >
                <div className="col-lg-6 cl-md-12 col-sm-12 col-12" >
                    <div className="row" >
                        <div className="col-9 text-center mb-2" >
                            {
                                this.state.paginationPages !== null
                                &&
                                this.state.paginationPages.map(element =>
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
                    <div className="col-lg-6 col-md-12 col-sm-12" >
                        <Table striped bordered hover size="sm" style={{ fontSize: '15px' }}>
                            <thead>
                                <tr>
                                    <th className="align-middle text-center">
                                    {this.props.mainArea.tableID[this.props.lang].tableIDBtn}
                                        </th>
                                    <th className="align-down text-center">
                                    {this.props.mainArea.tableFN[this.props.lang].tableFNBtn}
                                    <select
                                            onChange={(event) => this.setFirsNameFilter(event)}
                                            defaultValue={"ALL"}
                                        >
                                            <option >ALL</option>
                                            {
                                                this.state.filterListFirstName !== null
                                                &&
                                                this.state.filterListFirstName.map(element =>
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
                                            defaultValue={"ALL"}
                                        >
                                            <option >ALL</option>
                                            {
                                                this.state.filterListCity !== null
                                                &&
                                                this.state.filterListCity.map(element =>
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
                                    this.state.paginationTable !== null
                                    &&
                                    this.state.paginationTable.map(element =>


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
                                                        <Button onClick={() => this.editNewClient(element.id)} variant="warning" className="w-100 p-0 m-0">
                                                        {this.props.mainArea.edit[this.props.lang].editBtn}
                                                            </Button>
                                                        <br />
                                                        <Button
                                                            onClick={() => {
                                                                if (window.confirm('Are you sure you wish to delete this item?'))
                                                                    this.deleteClient()
                                                            }
                                                            }
                                                            variant="danger" className="w-100 p-0 m-0">
                                                                {this.props.mainArea.delete[this.props.lang].deleteBtn}
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
                                                       {this.props.mainArea.editDelete[this.props.lang].editDeleteBtn}
                                                        </Button></th>
                                                }
                                            </tr>
                                    )
                                }
                            </tbody>
                        </Table>
                    </div>
                </div>

                <div className="col-lg-6 cl-md-12 col-sm-12 col-12" >
                    <div className="row mb-3 px-4">
                        <div className="col-9">
                            <b>Sort by:</b>
                            <Button onClick={this.sortTaskName} className="mx-1" variant="info" size='sm'>
                                {this.props.mainArea.taskName[this.props.lang].taskNameBtn}
                            </Button>
                            <Button onClick={this.sortIdTask} className="mx-1" variant="info" size='sm'>
                                {this.props.mainArea.idTask[this.props.lang].idTaskBtn}
                            </Button>
                            <Button onClick={this.sortDate} className="mx-1" variant="info" size='sm'>
                                {this.props.mainArea.date[this.props.lang].dateBtn}
                            </Button>
                        </div>
                        <div className="col-3">
                            <Button onClick={this.addNewTask} variant="success" size='sm'>
                                {this.props.mainArea.addTask[this.props.lang].addTaskBtn}
                            </Button>
                        </div>
                    </div>

                    <div className="mb-3 px-3">
                        <div className={this.state.displayTask}>
                            <Accordion defaultActiveKey="0" className="mx-1">
                                {
                                    this.props.tasks !== null
                                    &&
                                    this.props.tasks.sort(this.compareValues(this.state.sortTask, this.state.desc)).map(element =>

                                        element.idTask !== null
                                        &&
                                        <Card key={element.idTask} className="mb-1 border border-dark">
                                            <Accordion.Toggle as={Card.Header} eventKey={element.idTask} style={{ cursor: 'pointer' }}>
                                                <div className="row">
                                                    <div className="col-3">
                                                        <b>id Task</b> - {element.idTask}
                                                    </div>
                                                    <div className="col-5">
                                                        <b>Task Name</b> - {element.taskName}
                                                    </div>
                                                    <div className="col-2 text-right">
                                                        <Button onClick={() => this.editNewTask(element.idTask)} variant="secondary " size='sm'>
                                                            {this.props.mainArea.edit[this.props.lang].editBtn}
                                                        </Button>
                                                    </div>
                                                    <div className="col-2 text-right">
                                                        <Button onClick={() => {
                                                            if (window.confirm('Are you sure you wish to delete this item?'))
                                                                this.deleteTask(element.idTask)
                                                        }
                                                        } variant="danger" size='sm'>
                                                            {this.props.mainArea.delete[this.props.lang].deleteBtn}
                                                        </Button>
                                                    </div>
                                                    <div className="col-12">
                                                        <hr />
                                                    </div>
                                                    <div className="col-12">
                                                        <b>Address:</b> {element.Address}
                                                    </div>
                                                    <div className="col-4">
                                                        <b>Date</b> {element.date}
                                                    </div>
                                                    <div className="col-4">
                                                        <b>Start time</b> {element.startTime}
                                                    </div>
                                                    <div className="col-4">
                                                        <b>End time</b> {element.endTime}
                                                    </div>

                                                </div>
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey={element.idTask}>
                                                <Card.Body>
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <b>Task Description:</b> {element.taskDescription}
                                                            <hr />
                                                        </div>
                                                        <div className="col-6">
                                                            <b>Date creation:</b><br />
                                                            {new Date(+element.dateCreation * 1000).toLocaleString()}
                                                        </div>
                                                        <div className="col-6">
                                                            <b>Date edit:</b><br />
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

                        <div className={this.state.displayAddTask}>
                            <Form onSubmit={this.addTask}>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="taskName">
                                        <Form.Label>Task Name</Form.Label>
                                        <Form.Control type="text" placeholder="Task Name" required />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="description">
                                        <Form.Label>Task description</Form.Label>
                                        <Form.Control as="textarea" rows="3" placeholder="Task description" required />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="date">
                                        <Form.Label>Date</Form.Label>
                                        <Form.Control type="date" required />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="startTime">
                                        <Form.Label>Start time</Form.Label>
                                        <Form.Control type="time" required />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="endTime">
                                        <Form.Label>End time</Form.Label>
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

                        <div className={this.state.displayEditTask}>
                            {
                                this.props.tasks !== null
                                &&
                                this.props.tasks.map(element =>
                                    element.idTask === this.state.idTask
                                    &&
                                    <Form onSubmit={this.editTask} key={element.idTask}>
                                        <Form.Row>
                                            <Form.Group as={Col} controlId="taskNameEdit">
                                                <Form.Label>Task Name</Form.Label>
                                                <Form.Control type="text" defaultValue={element.taskName} required />
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} controlId="descriptionEdit">
                                                <Form.Label>Task description</Form.Label>
                                                <Form.Control as="textarea" rows="3" defaultValue={element.taskDescription} required />
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} controlId="dateEdit">
                                                <Form.Label>Date</Form.Label>
                                                <Form.Control type="date" defaultValue={element.date} required />
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="startTimeEdit">
                                                <Form.Label>Start time</Form.Label>
                                                <Form.Control type="time" defaultValue={element.startTime} required />
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="endTimeEdit">
                                                <Form.Label>End time</Form.Label>
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

                        <div className={this.state.displayEditClient}>
                            {
                                this.props.clients !== null
                                &&
                                this.props.clients.map(element =>
                                    element.id === this.state.userId
                                    &&
                                    <Form onSubmit={this.editClient} key={element.id}>
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
                                                <Form.Label>Phone 1 - required<br />380507771144</Form.Label>
                                                <Form.Control type="number" defaultValue={
                                                    element.Phone.split(';')[0]
                                                } required />
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="Phone2" key={1}>
                                                <Form.Label>Phone 2<br />380507771144</Form.Label>
                                                <Form.Control type="number" defaultValue={
                                                   element.Phone.split(';')[1]
                                                } />
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="Phone3" key={2}>
                                                <Form.Label>Phone 2<br />380507771144</Form.Label>
                                                <Form.Control type="number" defaultValue={
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
        tasks: getTasks(state),
        mainArea: getLanguageButtonMainArea(state),
    }
}

export default compose(
    connect(mapStateToProps, {
        gdTask,
        gdNewUserClient,
        gdClients
    }),
)(LeftRightSide);

