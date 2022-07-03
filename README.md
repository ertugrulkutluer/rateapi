<div id="top"></div>

<br />


<div align="center">


<h1 align="center">Rate API</h1>

</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation-with-docker">Installation with Docker</a></li>
        <li><a href="#installation-without-docker">Installation without Docker</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

An API written in ExpressJS with custom IP and token rate limiter.

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* Express JS
* MongoDB
* Redis Cloud
* Jest
* Docker
* Heroku

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Make sure you have NodeJS (v14) installed.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation (with Docker)

1. Clone the repo
   ```sh
   git clone https://github.com/ertugrulkutluer/rateapi.git
   ```
2. Build the Docker container
   ```js
   docker-compose build
   ```
3. Start
   ```js
   docker-compose up
   ```

### Installation (without Docker)

1. Clone the repo
   ```sh
   git clone https://github.com/ertugrulkutluer/rateapi.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run tests
   ```js
   npm test
   ```
4. Run `app.js`
   ```js
   npm start
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

* An IP has 100 credits within 1 hour to request any endpoint affected by the IP Rate Limiter middleware.
* A token has 200 credits within 1 hour to request any endpoint affected by the IP Rate Limiter middleware.
* Each endpoint can spend different credit points.

** Credits of endpoints can set through rate.limits.js file in config folder.

### Test Token
***eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcnlfdGltZSI6MTY1Njg2OTMwMDUxOSwiY3JlZGl0IjoxMDAsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjU2ODY5MzAwLCJleHAiOjE2ODg0MDUzMDB9.AXojTMLQz11g02jGBnioNycV0jjox6tGQoEHiJH4jyA***

### Test Server
**https://exp-rate-api.herokuapp.com/**

### Test Endpoints

* /users       **GET** **2 Credits**
* /users/:_id  **GET** **1 Credits**
* /orders      **GET** **3 Credits**
* /orders/:id  **GET** **1 Credits**
* /orders      **POST** **5 Credits**


### Example Request
```bash
curl --location --request GET 'https://exp-rate-api.herokuapp.com/api/v1/orders?populate=user' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcnlfdGltZSI6MTY1Njg2OTMwMDUxOSwiY3JlZGl0IjoxMDAsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjU2ODY5MzAwLCJleHAiOjE2ODg0MDUzMDB9.AXojTMLQz11g02jGBnioNycV0jjox6tGQoEHiJH4jyA'
   ```

### Example Response
   ```json
{
    "orders": {
        "docs": [
            {
                "items": [],
                "_id": "62c1dd8e5d1a7de72632604c",
                "delivered": true,
                "user": {
                    "_id": "62bf52bf254fd7f9f4a6dc9e",
                    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcnlfdGltZSI6MTY1NjcwNzUxNTg2MCwidG9rZW4iOjEwMCwiaWF0IjoxNjU2NzA3NTE1LCJleHAiOjE2NTY3OTM5MTV9.nV1EBe7L1PvtJAuD0ozJKvteudSVCsby_ZpRPw0DQLg",
                    "username": "ertugrul",
                    "role": "admin",
                    "active": true
                },
                "createdAt": "2022-07-03T18:50:30.603Z",
                "updatedAt": "2022-07-03T18:50:30.603Z"
            },
            {
                "_id": "62c1e69aeaad83b46f6fafb9",
                "items": [],
                "delivered": false,
                "user": {
                    "_id": "62bf6687254fd7f9f4a6dca3",
                    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcnlfdGltZSI6MTY1NjcwNzUxNTg2MCwidG9rZW4iOjEwMCwiaWF0IjoxNjU2NzA3NTE1LCJleHAiOjE2NTY3OTM5MTV9.nV1EBe7L1PvtJAuD0ozJKvteudSVCsby_ZpRPw0DQLg",
                    "username": "Natalie",
                    "role": "user",
                    "active": true
                },
                "createdAt": "2022-07-03T18:57:30.603Z",
                "updatedAt": "2022-07-03T18:57:30.603Z"
            },
        ],
        "totalDocs": 4,
        "offset": 0,
        "limit": 10,
        "totalPages": 2,
        "page": 1,
        "pagingCounter": 1,
        "hasPrevPage": false,
        "hasNextPage": false,
        "prevPage": null,
        "nextPage": null
    },
    "token": {
        "credit_left": 154,
        "expires_in": "39 mins"
    },
    "ip": {
        "credit_left": 54,
        "expires_in": "40 mins"
    }
}
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [X] Authentication
- [X] Rate Limiter
- [X] Docker
- [X] Deploy & Create CD/CD Pipelines on Heroku

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Linkedin - [@ertugrulkutluer](https://www.linkedin.com/in/kutluertugrul/)

Project Link: [rateapi/ertugrulkutluer@github](https://github.com/ertugrulkutluer/rateapi)

<p align="right">(<a href="#top">back to top</a>)</p>
