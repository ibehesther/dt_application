## API Reference

### Introduction
This is a CORS enabled RESTful API which allows its users create a nudge for whatever they want.

### Getting Started

#### Base URL
`/api/v3/app`

#### API Keys/Authentication
None

### Error
This API uses some of the standard HTTP status codes to indicate the success or failure of an API request.
Codes in the category of 2xx represent Success. Codes in the category of 3xx represent Redirection. Codes in the category of 4xx represent Client Error(i.e error causes by input data). Codes in the category of 5xx represent Server Error

#### Status codes and messages 
`200` - **OK**   --> Everything went as expected\
`400` - **Bad Request**    --> The request was unacceptable\
`404`  -  **Not Found**    --> Request resource not found\
`405`  -  **Method Not Allowed**    --> Incorrect HTTP method used for endpoint\
`500`  -  **Internal Server Error**   --> Something went wrong with the server

### Resource endpoint library
`POST '/api/v3/app/nudges' `
- This endpoint creates a new nudge
- Request Argument(s): None
- Request Body(Payload): key:value pairs (object) of nudge type, tag, title, image(file upload), schedule(date and time),
description, icon, and invitation.
- Returns: The nudge id

`GET '/api/v3/app/nudges' `
- This endpoint gets all the nudges
- Request Argument(s): None
- Request Body(Payload): None
- Returns: An array of objects, each containing all the information abour a nudge.

`GET '/api/v3/app/nudges/${id}' `
- This endpoint gets a specific nudge
- Request Argument(s): The id of nudge user wants to get
- Request Body(Payload): None
- Returns: An object containing all the information about that particular nudge (if found).

`PATCH '/api/v3/app/nudges/${id}' `
- This endpoint allows user make updates to nudge(s) already created.
- Request Argument(s): The id of nudge, user wants to get
- Request Body(Payload): key:value pairs (object) of whatever field user wants to change
- Returns: An object containing all the information about that updated nudge.

`DELETE '/api/v3/app/nudges/${id}' `
- This endpoint allows user make updates to nudge(s) already created.
- Request Argument(s): The id of nudge, user wants to get
- Request Body(Payload): None
- Returns: A success message, if successful.