import auth from "/authFetch.js";

//getting all dom elements
let serviceWorker = document.getElementById("ServiceWorker");
let tests = document.getElementById("tests");

//Setting up all sections
serviceWorker.textContent = "Service worker has not loaded";

let runTest = async (name, code, evaluateOutput) => {
    localStorage.setItem("authorization","testuser");

    let element = document.createElement("p");
    element.textContent = `Test: ${name} Status: Running`;
    tests.appendChild(element);

    let response = await auth.fetch(`/status/${code}`);
    let responseEvaluation = evaluateOutput(response);

    if (responseEvaluation === true) {
        element.textContent = `Test: ${name} status: passed`;
    }
    else {
        element.textContent = `Test: ${name} status: failed`;
    }
};

//setting up functions used in configration path 1
let getUserAuthorization = () => {
    return localStorage.getItem("authorizationConfig");
};

let authFailure = () => {
    localStorage.setItem("authorizationConfig","null");
    return "Authentication Failed Configed";
};

let evaluate200 = (response) => {
    if (response.status === 200) {
        return true;
    }
    else
    {
        return false;
    }
};

let evaluate401 = (response) => {
    if (response === false &&
        localStorage.getItem("authorization") === "null") {
        return true;
    }
    else {
        return false;
    }
};

let evaluate401Configed = (response) => {
    if (response === "Authentication Failed Configed" &&
        localStorage.getItem("authorizationConfig") === "null") {
        return true;
    }
    else {
        return false;
    }
};

let runTests = async () => {
    runTest("Standard 200",200,evaluate200);
    runTest("Standard 401", 401, evaluate401);

    auth.configure(getUserAuthorization, authFailure);
    localStorage.setItem("authorizationConfig", "testuser");
    runTest("Standard 200",200,evaluate200);
    runTest("Standard 401", 401, evaluate401Configed);


};

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker.register("serviceWorker.js")
            .then(() => {
            // Registration was successful
                serviceWorker.textContent = "ServiceWorker registration"+
                 " successful";
                runTests();
            }, function(err) {
            // registration failed :(
                serviceWorker.textContent = "ServiceWorker registration"+
                `failed: ${err}`;
            });
    });
}
