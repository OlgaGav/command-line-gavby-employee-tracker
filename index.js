// Packages needed for this application
let inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const optionsToChoose = [
  "view all departments", 
  "view all roles", 
  "view all employees", 
  "add a department", 
  "add a role", 
  "add an employee",
  "update an employee role",
  "update employee managers",
  "view employees by manager",
  "view employees by department",
  "delete department",
  "delete role",
  "delete employee",
  "view the total utilized budget of a department",
];

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
__________________  ___________    __________________    ____________`


console.log(header);

const initApp = () => {
  inquirer.prompt([
    {name: "start",
    type: "list",
    message: "What would you like to do?",
    choices: optionsToChoose,
    }
  ])
  .then((res) => {
    console.log(res.start)
  })
}

initApp();
// ex1
// var values = [
//   ['max', 20],
//   ['joe', 30]
// ];
// console.table(['name', 'age'], values);
// ex2
// console.table([
//   {
//     name: 'foo',
//     age: 10
//   }, {
//     name: 'bar',
//     age: 20
//   }
// ]);