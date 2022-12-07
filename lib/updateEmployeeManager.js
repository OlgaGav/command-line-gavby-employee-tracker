const Option = require("./option.js");
const Query = require("./query");
const query = new Query();
const connection = query.getConnection();

class UpdateEmployeeManager extends Option {
  constructor(...args) {
    super(...args);
  }

  executeQuery = async () => {
    let employeesList = await this.getAllEmployees();
    let managerList = [...employeesList, "None"];
    let employee_id = await this.selectEmployee(employeesList);
    let manager_id = await this.selectManager(managerList);
    let params = [manager_id, employee_id];
    if (employee_id === manager_id) {
      console.log("Employee can not be manager for yourself");
      return;
    }
    return new Promise((resolve, reject) => {
      connection.query(this.query, params, (error, result) => {
        if (error) {
          console.log("error in query");
          return reject(error);
        } else {
          console.log("Manager of the employee updated successfully.");
          return resolve(result);
        }
      });
    });
  };
}

module.exports = UpdateEmployeeManager;
