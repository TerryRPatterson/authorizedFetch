self.addEventListener("install", (event) => {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", function(event) {
    // Claim any clients immediately, so that the page will be under SW control without reloading.
    event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (fetchObject) => {
    let {request:{url}} = fetchObject;

    let statusCodeRegex = /^https?:\/\/.+\/status\/([0-9]+)/;
    //let statusCode = event.
    let statusCodeRegexOutput = statusCodeRegex.exec(url);
    if (statusCodeRegexOutput !== null) {
        let [,statusCode] = statusCodeRegexOutput;
        let response = new Response(null,{status:statusCode});
        fetchObject.respondWith(response);
    }
});
