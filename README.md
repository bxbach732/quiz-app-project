# quizz-app-project

The application is a simple implementation of a question creating an answering system built using deno, oak, and PostgreSQL. The application uses a three-tier architecture (client, server, and database) and a layered architecture with 4 layers (views, database, controllers, and services). The users can perform basic authenticating actions like registering and logging in. After being authenticated, the users can create/remove topics (if the user is an admin), create/remove questions and answer options. More than that, the users can answering the questions themselves by going to the quiz section. 

It is recommended for the user to register for a ElephantSQL database and use its credentials for the .env file

You can run the application by either using:
- **docker-compose up** \
or by accessing the folder that contains run-locally.js and use:
- **deno run --allow-all --watch run-locally.js**

* Running the unit tests: same as running the application, you'll have to navigate to the drill-and-practice folder first. After that, you can run **deno test --allow-all** to run the unit tests.
