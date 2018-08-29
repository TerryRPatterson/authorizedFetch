
let authFailure = () => {
    localStorage.setItem("authorization","null");
    return false;
};

let getUserAuthorization = () => {
    return window.localStorage.getItem("authorization");
};

let configure = (userGetUserAuthorization, userAuthFailure) => {
    if (typeof userAuthFailure === "function") {
        authFailure = userAuthFailure;
    }
    if (typeof getUserAuthorization === "function") {
        getUserAuthorization = userGetUserAuthorization;
    }
};

let authFetch = async (url, fetchObject={}) => {
    let userAuth = getUserAuthorization();
    let authHeaders = {
        authorization: `Bearer ${userAuth}`
    };
    let fetchHeader = {...fetchObject["headers"], ...authHeaders};

    let authedFetchObject = {...fetchObject, headers:fetchHeader};
    let response =  await fetch(url, authedFetchObject);
    if (response.status === 401) {
        return authFailure();
    }
    return response;

};

let exportObject = {fetch:authFetch, configure};

export default exportObject;
