const inquirer = require('inquirer');
const Option = require("./option.js");
const Query = require("./query");
const query = new Query();
const connection = query.getConnection();

class AddEmployee extends Option {
  constructor(...args) {
    super(...args);
  }

  executeQuery = async () => {
    let res = await this.queryEmployeeDetails();
    let manager_id;
    if (res.manager === "None") {
      manager_id = null;
    } else {
      manager_id = query.getId(res.manager);
    }
    let params = [res.first_name, res.last_name, query.getId(res.role), manager_id];

    return new Promise((resolve, reject) => {
      connection.query(this.query, params, (error, result) => {
        if (error) {
          console.log("error in query addEmployee");
          return reject(error);
        } else {
          console.log("New employee was added successfully.");
          return resolve(result);
        }
      });
    });
  };

  queryEmployeeDetails = async () => {
    let rolesList = await this.getAllRoles();
    let employeesList = await this.getAllEmployees();
    let managersList = [...employeesList, "None"];
    let res = await inquirer.prompt([
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
        choices: rolesList,
      },
      {
        type: "list",
        name: "manager",
        message:
          "Select the manager for this employee from the list: ",
        choices: managersList,
      },
    ]);
    return res;
  };
}

module.exports = AddEmployee;
