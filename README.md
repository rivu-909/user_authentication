# Authentication app

-   this again is an implementation from react-native tutorial
-   includes firebase user authentication service
-   token is stored in app wide state so that the desired screen can be rendered

## Accessing protected resources

-   the auth token returned by firebase can be used to fetch user specific data from firebase
-   we need to create protected endpoint in firebase
-   need to set token in the endpoint for example `...message.json?auth=${authToken}`
-   Note that this has not been implemented
-   failed authentication returns expo error 400

## Store token in native envt

-   this involves storing the auth token in native environment
-   _AsyncStorage_ function from "@react-native-async-storage/async-storage" is used

NOTE: util/apiKey.js is missing as this is for my own firebase account
