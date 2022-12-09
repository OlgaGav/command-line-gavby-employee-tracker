const inquirer = require("inquirer");
const Query = require("./lib/query");
const View = require("./lib/view");
const ViewEmployeesByManager = require("./lib/viewEmployeesByManager");
const ViewEmployeesByDepartment = require("./lib/viewEmployeesByDepartment");
const UpdateEmployeeManager = require("./lib/UpdateEmployeeManager");
const UpdateEmployeeRole = require("./lib/UpdateEmployeeRole");
const AddRole = require("./lib/addRole");
const AddEmployee = require("./lib/addEmployee");
const AddDepartment = require("./lib/addDepartment");
const DeleteRole = require("./lib/deleteRole");
const DeleteEmployee = require("./lib/deleteEmployee");
const DeleteDepartment = require("./lib/deleteDepartment");
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
// create objects with name of option that will be avaiable for user, 
// and function which has corresponding sql query
let userOptions = [];
let viewAllDepartments = new View(`01`,`View all departments`, query.viewAllDepartments());
let viewAllRoles = new View(`02`, `View all roles`, query.viewAllRoles());
let viewAllEmployees = new View(`03`, `View all employees`, query.viewAllEmployees());
let viewEmployeesByManager = new ViewEmployeesByManager(`04`, `View employees by manager`, query.viewEmployeesByManager());
let viewEmployeesByDepartment = new ViewEmployeesByDepartment(`05`, `View employees by department`, query.viewEmployeesByDepartment());
let viewBudgetOfDepartment = new View(`06`, `View the total utilized budget of a department`, query.viewBudgetOfDepartment());
let updateEmployeeManager = new UpdateEmployeeManager(`07`, `Update the manager of employee`, query.updateEmployeeManager());
let updateEmployeeRole = new UpdateEmployeeRole(`08`, `Update the role of employee`, query.updateEmployeeRole());
let addDepartment = new AddDepartment(`09`, `Add new department`, query.addDepartment());
let addRole = new AddRole(`10`, `Add new role`, query.addRole());
let addEmployee = new AddEmployee(`11`, `Add new employee`, query.addEmployee());
let deleteDepartment = new DeleteDepartment(`12`, `Delete department`, query.deleteDepartment());
let deleteRole = new DeleteRole(`13`, `Delete role`, query.deleteRole());
let deleteEmployee = new DeleteEmployee(`14`, `Delete employee`, query.deleteEmployee());

// populate list of options
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
  deleteEmployee
);

// create a list of options with names, and add in addition Quit option
const options = userOptions.map((option) => option.name);
const listOfOptions = [...options, "Quit"];

// function to ask what action user want to do
const askUser = async () => {
  let res = await inquirer.prompt([
    {
      type: "list",
      name: "option",
      message: "What woud you like to do?",
      choices: listOfOptions,
    },
  ]);
  if (res.option === "Quit") {
    wantToQuit();
  } else {
    const selectedOption = userOptions.find(
      (option) => option.name === res.option
    );
    showResult(selectedOption);
  }
};

// this function is called when user select what action to do. 
// in scope of thsi function called executeQuery() function from corresponding instance of class
const showResult = async (selectedOption) => {
  await selectedOption.executeQuery();
  await askUser();
};

// function if user selet option to Quit application
const wantToQuit = () =>
  inquirer
    .prompt([
      {
        name: "quit",
        type: "confirm",
        message: "Do you want to quit the application?",
      },
    ])
    .then((answer) => {
      if (answer.quit) {
        console.log(
          "Thank you for using this application. Press CRTL+C to end the process"
        );
      } else {
        askUser();
      }
    });

console.log(header);
askUser();
