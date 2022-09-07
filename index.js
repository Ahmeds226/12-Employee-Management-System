//  Imports:
const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

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
