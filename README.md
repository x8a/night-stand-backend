# Nightstand
An app where users keep track of the books they're reading.

## Links
[Heroku](https://nightstand.herokuapp.com)

[Jira board](https://x8a.atlassian.net/secure/RapidBoard.jspa?rapidView=1&projectKey=NIGHTSTAND)

[Frontend repo](https://github.com/x8a/night-stand-frontend)

## ROUTES

|Method|URL|Description|
|---|---|---|
GET | /login | redirects to / if user logged in. Renders auth/login
POST | /login | redirects to /user-profile if user logged in

```
body:
    - username
    - password
```
|Method|URL|Description|
|---|---|---|
GET | /signup | Renders auth/signup
POST | /signup | Redirects to /user-profile

```
body:
    - name
    - last name
    - username
    - email
    - password
```
|Method|URL|Description|
|---|---|---|
GET | /profile | renders user profile. If the user is not logged in, render homepage. 
GET | /edit/profile | renders user profile edit page. If the user is not logged in, render homepage. 
POST | /edit/profile | update user profile. Redirect /user-profile
POST | /logout | redirects to /
```
body:
    - pic
    - name
    - last name
    - username
    - email
    - password
```
|Method|URL|Description|
|---|---|---|
GET | /reading | renders books user is reading

```
body:
    - pic
    - title
    - author
    - description
    - status
```
|Method|URL|Description|
|---|---|---|
GET | /pending | renders books user has pending 

```
body:
    - pic
    - title
    - author
    - description
    - status
```
|Method|URL|Description|
|---|---|---|
GET | /read | renders books user has read 
```
body:
    - pic
    - title
    - author
    - description
    - status
```
|Method|URL|Description|
|---|---|---|
GET | /book/:bookId | renders details page of selected book 
```
body:
    - pic
    - title
    - author
    - description
    - status
```
|Method|URL|Description|
|---|---|---|
GET | /my-shops | renders shops user has saved 
GET | /my-shops/Id | renders shop details page
DELETE| /my-shops/Id | deletes a saved place
```
body:
    - name
    - address
    - map with location
```

## Models

```
User model
- username: String, required
- first name: String, required
- last name: String, required
- password: String, required
- image: String
- books: Array ObjectID
- shops: Array ObjectID
```
```
Book model
- title: String, required
- reader: ObjectID
- author: String, required
- description: String, required
- pic: String
- status: Enum [pending, reading, read]
```
```
Book shop model
- name: String, required
- address: String, required
```
