const inquirer = require('inquirer');
const Option = require("./option.js");
const Query = require("./query");
const query = new Query();
const connection = query.getConnection();

class AddDepartment extends Option {
  constructor(...args) {
    super(...args);
  }

  executeQuery = async () => {
    let res = await this.queryDepartmentDetails();
    let params = res.name;

    return new Promise((resolve, reject) => {
      connection.query(this.query, params, (error, result) => {
        if (error) {
          console.log("error in query addDepartment");
          return reject(error);
        } else {
          console.log("New department was added successfully.");
          return resolve(result);
        }
      });
    });
  };

  queryDepartmentDetails = async () => {
    let res = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the new department name: ",
      },
    ]);
    return res;
  };
}

module.exports = AddDepartment;
