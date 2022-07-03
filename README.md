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

* An IP can send a maximum of 100 requests within 1 hour to each endpoint affected by the Rate Limiter middleware.
* A token can request a maximum of 200 times in 1 hour to each endpoint affected by the Rate Limiter middleware.

### Test Token
***eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcnlfdGltZSI6MTY1NjcwNzUxNTg2MCwidG9rZW4iOjEwMCwiaWF0IjoxNjU2NzA3NTE1LCJleHAiOjE2NTY3OTM5MTV9.nV1EBe7L1PvtJAuD0ozJKvteudSVCsby_ZpRPw0DQLg***

### Test Endpoints

* /users
* /users/:_id
* /orders
* /orders/:id


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [X] Authentication
- [X] Rate Limiter
- [X] Docker

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Linkedin - [@ertugrulkutluer](https://www.linkedin.com/in/kutluertugrul/)

Project Link: [rateapi/ertugrulkutluer@github](https://github.com/ertugrulkutluer/rateapi)

<p align="right">(<a href="#top">back to top</a>)</p>
