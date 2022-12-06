// Packages needed for this application
let inquirer = require("inquirer");
const mysql = require("mysql2");
let Query = require("./lib/query");

let query = new Query();

const options = [
  {
    id: 0,
    name: "view all departments",
    query: query.viewAllDepartments(),
  },
  {
    id: 1,
    name: "view all roles",
    query: query.viewAllRoles(),
  },
  {
    id: 2,
    name: "view all employees",
    query: query.viewAllEmployees(),
  },
  {
    id: 3,
    name: "view employees by manager",
    query: query.viewEmployeesByManager(),
  },
  {
    id: 4,
    name: "view employees by department",
    query: query.viewEmployeesByDepartment(),
  },
  {
    id: 5,
    name: "view the total utilized budget of a department",
    query: query.viewBudgetOfDepartment(),
  },
  {
    id: 6,
    name: "add a department",
    query: query.addDepartment(),
  },
  {
    id: 7,
    name: "add a role",
    query: query.addRole(),
  },
  {
    id: 8,
    name: "add an employee",
    query: query.addEmployee(),
  },
  {
    id: 9,
    name: "update an employee role",
    query: query.updateEmployeeRole(),
  },
  {
    id: 10,
    name: "update employee managers",
    query: query.updateEmployeeManager(),
  },
  {
    id: 11,
    name: "delete department",
    query: query.deleteDepartment(),
  },
  {
    id: 12,
    name: "delete role",
    query: query.deleteRole(),
  },
  {
    id: 13,
    name: "delete employee",
    query: query.deleteEmployee(),
  },
];

const optionsNames = options.map((option) => option.name);
const optionsToChoose = [...optionsNames, "Exit"];

// create a connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "employee_tracker_db",
});

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

console.log(header);

const askRequest = () => {
  inquirer
    .prompt([
      {
        name: "start",
        type: "list",
        message: "What would you like to do?",
        choices: optionsToChoose,
      },
    ])
    .then((res) => {
      executeRequest(res.start);
    });
};

const executeRequest = (queryRequest) => {
  switch (queryRequest) {
    // view all departments
    case options[0].name:
      connection.query(options[0].query, (err, result) => {
        if (err) {
          console.log("error in query sqlViewAllDepartments");
        } else {
          console.table(result);
        }
        askRequest();
      });
      break;
    // view all roles
    case options[1].name:
      connection.query(options[1].query, (err, result) => {
        if (err) {
          console.log("error in query");
        } else {
          console.table(result);
        }
        askRequest();
      });
      break;
    // view all employees
    case optionsNames[2]:
      connection.query(options[2].query, (err, result) => {
        if (err) {
          console.log("error in query");
        } else {
          console.table(result);
        }
        askRequest();
      });
      break;
    // view employees by manager
    case optionsNames[3]:
      connection.query(query.getAllManagers(), (err, result) => {
        if (err) {
          console.log("error in query");
          askRequest();
        } else {
          inquirer
            .prompt([
              {
                type: "list",
                name: "manager",
                message: "Please the manager name from the list: ",
                choices: result,
              },
            ])
            .then((res) => {
              console.log(res.manager);
              let manager_id = query.getId(res.manager);
              connection.query(options[3].query, manager_id, (err, result) => {
                if (err) {
                  console.log("error in query");
                } else {
                  console.table(result);
                }
                askRequest();
              });
            });
        }
      });
      break;
    // view employee by department
    case optionsNames[4]:
      connection.query(query.getAllDepartments(), (err, departments) => {
        if (err) {
          console.log("error in query");
          askRequest();
        } else {
          inquirer
            .prompt([
              {
                type: "list",
                name: "department",
                message: "Please select the name of the department: ",
                choices: departments,
              },
            ])
            .then((res) => {
              let department_id = query.getId(res.department);
              connection.query(
                options[4].query,
                department_id,
                (err, result) => {
                  if (err) {
                    console.log("error in query");
                  } else {
                    console.table(result);
                  }
                  askRequest();
                }
              );
            });
        }
      });
      break;
    // view the total utilized budget of each department
    case optionsNames[5]:
      connection.query(options[5].query, (err, result) => {
        if (err) {
          console.log("error in query");
        } else {
          console.table(result);
        }
        askRequest();
      });
      break;
    // add a department, question new department name
    case optionsNames[6]:
      inquirer
        .prompt([
          {
            type: "input",
            name: "department_name",
            message: "Enter new department name: ",
          },
        ])
        .then((res) => {
          connection.query(
            options[6].query,
            res.department_name,
            (err, result) => {
              if (err) {
                console.log("error in query");
              } else {
                console.table("New department added successfully.");
              }
              askRequest();
            }
          );
        });
      break;
    // add a role, question: title, salary, department_id
    case optionsNames[7]:
      connection.query(query.getAllDepartments(), (err, departments) => {
        if (err) {
          console.log("error in query");
          askRequest();
        } else {
          inquirer
            .prompt([
              {
                type: "input",
                name: "title",
                message: "Enter the role title: ",
              },
              {
                type: "input",
                name: "salary",
                message: "What is the salary for this role: ",
              },
              {
                type: "list",
                name: "department",
                message: "Select the department, this role is connected: ",
                choices: departments,
              },
            ])
            .then((res) => {
              let params = [res.title, res.salary, query.getId(res.department)];
              connection.execute(options[7].query, params, (err, result) => {
                if (err) {
                  console.log("error in query");
                } else {
                  console.table("New role added successfully.");
                }
                askRequest();
              });
            });
        }
      });
      break;
    // add an employee, question: first_name, last_name, role_id, manager_id
    case optionsNames[8]:
      connection.query(query.getAllRoles(), (err1, roles) => {
        if (err1) {
          console.log("error in query getAllRoles");
          askRequest();
        } else {
          connection.query(query.getAllEmployees(), (err2, employees) => {
            if (err2) {
              console.log("error in query getAllEmployees()");
              askRequest();
            } else {
              inquirer
                .prompt([
                  {
                    type: "input",
                    name: "first_name",
                    message: "Enter the first name of employee: ",
                  },
                  {
                    type: "input",
                    name: "last_name",
                    message: "Enter the last name of employee: ",
                  },
                  {
                    type: "list",
                    name: "role",
                    message: "Select the role for the employee from the list: ",
                    choices: roles,
                  },
                  {
                    type: "list",
                    name: "manager",
                    message:
                      "Select the manager for this employee from the list: ",
                    choices: employees,
                  },
                ])
                .then((res) => {
                  let params = [
                    res.first_name,
                    res.last_name,
                    query.getId(res.role),
                    query.getId(res.manager),
                  ];
                  connection.query(options[8].query, params, (err3, result) => {
                    if (err3) {
                      console.log(
                        "error in query. New employee was not added."
                      );
                    } else {
                      console.table("New employee added successfully.");
                    }
                    askRequest();
                  });
                });
            }
          });
        }
      });
      break;
    // update an employee role
    case optionsNames[9]:
      connection.query(query.getAllEmployees(), (err, employees) => {
        if (err) {
          console.log("error in query getAllEmployees()");
          askRequest();
        } else {
          connection.query(query.getAllRoles(), (err, roles) => {
            if (err) {
              console.log("error in query getAllRoles()");
              askRequest();
            } else {
              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "employee",
                    message: "Select the employee you want to change role: ",
                    choices: employees,
                  },
                  {
                    type: "list",
                    name: "role",
                    message: "Select new role for employee from the list: ",
                    choices: roles,
                  },
                ])
                .then((res) => {
                  let params = [
                    query.getId(res.role),
                    query.getId(res.employee),
                  ];
                  connection.query(options[9].query, params, (err, result) => {
                    if (err) {
                      console.log("Error in query. Role was not updated.");
                    } else {
                      console.log(
                        "Role of the employee was updated successfully."
                      );
                    }
                    askRequest();
                  });
                });
            }
          });
        }
      });

      break;
    // update the employee manager
    case optionsNames[10]:
      connection.query(query.getAllEmployees(), (err, employees) => {
        if (err) {
          console.log("error in query");
          askRequest();
        } else {
          inquirer
            .prompt([
              {
                type: "list",
                name: "employee",
                message: "Select the employee you want to change the manager: ",
                choices: employees,
              },
              {
                type: "list",
                name: "manager",
                message: "Select the new manager name for the employee: ",
                choices: employees,
              },
            ])
            .then((res) => {
              let params = [
                query.getId(res.manager),
                query.getId(res.employee),
              ];
              connection.query(options[10].query, params, (err, result) => {
                if (err) {
                  console.log("Error in query. Manager was not updated.");
                } else {
                  console.log("Manager was updated sucessfully.");
                }
                askRequest();
              });
            });
        }
      });
      break;
    // delete department;
    case optionsNames[11]:
      connection.query(query.getAllDepartments(), (err, departments) => {
        if (err) {
          console.log("error in query");
          askRequest();
        } else {
          inquirer
            .prompt([
              {
                type: "list",
                name: "department",
                message: "Select the department you want to delete from db: ",
                choices: departments,
              },
            ])
            .then((res) => {
              connection.query(
                options[11].query,
                query.getId(res.department),
                (err, result) => {
                  if (err) {
                    console.log("Error in query. Department was not deleted.");
                  } else {
                    console.log("Department deleted successfully.");
                  }
                  askRequest();
                }
              );
            });
        }
      });

      break;
    // delete role;
    case optionsNames[12]:
      connection.query(query.getAllRoles(), (err, roles) => {
        if (err) {
          console.log("error in query");
          askRequest();
        } else {
          inquirer
            .prompt([
              {
                type: "list",
                name: "role",
                message: "Select the role you want to delete from db: ",
                choices: roles,
              },
            ])
            .then((res) => {
              connection.query(
                options[12].query,
                query.getId(res.role),
                (err, result) => {
                  if (err) {
                    console.log("Error in query. Role was not deleted.");
                  } else {
                    console.log("Role deleted successfully.");
                  }
                  askRequest();
                }
              );
            });
        }
      });
      break;
    // delete employee;
    case optionsNames[13]:
      connection.query(query.getAllEmployees(), (err, employees) => {
        if (err) {
          console.log("error in query");
          askRequest();
        } else {
          inquirer
            .prompt([
              {
                type: "list",
                name: "employee",
                message: "Select the employee you want to delete: ",
                choices: employees,
              },
            ])
            .then((res) => {
              connection.query(
                options[13].query,
                query.getId(res.employee),
                (err, result) => {
                  if (err) {
                    console.log("Error in query. Employee was not deleted.");
                  } else {
                    console.log("Employee deleted successfully");
                  }
                  askRequest();
                }
              );
            });
        }
      });
      break;
    case "Exit":
      console.log("Thank you for using this application. Use CRTL+C to end the process");
      break;
    default:
      console.log("no option selected");
  }
};

askRequest();
