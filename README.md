# Nightstand
An app where users keep track of the books they're reading.

## Links to App 
[Heroku]()

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
GET | /user-profile | renders user profile. If the user is not logged in, render homepage. 
GET | /edit/user-profile/Id | renders user profile edit page. If the user is not logged in, render homepage. 
POST | /edit/user-profile/Id | update user profile. Redirect /user-profile
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
GET | /reading/Id | renders book details page
POST | /reading/Id | mark book as read. Redirect to /reading
POST | /readingDelete/Id | delete a book. Redirect to /reading
POST | /logout | redirects to /
```
body:
    - pic
    - title
    - author
    - description
    - rating
```
|Method|URL|Description|
|---|---|---|
GET | /pending | renders books user has pending 
GET | /pending/Id | renders book details page
POST | /pending/Id | mark book as reading. Redirect to /pending
GET | /create/pending | renders book create page
POST | /create/pending | saves book. Redirect to /pending
POST | /logout | redirects to /
```
body:
    - pic
    - title
    - author
    - description
    - rating
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
- rating: Number
- status: Enum [pending, reading, read]
```
```
Book shop model
- name: String, required
- location: String, required
```