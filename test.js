import auth from "/authFetch.js";

let serviceWorker = document.getElementById("ServiceWorker");
let test200 = document.getElementById("Test200");
let test401 = document.getElementById("Test401");
let test500 = document.getElementById("Test500");

test200.textContent = "Testing 200 response not run.";
test401.textContent = "Testing 401 response not run.";
test500.textContent = "Testing other response codes not run.";
serviceWorker.textContent = "Service worker has not loaded";

let runTests = () => {
    auth.fetch("/status/200").then((test200Response) => {
        if (test200Response.status === 200) {
            test200.textContent = "200 response passed";
        }
        else {
            test200.textContent = "200 response failed";
        }
    });
    localStorage.setItem("authorization","testuser");

    auth.fetch("/status/401").then((test401Response) => {
        if (test401Response === false &&
        localStorage.getItem("authorization") === "null") {
            test401.textContent = "401 response passed";
        }
        else {
            test401.textContent = "401 response failed";
        }
    });

    auth.fetch("/status/500").then((test500Response) => {
        if (test500Response === "500") {
            test500.textContent = "Testing other responses passed";
        }
        else {
            test500.textContent = "Other responses failed";
        }
    });
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
