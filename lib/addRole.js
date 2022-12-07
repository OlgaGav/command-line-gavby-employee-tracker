const inquirer = require('inquirer');
const Option = require("./option.js");
const Query = require("./query");
const query = new Query();
const connection = query.getConnection();

class AddRole extends Option {
  constructor(...args) {
    super(...args);
  }

  executeQuery = async () => {
    let res = await this.queryRoleDetails();
    let params = [res.title, res.salary, query.getId(res.department)];

    return new Promise((resolve, reject) => {
      connection.query(this.query, params, (error, result) => {
        if (error) {
          console.log("error in query addRole");
          return reject(error);
        } else {
          console.log("New role was added successfully.");
          return resolve(result);
        }
      });
    });
  };

  queryRoleDetails = async () => {
    let departmentsList = await this.getAllDepartments();
    let res = await inquirer.prompt([
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
        choices: departmentsList,
      },
    ]);
    return res;
  };
}

module.exports = AddRole;
