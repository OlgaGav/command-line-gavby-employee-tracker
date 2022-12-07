const inquirer = require('inquirer');
const Query = require('./lib/query');
const View = require('./lib/view');
const ViewEmployeesByManager = require('./lib/viewEmployeesByManager');
const ViewEmployeesByDepartment = require('./lib/viewEmployeesByDepartment');
const UpdateEmployeeManager = require('./lib/UpdateEmployeeManager');
const UpdateEmployeeRole = require('./lib/UpdateEmployeeRole');
const AddRole = require('./lib/addRole');
const AddEmployee = require('./lib/addEmployee');
const AddDepartment = require('./lib/addDepartment');
const DeleteRole = require('./lib/deleteRole');
const DeleteEmployee = require('./lib/deleteEmployee');
const DeleteDepartment = require('./lib/deleteDepartment');
const query = new Query();
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

`;

let userOptions = [];
let viewAllDepartments = new View(`01`, `view all departments`, query.viewAllDepartments());
let viewAllRoles = new View(`02`, `view all roles`, query.viewAllRoles());
let viewAllEmployees = new View(`03`, `view all employees`, query.viewAllEmployees());
let viewEmployeesByManager = new ViewEmployeesByManager(`04`, `view employees by manager`, query.viewEmployeesByManager());
let viewEmployeesByDepartment = new ViewEmployeesByDepartment(`05`, `view employees by department`, query.viewEmployeesByDepartment());
let viewBudgetOfDepartment = new View(`06`, `view the total utilized budget of a department`, query.viewBudgetOfDepartment());
let updateEmployeeManager = new UpdateEmployeeManager(`07`, `update the manager of employee`, query.updateEmployeeManager());
let updateEmployeeRole = new UpdateEmployeeRole(`08`, `update the role of employee`, query.updateEmployeeRole());
let addDepartment = new AddDepartment(`09`, `add new department`, query.addDepartment());
let addRole = new AddRole(`10`, `add new role`, query.addRole());
let addEmployee = new AddEmployee(`11`, `add new employee`, query.addEmployee());
let deleteDepartment = new DeleteDepartment(`12`, `delete department`, query.deleteDepartment());
let deleteRole = new DeleteRole(`13`, `delete role`, query.deleteRole());
let deleteEmployee = new DeleteEmployee(`14`, `delete employee`, query.deleteEmployee());

userOptions.push(
  viewAllDepartments, 
  viewAllRoles, 
  viewAllEmployees, 
  viewEmployeesByManager,
  viewEmployeesByDepartment,
  viewBudgetOfDepartment,
  updateEmployeeManager,
  updateEmployeeRole,
  addDepartment,
  addRole,
  addEmployee,
  deleteDepartment,
  deleteRole,
  deleteEmployee,
  );

const options = userOptions.map(option => option.name);
const listOfOptions = [...options, "Close"]

const askUser = async () => {
  let res = await inquirer.prompt([
    {
      type: "list",
      name: "option",
      message: "What woud you like to do?",
      choices: listOfOptions,
    }
  ])
  if (res.option === "Close") {
    wantToExit();
  } else {
    const selectedOption = userOptions.find(option => option.name === res.option);
    showResult(selectedOption);
  }
}

const showResult = async (selectedOption) => {
  await selectedOption.executeQuery();
  await askUser();
}

const wantToExit = () =>
  inquirer
    .prompt([
      {
        name: "exit",
        type: "confirm",
        message: "Do you want to exit the application?",
      },
    ])
    .then((answer) => {
      if (answer.exit) {
        console.log("Thank you for using this application. Press CRTL+C to end the process")
      } else {
        askUser();
      }
    });

console.log(header);
askUser();
