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

// Menu:
const mainMenu = () => {
  inquirer
    .prompt({
      name: "menu",
      type: "list",
      message: "Please select what you would like to do",
      choices: ["View", "Add", "Update", "Delete", "End"],
    })
    .then((chosen) => {
      switch (chosen.main) {
        case "View":
          viewMenu();
          break;
        case "Add":
          addMenu();
          break;
        case "Update":
          updateMenu();
          break;
        case "Delete":
          deleteMenu();
          break;
        default:
          console.log("End");
          db.end();
      }
    });
};

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
