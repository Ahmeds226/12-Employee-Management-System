// Imports:
const mysql = require("mysql2");
const inquirer = require("inquirer");
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
  mainMenu();
});

// Main menu:
function mainMenu() {
  prompt([
    {
      type: "list",
      name: "choice",
      message: "Please select what you would like to do",
      choices: [
        {
          name: "View",
          value: "viewMenu",
        },
        {
          name: "Add",
          value: "addMenu",
        },
        {
          name: "Update",
          value: "updateMenu",
        },
        {
          name: "Delete",
          value: "deleteMenu",
        },
      ],
    },
  ]).then((res) => {
    let choice = res.choice;
    switch (choice) {
      case "viewMenu":
        viewMenu();
        break;
      case "addMenu":
        addMenu();
        break;
      case "updateMenu":
        updateMenu();
        break;
      case "deleteMenu":
        deleteMenu();
        break;
    }
  });
}

// View main menu:
function viewMenu() {
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
    }
  });
}

// View functions:
// View all departments:
function viewAllDepartments() {
  db.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
  });
  mainMenu();
}

// View all roles:
function viewAllRoles() {
  db.query("SELECT * FROM role", (err, res) => {
    console.table(res);
  });
  mainMenu();
}

// View all employees:
function viewAllEmployees() {
  db.query("SELECT * FROM employee", (err, res) => {
    console.table(res);
  });
  mainMenu();
}

// Add main menu:
function addMenu() {
  prompt([
    {
      type: "list",
      name: "choice",
      message: "Please select what you would like to do",
      choices: [
        {
          name: "Add a Department",
          value: "addDepartment",
        },
        {
          name: "Add a Role",
          value: "addRole",
        },
        {
          name: "Add An Employee",
          value: "addEmployee",
        },
      ],
    },
  ]).then((res) => {
    let choice = res.choice;
    switch (choice) {
      case "addDepartment":
        addDepartment();
        break;
      case "addRole":
        addRole();
        break;
      case "addEmployee":
        addEmployee();
        break;
    }
  });
}
