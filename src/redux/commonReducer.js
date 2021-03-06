import { getData } from '../api/api';

let initialState = {
    authLogin: false,
    languageSelected: 'en',
    clientData: null,
    clientNames: null,
    clientCity: null,    
    totalClient: null,
    usersData: null,
    taskData: null,

    languageData: {
        adminField: {
            email: {
                en: { emailField: 'Email' },
                ru: { emailField: 'Почта-email' },
            },
            role: {
                en: { roleField: 'Role' },
                ru: { roleField: 'Доступ' },
            },
            password: {
                en: { passwordField: 'Password' },
                ru: { passwordField: 'Пароль' },
            },
            repeatPassword: {
                en: { repeatPasswordField: 'Repeat password' },
                ru: { repeatPasswordField: 'Поторить пароль' },
            },
            firstName: {
                en: { firstNameField: 'First name' },
                ru: { firstNameField: 'Имя' },
            },
            lastName: {
                en: { lastNameField: 'Last name' },
                ru: { lastNameField: 'Фамилия' },
            },
            city: {
                en: { cityField: 'City' },
                ru: { cityField: 'Город' },
            },
            address: {
                en: { addressField: 'Address' },
                ru: { addressField: 'Адрес' },
            },
            required: {
                en: { requiredField: 'required' },
                ru: { requiredField: 'обязательно' },
            },
            tel: {
                en: { telField: 'Tel...' },
                ru: { telField: 'Тел...' },
            },

        },
        fieldsOfTask: {
            idTask: {
                en: { idTaskField: 'id Task' },
                ru: { idTaskField: '№ задачи' },
            },
            taskName: {
                en: { taskNameField: 'Task Name' },
                ru: { taskNameField: 'Название задачи' },
            },
            address: {
                en: { addressField: 'Address:' },
                ru: { addressField: 'Адрес:' },
            },
            date: {
                en: { dateField: 'Date:' },
                ru: { dateField: 'Дата:' },
            },
            startTime: {
                en: { startTimeField: 'Start time' },
                ru: { startTimeField: 'Время начала' },
            },
            endTime: {
                en: { endTimeField: 'End time' },
                ru: { endTimeField: 'Время окончания' },
            },
            taskDescription: {
                en: { taskDescriptionField: 'Task Description:' },
                ru: { taskDescriptionField: 'Описание задачи:' },
            },
            dateCreation: {
                en: { dateCreationField: 'Date of creation:' },
                ru: { dateCreationField: 'Дата создания' },
            },
            dateEdit: {
                en: { dateEditField: 'Editing Date:' },
                ru: { dateEditField: 'Дата редактирования:' },
            },
            taskEditId: {
                en: { taskEditIdField: 'Edit task, id -' },
                ru: { taskEditIdField: 'Редактировние задачи № ' },
            },

        },
        buttons: {
            language: {
                en: { enBtn: 'En', ruBtn: 'Ru' },
                ru: { enBtn: 'Англ', ruBtn: 'Русс' },
            },
            submit: {
                en: { submitBtn: 'Submit' },
                ru: { submitBtn: 'Вход' },
            },
            logOut: {
                en: { logOutBtn: 'Log OUT' },
                ru: { logOutBtn: 'Выход' },
            },
            adminPanel: {
                en: { addUserBtn: 'Add User', addClientBtn: 'Add Client', addNewUserBtn: 'Add NEW User', addNewClientBtn: 'Add NEW Client', cancelBtn: 'Cancel' },
                ru: { addUserBtn: 'Добавить пользователя', addClientBtn: 'Добавить Клиента', addNewUserBtn: 'Добавить пользователя', addNewClientBtn: 'Добавить клиента', cancelBtn: 'Отмена' },
            },
            login: {
                en: { forEnterUser: 'Use for enter (user rights):', forEnterAdmin: 'Use for enter (administrator rights - create user, client and delete client):' },
                ru: { forEnterUser: 'Для входа с правми пользователя', forEnterAdmin: 'Вход с правами администратора, дополнительно к правам пользователя создание пользователя, клиента и редактирование их в базе данных' },
            },
            mainArea: {
                cancel: {
                    en: { cancelBtn: 'Cancel' },
                    ru: { cancelBtn: 'Отмена' },
                },
                edit: {
                    en: { editBtn: 'Edit' },
                    ru: { editBtn: 'Изм.' },
                },
                delete: {
                    en: { deleteBtn: 'Delete' },
                    ru: { deleteBtn: 'Удал.' },
                },
                editDelete: {
                    en: { editDeleteBtn: 'Edit/Del.' },
                    ru: { editDeleteBtn: 'Ред./Уд.' },
                },
                editClient: {
                    en: { editClientBtn: 'Edit Client' },
                    ru: { editClientBtn: 'Изменить данные клиента' },
                },
                editTask: {
                    en: { editTaskBtn: 'Edit Task' },
                    ru: { editTaskBtn: 'Изменить задание' },
                },
                taskName: {
                    en: { taskNameBtn: '...Task Name' },
                    ru: { taskNameBtn: '...Задача' },
                },
                idTask: {
                    en: { idTaskBtn: '...id Task' },
                    ru: { idTaskBtn: '...№ задачи' },
                },
                date: {
                    en: { dateBtn: '...Date' },
                    ru: { dateBtn: '...Дата' },
                },
                addTask: {
                    en: { addTaskBtn: 'Add NEW Task' },
                    ru: { addTaskBtn: 'Новая задача' },
                },
                clientOnPage: {
                    en: { clientOnPageBtn: 'Clients on page' },
                    ru: { clientOnPageBtn: 'Кол. записей на стр.' },
                },
                tableID: {
                    en: { tableIDBtn: 'id' },
                    ru: { tableIDBtn: '№' },
                },
                tableFN: {
                    en: { tableFNBtn: 'First Name' },
                    ru: { tableFNBtn: 'Имя' },
                },
                tableLN: {
                    en: { tableLNBtn: 'Last Name' },
                    ru: { tableLNBtn: 'Фамилия' },
                },
                tableCity: {
                    en: { tableCityBtn: 'City' },
                    ru: { tableCityBtn: 'Город' },
                },
                tablePh: {
                    en: { tablePhBtn: 'Phone' },
                    ru: { tablePhBtn: 'Телефон' },
                },
                tableEDC: {
                    en: { tableEDCBtn: 'Edit/Del. Client' },
                    ru: { tableEDCBtn: 'Изм./Уд. клиена' },
                },
                filterAll: {
                    en: { filterAllBtn: 'ALL' },
                    ru: { filterAllBtn: 'Выбрать ВСЕ' },
                },
            }

        }
    },
};

const commonReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_LANGUAGE:
            return {
                ...state,
                languageSelected: action.newData,
            };

        case SET_AUTH_LOGIN:
            return {
                ...state,
                authLogin: action.newData,
            };

        case SET_CLIENT_DATA:
            return {
                ...state,
                clientData: action.newData,
            };

        case SET_CLIENT_NAMES:
            return {
                ...state,
                clientNames: action.newData,
            };

        case SET_CLIENT_CITY:
            return {
                ...state,
                clientCity: action.newData,
            };
        
        case SET_TOTAL_CLIENT:
            return {
                ...state,
                totalClient: action.newData,
            };
        case SET_USERS_DATA:
            return {
                ...state,
                usersData: action.newData,
            };

        case SET_TASK_DATA:
            return {
                ...state,
                taskData: action.newData,
            };
        default:
            return state;

    }

}

//Const to switch - ActionCreater
const SET_LANGUAGE = ' SET_LANGUAGE';
const SET_AUTH_LOGIN = 'SET_AUTH_LOGIN';
const SET_CLIENT_DATA = 'SET_CLIENT_DATA';
const SET_CLIENT_NAMES = 'SET_CLIENT_NAMES';
const SET_CLIENT_CITY = 'SET_CLIENT_CITY';
const SET_TOTAL_CLIENT = 'SET_TOTAL_CLIENT';
const SET_USERS_DATA = 'SET_USERS_DATA';
const SET_TASK_DATA = 'SET_TASK_DATA';


//ActionCreaters
let setLanguage = (Language) => ({ type: SET_LANGUAGE, newData: Language });
let setAuthLogin = (AuthLogin) => ({ type: SET_AUTH_LOGIN, newData: AuthLogin });
let setClientData = (ClientData) => ({ type: SET_CLIENT_DATA, newData: ClientData });
let setClientNames = (ClientNames) => ({ type: SET_CLIENT_NAMES, newData: ClientNames });
let setClientCity = (ClientCity) => ({ type: SET_CLIENT_CITY, newData: ClientCity });
let setTotalClient = (TotalClient) => ({ type: SET_TOTAL_CLIENT, newData: TotalClient });
let setUserstData = (UserstData) => ({ type: SET_USERS_DATA, newData: UserstData });
let setTaskData = (TaskData) => ({ type: SET_TASK_DATA, newData: TaskData });

export const gdLanguage = (lang) => {
    return (dispatch) => {
        dispatch(setLanguage(lang));
    }
}

export const gdLogin = (name, pass) => {
    return (dispatch) => {
        let request = new XMLHttpRequest();
        let params = {
            'name': name,
            'pass': pass,
            'logIn': 'true',
        };
        let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
        request.open('POST', 'https://react-task-1.ts.biz.ua/auth.php', false);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.send(queryString);
        if (request.status === 200) {
            //let res =JSON.parse(request.responseText)
            let res = request.responseText;
            console.log(res);
            if (res !== 'false') {
                localStorage.setItem('reactUserLogin', res);
                dispatch(setAuthLogin(true));
                window.location.href = "/";
            } else {
                window.location.href = "/login";
                localStorage.removeItem('reactUserLogin');
                dispatch(setAuthLogin(false));
                alert('Please, check NAME and PASSWORD');
            }
        }
    }
}

export const gdAuth = () => {

    return (dispatch) => {
        if (!localStorage.getItem('reactUserLogin')) {
            dispatch(setAuthLogin(false));
        } else {
            let lsReactUserLogin = JSON.parse(localStorage.getItem('reactUserLogin'));
            if (lsReactUserLogin.name !== null || lsReactUserLogin.name !== undefined) {
                let request = new XMLHttpRequest();
                let params = {
                    name: lsReactUserLogin.name,
                    hash: lsReactUserLogin.hash,
                    checkLogIn: 'true',
                };
                let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
                request.open('POST', 'https://react-task-1.ts.biz.ua/auth.php', false);
                request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                request.send(queryString);
                if (request.status === 200) {
                    let res = request.responseText;
                    if (res !== 'false') {
                        localStorage.setItem('reactUserLogin', res);
                        dispatch(setAuthLogin(true));
                    } else {
                        window.location.href = "/";
                        localStorage.removeItem('reactUserLogin');
                        dispatch(setAuthLogin(false));
                        alert('Please, check NAME and PASSWORD');
                    }
                }
            }
        }
    }
}

export const gdLogOut = () => {
    localStorage.removeItem('reactUserLogin');
    window.location.href = "/login";
    return (dispatch) => {
        dispatch(setAuthLogin(false));
    }
}

export const gdNewUserClient = (queryString, action) => {
    return (dispatch) => {
        let request = new XMLHttpRequest();
        request.open('POST', 'https://react-task-1.ts.biz.ua/postNewData.php', false);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.send(queryString);
        if (request.status === 200) {
            let res = request.responseText;
            if (res !== 'false' && action === 'addNewClient') {
                alert('Client was added successfully');                
            }
            else if (res !== 'false' && action === 'editClient') {
                alert('Client was edit successfully');
                dispatch(setClientData(JSON.parse(res).client));
            } else if (res !== 'false' && action === 'addNewUser') {
                dispatch(setUserstData(JSON.parse(res)));
                alert('User was added successfully');
            } else if (res !== 'false' && action === 'addNewTask') {
                dispatch(setTaskData(JSON.parse(res)));
                alert('Task was added successfully');
            } else if (res !== 'false' && action === 'editTask') {
                dispatch(setTaskData(JSON.parse(res)));
                alert('Task was edited successfully');
            } else if (res !== 'false' && action === 'deleteTask') {
                dispatch(setTaskData(JSON.parse(res)));
                alert('Task was deleted successfully');
            }
            else if (res !== 'false' && action === 'deleteClient') {
                dispatch(setClientData(JSON.parse(res).client));
                alert('Client and tasks were deleted successfully')
            }
            else {
                alert('Some trouble with server or network - try to connect again')
            }
        }
    }
}

export const gdUsers = (queryString) => async (dispatch) => {
    let response = await getData.getUsersClientsTasks(queryString);
    dispatch(setUserstData(response));
}

export const gdClients = (queryString) => async (dispatch) => {
    let response = await getData.getUsersClientsTasks(queryString);
    dispatch(setClientData(response.client));
    dispatch(setClientNames(response.names));
    dispatch(setClientCity(response.city));
    dispatch(setTotalClient(response.total));    
}

export const gdTask = (queryString) => async (dispatch) => {
    let response = await getData.getUsersClientsTasks(queryString);
    dispatch(setTaskData(response));
}


export default commonReducer;