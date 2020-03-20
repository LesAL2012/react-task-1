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

export const getLanguageButtonAdminPanel = (state) => {
    return state.common.languageData.buttons.adminPanel;
}

export const getLanguageButtonMainArea = (state) => {
    return state.common.languageData.buttons.mainArea;
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

export const getTasks = (state) => {
    return state.common.taskData;
}
