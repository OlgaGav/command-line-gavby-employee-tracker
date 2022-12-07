const Option = require("./option.js");
const Query = require("./query");
const query = new Query();
const connection = query.getConnection();

class ViewEmployeesByDepartment extends Option {
  constructor(...args) {
    super(...args);
  }

  executeQuery = async () => {
    let departmentsList = await this.getAllDepartments();
    let department_id = await this.selectDepartment(departmentsList);
    return new Promise((resolve, reject) => {
      connection.query(this.query, department_id, (error, result) => {
        if (error) {
          console.log("error in query");
          return reject(error);
        }
        console.table(result);
        return resolve(result);
      });
    });
  };
}

module.exports = ViewEmployeesByDepartment;
