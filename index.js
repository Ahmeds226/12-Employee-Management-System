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
          name: "Update an Employee's Role",
          value: "updateEmployeeRole",
        },
        {
          name: "End tracker",
          value: "endFunction",
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
      case "updateEmployeeRole":
        updateEmployeeRole();
        break;
      case "endFunction":
        endFunction();
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
        addNewRole();
        break;
      case "addEmployee":
        addEmployee();
        break;
    }
  });
}

// Add functions:
// Add department:
function addDepartment() {
  prompt([
    {
      type: "input",
      name: "choice",
      message:
        "Please enter the name of the deparment that you woudl like to add",
    },
  ]).then((res) => {
    let answer = res.choice;
    db.query(
      "INSERT INTO department (name) VALUES (?)",
      [answer],
      (err, res) => {
        if (err) throw err;
      }
    );
    mainMenu();
  });
}

// Add a role:
function addNewRole() {
  let departmentID = [];
  let departmentName = [];
  db.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;

    res.forEach(({ id }) => {
      departmentID.push(id);
    });

    res.forEach(({ name }) => {
      departmentName.push(name);
    });
    addRole(departmentID, departmentName);
  });
}

function addRole(departmentID, departmentName) {
  let id = "";
  prompt([
    {
      type: "input",
      name: "roleName",
      message: "Please enter the role you would like to add",
    },
    {
      type: "input",
      name: "salary",
      message: "Please enter the salary for this position",
    },
    {
      type: "list",
      name: "departmentName",
      message: "Please enter the role's designated department",
      choices: departmentName,
    },
  ]).then((answers) => {
    for (let i = 0; i < departmentID.length; i++) {
      if (answers.departmentName === departmentName[i]) {
        id += departmentID[i];
        console.log(id);
      }
    }
    db.query(
      "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
      [answers.roleName, answers.salary, parseInt(id)],
      (err, res) => {
        if (err) throw err;
        console.log("Role has been successfully added");
      }
    );
    mainMenu();
  });
}

// Add employee:
function addEmployee() {
  let addNewRoles = [];

  db.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;

    addNewRole = res.map((role) => {
      return {
        name: role.title,
        value: role.id,
      };
    });
    inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message:
            "Please enter the first name of the new employee you would like to add",
        },
        {
          type: "input",
          name: "last_name",
          message:
            "Please enter the last name of the new employee you would like to add",
        },
        {
          type: "list",
          name: "role_id",
          message: "Please select the role of the new employee",
          choices: addNewRole,
        },
        {
          type: "input",
          name: "manager",
          message: "Please enter the manager's ID",
        },
      ])
      .then((answers) => {
        db.query(
          "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
          [
            answers.first_name,
            answers.last_name,
            answers.role_id,
            answers.manager,
          ],
          (err, res) => {
            if (err) throw err;

            console.log("Successfully added a new employee!");
          }
        );
        mainMenu();
      });
  });
}

// End the tracker function:
const endFunction = () => {
  console.log("End");
  db.end();
};
