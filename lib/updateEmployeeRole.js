const Option = require("./option.js");
const Query = require("./query");
const query = new Query();
const connection = query.getConnection();

class UpdateEmployeeRole extends Option {
  constructor(...args) {
    super(...args);
  }

  executeQuery = async () => {
    let employeesList = await this.getAllEmployees();
    let rolesList = await this.getAllRoles();
    let employee_id = await this.selectEmployee(employeesList);
    let role_id = await this.selectRole(rolesList);
    let params = [role_id, employee_id];

    return new Promise((resolve, reject) => {
      connection.query(this.query, params, (error, result) => {
        if (error) {
          console.log("error in query");
          return reject(error);
        } else {
          console.log("Role of Employee updated successfully");
          return resolve(result);
        }
      });
    });
  };
}

module.exports = UpdateEmployeeRole;
