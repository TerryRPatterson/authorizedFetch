self.addEventListener("install", (event) => {
    event.waitUntil(self.skipWaiting());
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
