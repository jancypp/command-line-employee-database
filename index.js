const inquirer = require('inquirer');
const mysql = require('mysql2');
require("console.table")
const db = mysql.createConnection(
  {
    host: '127.0.0.1',
    user: 'root',
    password: 'Cly@zk1ll',
    database: 'employee_db'
  })

db.connect((err) => {
  if (err) throw err;
  console.log(`Connected to the employee_db database.`)
  init()
})


function init() {
  inquirer.prompt([
    {
      type: "list",
      message: "Employee tracker",
      name: "options",
      choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee's role", "Exit application"]
    }
  ]).then(({ options }) => {
    switch (options) {
      case "View all departments":
        viewAllDepartments()
        break;
      case "View all roles":
        viewAllRoles()
        break;
      case "View all employees":
        viewAllEmployees()
        break;
      case "Add a department":
        addAllDepartments()
        break;
      case "Add a role":
        addAllRoles()
        break;
      case "Add an employee":
        addAllEmployees()
        break;
      case "Update an employee's role":
        updateAllRoles()
        break;
      default:
        db.end()
        process.exit(0)
    }
  })
}

function viewAllDepartments() {
  db.query("select d.id,d.departmentname, r.id,r.title, r.salary from department d left join role r on d.id = r.department_id;", function (err, data) {
    if (err) throw err;
    console.table(data)
    init()
  })
}
function viewAllRoles() {
  db.query("select e.id, e.first_name, e.last_name, r.id, r.title, r.salary, d.id, d.departmentname from employee e left join role r on e.role_id = r.id left join department d on r.department_id = d.id;", function (err, data) {
    if (err) throw err;
    console.table(data)
    init()
  })
}
function viewAllEmployees() {
  db.query('select e.id, e.first_name, e.last_name, r.id, r.title, r.salary, d.id, d.departmentname, m.first_name "Manager firstname",m.last_name "Manager Lastname" from employee e left join role r on e.role_id = r.id left join department d on r.department_id = d.id left join employee m on e.manager_id = m.id;', function (err, data) {
    if (err) throw err;
    console.table(data)
    init()
  })
}

