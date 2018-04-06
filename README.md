# ToDo APP
# Core Technologies
- NodeJS/HapiJS (Joi, Inert, Vision)
- Mysql
- React
- Redux
- Swagger
- Create-React-App

# How to run ToDo App
1. Clone the project - `git clone https://github.com/andela-jkanyua/todoApp.git` and `cd todoApp`
2. Update db `username` and `password` at `/server/config.json`
3. Run `mysql -u {your mysql user}` and create `todo_db_dev`, `todo_db_test`, `todo_db_prod`
4. Run `yarn sequelize db:migrate`
5. Run `yarn` on both client and server
6. On terminal run  `cp .env.example .env` and update your secret key
7. Start server `yarn start:server` on server directory
8. Start client `yarn start` on client directory
9. Access and test via Swagger at `http://localhost:5000/documentation`
10. Access client at `http://localhost:3000/`
11. Register & Login on client
12. Add your todo Items @octocat :+1:

# TODO
- [ ] Testing
- [ ] Result pagination
- [ ] Joi Validation Description
- [ ] PUT, DELETE User Routes
