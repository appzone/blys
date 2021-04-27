Backend Service
============

API service for Blys OTP


## How to run server

Development Mode
```
npm install
npm run dev
```

Production mode
```
npm install
npm run start
```

## How to run test
```
npm run test
```

## Environment variables

* `NODE_ENV` (string): Environment mode. Default: `development`
* `PORT` (int): The port number the service will listen to. Default: `8080`
* `JWT_SECRET` (string): JWT Secret key. Default: `your-secret-whatever`


## Endpoints


### 1. `POST <BASE_PATH>/api/auth/verify`

```
400 Bad Request
{
  status: "failed",
  message: "Invalid OTP"
}

200 OK
{
    "status": "success",
    "data": {
        "name": "Charlot Brittney"
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ2hhcmxvdCBCcml0dG5leSIsImlhdCI6MTYxOTM5ODAzNn0."
    }
}
```

### 1. `GET <BASE_PATH>/api/auth/me`

```}

200 OK
{
    "status": "success",
    "data": {
        "name": "Charlot Brittney"
    }
}
```

