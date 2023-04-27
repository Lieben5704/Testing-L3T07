Much of the code in this project will have been generated when created with
Express. To see the code you have learnt in this task, focus on the following files:

1. Consider the file blog.model.js in the models directory to see how to create a schema with Mongoose.
2. See the file blog.controller.js file in the controllers directory.
    This is the file where we do most of our coding to be able to perform CRUD operations.
3. See the file app.js.
    You learn to connect to the database using Mongoose in this file.
    You will also see how the functions for manipulating in the blog.controller.js file are used here.

NOTE: some of the comments have been automatically generated in this code. Comments specific to this task
have been added. All these comments start with "HYPERION note:"


To test this file:
1. Copy the project folder to your local machine
2. npm install
3. Replace the string value for the const variable 'uri' in app.js with the connection string for your database.
4. npm start
5. Navigate to http://localhost:3000/add
6. Navigate to http://localhost:3000/
7. Navigate to http://localhost:3000/update
8. Navigate to http://localhost:3000/delete
==============================================================================================================
