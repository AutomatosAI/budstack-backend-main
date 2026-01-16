<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
<p align="center">
<img height='150px' width='150px' style="background-color:white;border-radius:100%;padding:8px" src="./src/assets/icon/res/app-icon1.png" alt="Logo" />
</p>
<h1 align="center">Dr Green Backend</h1>

  <p align="center">
    Here lies the backend for project Dr Green
    <br />
    <br />
    <a href="https://api.drgreennft.com/api/v1/public/healthStatus">View Demo</a>
    ·
    <a href="https://github.com/DrGreenNft/dr-green-backend/issues">Report Bug</a>
    
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Dr Green

## Getting Started

Please follow the instructions to run the service on you local machine / setup on a server

### Prerequisites

Required system dependencies:

- Node version >= 18.16.0
- Npm version >= 8.6.0
- Operation Systems - Window / Linux

### Installation

1. Clone the repository and change the directory to the root of the source code.

   ```sh
   git clone https://github.com/DrGreenNft/dr-green-backend.git
   ```

2. Install NPM packages.
   ```sh
   npm install
   ```
3. Set your API Keys in `.env` file.

   ```js
   // STAGING
    DATABASE_URL = ""
    DEV_PORT = 3000
    DEV_JWT_SECRET_LOGIN = ""
    DEV_JWT_SECRET_VERIFY_EMAIL = ""
    DEV_JWT_SECRET_2FA = ""
    DEV_NFT_CONTRACT_ID = ''
    DEV_NFT_MARKETPLACE_CONTRACT_NAME = ""
    DEV_NFT_MARKETPLACE_CONTRACT_ID = ''
    DEV_CONTRACT_DEPLOYED_CHAIN_ID = 11155111
    DEV_RPC_PROVIDER_URL = ""

    #AWS Credentials
    DEV_AWS_BUCKET_NAME = 'app-profile'
    DEV_AWS_ACCESS_KEY_ID = 'FDFGHJKJtyhgf757cVB'
    DEV_AWS_SECRET_ACCESS_KEY = 'Vdstgyf7yeh8uwhdbUHGFJs549jsyHhe4341X'
    DEV_AWS_REGION='ap-south-1'
    DEV_SENDGRID_API_KEY = 'SG.6f5tujnhvGFYGBGRuytrfvcXDFGHNjuytgvcfgbhDTYu76ibvfh'
    DEV_ADMIN_EMAIL = "xyz.admin@gmail.com"
    DEV_FRONTEND_URL = 'https://marketplace.drgreennft.com'
   ```

<h2>Technologies Used</h2>
<ul>
<li>NestJs</li>
<li>TypeScript</li>
<li>AWS</li>
<li>SendGrid</li>
<li>PostgresSql</li>
</ul>
<h2>Project Status</h2>
<p>In Progress</p>

<!-- USAGE EXAMPLES -->

## Usage

To start the service, run the following command as per needed:

In the project directory, you can run:

### `npm run start:dev`

Runs the app in the development mode.\
Open [http://localhost:3000/api/v1/public/healthStatus] to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

<h2>Contact</h2>
<p><span style="margin-right: 30px;"></span><a href="https://github.com/DrGreenNft/dr-green-backend.git"><img target="_blank" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" style="width: 10%;"></a></p>
<p align="right">(<a href="#readme-top">back to top</a>)</p>
