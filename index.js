const inquirer = require("inquirer");
const mysql = require("mysql2");
require("console.table");
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "Cly@zk1ll",
  database: "employee_db",
});

db.connect((err) => {
  if (err) throw err;
  console.log(`Connected to the employee_db database.`);
  init();
});

function init() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Employee tracker",
        name: "options",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee's role",
          "Exit application",
        ],
      },
    ])
    .then(({ options }) => {
      switch (options) {
        case "View all departments":
          viewAllDepartments();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "View all employees":
          viewAllEmployees();
          break;
        case "Add a department":
          addAllDepartments();
          break;
        case "Add a role":
          addAllRoles();
          break;
        case "Add an employee":
          addAllEmployees();
          break;
        case "Update an employee's role":
          updateAllRoles();
          break;
        default:
          db.end();
          process.exit(0);
      }
    });
}

function viewAllDepartments() {
  db.query(
    "select d.id,d.departmentname, r.id,r.title, r.salary from department d left join role r on d.id = r.department_id;",
    function (err, data) {
      if (err) throw err;
      console.table(data);
      init();
    }
  );
}
function viewAllRoles() {
  db.query(
    "select e.id, e.first_name, e.last_name, r.id, r.title, r.salary, d.id, d.departmentname from employee e left join role r on e.role_id = r.id left join department d on r.department_id = d.id;",
    function (err, data) {
      if (err) throw err;
      console.table(data);
      init();
    }
  );
}
function viewAllEmployees() {
  db.query(
    'select e.id, e.first_name, e.last_name, r.id, r.title, r.salary, d.id, d.departmentname, m.first_name "Manager firstname",m.last_name "Manager Lastname" from employee e left join role r on e.role_id = r.id left join department d on r.department_id = d.id left join employee m on e.manager_id = m.id;',
    function (err, data) {
      if (err) throw err;
      console.table(data);
      init();
    }
  );
}

function addAllDepartments() {
  inquirer
    .prompt({
      name: "departmentName",
      type: "input",
      message: "Enter the name of the new department:",
    })
    .then((answer) => {
      db.query(
        "INSERT INTO department SET ?",
        { name: answer.departmentName },
        function (err, data) {
          if (err) throw err;
          console.log(`Added ${answer.departmentName} to the database.`);
          init();
        }
      );
    });
}

function addAllRoles() {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "Enter the title of the new role:",
      },
      {
        name: "salary",
        type: "input",
        message: "Enter the salary of the new role:",
      },
      {
        name: "department_id",
        type: "input",
        message: "Enter the department ID for the new role:",
      },
    ])
    .then((answer) => {
      db.query(
        "INSERT INTO role SET ?",
        {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.department_id,
        },
        function (err, data) {
          if (err) throw err;
          console.log(`Added ${answer.title} to the database.`);
          init();
        }
      );
    });
}

function addAllEmployees() {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "Enter the first name of the new employee:",
      },
      {
        name: "lastName",
        type: "input",
        message: "Enter the last name of the new employee:",
      },
      {
        name: "role_id",
        type: "input",
        message: "Enter the role ID for the new employee:",
      },
      {
        name: "manager_id",
        type: "input",
        message: "Enter the manager ID for the new employee:",
      },
    ])
    .then((answer) => {
      db.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: answer.role_id,
          manager_id: answer.manager_id,
        },
        function (err, data) {
          if (err) throw err;
          console.log(
            `Added ${answer.firstName} ${answer.lastName} to the database.`
          );
          init();
        }
      );
    });
}

function updateAllRoles() {
  db.query("SELECT * FROM employee", function (err, employees) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "employeeId",
          type: "list",
          message: "Select the employee to update:",
          choices: employees.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
          })),
        },
        {
          name: "roleId",
          type: "input",
          message: "Enter the new role ID for the employee:",
        },
      ])
      .then((answer) => {
        db.query(
          "UPDATE employee SET ? WHERE ?",
          [{ role_id: answer.roleId }, { id: answer.employeeId }],
          function (err, data) {
            if (err) throw err;
            console.log(`Updated employee role.`);
            init();
          }
        );
      });
  });
}
