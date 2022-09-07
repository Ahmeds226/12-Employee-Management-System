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

// Main menu function:
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

// View sub menu function:
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
        {
          name: "Back to Main Menu",
          value: "mainMenu",
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
      case "mainMenu":
        mainMenu();
        break;
    }
  });
}

// View functions:
// View all departments function:
function viewAllDepartments() {
  db.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
  });
  mainMenu();
}

// View all roles function:
function viewAllRoles() {
  db.query("SELECT * FROM role", (err, res) => {
    console.table(res);
  });
  mainMenu();
}

// View all employees function:
function viewAllEmployees() {
  db.query("SELECT * FROM employee", (err, res) => {
    console.table(res);
  });
  mainMenu();
}

// Add sub menu function:
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
          name: "Add an Employee",
          value: "addEmployee",
        },
        {
          name: "Back to Main Menu",
          value: "mainMenu",
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
      case "mainMenu":
        mainMenu();
        break;
    }
  });
}

// Add functions:
// Add department function:
function addDepartment() {
  prompt([
    {
      type: "input",
      name: "choice",
      message:
        "Please enter the name of the department that you would like to add",
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

// Add a role function:
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
        console.log("Role has been successfully added!");
      }
    );
    mainMenu();
  });
}

// Add employee function:
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

// Update Employee role function:
function updateEmployeeRole() {
  const roleData = [];

  db.query("SELECT * FROM role", (err, result) => {
    if (err) throw err;

    const roleData = result.map((role) => {
      return {
        name: role.title,
        value: role.id,
      };
    });

    db.query("SELECT * FROM employee", (err, res) => {
      if (err) throw err;

      const employeeData = res.map((employee) => {
        return {
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        };
      });

      inquirer
        .prompt([
          {
            type: "list",
            name: "employee",
            message:
              "Please select the employee whose role you would like to update",
            choices: employeeData,
          },
          {
            type: "list",
            name: "role",
            message: "Please select their new role",
            choices: roleData,
          },
        ])
        .then((res) => {
          console.log(res.employee);
          console.log(res.role);
          db.query(
            "UPDATE employee SET employee.role_id = (?) WHERE employee.id = (?)",
            [res.role, res.employee],
            (err, res) => {
              if (err) throw err;

              console.log("Successfully updated the employee's role");
              mainMenu();
            }
          );
        });
    });
  });
}

// End the tracker function:
const endFunction = () => {
  console.log("Employee tracker session ended");
  db.end();
};
