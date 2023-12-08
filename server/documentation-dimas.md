##API documentation

Endpoints
List of Available Endpoints:

POST /register

POST /login

GET /types, 

POST /types

GET /users

GET /lodgings

POST /lodgings

DELETE /lodgings/:id

1. POST /register
Request:

body:
```json
{
  "email": "string",
  "password": "string"
}
Response (201 - Created)

{
  "id": "integer",
  "email": "string"
}
Response (400 - Bad Request)

{
    "message": "email cannot be empty"
}
OR
{
    "message": "email cannot be null"
}
OR
{
    "message": "this email has been used"
}
OR
{
    "message": "email must be in email format"
}
OR
{
    "message": "password cannot be empty"
}
OR
{
    "message": "password cannot be null"
}
OR
{
    "message": "Minimum Password's Length is 5 Character"
}
```

2. POST /login

Request:

```json
body:
{
  "email": "string",
  "password": "string"
}
Response (200 - OK)

{
  "access_token": "string"
}
Response (400 - Bad Request)

{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
Response (401 - Unauthorized)

{
  "message": "Invalid email/password"
}
```

3. GET /lodgings

Description:
Get all lodgings from database
Request:

headers:
```json
{
  "access_token": "string"
}
Response (200 - OK)
```

4. POST /lodgings

Description:

create lodging to database

Request:
- body
```json
{
    "name": "string",
    "facility": "string",
    "roomCapacity": "integer",
    "imgUrl": "string",
    "location": "string",
    "price": "integer",
    "typeId": "integer"
}
```

5. DELETE /movies/:id

Description:

Delete Lodging by id
Request:
```json
headers:
{
  "access_token": "string"
}
params:
{
  "id": "integer (required)"
}
Response (200 - OK)

{
  "message": "Lodging has been deleted"
}
Response (404 - Not Found)

{
  "message": "lodging not found"
}
```


