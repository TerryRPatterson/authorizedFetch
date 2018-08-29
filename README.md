Authorized Fetch is a wrapper around the fetch API which will automatically
bundle a Bearer token into the call and run a function upon receiving a status
401 unauthorized.

```
This module exports:

{

  configure: function accepts two parameters:
    getUserAuthorization: function that is called to retrieve user credentials
    that will be sent with the fetch calls.

    authFailure: function that is called when a 401 is received.



  fetch: function accept two parameters:

    URL: String of the URL to fetch from.

    Headers: Object contain all headers you want included. This object will be
    merged with an authorization header containing the results of
    getUserAuthorization. This will not overwrite any authorization
    header you pass to it.
}
```
