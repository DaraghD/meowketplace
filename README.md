# meowketplace - CS4116 Software Development Project
A business marketplace website with a focus on pets  
**Site is http, chrome does not allow http sites, firefox is recommended**
# Development
**main** branch is used to deploy the site at meowketplace.ie
- Backend - Java Springboot
- Frontend - React
- Database - MySQL/MariaDB

`docker-compose up` to start the database, backend and frontend based on main branch  
`docker-compose -f local-compose.yml up --build` to build based off of ur local changes, you will need to change the url in the frontend dockerfile to be localhost, otherwise you will be using production backend and not your own. ( Don't commit this change )

Can also run the projects manually with npm for frontend and maven + java for backend  
Postman is recommended for backend development as you can easily test the endpoints  
Mockoon can help with frontend development by mocking backend endpoints and generating test data

# Artifacts
[Trello](https://trello.com/b/8407TRM7/cs4116group9businessservicemarketplace)  
[Design document](https://ulcampus-my.sharepoint.com/:w:/r/personal/22351159_studentmail_ul_ie/Documents/Document.docx?d=w055cb39d5d4740408d17462c90b145d5&csf=1&web=1&e=COqaev)
