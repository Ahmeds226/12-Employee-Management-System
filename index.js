// Imports:
const mysql = require("mysql2");
const { prompt } = require("inquirer");
const consoleTable = require("console.table");

// Database connection:
const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employees_db",
});

db.connect(function (err) {
  if (err) throw err;
  console.table("Welcome to Employee Management System");
});

// Questions:
function letsStart() {
  prompt([
    {
      type: "list",
      name: "choice",
      message: "Please select what you would like to do",
      choices: [
        {
          name: "View all Departments",
          value: "viewAllDepartments",
        },
        {
          name: "View all Roles",
          value: "viewAllRoles",
        },
        {
          name: "View all Employees",
          value: "viewAllEmployees",
        },
        {
          name: "Add a new Department",
          value: "addDepartment",
        },
        {
          name: "Add a new Role",
          value: "addRole",
        },
        {
          name: "Add a new Employee",
          value: "addEmployee",
        },
        {
          name: "Update an existing Employee Role",
          value: "updateEmployeeRole",
        },
      ],
    },
  ]).then((res) => {
    let choice = res.choice;
    switch (choice) {
      case "viewAllDepartments":
        viewAllDepartments();
        break;
      case "viewAllRoles":
        viewAllRoles();
        break;
      case "viewAllEmployees":
        viewAllEmployees();
        break;
      case "addDepartment":
        addDepartment();
        break;
      case "addRole":
        addNewRole();
        break;
      case "addEmployee":
        addEmployee();
        break;
      case "updateEmployeeRole":
        updateEmployeeRole();
        break;
    }
  });
}

letsStart();
