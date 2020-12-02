<p align="center">
<a href="http://www.soyhenry.com"><img height="100" src="https://i.ibb.co/0BBdnqK/imagen-2020-12-02-102054.png" alt="Henry Talent Logo" align="center" style="border-radius:10px"></a>
</p>

<p align="center">
  <img src="https://visitor-badge.glitch.me/badge?page_id=lukasver.HenryTalent" align="center">
</p>


---

**Henry talent** is the final graduation project at soyHenry.com bootcamp developed by  WebFT-05 Group 5, following professional coding guidelines and practicies.

It features a web application that helps Henry staffmembers to search and choose different graduated students(candidates) allowing them to create unique dossiers that are sent to HR recruiters through an e-mail with a unique view link.
Candidate's profiles can be filtered by different attributes and skills allowing selector and recruiters to swiftly find the ones that suits their needs.
On the back, it also allows Henry staff members to CRUD candidate profiles that are ready to be selected and bulk create candidates by uploading a csv file.

## DevLeader
[<img height="40" src="https://avatars3.githubusercontent.com/u/14017665?s=64&v=4" alt="MC">](https://github.com/MartinCura "Martin Cura")

## Contributors

[<img height="40" src="https://avatars0.githubusercontent.com/u/63676303?s=64&v=4" alt="LV">](https://github.com/lukasver "Lucas Verdiell")
[<img height="40" src="https://avatars3.githubusercontent.com/u/68471168?s=64&v=4" alt="FC">](https://github.com/FedericoCalderon "Federico Calderon")
[<img height="40" src="https://avatars0.githubusercontent.com/u/15040221?s=64&v=4" alt="DT">](https://github.com/diegotolaba09 "Diego Tolaba")
[<img height="40" src="https://avatars1.githubusercontent.com/u/61234645?s=64&v=4" alt="LC">](https://github.com/Kuinoso "Leonardo Cifuentes")
[<img height="40" src="https://avatars1.githubusercontent.com/u/32738757?s=64&v=4" alt="SL">](https://github.com/SebaLevin "Sebastian Levin")
[<img height="40" src="https://avatars1.githubusercontent.com/u/66705822?s=64&v=4" alt="MF">](https://github.com/MatiasFunes94 "Matias Funes")
[<img height="40" src="https://avatars1.githubusercontent.com/u/66718960?s=64&v=4" alt="BP">](https://github.com/BryanCPineda "Bryan Pineda")
[<img height="40" src="https://avatars2.githubusercontent.com/u/66442589?s=64&v=4" alt="CL">](https://github.com/cristianluca19 "Cristian Lucatti")

[henry]: "soyhenry.com"
[lucas]: "https://github.com/lukasver"
[fede]: "https://github.com/FedericoCalderon"
[diego]: "https://github.com/diegotolaba09"
[leo]: "https://github.com/Kuinoso"
[seba]: "https://github.com/SebaLevin"
[mati]: "https://github.com/MatiasFunes94"
[bryan]: "https://github.com/BryanCPineda"
[cristian]: "https://github.com/cristianluca19"
[martin]: "https://github.com/MartinCura"


## Project Objetives

- Develop a JavaScript App from scratch.
- Reassure and connect all learned concepts in the Bootcamp. 
- Practice GIT workflow / team work in a real working environment, following professional guidelines.
- Use AGILE methodologies & SCRUM
- Learn good programming practices.
- Implement testing to deliver trusty code.

# Features

### Stack of Technologies

|    Frontend 	  |  Backend 	  |
|---        	    |---      	  |
|Javascript (ES6) |  NodeJS  	  |
|React          	|  Express 	  |
|Redux          	|  Typescript |
|Material-ui      |  OpenAPI 	  |
|sweetalert2      |  MVC 	      |
|Prop-types       |  Mocha/Chai	|

### Database:
PostgreSQL & Sequelize ORM

### Other libraries & tech:
Prettier, Eslint, CI, Faker, Malgun-js, Multer.

## **Starting Instructions** 

### **BoilerPlate**

The boilerPlate has two folders: `api` and `client`.

Inside `api` you must create a file called: `.env` 
that contains the following variables: 

```
APP_ID=talent-api 
PORT= your_own_port
LOG_LEVEL=debug
REQUEST_LIMIT=100kb
SESSION_SECRET= secretword

OPENAPI_SPEC=/api/v1/spec

DB_USER=postgresuser
DB_PASSWORD=postgrespassword
DB_HOST=localhost
DB_PORT=postgresport
DB_NAME=data_base_name
DB_URL=back_end_url exp(http://localhost:3001)

CLIENT_URL=front_end_url exp(http://localhost:3000)

NODE_ENV=development
TALENT_URL_ROOT =front_end_url
MAILGUN_DOMAIN = mailgun_domain
MAILGUN_APIKEY = mailgun_apikey
MAILGUN_TALENT = mailgun_email

```
You have to replace `your_own_port`, `postgresuser`, `postgrespassword`, `postgresport`, and `MAILGUN*`  with your own credentials to connect to postgreSQL database, and Mailgun services. This file will be ignored by github, as it contains sensitive information (the credentials).

The SESSION_SECRET is a random security keyword, you can change or keep it.  

### **Next** 

### _Connect the data base_

 - Go to your postgreSQL database manager and create a new database. Replace `"data_base_name"` in `.env` file with the name of the new database.

 ### _Install the necesary package to run it_

- Open the project on your console
    + Inside `api` folder, run the command line, `npm install` / `yarn install` 
    + Inside `client` folder, run the command line, `npm install` / `yarn install`.

### _Test the project_

- Open the project on your console
    + Inside `api` folder, run the command line, `npm run test` / `yarn run test`.

### _Run the project_

- Open the project on your console
    + Inside `api` folder, run the command line, `npm run dev` / `yarn run dev`.
        
    + Inside `client` folder, run the command line, `npm start` (go to http://localhost:3000/). 

### _Fill the database_

- Open the project on your console
    + Inside `api` folder, run the command line, `npm run seed` / `yarn run seed` to fill the database.
    
# Project Screens 

- Home 
![home](https://user-images.githubusercontent.com/66705822/100810450-4f0bd600-3417-11eb-9f30-374d0d31a9f6.png)

- Filter Candidates
![filter-candidates](https://user-images.githubusercontent.com/66705822/100810468-59c66b00-3417-11eb-816b-27b6f219d99e.png)

- Filter Skill Technologies 
![filter-skill-technologies](https://user-images.githubusercontent.com/66705822/100810484-5fbc4c00-3417-11eb-8394-19bc30fcf6a1.png)

- Folder Preview 
![folder-preview](https://user-images.githubusercontent.com/66705822/100810502-664ac380-3417-11eb-8517-0d7c594da2c6.png)

- Add Recruiter
![add-recruiter](https://user-images.githubusercontent.com/66705822/100810516-6c40a480-3417-11eb-89d9-b426680fb8e5.png)

- Cadidates CRUD 
![crud-candidates](https://user-images.githubusercontent.com/66705822/100810521-6fd42b80-3417-11eb-8ea1-91d6a04129b6.png)

- Folders CRUD
![crud-folders](https://user-images.githubusercontent.com/66705822/100810526-72368580-3417-11eb-92bf-d1d4b4d87e2f.png)

- Skills CRUD
![crud-skills](https://user-images.githubusercontent.com/66705822/100810533-75317600-3417-11eb-8aea-b4a4f30e623c.png)

[henry]: "soyhenry.com"
[lucas]: "https://github.com/lukasver"
[fede]: "https://github.com/FedericoCalderon"
[diego]: "https://github.com/diegotolaba09"
[leo]: "https://github.com/Kuinoso"
[seba]: "https://github.com/SebaLevin"
[mati]: "https://github.com/MatiasFunes94"
[bryan]: "https://github.com/BryanCPineda"
[cristian]: "https://github.com/cristianluca19"
[martin]: "https://github.com/MartinCura"
