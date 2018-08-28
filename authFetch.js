
let authFailure = () => {
    localStorage.setItem("authorization",null);
};

let getUserAuthorization = () => {
    return window.localStorage.getItem("authorization");
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
        authFailure();
    }
    return response;
};

//exports is used by npm
// eslint-disable-next-line
exports.authFetch = authFetch;
