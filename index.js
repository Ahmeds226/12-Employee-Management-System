//  Imports:
const inquirer = require("inquirer");
const mysql = require("mysql2");
const Table = require("console.table");
const Connection = require("mysql/lib/Connection");
require("dotenv").config();

// Bring in the database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "employee_db",
});

db.connect((error) => {
  if (error) throw error;
  getStarted();
});

function getStarted() {
  inquirer.prompt([
    {
      type: "list",
      name: "options",
      message: "Welcome to the employee tracker! What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a Role",
        "Add an Employee",
        "Update an Employee's Role",
      ],
    },
  ]);
}

getStarted();
