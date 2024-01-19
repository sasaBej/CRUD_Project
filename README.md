
# Posts Project - CRUD

This application offers both guest and login user functionalities.


## Features

- Create: Login user can add new posts.
- Read: Guests and login users alike can read posts.
- Update: Login users have the ability to modify existing posts.
- Delete: Login users can remove posts.

- If you want you can register and log in.

## API Reference

#### Get all posts

```http
  GET /api/posts
```

#### Get one post

```http
  GET /api/posts/${id}
```

#### Create a post

```http
  POST /api/posts
```
#### Update a post

```http
  PUT /api/posts/${id}
```
#### Delete a post

```http
  DELETE /api/posts/${id}
```
#### Login

```http
  POST /api/auth/local
```
#### Register

```http
  POST /api/auth/local/register
```


## Tech Stack

**Client:** React, Material UI, Axios, Classnames, Mobx, Mobx-react-lite, React-router-dom.

**Server:** strapi

