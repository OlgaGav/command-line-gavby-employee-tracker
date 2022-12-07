const Option = require("./option.js");
const Query = require("./query");
const query = new Query();
const connection = query.getConnection();

class DeleteEmployee extends Option {
  constructor(...args) {
    super(...args);
  }

  executeQuery = async () => {
    let employeesList = await this.getAllEmployees();
    let employee_id = await this.selectEmployee(employeesList);
    return new Promise((resolve, reject) => {
      connection.query(this.query, employee_id, (error, result) => {
        if (error) {
          console.log("error in query deleteEmployee");
          return reject(error);
        } else {
          console.log("Employee record was deleted successfully.");
          return resolve(result);
        }
      });
    });
  };
}

module.exports = DeleteEmployee;
