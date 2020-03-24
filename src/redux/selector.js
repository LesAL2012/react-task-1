import { createSelector } from "reselect";

const getClienNamesSelector = (state) => {
    return state.common.clientNames;
}

export const getClientsNames = createSelector(getClienNamesSelector,
    (clientNames) => {
        let names = [];
        clientNames !== null
            &&
            clientNames.map(element => names.push(element.FirstName))            
        return names;
    }
)

const getClienCitySelector = (state) => {
    return state.common.clientCity;
}

export const getClientsCity = createSelector(getClienCitySelector,
    (clientCity) => {
        let city = [];
        clientCity !== null
            &&
            clientCity.map(element => city.push(element.City))             
        return city;
    }
)

export const getAuth = (state) => {
    return state.common.authLogin;
}

export const getLanguage = (state) => {
    return state.common.languageSelected;
}

export const getLanguageButtonSelectLanguage = (state) => {
    return state.common.languageData.buttons.language;
}

export const getLanguageButtonLogOut = (state) => {
    return state.common.languageData.buttons.logOut;
}
export const getLanguageButtonSubmit = (state) => {
    return state.common.languageData.buttons.submit;
}

export const getLanguageButtonAdminPanel = (state) => {
    return state.common.languageData.buttons.adminPanel;
}

export const getLanguageAdminField = (state) => {
    return state.common.languageData.adminField;
}

export const getLanguageButtonMainArea = (state) => {
    return state.common.languageData.buttons.mainArea;
}

export const getLanguagefieldsOfTask = (state) => {
    return state.common.languageData.fieldsOfTask;
}

export const getLanguageLogin = (state) => {
    return state.common.languageData.buttons.login;
}

export const getUsers = (state) => {
    return state.common.usersData;
}

export const getClients = (state) => {
    return state.common.clientData;
}

export const getTotalClient = (state) => {
    return state.common.totalClient;
}
export const getTasks = (state) => {
    return state.common.taskData;
}
