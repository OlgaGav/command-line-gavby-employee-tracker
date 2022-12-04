// Packages needed for this application
let inquirer = require('inquirer');
const mysql = require('mysql2');
let Query = require('./lib/query');

let query = new Query;
console.log(query.viewAllRoles());

const options = [
  {
    name: "view all departments",
    query: query.viewAllDepartments(),
  },
  {
    name: "view all roles", 
    query: query.viewAllRoles(),
  },
  {
    name: "view all employees", 
    query: query.viewAllEmployees(),
  },
  {
    name: "view employees by manager",
    query: query.viewEmployeesByManager(),
  },
  {
    name: "view employees by department",
    query: query.viewEmployeesByDepartment(),
  },
  {
    name: "view the total utilized budget of a department",
    query: query.viewBudgetOfDepartment(),
  }, 
  {
    name: "add a department", 
    query: "",
  }, 
  {
    name: "add a role", 
    query: "",
  }, 
  {
    name: "add an employee",
    query: "",
  }, 
  {
    name: "update an employee role",
    query: "",
  }, 
  {
    name: "update employee managers",
    query: "",
  }, 
  {
    name: "delete department",
    query: "",
  }, 
  {
    name: "delete role",
    query: "",
  }, 
  {
    name: "delete employee",
    query: "",
  },
];

const optionsNames = options.map(option => option.name);
const optionsToChoose = [...optionsNames, "Exit"];

// create a connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'employee_tracker_db'
})

const header = `
                             ^
                _______     ^^^
               |xxxxxxx|  _^^^^^_
               |xxxxxxx| | [][] |
            ______xxxxx| |[][][]|
           |++++++|xxxx| |[][][]|      EMPLOYEE
           |++++++|xxxx| |[][][]|      TRACKER
           |++++++|_________  []|
           |++++++|=|=|=|=|=| []|
           |++++++|=|=|=|=|=| []|
___________|++++++|  _______|   _________   _________  _________
      _______________   ______________      ______________
__________________  ___________    __________________    ____________

`


console.log(header);

const askRequest = () => {
  inquirer.prompt([
    {name: "start",
    type: "list",
    message: "What would you like to do?",
    choices: optionsToChoose,
    }
  ])
  .then((res) => {
    executeRequest(res.start);
  })
}

const executeRequest = (queryRequest) => {
  switch (queryRequest) {
    // view all departments
    case options[0].name: 
      connection.query(options[0].query, (err, results) => {
        if (err) {
          console.log("error in query sqlViewAllDepartments");
          return;
        }
        console.table(results);
        askRequest();
      })
      break;
    // view all roles  
    case options[1].name: 
      connection.query(options[1].query, (err, results) => {
        if (err) {
          console.log("error in query");
          return;
        }
        console.table(results);
        askRequest();
      })
      break;
    // view all employees  
    case optionsNames[2]: 
      connection.query(options[2].query, (err, results) => {
        if (err) {
          console.log("error in query");
          return;
        }
        console.table(results);
        askRequest();
      })
      break;
    // view employees by manager
    case optionsNames[3]: 
      inquirer.prompt({
        type: "input",
        name: "manager_id",
        message: "Please enter the id of the manager: "
      }).then((res) => {
        let manager_id = res.manager_id;
        connection.query(options[3].query, manager_id, (err, results) => {
          if (err) {
            console.log("error in query");
            return;
          }
          console.table(results);
          askRequest();
        })
      })
      break;
    // view employee by department
    case optionsNames[4]: 
    inquirer.prompt({
      type: "input", 
      name: "department_id",
      message: "Please enter the id of the department: "
    }).then((res) => {
      let department_id = res.department_id;
      connection.query(options[4].query, department_id, (err, results) => {
        if (err) {
          console.log("error in query");
          return;
        }
        console.table(results);
        askRequest();
      })
    })
      break;
    case optionsNames[5]: 
      connection.query(options[5].query, (err, results) => {
        if (err) {
          console.log("error in query");
          return;
        }
        console.table(results);
        askRequest();
      })
      break;
    case optionsNames[6]: 
      connection.query(options[6].query, (err, results) => {
        if (err) {
          console.log("error in query");
          return;
        }
        console.table(results);
        askRequest();
      })
      break;      
    case optionsNames[7]: 
      connection.query(options[7].query, (err, results) => {
        if (err) {
          console.log("error in query");
          return;
        }
        console.table(results);
        askRequest();
      })
      break;      
    case optionsNames[8]: 
      connection.query(options[8].query, (err, results) => {
        if (err) {
          console.log("error in query");
          return;
        }
        console.table(results);
        askRequest();
      })
      break;
    case optionsNames[9]: 
      connection.query(options[9].query, (err, results) => {
        if (err) {
          console.log("error in query");
          return;
        }
        console.table(results);
        askRequest();
      })
      break;
    case optionsNames[10]: 
      connection.query(options[10].query, (err, results) => {
        if (err) {
          console.log("error in query");
          return;
        }
        console.table(results);
        askRequest();
      })
      break;
    case optionsNames[11]: 
      connection.query(options[11].query, (err, results) => {
        if (err) {
          console.log("error in query");
          return;
        }
        console.table(results);
        askRequest();
      })
      break;
    default:
      console.log("no option selected");
      console.log(queryRequest);
  }
}

askRequest();
