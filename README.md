# puddlewater-auth

PuddleWater micro project for Token Service Provider (TSP).  A REST api with Authentication returning a token.  

Tokenization reduces the value of stored credentials by removing consumers’ primary account numbers (PANs) from the transaction process. It does this by replacing them with a unique identifier called a token. The TSP is an entity within the ecosystem that is able to provide registered token requestors – for example other microservices having credentials – with ‘surrogate’ PAN values otherwise known as tokens. These tokens can only be used in a specific domain such as pre-defined channels.

### included

* micro
* jwt
* bcrypt
* mongodb

### run
```
Install once: npm install
```


```
MONGODB=<url> SECRET=<secret> npm start
```

```
npm run startdev
```

```
npm run startnodemon
```

### usage

```
Setup admin: user `admin:password` is created 
GET `localhost:3000/api/setup`

Get token
POST `localhost:3000/api/auth`
  with raw application/javascript
  with body 
  {
 	"username":"admin",
 	"password":"password"
  }
 
Get users
GET `localhost:3000/api/users`
  with header - authorization: <token from api/auth>

``` 

```
Using Visual Studio, setup .vscode/launch.json

{
    "version": "1.0.0",
    "configurations": [
        {
            "type": "node",
            "request": "attach",
            "name": "Attach to Process",
            "processId": "${command:PickProcess}",
            "port": 5858
        }
    ]
}

```


